import React from 'react'
import style from './BuildingRoute.module.scss'
import { observer } from 'mobx-react'
import { RouteComponentProps } from '@reach/router';
import cn from 'classnames'
import { BuildingsList } from '../BuildingsList';
import { Generatedbuilding } from '../Generatedbuilding';

interface BuildingRouteProps extends RouteComponentProps{
  className?: string
}

const BuildingRoute: React.FC<BuildingRouteProps> = ({ className }) => {
  return <div className={cn(style.root, className)}>
    <div className={style.list}>
      <BuildingsList/>
    </div>
    <div className={style.building}>
      <Generatedbuilding />
    </div>
  </div>
}

export default observer(BuildingRoute)
