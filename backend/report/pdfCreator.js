let pdf = require("pdf-creator-node");
let fs = require('fs');

function pdfCreator(anwsers) {

        // Read HTML Template
        let html = fs.readFileSync('./report/template.html', 'utf8');

        let options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm"
        };

      /*  let users = [
            {
                name:"Shyam",
                age:"26" 
            },
            {
                name:"Navjot",
                age:"26" 
            },
            {
                name:"Vitthal",
                age:"26" 
            }
            
        ]
        */
        let document = {
            html: html,
            data: {
                 anwsers:anwsers
            },
            path: "./report/report1.pdf"
        };

        console.log("anwserscc",anwsers);
        return  pdf.create(document, options)
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                console.error(error)
            });

  }

  module.exports.pdfCreator=pdfCreator;
  