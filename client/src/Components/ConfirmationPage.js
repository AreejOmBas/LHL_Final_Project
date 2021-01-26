import React, { useEffect, useState } from 'react';

import './ConfirmationPage.css';

export default function ConfirmationPage (props) {

localStorage.setItem("token",'')
// if(props.logout) {
//   props.logout();
// }

const clientName = props.name || ''

return (
  <article className="confirmation-msg">

  { props.location.state.register && 
  <div>
  <p>Thank you For registering with us, we will be sending you surveys every month to help us check on your well being.</p>
     <p> We wish you all the best on your endeavors. </p>

  </div>
  }

  {props.location.state.surveySubmit && <p> Thank you {clientName} for taking the time to fill the survey, we wish you all the best! </p>}
  

 

</article>
  )
}