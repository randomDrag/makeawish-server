require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


const sendSms = (sid , number , code) => {
    const client = require('twilio')(accountSid, authToken);
    
    client.verify.services(sid)
    .verificationChecks
    .create({to: number, code: code})
    .then(verification_check => console.log(verification_check.status));
       
    

   

}
module.exports = sendSms;