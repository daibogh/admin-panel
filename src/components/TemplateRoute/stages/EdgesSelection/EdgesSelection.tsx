import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { observer } from 'mobx-react'
import { RouteComponentProps } from '@reach/router'
import cn from 'classnames'
import { useStore } from '../../../../store/RootStore'
import { Instructions } from '../../../Instructions'
import { Button, Grid, Input, TextField } from '@material-ui/core'
import _ from 'lodash'
import { MapTemplate } from '../../../MapTemplate'
import { useRespondTo } from '../../../../hooks/useRespondTo'

interface EdgesSelectionProps extends RouteComponentProps {
  className?: string
  setContinue: (value: boolean) => void
}

const EdgesSelection: React.FC<EdgesSelectionProps> = ({ className, setContinue }) => {
  const {
    constructorStore: {
      areaEdges,
      edgesSaved,
      areas,
      latLongs,
      setPolygonName,
      rooms,
      areasGridStyle,
      saveLatLong,
      isPolygonNameValid
    }
  } = useStore()
  const isSm = useRespondTo({ type: 'gte', breakpoint: 'sm' })
  const [area, setArea] = useState<string | null>(null)
  const [lat, setLat] = useState<number | null>(null)
  const [long, setLong] = useState<number | null>(null)
  const chooseHandler = useCallback(
    (area: string) => {
      if (Object.values(areaEdges).includes(area) && !latLongs[area]) {
        setArea(area)
      }
    },
    [setArea, areaEdges, latLongs]
  )
  const saveEdge = useCallback(() => {
    if (lat && long && area) saveLatLong({ area, lat, long })
    setArea(null)
    setLat(null)
    setLong(null)
  }, [lat, long, area, saveLatLong, setLat, setLong])
  useEffect(() => {
    if (edgesSaved && isPolygonNameValid) {
      setContinue(true)
    } else {
      setContinue(false)
    }
  }, [edgesSaved, isPolygonNameValid, setContinue])
  return (
    <>
      <Instructions text='Расставьте координаты' />
      <MapTemplate style={{ gridTemplateAreas: areasGridStyle }}>
        {_.flatten(areas).map(area => (
          <div
            key={area}
            style={{ backgroundColor: Object.values(rooms).find(elem => elem.zones.includes(area))?.color }}
            onClick={() => chooseHandler(area)}
            className={area}
          >
            {Object.values(areaEdges).includes(area) && area}
          </div>
        ))}
      </MapTemplate>
      {area ? (
        <>
          <Grid
            container
            direction={isSm ? 'row' : 'column'}
            justify='center'
            alignItems='center'
            style={{ marginBottom: 'auto', padding: '0 10px' }}
          >
            <TextField type='number' label='Широта' onChange={e => setLat(+e.target.value)} />
            <TextField type='number' label='Долгота' onChange={e => setLong(+e.target.value)} />
            <Button style={{ paddingTop: '15px' }} disabled={!lat || !long} onClick={saveEdge}>
              сохранить
            </Button>
          </Grid>
        </>
      ) : edgesSaved ? (
        <>
          <TextField
            style={{ margin: 'auto' }}
            label='Название полигона'
            onChange={e => setPolygonName(e.target.value)}
          />
        </>
      ) : (
        <div style={{ height: '210px', visibility: 'hidden' }} />
      )}
    </>
  )
}

export default observer(EdgesSelection)
