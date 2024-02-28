import { MDBBtn, MDBCheckbox, MDBInput } from 'mdb-react-ui-kit'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"
import { loginAsync } from '../Redux/Slices/userSlice';

const SignIn = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const data = useSelector(e => e)

  // console.log(data)

  useEffect(() => {
    if (data.user.isAuthenticate) navigate('/home')

  }, [data.user.isAuthenticate])

    const [signInData, setSignInData] = useState({
        email: "",
        password: ""
      })
    
      const changeHandler = (e) => {
        setSignInData({ ...signInData, [e.target.name]: e.target.value })
        console.log(signInData)
      }
      const submitHandler = (e) => {
        e.preventDefault();
         console.log(signInData)
        dispatch(loginAsync(signInData))
        setSignInData({
          email: "",
          password: ""
        })
      }

  return (
    <div>
        <div className="text-center mb-3">
            <p>Sign In</p>
        </div>
         
        <form className="space-y-6 pl-3" action="#" method="POST" onSubmit={submitHandler}>
        <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' name='email' value={signInData.email} onChange={changeHandler}/>
          <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' name='password' value={signInData.password} onChange={changeHandler}/>

          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
        </form>
        
    </div>
  )
}

export default SignIn