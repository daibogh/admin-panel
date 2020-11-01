import React, { CSSProperties } from 'react'
import './MapTemplate.scss'
import { observer } from 'mobx-react'
import { RouteComponentProps } from '@reach/router'
import cn from 'classnames'

interface MapTemplateProps extends RouteComponentProps {
  className?: string
  style: CSSProperties
}

const MapTemplate: React.FC<MapTemplateProps> = ({ className, children, style }) => {
  return (
    <div className={cn(className, 'areaForm')} style={style}>
      {children}
    </div>
  )
}

export default observer(MapTemplate)
