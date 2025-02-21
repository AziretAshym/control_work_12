import mongoose, { HydratedDocument, Model } from "mongoose";
import { UserFields } from "../types";
import bcrypt from "bcrypt";
import { randomUUID } from "crypto";

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserFields, {}, UserMethods>;

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

const regEmail = /^(\w+[-.]?\w+)@(\w+)([.-]?\w+)?(\.[a-zA-Z]{2,3})$/;


const UserSchema = new Schema<
  HydratedDocument<UserFields>,
  UserModel,
  UserMethods
>({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      {
        validator: async function (this: HydratedDocument<UserFields>, value: string): Promise<boolean> {
          if (!this.isModified('email')) return true;
          const user: UserFields | null = await User.findOne({email: value});
          return !user;
        },
        message: "This email is already taken",
      },
      {
        validator: async function (this: HydratedDocument<UserFields>, value: string): Promise<boolean> {
          if (!this.isModified('email')) return true;
          return regEmail.test(value);
        },
        message: "Invalid email format",
      }
    ]
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  avatar: String,
  googleId: String,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.checkPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};
UserSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

UserSchema.set("toJSON", {
  transform: (_doc, ret, _options) => {
    delete ret.password;
    return ret;
  },
});

const User = mongoose.model("User", UserSchema);

export default User;
