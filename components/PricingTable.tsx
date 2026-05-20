import { cn } from "@/lib/utils";

type PricingRow = {
  model: string;
  minor: string;
  major: string;
};

function PriceCell({ value }: { value: string }) {
  if (value === "n/a") {
    return <span className="text-[color:var(--color-silver-600)]">n/a</span>;
  }

  return (
    <>
      <span className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-silver-500)]">
        from
      </span>{" "}
      <span className="text-white">{value}</span>
    </>
  );
}

function PricingCard({
  row,
  striped,
  index,
}: {
  row: PricingRow;
  striped: boolean;
  index: number;
}) {
  return (
    <div
      className={cn(
        "px-4 py-4",
        striped && index % 2 === 0 && "bg-white/[0.01]"
      )}
    >
      <p className="font-medium text-white">{row.model}</p>
      <div className="mt-3 grid grid-cols-2 gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-silver-500)]">
            Minor Service
          </p>
          <div className="mt-1 text-sm text-[color:var(--color-silver-300)]">
            <PriceCell value={row.minor} />
          </div>
        </div>
        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-silver-500)]">
            Major Service
          </p>
          <div className="mt-1 text-sm text-[color:var(--color-silver-300)]">
            <PriceCell value={row.major} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function PricingTable({
  rows,
  className,
  striped = false,
}: {
  rows: PricingRow[];
  className?: string;
  striped?: boolean;
}) {
  return (
    <div className={className}>
      <div className="divide-y divide-white/10 overflow-hidden rounded-2xl glass-card ring-silver md:hidden">
        {rows.map((row, index) => (
          <PricingCard
            key={row.model}
            row={row}
            striped={striped}
            index={index}
          />
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-2xl glass-card ring-silver md:block">
        <table className="w-full table-fixed text-sm">
          <colgroup>
            <col className="w-1/2" />
            <col className="w-1/4" />
            <col className="w-1/4" />
          </colgroup>
          <thead className="bg-white/[0.04]">
            <tr className="text-left text-[11px] uppercase tracking-[0.18em] text-[color:var(--color-silver-300)]">
              <th className="px-5 py-4 font-semibold">Model</th>
              <th className="px-5 py-4 font-semibold">Minor Service</th>
              <th className="px-5 py-4 font-semibold">Major Service</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.model}
                className={cn(
                  "border-t border-white/5 transition hover:bg-white/[0.03]",
                  striped && index % 2 === 0 && "bg-white/[0.01]"
                )}
              >
                <td className="px-5 py-4 font-medium text-white">{row.model}</td>
                <td className="whitespace-nowrap px-5 py-4 text-[color:var(--color-silver-300)]">
                  <PriceCell value={row.minor} />
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-[color:var(--color-silver-300)]">
                  <PriceCell value={row.major} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
