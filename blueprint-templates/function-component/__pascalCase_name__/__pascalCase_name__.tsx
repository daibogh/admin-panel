import React from 'react'
import style from './{{pascalCase name}}.module.scss'
import { observer } from 'mobx-react'
import { RouteComponentProps } from '@reach/router';
import cn from 'classnames'

interface {{pascalCase name}}Props extends RouteComponentProps{
  className?: string
}

const {{pascalCase name}}: React.FC<{{pascalCase name}}Props> = ({ className }) => {
  return <div className={cn(style.root, className)}>{{pascalCase name}}</div>
}

export default observer({{pascalCase name}})
