import DashboardHeader from "../components/seller/DashboardHeader";
import StatsCards from "../components/seller/StatsCards";
import WalletCard from "../components/seller/WalletCard";
import QuickActions from "../components/seller/QuickActions";
import NearbyRequestsPreview from "../components/seller/NearbyRequestsPreview";
import RecentActivity from "../components/seller/RecentActivity";


function SellerDashboard() {


  return (

    <main className="min-h-screen bg-gray-100">


      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">


        <DashboardHeader />


        <StatsCards />


        <WalletCard />


        <QuickActions />


        <NearbyRequestsPreview />


        <RecentActivity />


      </div>


    </main>

  );

}


export default SellerDashboard;