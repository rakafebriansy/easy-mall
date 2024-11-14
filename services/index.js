import { collection, getDocs, query, where } from "firebase/firestore";
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
