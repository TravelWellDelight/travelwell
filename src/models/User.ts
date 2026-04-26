import mongoose, { Schema, Document, Model } from "mongoose";
import crypto from "crypto";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passwordHash: string;
  salt: string;
  dateOfBirth?: string;
  nationality?: string;
  city?: string;
  state?: string;
  address?: string;
  avatar?: string;
  anniversary?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  howHeard?: string;
  preferredContact?: string;
  dietaryPreference?: string;
  seatPreference?: string;
  travelStyle?: string[];
  usualTripLength?: string;
  budgetRange?: string;
  preferredLanguage?: string;
  passportNumber?: string;
  passportExpiry?: string;
  passportCountry?: string;
  aadhaarNumber?: string;
  panNumber?: string;
  role: "user" | "admin";
  wishlist: string[];
  createdAt: Date;
  updatedAt: Date;
  setPassword(password: string): void;
  checkPassword(password: string): boolean;
}

const UserSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true },
    salt: { type: String, required: true },
    dateOfBirth: String,
    nationality: { type: String, default: "Indian" },
    city: String,
    state: String,
    address: String,
    avatar: String,
    anniversary: String,
    emergencyContactName: String,
    emergencyContactPhone: String,
    howHeard: String,
    preferredContact: { type: String, default: "WhatsApp" },
    dietaryPreference: String,
    seatPreference: String,
    travelStyle: [String],
    usualTripLength: String,
    budgetRange: String,
    preferredLanguage: { type: String, default: "English" },
    passportNumber: String,
    passportExpiry: String,
    passportCountry: String,
    aadhaarNumber: String,
    panNumber: String,
    role: { type: String, enum: ["user", "admin"], default: "user" },
    wishlist: [{ type: String }],
  },
  { timestamps: true },
);

UserSchema.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.passwordHash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

UserSchema.methods.checkPassword = function (password: string): boolean {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.passwordHash === hash;
};

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
