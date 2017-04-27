import * as nodemailer from 'nodemailer';

import {IUserModel, User} from "../models/User";

class EmailService {
    sendActivation (user: IUserModel) {
        if (!user)
            throw "user not defined";

        let transporter = nodemailer.createTransport(
            {
                //define endpoint and login-credentials for smtp server
                service: "DebugMail",
                auth: {
                    user: "hasenbank.ken@gmail.com",
                    pass: "72759eb0-1e99-11e7-b8ac-59cc35386e58"
                },
                debug: true // include SMTP traffic in the logs
            }, {
                // default message fields
                // sender info
                from: "GELI <no-reply@geli.edu>"
            }
        );

        let message = {
            // Comma separated list of recipients
            to: user.firstName + " " + user.lastName + "<" + user.email + ">",

            // Subject of the message
            subject: "Welcome to GELI :)", //

            // plaintext body
            text: "Hello " + user.firstName + ", \n\n" +
            "your account was successfully created. Please use the following link to verify your E-Mail: \n" +
            "http://localhost:4200/activate/" + encodeURIComponent(user.authenticationToken) + "\n\n" +
            "Your GELI Team."
        };

        transporter.sendMail(message, (error, info) => {
            if (error) {
                console.log("Error occurred");
                console.log(error.message);
                return;
            }
            transporter.close();
        });
    }
}

export default new EmailService();
