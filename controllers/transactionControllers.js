import Transaction from "../models/transaction.js";

import paystack from "../config/paystack.js";

const { initializePayment, verifyPayment } = paystack();

export const makePayment = async (req, res) => {
  const { first_name, last_name, email, amount } = req.body;

  try {
    await initializePayment(
      { first_name, last_name, email, amount: amount * 100 },
      (response) => {
        res.json({ paystack_url: response.data.data.authorization_url });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const createTransaction = async (req, res) => {
  const ref = req.query.reference;

  try {
    await verifyPayment(ref, (response) => {
      // console.log(response);
      const { status, reference, amount, currency, customer } =
        response.data.data;
      const { first_name, last_name, email } = customer;

      const newTransaction = new Transaction({
        transaction_type: "credit",
        customer_name: `${first_name} ${last_name}`,
        customer_email: email,
        amount: amount / 100,
        currency,
        reference,
        paymentStatus: status,
        paymentGateway: "paystack",
      });

      newTransaction.save();
    });
  } catch (error) {
    console.log(error);
  }
};
