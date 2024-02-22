
import { useState } from "react"

export default function AddCarts()
{
    const [value,setValue]=useState(1)

    const handlePlus=()=>{
        setValue((prev)=>prev+1)
    }

    const handleMinus=()=>{
        setValue((prev)=>prev-1)
    }

    return(<div style={{display:'flex'}} >
        
            <div style={{display:'flex',justifyContent:'space-evenly',color:'#00391c',width:100,height:27,borderRadius:4,background:'#fff',border:'solid 1px #00391c'}} >
                <span onClick={handleMinus} style={{fontSize:16,fontWeight:'bold',cursor:'pointer'}} >-</span>
                <span style={{fontSize:16,fontWeight:'bold'}} >{value}</span>
                <span onClick={handlePlus} style={{fontSize:16,fontWeight:'bold',cursor:'pointer'}} >+</span>
            </div>
    </div>)
}