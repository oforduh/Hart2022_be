import axios from "axios";

const host = `https://api.paystack.co`;
export const paystack = (obj) => {
  const MySecretKey = `Bearer ${process.env.MySecretKey}`;

  const initializePayment = async (obj) => {
    const path = `/transaction/initialize`;
    const url = `${host}${path}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.MySecretKey}`,
      },
    };
    const { data } = await axios.post(url, obj, config);
    return data;
  };
  const verifyPayment = async (obj) => {
    const path = `/transaction/verify/${obj}`;
    const url = `${host}${path}`;
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.MySecretKey}`,
      },
    };
    const response = await axios.get(url, config);
    return response;
  };
  return { initializePayment, verifyPayment };
};
