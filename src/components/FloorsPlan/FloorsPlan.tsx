import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import cn from 'classnames'
import style from './FloorsPlan.module.scss'
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import classes from '*.module.css';

const FloorTooltip = ({peopleCount, people, flatsLength, idx}: any) => <>
    {peopleCount > 0 && <Tooltip title={
                        <React.Fragment>
                        <Typography color="inherit"> На {flatsLength - idx} этаже работают:</Typography>
                        <List>
                            {people.map(({name, job}: any) => (
                            <ListItem alignItems="flex-start" key={name}>
                                <ListItemAvatar>
                                <PermIdentityIcon />
                                </ListItemAvatar>
                                <ListItemText
                                primary={name}
                                secondary={
                                    <React.Fragment>
                                        <span style={{color: 'white'}}>
                                    {job}
                                    </span>
                                    </React.Fragment>
                                }
                                />
                            </ListItem>
                            ))}
                        </List>
                      </React.Fragment>
                        // people.map(({name, job}) => `${name} (${job})`).join('\n')
                        }>
                            <PermIdentityIcon />
                        </Tooltip>
                         }
</>
const FloorPlan: React.FC = () => {
    const flatsConfig = [
        {peopleCount: 0, people: []},
        {peopleCount: 0, people: []},
        {peopleCount: 0, people: []},
        {peopleCount: 0, people: []},
        {peopleCount: 2, people: [
            {
                name: 'Анастасия Когтева',
                job: 'прячется от кринжа'
            },
            {
                name: 'Анна Глебова',
                job: 'флексит'
            },
            
        ]},
        {peopleCount: 0, people: []},
        {peopleCount: 0, people: []},
        {peopleCount: 0, people: []},
        {peopleCount: 0, people: []},
        {peopleCount: 0, people: []},
        {peopleCount: 3, chosen: true, people: [
            {
                name: 'Петр Баранов',
                job: 'месит глину'
            },
            {
                name: 'Игорь Бесчастнов',
                job: 'месит глину'
            },
            {
                name: 'Василий Ковалев',
                job: 'месит глину'
            }
    ]},
        {peopleCount: 0, people: []},
    ]
    return <div className={style.root}>
            {
                flatsConfig.reverse().map(({people, peopleCount, chosen}, idx) => <div className={cn(style.flat, {[style.flat_chosen]: chosen})}>
                    <div className={style.flat__flatNumber}>{flatsConfig.length - idx}</div>
            { !chosen ? <FloorTooltip people={people} peopleCount={peopleCount} flatsLength={flatsConfig.length} idx={idx} /> 
                      : <>
                        <FloorTooltip people={people} peopleCount={peopleCount} flatsLength={flatsConfig.length} idx={idx}/>
                </>
                    }
                </div>)
            }
        </div>
}

export default FloorPlan