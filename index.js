import Hapi from "hapi";
import mongoose from "mongoose";
import {
  CreateShopifyUser,
  GetAllShopifyUsers,
  GetUserByEmailId,
  InactiveUserAccount
} from "./controller/shopify-user-controller";
import { CreateMarket, GetAllMarkets,GetMarketDataByName, InActivateMarketName } from "./controller/market-controller";

mongoose
  .connect(
    "mongodb://ec2-52-53-232-232.us-west-1.compute.amazonaws.com:27017/besanna_db",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    }
  )
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.error(err));

const init = async () => {
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

const server = Hapi.server({
  port: process.env.PORT || 9002,
  host: process.env.IP || "0.0.0.0",
  routes: {
    cors: {
      origin: ["*"],
      headers: ["Accept", "Content-Type"],
      additionalHeaders: ["X-Requested-With"]
    }
  }
});
server.route({
  method: "GET",
  path: "/",
  handler: function(request, h) {
    console.log("Test Data");
    return "Hello";
  }
});

//---------------------------------------Shopify Users Starts--------------------------------
server.route({
  method: "POST",
  path: "/create-shopify-user",
  handler: CreateShopifyUser
});

server.route({
  method: "GET",
  path: "/get-shopify-user",
  handler: GetAllShopifyUsers
});

server.route({
  method: "GET",
  path: "/get-shopify-user-by-email/{email_id}",
  handler: GetUserByEmailId
});

server.route({
  method: "GET",
  path: "/in-active-shopify-user-by-email/{email_id}",
  handler: InactiveUserAccount
});
//---------------------------------------Shopify Users Ends--------------------------------

//---------------------------------------Market REST Services START--------------------------------

server.route({
  method: "POST",
  path: "/create-market",
  handler: CreateMarket
});

server.route({
  method:"GET",
  path:"/get-all-markets",
  handler: GetAllMarkets
})

server.route({
  method:"GET",
  path:"/get-market-by-name/{market_name}",
  handler:GetMarketDataByName
})

server.route({
  method:"GET",
  path:"/in-active-market-by-name/{market_name}",
  handler:InActivateMarketName
})

//---------------------------------------Market REST Services ENDS---------------------------------

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
