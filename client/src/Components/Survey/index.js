import React , {useState} from 'react'

import RadioQuestion from './Radio_Question';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

/* 
-Have you stayed sober since completing treatment? If yes, Well Done!... question #2; If no, are you currently on track or do you need assistance?
-Have you found adequate housing? yes or no 
-Are you currently employed? yes or no
-Have your family dynamics improved since coming home from treatment? yes or no
-How likely are you to refer a friend or loved one to Cedar House for treatment?   (1-5 – 5 being the highest rating)
-A field where they can offer optional comments


*/



const questions = [


  {
    id: 'q1',
    question: "Have you stayed sober since completing treatment?",
    type: 'radio'
  },
  {
    id: 'q2',
    question: "Have you found adequate housing?",
    type: 'radio'
  },
  {
    id: 'q3',
    question: "Are you currently employed?",
    type: 'radio'
  },
  {
    id: 'q4',
    question: "Have your family dynamics improved since coming home from treatment? ",
    type: 'radio'
  },
  {
    id: 'q5',
    question: "Have you found adequate housing?",
  }
]

export default function Survey(props) {


  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };


  return (

    <main className="survey-main">

      <Form noValidate validated={validated} onSubmit={handleSubmit}>

        <RadioQuestion question={questions[0].question} id={questions[0].id} />

        
        <Button type="submit">Submit form</Button>
        
      </Form>

    </main>

  )




}