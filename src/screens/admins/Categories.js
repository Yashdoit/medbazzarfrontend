import { useState } from "react";
import { Button, Grid, TextField, Avatar } from "@mui/material";
import { useStyles } from "./CategoriesCss";
import TitleComponent from "../../components/admins/TitleComponent";
import { postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";

export default function Categories(props)
{   var classes=useStyles()

    const [category,setCategory]=useState('')
    const [picture,setPicture]=useState({file:'cap.png',bytes:''})
    const [error,setError]=useState({})
    const handlePicture=(event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }


    const handleSubmit=async()=>{
        var submit = true
        if(category.length==0)
        {
            handleError('category','Pls Input Category Name...')
            submit = false
        }
        if(picture.bytes.length==0)
        {
            handleError('picture','Pls Choose Icon...')
            submit = false
        }
        if(submit)
        {
            var formData = new FormData()
            formData.append('categoryname',category)
            formData.append('picture',picture.bytes)
            var result = await postData('category/submit_category',formData)
            console.log(result)
            if(result.status)
            {
                Swal.fire({
                    icon: 'Success',
                    title: result.message,
                    timer: 1500
                })
            }
            else
            {
                Swal.fire({
                    icon: 'Error',
                    title: result.message,
                    timer: 1500
                })
            }
        }
    }


    const handleReset=async()=>{
        setCategory('')
        setPicture({file:'cap.png',bytes:''})
    }





    return(<div className={classes.root}>
        <div className={classes.box}>
        <Grid container spacing={3}>

            <Grid item xs={12} >
                <TitleComponent title='Add New Category' logo listicon="icon.png" page="/admindashboard/displayallcategory" />
            </Grid>

            <Grid item xs={12} >
                <TextField value={category} onFocus={()=>handleError('category',null)} error={error.category} helperText={<span style={{fontFamily:'kanit'}}>{error.category}</span>} onChange={(event)=>setCategory(event.target.value)} label="Category Name" fullWidth />
            </Grid>

            <Grid item xs={6} >
                <Button variant="contained" component="label" fullWidth >
                    Upload
                    <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple />
                </Button>
                {error.picture?<span style={{fontSize:11, marginLeft:'5%', color:'#d32f2f'}}>{error.picture}</span>:<></>}
            </Grid>

            <Grid item xs={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}} >
                <Avatar alt="Image" src={picture.file} variant="rounded" style={{width:40}}  />
            </Grid>

            <Grid item xs={6} >
                <Button onClick={handleSubmit} variant="contained" fullWidth >
                    SUBMIT                    
                </Button>
            </Grid>

            <Grid item xs={6} >
                <Button onClick={handleReset} variant="contained" fullWidth >
                    RESET
                </Button>
            </Grid>










        </Grid>

        </div>

    </div>)
}
