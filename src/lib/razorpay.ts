import Razorpay from "razorpay";
import crypto from "crypto";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

/** Create a Razorpay order */
export async function createOrder(amountInINR: number, receiptId: string) {
  const order = await razorpay.orders.create({
    amount: amountInINR * 100, // Razorpay uses paise
    currency: "INR",
    receipt: receiptId,
    payment_capture: true,
  });
  return order;
}

/** Verify Razorpay payment signature */
export function verifySignature(
  orderId: string,
  paymentId: string,
  signature: string
): boolean {
  const body = `${orderId}|${paymentId}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(body)
    .digest("hex");
  return expectedSignature === signature;
}
