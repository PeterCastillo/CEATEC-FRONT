import { FC } from 'react'
import { clsx } from '../../../lib/clsx'
import style from './Loader.module.scss'

interface ILoader {
  show: boolean
}

export const Loader: FC<ILoader> = ({ show }) => {
  return (
    <div className={clsx(style.loader_container, !show && style.hidden)}>
      <span className={style.loader}></span>
    </div>
  )
}