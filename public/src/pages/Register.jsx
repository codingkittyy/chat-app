import { useState, useEffect } from 'react'
import { registerRoute } from '../utils/APIRoutes'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import styled from 'styled-components'
import Logo from '../assets/logo.svg'

function Register() {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(handleValidation()) {
      const {password, confirmPassword, username, email} = values;
        const {data} = await axios.post(registerRoute, {
          username,
          email,
          password,
        });
    }
    navigate('/')
  }

  useEffect(() => {
    if(localStorage.getItem("chat-app-user")){
      navigate('/')
    }
  }, [])

  const handleValidation = () => {
    const {password, confirmPassword, username, email} = values;
    if(password != confirmPassword){
      toast.error("Password and Confirm Password must be same", {
        position: "bottom-right",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      });
      return false;
    }else if(username.length < 4){
      toast.error("Username must be longer than 3 characters", {
        position: "bottom-right",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      });
      return false;
    }
    else if(username.length < 5){
      toast.error("Password must be longer than 5 characters", {
        position: "bottom-right",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      });
      return false;
    }else if(email === ""){
      toast.error("Email is required", {
        position: "bottom-right",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark"
      });
    }
    return true;
  }

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }
console.log(values)
  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="" />
            <h1>My Chat App</h1>
          </div>
          <input type="text" placeholder='Username' name='username' onChange={e=>handleChange(e)}/>
          <input type="email" placeholder='Email' name='email' onChange={e=>handleChange(e)}/>
          <input type="password" placeholder='Password' name='password' onChange={e=>handleChange(e)}/>
          <input type="password" placeholder='Confirm Password' name='confirmPassword' onChange={e=>handleChange(e)}/>
          <button type='submit'>Create User</button>
          <span>Already have an account ? <Link to='/login'>Login</Link></span>
        </form>  
      </FormContainer>
    </>
  )
}


const FormContainer = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
  .brand{
    display:flex;
    align-items:center;
    justify-content: center;
    gap: 1rem;
    img{
      height: 5rem;
    }
    h1{
      color: white;
      text-transform: uppercase;
    }
  }
  form{
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076
    bored-radius: 2rem;
    paddinng: 3rem 5rem;
    input{
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid $997af0;
        outline: none;
      }
    }
    button{
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover{
        background-color: #4e0eff;
      }
    }
    span{
      color: white;
      text-transform: uppercase;
      a{
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Register