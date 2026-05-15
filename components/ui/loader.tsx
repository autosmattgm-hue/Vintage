export function Loader({ label = "Loading" }: { label?: string }) {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-couture-ink text-couture-cream">
      <div className="text-center">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border border-gold-300/40">
          <div className="h-16 w-16 animate-spin rounded-full border border-transparent border-t-gold-300" />
        </div>
        <p className="editorial-kicker mt-6 text-xs text-gold-300">{label}</p>
        <h1 className="mt-3 font-serif text-4xl">Paris Fashion Vintage</h1>
      </div>
    </div>
  );
}
