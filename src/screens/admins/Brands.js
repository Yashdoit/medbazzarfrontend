import { useState } from "react";
import { Grid, Button, TextField, Avatar } from "@mui/material";
import { useStyles } from "./CategoriesCss";
import TitleComponent from "../../components/admins/TitleComponent";
import Swal from "sweetalert2";
import { postData } from "../../services/FetchNodeServices";

export default function Brands()
{var classes = useStyles()

    const [brands,setBrands]=useState('')
    const [brandicon,setBrandIcon]=useState({file:'cap.png',bytes:''})
    const [error,setError]=useState({})


    const handleBrandIcon=(event)=>{
        setBrandIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }

    const handleReset=async()=>{
        setBrands('')
        setBrandIcon({file:'cap.png',bytes:''})
    }

    const handleSubmit=async()=>{
        var submit = true
        if(brands.length==0)
        {
            handleError("brands", "Plz Input Brand Name")
            submit = false
        }
        if(brandicon.bytes.length==0)
        {
            handleError("brandicon", "Plz Choose Brand Icon")
            submit = false
        }
        if(submit)
        {
            var formData = new FormData()
            formData.append('brandname',brands)
            formData.append('brandicon',brandicon.bytes)
            var result = await postData('brands/submit_brands',formData)
            console.log(result)
            if(result.status)
            {
                Swal.fire({
                    icon: 'Success',
                    title: result.message,
                    timer: 1500,
                    toast: true
                })
            }
            else
            {
                Swal.fire({
                    icon: 'Error',
                    title: result.message,
                    timer: 1500,
                    toast: true
                })
            }
        }
    }



    return(<div className={classes.root}>
        <div className={classes.boxsubmit}>
            <Grid container spacing={3}>


                <Grid item xs={12} >
                    <TitleComponent logo title='Add New Brands' listicon="icon.png" page="/admindashboard/displayallbrands" />
                </Grid>

                <Grid item xs={12} >
                    <TextField value={brands} onFocus={()=>handleError('brands',null)} error={error.brands} helperText={<span style={{fontFamily:'kanit'}}>{error.brands}</span>} onChange={(event)=>setBrands(event.target.value)} label='Brand Name' fullWidth/>
                </Grid>

                <Grid item xs={6} >
                    <Button variant="contained" component='label' fullWidth >
                        UPLOAD
                        <input onClick={()=>handleError('brandicon',null)} onChange={handleBrandIcon} type="file" hidden accept="images/*" multiple />
                    </Button>
                        {error.brandicon?<span style={{fontSize:11, marginLeft:'5%', color:'#d32f2f'}}>{error.brandicon}</span>:<></>}
                </Grid>

                <Grid item xs={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}} >
                    <Avatar alt="Image" src={brandicon.file} variant="rounded" style={{width:50,height:50}}  />
                </Grid>

                <Grid item xs={6}>
                    <Button onClick={handleSubmit} variant="contained" component='label' fullWidth >
                        SUBMIT
                    </Button>
                </Grid>

                <Grid item xs={6}>
                    <Button onClick={handleReset} variant="contained" component='label' fullWidth >
                        RESET
                    </Button>
                </Grid>


            </Grid>
        </div>
    </div>

    )
}
