const express = require('express');
const router = express.Router();
const cron= require('node-cron');
const nodemailer= require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');
const app = express();



const MailConfig = require('../config/email');
const gmailTransport = MailConfig.GmailTransport;


module.exports  =  db => {
  //app.use(express.static('report/images')); 
  app.use(express.static(__dirname+'/images'));

  const {getClientsInfoForQ1,getYes,getNo,getClientsneedsHelp,q5Aanswsers}= require('../helpers/reportDbHelpers')(db);

  const {pdfBuilder}= require('./pdfBuilder');
  const {pdfCreator}= require('./pdfCreator');

  router.get('/report', function(req, res, next) {
    res.render('reportSender', { title: 'Express' });
  });
   
 
              const mailOptions ={
                from :'cedarhouse.lighthouselabs@gmail.com',
                to : "areej.ombas@gmail.com",
                subject :'Survey Report',
                html: ' <h5>Hello</h5> <p>Please find attached the monthly report</p>',   

                attachments: [{
                  filename: 'report.pdf',
                  path: path.join(__dirname, './report.pdf'), 
                  contentType: 'application/pdf'
                }],

                function(err, info) {
                  if (err) {
                    console.error(err);
                    res.send(err);
                  } else {
                    console.log(info);
                    res.send(info);
                  }
                }                          
              }        
              
              const previousMonth =() => {
                const current = new Date();
                current.setMonth(current.getMonth()-1);
                const previousMonth = current.toLocaleString('default', { month: 'long' });
                const previousYear =current.getFullYear(); 
                const date = previousMonth + ' ' +previousYear;
                return {date};
              };
              const date=previousMonth();

              Promise.all([getYes(),getNo(),getClientsInfoForQ1(),getClientsneedsHelp(),q5Aanswsers()]).then((values) => {
                let yesAnwsers= values[0];
                let noAnwsers= values[1];
                let clientsInfo= values[2];
                let needsHelp = values[3];
                let q5Aanswsers = values[4];
               
              
                 pdfCreator(yesAnwsers,noAnwsers,clientsInfo,needsHelp,date,q5Aanswsers).then((res) => {
                        cron.schedule('0 13 1/1  * *',()=>{
                            gmailTransport.sendMail(mailOptions, (error,info) => {
                                if(error) {
                                  console.log(error);
                                  res.json(error);
                                }
                                console.log("report is send");
                                console.log(info);
                                res.json(info);
                           
                              });  
                       
                        })

                })
              });

              

return router
};