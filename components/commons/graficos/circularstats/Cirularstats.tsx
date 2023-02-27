"use client"
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import style from './Circularstats.module.scss'
import { FC } from "react"
import { ICircularStats } from "@/interfaces/componentsInterfaces"

ChartJS.register(ArcElement, Tooltip, Legend)

export const Circularstats: FC<ICircularStats> = ({ circular }) => {
  const data = {
    labels: circular.data.map(item => item.label),
    datasets: [
      {
        label: circular.label,
        data: circular.data.map(item => item.valor),
        backgroundColor: circular.data.map(item => item.backgroundColor),
        borderColor: circular.data.map(item => item.borderColor),
        borderWidth: circular.borderWidth,
      },
    ],
  }

  return (
    <div className={style.data}>
      <Doughnut data={data} />
    </div>
  )
}