import React, { useState } from 'react'
import style from './TemplateRoute.module.scss'
import { observer } from 'mobx-react'
import { RouteComponentProps } from '@reach/router';
import cn from 'classnames'
import { makeStyles, Theme, createStyles, Tooltip, Typography, Button } from '@material-ui/core';
import { useStore } from '../../store/RootStore';
import _ from 'lodash'
import { AreaSelection } from './stages/AreaSelection';
import { RoomSelection } from './stages/RoomSelection';
import { EdgesSelection } from './stages/EdgesSelection';
interface TemplateRouteProps extends RouteComponentProps{
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



const TemplateRoute: React.FC<TemplateRouteProps> = ({ className }) => {
  const classes = useStyles()
  const [stage, setStage] = useState(0)
  const [canContinue, setContinue] = useState(false)
  const stages = [
    <AreaSelection setContinue={setContinue} />,
    <RoomSelection setContinue={setContinue} />,
    <EdgesSelection setContinue={setContinue} />,
  ]
  return <div className={cn(style.root,classes.content, className)}>
    {stages[stage]}
    <Button disabled={!canContinue} onClick={() => {
      setStage(stage => stage + 1)
      setContinue(false)
    }}>далее</Button>
    {/* <Button onClick={() => setStage(stage => stage + 1)}>назад</Button> */}
  </div>
}

export default observer(TemplateRoute)
