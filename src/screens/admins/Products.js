import { useStyles } from "./CategoriesCss";
import { Grid, TextField, Button, Avatar } from "@mui/material";
import TitleComponent from "../../components/admins/TitleComponent";
import { useState,useEffect } from "react";
import { getData,postData } from "../../services/FetchNodeServices";
import { InputLabel,FormControl,Select,MenuItem } from "@mui/material"
import Swal from "sweetalert2";







export default function Products(){
    var classes = useStyles()

    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [brandId,setBrandId]=useState('')
    const [product,setProduct]=useState('')
    const [description,setDescription]=useState('')
    const [picture,setPicture]=useState({file:'cap.png',bytes:''})
    const [error,setError]=useState({})
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [brandList,setBrandList]=useState([])


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




    const fetchAllSubCategory=async(cid)=>{
        var result = await postData("subcategory/fetch_all_subcategory_by_categoryid",{categoryid:cid})
        if(result.status)
        {        
            setSubCategoryList(result.data)
        }

    }
    useEffect(function(){fetchAllSubCategory()},[])

    const fillAllSubCategory=()=>{
        return subCategoryList.map((item)=>{

            return <MenuItem value={item.subcategoryid} > {item.subcategoryname} </MenuItem>

        })
    }


    const handleChangeCategory=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value)        
    }




    


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
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }

    const handleSubmit=async()=>{
        var submit = true
        if(product.length==0)
        {
            handleError("product","Plz input product name....")
            submit = false
        }
        if(description.length==0)
        {
            handleError("description","Plz input product description....")
            submit = false
        }
        if(picture.bytes.length==0)
        {
            handleError("picture","Plz Choose Picture....")
            submit = false
        }
        if(categoryId.length==0)
        {
            handleError("categoryId","Plz input category name....")
            submit = false
        }
        if(subCategoryId.length==0)
        {
            handleError("subCategoryId","Plz input Subcategory name....")
            submit = false
        }
        if(brandId.length==0)
        {
            handleError("brandId","Plz input Brand name....")
            submit = false
        }
        if(submit)
        {
            var formData =new FormData()
            formData.append('productname',product)
            formData.append('description',description)
            formData.append('picture',picture.bytes)
            formData.append('categoryid',categoryId)
            formData.append('subcategoryid',subCategoryId)
            formData.append('brandid',brandId)
            var result = await postData("products/submit_products",formData)
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
        setProduct('')
        setBrandId('')
        setCategoryId('')
        setDescription('')
        setSubCategoryId('')
        setPicture({file:'cap.png',bytes:''})
    }















    return(<div className={classes.root} >
        <div className={classes.boxsubmit} >

            <Grid container spacing={3} >


                <Grid item xs={12} >
                    <TitleComponent logo title="Products" listicon="icon.png" page="/admindashboard/displayallproducts"  />
                </Grid>

                <Grid item xs={4} >
                    <FormControl fullWidth >

                        <InputLabel>Category</InputLabel>
                        <Select
                        label="Category" value={categoryId} onFocus={()=>handleError('categoryId',null)} error={error.categoryId} onChange={handleChangeCategory}  >
                        {fillAllCategory()}
                        </Select>
                        {error.categoryId?<span style={{fontSize:12, marginLeft:'5%', color:'#d32f2f'}} >{error.categoryId}</span>:<></>}

                    </FormControl>
                </Grid>

                <Grid item xs={4} >
                    <FormControl fullWidth>

                        <InputLabel>SubCategory</InputLabel>

                        <Select
                        value={subCategoryId}  label="SubCategory" onFocus={()=>handleError('subCategoryId',null)} error={error.subCategoryId} onChange={(event)=>setSubCategoryId(event.target.value)} >
                        {fillAllSubCategory()}
                        </Select>
                        {error.subCategoryId?<span style={{fontSize:11, marginLeft:'2%', color:'#d32f2f'}} >{error.subCategoryId}</span>:<></>}

                    </FormControl>
                </Grid>

                <Grid item xs={4} >
                    <FormControl fullWidth >

                        <InputLabel>Brand</InputLabel>
                        <Select
                        label="Brand" value={brandId} onFocus={()=>handleError('brandId',null)} error={error.brandId} onChange={(event)=>setBrandId(event.target.value)} >
                        {fillAllBrand()}
                        </Select>
                        {error.brandId?<span style={{fontSize:12, marginLeft:'2.5%', color:'#d32f2f'}} >{error.brandId}</span>:<></>}

                    </FormControl>
                </Grid>

                

                <Grid item xs={12} >
                    <TextField value={product} onFocus={()=>handleError('product',null)} error={error.product} helperText={error.product} onChange={(event)=>setProduct(event.target.value)} label="Product Name" fullWidth />
                </Grid>

                <Grid item xs={12} >
                    <TextField value={description} onFocus={()=>handleError('description',null)} error={error.description} helperText={error.description} onChange={(event)=>setDescription(event.target.value)} label="Product Description" fullWidth />
                </Grid>

                <Grid item xs={6} >
                    <Button variant="contained" component="label" fullWidth >
                        Upload
                        <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple />
                    </Button>
                    {error.picture?<span style={{fontSize:12, marginLeft:'5%', color:'#d32f2f'}} >{error.picture}</span>:<></>}
                </Grid>

                <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                    <Avatar alt="Images" src={picture.file} fullWidth />
                </Grid>

                <Grid item xs={6} >
                    <Button onClick={handleSubmit} variant="contained" fullWidth >Submit</Button>
                </Grid>

                <Grid item xs={6} >
                    <Button onClick={handleReset} variant="contained" fullWidth >Reset</Button>
                </Grid>

            </Grid>

        </div>
    </div>)
}