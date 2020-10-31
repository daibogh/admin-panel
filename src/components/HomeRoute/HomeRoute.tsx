import React from 'react'
import style from './HomeRoute.module.scss'
import { observer } from 'mobx-react'
import cn from 'classnames'
import { BuildingPlan } from '../BuildingPlan'
import { FloorsPlan } from '../FloorsPlan'
import { RouteComponentProps } from '@reach/router'
import { makeStyles, Theme, createStyles } from '@material-ui/core'

interface HomeRouteProps extends RouteComponentProps {
  className?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      height: '100vh',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center'
    }
  })
)


const HomeRoute: React.FC<HomeRouteProps> = ({ className }) => {
  const styles = useStyles()
  return <div className={cn(styles.content, className)}>
    <BuildingPlan />
    <FloorsPlan />
  </div>
}

export default observer(HomeRoute)
