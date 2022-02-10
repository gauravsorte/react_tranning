import { React, useState, useEffect, useReducer } from 'react';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
} from 'reactstrap'

import * as yup from 'yup';
import { Routes, Route, Link, Outlet } from "react-router-dom";


import '../CSS/signupPage.css'

const signUpSchema = yup.object().shape({
    firstName: yup.string().required().min(3),
    lastName: yup.string().required().min(3),
    phoneNumber: yup.number().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(8),
})

const signUpPageConstant = {
    setSignUpEmail: 'SET_EMAIL',
    setSignUpPassword: 'SET_PASSWORD',
    setSignUpFirstName: 'SET_FIRST_NAME',
    setSignUpLastName: 'SET_LAST_NAME',
    setSignUpPhoneNumber: 'SET_PHONE_NUMBER',
    setSignUpEmailError: 'SET_EMAIL_ERROR',
    setSignUpPasswordError: 'SET_PASSWORD_ERROR',
    setSignUpFirstNameError: 'SET_FIRST_NAME_ERROR',
    setSignUpLastNameError: 'SET_LAST_NAME_ERROR',
    setSignUpPhoneNumberError: 'SET_PHONE_NUMBER_ERROR',
    setSignUpError: 'SET_ERROR',
    setSignUpResponse: 'SET_RESPONSE',
}

const initialState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    emailError: '',
    passwordError: '',
    firstNameError: '',
    lastNameError: '',
    phoneNumberError: '',
    response: null,
    error: false,
}

const reducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case signUpPageConstant.setSignUpEmail: {
            return {
                ...state,
                email: payload
            }
        }
        case signUpPageConstant.setSignUpPassword: {
            return {
                ...state,
                password: payload
            }
        }
        case signUpPageConstant.setSignUpFirstName: {
            return {
                ...state,
                firstName: payload
            }
        }
        case signUpPageConstant.setSignUpLastName: {
            return {
                ...state,
                lastName: payload
            }
        }
        case signUpPageConstant.setSignUpPhoneNumber: {
            return {
                ...state,
                phoneNumber: payload
            }
        }
        case signUpPageConstant.setSignUpEmailError: {
            return {
                ...state,
                emailError: payload
            }
        }
        case signUpPageConstant.setSignUpPasswordError: {
            return {
                ...state,
                passwordError: payload
            }
        }
        case signUpPageConstant.setSignUpFirstNameError: {
            return {
                ...state,
                firstNameError: payload
            }
        }
        case signUpPageConstant.setSignUpLastNameError: {
            return {
                ...state,
                lastNameError: payload
            }
        }
        case signUpPageConstant.setSignUpPhoneNumberError: {
            return {
                ...state,
                phoneNumberError: payload
            }
        }
        case signUpPageConstant.setSignUpResponse: {
            return {
                ...state,
                response: payload
            }
        }
        case signUpPageConstant.setSignUpError: {
            return {
                ...state,
                error: payload
            }
        }
        default: {
            return state;
        }
    }



}

