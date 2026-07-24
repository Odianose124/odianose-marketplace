import { useEffect } from "react";
import { useParams } from "react-router-dom";

import ChatHeader from "../components/chat/ChatHeader";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";
import ChatSidebar from "../components/chat/ChatSidebar";

import { useChat } from "../context/ChatContext";

function ChatPage() {

  const { chatId } = useParams();

  const {

    selectedChat,

    loadChatMessages,

  } = useChat();

  useEffect(() => {

    if (chatId) {

      // We will replace "current-user-id"
      // with the logged in user's ID later.
      loadChatMessages(

        chatId,

        "current-user-id"

      );

    }

  }, [chatId]);

  return (

    <div className="h-screen flex bg-gray-100">

      {/* Sidebar */}

      <div className="w-80 border-r bg-white">

        <ChatSidebar />

      </div>

      {/* Chat Area */}

      <div className="flex-1 flex flex-col">

        <ChatHeader chat={selectedChat} />

        <ChatMessages />

        <ChatInput />

      </div>

    </div>

  );

}

export default ChatPage;