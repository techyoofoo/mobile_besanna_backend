import Shopify from "shopify-api-node";

export const shopify = new Shopify({
    shopName: process.env.SHOPIFY_STORE_NAME,
    apiKey: process.env.SHOPIFY_API_KEY, //'4b59fd94b51ec44935c3c54c16b42313',
    password: process.env.SHOPIFY_API_PASS
  });