import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import ImageUploader from "../../components/chat/ImageUploader";
import { uploadImage } from "../../services/cloudinary";

import Navbar from "../../components/Navbar";

import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
function ChatRoom() {

  const { id } = useParams();

  const bottomRef = useRef(null);

  const { currentUser } = useAuth();

  const {

    selectedChat,

    messages,

    loadingMessages,

    loadChatMessages,

    sendChatMessage,

    updateTyping,

  } = useChat();

  const [text, setText] = useState("");

  const [uploadingImage, setUploadingImage] = useState(false);

  const typingTimeout = useRef(null);

  useEffect(() => {

  if (currentUser) {

    loadChatMessages(

      id,

      currentUser.uid

    );

  }

}, [id, currentUser, loadChatMessages]);


useEffect(() => {

  bottomRef.current?.scrollIntoView({

    behavior: "smooth",

  });

}, [messages]);

useEffect(() => {

  return () => {

    clearTimeout(typingTimeout.current);

  };

}, []);


    function handleTyping(e) {

  setText(e.target.value);

  updateTyping({

    chatId: id,

    userId: currentUser.uid,

    isTyping: true,

  });

  clearTimeout(typingTimeout.current);

  typingTimeout.current = setTimeout(() => {

    updateTyping({

      chatId: id,

      userId: currentUser.uid,

      isTyping: false,

    });

  }, 1200);

}

async function handleSend() {

    if (!text.trim()) return;

    if (!selectedChat) return;

    const receiverId =

      currentUser.uid === selectedChat.buyerId

        ? selectedChat.sellerId

        : selectedChat.buyerId;

    try {

      await sendChatMessage({

        chatId: id,

        senderId: currentUser.uid,

        receiverId,

        text,

      });

      setText("");

      await updateTyping({

  chatId: id,

  userId: currentUser.uid,

  isTyping: false,

});

      

    } catch (error) {

      console.error(error);

    }

  }

  async function handleImageUpload(file) {

  if (!selectedChat) return;

  const receiverId =
    currentUser.uid === selectedChat.buyerId
      ? selectedChat.sellerId
      : selectedChat.buyerId;

  try {

    setUploadingImage(true);

    const imageUrl = await uploadImage(file);

    await sendChatMessage({

      chatId: id,

      senderId: currentUser.uid,

      receiverId,

      text: "",

      image: imageUrl,

      type: "image",

    });

  } catch (error) {

    console.error(error);

  } finally {

    setUploadingImage(false);

  }

}


    if (loadingMessages || !selectedChat) {

    return (

      <>

        <Navbar />

        <div className="min-h-screen flex items-center justify-center">

          <h2 className="text-2xl font-bold text-green-700">

            Loading Chat...

          </h2>

        </div>

      </>

    );

  }
    const otherUser =

    currentUser.uid === selectedChat.buyerId

      ? selectedChat.sellerName

      : selectedChat.buyerName;

  return (

    <>

      <Navbar />

      <main className="max-w-5xl mx-auto px-6 py-10">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Header */}

          <div className="flex items-center justify-between px-6 py-5 border-b">

            <div className="flex items-center gap-4">

              <img

                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(

                  otherUser

                )}&background=16a34a&color=fff`}

                alt={otherUser}

                className="w-14 h-14 rounded-full"

              />

              <div>

                <h2 className="text-2xl font-bold">

                  {otherUser}

                </h2>

                <p className="text-green-600">

  {currentUser.uid === selectedChat.buyerId

    ? selectedChat.sellerTyping

      ? "Typing..."

      : "● Online"

    : selectedChat.buyerTyping

      ? "Typing..."

      : "● Online"}

</p>

              </div>

            </div>

          </div>
                    {/* Messages */}

          <div className="h-[500px] overflow-y-auto p-6 bg-gray-50">

            <div className="space-y-5">

              {messages.map((message) => {

                const mine =

                  message.senderId === currentUser.uid;

                return (

                  <div

                    key={message.id}

                    className={`flex ${

                      mine

                        ? "justify-end"

                        : "justify-start"

                    }`}

                  >
                    <div

                      className={`max-w-[70%] px-5 py-3 rounded-2xl shadow ${

                        mine

                          ? "bg-green-700 text-white rounded-br-md"

                          : "bg-white text-gray-800 rounded-bl-md"

                      }`}

                    >

                      {message.type === "image" && (

  <img
    src={message.image}
    alt="sent"
    className="rounded-xl max-w-xs mb-2"
  />

)}

<p className="leading-7 break-words">

  {message.text}

</p>

                      <p

                        className={`text-xs mt-2 ${

                          mine

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

                      </p>

                    </div>

                  </div>

                );

              })}

              <div ref={bottomRef}></div>
                    

            </div>

          </div>
                    {/* Message Input */}

          <div className="border-t p-5 bg-white">

            <div className="flex gap-4 items-center">

  <ImageUploader
    onSelect={handleImageUpload}
  />

  <input
    type="text"
    value={text}
    onChange={handleTyping}
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        handleSend();
      }
    }}
    placeholder="Type a message..."
    className="flex-1 border rounded-xl px-5 py-4 outline-none focus:ring-2 focus:ring-green-600"
  />

  <button
    onClick={handleSend}
    className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-xl transition"
  >
    {uploadingImage ? "Uploading..." : "Send"}
  </button>

</div>

          </div>

        </div>

      </main>

    </>

  );

}

export default ChatRoom;