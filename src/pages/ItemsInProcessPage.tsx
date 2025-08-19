const ItemsInProcessPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Items In Process</h1>
      </div>
      <div className="card" style={{ padding: "60px 20px", textAlign: "center" }}>
        <i
          className="fas fa-cogs"
          style={{ fontSize: "48px", color: "#ccc", marginBottom: "16px" }}
        ></i>
        <h3>Items In Process page coming soon</h3>
        <p style={{ color: "var(--text-secondary)" }}>
          This page will show items currently being processed
        </p>
      </div>
    </div>
  );
};

export default ItemsInProcessPage;
