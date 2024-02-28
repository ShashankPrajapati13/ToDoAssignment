import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { MDBBtn, MDBCol, MDBInput, MDBRow } from "mdb-react-ui-kit";
import { editTaskAsync } from "../Redux/Slices/taskSlice";
import "../StyleSheet/EditPopup.css"; // Assuming the CSS is in this file

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

  const changeHandler = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(editTaskAsync(taskData, dets.id));
    setTaskData({
      taskName: "",
      taskDes: "",
    });
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <div className="overlay">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Panel className="dialog-panel">
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <Dialog.Title
                    as="h3"
                    className="text-base font-semibold leading-6 text-gray-900"
                  >
                    Edit task
                  </Dialog.Title>
                </div>
                <div className="flex min-h-full flex-1 flex-col justify-center py-5">
                  <form
                    className="space-y-6 pl-3"
                    action="#"
                    method="POST"
                    onSubmit={submitHandler}
                    style={{ margin: "4vh auto", width: "36%" }}
                  >
                    <MDBRow
                      className="gy-2 gx-3 d-flex align-items-center"
                      style={{
                        padding: "auto",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <MDBCol size="auto">
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Task Name"
                          id="form1"
                          type="text"
                          name="taskName"
                          value={taskData.taskName}
                          onChange={changeHandler}
                        />
                      </MDBCol>
                      <MDBCol size="auto">
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Task Description"
                          id="form2"
                          type="text"
                          name="taskDes"
                          value={taskData.taskDes}
                          onChange={changeHandler}
                        />
                      </MDBCol>
                      <MDBCol size="auto">
                        <MDBBtn type="submit" className="mb-4 w-100">
                          Submit
                        </MDBBtn>
                      </MDBCol>
                    </MDBRow>
                  </form>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default EditPopup;
