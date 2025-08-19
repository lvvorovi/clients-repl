import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { RootState } from '../../store/store'
import { logout } from '../../store/slices/authSlice'
import { setSearchPopup } from '../../store/slices/uiSlice'
import SearchBar from '../SearchBar/SearchBar'
import './Header.css'

const getPageTitle = (pathname: string): string => {
  const routes: { [key: string]: string } = {
    '/': 'Requests',
    '/requests': 'Requests',
    '/requests/new': 'New Request',
    '/orders': 'Orders',
    '/invoices': 'Invoices',
    '/items-in-process': 'Items In Process',
    '/reclamation': 'Reclamation',
  }
  
  return routes[pathname] || 'Dashboard'
}

const Header = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const { user } = useSelector((state: RootState) => state.auth)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const pageTitle = getPageTitle(location.pathname)

  const handleLogout = () => {
    dispatch(logout())
    setDropdownOpen(false)
  }

  const handleSearch = (query: string) => {
    if (query.trim()) {
      dispatch(setSearchPopup({ 
        isOpen: true, 
        query, 
        loading: true 
      }))
      
      // Simulate API call
      setTimeout(() => {
        dispatch(setSearchPopup({ 
          loading: false,
          results: [
            { id: '1', partNumber: 'ABC123', description: 'Sample part 1', brand: 'Brand A' },
            { id: '2', partNumber: 'XYZ789', description: 'Sample part 2', brand: 'Brand B' },
          ]
        }))
      }, 1000)
    } else {
      dispatch(setSearchPopup({ isOpen: false }))
    }
  }

  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="page-title">{pageTitle}</h1>
        </div>
        
        <div className="header-right">
          <SearchBar onSearch={handleSearch} />
          
          <div className="user-dropdown">
            <button 
              className="user-dropdown-toggle"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="user-avatar">
                <span>{user?.name.charAt(0) || 'U'}</span>
              </div>
              <span className="user-name">{user?.name || 'User'}</span>
              <i className="fas fa-chevron-down"></i>
            </button>
            
            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <p className="user-name">{user?.name}</p>
                  <p className="user-email">{user?.email}</p>
                </div>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout-btn" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header