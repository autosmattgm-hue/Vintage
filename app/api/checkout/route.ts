import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { products } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/site";

const checkoutInput = z.object({
  items: z
    .array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().min(1).max(3)
      })
    )
    .min(1),
  email: z.string().email().optional(),
  discountCode: z.string().max(30).optional()
});

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = checkoutInput.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid checkout request", details: parsed.error.flatten() }, { status: 422 });
  }

  const lineItems = parsed.data.items.map((item) => {
    const product = products.find((catalogProduct) => catalogProduct.id === item.productId);

    if (!product) {
      throw new Error(`Product ${item.productId} not found`);
    }

    return {
      product,
      quantity: item.quantity
    };
  });

  if (!process.env.STRIPE_SECRET_KEY?.startsWith("sk_")) {
    return NextResponse.json({
      mode: "demo",
      orderNumber: `PFV-${Date.now().toString().slice(-6)}`,
      url: absoluteUrl("/checkout/success?demo=true"),
      message: "Stripe secret key is not configured. Returning demo success URL."
    });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const idempotencyKey = crypto.randomUUID();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: parsed.data.email,
    allow_promotion_codes: true,
    success_url: absoluteUrl("/checkout/success?session_id={CHECKOUT_SESSION_ID}"),
    cancel_url: absoluteUrl("/checkout"),
    line_items: lineItems.map(({ product, quantity }) => ({
      quantity,
      price_data: {
        currency: "eur",
        unit_amount: product.price,
        product_data: {
          name: product.name,
          description: product.description,
          images: [product.images[0].startsWith("http") ? product.images[0] : absoluteUrl(product.images[0])],
          metadata: {
            productId: product.id,
            designer: product.designer,
            category: product.category
          }
        }
      }
    })),
    metadata: {
      discountCode: parsed.data.discountCode ?? "",
      channel: "web",
      fulfillment: "in_store_pickup"
    }
  }, {
    idempotencyKey
  });

  return NextResponse.json({ mode: "stripe", url: session.url, sessionId: session.id });
}
