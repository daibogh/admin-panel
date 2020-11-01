import React, { useEffect, useMemo, useState } from 'react'
import style from './TemplateRoute.module.scss'
import { observer } from 'mobx-react'
import { navigate, RouteComponentProps } from '@reach/router';
import cn from 'classnames'
import { makeStyles, Theme, createStyles, Tooltip, Typography, Button } from '@material-ui/core';
import { useStore } from '../../store/RootStore';
import _ from 'lodash'
import { AreaSelection } from './stages/AreaSelection';
import { RoomSelection } from './stages/RoomSelection';
import { EdgesSelection } from './stages/EdgesSelection';
import { toast } from 'react-toastify';
interface TemplateRouteProps extends RouteComponentProps{
  className?: string
}

const TemplateRoute: React.FC<TemplateRouteProps> = ({ className }) => {
  const [stage, setStage] = useState(0)
  const [canContinue, setContinue] = useState(false)
  const { constructorStore: { sendConfigToServer, polygonName }, notifications} = useStore()
  const stages = useMemo(() =>[
    <AreaSelection setContinue={setContinue} />,
    <RoomSelection setContinue={setContinue} />,
    <EdgesSelection setContinue={setContinue} />,
  ], [setContinue])
  useEffect(() => {
    if (stage === stages.length) {
      sendConfigToServer()
      .then(
        () => {
          toast(`Полигон "${polygonName}" успешно сохранен`, { type: 'success'})
          navigate('/')
        }
      )
    }
  }, [stage, stages, sendConfigToServer, notifications, polygonName])
  return <div className={cn(style.root, className)}>
    {stages[stage]}
    <Button className={style.continueButton} style={{marginBottom: 'auto', display: !canContinue ? 'none': undefined}} disabled={!canContinue} onClick={() => {
      setStage(stage => stage + 1)
      setContinue(false)

    }}>далее</Button>
    {/* <Button onClick={() => setStage(stage => stage + 1)}>назад</Button> */}
  </div>
}

export default observer(TemplateRoute)
