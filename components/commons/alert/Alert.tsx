import { FC } from "react"
import { clsx } from "../../../lib/clsx"
import styles from "./Alert.module.scss"
import {
  FaCheckCircle,
  FaInfoCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa"

interface IAlert {
  title: string
  message: string
  icon: string
  show: boolean
}

export const Alert: FC<IAlert> = ({ title, message, icon, show }) => {
  const renderAlert = () => {
    switch (icon) {
      case "success":
        return <FaCheckCircle />
      case "info":
        return <FaInfoCircle />
      case "warning":
        return <FaExclamationTriangle />
      case "error":
        return <FaTimesCircle />
      default:
        break
    }
  }
  const alertColor = () => {
    switch (icon) {
      case "success":
        return styles.success
      case "info":
        return styles.info
      case "warning":
        return styles.warning
      case "error":
        return styles.error
      default:
        break
    }
  }
  return (
    <div className={clsx(styles.alert, !show && styles.hidden, alertColor())}>
      <div className={styles.icon}>{renderAlert()}</div>
      <div className={styles.description}>
        <span>{title}</span>
        <p>{message}</p>
      </div>
    </div>
  )
}
