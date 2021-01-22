//import Axios from 'axios';
import React, { useEffect, useState } from 'react'

import { useParams, useHistory } from 'react-router';
import axios from 'axios';




export default function SurveyHandler(props) {

  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    axios.get(`/survey/${id}`)
      .then(response => {

        console.log(response)

      }).catch(error => {
        console.log(error);
        if (error.response.status === 401) {
          history.push('/login');
        }

        // }else if(error.request){
        //   console.log(error.request);

        // }else if(error.message){
        //   console.log(error.message);
        // //do something other than the other two

        // }

      }

      )
  }, []);
}