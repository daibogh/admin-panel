import React from 'react'
import './App.scss'
import { MainLayout } from './components/MainLayout'
import { StoreProvider } from './store/RootStore'

const App: React.FC = () => {
  return <StoreProvider><MainLayout /></StoreProvider>
}
export default App
