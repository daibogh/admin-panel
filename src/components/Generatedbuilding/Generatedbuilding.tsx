import React, { useEffect, useMemo, useRef, useState } from 'react'
import style from './Generatedbuilding.module.scss'
import { observer } from 'mobx-react'
import { RouteComponentProps } from '@reach/router';
import cn from 'classnames'
import _ from 'lodash'
import { useStore } from '../../store/RootStore';
import { Badge, createStyles, makeStyles, Theme, Tooltip } from '@material-ui/core';
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import { useRespondTo } from '../../hooks/useRespondTo';

interface GeneratedbuildingProps extends RouteComponentProps{
  className?: string
}
const useStyles = makeStyles((theme: Theme) => createStyles({
  selected: {
   backgroundColor: theme.palette.primary.main,
   color: 'white'
  },
})
)
const Person = observer(({offsetX, offsetY, name}: 
  { name: string; offsetX: number; offsetY: number}) => {
  const classes = useStyles()
  const { building: { person } } = useStore()
  const isSm = useRespondTo({type: 'gte', breakpoint: 'sm'})
  return <div className={style.person} style={{transform: `translate(${offsetX}px,${offsetY}px)`}}>
    {isSm ? <Tooltip open={person === name} title={name}>
      <div className={cn(style.iconWrapper,{[classes.selected]: person === name})}>
      <PermIdentityIcon />
      </div>
    </Tooltip>
    : <Badge color='primary' badgeContent={name.split(' ')[0]}>
      <div className={style.iconWrapper}>
        <PermIdentityIcon />
      </div>
    </Badge>  
  }
  </div>
})

const Generatedbuilding: React.FC<GeneratedbuildingProps> = ({ className }) => {
  const { building: { config, people, receivePeople, dispose } } = useStore()
  const isSm = useRespondTo({ type: 'gte', breakpoint: 'sm'})
  useEffect(() => {
    if (config?.polygonName)
      receivePeople()
    return () => dispose()
  }, [config])
  const coef = isSm ? 60 : 30 // длина одной ячейки TODO исправить на вычисление через ref
  if (config === null) {
    return null
  }
  const { areas, rooms, areasGridStyle, latLongs, areaEdges  } = config

  const persons = 
  people
  //[{ lat: 56.248776, long: 43.833324, name: 'Петя Баранов'}]
  .map(({lat, long, name}) => {
    // const objLength = 60 * ()
    const rowWithRightElem = areas.find(row => row.includes(areaEdges.right as string))
    const rowWithLeftElem = areas.find(row => row.includes(areaEdges.left as string))

    const rightIndex = rowWithRightElem?.indexOf(areaEdges.right as string) as number
    const leftIndex = rowWithLeftElem?.indexOf(areaEdges.left as string) as number
    const topIndex = areas.findIndex(row => row.includes(areaEdges.top as string))
    const bottomIndex = areas.findIndex(row => row.includes(areaEdges.bottom as string))

    const objLength = coef * (rightIndex - leftIndex + 1)
    const objHeight = coef * (bottomIndex - topIndex + 1)
    const latMin = latLongs[areaEdges.bottom as string].lat
    const latMax = latLongs[areaEdges.top as string].lat
    const longMin = latLongs[areaEdges.left as string].long
    const longMax = latLongs[areaEdges.right as string].long

    const offsetX = coef * leftIndex + ((long - longMin)/(longMax - longMin)) * objLength
    const offsetY = coef * topIndex + (((lat - latMin)/(latMax - latMin)) * objHeight)
    // 60 * 3 + 180 - ((1.5 - 1)/(3 - 1))* 180
    return {offsetX, offsetY, name}
  })

  return <div className={cn(style.root, className)}>
    {
      config ? <div className={style.areaForm} style={{gridTemplateAreas: areasGridStyle}}>
        {persons.map((props) => <Person key={props.name} {...props} />)}
      {
        _.flatten(areas).map(
          area => <div
          key={area}
          style={{backgroundColor: Object.values(rooms)
            .find(elem => elem.zones.includes(area))?.color}} 
          className={cn(style[area])}/>)
      }
    </div> : null
    }
  </div>
}

export default observer(Generatedbuilding)
