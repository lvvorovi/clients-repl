import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import Sidebar from './Sidebar'
import Header from './Header'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const { sidebarOpen } = useSelector((state: RootState) => state.ui)

  return (
    <div className="layout">
      <Sidebar />
      <div className={`main-container ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Header />
        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout