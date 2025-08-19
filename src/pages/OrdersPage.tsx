const OrdersPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Orders</h1>
      </div>
      <div className="card" style={{ padding: "60px 20px", textAlign: "center" }}>
        <i
          className="fas fa-shopping-cart"
          style={{ fontSize: "48px", color: "#ccc", marginBottom: "16px" }}
        ></i>
        <h3>Orders page coming soon</h3>
        <p style={{ color: "var(--text-secondary)" }}>
          This page will show your order history and status
        </p>
      </div>
    </div>
  );
};

export default OrdersPage;
