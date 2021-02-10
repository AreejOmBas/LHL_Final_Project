import React from 'react';

import { FormGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './RangeInput.css';

/* Component for questions of type range */

export default function RangeInput(props) {


  const buttons = props.options.map(answerOption => {
    return (
      <Form.Control type="button" value= {answerOption}
        variant="light"
        key={answerOption}
        className={(parseInt(props.selected) === answerOption) ? "selected" : "range-btn"}
        onClick={event => props.handelClick(event, props.id)}
        required={true}
        disabled = {props.disabled}
    
      />
    );
  });

  return (

   <article className="range-q">
      <p>  <span className="required"> * </span> {props.question} </p>
      <FormGroup className="range-group-btn range-btn-row" required >
        {buttons}
      </FormGroup>
  </article>

  );
}