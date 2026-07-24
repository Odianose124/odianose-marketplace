import { useState } from "react";

import {
  FaPaperPlane,
  FaImage,
} from "react-icons/fa";

import { useChat } from "../../context/ChatContext";

function ChatInput() {

  const {

    selectedChat,

    sendChatMessage,

  } = useChat();

  const [message, setMessage] = useState("");

  async function handleSend() {

    if (!message.trim()) return;

    if (!selectedChat) return;

    try {

      await sendChatMessage({

        chatId: selectedChat.id,

        senderId: "current-user-id",

        receiverId:
          selectedChat.buyerId === "current-user-id"
            ? selectedChat.sellerId
            : selectedChat.buyerId,

        text: message,

      });

      setMessage("");

    } catch (error) {

      console.error(error);

      alert("Unable to send message.");

    }

  }

  return (

    <div className="bg-white border-t p-4 flex items-center gap-4">

      {/* Image */}

      <button

        className="text-gray-500 hover:text-green-700 transition"

      >

        <FaImage size={22} />

      </button>

      {/* Text */}

      <input

        type="text"

        placeholder="Type a message..."

        value={message}

        onChange={(e) =>

          setMessage(e.target.value)

        }

        onKeyDown={(e) => {

          if (e.key === "Enter") {

            handleSend();

          }

        }}

        className="flex-1 border rounded-full px-5 py-3 outline-none focus:border-green-700"

      />

      {/* Send */}

      <button

        onClick={handleSend}

        className="bg-green-700 hover:bg-green-800 text-white rounded-full p-4 transition"

      >

        <FaPaperPlane />

      </button>

    </div>

  );

}

export default ChatInput;