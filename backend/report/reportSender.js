const express = require('express');
const router = express.Router();
const cron= require('node-cron');
const nodemailer= require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');


const MailConfig = require('../config/email');
const gmailTransport = MailConfig.GmailTransport;


module.exports  =  db => {

  const {getQ1Yes,getQ1No,getQ2Yes,getQ2No,getQ3Yes,getQ3No,getQ4Yes,getQ4No}= require('../helpers/reportDbHelpers')(db);
  const {pdfBuilder}= require('./pdfBuilder');
  const {pdfCreator}= require('./pdfCreator');

  router.get('/report', function(req, res, next) {
    res.render('reportSender', { title: 'Express' });
  });
   
  /*gmailTransport.use('compile', hbs({
  viewEngine: 'express-handlebars',
  viewPath: './report/report'
  }));*/


  //getQ1Yes,getQ1No,getQ2Yes,getQ2No,getQ3Yes,getQ3No,getQ4Yes,getQ4No
            getQ1Yes().then((Q1Yes) => {
              let anwsers=[];
                anwsers.push(Q1Yes);
                  getQ1No().then((Q1No) => {
                  anwsers.push(Q1No);
                    getQ2Yes().then((Q2Yes) => {
                    anwsers.push(Q2Yes);
                      getQ2No().then((Q2No) => {
                      anwsers.push(Q2No);
                        getQ3Yes().then((Q3Yes) => {
                          anwsers.push(Q3Yes);
                          getQ3No().then((Q3No) => {
                            anwsers.push(Q3No);
                            getQ4Yes().then((Q4Yes) => {
                              anwsers.push(Q4Yes);
                              getQ4No().then((Q4No) => {
                                anwsers.push(Q4No)
                console.log("anwsers",anwsers)                

                 //pdfBuilder(invoice, "./report/invoice.pdf");
                 pdfCreator(anwsers).then((res) => {});
                 //cron.schedule('0 13 1/1  * *',()=>{

                  const mailOptions ={
                    from :'cedarhouse.lighthouselabs@gmail.com',
                    to : "fayzadaoudifr@gmail.com",
                    subject :'Survey Report',
                    template: 'report',   

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

                  //generate the report

             /*    gmailTransport.sendMail(mailOptions, (error,info) => {
                  if(error) {
                    console.log(error);
                    res.json(error);
                  }
                  console.log("report is send");
                  console.log(info);
                  res.json(info);
                 });  
            */     
       //})
      }) }) }) }) }) }) }) });

              

return router
};