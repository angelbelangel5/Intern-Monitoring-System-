const Task = require('../models/task');

exports.createTask = async (req, res) => {
    const { date, tasks } = req.body;
    try {
        const task = new Task({ intern: req.user.id, date, tasks });
        await task.save();
        res.status(201).send('Task created');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.getTasksByIntern = async (req, res) => {
    const { internId } = req.params;
    try {
        const tasks = await Task.find({ intern: internId }).populate('intern', 'username');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

exports.updateTaskStatus = async (req, res) => {
    const { taskId } = req.params;
    const { status, comment } = req.body;
    try {
        const task = await Task.findById(taskId);
        if (!task) {
            return res.status(404).send('Task not found');
        }
        task.tasks.forEach(t => {
            if (t._id.toString() === taskId) {
                t.status = status;
                t.comment = comment;
            }
        });
        await task.save();
        res.status(200).send('Task status updated');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
