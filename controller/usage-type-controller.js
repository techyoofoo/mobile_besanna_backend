import UsageType from "../models/usage-type-model";
import mongoose, { Schema } from "mongoose";


export const CreateUsageType = async (request, h) => {
  try {
    const requestPayload = new UsageType(request.payload);
      const saveUsageTypeData = await requestPayload.save();
    // console.log("--------", { _id: "nopadding", value: NumberInt(42) });
    console.log("------", await requestPayload);
    return h.response({
      message: " saved successfully"
    });
  } catch (error) {
    return h.response(error).code(500);
  }
};
