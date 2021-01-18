import React from 'react';
import './RadioInput.css'
import Form from 'react-bootstrap/Form';
import './TextInput.css';


export default function TextInput(props) {


  return (

    <article className="comments-txtarea">

    <Form.Group controlId="comments-area" >
      <Form.Label>{props.question}</Form.Label>
      <Form.Control as="textarea" rows={3} className="text-comment"/>
    </Form.Group>
    </article>

  );



}