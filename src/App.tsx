import React from 'react'
import './App.scss'
import { MainLayout } from './components/MainLayout'
import { StoreProvider } from './store/RootStore'
import { ToastContainer } from 'react-toastify'
const App: React.FC = () => {
  return (
    <StoreProvider>
      <MainLayout />
      <ToastContainer />
    </StoreProvider>
  )
}
export default App
