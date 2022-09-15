import React,{useEffect,useState} from 'react'
import Chart from 'react-apexcharts'
import axios, { Axios } from "axios";

const BarChartAnalyze = () => {

  const [purpose, setpurpose] = useState();
  const [amount, setamount] = useState();

  const [data, setdata] = useState("");
  const [expenseData, setExpenseData] = useState("");
  const [allExpenses, setAllExpenses] = useState([]);

  const x = localStorage.getItem("jwt_token");
  // console.log(x)
  // console.log("aaa", allExpenses);
  useEffect(() => {
    axios({
      method: "get",
      url: "/user",
      headers: {
        Authorization: `Bearer ${x}`,
      },
    })
      .then((response) => {
        console.log("done");
        // console.log(response)
        setdata(response.data);
        // console.log("16", response.data)
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: "/getexpenses",
      headers: {
        Authorization: `Bearer ${x}`,
      },
    })
      .then((response) => {
        setAllExpenses(response.data);
        console.log("paisa", response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const addExpense = (e) => {
    e.preventDefault();
    setExpenseData({
      purpose: purpose,
      amount: amount,
    });

    axios({
      method: "post",
      url: "/addexpense",
      data: expenseData,
      headers: {
        Authorization: `Bearer ${x}`,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };


  function monthname(num) {
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return months[num-1];
    }
  const date=allExpenses.map((totl)=>{
    return(
      monthname(totl.updatedAt.slice(6,7))
    );
   })
  //  console.log("date",date)
  // date[3]="September"
  // date[4]="September"
  // date[5]="September"
  // date[6]="September"
  // date[7]="October"
   console.log("month",date)

   let analyze=allExpenses

  if(analyze.length>0){
    for(let i=0;i<analyze.length;i++){
      analyze[i].createdAt=date[i];
      
   }
   console.log("arr",analyze)
  }

   console.log("analyze",analyze)

   function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  const Month=date.filter(onlyUnique)
  console.log("data",Month)

  // let tamt=([])
  let sum
  let kharcha = []
  if(analyze.length>0){
  sum=analyze[0].amount
  console.log("amt",analyze[0].createdAt)
  for(let i=0;i<analyze.length-1;i++){
    console.log("test",analyze[i].createdAt,analyze[i].amount)
    console.log("test",analyze[i+1].createdAt,analyze[i+1].amount)
    if(analyze[i].createdAt===analyze[i+1].createdAt){
      sum=sum+analyze[i+1].amount
    }
    else{
      kharcha.push(sum)
      sum = analyze[i+1].amount
      // kharcha.push(sum)
    }
  }
  kharcha.push(sum)
}
  console.log("sm",sum)
  console.log("y axis",kharcha)

  return (
    <div>
      <div>
      <Chart
      type="bar"
      width={700}
      height={300}

      series={[{
        name: "Expenses",
        data: kharcha
        
      }]}
      options={{
        title:{text:"",style:{fontSize:25}},
        colors: ['#0C090A'],
        theme:{mode:'light'},
        xaxis:{
          labels:{style:{fontSize:17}},
          categories: Month,
          title:{text:'',style:{fontSize:25}}
        },
        yaxis:{
          labels:{formatter:(val)=>{return `₹${val}`},style:{fontSize:17}},
          title:{text:'',style:{fontSize:25}}
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
