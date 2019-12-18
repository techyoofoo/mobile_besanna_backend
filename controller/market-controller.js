import Markets from "../models/market-model";

export const CreateMarket = async (request, h) => {
  try {
    const requestPayload = new Markets(request.payload);
    const saveMarketData = await requestPayload.save();

    return h.response({
      saveMarketData,
      message: saveMarketData.name + " saved successfully"
    });
  } catch (error) {
    return h.response(error).code(500);
  }
};

//Get all list of users
export const GetAllMarkets = async (req, res) => {
  try {
    const lstOfMarkets = Markets.find({}).select(
      "-_id -createdAt -updatedAt -__v"
    );
    let fetchMarketData = await lstOfMarkets;
    let len = 0;
    console.log("-----users length-----", fetchMarketData.length);
    if (fetchMarketData.length > 0) {
      len = fetchMarketData.length;
      return res.response({ data: fetchMarketData, message: "Success" });
    } else {
      len = fetchMarketData.length;
      return res.response({ data: fetchMarketData, message: "No data found" });
    }

    return len;
  } catch (error) {
    return res.response(error).code(500);
  }
};

//Get Market data based on name
export const GetMarketDataByName = async (req, h) => {
  try {
    const fetchmarketDataByName = await Markets.find({
      name: req.params.market_name
    }).select("-_id -createdAt -updatedAt -__v");
    if (fetchmarketDataByName.length > 0) {
      return h.response({ data: fetchmarketDataByName, message: "success" });
    } else {
      return h.response({
        data: fetchmarketDataByName,
        message: "no data found"
      });
    }
    return h.response({ data: fetchmarketDataByName, message: "success" });
  } catch (error) {
    return h.response(error).code(500);
  }
};

//Inactiveate Market name from collection
export const InActivateMarketName = async (req, h) => {
  try {
    const getActivatedMarketData = await Markets.find({
      name: req.params.market_name,
      status: "Active"
    }).select("-_id -createdAt -updatedAt -__v");
    if (getActivatedMarketData.length > 0) {
      const filterVal = { name: req.params.market_name };
      const updateVal = { status: "In-Active" };
      const updateStatus = await Markets.findOneAndUpdate(
        filterVal,
        updateVal,
        { new: true }
      );
      return h.response({
        data: updateStatus,
        message: updateStatus.name + " is In-Activated"
      });
    } else {
      return h.response({
        data: getActivatedMarketData,
        message: "no data found"
      });
    }
    return h.response({ data: getActivatedMarketData });
  } catch (error) {
    return h.response(error).code(500);
  }
};
