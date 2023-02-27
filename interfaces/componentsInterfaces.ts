export interface ISignInUserData {
  email: string
  password: string
  module: string
  business: string
}

export interface ICircularStats {
  circular: Circular
}

interface Circular {
  label: string
  borderWidth: number
  data: Array<StatCircular>
}

interface StatCircular {
  label: string
  valor: number
  backgroundColor: string
  borderColor: string
}

export interface IBarstats {
  bar: Bar
}

interface Bar {
  labels: Array<string>
  datasets: Array<Dataset>
}

interface Dataset {
  label: string
  data: Array<number>
  backgroundColor: string
}

export interface IScalastats {
  scala: Scala
}

interface Scala {
  label: string
  info: Array<StatScala>
  borderColor: string
  backgroundColor: string
}

interface StatScala {
  name: string
  cantidad: number
}

export interface ListProps {
  optionList: OptionList
  showMenu: (name: string) => void
}

interface OptionList {
  icon: string
  name: string
  show: boolean
  url?: string
  submenu?: Array<SubMenuOption>
}

interface SubMenuOption {
  icon: JSX.Element
  name: string
  url?: string
  submenu?: Array<SubSubMenuOptions>
}

interface SubSubMenuOptions {
  icon: JSX.Element
  name: string
  url: string
}

export interface IAlert {
  icon: string
  message: string
  title: string
  show: boolean
}
