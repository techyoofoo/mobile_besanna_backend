import mongoose, { Schema } from "mongoose";

const marketSchema = new Schema(
  {
    name: { type: String },
    status: {
        type: String,
        enum: ["Active", "In-Active"],
        default: "Active"
      }
  },
  { timestamps: true }
);
marketSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      name: this.name,
      status: this.status
    };
    return full
      ? {
          ...view
        }
      : view;
  }
};
const model = mongoose.model("Market", marketSchema);

export const schema = model.schema;
export default model;
