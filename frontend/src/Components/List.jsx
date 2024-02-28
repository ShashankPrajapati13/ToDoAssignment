import React, { useState } from 'react';
import { MDBBtn, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import EditPopup from './EditPopup';
import { deleteTaskAsync } from '../Redux/Slices/taskSlice';

export default function List() {
    const data = useSelector(e => e);
    const dispatch = useDispatch();

    const [isEditPopupOpen, setEditPopupOpen] = useState(false);
    const [dets, setDets] = useState({}); // State to hold details of the task to edit

    const togglePopup = (taskId, taskName, taskDes) => {
        setDets({ id: taskId, taskName, taskDes });
        setEditPopupOpen(true); // Open the popup with the details
    };

    const closePopup = () => setEditPopupOpen(false); // Function to close the popup

    const deleteHandler = (id) => {
        dispatch(deleteTaskAsync(id));
    };

    const userTask = data.task.userTask;

    const list = userTask.map((e) => (
        <MDBListGroupItem key={e.id} className='d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center'>
                <div className='ms-3'>
                    <p className='fw-bold mb-1'>{e.taskName}</p>
                    <p className='text-muted mb-0'>{e.taskDes}</p>
                </div>
            </div>
            <div className='d-flex align-items-center'>
                <MDBBtn size='sm' rounded color='link' onClick={() => togglePopup(e.id, e.taskName, e.taskDes)}>
                    edit
                </MDBBtn>
                <MDBBtn size='sm' rounded color='link' onClick={() => deleteHandler(e.id)}>
                    delete
                </MDBBtn>
            </div>
        </MDBListGroupItem>
    ));

    return (
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <MDBListGroup style={{ minWidth: '22rem',width:'50%' }} light>
            {list}
            <EditPopup open={isEditPopupOpen} setOpen={closePopup} dets={dets} />
        </MDBListGroup>
        </div>
    );
}
