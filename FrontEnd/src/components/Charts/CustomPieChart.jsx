import React from 'react'
import { Pie, PieChart, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import CustomLegend from './CustomLegend'
import CustomTooltip from "./CustomTooltip"


const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
  console.log()
  return (
   <ResponsiveContainer width="100%" height={380}>
  <PieChart>
    <Pie
      data={data}
      dataKey='amount'
      nameKey='name'
      cx="50%"
      cy="50%"
      outerRadius={130}
      innerRadius={100}
      labelLine={false}
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
      ))}
    </Pie>

    <Tooltip content={<CustomTooltip />} />
    <Legend content={<CustomLegend />} />

    {showTextAnchor && (
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="16"
        fill="#333"
      >
        <tspan x="50%" dy="-1.8em" fontSize="14" fill="#666">{label}</tspan>
        <tspan x="50%" dy="1.1em" fontSize="24" fontWeight="bold">{totalAmount}</tspan>
      </text>
    )}
  </PieChart>
</ResponsiveContainer>

  )
}

export default CustomPieChart
