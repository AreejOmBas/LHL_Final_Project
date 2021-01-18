import React from 'react';
import Row from 'react-bootstrap/Row';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import './RangeInput.css'

export default function RangeInput(props) {


  const buttons = props.options.map(answerOption => {
    return (
      <Button
        variant="light"
        key={answerOption}
        className={(props.selected === answerOption) ? "selected" : "range-btn"}
        onClick={event => props.handelClick(event, props.id)}

      >
        {answerOption}
      </Button>
    );
  });

  return (

    <article className="range-q">
      <p> {props.question}</p>
      <ButtonGroup aria-label="like-rate" className="range-group-btn" >
        <Row className="range-btn-row">
          
          {buttons}

        </Row>
      </ButtonGroup>

    </article>

  )
}