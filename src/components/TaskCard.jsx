const TaskCard = ({
  name,
  description,
  assignDate,
  lastDate,
  status,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="col-md-3 m-auto">
      <div className="card m-3 border border-2 border-primary rounded-4">
        <div className="card-body ">
          <h5 className="card-title text-center ">{name}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">
            Assign Date:
            {new Date(assignDate).toLocaleDateString()}
          </p>
          <p className="card-text">
            Last Date:
            {new Date(lastDate).toLocaleDateString()}
          </p>

          <p className="card-text text-center fs-5">
            <span
              className={`badge ${
                status === "Completed" ? "bg-success" : "bg-danger"
              }`}
            >
              {status}
            </span>
          </p>

          <p className="card-text text-center fw-bold">
            Remaining Days:{" "}
            {Math.ceil(
              (new Date(lastDate) - new Date()) / (1000 * 60 * 60 * 24)
            )}
          </p>

          <div className="d-flex justify-content-evenly">
            <button
              className="btn border border-2 border-primary"
              onClick={onEdit}
            >
              <i className="bi bi-pencil-square"></i>
            </button>

            <button
              className="btn border border-2 border-danger"
              onClick={onDelete}
            >
              <i className="bi bi-trash3"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
