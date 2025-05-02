const {createTask, fetchAllTask, updateTaskById, deleteTaskById} = require("../Controllers/TaskController");

const router=require("express").Router();
//get task
// router.get("/",(req,res)=>{
//     res.send("All tasks")
// })
router.get('/',fetchAllTask)
//create task
router.post('/',createTask)
router.put('/:id', updateTaskById)
router.delete('/:id', deleteTaskById)
module.exports=router;