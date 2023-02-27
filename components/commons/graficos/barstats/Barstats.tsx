"use client"

import style from "./Barstats.module.scss"
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { IBarstats } from "../../../../interfaces/componentsInterfaces"
import { FC } from "react"


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
}

export const Barstats: FC<IBarstats> = ({ bar }) => {
  const data = {
    labels: bar.labels,
    datasets: bar.datasets,
  }

  return (
    <div className={style.data}>
      <Bar options={options} data={data} />
    </div>
  )
}
