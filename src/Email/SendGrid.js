import sgMail from "@sendgrid/mail";
import { html2 } from "./GoodWillMsg.js";
import { html } from "./Thanku.js";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_NAME = process.env.SENDER_NAME;
const FROM_NAME = process.env.FROM_NAME;
sgMail.setApiKey(SENDGRID_API_KEY);

console.log(SENDGRID_API_KEY, SENDER_EMAIL, SENDER_NAME);

// https://app.sendgrid.com/guide/integrate
// https://github.com/sendgrid/sendgrid-nodejs/blob/main/docs/use-cases/README.md#email-use-cases
export const sendThankUMail = async (email, name) => {
  const msg = {
    to: email,
    from: {
      email: SENDER_EMAIL,
      name: FROM_NAME,
    },
    subject: "Thanks for the Gift",
    html: `${html(name, SENDER_EMAIL, SENDER_NAME)}`,
  };

  //   ES6;
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });

  //   ES8
  //   (async () => {
  //     try {
  //       await sgMail.send(msg);
  //     } catch (error) {
  //       console.error(error);

  //       if (error.response) {
  //         console.error(error.response.body);
  //       }
  //     }
  //   })();
};

export const sendGoodwillMessage = async (name, goodwillMessage) => {
  const msg = {
    to: SENDER_EMAIL,
    from: {
      email: "oforduharrison@gmail.com",
      name: name,
    },
    subject: "Goodwill Message",
    html: `${html2(name, SENDER_NAME, goodwillMessage)}`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};
