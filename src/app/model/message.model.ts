import { Timestamp } from 'firebase/firestore';
import { User } from './user.model';

export interface ChatWindow {
  id: string;
  userIds: string[];
  users: User[]; //TODO: delete
  lastMessage?: string; //TODO: delete
  messageDate?: Date & Timestamp; //TODO: delete
  picture?: string;
  name?: string;
}

export interface Message {
  senderId: string;
  text: string;
  time: Date & Timestamp;
}
