let pdf = require('pdf-creator-node');
let fs = require('fs');

/* Function responsible for generating the report and save it as pdf file */

function pdfCreator(yesAnswers,noAnswers,clientsInfo,needsHelp,date,count,q5Answers) {

    const reportDate = (date.date).replace(' ','_');
   
        // Read HTML File Template 
        let html = fs.readFileSync('./report/template.html', 'utf8');

        // options for the pdf documents
        let options = {
            format: 'A3',
            orientation: 'portrait',
            border: '10mm',
            logo: './report/images/logo.png',
        };

      // values to use in the generation of the report
        let document = {
            html: html,
            data: {
                 yesAnswers,
                 noAnswers,
                 clientsInfo,
                 needsHelp,
                  date,
                  count,
                  q5Answers,
                 logo: 'file://' + __dirname + '/images/cedarHouse_logo.png',
  
            },
            path: `./report/${reportDate}_report.pdf`,

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