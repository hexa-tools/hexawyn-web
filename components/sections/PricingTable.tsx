import { Icon } from "@/components/ui/Icon";
import { pricingColumns, pricingMatrix, type MatrixValue } from "@/lib/content";

function Cell({ value }: { value: MatrixValue }): React.ReactElement {
  if (value === true) {
    return <Icon name="check" className="mx-auto h-4 w-4 text-brand" />;
  }
  if (value === false) {
    return <span className="text-cloud/25">—</span>;
  }
  return <span className="text-cloud/75">{value}</span>;
}

export function PricingTable(): React.ReactElement {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[880px] border-collapse text-sm">
        <thead>
          <tr className="bg-navy/60">
            <th className="sticky left-0 z-10 bg-navy/60 p-4 text-left font-semibold text-cloud">
              Features
            </th>
            {pricingColumns.map((column) => (
              <th
                key={column.name}
                className={`p-4 text-center ${
                  column.featured ? "bg-brand/10" : ""
                }`}
              >
                <div className="flex flex-col items-center gap-0.5">
                  <span className="font-semibold text-cloud">{column.name}</span>
                  <span className="text-xs text-cloud/50">{column.price}</span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pricingMatrix.map((group) => (
            <GroupRows key={group.title} title={group.title} rows={group.rows} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function GroupRows({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; values: MatrixValue[] }[];
}): React.ReactElement {
  return (
    <>
      <tr>
        <td
          colSpan={pricingColumns.length + 1}
          className="border-t border-white/10 bg-white/[0.02] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-brand"
        >
          {title}
        </td>
      </tr>
      {rows.map((row) => (
        <tr key={row.label} className="border-t border-white/5">
          <td className="sticky left-0 z-10 bg-ink p-4 text-left text-cloud/70">
            {row.label}
          </td>
          {row.values.map((value, index) => (
            <td
              key={index}
              className={`p-4 text-center ${
                pricingColumns[index]?.featured ? "bg-brand/[0.04]" : ""
              }`}
            >
              <Cell value={value} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
