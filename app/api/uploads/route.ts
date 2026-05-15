import { createHash } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function signCloudinaryPayload(params: Record<string, string>, apiSecret: string) {
  const signatureBase = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return createHash("sha1").update(`${signatureBase}${apiSecret}`).digest("hex");
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "A product image file is required." }, { status: 422 });
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  const folder = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER ?? "paris-fashion-vintage";

  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json({
      mode: "demo",
      url: "/images/paris-fashion-vintage-shop.png",
      message: "Cloudinary credentials are not configured. Demo image returned for preview."
    });
  }

  const timestamp = Math.round(Date.now() / 1000).toString();
  const uploadParams = {
    folder,
    timestamp
  };
  const signature = signCloudinaryPayload(uploadParams, apiSecret);
  const uploadData = new FormData();
  uploadData.append("file", file);
  uploadData.append("api_key", apiKey);
  uploadData.append("folder", folder);
  uploadData.append("timestamp", timestamp);
  uploadData.append("signature", signature);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: uploadData
  });

  const payload = (await response.json()) as { secure_url?: string; error?: { message?: string } };

  if (!response.ok || !payload.secure_url) {
    return NextResponse.json(
      { error: payload.error?.message ?? "Cloudinary upload failed." },
      { status: response.status || 502 }
    );
  }

  return NextResponse.json({
    mode: "cloudinary",
    url: payload.secure_url
  });
}
