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
    <div className="col-md-3 m-3">
      <div className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text">Assign Date: {assignDate}</p>
          <p className="card-text">Last Date: {lastDate}</p>
          <p className="card-text">Status: {status}</p>
          <p className="card-text text-center fw-bold">
            Remaining Days:{" "}
            {Math.ceil(
              (new Date(lastDate) - new Date()) / (1000 * 60 * 60 * 24)
            )}
          </p>

          {/* <button className="btn btn-primary" onClick={onSave}>
            <i className="bi bi-check-square"></i>
          </button> */}
          <button className="btn btn-success" onClick={onEdit}>
            <i className="bi bi-pencil-square"></i>
          </button>

          <button className="btn btn-danger" onClick={onDelete}>
            <i className="bi bi-trash3"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
