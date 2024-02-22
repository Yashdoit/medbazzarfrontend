import { AppBar,Toolbar,Box,Button,Menu,MenuItem } from "@mui/material";
import { useState,useEffect } from "react";
import { serverURL,getData,postData } from "../../services/FetchNodeServices";

export default function MenuBar()
{
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [anchorE1,setAnchorE1]=useState(null)
    const open = Boolean(anchorE1)
    const fetchAllSubCategory=async(cid)=>{
      var result = await postData("userinterface/fetch_all_subcategory_by_categoryid",{categoryid:cid})
      if(result.status)
      {        
          setSubCategoryList(result.data)
      }

    }
    const handleClick=(categoryid,event)=>{
      fetchAllSubCategory(categoryid)
      setAnchorE1(event.currentTarget)
    }

    const fetchAllCategory=async()=>{
        var result = await getData('userinterface/display_all_category')
        if(result.status)
        {
          setCategoryList(result.data)
        }
      }
  
      useEffect(function(){
        fetchAllCategory()
      },[])


      const handleClose=()=>{
        setAnchorE1(null)
      }


      const showAllCategory=()=>{
        return categoryList.map((item)=>{
            return<Button onClick={(event)=>handleClick(item.categoryid,event)} style={{color:'#000'}} >{item.categoryname}</Button>
        })
      }


      const showAllSubCategory=()=>{
        return subCategoryList.map((item)=>{
            return<MenuItem>{item.subcategoryname}</MenuItem>
        })
      }




    return(<div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar style={{background:'#fff'}} position="static">
            <Toolbar style={{display:'flex',justifyContent:'center'}} >
              {showAllCategory()}
              <Menu
              anchorEl={anchorE1}
              open={open}
              onClose={handleClose}
              >
                {showAllSubCategory()}
              </Menu>
            </Toolbar>
          </AppBar>
        </Box>
    </div>)
}