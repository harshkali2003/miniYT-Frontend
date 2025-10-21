import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import '../Styles/Contact.css'

function ContactPage() {
    const[name , setName] = useState("")
    const[email , setEmail] = useState("")
    const[query , setQuery] = useState("")
    const navigate = useNavigate()
    const handleSubmit = async (e)=>{
        e.preventDefault()
        let data = await fetch('https://miniyt-backend.onrender.com/contact/create' , {
            method : "POST",
            body : JSON.stringify({name , email , query}),
            headers : {'Content-Type' : 'application/json'}
        })
        data = await data.json()
        if(data.message === "success"){
            toast.success("Form submitted successfully")
            navigate('/')
        }
        else{
            toast.error("something went wrong")
        }
    }
  return (
    <>
     <div className="containerContact">
    <div className="boxContact1">
        <div>
            <p>
                Contact Us
            </p>
        </div>
    </div>
    <div className="boxContact2">
    <form onSubmit={handleSubmit}>
    <input type="text" placeholder='Your Name' value={name} onChange={(e)=> setName(e.target.value)}/>
    <input type="email" placeholder='Your Email' value={email} onChange={(e)=> setEmail(e.target.value)}/>
    <input type="text-area" placeholder='Your Query' value={query} onChange={(e)=> setQuery(e.target.value)}/>
    <button type='submit'>submit</button>    
    </form>    
    </div>    
    </div> 
    </>
  )
}

export default ContactPage
