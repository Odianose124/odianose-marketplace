import { useEffect } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar";

import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";

function ChatList() {

  const { currentUser } = useAuth();

  const {

    chats,

    loadingChats,

    loadUserChats,

  } = useChat();

  useEffect(() => {

  if (!currentUser) return;

  const unsubscribe = loadUserChats(currentUser.uid);

  return () => {

    if (unsubscribe) {

      unsubscribe();

    }

  };

}, [currentUser]);

  return (

    <>

      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-10">

        <h1 className="text-4xl font-bold text-green-700 mb-8">

          Messages

        </h1>

        {loadingChats ? (

          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

            <h2 className="text-2xl font-bold">

              Loading Chats...

            </h2>

          </div>

        ) : chats.length === 0 ? (

          <div className="bg-white rounded-2xl shadow-lg p-10 text-center">

            <h2 className="text-3xl font-bold">

              No Conversations Yet

            </h2>

            <p className="text-gray-500 mt-3">

              Your chats will appear here once you start chatting.

            </p>

          </div>

        ) : (

  <div className="space-y-5">

    {chats.map((chat) => {

      const isBuyer =
        currentUser.uid === chat.buyerId;

      const otherUser = isBuyer
        ? chat.sellerName
        : chat.buyerName;

      const unread = isBuyer
        ? chat.unreadBuyer
        : chat.unreadSeller;

      return (

        <Link
          key={chat.id}
          to={`/chat/${chat.id}`}
          className="block bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6"
        >

          <div className="flex justify-between items-center">

            <div className="flex items-center gap-5">

              <img
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  otherUser
                )}&background=16a34a&color=fff`}
                alt={otherUser}
                className="w-16 h-16 rounded-full"
              />

              <div>

                <h2 className="text-xl font-bold text-gray-800">
                  {otherUser}
                </h2>

                <p className="text-gray-500 mt-2">
                  {chat.lastMessage || "Start chatting..."}
                </p>

              </div>

            </div>

            <div className="text-right">

              <p className="text-gray-500 text-sm">

                {chat.lastMessageTime?.toDate
                  ? chat.lastMessageTime
                      .toDate()
                      .toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                  : ""}

              </p>

              {unread > 0 && (

                <div className="mt-3 inline-flex items-center justify-center bg-green-700 text-white rounded-full w-7 h-7 text-sm font-bold">

                  {unread}

                </div>

              )}

            </div>

          </div>

        </Link>

      );

    })}

  </div>

)}

      </main>

    </>

  );

}

export default ChatList;