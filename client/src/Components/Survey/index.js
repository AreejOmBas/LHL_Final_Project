import React , {useEffect, useState} from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import RadioQuestion from './RadioInput';
import RangeInput from './RangeInput';
import TextInput from './TextInput';
import { useParams } from 'react-router';
import axios from 'axios';

import './Survey.css';




/* 
-Have you stayed sober since completing treatment? If yes, Well Done!... question #2; If no, are you currently on track or do you need assistance?
-Have you found adequate housing? yes or no 
-Are you currently employed? yes or no
-Have your family dynamics improved since coming home from treatment? yes or no
-How likely are you to refer a friend or loved one to Cedar House for treatment?   (1-5 – 5 being the highest rating)
-A field where they can offer optional comments


*/



const questions = [


  {
    id: 'q1',
    question: "Have you stayed sober since completing treatment?",
    type: 'radio',
    answers:["yes","no"],
    hasFollowUp: 'q6',
    isFollowUp:false
  },
  {
    id: 'q2',
    question: "Have you found adequate housing?",
    type: 'radio',
    answers:["yes","no"]
  },
  {
    id: 'q3',
    question: "Are you currently employed?",
    type: 'radio',
    answers:["yes","no"]
  },
  {
    id: 'q4',
    question: "Have your family dynamics improved since coming home from treatment? ",
    type: 'radio',
    answers:["yes","no"]
  },
  {
    id: 'q5',
    question: "Have you found adequate housing?",
    type: 'radio',
    answers:["yes","no"]

  },
  {
    id: 'q6',
    question: "How likely are you to refer a friend or loved one to Cedar House for treatment?",
    type: 'range',
    answers:["1","2","3","4","5"]

  },
  {
    id: 'q7',
    question: "Do you have any additional comments to share with us?",
    type: 'text',
    
  },
  {
    id:'q8',
    question:"Are you currently on track or do you need assistance?",
    answers:['Yes I am on track', 'No I need assistance'],
    isFollowUp:true
 }
]

export default function Survey(props) {

  const { id } = useParams();
  const [validated, setValidated] = useState(false);

  const [surveyResponse,setSurveyResponse] = useState({});
  const [selectedRange,setSelectedRange] = useState();
  const [showFollowUpQ,setFollowUpQ] = useState(true);
const token = localStorage.getItem('token');
  console.log(id);

  useEffect(()=>{
    console.log('inside survey')
  console.log(id);

    axios.get(`/survey/${id}`, { headers: {"Authorization" : `Bearer ${token}`}})
      .then(response => console.log(response))

  },[]);


  const handleSubmit = (event) => {
    const form = event.currentTarget;

    event.preventDefault();
    if (form.checkValidity() === false) {
      
      console.log("not valid")
      return;
    }
    setValidated(true);
  };

  const handelRadioInput = (event,id) => {
   
    const value = event.target.value;
    console.log(value,event.target)

   
    setSurveyResponse({...surveyResponse, [id]:value});

    

  }
  const handelRangeButtonClick = (event,id) => {
 
    
    console.log(event.target.innerText)
    setSurveyResponse({...surveyResponse, [id]:event.target.innerText})
    
    setSelectedRange(parseInt(event.target.innerText));

  }

  return ( <p>hello </p>)




}

/* <main className="survey-main">
      <h1>Cedar House survey</h1>
      <h3> Pleas help us to follow your achievements and help you when you need to </h3>
      <Form noValidate validated={validated} 
        onSubmit={handleSubmit}>

        <RadioQuestion question={questions[0].question}
         id={questions[0].id} options={questions[0].answers} 
         handelChange = {handelRadioInput}  />

         {showFollowUpQ && <RadioQuestion question={questions[7].question}
         id={questions[7].id} options={questions[7].answers} 
         handelChange = {handelRadioInput}  />}

        <RadioQuestion question={questions[1].question}
         id={questions[1].id} options={questions[1].answers} 
         handelChange = {handelRadioInput}  />

         <RangeInput  id= {questions[5].id} question= {questions[5].question} handelClick = {handelRangeButtonClick} options = {[1,2,3,4,5]}  selected={selectedRange}  />
         {/* */

         {/* <TextInput question={questions[6].question} />

         <Button className="btn-lg btn-dark btn-block btn-login" type="submit">Submit Form</Button>

        
      </Form>

    </main> */ }