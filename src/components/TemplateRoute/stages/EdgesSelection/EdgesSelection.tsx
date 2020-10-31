import React, { useCallback, useEffect, useMemo, useState } from 'react'
import style from './EdgesSelection.module.scss'
import { observer } from 'mobx-react'
import { RouteComponentProps } from '@reach/router';
import cn from 'classnames'
import { useStore } from '../../../../store/RootStore';
import { Instructions } from '../../../Instructions';
import { Button, Input } from '@material-ui/core';
import _ from 'lodash'

interface EdgesSelectionProps extends RouteComponentProps{
  className?: string
  setContinue: (value: boolean) => void
}

const EdgesSelection: React.FC<EdgesSelectionProps> = ({ className, setContinue }) => {
  const { constructorStore : { areaEdges, edgesSaved, areas, latLongs, setPolygonName, rooms, areasGridStyle, saveLatLong, isPolygonNameValid } } = useStore()
  const [area, setArea] = useState<string | null>(null)
  const [lat, setLat] = useState<number | null>(null)
  const [long, setLong] = useState<number | null>(null)
  const chooseHandler = useCallback((area: string) => {
    if (Object.values(areaEdges).includes(area) && !latLongs[area]) {
      setArea(area)
    }    
  }, [setArea, areaEdges, latLongs])
  const saveEdge = useCallback(() => {
    if (lat && long && area)
      saveLatLong({area, lat, long})
      setArea(null)
  }, [lat, long, area, saveLatLong])
  useEffect(() => {
    if (edgesSaved && isPolygonNameValid) {
      setContinue(true)
    } else {
      setContinue(false)
    }
  }, [edgesSaved, isPolygonNameValid, setContinue])
return <div className={cn(style.root, className)}>
  <Instructions text='Расставьте координаты выбранным точкам' />
    <div className={style.areaForm} style={{gridTemplateAreas: areasGridStyle}}>
      {
        _.flatten(areas).map(
          area => <div key={area}
          style={{backgroundColor: Object.values(rooms)
            .find(elem => elem.zones.includes(area))?.color}} 
          onClick={() => chooseHandler(area)}
          className={style[area]}>
            {Object.values(areaEdges).includes(area) && area}</div>)
      }
    </div>
    {
      area && <div>
        <Input type='number' onChange={(e) => setLat(+e.target.value)}/>
        <Input type='number' onChange={(e) => setLong(+e.target.value)} />
        <Button disabled={!lat || !long} onClick={saveEdge}>сохранить</Button>
      </div>
    }
    {edgesSaved && <div>
      <input type='text' onChange={(e) => setPolygonName(e.target.value)}/>
      </div>}
</div>
}

export default observer(EdgesSelection)
