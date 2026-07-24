import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import { useChat } from "../../context/ChatContext";

function ChatSidebar() {

  const navigate = useNavigate();

  const {

    chats,

    loadUserChats,

    loadingChats,

  } = useChat();

  // TEMPORARY USER ID
  const currentUserId = "current-user-id";

  useEffect(() => {

    loadUserChats(currentUserId);

  }, []);

  if (loadingChats) {

    return (

      <div className="flex items-center justify-center h-full">

        Loading chats...

      </div>

    );

  }

  return (

    <div className="h-full overflow-y-auto">

      <div className="p-5 border-b">

        <h2 className="text-2xl font-bold">

          Chats

        </h2>

      </div>

      {chats.length === 0 ? (

        <div className="p-6 text-gray-500">

          No conversations yet.

        </div>

      ) : (

        chats.map((chat) => (

          <button

            key={chat.id}

            onClick={() =>

              navigate(`/chat/${chat.id}`)

            }

            className="w-full flex items-center gap-4 p-4 hover:bg-gray-100 transition border-b"

          >

            <FaUserCircle

              className="text-5xl text-green-700"

            />

            <div className="flex-1 text-left">

              <h3 className="font-semibold">

                {chat.sellerName || chat.buyerName}

              </h3>

              <p className="text-sm text-gray-500 truncate">

                {chat.lastMessage ||

                  "Start chatting..."}

              </p>

            </div>

          </button>

        ))

      )}

    </div>

  );

}

export default ChatSidebar;