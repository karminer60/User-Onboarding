import React from 'react'

function User({ details }) {
  if (!details) {
    return <h3>Working fetching your friend&apos;s details...</h3>
  }

  return (
    <div className='friend container'>
      <h2>{details.username}</h2>
      <p>Email: {details.email}</p>
      <p>Password: {details.password}</p>
      <p>Role: {details.role}</p>
      <p>Civil: {details.civil}</p>

      {
        !!details.terms && !!details.terms.length &&
        <div>
          Terms of Use:
          <ul>
            {details.termsOfUse.map((like, idx) => <li key={idx}>{like}</li>)}
            
          </ul>
        </div>
      }
    </div>
  )
}

export default User;
