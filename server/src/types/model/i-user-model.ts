import { ObjectId } from "mongoose";
import { AuthProvider } from "./i-model";
import { ROLE } from "../../config/constants";

export interface IUser extends Document {
  email?: string;
  password: string;
  role: ROLE;
  name?: string;
  avatar?: string;
  lastLogin?: Date;
  lastActive?: Date;
  isVerified: boolean;
  provider?: AuthProvider;
  providerId?: string;
  gameProgress?: Record<string, any>;
  preferences?: Record<string, any>;
  sessions: ObjectId[];
  stats?: ObjectId;
  isGuest: boolean;
  guestId?: string;
  guestExpiresAt?: Date;
}
