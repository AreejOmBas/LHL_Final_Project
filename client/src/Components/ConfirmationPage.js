import React from 'react';

import './ConfirmationPage.css';

/* Component to display confiramtion messages after registrations and answering survey */

export default function ConfirmationPage(props) {

  
  if (props.logout) {
    props.logout();
  }



  return (
    <article className='confirmation-msg'>

      { props.location.state.register &&
        <div>
          <p>Thank you for registering with us, we will be sending you surveys every month to help us check on your well being.</p>
          <p> We wish you all the best on your endeavors. </p>

        </div>
      }

      {props.location.state.surveySubmit && <p> Thank you for taking the time to fill the survey, we wish you all the best! </p>}

    </article>
  )
}