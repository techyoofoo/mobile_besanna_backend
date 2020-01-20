import Hapi from "hapi";
import mongoose from "mongoose";
import {
  CreateShopifyUser,
  GetAllShopifyUsers,
  GetUserByEmailId,
  InactiveUserAccount
} from "./controller/shopify-user-controller";
import {
  CreateMarket,
  GetAllMarkets,
  GetMarketDataByName,
  InActivateMarketName
} from "./controller/market-controller";
import {
  CreateCompany,
  GetAllCompanies,
  GetCompanyDataByName,
  InActivateCompanyName
} from "./controller/company-controller";
import { CreateApplicationType } from "./controller/application-type-controller";
import { CreateEmotionType } from "./controller/emotion-type-controller";
import { CreateGenderType } from "./controller/gender-type-controller";
import { CreateFragranceType } from "./controller/fragrance-type-controller";
import { CreateUsageType } from "./controller/usage-type-controller";
import { CreateProductType } from "./controller/product-type-controller";
import { CreateProducts, GetAllProducts, GetProductsByName } from './controller/product-controller';
import {CreateFirendRequest, FetchAllFriendsList} from './controller/add-friend-controller';

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
  method: "GET",
  path: "/get-all-markets",
  handler: GetAllMarkets
});

server.route({
  method: "GET",
  path: "/get-market-by-name/{market_name}",
  handler: GetMarketDataByName
});

server.route({
  method: "GET",
  path: "/in-active-market-by-name/{market_name}",
  handler: InActivateMarketName
});

//---------------------------------------Market REST Services ENDS---------------------------------

//---------------------------------------Company REST Services START--------------------------------

server.route({
  method: "POST",
  path: "/create-company",
  handler: CreateCompany
});

server.route({
  method: "GET",
  path: "/get-all-companies",
  handler: GetAllCompanies
});

server.route({
  method: "GET",
  path: "/get-companies-by-name/{Company_name}",
  handler: GetCompanyDataByName
});

server.route({
  method: "GET",
  path: "/in-active-companies-by-name/{Company_name}",
  handler: InActivateCompanyName
});

//---------------------------------------Company REST Services ENDS---------------------------------

//--------------------------------------Create Application Type Starts-------------------------------------
server.route({
  method: "POST",
  path: "/create-app-type",
  handler: CreateApplicationType
});
//--------------------------------------Create Application Type Ends-------------------------------------

//--------------------------------------Create Emotion Type Start-------------------------------------
server.route({
  method: "POST",
  path: "/create-emotion-type",
  handler: CreateEmotionType
});
//--------------------------------------Create Emotion Type Ends-------------------------------------

//--------------------------------------Create Gender Type Start-------------------------------------
server.route({
  method: "POST",
  path: "/create-gender-type",
  handler: CreateGenderType
});
//--------------------------------------Create Gender Type Ends-------------------------------------
//--------------------------------------Create Fragrance Type Start-------------------------------------
server.route({
  method: "POST",
  path: "/create-fragrance-type",
  handler: CreateFragranceType
});
//--------------------------------------Create Fragrance Type Ends-------------------------------------

//--------------------------------------Create Usage Type Start-------------------------------------
server.route({
  method: "POST",
  path: "/create-usage-type",
  handler: CreateUsageType
});
//--------------------------------------Create Usage Type Ends-------------------------------------

//--------------------------------------Create Product Type Start-------------------------------------
server.route({
  method: "POST",
  path: "/create-product-type",
  handler: CreateProductType
});
//--------------------------------------Create Product Type Ends-------------------------------------

//---Create a product------
server.route({
  method:"POST",
  path:"/create-a-product",
  handler: CreateProducts
})

server.route({
  method:"GET",
  path:"/get-all-products",
  handler: GetAllProducts
})
server.route({
  method:"GET",
  path:"/get-product-by-name/{product_name}",
  handler:GetProductsByName
})
//---------------------------

//---------------------Friend list CRUD start----------------------------
server.route({
  method:"POST",
  path:"/add-a-friend",
  handler: CreateFirendRequest
})

server.route({
  method:"GET",
  path:"/fetch-all-friends",
  handler:FetchAllFriendsList
})
//-------------------- Friend LIST CRUD ends-----------------------------

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
