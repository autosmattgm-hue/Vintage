import { NextResponse } from "next/server";
import { z } from "zod";
import { products } from "@/lib/catalog";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";

const messageInput = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(1200)
});

const vivienneInput = z.object({
  mode: z.enum(["concierge", "product-copy"]).default("concierge"),
  messages: z.array(messageInput).max(10).optional(),
  product: z
    .object({
      name: z.string().optional(),
      designer: z.string().optional(),
      category: z.string().optional(),
      condition: z.string().optional(),
      size: z.string().optional(),
      status: z.string().optional(),
      price: z.string().optional()
    })
    .optional()
});

const productContext = products
  .slice(0, 12)
  .map((product) => `${product.name} by ${product.designer}, ${product.category}, ${product.condition}, EUR ${product.price / 100}`)
  .join("\n");

function fallbackReply(mode: "concierge" | "product-copy") {
  if (mode === "product-copy") {
    return "A refined vintage piece selected for its silhouette, condition, and quiet Parisian elegance. Style it with structured tailoring, gold jewelry, and a polished bag for a timeless boutique look.";
  }

  return "Bonjour, I am Vivienne. I can help you choose a vintage bag, jewelry, shoes, or a Saint Laurent-inspired piece. For the most personal edit, tell me your occasion, budget, and preferred style.";
}

function systemPrompt(mode: "concierge" | "product-copy") {
  const base = `You are Vivienne, the AI style concierge for Paris Fashion Vintage, a luxury vintage boutique at ${siteConfig.address}.
Phone: ${siteConfig.phone}. Rating: ${siteConfig.rating}. Services: in-store shopping and in-store pickup.
Brand voice: elegant, warm, Parisian, concise, feminine, premium, trustworthy.
Current curated inventory context:
${productContext}

Rules:
- Help customers discover pieces, book a boutique visit, or use WhatsApp for availability.
- Never claim a piece is authenticated beyond the site's language of boutique inspection unless the user asks for condition guidance.
- Recommend in-store pickup for one-of-one items.
- Answer in the user's language. If the user writes French, reply in French. If English, reply in English.
- Keep replies short, polished, and useful.`;

  if (mode === "product-copy") {
    return `${base}

Admin task: write one premium product description for a vintage fashion product. Include material/condition/style cues if provided. Do not invent brand authentication details. Return only the final description, 55-90 words.`;
  }

  return `${base}

Concierge task: act like a luxury boutique stylist. Ask at most one clarifying question if needed, suggest 1-3 relevant next steps, and mention appointment or WhatsApp when helpful.`;
}

export async function POST(request: Request) {
  const payload = await request.json();
  const parsed = vivienneInput.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid Vivienne request", details: parsed.error.flatten() }, { status: 422 });
  }

  const apiKey = process.env.NVIDIA_API_KEY;
  const model = process.env.NVIDIA_AI_MODEL ?? "meta/llama-4-maverick-17b-128e-instruct";

  if (!apiKey) {
    return NextResponse.json({
      mode: "demo",
      reply: fallbackReply(parsed.data.mode)
    });
  }

  const productMessage =
    parsed.data.mode === "product-copy" && parsed.data.product
      ? [
          "Write product copy for:",
          `Name: ${parsed.data.product.name ?? ""}`,
          `Designer: ${parsed.data.product.designer ?? ""}`,
          `Category: ${parsed.data.product.category ?? ""}`,
          `Condition: ${parsed.data.product.condition ?? ""}`,
          `Size: ${parsed.data.product.size ?? ""}`,
          `Status: ${parsed.data.product.status ?? ""}`,
          `Price: ${parsed.data.product.price ?? ""}`
        ].join("\n")
      : "";

  const messages = [
    { role: "system", content: systemPrompt(parsed.data.mode) },
    ...(parsed.data.mode === "product-copy"
      ? [{ role: "user", content: productMessage }]
      : parsed.data.messages?.map((message) => ({ role: message.role, content: message.content })) ?? [])
  ];

  const response = await fetch("https://integrate.api.nvidia.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model,
      messages,
      max_tokens: parsed.data.mode === "product-copy" ? 220 : 360,
      temperature: parsed.data.mode === "product-copy" ? 0.72 : 0.82,
      top_p: 0.95,
      frequency_penalty: 0,
      presence_penalty: 0,
      stream: false
    })
  });

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
    error?: { message?: string };
  };

  if (!response.ok) {
    return NextResponse.json({ error: data.error?.message ?? "Vivienne is unavailable right now." }, { status: 502 });
  }

  return NextResponse.json({
    mode: "live",
    reply: data.choices?.[0]?.message?.content?.trim() ?? fallbackReply(parsed.data.mode)
  });
}
