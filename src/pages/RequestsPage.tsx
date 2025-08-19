import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
import { setStatusFilter } from "../store/slices/requestsSlice";
import { Request, RequestStatus } from "../store/slices/requestsSlice";
import "./RequestsPage.css";

const getStatusColor = (status: RequestStatus): string => {
  switch (status) {
    case "pending":
      return "status-pending";
    case "in-progress":
      return "status-progress";
    case "completed":
      return "status-completed";
    case "cancelled":
      return "status-cancelled";
    default:
      return "status-pending";
  }
};

const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case "high":
      return "priority-high";
    case "medium":
      return "priority-medium";
    case "low":
      return "priority-low";
    default:
      return "priority-medium";
  }
};

const RequestsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { requests, statusFilter, loading } = useSelector((state: RootState) => state.requests);

  const filteredRequests =
    statusFilter === "all" ? requests : requests.filter((req) => req.status === statusFilter);

  const handleStatusFilterChange = (status: RequestStatus | "all") => {
    dispatch(setStatusFilter(status));
  };

  const handleNewRequest = () => {
    navigate("/requests/new");
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="requests-page">
      <div className="page-header">
        <div className="page-actions">
          <button className="btn btn-primary" onClick={handleNewRequest}>
            <i className="fas fa-plus"></i>
            New Request
          </button>

          <div className="filters">
            <select
              className="form-select status-filter"
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value as RequestStatus | "all")}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      <div className="requests-table-container card">
        {loading ? (
          <div className="loading-container">
            <div className="loading"></div>
            <p>Loading requests...</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="table requests-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Items</th>
                  <th>Created</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request: Request) => (
                  <tr key={request.id}>
                    <td>
                      <span className="request-id">{request.id}</span>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusColor(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${getPriorityColor(request.priority)}`}>
                        {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                      </span>
                    </td>
                    <td>
                      <span className="items-count">{request.items.length} item(s)</span>
                    </td>
                    <td>
                      <span className="date-text">{formatDate(request.createdAt)}</span>
                    </td>
                    <td>
                      <span className="date-text">{formatDate(request.updatedAt)}</span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button className="btn-icon view-btn" title="View">
                          <i className="fas fa-eye"></i>
                        </button>
                        <button className="btn-icon edit-btn" title="Edit">
                          <i className="fas fa-edit"></i>
                        </button>
                        <button className="btn-icon delete-btn" title="Delete">
                          <i className="fas fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredRequests.length === 0 && (
              <div className="no-data">
                <i className="fas fa-clipboard-list"></i>
                <p>No requests found</p>
                <p className="no-data-subtitle">
                  {statusFilter === "all"
                    ? "Create your first request to get started"
                    : `No requests with status: ${statusFilter}`}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestsPage;
