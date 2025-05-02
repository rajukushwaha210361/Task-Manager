
import React from "react";
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa'; // Font Awesome icon

import { ToastContainer, toast } from 'react-toastify';
import { useState,useEffect } from "react";
import { checkTasks, CreateTask, DeleteTasks, GetAllTasks } from "./api";
import { notify } from "./utils";


const TaskManager = () => {
    const [input, setinput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [copytTasks, setCopyTasks] = useState([]);
    const [updateTask, setUpdateTask] = useState(null);

    const handleTask=()=>{
       if(updateTask && input){
        const obj={
            taskName:input,
            isDone:updateTask.isDone,
            _id:updateTask._id
        }
             editbutton(obj);
       }else{
        handleclick();
       }
    }
    useEffect(() => {
        if(updateTask){
            setinput(updateTask.taskName)
        }
    }, [updateTask]);
    const handleclick = async () => {
        const obj = {
            taskName: input,
            isDone: false
        }
        try {
            const { success, message } = await CreateTask(obj);
            if (success) {
                notify(message, 'success')

            } else {
                notify(message, 'failed')

            }
            setinput('')
            fetchAlltask();
        } catch (e) {
            console.error(e);
            notify("failed to create task", 'failed')
        }
    }

    const fetchAlltask = async () => {
        try {
            const { data } = await GetAllTasks();
            // console.log(data)
            setTasks(data);
            setCopyTasks(data);
        } catch (e) {
            console.error(e);
            notify("failed to create task", 'failed')
        }
    }
    const deletedata = async (id) => {
        try {
                const { success, message } = await DeleteTasks(id);
                if (success) {
                    notify(message, 'success')
    
                } else {
                    notify(message, 'failed')
    
                }
                fetchAlltask()
           
        } catch (e) {
            console.error(e);
            notify("failed to create task", 'failed')
        }
    }
    const check = async (item) => {
        const {_id,  isDone, taskName}=item;
        const obj={
            taskName,
            isDone:!isDone
        }
        try {
                const { success, message } = await checkTasks(_id,obj);
                if (success) {
                    notify(message, 'success')
    
                } else {
                    notify(message, 'error')
    
                }
                fetchAlltask()
                // console.log("success")
           
        } catch (e) {
            console.error(e);
            notify("failed to Check task", 'failed')
        }
    }
    const editbutton = async (item) => {
        const {_id,  isDone, taskName}=item;
        const obj={
            taskName,
            isDone:isDone
        }
        try {
                const { success, message } = await checkTasks(_id,obj);
                if (success) {
                    notify(message, 'success')
    
                } else {
                    notify(message, 'error')
    
                }
                fetchAlltask()
                setinput('')
                // console.log("success")
           
        } catch (e) {
            console.error(e);
            notify("failed to Check task", 'failed')
        }
    }
  

   const handlesearch = (e) => {
    const terms = e.target.value.toLowerCase();
    const oldTasks = [...copytTasks];
    const result = oldTasks.filter((item) =>
        item.taskName.toLowerCase().includes(terms)
    );
    setTasks(result);
};

    useEffect(() => {
        fetchAlltask()
    }, []);

return (
    <>
    <div className="row m-2 m-sm-0 my-5 mainbg vh-100 overflow-auto">

   
        <div className="col-12 col-sm-8 col-md-6 d-flex flex-column align-items-center my-5 m-auto ">
            <div className="bg-secondary text-light p-2 px-4 rounded-4"><h1>Task Manager</h1></div>
            <div className="d-flex my-4 justify-content-center align-items-center w-100 ">
                <div className="d-flex mx-2 input-group flex-grow-1 me-1">
                    <input onChange={(e) => setinput(e.target.value)} value={input} type="text" className="form-control" placeholder="Add new task" />
                    <button onClick={handleTask} className="btn btn-success mx-1"><FaPlus /></button>
                </div>
                <div className="d-flex mx-2 input-group flex-grow-1 me-1">
                    <button className="btn btn-primary" ><FaSearch /></button>
                    <input placeholder="Search" type="text" className="form-control mx-1" onChange={handlesearch}/>
                </div>
            </div>
            <div className="d-flex flex-column w-100">
                {tasks.map((item)=>
                <div key={item._id} className="p-2 rounded-3 bg-light d-flex justify-content-between align-items-center w-100 my-2">
                    <span className={item.isDone?"text-decoration-line-through":''}>
                       {item.taskName}
                    </span>
                    <div>
                        <button className="btn btn-success btn-sm me-2"onClick={()=>check(item)}>
                            <FaCheck />
                        </button>
                        <button className="btn btn-primary btn-sm me-2"onClick={()=>setUpdateTask(item)}>
                            <FaPencilAlt />
                        </button>
                        <button onClick={()=>deletedata(item._id)} className="btn btn-danger btn-sm me-2">
                            <FaTrash />
                        </button>
                    </div>
                </div>
                 )}
            </div>
            <ToastContainer position="top-right" className="my-3" autoClose={3000} hideProgressBar={false} />
        </div>
        </div>
    </>
)
}

export default TaskManager;
