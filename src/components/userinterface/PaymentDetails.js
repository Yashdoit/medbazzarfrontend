import { Grid,Radio,FormControlLabel,RadioGroup, Button } from "@mui/material"
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';




export default function PaymentDetails(){

    var productDetails = [{productdetailid:1, categoryid:2, subcategoryid:3, brandid:4, productid:5, productsubname:'RedBull', weight:250, weighttype:'ml', type:'packet', packaging:'box', qty:3, price:125, offerprice:120, offertype:'Dhamaka', description:'Energy drink, Sugar free', picture:'p1.png'},
    {productdetailid:2, categoryid:3, subcategoryid:4, brandid:5, productid:6, productsubname:'xc', weight:10, weighttype:'ml', type:'packet', packaging:'box', qty:3, price:125, offerprice:120, offertype:'Dhamaka', description:'sdsfb', picture:'p1.png'},
    {productdetailid:3, categoryid:4, subcategoryid:5, brandid:6, productid:7, productsubname:'xc', weight:10, weighttype:'ml', type:'packet', packaging:'box', qty:3, price:125, offerprice:120, offertype:'Dhamaka', description:'sdsfb', picture:'p1.png'}
]

        return(
            <div>
                <Grid container spacing={2} style={{fontFamily:'kanit'}} >
        
                    <Grid item xs={12} style={{fontSize:18,fontWeight:'bold'}} >
                        Payment Details
                    </Grid>
        
                    <Grid item xs={6} style={{fontSize:15,}} >
                        Subtotal
                    </Grid>
        
                    <Grid item xs={6} style={{fontSize:18,display:'flex',justifyContent:'center',alignItems:'center'}} >
                    &#8377;000
                    </Grid>
        
                    <Grid item xs={6} style={{fontSize:15,}} >
                        Medicine Discount (0)%
                    </Grid>
        
                    <Grid item xs={6} style={{fontSize:11,display:'flex',justifyContent:'center',alignItems:'center'}} >
                    &#8377;000
                    </Grid>
        
                    <Grid item xs={6} style={{fontSize:15,}} >
                        Coupon Discount
                    </Grid>
        
                    <Grid item xs={6} style={{fontSize:11,display:'flex',justifyContent:'center',alignItems:'center'}} >
                        &#8377;000
                    </Grid>
                    
                    <div style={{ fontSize:16,padding:5,fontWeight:'bold',display:'flex',justifyContent:'space-evenly',background:'yellow',width:'100%',borderRadius:10,marginTop:10}} >
                        <div>
                            Order Total
                        </div>
                        <div>
                        &#8377;000
                        </div>
                    </div>

                    <div style={{fontSize:13,margin:10,color:'gray'}} >
                        <i>Price may vary depending on the product batch*</i>
                    </div>
        
                </Grid>

                <hr/>

                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}} >
                    <div>
                        <div style={{display:'flex',alignItems:'center'}} >
                            <span><LocalOfferOutlinedIcon fontSize="small" color="warning" /></span> 
                            <span style={{fontFamily:'kanit',fontWeight:'bold',fontSize:15,marginLeft:4}} >Use Coupons</span>
                        </div>
                        <div style={{fontSize:12 ,fontFamily:'kanit',color:'GrayText'}} >Also get a gift code after placing this order</div>
                    </div>

                    <div>
                        <ArrowForwardIosIcon fontSize="small" />
                    </div>
                </div>

                <hr/>

                <div>

                    <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly',background:'#ffc43d',borderTopLeftRadius:10,borderTopRightRadius:10,padding:5}} >
                        <InfoOutlinedIcon fontSize="small" />
                        <p style={{fontFamily:'kanit',fontSize:13}} >Shop above 600.00 to get free delivery</p>
                    </div>

                    
                        <div style={{background:'lightgrey',paddingLeft:5}} >
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="D"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel value="D" control={<Radio size="small" />} label="Get it Delivered" />
                            <FormControlLabel value="P" control={<Radio size="small" />} label="Pick up from store" style={{marginLeft:'auto'}}/>
                            </RadioGroup>
                        </div>

                        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',borderBottomLeftRadius:10,borderBottomRightRadius:10,paddingLeft:10,padding:10,border:'solid 1px #00000021'}} >
                            <div>
                                <div style={{fontSize:13}} >{productDetails.length} ITEM</div>
                                <div>&#8377;000</div>
                            </div>

                            <div>
                                <Button color="success" variant="contained" size="small"> Login to proceed </Button>
                            </div>
                        </div>
                    
                </div>

                <hr style={{marginTop:20}} />

                <div style={{fontFamily:'kanit',fontWeight:'bold',fontSize:17}} >
                    Delivery Instruction
                </div>

                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}} >
                    <div style={{display:'flex',alignItems:'center'}} >
                        <DeliveryDiningOutlinedIcon size="large" />
                        <p style={{marginLeft:10,fontFamily:'kanit',fontSize:15,fontWeight:'bold'}} >Add Delivery Instructions</p>
                    </div>
                    <div>
                    <ArrowForwardIosIcon fontSize="small" />
                    </div>
                </div>



            </div>
            )

}