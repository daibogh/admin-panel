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
import { FormControl, FormHelperText, Grid, InputLabel, List, MenuItem, Select } from '@material-ui/core';
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

const BuildListItem = observer(({polygonName, id}: { polygonName: string, id: number}) => {
  const { building: { init } } = useStore() 
  const getBuildingConfig = useCallback(() => {
    fetchBuildingConfig(id).then((resp) => { init(resp.data.layout) })
}, [init, id])
  return (
  <MenuItem value={polygonName} onClick={() => getBuildingConfig()}>{polygonName}</MenuItem>
    // <ListItem button key={polygonName}>
    //   <ListItemText primary={polygonName} onClick={() => getBuildingConfig()}/>
    // </ListItem>
  )
})
interface BuildingsListProps extends RouteComponentProps{
  className?: string
}

const BuildingsList: React.FC<BuildingsListProps> = ({ className }) => {
  const [list, setList] = useState<{name: string; id: number}[]>([])
  const { building: {config}} = useStore()
  useEffect(() => {
    fetchBuildingsList().then((resp) => {
      console.log({data: resp.data })
      setList(resp.data.map(({title, id})=>({name: title, id})))
    })
},[])
  return <div className={cn(style.root, className)}>
      <Grid container justify='center'>
      <FormControl>
        <Select
          value={config?.polygonName}
        >
          {list.map(({name, id}) => <BuildListItem key={name} polygonName={name} id={id}/>)}
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
        <FormHelperText>Выберите полигон</FormHelperText>
      </FormControl>
      </Grid>
  </div>
}

export default observer(BuildingsList)
