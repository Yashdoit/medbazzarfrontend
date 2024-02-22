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



export default function DisplayAllSubCategory(){
    var classes = useStyles()
    var navigate = useNavigate()

    const [categoryIdData,setCategoryIdData]=useState([])
    const [open,setOpen]=useState(false)
    const [categoryId,setCategoryId]=useState('')
    const [subCategory,setSubCategory]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [icon,setIcon]=useState({file:'cap.png',bytes:''})
    const [error,setError]=useState({})
    const [showBtn,setShowBtn]=useState(false)
    const [tempSubCategoryIcon,setSubCategoryIcon]=useState('')
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
        setShowBtn(true)
    }

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }

    const handleCancel=()=>{
        setShowBtn(false)
        setIcon({file:tempSubCategoryIcon,bytes:''})
    }


    const handleEditSubCategory=async()=>{
        var submit = true
        if(categoryId.length==0)
        {
            handleError('categoryId','Plz Input Category Id....')
            submit = false
        }
        if(subCategory.length==0)
        {
            handleError('subCategory','Plz Input Subcategory Name....')
            submit = false
        }
        if(submit)
        {
            var body = {subcategoryid:subCategoryId, categoryid:categoryId, subcategoryname:subCategory}
            var result = await postData("subcategory/edit_subcategory",body)
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
            fetchAllSubCategory()
        }
        
    }


    const handleDeleteSubCategory=async(rowData)=>{
        Swal.fire({
            title: "Do you want to Delete Subcategory?",
            showDenyButton: true,
            showCancelButton: true,
            toast: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't Delete`
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                var body = {subcategoryid:rowData.subcategoryid}
                var result = await postData("subcategory/delete_subcategory",body)
                if(result.status)
                Swal.fire({toast:true,title:"Deleted!", icon:"success"});
                else
                Swal.fire({toast:true,title:"Cancel!", icon:"info"});
                } else if (result.isDenied) {
                Swal.fire({toast:true,title:"Your Record Is Safe!", icon:"info"});
            }
            fetchAllSubCategory()
          });
    }


    const handleSubCategoryIcon=async()=>{
        var formData = new FormData()
        formData.append('subcategoryid',subCategoryId)
        formData.append('icon',icon.bytes)
        var result = await postData("subcategory/edit_subcategoryicon",formData)
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
        fetchAllSubCategory()
    }







    
    const fetchAllSubCategory=async()=>{
        var result = await getData("subcategory/display_all_subcategory")
        if(result.status)
        {
            setCategoryIdData(result.data)
        }
    }

    useEffect(function(){
         fetchAllSubCategory()
    },[])



    const handleClose=()=>{
        setOpen(false)
    }

    const handleOpen=(rowData)=>{
        setOpen(true)
        setSubCategoryId(rowData.subcategoryid)
        setSubCategory(rowData.subcategoryname)
        setCategoryId(rowData.categoryid)
        setIcon({file:`${serverURL}/images/${rowData.icon}`,bytes:''})
        setSubCategoryIcon(`${serverURL}/images/${rowData.icon}`)
    }



    const showSubCategoryForm=()=>{
        return(
            <Dialog open={open} onClose={handleClose} maxWidth="md" >
                <DialogContent>
                    <div className={classes.boxsubmit} >

                        <Grid container spacing={3}>

                            <Grid item xs={12} >
                                <TitleComponent logo title="Edit Sub-Categories"  />
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
                                {showBtn?<div style={{height:100,width:'100%',display:'flex',justifyContent:'space-evenly',alignItems:'center'}} ><Button variant="contained" onClick={handleSubCategoryIcon} >Save</Button><Button variant="contained" onClick={handleCancel} >Cancel</Button></div>:<div style={{height:100,display:'flex',justifyContent:'center',alignItems:'center'}} >
                                    <Button variant="contained" component="label" fullWidth >
                                        Set New Icon
                                        <input onClick={()=>handleError('icon',null)} onChange={handleIcon} type="file" hidden accept="images/*" multiple />
                                    </Button>
                                    {error.icon?<span style={{fontSize:11, marginLeft:'5%', color:'#d32f2f'}} >{error.icon}</span>:<></>}
                                </div>}
                            </Grid>

                            <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                                <Avatar alt="Image" src={icon.file} style={{width:100,height:100,borderRadius:20}} />
                            </Grid>

                        </Grid>

                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditSubCategory} >Edit</Button>
                    <Button onClick={handleClose} >Close</Button>
                </DialogActions>
            </Dialog>
        )
    }




    function showSubCategory(){
        return(
            <MaterialTable 
            title="Sub Categories"
            columns={[
                {title: 'Subcategory Id', field: 'subcategoryid'},
                {title: 'Category', field: 'categoryname'},
                {title: 'Subcategory Name', field: 'subcategoryname'},
                {title: 'Icon', field: 'icon',render:(rowData)=><><img src={ `${serverURL}/images/${rowData.icon}` } style={{width:50,height:50}} /> </>},

            ]}

            options={{
                paging:true,
                pageSize:3,
                emptyRowsWhenPaging:false,
                pageSizeOptions:[3,5,7,10]
              }}

            data={categoryIdData}

            actions={[
                {
                    icon: 'edit',
                    tooltip: 'Edit Sub Category',
                    onClick: (event,rowData) => handleOpen(rowData)
                },

                {
                    icon: 'delete',
                    tooltip: 'Delete Sub Category',
                    onClick: (event,rowData) => handleDeleteSubCategory(rowData)
                },
                {
                  icon: 'add',
                  tooltip: 'Add New Category',
                  isFreeAction: true,
                  onClick: (event) => navigate('/admindashboard/subcategory')
                }
            ]}
            
            
            />

        )
    }
    return(<div className={classes.root} >
        <div className={classes.boxsubcategory} >
            {showSubCategory()}
        </div>
        {showSubCategoryForm()}
    </div>)
}