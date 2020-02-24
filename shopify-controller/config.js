import Shopify from "shopify-api-node";
import nodemailer from "nodemailer" 

export const shopify = new Shopify({
    shopName: process.env.SHOPIFY_STORE_NAME,
    apiKey: process.env.SHOPIFY_API_KEY, //'4b59fd94b51ec44935c3c54c16b42313',
    password: process.env.SHOPIFY_API_PASS
  });

  //Email Configuration
export const mailConfig = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'yoofootech@gmail.com',
      pass: 'P@ssw0rd149'
    }
  });

export const host_email_id = 'yoofootech@gmail.com'