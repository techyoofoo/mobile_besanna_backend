import mongoose, { Schema } from "mongoose";

const shopifyUserSchema = new Schema(
  {
    email: {
      type: String
    },
    password: {
      type: String
    },
    status: {
      type: String,
      enum: ["Active", "In-Active"],
      default: "Active"
    }
  },
  { timestamps: true }
);

shopifyUserSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      email: this.email,
      password: this.password,
      status: this.status
    };

    return full
      ? {
          ...view
        }
      : view;
  }
};

const model = mongoose.model("Shopify_User", shopifyUserSchema);

export const schema = model.schema;
export default model;
