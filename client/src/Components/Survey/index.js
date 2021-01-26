import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl'

import RadioInput from './RadioInput';
import RangeInput from './RangeInput';
import TextInput from './TextInput';
import { useParams } from 'react-router';
import { useHistory,useLocation} from 'react-router-dom';
import axios from 'axios';

import './Survey.css';


export default function Survey(props) {

  const { id } = useParams();
  const [validated, setValidated] = useState(false);

  const [surveyResponse, setSurveyResponse] = useState({});
  const [selectedRange, setSelectedRange] = useState();
  const [showFollowUpQ, setFollowUpQ] = useState(false);
  const [questionsData,setQuestionsData] = useState({});
  const [confirmationMsg, SetConfiramationMsg] = useState();
  const [isBusy, setBusy] = useState(true)

  let history = useHistory();
  
  let location = useLocation();
  useEffect(()=>{
    console.log('inside survey')
    //console.log("use effect ",token);
    axios.get(`/survey/${id}`)
    .then(response => { console.log(response);
      setQuestionsData(response.data);
    
    setBusy(false);
    }).catch(error => console.log(error));
    
    },[]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      
    } else {
     
      console.log('responses before post',surveyResponse)
      axios.post(`/survey/${id}`,{surveyResponse})
      .then((response)=>  
      {
        console.log(response.data.message)
        SetConfiramationMsg(response.data.message)

        history.push('/confirmation', { confirmationMsg })
        // console.log(history);
        // SetConfiramationMsg(response.data.message)
        // history.push('/confirmation', { confirmationMsg })
      })
     .catch(error => console.log(error));

    }
    setValidated(true);
    event.preventDefault();
  



  };

  const handelRadioInput = (event, id) => {

    const value = event.target.value;
    console.log(value, event.target, id)
    if(id === 1 && value === 'No'){
      setFollowUpQ(true);
    } else if(id === 1 && value === 'Yes') {
      setFollowUpQ(false)
    }
    setSurveyResponse({ ...surveyResponse, [id]: value });
  }
  const handelRangeButtonClick = (event, id) => {

    console.log(event.target.innerText)
    setSurveyResponse({ ...surveyResponse, [id]: event.target.innerText })

    setSelectedRange(parseInt(event.target.innerText));

  }

  const handelTextInput = (event, id) => {
    console.log(event.target.value )
    setSurveyResponse({ ...surveyResponse, [id]: event.target.value })

  }


  const parseQData = (data) => {

    const results = data.questions.map(q => {

      if (q.question_type === 'radio') {
        if (q.question_id != 7) {
          return (<>
   
            <RadioInput key={q.question_id } question={q.question_text}
              id={q.question_id} options={["Yes", "No"]} show={true}
              handelChange={handelRadioInput}
              required
            />
         
          </>
          )
        } else {
          return (<RadioInput key={q.question_id } question={q.question_text}
          id={q.question_id}  show={showFollowUpQ} options={["Yes", "No"]}
          handelChange={handelRadioInput}
        />)
        }


      } else if (q.question_type === 'range') {
        return( <>
          <RangeInput key={q.question_id } question={q.question_text}
            id={q.question_id} options={[1, 2, 3, 4, 5]}
            handelClick={handelRangeButtonClick}
            selected={selectedRange}
          />
      
        </>)
      } else if (q.question_type === 'text') {
        return <TextInput key={q.question_id } id={q.question_id} question={q.question_text} handelChange={handelTextInput} />
      }



    })
    return results;

  }

  return (


    <main className="survey-main">
      <h1>Cedar House survey</h1>
      <h3> Pleas help us to follow your achievements and help you when you need to </h3>
    {
      isBusy ? 
        (
           <h4>LOADING</h4>
        )
          :

     ( <Form noValidate validated={validated} onSubmit={handleSubmit} className="survey-form">
   
       
            { questionsData && parseQData(questionsData) }
        
     <Button className="btn-lg btn-dark btn-block btn-login" type="submit">Submit Form</Button>
     </Form>)
}
     </main>

     )

}


