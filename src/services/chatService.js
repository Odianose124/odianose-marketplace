import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  orderBy,
  doc,
  updateDoc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

import { db } from "../firebase/firebase";
// =====================================
// CREATE CHAT
// =====================================

export async function createChat({

  orderId,

  requestId,

  buyerId,

  buyerName,

  sellerId,

  sellerName,

}) {

  // -----------------------------------
  // Check if chat already exists
  // -----------------------------------

  const q = query(

    collection(db, "chats"),

    where("orderId", "==", orderId)

  );

  const snapshot = await getDocs(q);

  if (!snapshot.empty) {

    return {

      id: snapshot.docs[0].id,

      ...snapshot.docs[0].data(),

    };

  }

  // -----------------------------------
  // Create new chat
  // -----------------------------------

  const chatRef = await addDoc(

    collection(db, "chats"),

    {
  orderId,

  requestId,

  buyerId,

  buyerName,

  sellerId,

  sellerName,

  lastMessage: "",

  lastMessageTime: serverTimestamp(),

  unreadBuyer: 0,

  unreadSeller: 0,

  buyerTyping: false,

  sellerTyping: false,

  createdAt: serverTimestamp(),

  updatedAt: serverTimestamp(),
}

  );

  const chat = await getDoc(chatRef);

  return {

    id: chat.id,

    ...chat.data(),

  };

}
// =====================================
// SEND MESSAGE
// =====================================

export async function sendMessage({

  chatId,

  senderId,

  receiverId,

  text,

  type = "text",

  image = "",

}) {

  // -----------------------------------
  // Save Message
  // -----------------------------------

  await addDoc(

    collection(db, "messages"),

    {

      chatId,

      senderId,

      receiverId,

      text,

      type,

      image,

      read: false,

      createdAt: serverTimestamp(),

    }

  );



  // -----------------------------------
  // Update Chat
  // -----------------------------------

  const chatRef = doc(

    db,

    "chats",

    chatId

  );



  const chatSnap = await getDoc(

    chatRef

  );



  if (!chatSnap.exists()) {

    throw new Error(

      "Chat not found."

    );

  }



  const chat = chatSnap.data();



  await updateDoc(

    chatRef,

    {

      lastMessage: text,

      lastMessageTime: serverTimestamp(),

      updatedAt: serverTimestamp(),

      unreadBuyer:

        receiverId === chat.buyerId

          ? (chat.unreadBuyer || 0) + 1

          : chat.unreadBuyer || 0,

      unreadSeller:

        receiverId === chat.sellerId

          ? (chat.unreadSeller || 0) + 1

          : chat.unreadSeller || 0,

    }

  );



  return true;

}

// =====================================
// GET CHAT MESSAGES
// =====================================

export async function getMessages(chatId) {

  const q = query(

    collection(db, "messages"),

    where("chatId", "==", chatId),

    orderBy("createdAt", "asc")

  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({

    id: doc.id,

    ...doc.data(),

  }));

}

// =====================================
// REAL-TIME CHAT LISTENER
// =====================================

export function subscribeToMessages(chatId, callback) {

  const q = query(

    collection(db, "messages"),

    where("chatId", "==", chatId),

    orderBy("createdAt", "asc")

  );

  return onSnapshot(q, (snapshot) => {

    const messages = snapshot.docs.map((doc) => ({

      id: doc.id,

      ...doc.data(),

    }));

    callback(messages);

  });

}

// =====================================
// GET USER CHATS
// =====================================

export async function getUserChats(userId) {

  const snapshot = await getDocs(

    collection(db, "chats")

  );

  const chats = snapshot.docs

    .map((doc) => ({

      id: doc.id,

      ...doc.data(),

    }))

    .filter(

      (chat) =>

        chat.buyerId === userId ||

        chat.sellerId === userId

    );



  chats.sort((a, b) => {

    const timeA =

      a.lastMessageTime?.seconds || 0;

    const timeB =

      b.lastMessageTime?.seconds || 0;

    return timeB - timeA;

  });



  return chats;

}

// =====================================
// REAL-TIME USER CHATS
// =====================================

export function subscribeToUserChats(

  userId,

  callback

) {

  return onSnapshot(

    collection(db, "chats"),

    (snapshot) => {

      const chats = snapshot.docs

        .map((doc) => ({

          id: doc.id,

          ...doc.data(),

        }))

        .filter(

          (chat) =>

            chat.buyerId === userId ||

            chat.sellerId === userId

        )

        .sort((a, b) => {

          const timeA =

            a.lastMessageTime?.seconds || 0;

          const timeB =

            b.lastMessageTime?.seconds || 0;

          return timeB - timeA;

        });

      callback(chats);

    }

  );

}

export async function getChatById(chatId){

  const chatRef = doc(
    db,
    "chats",
    chatId
  );


  const chatSnap = await getDoc(chatRef);


  if(!chatSnap.exists()){

    return null;

  }


  return {

    id: chatSnap.id,

    ...chatSnap.data(),

  };

}

// =====================================
// REAL-TIME CHAT INFO
// =====================================

export function subscribeToChat(chatId, callback) {

  const chatRef = doc(
    db,
    "chats",
    chatId
  );

  return onSnapshot(chatRef, (snapshot) => {

    if (!snapshot.exists()) return;

    callback({

      id: snapshot.id,

      ...snapshot.data(),

    });

  });

}

// =====================================
// MARK MESSAGES AS READ
// =====================================

export async function markMessagesAsRead(

  chatId,

  currentUserId

) {

  const q = query(

    collection(db, "messages"),

    where("chatId", "==", chatId)

  );



  const snapshot = await getDocs(q);



  const promises = snapshot.docs.map(

    async (item) => {

      const message = item.data();



      if (

        message.receiverId === currentUserId &&

        !message.read

      ) {

        await updateDoc(

          doc(db, "messages", item.id),

          {

            read: true,

          }

        );

      }

    }

  );



  await Promise.all(promises);



  const chatRef = doc(

    db,

    "chats",

    chatId

  );



  const chatSnap = await getDoc(

    chatRef

  );



  if (!chatSnap.exists()) return;



  const chat = chatSnap.data();



  await updateDoc(chatRef, {

    unreadBuyer:

      currentUserId === chat.buyerId

        ? 0

        : chat.unreadBuyer,



    unreadSeller:

      currentUserId === chat.sellerId

        ? 0

        : chat.unreadSeller,



    updatedAt: serverTimestamp(),

  });

}

// =====================================
// SET TYPING STATUS
// =====================================

export async function setTypingStatus({

  chatId,

  userId,

  isTyping,

}) {

  const chatRef = doc(

    db,

    "chats",

    chatId

  );

  const chatSnap = await getDoc(chatRef);

  if (!chatSnap.exists()) {

    throw new Error("Chat not found.");

  }

  const chat = chatSnap.data();

  if (userId === chat.buyerId) {

    await updateDoc(chatRef, {

      buyerTyping: isTyping,

      updatedAt: serverTimestamp(),

    });

  } else {

    await updateDoc(chatRef, {

      sellerTyping: isTyping,

      updatedAt: serverTimestamp(),

    });

  }

}

