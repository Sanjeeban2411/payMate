import React from 'react'
import Navbar from '../components/Navbar'
// import axios from 'axios'
export default function Home() {
    // const [data, setdata] = useState("");
    // const x = localStorage.getItem("jwt_token")
    // console.log(x)
    // console.log("aaa", data)
    // useEffect(() => {
    //     axios({
    //         method: 'get',
    //         url: '/test',
    //         headers: {
    //             'Authorization': `Bearer ${x}`
    //         }
    //     })
    //         .then((response) => {
    //             setdata(response.data)
    //             console.log("16", response.data)
    //         })
    //         .catch(error => console.log(error))

    // }, []);
    

    return (
        <div>
            <Navbar/>
            {/* <h1>{data.email}</h1> */}
        </div>
    )
}
