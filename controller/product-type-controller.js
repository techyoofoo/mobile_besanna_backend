import ProductType from "../models/product-type-model";
import mongoose, { Schema } from "mongoose";


export const CreateProductType = async (request, h) => {
  try {
    const requestPayload = new ProductType(request.payload);
      const saveProductTypeData = await requestPayload.save();
    // console.log("--------", { _id: "nopadding", value: NumberInt(42) });
    console.log("------", await requestPayload);
    return h.response({
      message: " saved successfully"
    });
  } catch (error) {
    return h.response(error).code(500);
  }
};
