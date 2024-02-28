import { MDBBtn, MDBCheckbox, MDBInput } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { registerAsync } from '../Redux/Slices/userSlice';

const SignUp = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const data = useSelector(e => e)

  // // // console.log(data)

  useEffect(() => {
    if (data.user.isAuthenticate) navigate('/home')

  }, [data.user.isAuthenticate])



    const [signUpData, setSignUpData] = useState({
        email: "",
        username: "",
        password: ""
      })
    
      const changeHandler = (e) => {
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value })
        console.log(signUpData)
      }
      const submitHandler = (e) => {
        e.preventDefault();
        dispatch(registerAsync(signUpData))
        console.log(signUpData)
        setSignUpData({
          email: "",
          username: "",
          password: ""
        })
    }

  return (
    <div>
         <div className="text-center mb-3">
            <p>Sign Up</p>
          </div>

          <form className="space-y-6 pl-3" action="#" method="POST" onSubmit={submitHandler}>
          <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' name='username' value={signUpData.username} onChange={changeHandler}/>
          <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' name='email' value={signUpData.email} onChange={changeHandler}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password' name='password' value={signUpData.password} onChange={changeHandler}/>

          <div className='d-flex justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
          </div>

          <MDBBtn className="mb-4 w-100" >Sign up</MDBBtn>
          </form>
    </div>
  )
}

export default SignUp