import React from 'react';
import Form from 'react-bootstrap/Form'
import './RadioInput.css'


export default function RadioInput(props) {

  const input =  props.options.map((option, index) => {
  
    return (

      <Form.Check label={option} className="radio-label"
       type="radio"
       id={props.id} 
       name={props.id} 
       onChange={event => props.handelChange(event, props.id)}
       value={option}
        required={props.required}

         />

      // <label key={index} className="radio-label" >
      //   <input name="q1"  type="radio" id={props.id} className="form-check-input"
      //     name={props.id} 
      //     value={option}
      //     data-selected={props.data}
      //     onChange={event => props.handelChange(event, props.id)}
      //    required={props.required}
      //      />
      //   {option}
      // </label>
    );
  })

  
  
  return (


    <article  id={(props.id === 7)? 'follow-up' : ''} className={(props.show) ? "radio-q" : "hidden-q"}>

   <p className="question-field" > <span className="required">*</span> {props.question} </p>
      {input}
      <Form.Control.Feedback type="invalid">Please choose answer</Form.Control.Feedback>
     </article>








  )

}
