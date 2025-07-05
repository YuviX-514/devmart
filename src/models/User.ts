import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

interface CartItem {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
  cart: CartItem[];
  generateJWT(): string;
}

interface IUserModel extends Model<IUser> {
  matchPasswordAndGenerateToken(email: string, password: string): Promise<IUser>;
}

const UserSchema = new Schema<IUser, IUserModel>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 3 },
  avatar: { type: String, default: "" },
  bio: { type: String, default: "HELLO" },
  cart: [
    {
      id: { type: String },
      title: { type: String },
      price: { type: Number },
      thumbnail: { type: String },
      quantity: { type: Number },
    },
  ],
});

// ✅ Hash password before save
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const hashed = await bcrypt.hash(this.password, 12);
  this.password = hashed;
  next();
});

// ✅ JWT Generator
UserSchema.methods.generateJWT = function (): string {
  return jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
};

// ✅ Static method for login
UserSchema.statics.matchPasswordAndGenerateToken = async function (
  email: string,
  password: string
): Promise<IUser> {
  const user = await this.findOne({ email });
  if (!user) throw new Error("User not found");
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid password");
  return user;
};

const User = mongoose.models.User || mongoose.model<IUser, IUserModel>("User", UserSchema);
export default User;
