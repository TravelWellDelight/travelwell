export default function Marquee() {
  const items = [
    "Kerala Backwaters",
    "Rajasthan Palaces",
    "Bali Temples",
    "Ladakh Mountains",
    "Goa Beaches",
    "Himachal Trails",
    "Coorg Coffee",
    "Andaman Islands",
  ];
  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden py-5 border-y mt-15"
      style={{ borderColor: "var(--bd)", background: "var(--bg-2)" }}
    >
      <div
        className="flex animate-marquee whitespace-nowrap"
        style={{ animationDuration: "32s" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 mx-6">
            <span
              className="text-[11px] tracking-[0.2em] uppercase font-medium"
              style={{ color: "var(--fg-2)" }}
            >
              {item}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#C8392B] shrink-0" />
          </span>
        ))}
      </div>
    </div>
  );
}
