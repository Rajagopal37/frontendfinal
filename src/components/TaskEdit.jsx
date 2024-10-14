import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const TaskEdit = ({ taskData, type, onClose, getAllTasks }) => {
  const [name, setName] = useState(taskData?.name || "");
  const [description, setDescription] = useState(taskData?.description || "");
  const [assignDate, setAssignDate] = useState(
    taskData?.assignDate.split("T")[0] || ""
  );
  const [lastDate, setLastDate] = useState(
    taskData?.lastDate.split("T")[0] || ""
  );
  const [status, setStatus] = useState(taskData?.status || "Incomplete");

  const [error, setError] = useState(null);

  const addNewTask = async () => {
    try {
      const response = await axiosInstance.post("/add-task", {
        name,
        description,
        assignDate,
        lastDate,
      });

      if (response.data && response.data.task) {
        alert("Task Added Successfully");
        getAllTasks();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const editTask = async () => {
    const taskId = taskData._id;

    try {
      const response = await axiosInstance.put(`/edit-task/${taskId}`, {
        name,
        description,
        assignDate,
        lastDate,
        status,
      });

      if (response.data && response.data.task) {
        alert("Task Updated Successfully");
        getAllTasks();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleAddTask = () => {
    if (!name) return setError("Please Enter a task name");
    if (!description) return setError("Please Enter the description ");
    if (!assignDate) return setError("Please Enter the task Assign Date");
    if (!lastDate) return setError("Please Enter the task Finish name");

    if (type === "edit") {
      editTask();
    } else {
      addNewTask();
    }
    setError("");
  };

  return (
    <div className="">
      <form className="mb-3">
        <div className="form-group">
          <input
            type="text"
            name="name"
            className="form-control mb-2"
            placeholder="Task Title"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>

        <div className="form-group">
          <input
            type="text"
            name="description"
            className="form-control mb-2"
            placeholder="Task Description"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
        </div>

        <div className="form-group d-flex mb-3">
          <p className="text-center m-2 text-success fw-bolder">Assign Date</p>
          <input
            type="date"
            name="assignDate"
            className="form-control m-2 w-75"
            value={assignDate}
            onChange={({ target }) => setAssignDate(target.value).split("T")[0]}
          />
          <p className="text-center m-2 text-danger fw-bolder">Finish Date</p>
          <input
            type="date"
            name="lastDate"
            className="form-control m-2 w-75"
            value={lastDate}
            onChange={({ target }) => setLastDate(target.value).split("T")[0]}
          />
        </div>

        <div className="form-group mb-3 d-flex align-items-center">
          <label className="fs-5 mx-2 text-danger ">Status </label>
          <select
            className="form-control"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Incomplete">Incomplete</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {error && <p className="text-danger text-center pt-1">{error}</p>}

        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-success text-white fs-5 rounded w-25 h-50 m-2"
            // onClick={handleAddTask}
          >
            {type === "edit" ? "Update Task" : "Add Task"}
          </button>

          <button
            type="button"
            className="btn btn-danger text-white fs-5 rounded w-25 h-50 m-2"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskEdit;
