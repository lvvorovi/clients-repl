import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addRequest } from "../store/slices/requestsSlice";
import { RequestItem, Priority } from "../store/slices/requestsSlice";
import "./NewRequestPage.css";

interface NewRequestItem extends Omit<RequestItem, "id"> {
  tempId: string;
}

const NewRequestPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [items, setItems] = useState<NewRequestItem[]>([]);
  const [newItem, setNewItem] = useState({
    partNumber: "",
    brand: "",
    quantity: 1,
    description: "",
  });
  const [priority, setPriority] = useState<Priority>("medium");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addItem = () => {
    if (!newItem.partNumber.trim() || !newItem.brand.trim()) {
      alert("Part number and brand are required");
      return;
    }

    const item: NewRequestItem = {
      ...newItem,
      tempId: `temp-${Date.now()}`,
      partNumber: newItem.partNumber.trim(),
      brand: newItem.brand.trim(),
      description: newItem.description.trim(),
    };

    setItems([...items, item]);
    setNewItem({
      partNumber: "",
      brand: "",
      quantity: 1,
      description: "",
    });
  };

  const removeItem = (tempId: string) => {
    setItems(items.filter((item) => item.tempId !== tempId));
  };

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      alert("Please add at least one item to the request");
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert items to final format
      const requestItems: RequestItem[] = items.map((item, index) => ({
        id: `item-${Date.now()}-${index}`,
        partNumber: item.partNumber,
        brand: item.brand,
        quantity: item.quantity,
        description: item.description,
      }));

      const newRequest = {
        id: `REQ-${Date.now().toString().slice(-6)}`,
        clientId: "1",
        status: "pending" as const,
        priority,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        items: requestItems,
        notes: notes.trim() || undefined,
      };

      dispatch(addRequest(newRequest));

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate("/requests");
    } catch (error) {
      alert("Error creating request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="new-request-page">
      <div className="page-header">
        <h2>Create New Request</h2>
        <button className="btn btn-secondary" onClick={() => navigate("/requests")}>
          <i className="fas fa-arrow-left"></i>
          Back to Requests
        </button>
      </div>

      <div className="request-form">
        <div className="form-section card">
          <h3>Request Details</h3>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select
                className="form-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Notes (optional)</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="Additional notes or requirements..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="items-section card">
          <h3>Add Items</h3>

          <div className="add-item-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Part Number *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter part number"
                  value={newItem.partNumber}
                  onChange={(e) => setNewItem({ ...newItem, partNumber: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Brand *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter brand"
                  value={newItem.brand}
                  onChange={(e) => setNewItem({ ...newItem, brand: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Quantity *</label>
                <input
                  type="number"
                  className="form-input"
                  min="1"
                  value={newItem.quantity}
                  onChange={(e) =>
                    setNewItem({ ...newItem, quantity: parseInt(e.target.value) || 1 })
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Description (optional)</label>
              <input
                type="text"
                className="form-input"
                placeholder="Part description or additional details"
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
              />
            </div>

            <button className="btn btn-secondary add-item-btn" onClick={addItem}>
              <i className="fas fa-plus"></i>
              Add Item
            </button>
          </div>

          {items.length > 0 && (
            <div className="items-list">
              <h4>Items in Request ({items.length})</h4>
              <div className="items-table-wrapper">
                <table className="table items-table">
                  <thead>
                    <tr>
                      <th>Part Number</th>
                      <th>Brand</th>
                      <th>Qty</th>
                      <th>Description</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => (
                      <tr key={item.tempId}>
                        <td>
                          <span className="part-number">{item.partNumber}</span>
                        </td>
                        <td>{item.brand}</td>
                        <td>{item.quantity}</td>
                        <td>{item.description || "-"}</td>
                        <td>
                          <button
                            className="btn-icon delete-btn"
                            onClick={() => removeItem(item.tempId)}
                            title="Remove item"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            className="btn btn-primary place-order-btn"
            onClick={handlePlaceOrder}
            disabled={isSubmitting || items.length === 0}
          >
            {isSubmitting ? (
              <>
                <div className="loading"></div>
                Creating Request...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i>
                Place Order
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewRequestPage;
