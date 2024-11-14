import { collection, doc, getDoc, getDocs, limit, query, updateDoc, where } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

export const getRecordsByField = async (table, field, operator, value) => {
  const data = [];
  const q = query(collection(db, table), where(field, operator, value));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return data;
};

export const getRecordById = async (table, id) => {
  const docRef = doc(db, table, id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return null;
  }
  return { id: docSnap.id, ...docSnap.data() };
};

export const getRecords = async (table, numberOfRecord) => {
  const data = [];
  const q = numberOfRecord ? query(collection(db, table), limit(numberOfRecord)) : query(collection(db, table));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return data;
};

export const updateRecord = async (table, id, value) => {
  const docRef = doc(db, table, id);
  await updateDoc(docRef, value);
};
