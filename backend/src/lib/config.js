import dotenv from 'dotenv';


dotenv.config();


if(!process.env.PORT){
    console.error("PORT is not defined in .env file");
}
if(!process.env.RAZORPAY_TEST_KEY_ID){
    console.error("RAZORPAY_TEST_KEY_ID is not defined in .env file");
}

if(!process.env.RAZORPAY_TEST_KEY_SECRET){
    console.error("RAZORPAY_TEST_KEY_SECRET is not defined in .env file");
}

export const config={
    port:process.env.PORT,
    razorpay_key_id:process.env.RAZORPAY_TEST_KEY_ID,
    razorpay_key_secret:process.env.RAZORPAY_TEST_KEY_SECRET
};