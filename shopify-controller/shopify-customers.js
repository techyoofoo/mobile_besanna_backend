import { shopify, mailConfig, host_email_id } from "./config";
import ShopifyUserUniqueNumber from "../models/unique-number-model";

export const CustomerDetails = async (request, h) => {
  try {
    return await shopify.customer
      .list()
      .then(cust => {
        let uniqueNum = 0;
        if (cust.length > 0) {
          let userInfo = [];
          cust.map((mail_id, i) => {
            if (request.params.user_email === mail_id.email) {
              uniqueNum = Math.floor(829713 + Math.random() * 900060);
              console.log(
                "index",
                i,
                "--mail--",
                mail_id.email,
                "uniquenumber",
                uniqueNum
              );
              const mailOptions = {
                from: host_email_id,
                to: "surendra.tondapu@yoofoo.com",
                subject: "Besanna mobile app verification code",
                html: `<h1>Besanna mobile app verification code</h1><p>${uniqueNum}</p>`
              };
              mailConfig.sendMail(mailOptions, function(error, info) {
                if (error) {
                  console.log(error);
                } else {
                  console.log("Email sent: " + info.response);
                }
              });
              userInfo.push(mail_id);
              SaveUniqueNumber({
                shopify_user_email: mail_id.email,
                user_code: uniqueNum
              });
            }
          });
          return { message: "data found", data: userInfo };
        } else return { message: "no data found", data: cust };
      })
      .catch(err => {
        return err;
      });
  } catch (error) {
    return h.response(error);
  }
};

//Save unique number in database and validate user
export const SaveUniqueNumber = async request => {
  try {
    console.log("--", request);
    const requestPayload = new ShopifyUserUniqueNumber(request);
    const saveUniqueNumberInfo = await requestPayload.save();
    return saveUniqueNumberInfo;
  } catch (error) {
    return error;
  }
};

//Validate user unique code
export const ValidateShopifyUserUniqueCode = async (request, h) => {
  try {
    const fetchUserUniqueInfo = await ShopifyUserUniqueNumber.find({
      shopify_user_email: request.payload.shopify_user_email,
      user_code: request.payload.user_code
    }).select("-_id -createdAt -updatedAt -__v");
    let len = 0;
    if (fetchUserUniqueInfo.length > 0) {
      len = fetchUserUniqueInfo.length;
      return h.response({ message: "Success", data: fetchUserUniqueInfo });
    } else {
      len = fetchUserUniqueInfo.length;
      return h.response({
        message: "No data found",
        data: fetchUserUniqueInfo
      });
    }
    return h.response(len);
  } catch (error) {
    return h.response(error);
  }
};
