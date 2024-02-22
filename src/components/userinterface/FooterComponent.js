import { Grid,Button } from "@mui/material"
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import { footerStyles } from "./FooterCss";
import { useState ,useEffect} from "react";
import { getData } from "../../services/FetchNodeServices";
// import gpay from "../../assests/gpay.png"
// import ap from "../../assests/ap.png"
import EmailIcon from '@mui/icons-material/Email';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';


export default function FooterComponent(){
    var classes=footerStyles()
    
    const  [categoryList,setCategoryList] =useState([])


   const fetchAllCategory=async()=>{
    var result=await getData('userinterface/display_all_category')
    if(result.status)
    {setCategoryList(result.data)}}

  useEffect(function(){fetchAllCategory()},[])


  const showAllCategory=()=>{
    return categoryList.map((item)=>{
        return <div style={{fontSize:16,marginBottom:5,color:'#d1d8e0'}} >{item.categoryname}</div> 
    })
 }



    return(<div className={classes.mainBox} >
        <div className={classes.box1}>
            <Grid container spacing={2} style={{marginLeft:30}}>
                
                
                
                <Grid item xs={12} >
                    <div style={{fontSize:18,fontWeight:'bolder ',marginBottom:15}}>Follow us</div>
                    <span ><FacebookIcon fontSize="large"/></span>
                    <span style={{marginLeft:9}}><InstagramIcon fontSize="large"/></span>
                    <span style={{marginLeft:9}}><TwitterIcon fontSize="large"/></span>   
                    <span style={{marginLeft:9}}><WhatsAppIcon fontSize="large"/></span>
                    
                </Grid>



                <Grid item xs={4} style={{marginTop:12}} >
                        <div style={{fontSize:17,fontWeight:'bold '}}>Categories</div>

                        <div style={{marginTop:20}}>{showAllCategory()}</div>
                </Grid>
                    
                    <Grid item xs={4} style={{marginTop:12}} >
                        <div style={{fontSize:17,fontWeight:'bold'}}>Medicines</div>

                        <div style={{marginTop:20,color:'#d1d8e0',fontSize:16}}>Buy Medicines</div>
                        <div style={{marginTop:5,color:'#d1d8e0',fontSize:16}}>Upload Doctor's Note</div>                       
                        
                       
                    </Grid>
                    
                    <Grid item xs={4}style={{marginTop:12}} >
                       <div style={{fontSize:17,fontWeight:'bold'}}>Others</div>

                       <div style={{marginTop:20,color:'#d1d8e0',fontSize:16}}>Offers</div>
                       <div style={{marginTop:5,color:'#d1d8e0',fontSize:16}}>Blogs</div> 
                       <div style={{marginTop:5,color:'#d1d8e0',fontSize:16}}>Terms & Condition</div>
                       <div style={{marginTop:5,color:'#d1d8e0',fontSize:16}}>Privacy Policy</div> 
                       <div style={{marginTop:5,color:'#d1d8e0',fontSize:16}}>Store Locator</div> 
                    </Grid>
                    
                
                
                


            </Grid>

        </div>
        <div className={classes.box2}>
            <Grid container spacing={2}  >
                <Grid item xs={12}  >
                    <div style={{fontSize:18,fontWeight:'bolder ',marginTop:20}}>Download the Mobile app</div>
                    <div style={{marginTop:-10 }}>
                        {/* <img src={ap} width='100' />
                        <img src={ap} width='100'style={{marginLeft:20 }}/> */}
                    </div>
                </Grid>
                
                <Grid item xs={12} style={{marginLeft:50}}>
                <div style={{fontSize:20}} >Email Us</div>
                <div style={{marginLeft:-50,marginTop:-20}} ><EmailIcon fontSize="large"/></div>
                <div style={{fontSize:20,marginTop:-25}} >info@MedBazzar.com</div>
                    
                </Grid>

                <Grid item xs={12} style={{marginLeft:50,marginTop:20}}>
                <div style={{fontSize:20}} >Give Us a missed call</div>
                <div style={{marginLeft:-55,marginTop:-20}} ><WifiCalling3Icon  fontSize="large"/></div>
                <div style={{fontSize:20,marginTop:-25}} >9516164015</div>
                    
                </Grid>

                <Grid item xs={12} style={{marginTop:5}}>
                    <hr/>
                </Grid>

                <Grid item xs={12} style={{marginTop:10}}>
                    <div>2 Months Of Trust</div>
                </Grid>

                <Grid item xs={12} style={{marginTop:-10}}>
                    <div>Over the last 2 months, we have touched the lives of lakhs of indian family by serving them with on the best quality and genuine health care products. with over 0+ stores, a comprehensive website and an easy-to-use app, it is only  true to say that medbazzar is the one-stop destinationfor your wellness needs to be not it online or offline .   Copyright MedBazzar 2024    </div>
                </Grid>



            </Grid>
        </div>
        </div>)
   
   

}