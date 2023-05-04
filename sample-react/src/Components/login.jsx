import {useState,useEffect} from 'react'
import axios from "axios";
function login() {

    useEffect(()=>{
        console.log('sdsdsdsd');
        axios.get('http://localhost:8000/login').then((req)=>{
          
        })
    })

  return (
        <div>
          <h1>dddd</h1>
        </div>
  )
}

export default login
