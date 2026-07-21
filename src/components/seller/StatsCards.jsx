import {
  Briefcase,
  ClipboardList,
  Star,
  Wallet,
} from "lucide-react";

import { useSeller } from "../../context/SellerContext";


function StatsCards() {

  const { sellerProfile } = useSeller();


  const cards = [

    {
      title: "Total Orders",
      value:
        sellerProfile?.statistics?.totalOrders || 0,
      icon: ClipboardList,
      color: "bg-blue-100 text-blue-700",
    },


    {
      title: "Completed Jobs",
      value:
        sellerProfile?.statistics?.completedJobs || 0,
      icon: Briefcase,
      color: "bg-green-100 text-green-700",
    },


    {
      title: "Response Rate",
      value:
        `${sellerProfile?.responseRate || 0}%`,
      icon: Star,
      color: "bg-yellow-100 text-yellow-700",
    },


    {
      title: "Total Earnings",
      value:
        `₦${(
          sellerProfile?.wallet?.totalEarned || 0
        ).toLocaleString()}`,
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

                <Icon size={28}/>

              </div>


            </div>


          </div>

        );

      })}


    </div>

  );

}


export default StatsCards;