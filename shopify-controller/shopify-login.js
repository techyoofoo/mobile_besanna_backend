import { shopify } from "./config";

export const CustomerDetails = async (request, h) => {
  try {
    // let dat = [];
    // const customerData = shopify.customer.list().then(cust => {return cust}).catch(err => console.error(err));
    // console.log('-----',await customerData);
    return await shopify.customer
      .list()
      .then(cust => {
        if (cust.length > 0) return { message: "data found", data: cust };
        else return { message: "no data found", data: cust };
      })
      .catch(err => {return err});
  } catch (error) {
    return h.response(error);
  }
};
