import React, { useEffect, useState } from 'react';

import './ConfirmationPage.css';

export default function ConfirmationPage (props) {

localStorage.setItem("token",'')
// if(props.logout) {
//   props.logout();
// }
console.log(props)
console.log(props.location.pathname)
const clientName = props.name || ''

return (
  <article className="confirmation-msg">

  { props.location.state.register && 
  <div>
    ( <p>Thank you For registering with us, we will be sending surveys for you every month to help us check on your well being !</p>
     <p> We wish you all the best on your endeavors </p>)

  </div>
  }

  {props.location.state.surveySubmit && <p> Thank you {clientName} for taking the time to fill the survey, we wish you all the best! </p>}
  
  <p>Thank you For registering with us, we will be sending survey form every month to help us check on your will being !</p>
     <p> We wish you all the best on your endovers </p>
 

</article>
  )
}