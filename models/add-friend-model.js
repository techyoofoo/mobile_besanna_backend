import mongoose, { Schema } from "mongoose";

const addAFriendSchema = new Schema(
  {
    name: { type: String },
    profile_pic: { type: String },
    email_id: { type: String },
    gender_type: { type: Schema.Types.ObjectId, ref: "Gender_Type" },
    date_of_birth: { type: Date },
    products_selected: [{ type: String }]
  },
  { timestamps: true }
);


addAFriendSchema.methods = {
    view(full) {
      const view = {
        id: this.id,
        name: this.name,
        profile_pic: this.profile_pic,
        email_id: this.email_id,
        gender_type: this.gender_type,
        date_of_birth: this.date_of_birth,
        products_selected: this.products_selected
      };
      return full
        ? {
            ...view
          }
        : view;
    }
  };
  const model = mongoose.model("Add_Friend", addAFriendSchema);
  
  export const schema = model.schema;
  export default model;