import React , {useState} from 'react';
import Form from 'react-bootstrap/Form';


export default function RadioQuestion(props) {
  const [answer,setAnswer] = useState(props.answer || false);

  return (
   

      <section key={props.id} className="survey_question">
        <p>{props.question} </p>
        <Form.Check
          type="radio"
          id="yes"
          label="Yes"
          value = "Yes"
          name={props.id}
          checked = {answer === "Yes"}
          onChange={(event) => setAnswer(event.target.value)}
        />
        <Form.Check
          type="radio"
          id="no"
          label="No"
          value = "No"
          name={props.id}
          checked = {answer === "No"}
          onChange={(event) => {setAnswer(event.target.value) 
          console.log("value is " + event.target.value)}}
        />
      </section>



    



  )

}