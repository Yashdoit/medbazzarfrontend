import { useEffect, useState } from "react"
import TitleComponent from "../../components/admins/TitleComponent"
import { useStyles } from "./CategoriesCss"
import { Grid,Button,TextField,Avatar } from "@mui/material"
import { InputLabel,FormControl,Select,MenuItem } from "@mui/material"
import { getData, postData } from "../../services/FetchNodeServices"
import Swal from "sweetalert2"

export default function SubCategory()
{
    var classes = useStyles() 

    const [categoryId,setCategoryId]=useState('')
    const [subCategory,setSubCategory]=useState('')
    const [icon,setIcon]=useState({file:'cap.png',bytes:''})
    const [error,setError]=useState({})
    const [categoryList,setCategoryList]=useState([])
    const fetchAllCategory=async()=>{
        var result = await getData("category/display_all_category")
        if(result.status)
        {
            setCategoryList(result.data)
        }
    }
    useEffect(function(){fetchAllCategory()},[])


    const fillAllCategory=()=>{
        return categoryList.map((item)=>{

            return <MenuItem value={item.categoryid} > {item.categoryname} </MenuItem>

        })
    }



    const handleIcon=(event)=>{
        setIcon({file:URL.createObjectURL(event.target.files[0]), bytes:event.target.files[0]})
    }

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }


    const handleSubmit=async()=>{
        var submit = true
        if(categoryId.length == 0)
        {
            handleError('categoryId','Plz Select Category....')
            submit = false
        }
        if(subCategory.length == 0)
        {
            handleError('subCategory','Plz Input Subcategory Name....')
            submit = false
        }
        if(icon.bytes.length == 0)
        {
            handleError('icon','Plz Choose Icon...')
            submit = false
        }
        if(submit)
        {
            var formData = new FormData()
            formData.append('categoryid',categoryId)
            formData.append('subcategoryname',subCategory)
            formData.append('icon',icon.bytes)
            var result = await postData("subcategory/submit_subcategory",formData)
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
        setCategoryId('')
        setSubCategory('')
        setIcon({file:'cap.png',bytes:''})
    }





    return(<div className={classes.root} >
        <div className={classes.boxsubmit} >

            <Grid container spacing={3}>

                <Grid item xs={12} >
                    <TitleComponent logo title="Sub Category" listicon="icon.png" page="/admindashboard/displayallsubcategory" />
                </Grid>

                <Grid item xs={12} >
                    <FormControl fullWidth>

                        <InputLabel>Category</InputLabel>

                        <Select
                        value={categoryId}  label="Category" onFocus={()=>handleError('categoryId',null)} error={error.categoryId} onChange={(event)=>setCategoryId(event.target.value)} >
                            {fillAllCategory()}
                        </Select>
                        {error.categoryId?<span style={{fontSize:11, marginLeft:'2%', color:'#d32f2f'}} >{error.categoryId}</span>:<></>}

                    </FormControl>
                </Grid>

                <Grid item xs={12} >
                    <TextField value={subCategory} onFocus={()=>handleError('subCategory',null)} error={error.subCategory} helperText={<span style={{fontSize:11, color:'#d32f2f'}} >{error.subCategory}</span>} onChange={(event)=>setSubCategory(event.target.value)} label="Sub Category Name" fullWidth />
                </Grid>

                <Grid item xs={6} >
                    <Button variant="contained" component="label" fullWidth >
                        Upload
                        <input onClick={()=>handleError('icon',null)} onChange={handleIcon} type="file" hidden accept="images/*" multiple />
                    </Button>
                    {error.icon?<span style={{fontSize:11, marginLeft:'5%', color:'#d32f2f'}} >{error.icon}</span>:<></>}
                </Grid>

                <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                    <Avatar alt="Image" src={icon.file} />
                </Grid>

                <Grid item xs={6} >
                    <Button onClick={handleSubmit} variant="contained" fullWidth >
                        Submit
                    </Button>
                </Grid>

                <Grid item xs={6} >
                    <Button onClick={handleReset} variant="contained" fullWidth >
                        Reset
                    </Button>
                </Grid>

            </Grid>

















        </div>
    </div>)
}