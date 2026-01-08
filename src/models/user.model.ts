import mongoose, { model, Schema } from "mongoose";

interface IUser {
  name?: string;
  image?: string;
  email: string;
  password?: string;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, },
    image: {
      type: String,
    },
    email: { type: String, unique: true, required: true },
    password: { type: String, },
  },
  { timestamps: true }
);

const User = mongoose.models?.User || model("User", userSchema);
export default User;
