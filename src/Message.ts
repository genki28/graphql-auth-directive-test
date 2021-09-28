const messages = [
  {
    id: '1',
    senderId: '2',
    receiverId: '3',
    text: 'Hey Jen, how are you doing?',
  },
  {
    id: '2',
    senderId: '3',
    receiverId: '2',
    text: 'Hi Roy, I\'m doing great! How are you?',
  },
];
export default {
  getById: (id: string) => messages.find((message) => message.id === id),
};
