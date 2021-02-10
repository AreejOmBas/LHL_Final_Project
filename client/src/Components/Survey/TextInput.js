import React from 'react';
import Form from 'react-bootstrap/Form';
import './TextInput.css';

/* Component for questions of type Text area */

export default function TextInput(props) {


  return (

    <article className="comments-txtarea">

    <Form.Group controlId="comments-area" >
      <Form.Label>{props.question}</Form.Label>
      <Form.Control name={props.id} 
             placeholder="Optional" onChange={event => props.handelChange(event, props.id)} as="textarea" rows={3} className="text-comment"/>
    </Form.Group>
    </article>

  );



}