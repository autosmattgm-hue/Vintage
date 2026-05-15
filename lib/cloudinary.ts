export function cloudinaryImage(publicId: string, transforms = "f_auto,q_auto,c_fill") {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const folder = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER ?? "paris-fashion-vintage";

  if (!cloudName) {
    return publicId;
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms}/${folder}/${publicId}`;
}
