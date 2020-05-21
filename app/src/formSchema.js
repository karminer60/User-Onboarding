
import * as yup from 'yup'


const formSchema = yup.object().shape({
  username: yup.string()
    .trim()
    .min(3, 'The username must be at least three characters long')
    .required('The username is a required field'),
  email: yup.string()
    .email('The email must be a valid email address')
    .required('The email is a required field'),
  
})

export default formSchema