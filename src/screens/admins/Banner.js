import { useStyles } from "./CategoriesCss";
import { Grid, TextField, Avatar, Button } from "@mui/material";
import TitleComponent from "../../components/admins/TitleComponent";
import { useState, useEffect } from "react";
import { getData, postData } from "../../services/FetchNodeServices";
import { InputLabel,FormControl,Select,MenuItem } from "@mui/material"
import Swal from "sweetalert2";


export default function Banner(){
    var classes=useStyles()


    const [bannerType,setBannerType]=useState('')
    const [brandid,setBrandId]=useState('')
    const [picture,setPicture]=useState([])
    const [error,setError]=useState({})
    const [brandList,setBrandList]=useState([])



    const fetchAllBrand=async()=>{
        var result = await getData("brands/display_all_brands")
        if(result.status)
        {
            setBrandList(result.data)
        }
    }
    useEffect(function(){fetchAllBrand()},[])

    const fillAllBrand=()=>{
        return brandList.map((item)=>{

            return <MenuItem value={item.brandid} > {item.brandname} </MenuItem>

        })
        
    }


    const handlePicture=(event)=>{
        if(Object.values(event.target.files).length<=3)
        {
            alert("PLZ UPLOAD 3 OR MORE PICS")
        }
        else
        {
            
            setPicture({file:Object.values(event.target.files),bytes:event.target.files})
        }
    }


    const showImages=()=>{
        return picture?.file?.map((item)=>{
            return(<div><Avatar alt="image" style={{margin:2}} src={URL.createObjectURL(item)} fullWidth /></div>)
        })
    }



    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }


    const handleSubmit=async()=>{
        var submit = true
        if(bannerType.length==0)
        {
            handleError("bannerType","Plz select banner type....")
            submit = false
        }
        if(brandid.length==0)
        {
            handleError("brandid","Plz select brand....")
            submit = false
        }
        if(picture.bytes.length==0)
        {
            handleError('picture','pls choose icon...')
            submit = false
        }
        if(submit)
        {
            var formData =new FormData()
            formData.append('bannertype',bannerType)
            formData.append('brandid',brandid)
            picture.file.map((item,i)=>{
                formData.append('picture'+i,item)
            })       
            var result = await postData("banner/submit_banner",formData)
            console.log(result)
            if(result.status)
            {
                Swal.fire({
                    icon: 'success',
                    title: result.message,
                    timer: 1500,
                    toast: true
                })
            }
            else
            {
                Swal.fire({
                    icon: 'error',
                    title: result.message,
                    timer: 1500,
                    toast: true
                })
            }
        }
    }


    const handleReset=()=>{
        setBannerType('')
        setBrandId('')
        setPicture({file:[]})
    }







    return(<div className={classes.root} >
        <div className={classes.box} >


        <Grid container spacing={3} >


            <Grid item xs={12} >
                <TitleComponent title='Banner' logo />
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth >

                    <InputLabel>Banner Type</InputLabel>
                    <Select label="Banner Type" value={bannerType} onFocus={()=>handleError('bannerType',null)} error={error.bannerType} onChange={(event)=>setBannerType(event.target.value)}  >
                        <MenuItem value="General" >General</MenuItem>
                        <MenuItem value="Brand" >Brand</MenuItem>
                        <MenuItem value="Trending" >Trending</MenuItem>
                        <MenuItem value="Latest" >Latest</MenuItem>
                        <MenuItem value="Popular" >Popular</MenuItem>
                    </Select>
                    {error.bannerType?<span style={{fontSize:11, marginLeft:'2%', color:'#d32f2f'}} >{error.bannerType}</span>:<></>}

                </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth >

                    <InputLabel>Brand</InputLabel>
                    <Select label="Brand" value={brandid} onFocus={()=>handleError('brandid',null)} error={error.brandid} onChange={(event)=>setBrandId(event.target.value)} >
                        {bannerType === 'Brand' ? (
                            fillAllBrand()
                        ):(
                            <MenuItem value={0}>-None-</MenuItem>
                        )}
                        
                    </Select>
                    {error.brandid?<span style={{fontSize:11, marginLeft:'2%', color:'#d32f2f'}} >{error.brandid}</span>:<></>}
                </FormControl>
            </Grid>

            <Grid item xs={6} >
                <Button variant="contained" component="label" fullWidth >
                    Upload
                    <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple />
                </Button>
                {error.picture?<span style={{fontSize:12, marginLeft:'5%', color:'#d32f2f'}} >{error.picture}</span>:<></>}
            </Grid>

            <Grid item xs={6} style={{display:'flex',justifyContent:'center'}}  >
                {showImages()}
            </Grid>

            <Grid item xs={6} >
                <Button onClick={handleSubmit} variant="contained" fullWidth >Submit</Button>
            </Grid>

            <Grid item xs={6}>
                <Button onClick={handleReset} variant="contained" fullWidth>Reset</Button>
            </Grid>


        </Grid>


        </div>
    </div>

    )



}