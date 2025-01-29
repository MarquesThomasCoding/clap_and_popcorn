import { HandCoins, PiggyBank } from "lucide-react";

export default function MovieStats({
  revenue,
  budget,
}: {
  revenue: number;
  budget: number;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-3xl">Statistiques</h2>
      <span className="flex items-center gap-2">
        <HandCoins /> {revenue.toLocaleString()} ${" "}
        <span className="text-sm text-muted-foreground px-2 rounded-sm bg-white bg-opacity-5 backdrop-blur-sm">
          Revenus
        </span>
      </span>
      <span className="flex items-center gap-2">
        <PiggyBank /> {budget.toLocaleString()} ${" "}
        <span className="text-sm text-muted-foreground px-2 rounded-sm bg-white bg-opacity-5 backdrop-blur-sm">
          Budget
        </span>
      </span>
    </section>
  );
}