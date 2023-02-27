'use client'

import styles from './layout.module.scss'
import { ISubmenu, sidebarOptions } from '@/utils/sidebarOptions'
import { useEffect, useState } from 'react'
import { clsx } from '@/lib/clsx'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { IoIosArrowDown } from 'react-icons/io'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function ComercialLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)
  const [isSubmenuExpanded, setIsSubmenuExpanded] = useState(false)
  const [submenuList, setSubmenuList] = useState<ISubmenu[]>([])
  const pathName = usePathname()

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsSubmenuExpanded(false)
  //   }, 10000);
  // }, [isSubmenuExpanded])

  const expandSubmenu = (submenu: ISubmenu[]) => {
    setSubmenuList(submenu)
    setIsSubmenuExpanded(true)
    if (isSidebarExpanded) {
      setIsSidebarExpanded(false)
    }
  }

  const showSubmenuMenu = (index: number) => {
    const newList = submenuList.map((s_l, i) => {
      if (i === index) {
        if (s_l.show) {
          return {
            ...s_l,
            show: !s_l.show
          }
        }
        return {
          ...s_l,
          show: true
        }
      }
      return {
        ...s_l,
        show: false
      }
    })
    setSubmenuList(newList)
  }

  const isPathActive = (route: string) => {
    if (pathName) {
      if (pathName.includes(`/${route.toLowerCase()}/`)) {
        return styles.active
      }
    }
  }

  return (
    <div className={styles.layout}>
      <div className={styles.sidebar}>
        <div className={clsx(styles.options, isSidebarExpanded && styles.hidden)}>
          <div className={styles.header} onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}>
            <span className={styles.title}>CEA COMERCIAL</span> <span className={styles.icon}>{!isSidebarExpanded ? <AiOutlineMinus /> : <AiOutlinePlus />}</span>
          </div>
          <ul className={styles.menu}>
            {
              sidebarOptions.map((opt) => (
                <li key={opt.name} onClick={() => expandSubmenu(opt.submenu)} className={isPathActive(opt.name)}>
                  <span className={styles.icon}>{opt.icon}</span> <span className={styles.name}>{opt.name}</span>
                </li>
              ))
            }
          </ul>
        </div>
        <div className={clsx(styles.submenu, isSubmenuExpanded && styles.expanded, isSidebarExpanded && styles.hidden)}>
          <div className={styles.header}>

          </div>
          <ul className={styles.menu}>
            {
              submenuList.map((sub_menu, index) => (
                <li key={sub_menu.name} className={styles.submenu_item}>
                  {
                    !sub_menu.url ?
                      <div className={styles.sub_submenu_title} onClick={() => showSubmenuMenu(index)}>
                        <span className={styles.icon}>{sub_menu.icon}</span> <span className={styles.name}>{sub_menu.name}</span> {sub_menu.submenu.length > 0 && <IoIosArrowDown className={styles.arrow} />}
                      </div> :
                      <Link href={sub_menu.url}>
                        <div className={styles.sub_submenu_title} onClick={() => showSubmenuMenu(index)}>
                          <span className={styles.icon}>{sub_menu.icon}</span> <span className={styles.name}>{sub_menu.name}</span> {sub_menu.submenu.length > 0 && <IoIosArrowDown className={styles.arrow} />}
                        </div>
                      </Link>
                  }
                  <ul className={clsx(styles.sub_submenu_menu, sub_menu.show && styles.show)}>
                    {
                      sub_menu.submenu.map((sub_submenu) => (
                        <Link href={sub_submenu.url} key={sub_submenu.name}>
                          <li className={styles.sub_submenu_item}>
                            {sub_submenu.name}
                          </li>
                        </Link>
                      ))
                    }
                  </ul>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}