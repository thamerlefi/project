import React from 'react'
import { Chart } from "react-google-charts";

export default function CategChart() {
     const data = [
        ["Task", "Hours per Day"],
        ["Laptop", 11],
        ["Phone", 2],
        ["Camera", 2],
        ["Accessories", 2]
      ];
      
       const options = {
        title: "Selling By Categories",
        pieHole: 0.4,
        is3D: false,
      };
  return (
    <div style={{width:"100%"}} className='p-0'>
      <Chart
      chartType="PieChart"
       width="100%"
       height="250px"
      data={data}
      options={options}
    />
    </div>
  )
}
