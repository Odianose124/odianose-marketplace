import {
  Briefcase,
  ClipboardList,
  Star,
  Wallet,
} from "lucide-react";

import sellerStats from "../../data/sellerStats";

function StatsCards() {
  const cards = [
    {
      title: "Total Requests",
      value: sellerStats.totalRequests,
      icon: ClipboardList,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Active Jobs",
      value: sellerStats.activeJobs,
      icon: Briefcase,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Response Rate",
      value: `${sellerStats.responseRate}%`,
      icon: Star,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Total Earnings",
      value: `₦${sellerStats.totalEarnings.toLocaleString()}`,
      icon: Wallet,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">

              <div>

                <p className="text-gray-500 text-sm">
                  {card.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {card.value}
                </h2>

              </div>

              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${card.color}`}
              >
                <Icon size={28} />
              </div>

            </div>
          </div>
        );
      })}

    </div>
  );
}

export default StatsCards;