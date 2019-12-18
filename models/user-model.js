import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    user_name: {
      type: String,
      default: 0
    },
    user_pass: {
      type: String
    },
    email_id: {
      type: String
    },
    gender_type: {
      type: String
    },
    profile_picture: { type: String },
    date_of_birth: { type: String },
    status: {
      type: String,
      enum: ["Active", "In-Active"],
      default: "Active"
    }
  },
  {
    timestamps: true
  }
);
userSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      user_name: this.user_name,
      user_pass: this.user_pass,
      email_id: this.email_id,
      gender_type: this.gender_type,
      profile_picture: this.profile_picture,
      date_of_birth: this.date_of_birth,
      status: this.status
    };

    return full
      ? {
          ...view
        }
      : view;
  }
};
const model = mongoose.model("user", userSchema);

export const schema = model.schema;
export default model;
