import FragranceType from "../models/fragrance-type-model";
import mongoose, { Schema } from "mongoose";


export const CreateFragranceType = async (request, h) => {
  try {
    const requestPayload = new FragranceType(request.payload);
      const saveFragranceTypeData = await requestPayload.save();
    // console.log("--------", { _id: "nopadding", value: NumberInt(42) });
    console.log("------", await requestPayload);
    return h.response({
      message: " saved successfully"
    });
  } catch (error) {
    return h.response(error).code(500);
  }
};
