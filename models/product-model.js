import mongoose, { Schema } from "mongoose";
var Int32 = require("mongoose-int32");

const productSchema = new Schema(
  {
    company_id: { type: Schema.Types.ObjectId, ref: "Company" },
    name: { type: String },
    short_description: { type: String },
    long_description: { type: String },
    benfits: { type: String },
    directions: { type: String },
    cautions: { type: String },
    mind: { type: String },
    positives: { type: String },
    negatives: { type: String },
    product_body: { type: String },
    complimentary: { type: Schema.Types.ObjectId, ref: "Product" },
    alternatives: { type: Schema.Types.ObjectId, ref: "Product" },
    excluded_markets: [{ type: Schema.Types.ObjectId, ref: "Market" }],
    productTypeFlags: Int32,
    usageTypeFlags: Int32,
    fragranceTypeFlags: Int32,
    genderTypeFlags: Int32,
    emotionTypeFlags: Int32,
    applicationTypeFlags: Int32,
    stimulantCommand: [Int32],
    frequency: Int32,
    image_path: { type: String }
  },
  {
    timestamps: true
  }
);

productSchema.methods = {
  view(full) {
    const view = {
      id: this.id,
      company_id: this.company_id,
      short_description: this.short_description,
      long_description: this.long_description,
      benfits: this.benfits,
      directions: this.directions,
      cautions: this.cautions,
      mind: this.mind,
      positives: this.positives,
      negatives: this.negatives,
      product_body: this.product_body,
      complimentary: this.complimentary,
      alternatives: this.alternatives,
      excluded_markets: this.excluded_markets,
      productTypeFlags: this.productTypeFlags,
      usageTypeFlags: this.usageTypeFlags,
      fragranceTypeFlags: this.fragranceTypeFlags,
      genderTypeFlags: this.genderTypeFlags,
      emotionTypeFlags: this.emotionTypeFlags,
      applicationTypeFlags: this.applicationTypeFlags,
      stimulantCommand: this.stimulantCommand,
      frequency: this.frequency,
      image_path: this.image_path
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
