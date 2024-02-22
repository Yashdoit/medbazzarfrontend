import MaterialTable from "@material-table/core";
import { useStyles } from "./CategoriesCss";
import { useState,useEffect } from "react";
import { getData,postData,serverURL } from "../../services/FetchNodeServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { Grid,Button,TextField,Avatar, DialogTitle } from "@mui/material";
import TitleComponent from "../../components/admins/TitleComponent";
import { useNavigate } from "react-router-dom";


export default function DisplayAllBrands() {
    var classes=useStyles()
    var navigate = useNavigate()
    
    const [brandsData,setBrandsData]=useState([])
    const [open,setOpen]=useState(false)
    const [brands,setBrands]=useState('')
    const [brandsId,setBrandsId]=useState([])
    const [brandicon,setBrandIcon]=useState({file:'cap.png',bytes:''})
    const [tempBrandIcon,setTempBrandIcon]=useState('')
    const [error,setError]=useState({})
    const [showBtn,setShowBtn]=useState(false)
    const handleBrandIcon=(event)=>{
        setBrandIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setShowBtn(true)
    }

    const handleCancel=()=>{
        setBrandIcon({file:tempBrandIcon,bytes:''})
        setShowBtn(false)
    }

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }


    const handleEditBrands=async()=>{
        var submit = true
        if(brands.length==0)
        {
            handleError("brands","Plz Input Brand Name")
            submit = false
        }
        if(submit)
        {
            var body = {brandid:brandsId,brandname:brands}
            var result = await postData("brands/edit_brands",body)
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
            fetchAllBrands()
        }
        
    }



    const handleEditBrandIcon=async()=>{
        var formData = new FormData()
        formData.append('brandid',brandsId)
        formData.append('brandicon',brandicon.bytes)
        var result = await postData("brands/edit_brandicon",formData)
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
            fetchAllBrands()
    }



    const handleDelete=async(rowData)=>{
        
        
            Swal.fire({
                title: "Do you want to Delete the Brand?",
                showDenyButton: true,
                showCancelButton: true,
                toast: true,
                confirmButtonText: "Delete",
                denyButtonText: `Don't Delete`
              }).then(async(result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    var body = {brandid:rowData.brandid}
                    var result = await postData("brands/delete_brands",body)
                    if(result.status)
                    Swal.fire({toast:true,title:"Deleted!", icon:"success"});
                    else
                    Swal.fire({toast:true,title:"Cancel!", icon:"info"});
                    } else if (result.isDenied) {
                    Swal.fire({toast:true,title:"Your Record Is Safe!", icon:"info"});
                }
                fetchAllBrands()
              });

    }

    

    

    const fetchAllBrands=async()=>{
        var result = await getData('brands/display_all_brands')
        if(result.status)
        {
            setBrandsData(result.data)
            console.log(result.data)
        }
    }
    useEffect(function(){
        fetchAllBrands()
    },[])


    const handleClose=()=>{
        setOpen(false)
    }


    const handleOpen=(rowData)=>{
        setOpen(true)
        setBrandsId(rowData.brandid)
        setBrands(rowData.brandname)
        setBrandIcon({file:`${serverURL}/images/${rowData.brandicon}`,bytes:''})
        setTempBrandIcon(`${serverURL}/images/${rowData.brandicon}`)
    }


    const showBrandsForm=()=>{
        return(
            <Dialog open={open} onClose={handleClose} maxWidth="md" >

                <DialogContent>
                <div className={classes.boxsubmit}>
                    <Grid container spacing={3}>


                        <Grid item xs={12} >
                            <TitleComponent logo title='Edit Brands'/>
                        </Grid>

                        <Grid item xs={12} >
                            <TextField value={brands} onFocus={()=>handleError('brands',null)} error={error.brands} helperText={<span style={{fontFamily:'kanit'}}>{error.brands}</span>} onChange={(event)=>setBrands(event.target.value)} label='Brand Name' fullWidth/>
                        </Grid>

                        <Grid item xs={6} >
                            {showBtn?<div style={{width:'100%', height:80, display:'flex', justifyContent:'space-evenly',alignItems:'center'}} ><Button variant="contained" onClick={handleEditBrandIcon} >SAVE</Button><Button variant="contained" onClick={handleCancel} >CANCEL</Button></div>:<div style={{height:80,display:'flex',justifyContent:'center',alignItems:'center'}} >
                                <Button variant="contained" component='label' fullWidth >
                                    Set New Picture
                                    <input onClick={()=>handleError('brandicon',null)} onChange={handleBrandIcon} type="file" hidden accept="images/*" multiple />
                                </Button>
                                    {error.brandicon?<span style={{fontSize:11, marginLeft:'5%', color:'#d32f2f'}}>{error.brandicon}</span>:<></>}
                            </div>}
                        </Grid>

                        <Grid item xs={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}} >
                            <Avatar alt="Image" src={brandicon.file} variant="rounded" style={{width:80,height:80,borderRadius:10}}  />
                        </Grid>


                    </Grid>
                </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditBrands}>Edit Brands</Button>
                    <Button onClick={handleClose}>CLOSE</Button>
                </DialogActions>
            </Dialog>
        )
    }




    function showBrands(){
        return(
            <MaterialTable 
            title="Main Brands"
            columns={[
                { title: 'Brand Id',   field: 'brandid' },
                { title: 'Brand Name', field: 'brandname' },
                { title: 'Brand Icon', field: 'brandicon',render:(rowData)=><><img src={`${serverURL}/images/${rowData.brandicon}`} style={{width:50,height:50,borderRadius:10}} /> </> }
            ]}

            options={{
                paging:true,
                pageSize:3,
                emptyRowsWhenPaging:false,
                pageSizeOptions:[3,5,7,10]
              }}

            data={brandsData}

            actions={[
                {
                    icon: 'edit',
                    tooltip: 'Edit Brand',
                    onClick: (event,rowData) => handleOpen(rowData)
                },
                {
                    icon: 'delete',
                    tooltip: 'Delete Brand',
                    onClick: (event,rowData) => handleDelete(rowData)
                },
                {
                  icon: 'add',
                  tooltip: 'Add New Brands',
                  isFreeAction: true,
                  onClick: (event) => navigate('/admindashboard/brands')
                }
            ]}
           
            />
        )
    }


    return(<div className={classes.root} >  
        <div className={classes.boxdisplay} >
            {showBrands()}
        </div>
        {showBrandsForm()}
    </div>)
}