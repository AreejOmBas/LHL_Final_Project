import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';

/* Custom components */
import RadioInput from './RadioInput';
import RangeInput from './RangeInput';
import TextInput from './TextInput';
import MessageDialog from '../MessageDialog';

/* Styles */
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Survey.css';


export default function Survey(props) {

  const { id } = useParams(); // To get the survey id from the URL
  const [validated, setValidated] = useState(false); // Check the validation of the form

  const [surveyResponse, setSurveyResponse] = useState({});// Save user response
  const [selectedRange, setSelectedRange] = useState(); //To Show the button selected in range question

  const [showFollowUpQ, setFollowUpQ] = useState(false); // To Change the state of the followup question

  const [questionsData, setQuestionsData] = useState([]); // holds the questions coming from the DB
  const [errorMsg, SetErrorMsg] = useState(''); // error messages from server or validation
  const [disableButton, setDisableButton] = useState(false);
  const [isBusy, setBusy] = useState(true); // to wait for useEffect to finish fetching data from Server

  let history = useHistory(); // to redirect to other page after submission
  const accessToken = localStorage.getItem('token');

  // Fetch Questions from DB 
  useEffect(() => {

    axios.get(`/survey/${id}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })
      .then(response => {

        if (response.status === 200) {
          setQuestionsData(response.data.questions);

          // id user accessing an old submitted form
          if (response.data.savedResponses.length !== 0) {
            setSurveyResponse({ ...response.data.savedResponses });
            setDisableButton(true);
          }
          setBusy(false);
        }
      })
      .catch(error => {

        if (error.response.status === 401) {

          SetErrorMsg(error.response.data.message);

        } else if (error.response.status === 403) {

          localStorage.setItem('token', '');
          localStorage.setItem('email', '');
          history.push('/login');
        }
      });


  }, []);

  // Form submission handler
  const handleSubmit = (event) => {

    const form = event.currentTarget;

    if (!selectedRange) {
      event.preventDefault();
      event.stopPropagation();
      SetErrorMsg('Error , please answer all required questions');
      setValidated(true);
      return;
    }
    // check if user filled all required fields
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      SetErrorMsg('Error , please answer all required questions');
    } else {
      //send user's response to server
      axios.post(`/survey/${id}`, { surveyResponse })
        .then((response) => {
          const confirmationMsg = response.data.message;// message back from the server
          history.push({
            pathname: '/confirmation',
            state: { surveySubmit: confirmationMsg }
          })
        })
        .catch(error => {
          if (error.response) {
            SetErrorMsg(error.response.data.message);
          }
        });

    }
    event.preventDefault();
    setValidated(true);
  };

  // handle the radio input selection and save it to state
  const handelRadioInput = (event, id) => {

    const value = event.target.value;

    if (id === 1 && value === 'No') {
      setFollowUpQ(true);

    } else if (id === 1 && value === 'Yes') {
      setFollowUpQ(false);
    }
    setSurveyResponse({ ...surveyResponse, [id]: value });
  }
  // handle button selection and save it to state
  const handelRangeButtonClick = (event, id) => {

    setSurveyResponse({ ...surveyResponse, [id]: event.target.value });
    setSelectedRange(parseInt(event.target.value));
  }
  // handle textinput change and save it to state
  const handelTextInput = (event, id) => {

    setSurveyResponse({ ...surveyResponse, [id]: event.target.value });
  }

  // map over the questions and assign in the right component
  const prepareSurveyForm = (data) => {

    const results = data.map((q, index) => {
      let { answer } = surveyResponse[index] || ''; // if an old form, pre-fill answers

      if (q.question_type === 'radio') {
        if (q.question_id != 7) {
          return (
            <RadioInput key={q.question_id} question={q.question_text}
              id={q.question_id} options={['Yes', 'No']} show={true}
              handelChange={handelRadioInput}
              answer={answer}
              required={true}
            />
          );
        } else {
          return (
            <RadioInput key={q.question_id} question={q.question_text}
              id={q.question_id} show={showFollowUpQ} options={['Yes', 'No']}
              handelChange={handelRadioInput}
              required={false}
            />
          );
        }


      } else if (q.question_type === 'range') {
        return (
          <RangeInput key={q.question_id} question={q.question_text}
            id={q.question_id} options={[1, 2, 3, 4, 5]}
            handelClick={handelRangeButtonClick}
            selected={answer || selectedRange}
            disabled={disableButton}
            required
          />
        );
      } else if (q.question_type === 'text') {
        return <TextInput key={q.question_id} id={q.question_id} question={q.question_text} handelChange={handelTextInput} />
      }
    });
    return results;

  }

  //Survey Component
  return (

    <main className='survey-main'>
      {errorMsg && <MessageDialog msg={errorMsg} />}
      {
        isBusy ?

          <h4></h4>
          :
          <>
            <h1>Cedar House survey</h1>
            <h3> Please help us to follow your achievements and help you when you need to </h3>
            <Form noValidate validated={validated} onSubmit={handleSubmit} className='survey-form'>

              {questionsData && prepareSurveyForm(questionsData)}

              <Button disabled={disableButton} className='btn-lg btn-dark btn-block btn-login' type='submit'>Submit Form</Button>
            </Form>
          </>
      }
    </main>
  );
};