function SignUpPage(props) {
    let [state, dispatch] = useReducer(reducer, initialState)


    const { email, password, firstName, lastName, phoneNumber, emailError, passwordError, firstNameError, lastNameError, phoneNumberError, response, error } = state
    const showLogininPage = () => {
        props.showLoginPage()
    }

    const onSubmitSignUpForm = (event) => {
        event.preventDefault();
        console.log('================== on submit ================== ');

        const elements = event.target.elements;


        signUpSchema
            .validate({ email, password, firstName, lastName, phoneNumber }, { abortEarly: false })
            .then((res) => {
                console.log('validation success =============================== ', res);
            })
            .catch((error) => {
                error.inner.forEach((e) => {
                    if (e.path === 'email') {
                        dispatch({ type: signUpPageConstant.setSignUpEmailError, payload: e.message })
                    }

                    if (e.path === 'password') {
                        dispatch({ type: signUpPageConstant.setSignUpPasswordError, payload: e.message })
                    }

                    if (e.path === 'firstName') {
                        dispatch({ type: signUpPageConstant.setSignUpFirstNameError, payload: e.message })
                    }

                    if (e.path === 'lastName') {
                        dispatch({ type: signUpPageConstant.setSignUpLastNameError, payload: e.message })
                    }

                    if (e.path === 'phoneNumber') {
                        dispatch({ type: signUpPageConstant.setSignUpPhoneNumberError, payload: e.message })
                    }
                })
            })
        console.log(firstNameError);
    }
    return (
        <Form inline className="form_" onSubmit={onSubmitSignUpForm} >
            <h1 className="title_">Signup Page</h1>


            <div className='name_form_grp_div'>
                <FormGroup className="mb-2 me-sm-2 mb-sm-0 form_group ">
                    <Label
                        className="me-sm-2  input_label"
                        for="first_name"
                    >
                        First Name
                    </Label>
                    <div className='input_feilds'>
                        <Input
                            id="first_name"
                            name="first_name"
                            placeholder="cool"
                            type="text"
                            value={firstName}
                            onChange={(e) => dispatch({ type: signUpPageConstant.setSignUpFirstName, payload: e.target.value })}
                        />
                        <button type='button' className='clear_feild_btn first_name_clear_feild_btn ' onClick={(e) => dispatch({ type: signUpPageConstant.setSignUpFirstName, payload: '' })} > <span className='cross'>&times;</span> </button>
                    </div>
                </FormGroup>

                <FormGroup className="mb-2 me-sm-2 mb-sm-0 form_group ">

                    <Label
                        className="me-sm-2  input_label"
                        for="last_name"
                    >
                        Last Name
                    </Label>
                    <div className='input_feilds'>
                        <Input
                            id="last_name"
                            name="last_name"
                            placeholder="cool"
                            type="text"
                            value={lastName}
                            onChange={(e) => dispatch({ type: signUpPageConstant.setSignUpLastName, payload: e.target.value })}
                        />
                        <button type='button' className='clear_feild_btn' onClick={(e) => dispatch({ type: signUpPageConstant.setSignUpLastName, payload: '' })}> <span className='cross'>&times;</span> </button>
                    </div>
                </FormGroup>

            </div>

            <FormGroup className="mb-2 mb-sm-0 form_group">
                <Label
                    className="me-sm-2 email_label input_label"
                    for="phone_number"
                >
                    Phone Number
                </Label>
                <div className='input_feilds'>
                    <Input
                        id="phone_number"
                        name="phone_number"
                        placeholder="123456789"
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => dispatch({ type: signUpPageConstant.setSignUpPhoneNumber, payload: e.target.value })}
                    //   onChange={(e) => dispatch({type: loginPageConst.setEmail, payload: e.target.value})}
                    />
                    <button type='button' className='clear_feild_btn' onClick={(e) => dispatch({ type: signUpPageConstant.setSignUpPhoneNumber, payload: '' })}> <span className='cross'>&times;</span> </button>
                </div>

            </FormGroup>

            <FormGroup className="mb-2  mb-sm-0 form_group">
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
                        onChange={(e) => dispatch({ type: signUpPageConstant.setSignUpEmail, payload: e.target.value })}
                    />
                    <button type='button' className='clear_feild_btn' onClick={(e) => dispatch({ type: signUpPageConstant.setSignUpEmail, payload: '' })}> <span className='cross'>&times;</span> </button>
                </div>

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
                        onChange={(e) => dispatch({ type: signUpPageConstant.setSignUpPassword, payload: e.target.value })}
                    />
                    <button type='button' className='clear_feild_btn' onClick={(e) => dispatch({ type: signUpPageConstant.setSignUpPassword, payload:'' })} ><span className='cross'>&times;</span></button>

                </div>

            </FormGroup>

            {/* {error ? (<div className='error_message'>Email and Password does not match. Please Try Again!!</div>) : (<div></div>)} */}

            <FormGroup className="mb-2 me-sm-2 mb-sm-0 button_formgrp">
                <Button className="submit_button" type='Submit'>
                    Signup
                </Button>

                <Button className="submit_button" type='reset'>
                    Reset
                </Button>
            </FormGroup>
            <div>Already Have Account : <Link to="/login">SignIn</Link> </div>

        </Form>

    );
}

export default SignUpPage;
