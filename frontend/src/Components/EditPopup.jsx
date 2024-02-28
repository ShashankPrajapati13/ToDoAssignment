import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { MDBBtn, MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { editTaskAsync } from "../Redux/Slices/taskSlice";

function EditPopup({ open, setOpen, dets }) {
  const cancelButtonRef = useRef(null);
  const dispatch = useDispatch();

  const [taskData, setTaskData] = useState({
    taskName: "",
    taskDes: "",
  });

  useEffect(() => {
    if (dets) {
      setTaskData({
        taskName: dets.taskName || "",
        taskDes: dets.taskDes || "",
      });
    }
  }, [dets]); 

  console.log(taskData);


  const changeHandler = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value })
  }
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(taskData)
    dispatch(editTaskAsync(taskData,dets.id))
    setTaskData({
      taskName: "",
      taskDes: ""
    })

  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto" >
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="mt-3 text-center  sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Edit task
                    </Dialog.Title>
                  </div>
                  <div className="flex min-h-full flex-1 flex-col justify-center  py-5 ">
                  <form className="space-y-6 pl-3" action="#" method="POST" onSubmit={submitHandler} style={{margin:" 4vh auto",width:"36%"}}>
        <MDBRow className='gy-2 gx-3 d-flex align-items-center' style={{ padding:"auto", display:"flex",justifyContent:"space-between" ,alignItems:"center"}} >
      <MDBCol size='auto'>
      <MDBInput wrapperClass='mb-4' label='Task Name' id='form1' type='text' name='taskName' value={taskData.taskName} onChange={changeHandler}/>

      </MDBCol>
      <MDBCol size='auto'>
      <MDBInput wrapperClass='mb-4' label='Task Description' id='form2' type='text' name='taskDes' value={taskData.taskDes} onChange={changeHandler}/>
      </MDBCol>
      <MDBCol size='auto'>
      <MDBBtn type='submit' className="mb-4 w-100">Submit</MDBBtn>
      </MDBCol>
    </MDBRow>
    </form>

                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default EditPopup;
