const ReclamationPage = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Reclamation</h1>
      </div>
      <div className="card" style={{ padding: "60px 20px", textAlign: "center" }}>
        <i
          className="fas fa-exclamation-triangle"
          style={{ fontSize: "48px", color: "#ccc", marginBottom: "16px" }}
        ></i>
        <h3>Reclamation page coming soon</h3>
        <p style={{ color: "var(--text-secondary)" }}>
          This page will handle returns and reclamations
        </p>
      </div>
    </div>
  );
};

export default ReclamationPage;
