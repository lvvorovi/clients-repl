import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { RootState } from '../../store/store'
import { toggleSidebar } from '../../store/slices/uiSlice'
import './Sidebar.css'

const navigationItems = [
  {
    id: 'requests',
    label: 'Requests',
    icon: 'fas fa-clipboard-list',
    path: '/requests'
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: 'fas fa-shopping-cart',
    path: '/orders'
  },
  {
    id: 'invoices',
    label: 'Invoices',
    icon: 'fas fa-file-invoice-dollar',
    path: '/invoices'
  },
  {
    id: 'items-in-process',
    label: 'Items In Process',
    icon: 'fas fa-cogs',
    path: '/items-in-process'
  },
  {
    id: 'reclamation',
    label: 'Reclamation',
    icon: 'fas fa-exclamation-triangle',
    path: '/reclamation'
  }
]

const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { sidebarOpen } = useSelector((state: RootState) => state.ui)

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  return (
    <aside className={`sidebar ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="sidebar-header">
        <div className="brand">
          <div className="brand-icon">
            <i className="fas fa-tools"></i>
          </div>
          {sidebarOpen && (
            <div className="brand-text">
              <h1>FixParts</h1>
              <p>Clients Portal</p>
            </div>
          )}
        </div>
        <button 
          className="sidebar-toggle"
          onClick={() => dispatch(toggleSidebar())}
        >
          <i className="fas fa-bars"></i>
        </button>
      </div>
      
      <nav className="sidebar-nav">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => handleNavigation(item.path)}
            title={item.label}
          >
            <i className={item.icon}></i>
            {sidebarOpen && <span>{item.label}</span>}
          </button>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar