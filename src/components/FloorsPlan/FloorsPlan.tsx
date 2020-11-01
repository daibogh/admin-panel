import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import cn from 'classnames'
import style from './FloorsPlan.module.scss'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core'
import classes from '*.module.css'

const FloorTooltip = ({ peopleCount, people, flatsLength, idx }: any) => (
  <>
    {peopleCount > 0 && (
      <Tooltip
        title={
          <>
            <Typography color='inherit'> На {flatsLength - idx} этаже работают:</Typography>
            <List>
              {people.map(({ name, job }: any) => (
                <ListItem alignItems='flex-start' key={name}>
                  <ListItemAvatar>
                    <PermIdentityIcon />
                  </ListItemAvatar>
                  <ListItemText
                    primary={name}
                    secondary={
                      <>
                        <span style={{ color: 'white' }}>{job}</span>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </>
          // people.map(({name, job}) => `${name} (${job})`).join('\n')
        }
      >
        <PermIdentityIcon />
      </Tooltip>
    )}
  </>
)
const FloorPlan: React.FC = () => {
  const flatsConfig = [
    { peopleCount: 0, people: [] },
    { peopleCount: 0, people: [] },
    { peopleCount: 0, people: [] },
    { peopleCount: 0, people: [] },
    {
      peopleCount: 2,
      people: [
        {
          name: 'Анастасия Когтева',
          job: 'Работает с деревом'
        },
        {
          name: 'Анна Глебова',
          job: 'Проверяет помещение'
        }
      ]
    },
    { peopleCount: 0, people: [] },
    { peopleCount: 0, people: [] },
    { peopleCount: 0, people: [] },
    { peopleCount: 0, people: [] },
    { peopleCount: 0, people: [] },
    {
      peopleCount: 3,
      chosen: true,
      people: [
        {
          name: 'Петр Баранов',
          job: 'нет данных
        },
        {
          name: 'Игорь Бесчастнов',
          job: 'нет данных
        },
        {
          name: 'Василий Ковалев',
          job: 'нет данных
        }
      ]
    },
    { peopleCount: 0, people: [] }
  ]
  return (
    <div className={style.root}>
      {flatsConfig.reverse().map(({ people, peopleCount, chosen }, idx) => (
        <div className={cn(style.flat, { [style.flat_chosen]: chosen })}>
          <div className={style.flat__flatNumber}>{flatsConfig.length - idx}</div>
          {!chosen ? (
            <FloorTooltip people={people} peopleCount={peopleCount} flatsLength={flatsConfig.length} idx={idx} />
          ) : (
            <>
              <FloorTooltip people={people} peopleCount={peopleCount} flatsLength={flatsConfig.length} idx={idx} />
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default FloorPlan
