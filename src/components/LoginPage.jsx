import { React, useState, useEffect, useReducer } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from 'reactstrap'

import * as yup from 'yup';
import { Routes, Route, Link, Outlet, Navigate, useNavigate } from "react-router-dom";
import {userDataInitiate, userDataSuccess, userDataFailure} from '../redux/users/action' 



import '../CSS/loginPage.css'
import { useDispatch } from 'react-redux';


const loginScheme = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8)
})

const loginPageConst = {
  setEmail: 'SET_EMAIL',
  setPassword: 'SET_PASSWORD',
  setResposne: 'SET_RESPONSE',
  setEmailError: 'SET_EMAIL_ERROR',
  setPasswordError: 'SET_PASSWORD_ERROR',
  setError: 'SET_ERROR',
}

const initialState = {
  email: '',
  password: '',
  emailError: '',
  passwordError: '',
  response: null,
  error: false
}

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case loginPageConst.setEmail: {
      return {
        ...state,
        email: payload
      }
    }
    case loginPageConst.setPassword: {
      return {
        ...state,
        password: payload
      }
    }
    case loginPageConst.setResponse: {
      console.log('in response payload >>>>>>>>>>>>>>>>>>>>>>>>>>> ');
      return {
        ...state,
        response: payload
      }
    }
    case loginPageConst.setEmailError: {
      return {
        ...state,
        emailError: payload
      }
    }
    case loginPageConst.setPasswordError: {
      return {
        ...state,
        passwordError: payload
      }
    }
    case loginPageConst.setError: {
      return {
        ...state,
        error: payload
      }
    }

    default: {
      return state
    }
  }

}

function LoginPage(props) {

  // let [email, setEmail] = useState("");
  // let [password, setPassword] = useState("");
  // let [response, setResponse] = useState('');
  // let [error, setError] = useState(false)
  // const dispatch = useDispatch()
  const navigate = useNavigate()

  let [state, dispatch] = useReducer(reducer, initialState)

  const { email, password, emailError, passwordError, response, error } = state;


  useEffect(() => {
    if (response === 200) {
      // console.log('>>>>>>>>>>>>>>>>>>>>>>>> Success');
      navigate('/users')
      // props.onLoginSuccess();
    }
  }, [response])

  let onSubmit = async (event) => {
    event.preventDefault()
    console.log('>>>>>>>>>>>>>>');
    const ele = event.target.elements;
    // console.log(ele);
    let email_ = ele.email.value;
    let password_ = ele.password.value;
    console.log(ele.email.value);
    console.log(ele.password.value);

    let response__ = 400

    const requestOptions = {
      method: 'POST',
      headers: { "Content-Type": "application/json", 'Access-Control-Allow-Origin': 'http://localhost:3000' },
      body: JSON.stringify({ "email": email, "password": password })
    };

    // console.log(requestOptions);
    await fetch("https://reqres.in/api/login", requestOptions)
      .then((response) => {
        response__ = response.status;
        dispatch({ type: loginPageConst.setResponse, payload: response.status })
      })
      .catch((e) => { console.log(e); })


    // ================================================================================
    loginScheme
      .validate({ email, password }, { abortEarly: false })
      .then((res) => {
        // console.log('loginSchema >>>>>>>>>>>>>>>>>>>>>>>>>>> ', res);
        if (response !== 200) {

          props.onLoginFail()
          // setError(true)
          dispatch({ type: loginPageConst.setError, payload: true })
          dispatch({ type: loginPageConst.setEmailError, payload: '' })
          dispatch({ type: loginPageConst.setPasswordError, payload: '' })

          console.log('>>>>>>>>>>>>>>>>>>>>>>>> Fail - ', response, email, password);
        }
      })
      .catch((error) => {
        console.log('loginSchema >>>>>>>>>>>>>>>>>>>>>>>>>>', error.inner);
        error.inner.forEach((e) => {
          if (e.path === 'email') {
            console.log('email error -------------------------');
            dispatch({ type: loginPageConst.setEmailError, payload: e.message })
            dispatch({ type: loginPageConst.setPasswordError, payload: '' })

          }
          if (e.path === 'password') {
            console.log('password error -----------------------', e.message);
            dispatch({ type: loginPageConst.setPasswordError, payload: e.message })
            console.log('------------------------------------ ', emailError);
            if (emailError) {
              dispatch({ type: loginPageConst.setEmailError, payload: '' })
            }

          }
        })
      })


  }

  // console.log('state >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ',state);

  const clearEmailFeild = () => {
    // setEmail("");
    dispatch({ type: loginPageConst.setEmail, payload: "" })
  }

  const clearPasswordFeild = () => {
    // setPassword("");
    dispatch({ type: loginPageConst.setPassword, payload: "" })

  }

  

  // const toggleError = () => {
  //   error ? setError(false) : setError(true);
  // }


  return (

    <Form inline className="form_" onSubmit={onSubmit}>
      <h1 className="title_">Login Page</h1>

      <FormGroup className="mb-2 me-sm-2 mb-sm-0 form_group">
        <Label
          className="me-sm-2 email_label input_label"
          for="Email_"
        >
          Email
        </Label>
        <div className='input_feilds'>
          <Input
            id="Email_"
            name="email"
            placeholder="something@idk.cool"
            type="email"
            value={email}
            onChange={(e) => dispatch({ type: loginPageConst.setEmail, payload: e.target.value })}
          />
          <button type='button' className='clear_feild_btn' onClick={clearEmailFeild}> <span className='cross'>&times;</span> </button>
        </div>
        {emailError ? ((<div className='error_message'>{emailError}</div>)) : (<div></div>)}
      </FormGroup>
      <FormGroup className="mb-2 me-sm-2 mb-sm-0">
        <Label
          className="me-sm-2 password_label input_label"
          for="Password_"
        >
          Password
        </Label>
        <div className='input_feilds'>
          <Input
            id="Password_"
            name="password"
            placeholder="don't tell!"
            type="password"
            value={password}
            onChange={(e) => dispatch({ type: loginPageConst.setPassword, payload: e.target.value })}
          />
          <button type='button' className='clear_feild_btn' onClick={clearPasswordFeild}><span className='cross'>&times;</span></button>
        </div>
        {passwordError ? ((<div className='error_message'>{passwordError}</div>)) : (<div></div>)}


      </FormGroup>

      {error ? (<div className='error_message'>Email and Password does not match. Please Try Again!!</div>) : (<div></div>)}

      <FormGroup className="mb-2 me-sm-2 mb-sm-0 button_formgrp">
        <Button className="submit_button" type='Submit'>
          Submit
        </Button>

        <Button className="submit_button" type='reset'>
          Reset
        </Button>
      </FormGroup>
      <div>Dont Have Account : <Link to="/signup">SignUp</Link> </div>

    </Form>

  )


}

export default LoginPage;
