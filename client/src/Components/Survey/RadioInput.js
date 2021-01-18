import React from 'react';
import './RadioInput.css'


export default function RadioInput(props) {

  return (


    <article className="radio-q">

      <p className="question-field" > {props.question} </p>
      {props.options.map((option, index) => {

        return (

          <label key={index} className="radio-label">
            <input name="q1" required="" type="radio" id={props.id} className="form-check-input"
              name={props.id} value={option}
              onChange={event => props.handelChange(event, props.id)}
              required />
            {option}
          </label>
        );
      })}




    </article>




  )

}
