import { Button } from "@mui/material"





export default function ProductInformation()
{
    return(
    //    <div style={{width:'100%',display:'flex',justifyContent:'center',background:'#d3d3d324'}} >
        <div style={{width:'100%',padding:10}} >
        <div style={{fontWeight:'bold',fontSize:18}} >Redbull Energy Drink, 250ml sugar free</div>
        <div style={{fontWeight:'bold',fontSize:13}} ><a href="#">Be the First One to Review</a></div>
        <div style={{fontWeight:'bold',fontSize:25}} >&#8377;125</div>
        <span style={{fontWeight:'bold',fontSize:10}} >(incl. all Taxes)</span>
        <hr/>
        <div style={{fontWeight:'bold',fontSize:18,color:'grey'}} >
            <s>MRP:&#8377;150</s>
            <span style={{margin:5,color:'black'}} >(save &#8377;25)</span>
        </div>

        <div style={{marginTop:20,}} >
            <div>
                <div style={{marginBottom:10,fontWeight:'bold',fontSize:15}}>Weight-Type</div>
            <Button style={{marginRight:10}} type="radio" variant="outlined" >Ml</Button>
            <Button style={{marginRight:10}} type="radio" variant="outlined" >Ltr</Button>
            <Button style={{}} type="radio" variant="outlined" >MM</Button>
            </div>
        </div>

        <div style={{marginTop:20,}} >
            <div>
                <div style={{marginBottom:10,fontWeight:'bold',fontSize:15}}>Type</div>
            <Button style={{marginRight:10}} type="radio" variant="outlined" >Bottle</Button>
            <Button style={{marginRight:10}} type="radio" variant="outlined" >Strips</Button>
            <Button style={{}} type="radio" variant="outlined" >Packs</Button>
            </div>
        </div>

        <h3>Super Saving (2 Offers)</h3>
        <div><hr/></div>
        <div style={{display:'flex',}} >
            <div style={{border:'solid 1px',width:130,borderRadius:10,marginRight:10,padding:10}} >
                <div style={{color:'orangered'}} >ICICI Bank</div>
                <hr/>
                <p style={{fontSize:10}} >Rs.50 Instant Discount on ICICI Bank Credit Card on Mobile selected products. Select the offer from...</p>
                <span style={{fontSize:10}} >View all..</span>
                
            </div>

            <div style={{border:'solid 1px',width:130,borderRadius:10,padding:10}}>
                <div style={{color:'lightblue'}} >SBI Bank</div>
                <hr/>
                <p style={{fontSize:10}} >Rs.50 Cashback on ICICI credit card transactions. Cashback will be credited in customers account after...</p>
                <span style={{fontSize:10}} >View all..</span>
            </div>
        </div>

        <div style={{border:'solid 1px',marginTop:20,padding:10,borderRadius:10}} >
            <div style={{fontSize:18,fontWeight:'bold'}} >Product Description</div>
            <hr/>
            <div style={{fontSize:13}} >
            Red Bull Energy Drink Sugarfree is a functional beverage and its formula contains high-quality ingredients such as caffeine, taurine, some B-group vitamins, sugars, and alpine water that help function neurological energy and metabolism. It leaves a positive impact on your physical performance while keeping you active throughout. Drink it on the go, at work, during lectures, while gaming, or when you're going out.
            </div>
        </div>

    </div>
    // </div> 
    )
}