
import * as yup from 'yup'


const formSchema = yup.object().shape({
  username: yup.string()
    .trim()
    .min(3, 'The username must be at least three characters long')
    .required('The username is a required field'),
  email: yup.string()
    .email('The email must be a valid email address')
    .required('The email is a required field'),
    role: yup.string().required('The role is a required field'),
    civil: yup.string().required('The civil status is required'),
  password: yup.string()
    .trim()
    .min(5, 'The password must be at least five characters long')
    .required('The password is a required field'),
})

export default formSchema