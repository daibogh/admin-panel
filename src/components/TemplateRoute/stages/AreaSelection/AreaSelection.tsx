import React, { useCallback } from 'react'
import style from './AreaSelection.module.scss'
import { observer } from 'mobx-react'
import { RouteComponentProps } from '@reach/router';
import cn from 'classnames'
import _ from 'lodash'
import { Instructions } from '../../../Instructions';
import { useStore } from '../../../../store/RootStore';

interface AreaSelectionProps extends RouteComponentProps{
  className?: string
  setContinue: (val: boolean) => void
}

const AreaSelection: React.FC<AreaSelectionProps> = ({ className, setContinue }) => {
  const { constructorStore: cs } = useStore()
  const chooseHandler = useCallback((area: string) => {
    const rowIdx = cs.areas.findIndex((row) => ~row.indexOf(area))
    const oldRow = cs.areas[rowIdx].slice()
    const newRow = [
      ...oldRow.slice(0, oldRow.indexOf(area)),
      area.startsWith('a') 
      ? area.replace('a','b')
      : area.replace('b','a'), 
      ...oldRow.slice(oldRow.indexOf(area) + 1)
    ]
    const newAreas = [...cs.areas.slice(0, rowIdx), newRow, ...cs.areas.slice(rowIdx + 1)]
    cs.setAreas(newAreas)
    if (_.flatten(cs.areas).some(area => area.startsWith('b'))) {
      setContinue(true)
    }
  }, [cs])
  return <div className={cn(style.root, className)}>
    <Instructions text='выберите зоны полигона' />
    <div className={style.areaForm} style={{gridTemplateAreas: cs.areasGridStyle}}>
      {
        _.flatten(cs.areas).map(area => <div key={area} onClick={() => chooseHandler(area)} className={style[area]}/>)
      }
    </div>
  </div>
}

export default observer(AreaSelection)
