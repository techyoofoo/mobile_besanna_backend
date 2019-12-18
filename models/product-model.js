import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    oil_category: { type: String },
    oil_type: { type: String },
    short_description: { type: String },
    long_description: { type: String },
    primary_benfits: { type: String },
    directions: { type: Array },
    cautions: { type: String },
    uses: { type: Array },
    mind: { type: String },
    positive_emotions_address: { type: String },
    negative_emotions_address: { type: String },
    data_body: { type: String },
    complimentary: { type: String }
  },
  {
    timestamps: true
  }
);

productSchema.methods = {
  view(full) {
    const view = {
      oil_category: this.oil_category,
      oil_type: this.oil_type,
      short_description: this.short_description,
      long_description: this.long_description,
      primary_benfits: this.primary_benfits,
      directions: this.directions,
      cautions: this.cautions,
      uses: this.uses,
      mind: this.mind,
      positive_emotions_address: this.positive_emotions_address,
      negative_emotions_address: this.negative_emotions_address,
      data_body: this.data_body,
      complimentary: this.complimentary
    };
    return full
      ? {
          ...view
        }
      : view;
  }
};

const model = mongoose.model("product", productSchema);

export const schema = model.schema;
export default model;
