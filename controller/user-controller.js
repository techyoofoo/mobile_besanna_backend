import User from "../models/user-model";

export const createUser = async (request, h) => {
  try {
    const chkUserExists = await User.find({
      user_name: request.payload.user_name
    });
    let saveUserData = [];
    if (chkUserExists.length > 0) {
      return h.response({
        Message: request.payload.user_name + " user already exists",
        status: 200
      });
    } else {
      const usrPayload = new User(request.payload);
      saveUserData = await usrPayload.save();
      return h.response({
        Message: saveUserData.user_name + " saved successfully ",
        status: 200
      });
    }
    return saveUserData;
  } catch (error) {
    return h.response(error).code(500);
  }
};

//Get user information
export const getAllUser = async (req, h) => {
  try {
    const lstOfUsers = User.find({});
    const strUser = await lstOfUsers;
    return h.response({ data: strUser, status: 200 });
  } catch (error) {
    return h.response(error).code(500);
  }
};

//Get user by id
export const getUserDataByName = async (req, h) => {
  try {
    const findUser = User.find({ user_name: req.params.user_name }).select(
      "-_id -createdAt -updatedAt -user_pass -__v"
    );
    const fetchUserData = await findUser;
    return h.response({ data: fetchUserData, status: 200 });
  } catch (error) {
    return h.response(error).code(500);
  }
};

//Validate the user details
export const ValidateUserDetails = async (req, h) => {
  try {
    // console.log("------", req.payload);
    const checkUserDetails = User.find(req.payload).select(
      "-_id -createdAt -updatedAt -user_pass -__v"
    );
    const respUserDtls = await checkUserDetails;
    // console.log("------len----", respUserDtls.length);
    let msgData = "";
    if (respUserDtls.length > 0)
      return h.response({
        data: respUserDtls,
        Message: "Success",
        status: 200
      });
    else {
      return h.response({ data: [], Message: "No data found", status: 200 });
    }

    return msgData; //h.response({ data: respUserDtls, status: 200 });
  } catch (error) {
    return h.response(error).code(500);
  }
};
