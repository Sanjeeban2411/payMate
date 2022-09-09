import React,{useEffect,useState} from 'react'
import jwt_decode from 'jwt-decode'

const Googlelogin = () => {

    const[ user, setUser] = useState({})

    function handleCallbackResponse(response){
        console.log("jwt:"+response.credential)
        var userobj=jwt_decode(response.credential)
        console.log("data:",userobj)
        setUser(userobj)
        document.getElementById("signInDiv").hidden = true
    }

    useEffect(()=>{
        google.accounts.id.initialize({
            client_id: "173408333561-klfrlhhu2reqfmutuslfvh6g3d3i1p7f.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })
        google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            {theme: "outline", size: "large"}
            )
            google.accounts.id.prompt()
    },[]);



  return (
    <div>
      <div id="signInDiv"></div>
      {
        user &&
        <div className='text-center items-center'>
            <img src={user.picture} className='mx-auto'/>
            <h2>{user.name}</h2>
        </div>
      }
    </div>
  )
}

export default Googlelogin
