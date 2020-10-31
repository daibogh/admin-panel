import React, { useCallback, useEffect, useState } from 'react'
import style from './BuildingsList.module.scss'
import { observer } from 'mobx-react'
import { RouteComponentProps } from '@reach/router';
import cn from 'classnames'
import axios from 'axios';
import { useStore } from '../../store/RootStore';
import { fetchBuildingConfig, fetchBuildingsList } from '../../api/fetchers';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { List } from '@material-ui/core';
import { Generatedbuilding } from '../Generatedbuilding';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: 400,
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const BuildListItem = observer(({polygonName}: { polygonName: string}) => {
  const { building: { init } } = useStore() 
  const getBuildingConfig = useCallback(() => {
    fetchBuildingConfig(polygonName).then((resp) => { init(resp.data) })
}, [init, polygonName])
  return (
    <ListItem button key={polygonName}>
      <ListItemText primary={polygonName} onClick={() => getBuildingConfig()}/>
    </ListItem>
  )
})
interface BuildingsListProps extends RouteComponentProps{
  className?: string
}

const BuildingsList: React.FC<BuildingsListProps> = ({ className }) => {
  const [list, setList] = useState<string[]>([])
  useEffect(() => {
    const interval = setInterval(() => {
      fetchBuildingsList().then((resp) => {
        setList(resp.data)
      })
    })
    return () => clearInterval(interval)
  })
  return <div className={cn(style.root, className)}>
    <List className={style.list}>
        {list.map((name) => <BuildListItem polygonName={name} />)}
      </List>
  </div>
}

export default observer(BuildingsList)
