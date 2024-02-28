import React, { useState } from 'react';
import { MDBBadge, MDBBtn, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import EditPopup from './EditPopup'
import { deleteTaskAsync } from '../Redux/Slices/taskSlice';

export default function List() {

    var data = useSelector(e=>e);
    const dispatch = useDispatch();

    const [isEditPopupOpen, setEditPopupOpen] = useState(false);
    const [dets, setDets] = useState({}); // Now a stateful object

    const togglePopup = (taskId,taskName,taskDes) => {
        setDets({ id: taskId,taskName,taskDes }); // Update dets with the task ID
        setEditPopupOpen(!isEditPopupOpen);
    };

    const deleteHandler = (id)=>{
      dispatch(deleteTaskAsync(id))
    }

    var userTask = data.task.userTask;

    var list = userTask.map((e)=>(
        <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
        <div className='d-flex align-items-center'>
          <div className='ms-3'>
            <p className='fw-bold mb-1'>{e.taskName}</p>
            <p className='text-muted mb-0'>{e.taskDes}</p>
          </div>
        </div>
        <div className='d-flex align-items-center'>
        <div>
                    <MDBBtn size='sm' rounded color='link' onClick={() => togglePopup(e.id,e.taskName,e.taskDes)}>
                        edit
                    </MDBBtn>
                    <EditPopup open={isEditPopupOpen} setOpen={togglePopup} dets={dets} />
                </div>
        <MDBBtn size='sm' rounded color='link' onClick={()=>deleteHandler(e.id)}>
          delete
        </MDBBtn>
        </div>
      </MDBListGroupItem>
    ))

  return (
    <MDBListGroup style={{ minWidth: '22rem' }} light>
      {list}
    </MDBListGroup>
  );
}