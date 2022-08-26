import React from 'react'
import Chart from 'react-apexcharts'

const BarChartAnalyze = () => {
  return (
    <div>
      <div>
      <Chart
      type="bar"
      width={1100}
      height={500}

      series={[{
        name: "Expenses",
        data: [5000,3000,4000,2000]
        
      }]}
      options={{
        title:{text:"Monthly Expense Chart",style:{fontSize:25}},
        colors: ['#0C090A'],
        theme:{mode:'light'},
        xaxis:{
          labels:{style:{fontSize:17}},
          categories: ["August","September","October","November"],
          title:{text:'Month',style:{fontSize:25}}
        },
        yaxis:{
          labels:{formatter:(val)=>{return `₹${val}`},style:{fontSize:17}},
          title:{text:'Expenses',style:{fontSize:25}}
        },
        dataLabels:{
          formatter:(val)=>{return `₹${val}`}
        }
        
      }}
      
      >

      </Chart>
    </div>
    </div>
  )
}

export default BarChartAnalyze
