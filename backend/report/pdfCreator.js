let pdf = require("pdf-creator-node");
let fs = require('fs');

function pdfCreator(yesAnwsers,noAnwsers,clientsInfo,needsHelp,date,count,q5Aanswsers) {

        // Read HTML Template
        let html = fs.readFileSync('./report/template.html', 'utf8');

        let options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm",
            logo: './report/images/logo.png',
        };

      
        let document = {
            html: html,
            data: {
                 yesAnwsers,
                 noAnwsers ,
                 clientsInfo ,
                 needsHelp ,
                  date,
                  count,
                  q5Aanswsers,
                 logo: 'file://' + __dirname + '/images/cedarHouse_logo.png',
  
            },
            path: "./report/report.pdf",

        };

        return  pdf.create(document, options)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.error(error)
            });

  }

  module.exports.pdfCreator=pdfCreator;
  