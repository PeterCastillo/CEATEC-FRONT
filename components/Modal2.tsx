import styles from './Modal2.module.scss'
import { MdClose } from 'react-icons/md'
import { clsx } from '@/lib/clsx'


export const Modal2 = ({
  show, setShowArticleModal
}: {
  show: boolean
  setShowArticleModal: (data: boolean) => void
}) => {
  return (
    <div className={clsx(styles.modal, !show && styles.hidden)}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span>Nuevo artículo</span>
          <button onClick={() => setShowArticleModal(false)}><MdClose /></button>
        </div>
      </div>
    </div>
  )
}