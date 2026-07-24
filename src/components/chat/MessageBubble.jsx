import { useMemo } from "react";

function MessageBubble({ message }) {

  // TEMPORARY
  // We'll replace this with the logged-in user's ID later.
  const currentUserId = "current-user-id";

  const isMine = useMemo(() => {

    return message.senderId === currentUserId;

  }, [message]);

  return (

    <div

      className={`flex mb-4 ${
        isMine
          ? "justify-end"
          : "justify-start"
      }`}

    >

      <div

        className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm ${
          isMine
            ? "bg-green-700 text-white rounded-br-md"
            : "bg-white text-gray-800 rounded-bl-md"
        }`}

      >

        {/* Image */}

        {message.type === "image" && (

          <img

            src={message.image}

            alt="Chat"

            className="rounded-xl mb-2 max-h-64 w-full object-cover"

          />

        )}

        {/* Message */}

        {message.text && (

          <p className="break-words">

            {message.text}

          </p>

        )}

        {/* Time */}

        <div

          className={`text-xs mt-2 ${
            isMine
              ? "text-green-100"
              : "text-gray-400"
          }`}

        >

          {message.createdAt?.toDate
            ? message.createdAt
                .toDate()
                .toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
            : ""}

        </div>

      </div>

    </div>

  );

}

export default MessageBubble;