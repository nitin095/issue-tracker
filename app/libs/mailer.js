'use strict';

// dependencies
const nodemailer = require('nodemailer');

// defining transport object
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'meetpad.email@gmail.com',
        pass: 'meetpadpassword'
    }
});

let sendWelcomeMail = (userDetails) => {

    let mailOptions = {
        from: 'meetpad.email@gmail.com',
        to: userDetails.email,
        subject: `${userDetails.firstName}, welcome to your new Issue Tracker Account`,
        html: `<div style="background:whitesmoke;margin:50px;padding:15px;text-align:center"><h1>Hi ${userDetails.firstName}</h1><p>Your account has been created.
        Please login to view your assigned issues.</p>
        <p><a href="http://ec2-13-233-92-229.ap-south-1.compute.amazonaws.com/login"><button style="background:none;padding:5px 10px">LOGIN</button></a></p>
        <p><h4>Here’s what we have on file for you:</h4>
        Name: ${userDetails.firstName} ${userDetails.lastName}<br>Email: ${userDetails.email}<br>Phone: +${userDetails.countryCode} ${userDetails.mobileNumber}</p>
        <p>Yours sincerely<br>Issue Tracker</p>
        </div>`
    };

    // sending mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent to: %s', mailOptions.to);
    });

}// end sendWelcomeMail function

let sendReminder = (issueDetails, email) => {

    let mailOptions = {
        from: 'meetpad.email@gmail.com',
        to: email,
        subject: `Reminder: ${issueDetails.title}`,
        html: `<div style="border:2px solid lightgrey;padding:15px"><h2>${issueDetails.title}</h2>
        <p>The issue '${issueDetails.title}' is due on ${issueDetails.dueDate}</p>
        <p><button style="background:lightgrey;padding:5px 10px;border:none;border-radius:3px"><a href="http://ec2-13-233-119-109.ap-south-1.compute.amazonaws.com/issue/browse/${issueDetails.issueId}">View Issue</a></button></p>
        <hr><h5>Sent by Issue Tracker</h5>
        </div>`
    };

    // sending mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent to: %s', mailOptions.to);
    });

} // end sendReminder function

let sendissueAssignedNotification = (issueDetails, email) => {

    let mailOptions = {
        from: 'meetpad.email@gmail.com',
        to: email,
        subject: `Issue assigned: ${issueDetails.title}`,
        html: `<div style="border:2px solid lightgrey;padding:15px">
        <h2>A issue has been assigned to you.</h2>
        <p>${issueDetails.title}</p>
        <h3>Description</h3>
        <p>${issueDetails.description}</p>
        <p><button style="background:lightgrey;padding:5px 10px;border:none;border-radius:3px"><a href="http://ec2-13-233-119-109.ap-south-1.compute.amazonaws.com/issue/browse/${issueDetails.issueId}">View issue</a></button></p>
        <hr><h5>Sent by Issue Tracker</h5>
        </div>`
    };

    // sending mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent to: %s', mailOptions.to);
    });

} // end sendReminder function

let sendForgotPasswordEmail = (email, token) => {

    let mailOptions = {
        from: 'meetpad.email@gmail.com',
        to: email,
        subject: `Reset your password`,
        html: ` <h3>Hi!</h3>
        <p>You requested for a password reset, kindly use this <a href="http://ec2-13-233-92-229.ap-south-1.compute.amazonaws.com/login?token=${token}">link</a> to reset your password</p>
        <p>This link is valid for 30 minutes.</p>
        <br>
        <p>Cheers!<br>Issue Tracker</p>`
    };

    // sending mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent to: %s', mailOptions.to);
    });

}// end sendForgotPasswordEmail


module.exports = {
    sendWelcomeMail: sendWelcomeMail,
    sendReminder: sendReminder,
    sendissueAssignedNotification: sendissueAssignedNotification,
    sendForgotPasswordEmail: sendForgotPasswordEmail
}


