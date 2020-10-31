import React from 'react'
import style from './Instructions.module.scss'
import { observer } from 'mobx-react'
import { RouteComponentProps } from '@reach/router';
import cn from 'classnames'
import { Typography } from '@material-ui/core';

interface InstructionsProps extends RouteComponentProps{
  className?: string
  text: string
}

const Instructions: React.FC<InstructionsProps> = ({ className, text }) => {
  return <div className={cn(style.root, className)}>
    {text}
  </div>
}

export default observer(Instructions)
