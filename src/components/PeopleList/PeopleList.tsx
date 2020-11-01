import React from 'react'
import style from './PeopleList.module.scss'
import { observer } from 'mobx-react'
import { RouteComponentProps } from '@reach/router';
import cn from 'classnames'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import { useStore } from '../../store/RootStore';
import PermIdentityIcon from '@material-ui/icons/PermIdentity'

interface PeopleListProps extends RouteComponentProps{
  className?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

const PeopleList: React.FC<PeopleListProps> = ({ className }) => {
  const classes = useStyles();
  const { building } = useStore()

  return <div className={cn(style.root, className)}>
    <List dense className={classes.root}>
      {building.people.map(({name}) => {
        const labelId = `checkbox-list-secondary-label-${name}`;
        return (
          <ListItem onMouseOver={() => {
            building.selectPerson(name)
            }} onMouseOut={() => {building.selectPerson(null)}} key={name} button>
            <ListItemAvatar>
            <PermIdentityIcon/>
            </ListItemAvatar>
            <ListItemText id={labelId} primary={name} />
          </ListItem>
        );
      })}
    </List>
  </div>
}


export default observer(PeopleList)

