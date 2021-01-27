const express = require('express');
const router = express.Router();
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const MailConfig = require('../config/email');
const gmailTransport = MailConfig.GmailTransport;

module.exports = db => {

  const { getClientsEmails } = require('../helpers/clientDbHelpers')(db);
  const { addNewSentSurvey } = require('../helpers/sentSurveyDbHelpers')(db);
  const { getClientIdByEmail } = require('../helpers/clientDbHelpers')(db);
  const { getFirstNameById } = require('../helpers/clientDbHelpers')(db);
  const { getClientsInfo } = require('../helpers/clientDbHelpers')(db);
  /* GET home page. */
  router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
  });

  gmailTransport.use('compile', hbs({
    viewEngine: 'express-handlebars',
    viewPath: './views/'
  }));

let results;
//   getClientsInfo()
//     .then(results => {

// let i = 0;
//       for (let client of results) {
//           ++i;
//        addNewSentSurvey(client.id)
//        .then(sentSurveyId =>  {
//         const mailOptions = {
//           from: 'cedarhouse.lighthouselabs@gmail.com',
//           to: client.email,
//           subject: 'Cedar House survey',
//           template: 'index',
//           context: {
//             sentSurveyId,
//             first_name: client.first_name

//           }

//         }
      

//       //mailOptions.html = 'your client Id is ' + sentSurveyId.id
//       gmailTransport.sendMail(mailOptions, (error, info) => {
//         if (error) {
//           console.log(error);
//           //res.json(error);
//         }
//         console.log("email is send");
//         console.log(info);
//         //res.json(info);
//       });

//        })
     
       
//     }


//   })
//   /* gmailTransport.close(); */














//   Promise.all( [getClientsEmails(),getClientIdByEmail(),addNewSentSurvey(),getFirstNameById()]
//   .then(values => {

//     let emails = values[0];
//     let clientsId = values[1];
//     let sentSurveyId = values[2];
//     let names= values[3];

//     const EmailList= emails.map(({ email }) => email);
//     for (let eemail of EmailList) {

//       const mailOptions ={
//         from :'cedarhouse.lighthouselabs@gmail.com',
//         to : email,
//         subject :'Cedar House survey',
//         template: 'index',
//         context: {
//           sentSurveyId: sentSurveyId.id,
//           first_name : name.first_name,

//         } 

//       }
//     }

// //mailOptions.html = 'your client Id is ' + sentSurveyId.id
//    gmailTransport.sendMail(mailOptions, (error,info) => {
//     if(error) {
//       console.log(error);
//       //res.json(error);
//     }
//     console.log("email is send");
//     console.log(info);
//     //res.json(info);
// });  


//   })
//     getClientsEmails().then((email) => {
//    console.log(email)


//       //cron.schedule('1 * *  * *',()=>{
//       //cron.schedule('0 13 1/1  * *',()=>{

//         EmailList.forEach(email => {
//           getClientIdByEmail(email).then((clientId) => {
//             addNewSentSurvey(clientId.id).then((sentSurveyId) => {
//               getFirstNameById(clientId.id).then((name) => {
//               //console.log(sentSurveyId)
//               //mailOptions.to = email;
//              // console.log(Object.values(clientId));


//               });



//             });

//           });

//         });
//       //})

//   } );
//   gmailTransport.close();

return router;

};


