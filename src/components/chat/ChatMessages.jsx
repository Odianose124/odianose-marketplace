import { useEffect, useRef } from "react";

import { useChat } from "../../context/ChatContext";

import MessageBubble from "./MessageBubble";

function ChatMessages() {

  const { messages } = useChat();

  const bottomRef = useRef(null);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({

      behavior: "smooth",

    });

  }, [messages]);

  return (

    <div className="flex-1 overflow-y-auto bg-gray-100 p-6">

      {messages.length === 0 ? (

        <div className="h-full flex items-center justify-center text-gray-400">

          No messages yet.

        </div>

      ) : (

        messages.map((message) => (

          <MessageBubble

            key={message.id}

            message={message}

          />

        ))

      )}

      <div ref={bottomRef}></div>

    </div>

  );

}

export default ChatMessages;