const imageAliases: Record<string, string> = {
  "photo-1585488433860-f8a6f53ec2ab": "photo-1584917865442-de89df76afd3"
};

export function fashionImage(id: string) {
  return `/images/fashion/${imageAliases[id] ?? id}.jpg`;
}
