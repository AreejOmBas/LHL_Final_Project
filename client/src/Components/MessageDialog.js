import React, { useEffect, useState } from 'react';


import './MessageDialog.css';
export default function MessageDialog (props) {



  return (

    <article className="dialog-msg">

      { props.msg && 
    
        <p>{props.msg}</p>
         
    
      }


    </article>

  )





}