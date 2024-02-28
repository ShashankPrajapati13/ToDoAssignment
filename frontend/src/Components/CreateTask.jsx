import React, { useEffect, useMemo, useState } from 'react';
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBInput,
  
} from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createTaskAsync } from '../Redux/Slices/taskSlice';
import { logOutAsync } from '../Redux/Slices/userSlice';

export default function CreateTask() {

    const dispatch = useDispatch()
  const navigate = useNavigate();
  const data = useSelector(e => e)

  useEffect(() => {
    if (data.user.isAuthenticate) {
      navigate('/home')
    }
    else navigate('/')
  }, [data.user.isAuthenticate])

  const logoutHandler = () => {
    dispatch(logOutAsync())
  }

  const [taskData, setTaskData] = useState({
    taskName: "",
    taskDes: "",
  })

  const changeHandler = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value })
    // // console.log(e.target.value,e.target.name)
    console.log(taskData)
  }
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(taskData)
    dispatch(createTaskAsync(taskData))
    setTaskData({
      tName: "",
      tDes: ""
    })
    // setOpen(false);
    // // console.log(taskData)
  }

  return (
    <form className="space-y-6 pl-3" action="#" method="POST" onSubmit={submitHandler} style={{margin:" 4vh auto",width:"36%"}}>
        <MDBRow className='gy-2 gx-3 d-flex align-items-center' style={{ padding:"auto", display:"flex",justifyContent:"space-between" ,alignItems:"center"}} >
      <MDBCol size='auto'>
      <MDBInput wrapperClass='mb-4' label='Task Name' id='form1' type='text' name='taskName' value={taskData.tName} onChange={changeHandler}/>
      </MDBCol>
      <MDBCol size='auto'>
      <MDBInput wrapperClass='mb-4' label='Task Description' id='form2' type='text' name='taskDes' value={taskData.tDes} onChange={changeHandler}/>
      </MDBCol>
      <MDBCol size='auto'>
      <MDBBtn type='submit' className="mb-4 w-100">Submit</MDBBtn>
      </MDBCol>
    </MDBRow>
    </form>

  );
}