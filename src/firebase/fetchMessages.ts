import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
} from 'firebase/firestore';
import { db } from './config';
import { MessageType } from 'components/Message/Message';

export const fetchMessages = (
  setMessages: (messages: MessageType[]) => void,
) => {
  const q = query(
    collection(db, 'messages'),
    orderBy('createdAt', 'desc'),
    limit(50),
  );

  const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
    const fetchedMessages: MessageType[] = [];

    QuerySnapshot.forEach((doc) => {
      const data: any = doc.data();

      if (data.createdAt) {
        const message: MessageType = {
          ...data,
          id: doc.id,
        };
        fetchedMessages.push(message);
      } else {
        console.warn('Skipping message without createdAt:', data);
      }
    });

    const sortedMessages = fetchedMessages.sort(
      (a, b) => a.createdAt.toMillis() - b.createdAt.toMillis(),
    );
    setMessages(sortedMessages);
  });

  return unsubscribe;
};
