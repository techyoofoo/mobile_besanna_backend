import mongoose, { Schema } from "mongoose";

const companySchema = new Schema(
  {
    name: { type: String },
    company_id:{type:Number},
    status: {
      type: String,
      enum: ["Active", "In-Active"],
      default: "Active"
    }
  },
  { timestamps: true }
);

companySchema.methods = {
    view(full) {
      const view = {
        id: this.id,
        name: this.name,
        company_id: this.company_id,
        status: this.status
      };
      return full
        ? {
            ...view
          }
        : view;
    }
  };
  const model = mongoose.model("Company", companySchema);
  
  export const schema = model.schema;
  export default model;