import ProductInfo from "../models/product-model";

export const CreateProducts = async (request, h) => {
  try {
    const productPayload = new ProductInfo(request.payload);
    const saveProductData = await productPayload.save();

    return h.response({
      Message: saveProductData.name + " Saved Successfully",
      status: 200
    });
  } catch (error) {
    return h.response(error).code(500);
  }
};

// Get all the records{Image, Primary Benefits, Flags}
export const GetAllProducts = async (request, h) => {
  try {
    const lstOfProducts = ProductInfo.find({}).select("benfits name image_path Aromatic Topically internally Dilute youngskin nodilution");
    const storeProdcutsInfo = await lstOfProducts;
    return h.response({ data: storeProdcutsInfo, status: 200 });
  } catch (error) {
    return h.response(error).code(500);
  }
}

export const GetProductsByName = async (request, h) => {
  try {
    const showProductData = ProductInfo.find({"name":request.params.product_name});
    const storeProductInfo = await showProductData;
    return h.response({ data: storeProductInfo, status: 200 });
  } catch (error) {
    return h.response(error).code(500);
  }
}