import React from 'react';
import './MessageDialog.css';

/* Component for the error message dialogs  */

export default function MessageDialog (props) {

  return (

    <article className="dialog-msg">

      { props.msg && 
         <p>{props.msg}</p>
      }
      
    </article>
  );
};