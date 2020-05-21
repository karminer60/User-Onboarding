
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
  
  hobbies: {
    hiking: false,
    reading: false,
    coding: false,
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


  const getFriends = () => {
    
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



    setFormValues({
      ...formValues,
      [name]: value // NOT AN ARRAY
    })
  }

  const onCheckboxChange = evt => {
    
  }

  const onSubmit = evt => {
    evt.preventDefault()

    const newFriend = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      role: formValues.role.trim(),
      civil: formValues.civil.trim(),
      
    }
    
  }

  
  useEffect(() => {
    getFriends()
  }, [])

  useEffect(() => {
    
  }, [])

  return (
    <div className='container'>
      <header><h1>Friends App</h1></header>

      <Form
        values={formValues}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        
        disabled={disabled}
        errors={formErrors}
        onCheckboxChange={onCheckboxChange}
      />

      {
        users.map(friend => {
          return (
            <User key={friend.id} details={friend} />
          )
        })
      }
    </div>
  )
}
