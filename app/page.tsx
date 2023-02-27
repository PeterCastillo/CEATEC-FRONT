import { BsFillTelephoneFill } from "react-icons/bs"
import Image from "next/image"
import styles from './page.module.scss'
import { SignInForm } from '@/components/commons/signin/SignInForm'

export default function Home() {

  return (
    <div className={styles.main}>
      <div className={styles.front_page}>
        <div className={styles.front_page_cellphone}>
          <BsFillTelephoneFill />
          <span>+94 0116 789 754</span>
        </div>
        <div className={styles.front_page_container_image}>
          <Image
            src="/frontpage_image.png"
            alt="signin-image"
            width={300}
            height={300}
            className={styles.front_page_image}
          />
        </div>
        <div>
          <h1 className={styles.front_page_title}>Sign in to name</h1>
          <p className={styles.front_page_description}>
            lorem lorem lorem lorem{" "}
          </p>
        </div>
      </div>
      <div className={styles.main_form}>
        <SignInForm />
      </div>
    </div>
  )
}
