import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";

import {

  createChat,

  sendMessage,

  subscribeToUserChats,

  subscribeToChat,

  markMessagesAsRead,

  subscribeToMessages,

  setTypingStatus,

} from "../services/chatService";

const ChatContext = createContext(null);

export function ChatProvider({ children }) {

  const [chats, setChats] = useState([]);

  const [messages, setMessages] = useState([]);

  const [selectedChat, setSelectedChat] = useState(null);

  const [loadingChats, setLoadingChats] = useState(false);

  const [loadingMessages, setLoadingMessages] = useState(false);

  const unsubscribeMessages = useRef(null);
const unsubscribeChat = useRef(null);
const unsubscribeChats = useRef(null);

  

   // =====================================
// LOAD USER CHATS
// =====================================

const loadUserChats = useCallback((userId) => {

  try {

    setLoadingChats(true);


    if (unsubscribeChats.current) {

      unsubscribeChats.current();

    }


    const unsubscribe = subscribeToUserChats(

      userId,

      (liveChats) => {

        setChats(liveChats);

      }

    );


    unsubscribeChats.current = unsubscribe;


    return unsubscribe;


  } catch (error) {

    console.error(

      "Chat Context Error:",

      error

    );

  } finally {

    setLoadingChats(false);

  }

}, []);



  // =====================================
// LOAD CHAT MESSAGES
// =====================================

const loadChatMessages = useCallback(async (
  chatId,
  currentUserId
) => {
  try {
    setLoadingMessages(true);

    // Stop previous chat listener
    if (unsubscribeChat.current) {
      unsubscribeChat.current();
    }

    // Stop previous messages listener
    if (unsubscribeMessages.current) {
      unsubscribeMessages.current();
    }

    unsubscribeChat.current = subscribeToChat(
      chatId,
      (liveChat) => {
        setSelectedChat(liveChat);
      }
    );

    unsubscribeMessages.current =
      subscribeToMessages(
        chatId,
        (liveMessages) => {
          setMessages(liveMessages);
        }
      );

    await markMessagesAsRead(
      chatId,
      currentUserId
    );

  } catch (error) {

    console.error(error);

  } finally {

    setLoadingMessages(false);

  }
}, []);

    // =====================================
  // START CHAT
  // =====================================

  async function startChat({

    orderId,

    requestId,

    buyerId,

    buyerName,

    sellerId,

    sellerName,

  }) {

    try {

      const chat = await createChat({

        orderId,

        requestId,

        buyerId,

        buyerName,

        sellerId,

        sellerName,

      });

      setSelectedChat(chat);

      return chat;

    } catch (error) {

      console.error(
        "Create Chat Error:",
        error
      );

      throw error;

    }

  }



  // =====================================
// SEND CHAT MESSAGE
// =====================================

async function sendChatMessage({

  chatId,

  senderId,

  receiverId,

  text,

  type = "text",

  image = "",

}) {

  try {

    await sendMessage({

      chatId,

      senderId,

      receiverId,

      text,

      type,

      image,

    });

    // Real-time listener updates messages automatically

  } catch (error) {

    console.error(

      "Send Message Error:",

      error

    );

    throw error;

  }

}

// =====================================
// UPDATE TYPING STATUS
// =====================================

async function updateTyping({

  chatId,

  userId,

  isTyping,

}) {

  try {

    await setTypingStatus({

      chatId,

      userId,

      isTyping,

    });

  } catch (error) {

    console.error(

      "Typing Error:",

      error

    );

  }

}

    return (

    <ChatContext.Provider

      value={{

        chats,

        messages,

        selectedChat,

        loadingChats,

        loadingMessages,

        loadUserChats,

        loadChatMessages,

        startChat,

        sendChatMessage,

        updateTyping,

      }}

    >

      {children}

    </ChatContext.Provider>

  );

}



export function useChat() {

  return useContext(ChatContext);

}