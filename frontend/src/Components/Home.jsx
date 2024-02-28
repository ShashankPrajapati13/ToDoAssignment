import React, { useEffect } from 'react'
import CreateTask from './CreateTask'
import List from './List'
import Nav from './Nav'
import { userTaskAsync } from '../Redux/Slices/taskSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Home = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const data = useSelector(e => e)

  useEffect(() => {
    if (data.user.isAuthenticate) {
      navigate('/home')
      dispatch(userTaskAsync())
    }
    else navigate('/')
  }, [data.user.isAuthenticate,data.task.task])

  const [showEdit, setShowEdit] = useState(false);
  const [editDets, setEditDets] = useState(null)

  return (
    <div>
      <Nav/>
      <CreateTask/>
      <List/>
      {showEdit ? <EditPopup open={showEdit} setOpen={setShowEdit} dets={editDets} /> : null}
    </div>
    
  )
}

export default Home