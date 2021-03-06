import mongoose, { Schema } from "mongoose";
var Int32 = require("mongoose-int32");

const genderTypeSchema = new Schema(
  {
    bit_pattern: Int32,
    name: { type: String },
    status: {
      type: String,
      enum: ["Active", "In-Active"],
      default: "Active"
    }
  },
  { timestamps: true }
);

genderTypeSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      bit_pattern: this.bit_pattern,
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
const model = mongoose.model("Gender_Type", genderTypeSchema);

export const schema = model.schema;
export default model;
