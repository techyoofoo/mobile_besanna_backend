import AddAFriend from "../models/add-friend-model";

export const CreateFirendRequest = async (req, h) => {
  try {
      console.log('--', req.payload)
    const requestPayload = new AddAFriend(req.payload);
    const saveFriendInfo = await requestPayload.save();

    return h.response({
      saveFriendInfo,
      message: saveFriendInfo.name + " saved successfully"
    });
  } catch (error) {
    return h.response(error).code(500);
  }
};

export const FetchAllFriendsList = async (req, h) => {
  try {
    const fetchFriendsData = await AddAFriend.find({}).select(
      "-_id -createdAt -updatedAt -__v"
    );
    // let fetchFriendsData = await lstOfFriends;
    let len = 0;
    console.log("-----users length-----", fetchFriendsData.length);
    if (fetchFriendsData.length > 0) {
      len = fetchFriendsData.length;
      return h.response({ message: "Success", data: fetchFriendsData });
    } else {
      len = fetchFriendsData.length;
      return h.response({ message: "No data found", data: fetchFriendsData });
    }

    return len;
  } catch (error) {
    return h.response(error).code(500);
  }
};
