import React, { useCallback, useState } from 'react'
import style from './RoomSelection.module.scss'
import { observer } from 'mobx-react'
import { RouteComponentProps } from '@reach/router';
import cn from 'classnames'
import _ from 'lodash';
import { useStore } from '../../../../store/RootStore';
import { Instructions } from '../../../Instructions';
import { Button } from '@material-ui/core';
import { useToggle } from 'react-use'

interface RoomSelectionProps extends RouteComponentProps{
  className?: string
  setContinue: (value: boolean) => void
}

const RoomSelection: React.FC<RoomSelectionProps> = ({ className, setContinue }) => {
  const { constructorStore: cs } = useStore()
  const [zones, setZones] = useState<string[]>([])
  const [roomName, setRoomName] = useState('')
  const [ ableToRoom, setAbleToRoom] = useState(false)
  const [color, setColor] = useState('')
  const [withDevices, toggleWithDevices] = useToggle(false)
  const chooseHandler = useCallback((area: string) => {
    if (Object.keys(cs.rooms).some(roomKey => ~cs.rooms[roomKey].zones.indexOf(area))) {
      return 
    }
    setZones((zones) => {
      if (~zones.indexOf(area)) {
        if (zones.length === 1) {
          setAbleToRoom(false)
        }
        return zones.filter(_area => _area !== area)
      } else {
        if (!ableToRoom) {
          setAbleToRoom(true)
        }
        return [...zones, area]
      }
    })
  }, [setAbleToRoom, setZones, ableToRoom, cs])
  const saveRoom = useCallback(() => {
    cs.saveRoom({name: roomName, color, zones, withDevices})
    setZones([])
    setColor('')
    setAbleToRoom(false)
    if (Object.keys(cs.rooms).reduce((_sum, roomKey) => _sum + cs.rooms[roomKey].zones.length, 0) === _.flatten(cs.areas).filter(area => area.startsWith('b')).length) {
      setContinue(true)
    }
  },[color, roomName, setAbleToRoom, setColor, zones, setContinue, withDevices, setZones, cs])
  return <div className={cn(style.root, className)}>
    <Instructions text='Поделите выбранные зоны на комнаты' />
    <div className={style.areaForm} style={{gridTemplateAreas: cs.areasGridStyle}}>
      {
        _.flatten(cs.areas).map(area => <div key={area} style={{backgroundColor: Object.values(cs.rooms).find(elem => elem.zones.includes(area))?.color}} onClick={() => chooseHandler(area)} className={style[area]}/>)
      }
    </div>
    {
      ableToRoom && <div>
        <input type='color' onChange={(e) => setColor(e.target.value)}/>
        <input type='text' onChange={(e) => setRoomName(e.target.value)} />
        <input type='checkbox' onClick={toggleWithDevices} />
        <Button onClick={saveRoom}>сохранить</Button>
      </div>
    }
  </div>
}

export default observer(RoomSelection)
