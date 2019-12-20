import ApplicationType from "../models/application-type-model";
import mongoose, { Schema } from "mongoose";

// export const CreateApplicationType = async (req,h) => {
//     try {
//         // 00000000 00000000 00000000 0000000
//         // console.log('--------', NumberInt(req.payload.bit_pattern))
//         const requestPayload = new ApplicationType(request.payload);
//         const saveDt = await requestPayload.save();
//         return h.response(saveDt).code(200)
//     } catch (error) {
//         return h.response(error).code(500)
//     }
// }

export const CreateApplicationType = async (request, h) => {
  try {
    const requestPayload = new ApplicationType(request.payload);
      const saveMarketData = await requestPayload.save();
    // console.log("--------", { _id: "nopadding", value: NumberInt(42) });
    console.log("------", await requestPayload);
    return h.response({
      message: " saved successfully"
    });
  } catch (error) {
    return h.response(error).code(500);
  }
};
