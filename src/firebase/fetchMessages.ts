import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  startAfter,
} from 'firebase/firestore';
import { db } from './config';
import { MessageType } from 'components/Message/Message';

export const fetchMessages = (
  setMessages: (messages: MessageType[]) => void,
  lastMessage?: MessageType | null,
) => {
  let q = query(
    collection(db, 'messages'),
    orderBy('createdAt', 'desc'),
    limit(5),
  );

  if (lastMessage) {
    // 이전 메시지보다 이전에 작성된 메시지를 가져오기 위해 필터링합니다.
    q = query(
      collection(db, 'messages'),
      orderBy('createdAt', 'desc'),
      startAfter(lastMessage.createdAt), // lastMessage 이후의 메시지만 가져옵니다.
      limit(5),
    );
  }

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
