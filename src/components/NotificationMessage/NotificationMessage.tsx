import React, { useEffect } from 'react'
import style from './NotificationMessage.module.scss'
import { observer } from 'mobx-react'
import { RouteComponentProps } from '@reach/router';
import { useStore } from '../../store/RootStore';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
interface NotificationMessageProps extends RouteComponentProps{
  className?: string
}


const NotificationMessage: React.FC<NotificationMessageProps> = () => {
  // const { notifications: { setNotification } } = useStore()
  // useEffect(() => {
  //   return () => {
  //     setNotification(null)
  //   }
  // }, [setNotification])
  return <ToastContainer />
}

export default observer(NotificationMessage)
