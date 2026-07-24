import {
  FaUserCircle,
  FaPhone,
  FaVideo,
  FaEllipsisV,
} from "react-icons/fa";

function ChatHeader({ chat }) {

  return (

    <div className="bg-white border-b px-6 py-4 flex items-center justify-between">

      {/* Left */}

      <div className="flex items-center gap-4">

        <FaUserCircle className="text-5xl text-green-700" />

        <div>

          <h2 className="font-bold text-lg">

            {chat?.sellerName ||
              chat?.buyerName ||
              "Chat"}

          </h2>

          <p className="text-sm text-green-600">

            Online

          </p>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        <button className="text-gray-600 hover:text-green-700 transition">

          <FaPhone size={20} />

        </button>

        <button className="text-gray-600 hover:text-green-700 transition">

          <FaVideo size={20} />

        </button>

        <button className="text-gray-600 hover:text-green-700 transition">

          <FaEllipsisV size={20} />

        </button>

      </div>

    </div>

  );

}

export default ChatHeader;