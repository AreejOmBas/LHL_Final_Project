/* 
  generate the report and send it to the admin
*/
const express = require('express');
const router = express.Router();
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const app = express();



const MailConfig = require('../config/email');
const gmailTransport = MailConfig.GmailTransport;

const { previousMonth } = require('../helpers/dataHelpers');

module.exports = db => {

  app.use(express.static(__dirname + '/images'));

  const { getClientsInfoForQ1, getYes, getNo, getClientsneedsHelp, q5Answers } = require('../helpers/reportDbHelpers')(db);

  const { pdfCreator } = require('./pdfCreator');

  const date = previousMonth();

  const reportDate = (date.date).replace(' ', '_'); // to add the month to the title of the report

  const mailOptions = {
    from: process.env.GMAIL_USER_NAME,
    to: process.env.ADMIN_EMAIL,
    subject: 'Survey Report',
    html: ' <h5>Hello</h5> <p>Please find attached the monthly report</p>',

    attachments: [{
      filename: 'report.pdf',
      path: path.join(__dirname, `./${reportDate}_report.pdf`),
      contentType: 'application/pdf'
    }],

    function(err, info) {
      console.log('inside mailing report')
      if (err) {
        console.error(err);
        res.send(err);
      } else {
        console.log(info);
        res.send(info);
      }
    }
  }

  // run all the queries required to generate the report
  Promise.all([getYes(), getNo(), getClientsInfoForQ1(), getClientsneedsHelp(), q5Answers()]).then((values) => {
    let yesAnswers = values[0];
    let noAnswers = values[1];
    let clientsInfo = values[2];
    let needsHelp = values[3];
    let q5Answers = values[4];

    let count = { count: noAnswers.length + yesAnswers.length };
    pdfCreator(yesAnswers, noAnswers, clientsInfo, needsHelp, date, count, q5Answers).then((res) => {
      cron.schedule('0 13 1/1  * *', () => {
        gmailTransport.sendMail(mailOptions, (error, info) => {
          if (error) {
            res.json(error);
          }
          res.json(info);

        });

      })

    })
  });



  return router
};