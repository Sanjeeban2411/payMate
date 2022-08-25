import React from 'react'
import Chart from 'react-apexcharts'

const BarChart = () => {
  return (
    <div>
      <Chart
      type="bar"
      width={600}
      height={300}

      series={[{
        name: "Expenses",
        data: [2234,3456,4567,6789,2645]
        
      }]}
      options={{
        title:{text:"Expense Chart",style:{fontSize:25}},
        colors: ['#0C090A'],
        theme:{mode:'light'},
        xaxis:{
          categories:["harsh","dhaivat","kush","sanjeeban","depreeth"],
          title:{text:'Members',style:{fontSize:20}}
        },
        yaxis:{
          labels:{formatter:(val)=>{return `₹${val}`},style:{fontSize:15}},
          title:{text:'Expenses',style:{fontSize:20}}
        },
        dataLabels:{
          formatter:(val)=>{return `₹${val}`}
        }
        
      }}
      
      >

      </Chart>
    </div>
  )
}

export default BarChart