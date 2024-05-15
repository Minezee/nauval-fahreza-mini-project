import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/init";
import dayjs from "dayjs";

export async function getData(collectionPath, sort) {
  const ref = collection(db, collectionPath);
  const querySnapshot = await getDocs(query(
    ref,
    orderBy('createdAt', sort),
  ));

  const data = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });
  return data;
}

export async function getSingleData(collectionPath, docId) {
  const docRef = doc(db, collectionPath, docId);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    return docSnapshot.data();
  } else {
    console.log("No such document!");
    return null;
  }
}

export async function addData(collectionPath, object, onSuccess, onError) {
  const ref = collection(db, collectionPath);
      addDoc(ref, {
        ...object,
        createdAt: dayjs().format(),
      }).then((docRef) => {
        const docId = docRef.id;
        updateDoc(doc(ref, docId), {
          id: docId
        }).then((data) => {
          onSuccess(data);
        }).catch((err) => {
          onError(err);
        })
      }).catch((err) => {
        onError(err);
      });
}
