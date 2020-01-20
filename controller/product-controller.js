import ProductInfo from "../models/product-model";

export const CreateProducts = async (request, h) => {
  try {
    const productPayload = new ProductInfo(request.payload);
    const saveProductData = await productPayload.save();

    return h.response({Message: saveProductData + " Saved Successfully",  status: 200});
  } catch (error) {
    return h.response(error).code(500);
  }
};
