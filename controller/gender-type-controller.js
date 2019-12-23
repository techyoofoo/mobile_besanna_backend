import GenderType from "../models/gender-type-model";
import mongoose, { Schema } from "mongoose";


export const CreateGenderType = async (request, h) => {
  try {
    const requestPayload = new GenderType(request.payload);
      const saveGenderData = await requestPayload.save();
    // console.log("--------", { _id: "nopadding", value: NumberInt(42) });
    console.log("------", await requestPayload);
    return h.response({
      message: " saved successfully"
    });
  } catch (error) {
    return h.response(error).code(500);
  }
};
