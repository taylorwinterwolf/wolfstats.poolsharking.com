import { useState, useEffect } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { firestore } from '../firebase';

const useFetchCollection = <T,>(collectionName: string) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(firestore, collectionName));
        const querySnapshot = await getDocs(q);
        const docs = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as T[];
        setData(docs);
        setLoading(false);
      } catch (err) {
        setError(err as Error);
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName]);

  return { data, loading, error };
};

export default useFetchCollection;