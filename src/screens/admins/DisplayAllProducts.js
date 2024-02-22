import MaterialTable from "@material-table/core";
import { useStyles } from "./CategoriesCss";
import { useState,useEffect } from "react";
import { postData,getData,serverURL } from "../../services/FetchNodeServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { Grid,Button,TextField,Avatar } from "@mui/material";
import TitleComponent from "../../components/admins/TitleComponent";
import { InputLabel,FormControl,Select,MenuItem } from "@mui/material"
import { useNavigate } from "react-router-dom";

export default function DisplayAllProducts(){
    var classes = useStyles()
    var navigate = useNavigate()
    const [productData,setProductData]=useState([])
    const [categoryId,setCategoryId]=useState('')
    const [open,setOpen]=useState(false)
    const [subCategoryId,setSubCategoryId]=useState('')
    const [brandId,setBrandId]=useState('')
    const [product,setProduct]=useState('')
    const [productId,setProductID]=useState('')
    const [description,setDescription]=useState('')
    const [picture,setPicture]=useState({file:'cap.png',bytes:''})
    const [error,setError]=useState({})
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [brandList,setBrandList]=useState([])
    const [showBtn,setShowBtn]=useState(false)
    const [tempProductsPicture,setTempProductsPicture]=useState('')


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
        setShowBtn(true)
    }

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }
    

    const fetchAllProducts=async()=>{
        var result = await getData("products/display_all_products")
        if(result.status)
        {
            setProductData(result.data)
        }
    }
    useEffect(function(){
        fetchAllProducts()
   },[])


   const handleClose=()=>{
        setOpen(false)
    }


    const handleOpen=(rowData)=>{
        setOpen(true)
        fetchAllSubCategory(rowData.categoryid)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setBrandId(rowData.brandid)
        setProductID(rowData.productid)
        setProduct(rowData.productname)
        setDescription(rowData.description)
        setTempProductsPicture(`${serverURL}/images/${rowData.picture}`)
        setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
  
    }

    const handleCancel=()=>{
        setShowBtn(false)
        setPicture({file:tempProductsPicture,bytes:''})
    }

    const handleEditProducts=async()=>{
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
            var body = {categoryid:categoryId, subcategoryid:subCategoryId, brandid:brandId, productid:productId, productname:product, description:description }
            var result = await postData("products/edit_products",body)
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
            fetchAllProducts()
        }
    }



    const handleProductsPicture=async()=>{
        var formData = new FormData()
        formData.append('productid',productId)
        formData.append('picture',picture.bytes)
        var result = await postData("products/edit_products_picture",formData)
        setShowBtn(false)
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
        fetchAllProducts()
    }


    const handleDeleteProducts=async(rowData)=>{
        Swal.fire({
            title: "Do you want to Delete Product?",
            showDenyButton: true,
            showCancelButton: true,
            toast: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't Delete`
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                var body = {productid:rowData.productid}
                var result = await postData("products/delete_products",body)
                if(result.status)
                Swal.fire({toast:true,title:"Deleted!", icon:"success"});
                else
                Swal.fire({toast:true,title:"Cancel!", icon:"info"});
                } else if (result.isDenied) {
                Swal.fire({toast:true,title:"Your Record Is Safe!", icon:"info"});
            }
            fetchAllProducts()
          });
    }



   const showProductsForm=()=>{
    return(
        <Dialog open={open} onClose={handleClose} maxWidth="md" >
            <DialogContent>
            <div className={classes.boxsubmit} >

                <Grid container spacing={3} >


                    <Grid item xs={12} >
                        <TitleComponent logo title="Products" page="/displayallproducts"  />
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
                        {showBtn?<div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}} > <Button variant="contained" onClick={handleProductsPicture}  >Save</Button> <Button variant="contained" onClick={handleCancel} >Cancel</Button> </div>:<div style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                        <Button variant="contained" component="label" fullWidth >
                            Set New Picture
                            <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple />
                        </Button>
                        {error.picture?<span style={{fontSize:12, marginLeft:'5%', color:'#d32f2f'}} >{error.picture}</span>:<></>}
                        </div>}
                    </Grid>

                    <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                        <Avatar alt="Images" src={picture.file} fullWidth />
                    </Grid>

                

                </Grid>

            </div>
            </DialogContent>
            <DialogActions>
                    <Button onClick={handleEditProducts} >Edit</Button>
                    <Button onClick={handleClose} >Close</Button>
                </DialogActions>
        </Dialog>
    )
   }
   






    function showAllProducts(){
        return(
            <MaterialTable
            title="Products"
            columns={[
                {title:'Category', field:'categoryname'},
                {title:'Subcategory', field:'subcategoryname'},
                {title:'Brand', field:'brandname'},
                {title:'Product', field:'productid'},
                {title:'ProductName', field:'productname'},
                {title:'Description', field:'description'},
                {title:'Picture', field:'picture',render:(rowData)=><><img src={ `${serverURL}/images/${rowData.picture}` } style={{width:50,height:50}} /> </>}
            ]}


            options={{
                paging:true,
                pageSize:3,
                emptyRowsWhenPaging:false,
                pageSizeOptions:[3,5,7,10]
              }}
            
            data={productData}        
              actions={[
                {
                  icon: 'edit',
                  tooltip: 'Edit Product',
                  onClick: (event, rowData) => handleOpen(rowData)
                },

                {
                    icon: 'delete',
                    tooltip: 'Delete Product',
                    onClick: (event, rowData) => handleDeleteProducts(rowData)
                  },

                  {
                    icon: 'add',
                    tooltip: 'Add Product',
                    isFreeAction:true,
                    onClick: (event) => navigate('/admindashboard/products')
                  },
              ]} 
            
            />

        )
    }







    return(<div className={classes.root} >
        <div className={classes.boxproducts} >
        {showAllProducts()}
        </div>
        {showProductsForm()}
    </div>)
}