import { CreateOrder, VerifyPayment } from "../services/payment.service.js";

export const createOrder=async(req,res)=>{
    const {courseId,amount}=req.body;

    const createOrderResponse=await CreateOrder(amount);

    if(createOrderResponse.success){
        const order = createOrderResponse.order;
        res.status(200).json({
            success:true,
            message:"Order Created successfully",
            order: order,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency
        })
    }
    else{
        return res.status(500).json({
            success:false,
            message:"Error in creating order"
        })
    }
}

export const verifyPayment=async(req,res)=>{
    console.log("VERIFY PAYMENT CALLED", req.body);
    const {orderId,paymentId,signature}=req.body;

    console.log("Received payment details", { orderId, paymentId, signature });

    if(!orderId || !paymentId || !signature){
        return res.status(400).json({
            success:false,
            message:"Missing required payment details"
        })
    }

    const paymentDetails={
        paymentId:paymentId,
        orderId:orderId,
        signature:signature
    };

    const result=await VerifyPayment(paymentDetails);

    if(result){
        return res.status(200).json({
            success:true,
            message:"Payment verified successfully"
        })
    }
    else{
        return res.status(400).json({
            success:false,
            message:"Invalid payment details"
        })
    }

}