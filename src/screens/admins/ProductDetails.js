import { useStyles } from "./CategoriesCss";
import { Grid, TextField, Avatar, Button } from "@mui/material";
import TitleComponent from "../../components/admins/TitleComponent";
import { useState, useEffect } from "react";
import { getData, postData } from "../../services/FetchNodeServices";
import { InputLabel,FormControl,Select,MenuItem } from "@mui/material"
import Swal from "sweetalert2";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useMemo } from "react";





export default function ProductDetails(){
    var classes = useStyles()


    const modules = useMemo(() => ({
        toolbar: {
          container: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', "strike"],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['image', "link", 'video'],
            [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
          ],
        },
      }), [])




    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [brandId,setBrandId]=useState('')
    const [productId,setProductId]=useState('')
    const [productSubName,setProductSubName]=useState('')
    const [weight,setWeight]=useState('')
    const [weightType,setWeightType]=useState('')
    const [type,setType]=useState('')
    const [packaging,setPackaging]=useState('')
    const [quantity,setQuantity]=useState('')
    const [price,setPrice]=useState('')
    const [offerPrice,setOfferPrice]=useState('')
    const [offerType,setOfferType]=useState('')
    const [description,setDescription]=useState('')
    const [concern,setConcern]=useState('')
    const [picture,setPicture]=useState({file:[],bytes:''})
    const [error,setError]=useState({})
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [productList,setProductList]=useState([])
    const [brandList,setBrandList]=useState([])
    const [concernList,setConcernList]=useState([])



    const fetchAllConcern=async()=>{
        var result = await getData("concern/display_all_concern")
        if(result.status)
        {
            setConcernList(result.data)
        }
    }
    useEffect(function(){fetchAllConcern()},[])

    const fillAllConcern=()=>{
        return concernList.map((item)=>{

            return <MenuItem value={item.concernid}> {item.concernname} </MenuItem>
        })
    }





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






    const fetchAllProduct=async(bid)=>{
        var result = await postData("products/fetch_all_products_by_brandid",{brandid:bid})
        if(result.status)
        {
            setProductList(result.data)
        }

    }
    useEffect(function(){fetchAllProduct()},[])

    const fillAllProduct=()=>{
        return productList.map((item)=>{
            
            return <MenuItem value={item.productid}> {item.productname} </MenuItem>

        })
    }


    const handleChangeBrand=(event)=>{
        setBrandId(event.target.value)
        fetchAllProduct(event.target.value)        
    }





    const handlePicture=async(event)=>{
        // var file=await Object.values(event.target.files).map((item)=>{
        //     return item
        // })

        if(Object.values(event.target.files).length<=3)
        {
            alert("PLZ UPLOAD 3 OR MORE PICS")
        }
        else
        {
 
            setPicture({file:Object.values(event.target.files),bytes:event.target.files})
        }

        
    }

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }
    const handleSubmit=async()=>{
        var submit = true
        if(categoryId.length==0)
        {
            handleError("categoryId","Plz Choose Category name....")
            submit = false
        }
        if(subCategoryId.length==0)
        {
            handleError("subCategoryId","Plz Choose SubCategory name....")
            submit = false
        }
        if(concern.length==0)
        {
            handleError("concern","Plz Input Concern name....")
            submit = false
        }
        if(brandId.length==0)
        {
            handleError("brandId","Plz Choose Brand name....")
            submit = false
        }
        if(productId.length==0)
        {
            handleError("productId","Plz Choose Brand name....")
            submit = false
        }
        if(productSubName.length==0)
        {
            handleError("productSubName","Plz input Product Subname name....")
            submit = false
        }
        if(description.length==0)
        {
            handleError("description","Plz input Description....")
            submit = false
        }
        if(weight.length==0)
        {
            handleError("weight","Plz input Product Weight....")
            submit = false
        }
        if(weightType.length==0)
        {
            handleError("weightType","Plz input Product Weight Type....")
            submit = false
        }
        if(type.length==0)
        {
            handleError("type","Plz input Product Type....")
            submit = false
        }
        if(packaging.length==0)
        {
            handleError("packaging","Plz input Product Packaging....")
            submit = false
        }
        if(quantity.length==0)
        {
            handleError("quantity","Plz input Product Quantity....")
            submit = false
        }
        if(price.length==0)
        {
            handleError("price","Plz input Product Price....")
            submit = false
        }
        if(offerPrice.length==0)
        {
            handleError("offerPrice","Plz input Product OfferPrice....")
            submit = false
        }
        if(offerType.length==0)
        {
            handleError("offerType","Plz input Product OfferType....")
            submit = false
        }
        if(picture.bytes.length==0)
        {
            handleError("picture","Plz Choose Picture....")
            submit = false
        }
        if(submit)
        {
            var formData = new FormData()
            formData.append('categoryid',categoryId)
            formData.append('subcategoryid',subCategoryId)
            formData.append('brandid',brandId)
            formData.append('productid',productId)
            formData.append('productsubname',productSubName)
            formData.append('weight',weight)
            formData.append('weighttype',weightType)
            formData.append('type',type)
            formData.append('packaging',packaging)
            formData.append('qty',quantity)
            formData.append('price',price)
            formData.append('offerprice',offerPrice)
            formData.append('offertype',offerType)
            formData.append('description',description)
            picture.file.map((item,i)=>{
                formData.append('picture'+i,item)
            })
            
            var result = await postData("productdetails/submit_product_details",formData)
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
        setSubCategoryId('')
        setBrandId('')
        setProductId('')
        setProductSubName('')
        setWeight('')
        setWeightType('')
        setType('')
        setPackaging('')
        setQuantity('')
        setPrice('')
        setOfferPrice('')
        setOfferType('')
        setDescription('')
        setConcern('')
        setPicture({file:'cap.png',bytes:''})
        
    }



    const showImages=()=>{
        return picture?.file?.map((item)=>{
            return(<div><Avatar alt="image" style={{margin:2}} src={URL.createObjectURL(item)} fullWidth /></div>)
        })
    }



    return(<div className={classes.root} >
        <div className={classes.boxdetails} >

        <Grid container spacing={3} >


            <Grid item xs={12} >
                <TitleComponent logo title="Product Details" listicon="icon.png" page="/admindashboard/displayallproductdetails"  />
            </Grid>

            <Grid item xs={3} >
                <FormControl fullWidth >

                    <InputLabel>Category</InputLabel>
                    <Select label="Category" value={categoryId} onFocus={()=>handleError('categoryId',null)} error={error.categoryId} onChange={handleChangeCategory} >
                    {fillAllCategory()}
                    </Select>
                    {error.categoryId?<span style={{fontSize:12, marginLeft:'5%', color:'#d32f2f'}} >{error.categoryId}</span>:<></>}

                </FormControl>
            </Grid>

            <Grid item xs={3} >
                <FormControl fullWidth >

                    <InputLabel>SubCategory</InputLabel>
                    <Select label="SubCategory" value={subCategoryId} onFocus={()=>handleError('subCategoryId',null)} error={error.subCategoryId} onChange={(event)=>setSubCategoryId(event.target.value)} >
                    {fillAllSubCategory()}
                    </Select>
                    {error.subCategoryId?<span style={{fontSize:12, marginLeft:'5%', color:'#d32f2f'}} >{error.subCategoryId}</span>:<></>}

                </FormControl>
            </Grid>

            <Grid item xs={3} >
                <FormControl fullWidth >

                    <InputLabel>Brands</InputLabel>
                    <Select label="Brands" value={brandId} onFocus={()=>handleError('brandId',null)} error={error.brandId} onChange={handleChangeBrand} >
                    {fillAllBrand()}
                    </Select>
                    {error.brandId?<span style={{fontSize:12, marginLeft:'5%', color:'#d32f2f'}} >{error.brandId}</span>:<></>}

                </FormControl>
            </Grid>

            <Grid item xs={3} >
                <FormControl fullWidth >

                    <InputLabel>Product</InputLabel>
                    <Select label="Products" value={productId} onFocus={()=>handleError('productId',null)} error={error.productId} onChange={(event)=>setProductId(event.target.value)} >
                    {fillAllProduct()}
                    </Select>
                    {error.productId?<span style={{fontSize:12, marginLeft:'5%', color:'#d32f2f'}} >{error.productId}</span>:<></>}

                </FormControl>
            </Grid>

            <Grid item xs={6} >
                <TextField value={productSubName} onFocus={()=>handleError('productSubName',null)} onChange={(event)=>setProductSubName(event.target.value)} error={error.productSubName} helperText={error.productSubName} label="Product SubName" fullWidth />
            </Grid>

            <Grid item xs={6} >
                <FormControl fullWidth >

                    <InputLabel>Concern</InputLabel>
                    <Select label="Concern" value={concern} onFocus={()=>handleError('concern',null)} error={error.concern} onChange={(event)=>setConcern(event.target.value)} >
                    {fillAllConcern()}
                    </Select>
                    {error.concern?<span style={{fontSize:12, marginLeft:'5%', color:'#d32f2f'}} >{error.concern}</span>:<></>}

                </FormControl>
            </Grid>

            <Grid item xs={12} >
            <ReactQuill modules={modules} theme="snow" value={description} onChange={(e)=>setDescription(e)} onFocus={()=>handleError('description',null)} error={error.description}/>
            {error.description?<span style={{fontSize:12, marginLeft:'2%', color:'#d32f2f'}} >{error.description}</span>:<></>}
            </Grid>

            <Grid item xs={3} >
                <TextField value={weight} onFocus={()=>handleError('weight',null)} onChange={(event)=>setWeight(event.target.value)} error={error.weight} helperText={error.weight} label="Weight" fullWidth />
            </Grid>

            <Grid item xs={3} >
                <FormControl fullWidth >

                    <InputLabel>Weight Type</InputLabel>
                    <Select label="Weight Type" value={weightType} onFocus={()=>handleError('weightType',null)} onChange={(event)=>setWeightType(event.target.value)} error={error.weightType} >
                        <MenuItem value="asdfbnh" >asdfbnh</MenuItem>
                        <MenuItem value="asdfbnh" >asdfbnh</MenuItem>
                        <MenuItem value="asdfbnh" >asdfbnh</MenuItem>
                        <MenuItem value="asdfbnh" >asdfbnh</MenuItem>
                        <MenuItem value="asdfbnh" >asdfbnh</MenuItem>
                        <MenuItem value="asdfbnh" >asdfbnh</MenuItem>
                        <MenuItem value="asdfbnh" >asdfbnh</MenuItem>
                    </Select>
                    {error.weightType?<span style={{fontSize:12, marginLeft:'5%', color:'#d32f2f'}} >{error.weightType}</span>:<></>}

                </FormControl>
            </Grid>

            <Grid item xs={3} >
                <FormControl fullWidth >

                    <InputLabel>Type</InputLabel>
                    <Select label="Type" value={type} onFocus={()=>handleError('type',null)} onChange={(event)=>setType(event.target.value)} error={error.type} >
                        <MenuItem value="sdgdgas" >sdgdgas</MenuItem>
                        <MenuItem value="sdgdgas" >sdgdgas</MenuItem>
                        <MenuItem value="sdgdgas" >sdgdgas</MenuItem>
                        <MenuItem value="sdgdgas" >sdgdgas</MenuItem>
                        <MenuItem value="sdgdgas" >sdgdgas</MenuItem>
                        <MenuItem value="sdgdgas" >sdgdgas</MenuItem>
                    </Select>
                    {error.type?<span style={{fontSize:12, marginLeft:'5%', color:'#d32f2f'}} >{error.type}</span>:<></>}

                </FormControl>
            </Grid>

            <Grid item xs={3} >
                <FormControl fullWidth >

                    <InputLabel>Packaging</InputLabel>
                    <Select label="Packaging" value={packaging} onFocus={()=>handleError('packaging',null)} onChange={(event)=>setPackaging(event.target.value)} error={error.packaging} >
                        <MenuItem value="saddfd" >saddfd</MenuItem>
                        <MenuItem value="saddfd" >saddfd</MenuItem>
                        <MenuItem value="saddfd" >saddfd</MenuItem>
                        <MenuItem value="saddfd" >saddfd</MenuItem>
                        <MenuItem value="saddfd" >saddfd</MenuItem>
                    </Select>
                    {error.packaging?<span style={{fontSize:12, marginLeft:'5%', color:'#d32f2f'}} >{error.packaging}</span>:<></>}

                </FormControl>
            </Grid>

            <Grid item xs={3} >
            <TextField value={quantity} onFocus={()=>handleError('quantity',null)} onChange={(event)=>setQuantity(event.target.value)} error={error.quantity} helperText={error.quantity} label="Quantity" fullWidth />
            </Grid>


            <Grid item xs={3} >
                <TextField value={price} onFocus={()=>handleError('price',null)} onChange={(event)=>setPrice(event.target.value)} error={error.price} helperText={error.price} label="Price" fullWidth />
            </Grid>

            <Grid item xs={3} >
                <TextField value={offerPrice} onFocus={()=>handleError('offerPrice',null)} onChange={(event)=>setOfferPrice(event.target.value)} error={error.offerPrice} helperText={error.offerPrice} label="Offer Price" fullWidth />
            </Grid>

            <Grid item xs={3} >
                <FormControl fullWidth >

                    <InputLabel>Offer Type</InputLabel>
                    <Select label="OfferType" value={offerType} onFocus={()=>handleError('offerType',null)} onChange={(event)=>setOfferType(event.target.value)} error={error.offerType} >
                        <MenuItem value="kbvkhs" >kbvkhs</MenuItem>
                        <MenuItem value="kbvkhs" >kbvkhs</MenuItem>
                        <MenuItem value="kbvkhs" >kbvkhs</MenuItem>
                        <MenuItem value="kbvkhs" >kbvkhs</MenuItem>
                        <MenuItem value="kbvkhs" >kbvkhs</MenuItem>
                    </Select>
                    {error.offerType?<span style={{fontSize:12, marginLeft:'5%', color:'#d32f2f'}} >{error.offerType}</span>:<></>}

                </FormControl>
            </Grid>

            <Grid item xs={6} >
                <Button variant="contained" fullWidth component="label" >
                    Upload
                    <input onClick={()=>handleError('picture',null)} onChange={handlePicture}  type="file" hidden accept="images/*" multiple />
                </Button>
                {error.picture?<span style={{fontSize:12, marginLeft:'5%', color:'#d32f2f'}} >{error.picture}</span>:<></>}
            </Grid>

            <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                {showImages()}
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

{/* <TextField value={description} onFocus={()=>handleError('description',null)} onChange={(event)=>setDescription(event.target.value)} error={error.description} helperText={error.description}  label="Description" fullWidth /> */}