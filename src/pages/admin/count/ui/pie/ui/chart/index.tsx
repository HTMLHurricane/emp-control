/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
ChartJS.register(ArcElement, Tooltip, Legend)

const cardClasses =
  'flex flex-1 lg:py-3.5 max-lg:py-2 flex-col lg:gap-5 max-lg:gap-3 border-solid border-x-0 border-b-0 text-center max-lg:w-full'
const cardTextClasses = 'text-gray-400 lg:text-base max-lg:text-sm'

export const PieChart = ({
  data,
  day,
  count,
}: {
  count: [number, number]
  day: string
  data: number[]
}) => {
  const rawData = data

  const total = rawData.reduce((acc, value) => acc + value, 0)
  const percentages = rawData.map((value) => ((value / total) * 100).toFixed(2) + '%')
  const labels = ['Мужчины', 'Женщины']

  const datasets = {
    labels,
    datasets: [
      {
        data: rawData,
        backgroundColor: ['rgb(66, 134, 244)', 'rgb(255, 105, 180)'],
        borderColor: ['rgb(66, 134, 244)', 'rgb(255, 105, 180)'],
        hoverOffset: 4,
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const labelIndex = context.dataIndex
            const label = labels[labelIndex]
            return `${label}: ${percentages[labelIndex]}`
          },
        },
      },
      title: {
        display: true,
        text: `Статистика за ${day}`,
        padding: {
          bottom: 35,
        },
        font: {
          size: 14,
        },
      },
    },
  }

  return (
    <div className="bg-white flex relative items-center flex-col shadow-lg justify-between gap-8 w-full pb-40">
      <Pie
        data={datasets}
        options={options}
        style={{ width: '100%', maxHeight: '275px', zIndex: '1' }}
      />
      <div className="flex items-center justify-center w-full max-lg:flex-col absolute bottom-0">
        <div style={{ color: 'rgb(66, 134, 244)' }} className={cardClasses}>
          <span className="text-slate-950">{count[0]}</span>
          <span className={cardTextClasses}>Мужчины</span>
        </div>
        <div style={{ color: 'rgb(255, 105, 180)' }} className={cardClasses}>
          <span className="text-slate-950">{count[1]}</span>
          <span className={cardTextClasses}>Женщины</span>
        </div>
      </div>
    </div>
  )
}
