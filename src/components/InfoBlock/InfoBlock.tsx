import React from 'react'
import style from './InfoBlock.module.scss'
import { observer } from 'mobx-react'
import { RouteComponentProps } from '@reach/router';
import cn from 'classnames'
import _ from 'lodash'
import { Card, CardContent, Typography, CardActions, Button, makeStyles } from '@material-ui/core';
import { useStore } from '../../store/RootStore';
import { PeopleList } from '../PeopleList';
import Alert from '@material-ui/lab/Alert';
interface InfoBlockProps extends RouteComponentProps{
  className?: string
}

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 24,
  },
  pos: {
    marginBottom: 12,
  },
});

const InfoBlock: React.FC<InfoBlockProps> = ({ className }) => {
  const classes = useStyles();
  const { building } = useStore()
  return <div className={cn(style.root, className)}><Card className={classes.root}>
  <CardContent>
    <Typography variant="h4" className={classes.title} color="textSecondary" gutterBottom>
      На смене {building.people.length} человек
    </Typography>
    <Typography variant="body2" component="p">
      <PeopleList/>
    </Typography>
  </CardContent>
</Card>
<Card className={classes.root}>
  <CardContent>
  <Typography variant="h4" className={classes.title} color="textSecondary" gutterBottom>
      Новости
  </Typography>
  Происшествий нет
  </CardContent>
</Card>
</div>
}

export default observer(InfoBlock)
