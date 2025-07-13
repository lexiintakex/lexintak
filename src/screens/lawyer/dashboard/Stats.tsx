import Card from "@/components/Cards/DashboardCard";
import type { CardData } from "@/types/dashboard";

function StatsCard({ data }: { data: CardData[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 w-full">
      {data.map((item) => (
        <Card key={item.label} data={item} />
      ))}
    </div>
  );
}

export default StatsCard;
