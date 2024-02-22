import { useNavigate } from "react-router-dom";
import { useStyles } from "./CategoriesCss";
import { useState,useEffect } from "react";
import MaterialTable from "@material-table/core";
import { getData,postData,serverURL } from "../../services/FetchNodeServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { Grid,Button,TextField,Avatar } from "@mui/material";
import TitleComponent from "../../components/admins/TitleComponent";
import { InputLabel,FormControl,Select,MenuItem } from "@mui/material"






export default function DisplayAllProductDetails(){
    var classes = useStyles()
    var navigate = useNavigate()
    const [productDetailsData,setProductDetailsData]=useState([])
    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [brandId,setBrandId]=useState('')
    const [productId,setProductId]=useState('')
    const [productDetailsId,setProductDetailsId]=useState('')
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
    const [picture,setPicture]=useState({file:'cap.png',bytes:''})
    const [tempPicture,setTempPicture]=useState('')
    const [error,setError]=useState({})
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [productList,setProductList]=useState([])
    const [brandList,setBrandList]=useState([])
    const [showBtn,setShowBtn]=useState(false)
    const [open,setOpen]=useState(false)


    const fetchAllProductDetails=async()=>{
        var result = await getData("productdetails/display_all_product_details")
        if(result.status)
        {setProductDetailsData(result.data)}
    }
    useEffect(function(){
        fetchAllProductDetails()
    },[])



   const handlePicture=(event)=>{
    setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    setShowBtn(true)
  }

  const handleError=(label,msg)=>{
      setError((prev)=>({...prev,[label]:msg}))
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




  const handleEditProductDetails=async()=>{
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
    if(submit)
    {
        var body = {categoryid:categoryId, subcategoryid:subCategoryId, brandid:brandId, productid:productId, productdetailid:productDetailsId, productsubname:productSubName, weight:weight, weighttype:weightType, type:type, packaging:packaging, qty:quantity, price:price, offerprice:offerPrice, offertype:offerType, description:description}
        var result = await postData("productdetails/edit_product_details",body)
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
        fetchAllProductDetails()
    }
}


const handleClose=()=>{
  setOpen(false)
}


const handleOpen=(rowData)=>{
  setOpen(true)
  fetchAllSubCategory(rowData.categoryid)
  fetchAllProduct(rowData.brandid)
  setCategoryId(rowData.categoryid)
  setSubCategoryId(rowData.subcategoryid)
  setBrandId(rowData.brandid)
  setProductId(rowData.productid)
  setDescription(rowData.description)
  setProductDetailsId(rowData.productdetailid)
  setProductSubName(rowData.productsubname)
  setWeight(rowData.weight)
  setWeightType(rowData.weighttype)
  setType(rowData.type)
  setPackaging(rowData.packaging)
  setQuantity(rowData.qty)
  setPrice(rowData.price)
  setOfferPrice(rowData.offerprice)
  setOfferType(rowData.offertype)
  setTempPicture(`${serverURL}/images/${rowData.picture}`)
  setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})

}


const handleCancel=()=>{
    setShowBtn(false)
    setPicture({file:tempPicture,bytes:''})
}

const handleProductDetailsPicture=async()=>{
    var formData = new FormData()
    formData.append('productdetailid',productDetailsId)
    formData.append('picture',picture.bytes)
    var result = await postData("productdetails/edit_product_details_picture",formData)
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
    fetchAllProductDetails()
}



