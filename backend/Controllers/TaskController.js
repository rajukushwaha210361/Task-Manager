const { model } = require("mongoose");
const TaskModel = require("../Models/TaskModels");

const createTask = async (req, res) => {
    const data = req.body;
    const model = new TaskModel(data);
    try {
        await model.save();
        res.status(200).json({ message: "task created", success: true });
    } catch (err) {
        res.status(500).json({ message: 'error in taks creating', success: false })
    }
}
// const fetchAllTask = async (req, res) => {

//     const data = new TaskModel();;
//     try {
//         await data.find({});
//         res.status(200).json({ message: "All tasks", success: true, data });
//     } catch (err) {
//         res.status(500).json({ message: 'Some error in tasks fetching', success: false })
//     }
// }
const fetchAllTask = async (req, res) => {
    try {
        const data = await TaskModel.find({});
        res.status(200).json({ message: "All tasks", success: true, data });
    } catch (err) {
        res.status(500).json({ message: 'Some error in tasks fetching', success: false });
    }
}

const updateTaskById = async (req, res) => {
    try {
    const id = req.params.id;
    const body = req.body;
    const obj = { $set: { ...body } };
    // const data = new TaskModel(data);
        await TaskModel.findByIdAndUpdate(id,obj)
        res.status(200).json({ message: "Task updated", success: true,});
    } catch (err) {
        res.status(500).json({ message: 'Some error in tasks updating', success: false })
    }
}
const deleteTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const task = await TaskModel.findByIdAndDelete(id);

        if (!task) {
            return res.status(404).json({ message: "Task not found", success: false });
        }

        res.status(200).json({ message: "Task deleted", success: true });
    } catch (err) {
        res.status(500).json({ message: 'Error in task deletion', success: false });
    }
};

module.exports = {
    createTask,
    fetchAllTask,
    updateTaskById,
    deleteTaskById
}