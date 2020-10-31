import React from 'react'
import style from './BuildingPlan.module.scss'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import Tooltip from '@material-ui/core/Tooltip'
import Draggable from 'react-draggable'

const Person: React.FC<{ title: string; x: number; y: number }> = ({ title, x, y }) => (
  <div style={{ position: 'absolute', top: `${y}px`, left: `${x}px` }}>
    <Tooltip title={title}>
      <PermIdentityIcon />
    </Tooltip>
  </div>
)
const BuildingPlan: React.FC = () => {
  return (
    <Draggable>
      <div
        className={style.root}
        style={{
          gridTemplateAreas: `"a b b c"
    "d e e f"`
        }}
      >
        <div className={style.a} />
        <div className={style.b}>
          <div className={style.b__r1} />
          <div className={style.b__r2} />
          <div className={style.b__r3} />
        </div>
        <div className={style.c}>
          <div className={style.c__r1}>
            <div className={style.s1} />
            <div className={style.s2} />
            <div className={style.s3} />
          </div>
          <div className={style.c__r2} />
        </div>
        <div className={style.d}>
          <div className={style.s1} />
          <div className={style.s2} />
          <div className={style.s3} />
        </div>
        <div className={style.e}>
          <div className={style.e__door} />
        </div>
        <div className={style.f} />
        <Person x={10} y={50} title='Петр Баранов (месит глину)' />
        <Person x={200} y={50} title='Игорь Бесчастнов (месит глину)' />
        <Person x={10} y={350} title='Василий Ковалев (месит глину)' />
      </div>
    </Draggable>
  )
}

export default BuildingPlan
