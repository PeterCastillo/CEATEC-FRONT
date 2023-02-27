"use client"

import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import style from './Scalastats.module.scss'
import { IScalastats } from '../../../../interfaces/componentsInterfaces'
import { FC } from "react"


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
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
      text: 'Chart.js Line Chart',
    },
  },
}


export const Scalastats: FC<IScalastats> = ({ scala }) => {
    const data = {
    labels: scala.info.map(item => item.name),
    datasets: [
        {
        fill: true,
        label: scala.label,
        data: scala.info.map(item => item.cantidad),
        borderColor: scala.borderColor,
        backgroundColor: scala.backgroundColor,
        },
    ],
}
  return (
    <div className={style.data}>
        <Line options={options} data={data} />
    </div>
  )
}
