import Image from "next/image";
import type { CardData } from "@/types/dashboard";

export default function Card({ data }: { data: CardData }) {
  const {
    label,
    value,
    icon,
    iconBgColor = "bg-gray-100",
    changeText,
    changePercent,
    percentColor,
    bottomIcon,
  } = data;

  return (
    <div className="bg-white shadow-sm border border-gray-100 rounded-2xl p-4 md:p-6 flex flex-col gap-4 transition hover:shadow-md">
      {/* Top section */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm font-medium text-gray-600">{label}</h3>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">
            {value}
          </p>
        </div>
        <div
          className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center ${iconBgColor}`}
        >
          <Image
            src={icon || "/placeholder.svg"}
            alt={label}
            width={24}
            height={24}
          />
        </div>
      </div>

      {/* Bottom section */}
      <div className="flex items-center gap-2 flex-wrap text-sm">
        <div className="flex items-center gap-1">
          <Image
            src={bottomIcon || "/placeholder.svg"}
            alt="change indicator"
            width={16}
            height={16}
          />
          <span className={`font-semibold ${percentColor}`}>
            {changePercent}
          </span>
        </div>
        <span className="text-gray-500">{changeText}</span>
      </div>
    </div>
  );
}
