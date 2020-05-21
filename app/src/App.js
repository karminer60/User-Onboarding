
import logo from './logo.svg';
import './App.css';
import Form from './Form.js';
import User from './User.js'

import React, { useState, useEffect } from 'react'


import formSchema from './formSchema'
import axios from 'axios'
import * as yup from 'yup'

const initialFormValues = {
 
  username: '',
  email: '',
  
  role: '',
 
  civil: '',
  
  termsOfUse: {
    terms: false,
    
  },
}
const initialFormErrors = {
  username: '',
  email: '',
  role: '',
  civil: '',
}
const initialUsers = []
const initialDisabled = true


export default function App() {
  const [users, setUsers] = useState(initialUsers)
  const [formValues, setFormValues] = useState(initialFormValues)
 
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)


  const getUsers = () => {
    
    axios.get('http://localhost:4000/friends')
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => {
        debugger
      })
  }

  const postNewUser= newUser=> {
   
    axios.post('_https://reqres.in/api/users_', newUser)
      .then(res => {
        setUsers([res.data, ...users])
        
      })
      .catch(err => {
        debugger
      })
      .finally(() => {
        setFormValues(initialFormValues)
      })
  }

  
  const onInputChange = evt => {
    const name = evt.target.name
    const value = evt.target.value

    // 🔥 STEP 12- RUN VALIDATION WITH YUP
    yup
      .reach(formSchema, name)
      // we can then run validate using the value
      .validate(value)
      .then(valid => {
        // happy path, we can clear the error message
        setFormErrors({
          ...formErrors,
          [name]: ''
        })
      })
      .catch(err => {
        // sad path, does not validate so we set the error message to the message 
        // returned from yup (that we created in our schema)
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0]
        })
      })


    setFormValues({
      ...formValues,
      [name]: value 
    })
  }

  const onCheckboxChange = evt => {
  
    const { name } = evt.target
  
    const { checked } = evt.target

    setFormValues({
     
      ...formValues,
      
      termsOfUse: {
        
        ...formValues.termsOfUse,
        
        [name]: checked, 
      }
    })
  }

  const onSubmit = evt => {
    evt.preventDefault()

    const newUser = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      role: formValues.role,
      civil: formValues.civil,
      
      termsofUse: Object.keys(formValues.termsOfUse)
        .filter(item => formValues.termsOfUse[item] === true)
    }
  
    postNewUser(newUser)
  }

  
  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    
    formSchema.isValid(formValues)
      .then(valid => {
        setDisabled(!valid)
      })
  }, [formValues])

  return (
    <div className='container'>
      <header><h1>User App</h1></header>

      <Form
        values={formValues}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        
        disabled={disabled}
        errors={formErrors}
        onCheckboxChange={onCheckboxChange}
      />

      {
        users.map(user => {
          return (
            <User key={user.id} details={user} />
          )
        })
      }
    </div>
  )
}
