import EmotionType from "../models/emotion-type-model";
import mongoose, { Schema } from "mongoose";


export const CreateEmotionType = async (request, h) => {
  try {
    const requestPayload = new EmotionType(request.payload);
      const saveEmotionData = await requestPayload.save();
    // console.log("--------", { _id: "nopadding", value: NumberInt(42) });
    console.log("------", await requestPayload);
    return h.response({
      message: " saved successfully"
    });
  } catch (error) {
    return h.response(error).code(500);
  }
};
