import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import { getDate } from "./functions";
import {
  collection,
  setDoc,
  doc,
  deleteDoc,
  getDoc,
  onSnapshot,
  updateDoc,
  deleteField,
} from "firebase/firestore";

const addOnline = async (dataBase, user) => {
  await setDoc(dataBase, {
    uid: user.uid,
    displayName: user.displayName,
    photoURL: user.photoURL,
  });
};

const deleteOnline = async (dataBase) => {
  await deleteDoc(dataBase);
};

async function sendMsgAction(
  dataBase,
  dataBaseReverce,
  user,
  companionUid,
  msgText,
  firstMsg
) {
  const bodyMsg = {
    userUid: user.uid,
    text: firstMsg ? firstMsg : msgText,
    dateUser: getDate(),
  };
  const date = new Date();
  const msgSendler = await setDoc(
    dataBase,
    { [date]: { ...bodyMsg, unreaded: true } },
    { merge: true }
  );
  if (user.uid != companionUid) {
    const msgRecipient = await setDoc(
      dataBaseReverce,
      { [date]: { ...bodyMsg, isSended: false } },
      { merge: true }
    );
  }
}

async function updateDialog(dataBase) {
  const docRef = dataBase;
  const docSnap = await getDoc(docRef);
  return docSnap;
}

const checkerActivity = (dataBaseOnline, delay) => {
  return setTimeout(() => deleteOnline(dataBaseOnline), delay);
};

const checkingStatusMsg = async (dataBase, messages, user) => {
  Object.keys(messages).map(async (key) => {
    if (messages[key]["userUid"] !== user.uid && !messages[key]["isSended"]) {
      await updateDoc(dataBase, {
        [key]: { ...messages[key], ["unreaded"]: false },
      });
    }
  });
};

const deleteMsgAction = async (db, messages) => {
  await messages.forEach(async (msg) => {
    console.log("deleted " + msg);
    await updateDoc(db, {
      [msg]: deleteField(),
    });
  });
};
const deleteMsgAllAction = (db, dbReverce, messages) => {
  deleteMsgAction(db, messages).then(() => {
    deleteMsgAction(dbReverce, messages);
  });
};

const editMsgAction = async (db, dbReverce, messagesHistory, message, editMsg) => {
  await updateDoc(db, {
    [message]:{...messagesHistory[message], text:editMsg}
  })
  await updateDoc(dbReverce, {
    [message]:{...messagesHistory[message], text:editMsg}
  })
}

const checkibgUnreadedMsg = async (
  db,
  userUid,
  userDialogsCount,
  setUnreadedMsg
) => {
  if (userDialogsCount != undefined) {
    const idArray = Object.keys(userDialogsCount.docs).map(
      (key) => userDialogsCount.docs[key].id
    );

    idArray.forEach((profileUid) => {
      const subscribe = onSnapshot(doc(db, profileUid, userUid), (doc) => {
        let count;
        const docData = doc.data();
        if (docData != undefined) {
          count = 0;
          Object.keys(docData).forEach((key) =>
            docData[key].unreaded == true ? count++ : null
          );
        }
        setUnreadedMsg((prev) => ({ ...prev, [profileUid]: count }));
        subscribe();
      });
    });
  }
};

export {
  addOnline,
  deleteOnline,
  sendMsgAction,
  updateDialog,
  checkerActivity,
  checkingStatusMsg,
  deleteMsgAction,
  deleteMsgAllAction,
  checkibgUnreadedMsg,
  editMsgAction
};
