import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import Layout from "./components/Layout/Layout";
import RequestsPage from "./pages/RequestsPage";
import NewRequestPage from "./pages/NewRequestPage";
import OrdersPage from "./pages/OrdersPage";
import InvoicesPage from "./pages/InvoicesPage";
import ItemsInProcessPage from "./pages/ItemsInProcessPage";
import ReclamationPage from "./pages/ReclamationPage";
import SearchPopup from "./components/SearchPopup/SearchPopup";

function App() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please login to continue</h1>
          <button className="btn btn-primary">Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Layout>
        <Routes>
          <Route path="/" element={<RequestsPage />} />
          <Route path="/requests" element={<RequestsPage />} />
          <Route path="/requests/new" element={<NewRequestPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/items-in-process" element={<ItemsInProcessPage />} />
          <Route path="/reclamation" element={<ReclamationPage />} />
        </Routes>
      </Layout>
      <SearchPopup />
    </div>
  );
}

export default App;
