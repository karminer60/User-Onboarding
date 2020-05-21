
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
  
  termsOfUse: false,
    
  
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
   
    axios.post('http://localhost:4000/friends', newUser)
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

    yup
      .reach(formSchema, name)

      .validate(value)
      .then(valid => {
     
        setFormErrors({
          ...formErrors,
          [name]: ''
        })
      })
      .catch(err => {
        
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
    debugger;
    const { name } = evt.target
  
    const { checked } = evt.target

    setFormValues({
     
      ...formValues,
    
        
      [name]: checked, 
      
    })
  }

  const onSubmit = evt => {
    evt.preventDefault()

    const newUser = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      role: formValues.role,
      civil: formValues.civil,
      
      termsOfUse: formValues.termsOfUse
    }
  
    postNewUser(newUser)
    debugger
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
