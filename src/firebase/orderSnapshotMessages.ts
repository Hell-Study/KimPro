import { MessageType } from 'components/Message/Message.types';

// Firestore 스냅샷을 처리하고 메시지를 정렬하는 함수
export function orderSnapshotMessages(QuerySnapshot: any) {
  const fetchedMessages: MessageType[] = [];

  QuerySnapshot.forEach((doc: any) => {
    const data = doc.data();

    if (data.createdAt) {
      const message = {
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

  return sortedMessages;
}
