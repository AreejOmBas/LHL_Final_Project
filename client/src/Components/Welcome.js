import React , {useState} from 'react';
import Form from 'react-bootstrap/Form';


export default function Welcome(props) {
  const [answer,setAnswer] = useState(props.answer || false);

  return (
   

      <section key={props.id} className="survey_question">
        <p> WELCOME</p>
        
      </section>



    



  )

}