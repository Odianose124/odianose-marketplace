import {
  MapPinned,
  ClipboardList,
  Briefcase,
  MessageCircle,
  Wallet,
  Star,
} from "lucide-react";

import { Link } from "react-router-dom";

function QuickActions() {
  const actions = [
    {
      title: "Nearby Requests",
      description: "Find buyers near you",
      icon: MapPinned,
      color: "bg-green-100 text-green-700",
      link: "/seller/nearby-requests",
    },
    {
      title: "My Offers",
      description: "Offers you've submitted",
      icon: ClipboardList,
      color: "bg-blue-100 text-blue-700",
      link: "/seller/offers",
    },
    {
      title: "Active Jobs",
      description: "Current ongoing jobs",
      icon: Briefcase,
      color: "bg-yellow-100 text-yellow-700",
      link: "/seller/jobs",
    },
    {
      title: "Messages",
      description: "Chat with customers",
      icon: MessageCircle,
      color: "bg-purple-100 text-purple-700",
      link: "/messages",
    },
    {
      title: "Wallet",
      description: "Manage earnings",
      icon: Wallet,
      color: "bg-emerald-100 text-emerald-700",
      link: "/seller/wallet",
    },
    {
      title: "Reviews",
      description: "Customer ratings",
      icon: Star,
      color: "bg-orange-100 text-orange-700",
      link: "/seller/reviews",
    },
  ];

  return (
    <section>

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-gray-800">
          Quick Actions
        </h2>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.link}
              className="bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 p-6"
            >
              <div
                className={`w-14 h-14 rounded-xl flex items-center justify-center ${action.color}`}
              >
                <Icon size={28} />
              </div>

              <h3 className="text-xl font-semibold mt-5">
                {action.title}
              </h3>

              <p className="text-gray-500 mt-2">
                {action.description}
              </p>
            </Link>
          );
        })}

      </div>

    </section>
  );
}

export default QuickActions;