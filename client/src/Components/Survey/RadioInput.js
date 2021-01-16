import React from 'react';
import Form from 'react-bootstrap/Form';


export default function RadioInput(props) {

  return (


    <section key={props.id} className="survey_question">
      <p className="question-field" > {props.question} </p>
      {props.options.map(option => {

        return (

          <Form.Check
            type="radio"
            id={props.id}
            label={option}
            value={option}
            name={props.id}

            onChange={event => props.handelChange(event, props.id)}
            required
          />
        );
      })}

    </section>







  )

}
