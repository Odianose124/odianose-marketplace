import { ArrowUpRight, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

import sellerStats from "../../data/sellerStats";

function WalletCard() {
  return (
    <div className="bg-gradient-to-r from-green-700 to-green-500 rounded-3xl p-8 text-white shadow-lg">

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-8">

        <div>

          <div className="flex items-center gap-3">

            <div className="bg-white/20 p-3 rounded-xl">
              <Wallet size={28} />
            </div>

            <div>

              <p className="text-green-100">
                Available Balance
              </p>

              <h2 className="text-4xl font-bold mt-1">
                ₦{sellerStats.walletBalance.toLocaleString()}
              </h2>

            </div>

          </div>

          <div className="mt-6">

            <p className="text-green-100">
              Pending Withdrawal
            </p>

            <h3 className="text-2xl font-semibold mt-1">
              ₦{sellerStats.pendingWithdrawal.toLocaleString()}
            </h3>

          </div>

        </div>

        <div className="flex flex-col sm:flex-row gap-4">

          <Link
            to="/seller/wallet"
            className="bg-white text-green-700 font-semibold px-6 py-4 rounded-xl hover:bg-gray-100 transition text-center"
          >
            View Wallet
          </Link>

          <button
            className="border border-white px-6 py-4 rounded-xl hover:bg-white hover:text-green-700 transition flex items-center justify-center gap-2"
          >
            Withdraw

            <ArrowUpRight size={18} />
          </button>

        </div>

      </div>

    </div>
  );
}

export default WalletCard;