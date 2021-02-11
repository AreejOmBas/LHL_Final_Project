import React from 'react';
import Form from 'react-bootstrap/Form'
import './RadioInput.css'

/* Component For questions of type radio */

export default function RadioInput(props) {

  const input = props.options.map((option, index) => {

    return (

      <Form.Check label={option} className='radio-label'
        key={`radio-btn-${index}`}
        type='radio'
        id={props.id}
        name={props.id}
        onChange={event => props.handelChange(event, props.id)}
        value={option}
        defaultChecked={props.answer === option}
        disabled = {(props.answer)}
        required={props.required}
      />
    );
  });

  return (

    <article id={(props.id === 7) ? 'follow-up' : ''} className={(props.show) ? 'radio-q' : 'hidden-q'}>

      <p className='question-field' ><span className='required'>*</span> {props.question} </p>
        {input}
      <Form.Control.Feedback type='invalid'>Please choose answer</Form.Control.Feedback>
    </article>








  )

}
