import {
  ShoppingBag,
  MessageCircle,
  Star,
  Wallet,
  Package,
} from "lucide-react";


function RecentActivity() {


  const activities = [

    {
      id: 1,
      title: "Seller account created",
      description: "Your seller profile is now active.",
      icon: Package,
      color: "bg-green-100 text-green-700",
      time: "Just now",
    },


    {
      id: 2,
      title: "No recent orders",
      description: "Customer orders will appear here.",
      icon: ShoppingBag,
      color: "bg-blue-100 text-blue-700",
      time: "Waiting",
    },


    {
      id: 3,
      title: "Customer messages",
      description: "Buyer conversations will appear here.",
      icon: MessageCircle,
      color: "bg-purple-100 text-purple-700",
      time: "Waiting",
    },


    {
      id: 4,
      title: "Reviews and ratings",
      description: "Customer reviews will appear here.",
      icon: Star,
      color: "bg-yellow-100 text-yellow-700",
      time: "Waiting",
    },


  ];



  return (

    <section className="bg-white rounded-3xl shadow-sm border p-6">


      <div className="flex justify-between items-center mb-6">


        <div>

          <h2 className="text-2xl font-bold text-gray-800">
            Recent Activity
          </h2>


          <p className="text-gray-500 mt-1">
            Track your latest business activities.
          </p>


        </div>


      </div>





      <div className="space-y-5">


        {activities.map((activity) => {


          const Icon = activity.icon;



          return (

            <div

              key={activity.id}

              className="flex items-center gap-5 border rounded-2xl p-5 hover:shadow-md transition"

            >


              <div

                className={`w-12 h-12 rounded-xl flex items-center justify-center ${activity.color}`}

              >

                <Icon size={24}/>


              </div>





              <div className="flex-1">


                <h3 className="font-semibold text-lg">

                  {activity.title}

                </h3>



                <p className="text-gray-500">

                  {activity.description}

                </p>


              </div>





              <span className="text-sm text-gray-400">

                {activity.time}

              </span>



            </div>


          );


        })}


      </div>


    </section>

  );

}


export default RecentActivity;