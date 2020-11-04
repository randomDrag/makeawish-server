require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;


const sendSms = async (phone) => {
    const client = require('twilio')(accountSid, authToken);


    await client.verify.services.create({
        friendlyName: 'MAKE A WISH',
        codeLength: 6
    }).then(service =>
        client.verify.services(service.sid).verifications.create({
            to: phone,
            channel: 'sms'
        })
        .then((verification) => {

            return verification;
        })


    );



}
module.exports = sendSms;