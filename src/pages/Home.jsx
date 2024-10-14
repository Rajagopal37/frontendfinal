import { useEffect, useState } from "react";
import TaskCard from "../components/TaskCard";
import TaskEdit from "../components/TaskEdit";
import { Navbar } from "./Navbar";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

Modal.setAppElement("#root");

const Home = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [allTasks, setAllTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const navigate = useNavigate();

  const [openTaskAddEditModal, setOpenTaskAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const handleEdit = (noteDetails) => {
    setOpenTaskAddEditModal({ isShown: true, data: noteDetails, type: "edit" });
  };

  const handleCloseModal = () => {
    setOpenTaskAddEditModal({
      isShown: false,
      type: "add",
      data: null,
    });
  };

  // Get User Info
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  //Get all tasks
  const getAllTasks = async () => {
    try {
      const response = await axiosInstance.get("/all-tasks");

      console.log("Tasks response:", response.data);

      if (response.data && response.data.tasks) {
        setAllTasks(response.data.tasks);
      } else {
        console.log("Tasks not found in the response.");
      }
    } catch (error) {
      console.error("An error occurred while fetching tasks:", error);
    }
  };

  // Delete Task
  const deleteTask = async (task) => {
    const taskId = task._id;
    try {
      const response = await axiosInstance.delete(`/delete-task/${taskId}`);
      if (response.data && !response.data.error) {
        // Remove the deleted task from the list
        setAllTasks(allTasks.filter((item) => item._id !== taskId));
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.", error);
    }
  };

  // Calculate task counts
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter(
    (task) => task.status === "Completed"
  ).length;
  const incompleteTasks = allTasks.filter(
    (task) => task.status === "Incomplete"
  ).length;

  // Filter tasks based on the selected status
  const filteredTasks = allTasks.filter((task) => {
    if (filter === "All") return true;
    return task.status === filter;
  });

  console.log("Filter:", filter); // Log the current filter
  console.log("Filtered Tasks:", filteredTasks); // Log the filtered tasks

  useEffect(() => {
    getAllTasks();
    getUserInfo();
  }, []);

  return (
    <div className="d-flex flex-column">
      <Navbar userInfo={userInfo} />

      <div className="d-flex justify-content-between m-5">
        {/* Status Filter */}
        <div className="mb-3">
          <label>Status Filter: </label>
          <select
            className="ms-2"
            value={filter}
            onChange={(e) => setFilter(e.target.value)} // Update filter state on change
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Incomplete">Incomplete</option>
          </select>
        </div>

        <button
          className="btn btn-primary text-white fs-5 rounded w-25 h-50"
          onClick={() => {
            setOpenTaskAddEditModal({
              isShown: true,
              type: "add",
              data: null,
            });
          }}
        >
          Click to Add Task
        </button>

        {/* Task Counts */}
        <div className="d-flex align-items-center">
          <span className="bg-primary text-white fw-bold  px-3 py-2 mx-1 rounded-circle ">
            {totalTasks}
          </span>
          <span className="bg-success text-white fw-bold   px-3 py-2 mx-1 rounded-circle">
            {completedTasks}
          </span>
          <span className="bg-danger text-white fw-bold  px-3 py-2 mx-1 rounded-circle">
            {incompleteTasks}
          </span>
        </div>
      </div>

      {filteredTasks.length > 0 ? (
        <div className="d-flex flex-wrap m-5">
          {filteredTasks.map((task) => {
            return (
              <TaskCard
                key={task._id}
                name={task.name}
                description={task.description}
                assignDate={task.assignDate}
                lastDate={task.lastDate}
                status={task.status}
                onEdit={() => handleEdit(task)}
                onDelete={() => deleteTask(task)}
              />
            );
          })}
        </div>
      ) : (
        " Press click to Add task and Create new Task "
      )}

      <Modal
        isOpen={openTaskAddEditModal.isShown}
        onRequestClose={handleCloseModal}
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            width: "50%",
          },
        }}
      >
        <div className="w-100 p-4">
          <TaskEdit
            onClose={handleCloseModal}
            taskData={openTaskAddEditModal.data}
            type={openTaskAddEditModal.type}
            getAllTasks={getAllTasks}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Home;
