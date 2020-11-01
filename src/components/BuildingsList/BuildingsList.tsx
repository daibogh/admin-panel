import React, { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { RouteComponentProps } from '@reach/router'
import { useStore } from '../../store/RootStore'
import { fetchBuildingConfig, fetchBuildingsList } from '../../api/fetchers'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { FormControl, FormHelperText, FormLabel, Grid, MenuItem, Select } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 300,
      backgroundColor: theme.palette.background.paper
    },
    input: {
      margin: '0 auto',
      width: '100%',
      maxWidth: 300
    }
  })
)

const BuildListItem = observer(({ polygonName, id }: { polygonName: string; id: number }) => {
  const {
    building: { init }
  } = useStore()
  const getBuildingConfig = useCallback(() => {
    fetchBuildingConfig(id).then(resp => {
      init(resp.data.layout)
    })
  }, [init, id])
  return (
    <MenuItem value={polygonName} onClick={() => getBuildingConfig()}>
      {polygonName}
    </MenuItem>
  )
})
interface BuildingsListProps extends RouteComponentProps {
  className?: string
}

const BuildingsList: React.FC<BuildingsListProps> = ({ className }) => {
  const [list, setList] = useState<{ name: string; id: number }[]>([])
  const classes = useStyles()
  const {
    building: { config }
  } = useStore()
  useEffect(() => {
    fetchBuildingsList().then(resp => {
      setList(resp.data.map(({ title, id }) => ({ name: title, id })))
    })
  }, [])
  return (
    <Grid container justify='center'>
      <FormControl style={{ width: '100%', padding: '0 10px' }}>
        <Select className={classes.input} value={config?.polygonName}>
          {list.map(({ name, id }) => (
            <BuildListItem key={name} polygonName={name} id={id} />
          ))}
        </Select>
        <FormHelperText className={classes.input}>Выберите полигон</FormHelperText>
      </FormControl>
    </Grid>
  )
}

export default observer(BuildingsList)
