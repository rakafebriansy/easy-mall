import { collection, doc, getDoc, getDocs, limit, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../config/FirebaseConfig";

export const getRecordsByField = async (tableName, fieldName, operator, value) => {
  const data = [];
  const q = query(collection(db, tableName), where(fieldName, operator, value));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return data;
};

export const getRecordById = async (tableName, documentId) => {
  const docRef = doc(db, tableName, documentId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    return null;
  }
  return { id: docSnap.id, ...docSnap.data() };
};

export const getRecords = async (tableName, numberOfRecord) => {
  const data = [];
  const q = numberOfRecord ? query(collection(db, tableName), limit(numberOfRecord)) : query(collection(db, tableName));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  return data;
};

export const updateRecord = async (tableName, documentId, value) => {
  const docRef = doc(db, tableName, documentId);
  await updateDoc(docRef, value);
};

export const storeRecord = async (tableName, documentId, value) => {
  const docRef = doc(db, tableName, documentId);
  await setDoc(docRef, value);
};