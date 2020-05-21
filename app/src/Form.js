import React from 'react'

export default function Form(props) {

  const {
    values,
    onInputChange,
    onSubmit,
   
    disabled,
    errors,
    onCheckboxChange,
  } = props

  return (
    <form className='form container' onSubmit={onSubmit}>
      <div className='form-group submit'>
        <h2>Add a User</h2>

       
        <button disabled={disabled}>submit</button>

        <div className='errors'>
          
          <div>{errors.username}</div>
          <div>{errors.email}</div>
          <div>{errors.role}</div>
          <div>{errors.civil}</div>
        </div>
      </div>

      <div className='form-group inputs'>
        <h4>General information</h4>

        
        <label>Username&nbsp;
          <input
            value={values.username}
            onChange={onInputChange}
            name='username'
            type='text'
          />
        </label>

        <label>Email
          <input
            value={values.email}
            onChange={onInputChange}
            name='email'
            type='email'
          />
        </label>

       
        <label>Role
          <select
            onChange={onInputChange}
            value={values.role}
            name='role'
          >
            <option value=''>- Select an option -</option>
            <option value='Student'>Student</option>
            <option value='Alumni'>Alumni</option>
            <option value='Instructor'>Instructor</option>
            <option value='TL'>Team Lead</option>
          </select>
        </label>

        
        <label>Single
          <input
            type='radio'
            name='civil'
            value='Single'
            onChange={onInputChange}
          
          />
        </label>

        <label>Married
          <input
            type='radio'
            name='civil'
            value='Married'
            onChange={onInputChange}
            
          />
        </label>
      </div>

      <div className='form-group checkboxes'>
        <h4>Terms of Use</h4>

      
        <label>Terms of Use
          <input
            type='checkbox'
            name='termsOfUse'
            checked={values.termsOfUse.terms}
            onChange={onCheckboxChange}
          />
        </label>

       
      </div>
    </form>
  )
}
