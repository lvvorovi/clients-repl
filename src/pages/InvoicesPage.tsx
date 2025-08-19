const InvoicesPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Invoices</h1>
      </div>
      <div className="card" style={{ padding: "60px 20px", textAlign: "center" }}>
        <i
          className="fas fa-file-invoice-dollar"
          style={{ fontSize: "48px", color: "#ccc", marginBottom: "16px" }}
        ></i>
        <h3>Invoices page coming soon</h3>
        <p style={{ color: "var(--text-secondary)" }}>
          This page will show your invoices and payment history
        </p>
      </div>
    </div>
  );
};

export default InvoicesPage;