const handleDeleteProductDetails=async(rowData)=>{
    Swal.fire({
        title: "Do you want to Delete Product Details ?",
        showDenyButton: true,
        showCancelButton: true,
        toast: true,
        confirmButtonText: "Delete",
        denyButtonText: `Don't Delete`
      }).then(async(result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            var body = {productdetailid:rowData.productdetailid}
            var result = await postData("productdetails/delete_product_details",body)
            if(result.status)
            Swal.fire({toast:true,title:"Deleted!", icon:"success"});
            else
            Swal.fire({toast:true,title:"Cancel!", icon:"info"});
            } else if (result.isDenied) {
            Swal.fire({toast:true,title:"Your Record Is Safe!", icon:"info"});
        }
        fetchAllProductDetails()
      });
}





   const showProductDetailsForm=()=>{
      return(
        <Dialog open={open} onClose={handleClose}  maxWidth='lg' >

          <DialogContent>
            <div className={classes.boxdetails} >

              <Grid container spacing={3} >


                  <Grid item xs={12} >
                      <TitleComponent logo title="Product Details" page="/displayallproductdetails"  />
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
                      <TextField value={description} onFocus={()=>handleError('description',null)} onChange={(event)=>setDescription(event.target.value)} error={error.description} helperText={error.description} label="Description" fullWidth />
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
                    {showBtn?<div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center'}} > <Button variant="contained" onClick={handleProductDetailsPicture} >Save</Button> <Button variant="contained" onClick={handleCancel} >cancel</Button> </div>:<div  style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                      <Button variant="contained" fullWidth component="label" >
                          Set New Picture
                          <input onClick={()=>handleError('picture',null)} onChange={handlePicture}  type="file" hidden accept="images/*" multiple />
                      </Button>
                      {error.picture?<span style={{fontSize:12, marginLeft:'5%', color:'#d32f2f'}} >{error.picture}</span>:<></>}
                    </div>}
                  </Grid>

                  <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                      <Avatar alt="image" src={picture.file} fullWidth />
                  </Grid>


              </Grid>

            </div>

          </DialogContent>

          <DialogActions>
            <Button onClick={handleEditProductDetails} >Edit</Button>
            <Button onClick={handleClose}  >Close</Button>
          </DialogActions>

        </Dialog>
      )
   }













    function showAllProductDetails(){
            return (
              <MaterialTable
                title="Product Details"
                columns={[
                    {title:'ProductDetailId', field:'productdetailid'},
                    {title:'Category', render:(rowData)=><div><div>{rowData.categoryname}</div><div>{rowData.subcategoryname}</div></div>},
                    // {title:'Subcategory', field:'subcategoryname'},
                    {title:'Product', render:(rowData)=><div><div>{rowData.brandname}</div><div>{rowData.productname}</div><div>{rowData.productsubname}{rowData.weight}{rowData.weighttype} </div></div>},
                    // {title:'Product', field:'productname'},
                    // {title:'ProductSubName', field:'productsubname'},
                    // {title:'Weight', field:'weight'},
                    // {title:'WeightType', field:'weighttype'},
                    {title:'Type', render:(rowData)=><div><div>{rowData.qty}{rowData.type}</div><div>{rowData.packaging}</div></div>},
                    // {title:'Packaging', field:'packaging'},
                    // {title:'Qty', field:'qty'},
                    {title:'Price', render:(rowData)=><div><div><s>&#8377;{rowData.price}</s></div><div>&#8377;{rowData.offerprice}</div></div>},
                    // {title:'OfferPrice', field:'offerprice'},
                    {title:'OfferType', field:'offertype'},
                    // {title:'Description', field:'description'},
                    {title:'Picture', field:'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture.split(",")[0]}`} style={{width:50,height:50}} /></>},
                  
                ]}

                options={{
                    paging:true,
                    pageSize:3,
                    emptyRowsWhenPaging:false,
                    pageSizeOptions:[3,5,7,10]
                  }}


                data={productDetailsData}        
                actions={[
                  {
                    icon: 'edit',
                    tooltip: 'Edit User',
                    onClick: (event, rowData) => handleOpen(rowData)
                  },
                  {
                    icon: 'delete',
                    tooltip: 'Delete User',
                    onClick: (event, rowData) => handleDeleteProductDetails(rowData)
                  },
                  {
                    icon: 'add',
                    tooltip: 'Add Product',
                    isFreeAction:true,
                    onClick: (event) => navigate('/admindashboard/productdetails')
                  }
                ]}
              />
            )
          }


          return(<div className={classes.root} >
            <div className={classes.boxproducts} >
            {showAllProductDetails()}
            </div>
            {showProductDetailsForm()}
        </div>)


    }
