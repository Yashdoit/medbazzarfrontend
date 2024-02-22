import MaterialTable from "@material-table/core";
import { useStyles } from "./CategoriesCss";
import { useState,useEffect } from "react";
import { getData, postData, serverURL } from "../../services/FetchNodeServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import { Button, Grid, TextField, Avatar } from "@mui/material";
import TitleComponent from "../../components/admins/TitleComponent";
import { useNavigate } from "react-router-dom";

export default function DisplayAllCategory(){
    var classes=useStyles()
    var navigate = useNavigate()

    const [categoryData,setCategoryData]=useState([])
    const [open,setOpen]=useState(false)

    const [categoryId,setCategoryId]=useState([])
    const [category,setCategory]=useState('')
    const [picture,setPicture]=useState({file:'cap.png',bytes:''})
    const [temppicture,setTempPicture]=useState('')
    const [error,setError]=useState({})
    const [showBtn,setShowBtn]=useState(false)
    const handlePicture=(event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setShowBtn(true)
    }


    const handleCancel=()=>{
      setPicture({file:temppicture,bytes:''})
      setShowBtn(false)
    }


    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    }


    const handleEditData=async()=>{
        var submit = true
        if(category.length==0)
        {
            handleError('category','Pls Input Category Name...')
            submit = false
        }
        
        if(submit)
        {
          var body = {categoryid:categoryId,categoryname:category}
          var result = await postData('category/edit_category_data',body)
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

          fetchAllCategory()
        }
    }


    const handleEditPicture=async()=>{
      var submit = true
      if(picture.bytes.length==0)
        {
            handleError('picture','Pls Choose Icon...')
            submit = false
        }
        if(submit)
        {
          var formData = new FormData()
          formData.append('categoryid',categoryId)
          formData.append('picture',picture.bytes)
          var result = await postData('category/edit_category_picture',formData)
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

          fetchAllCategory()
        }
    }


    const handleDelete=async(rowData)=>{
              Swal.fire({
                title: "Do you want to delete category?",
                showDenyButton: true,
                showCancelButton: true,
                toast: true,
                confirmButtonText: "Delete",
                denyButtonText: `Don't Delete`
              }).then(async(result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  var body = {categoryid:rowData.categoryid}
                  var result = await postData('category/delete_category_data',body)
                  if(result.status)
                  Swal.fire({toast:true, title:"Deleted!", icon:"success"});
                  else
                  Swal.fire({toast:true, title:"Fail to Delete Record!", icon:"success"});
                } else if (result.isDenied) {
                  Swal.fire({toast:true, title:"Your record id safe", icon:"info"});
                }
                fetchAllCategory()
              });
            
      
      
    }



    const fetchAllCategory=async()=>{
      var result = await getData('category/display_all_category')
      if(result.status)
      {
        setCategoryData(result.data)
      }
    }

    useEffect(function(){
      fetchAllCategory()
    },[])


    const handleClose=()=>{
      setOpen(false)
    }

    const handleOpen=(rowData)=>{
      setOpen(true)
      setCategoryId(rowData.categoryid)
      setCategory(rowData.categoryname)
      setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
      setTempPicture(`${serverURL}/images/${rowData.picture}`)
    }



    const showCategoryForm=()=>{
      return(
        <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='md' >

          <DialogContent>

            <div className={classes.box} >
              <Grid container spacing={3}>

                <Grid item xs={12} >
                  <TitleComponent title='Edit Category Data' logo />
                </Grid>

                <Grid item xs={12} >
                  <TextField value={category} onFocus={()=>handleError('category',null)} error={error.category} helperText={<span style={{fontFamily:'kanit'}}>{error.category}</span>} onChange={(event)=>setCategory(event.target.value)} label='Category Name' fullWidth />
                </Grid>

                <Grid item xs={6} >
                  {showBtn?<div style={{height:80,display:'flex',justifyContent:'space-evenly',alignItems:'center'}} ><Button onClick={handleEditPicture} variant="contained" >Save</Button><Button onClick={handleCancel} variant="contained" >Cancel</Button></div>:<div style={{height:80,display:'flex',justifyContent:'space-evenly',alignItems:'center'}} >
                    <Button variant="contained" component='label' fullWidth  >
                      Set New Picture
                      <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple />
                    </Button>
                    {error.picture?<span style={{fontSize:11, marginLeft:'5%', color:'#d32f2f'}}>{error.picture}</span>:<></>}
                  </div>}
                </Grid>

                <Grid item xs={6} style={{display:'flex', justifyContent:'center', alignItems:'center'}} >
                  <Avatar alt="Image" src={picture.file} variant="rounded" style={{width:80,height:80}}  />
                </Grid>


              </Grid>
            </div>

          </DialogContent>

          <DialogActions>
            <Button onClick={handleEditData} >Edit Data</Button>
            <Button onClick={handleClose} >Close</Button>
          </DialogActions>

        </Dialog>
      )
    }


    function showCategory() {
        return (
          <MaterialTable
            title="Main Categories"
            columns={[
              { title: 'Category Id', field: 'categoryid' },
              { title: 'Category Name', field: 'categoryname' },
              { title: 'Icon', field: 'picture', render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture}`} style={{width:60, borderRadius:30, height:60}} /></> },
            ]}

            options={{
              paging:true,
              pageSize:3,
              emptyRowsWhenPaging:false,
              pageSizeOptions:[3,5,7,10]
            }}

            data={categoryData}  

            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Category',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Category',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add New Category',
                isFreeAction: true,
                onClick: (event) => navigate('/admindashboard/category')
              }
            ]}

          />
        )
      }

      return(<div className={classes.root}>
        <div className={classes.boxdisplay}>
            {showCategory()}
        </div>
        {showCategoryForm()}
            </div>)




}