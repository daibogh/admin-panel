import React, { useCallback, useEffect, useMemo, useState } from 'react'
import style from './EdgesSelection.module.scss'
import { observer } from 'mobx-react'
import { RouteComponentProps } from '@reach/router';
import cn from 'classnames'
import { useStore } from '../../../../store/RootStore';
import { Instructions } from '../../../Instructions';
import { Button } from '@material-ui/core';
import _ from 'lodash'

interface EdgesSelectionProps extends RouteComponentProps{
  className?: string
  setContinue: (value: boolean) => void
}

const EdgesSelection: React.FC<EdgesSelectionProps> = ({ className, setContinue }) => {
  const { constructorStore : cs } = useStore()
  const [area, setArea] = useState<string | null>(null)
  const [lat, setLat] = useState<number | null>(null)
  const [long, setLong] = useState<number | null>(null)
  const [polygonName, setPolygonName] = useState<string | null>(null)
  const [edgesSaved, setEdgesSaved] = useState(false)
  const chooseHandler = useCallback((area: string) => {
    if (Object.values(cs.areaEdges).includes(area)) {
      setArea(area)
    }    
  }, [setArea, cs])
  const saveEdge = useCallback(() => {
    if (lat && long && area)
      cs.saveLatLong({area, lat, long})
  }, [cs, lat, long, area])
  useEffect(() => {
    console.log('length', cs.latLongs.length)
    if (cs.latLongs.length === 4) {
      setEdgesSaved(true)
    }
  },[cs, setEdgesSaved])
  useEffect(() => {
    if (edgesSaved && polygonName) {
      setContinue(true)
    } else {
      setContinue(false)
    }
  }, [polygonName, edgesSaved, setContinue])
return <div className={cn(style.root, className)}>
  <Instructions text='Поделите выбранные зоны на комнаты' />
    <div className={style.areaForm} style={{gridTemplateAreas: cs.areasGridStyle}}>
      {
        _.flatten(cs.areas).map(area => <div key={area} style={{backgroundColor: Object.values(cs.rooms).find(elem => elem.zones.includes(area))?.color}} onClick={() => chooseHandler(area)} className={style[area]}>{Object.values(cs.areaEdges).includes(area) && area}</div>)
      }
    </div>
    {
      area && <div>
        <input type='number' onChange={(e) => setLat(+e.target.value)}/>
        <input type='number' onChange={(e) => setLong(+e.target.value)} />
        <Button disabled={!lat || !long} onClick={saveEdge}>сохранить</Button>
      </div>
    }
    {edgesSaved && <div>
      <input type='text' onChange={(e) => setPolygonName(e.target.value)}/>
      </div>}
</div>
}

export default observer(EdgesSelection)
