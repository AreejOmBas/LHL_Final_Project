
import React from 'react';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { Container } from 'react-bootstrap';

export default function RangeInput(props) {

    const buttons = props.options.map()
  return (

    <Container>
      <p> {props.question}</p>
      <ButtonGroup aria-label="Basic example">
        <Row>

          <Button variant="light"  id ={props.id} value={1} onClick={event => props.handelChange(event,props.id)} >1</Button>
          <Button variant="light" id = {props.id} value = {2} onClick={event => props.handelChange(event,props.id)} >2</Button>
          <Button variant="light" >3</Button>
          <Button variant="light" >4</Button>
          <Button variant="light" >5</Button>

        </Row>
      </ButtonGroup>

    </Container>




  )
}