import { Timestamp } from 'firebase/firestore';
import { User } from './user.model';

export interface ChatWindow {
  id: string;
  userIds: string[];
  picture?: string;
  name?: string;
  bio?: string;
}

export interface Message {
  senderId: string;
  text: string;
  time: Date & Timestamp;
}
