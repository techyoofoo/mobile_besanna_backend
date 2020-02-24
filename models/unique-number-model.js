import mongoose, { Schema } from "mongoose";

const emailUniqueNumberSchema = new Schema(
  {
    shopify_user_email: {
      type: String
    },
    user_code: {
      type: String
    }    
  },
  { timestamps: true }
);

emailUniqueNumberSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      shopify_user_email: this.shopify_user_email,
      user_code: this.user_code,
    };

    return full
      ? {
          ...view
        }
      : view;
  }
};

const model = mongoose.model("shopify_user_unique", emailUniqueNumberSchema);

export const schema = model.schema;
export default model;
