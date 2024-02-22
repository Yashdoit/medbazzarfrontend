import { Button,IconButton } from "@mui/material"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useState } from "react"

export default function PlusMinusComponent()
{
    const [value,setValue]=useState(0)

    const handlePlus=()=>{
        setValue((prev)=>prev+1)
    }

    const handleMinus=()=>{
        setValue((prev)=>prev-1)
    }

    return(<div style={{display:'flex'}} >
        {value==0?
        <IconButton onClick={handlePlus} color="primary" aria-label="add to shopping cart">
                    <Button
                      variant="text"
                      endIcon={<AddShoppingCartIcon />}
                      size='small'
                    >
                      ADD
                    </Button>
        </IconButton>:
            <div style={{display:'flex',justifyContent:'space-evenly',background:'#00391c',width:100,height:27,borderRadius:4,color:'#fff'}} >
                <span onClick={handleMinus} style={{fontSize:16,fontWeight:'bold',cursor:'pointer'}} >-</span>
                <span style={{fontSize:16,fontWeight:'bold'}} >{value}</span>
                <span onClick={handlePlus} style={{fontSize:16,fontWeight:'bold',cursor:'pointer'}} >+</span>
            </div>}
    </div>)
}