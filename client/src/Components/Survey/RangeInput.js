import React from 'react';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { FormGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import './RangeInput.css'

export default function RangeInput(props) {


  const buttons = props.options.map(answerOption => {
    return (
      <Form.Control type="button" value= {answerOption}
      variant="light"
    
        key={answerOption}
        className={(props.selected === answerOption) ? "selected" : "range-btn"}
        onClick={event => props.handelClick(event, props.id)}
      required={true}
      /> 
      // <Button
      //   variant="light"
      //   key={answerOption}
      //   className={(props.selected === answerOption) ? "selected" : "range-btn"}
      //   onClick={event => props.handelClick(event, props.id)}

      // >
      //   {answerOption}
      // </Button>
    );
  });

  return (



    <article className="range-q">
      <p>  <span className="required">*</span> {props.question}</p>
      <FormGroup className="range-group-btn range-btn-row" required>

      {buttons}

      </FormGroup>
      {/* <ButtonGroup aria-label="like-rate" className="range-group-btn" >
        <Row className="">
          

        </Row>
      </ButtonGroup> */}

    </article>

  )
}