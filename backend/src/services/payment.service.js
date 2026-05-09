import { razorpayinstance } from "../config/razorpay.config.js";
import { config } from "../lib/config.js";
import crypto from 'crypto';


export const CreateOrder = async (amount) => {
    const razorpayIns = razorpayinstance;

    const option = {
        amount: amount * 100,
        currency: "INR",
        receipt: "order_rcptid_11",
    };

    try {
        const order = await new Promise((resolve, reject) => {
            razorpayIns.orders.create(option, (err, order) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(order);
                }
            });
        });
        console.log("Order created successfully", order);
        return {
            success: true,
            message: "Order created successfully",
            order: order
        };
    } catch (error) {
        console.log("Error in creating order", error);
        return {
            success: false,
            message: "Error in creating order"
        };
    }
};


export const VerifyPayment=async(paymentDetails)=>{
    const paymentId=paymentDetails.paymentId;
    const orderId=paymentDetails.orderId;
    const signature=paymentDetails.signature;

    const secret=config.razorpay_key_secret;

    const generatedSignature=crypto.createHmac('sha256',secret).update(orderId+"|"+paymentId).digest('hex');
    console.log("Generated Signature:", generatedSignature);
    console.log("Received Signature:", signature);  
    return generatedSignature === signature;

}