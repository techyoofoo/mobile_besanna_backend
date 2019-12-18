import ShopifyUser from "../models/shopify-user";

//Create users and check if user exists or not
export const CreateShopifyUser = async (request, h) => {
  try {
    const chkUserExists = await ShopifyUser.find({
      email: request.payload.email
    });
    if (chkUserExists.length > 0) {
      return h.response({
        Message: request.payload.email + " user already exists",
        status: 200
      });
    }
    const requestData = new ShopifyUser(request.payload);
    const saveRequestPayload = await requestData.save();
    return h.response({
      Message: saveRequestPayload.email + " saved successfully"
    });
  } catch (error) {
    return h.response(error).code(500);
  }
};
//Get all list of users
export const GetAllShopifyUsers = async (req, res) => {
  try {
    const lstOfUsers = ShopifyUser.find({}).select(
      "-_id -createdAt -updatedAt -__v -password"
    );
    let fetchuserDetails = await lstOfUsers;
    let len = 0;
    console.log("-----users length-----", fetchuserDetails.length);
    if (fetchuserDetails.length > 0) {
      len = fetchuserDetails.length;
      return res.response({ data: fetchuserDetails, message: "Success" });
    } else {
      len = fetchuserDetails.length;
      return res.response({ data: fetchuserDetails, message: "No data found" });
    }

    return len;
  } catch (error) {
    return res.response(error).code(500);
  }
};

//Get users details by email id
export const GetUserByEmailId = async (req, h) => {
  try {
    const filterByEmail = await ShopifyUser.find({
      email: req.params.email_id
    }).select("-_id -createdAt -updatedAt -__v -password");
    console.log("-----length", filterByEmail.length, req.params.email_id);
    let userlen = 0;
    if (filterByEmail.length > 0) {
      userlen = filterByEmail.length;
      return h.response({ data: filterByEmail, message: "Success" });
    } else {
      userlen = filterByEmail.length;
      return h.response({ data: filterByEmail, message: "No data found" });
    }

    return userlen;
  } catch (error) {
    return h.response(error).code(500);
  }
};

//Delete - Make Inactive user
export const InactiveUserAccount = async (req, h) => {
  try {
    const filterByEmail = await ShopifyUser.find({
      email: req.params.email_id,
      status: "Active"
    }).select("-_id -createdAt -updatedAt -__v -password");
    console.log("-----length", filterByEmail.length, req.params.email_id);
    let userlen = 0;
    if (filterByEmail.length > 0) {
      userlen = filterByEmail.length;
      const filter = { email: req.params.email_id };
      const update = { status: "In-Active" };
      let docUpdate = await ShopifyUser.findOneAndUpdate(filter, update).select(
        "-_id -createdAt -updatedAt -__v -password"
      );
      return h.response({ data: docUpdate, message: "Success" });
    } else {
      userlen = filterByEmail.length;
      return h.response({ data: filterByEmail, message: "No data found" });
    }
    return userlen;
  } catch (error) {
    return h.response(error).code(500);
  }
};
