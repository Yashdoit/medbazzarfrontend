import BrandComponent from "../../components/userinterface/BrandComponent"
import CategoryComponent from "../../components/userinterface/CategoryComponent"
import Header  from "../../components/userinterface/Header"
import MenuBar from "../../components/userinterface/MenuBar"
import SliderComponent from "../../components/userinterface/SliderComponent"
import ProductComponent from "../../components/userinterface/ProductComponent"
import FooterComponent from "../../components/userinterface/FooterComponent"
import PlusMinusComponent from "../../components/userinterface/PlusMinusComponent"

export default function Home()
{
    return(<div>
        <Header/>
        {/* <MenuBar/> */}
        <div style={{display:'flex',justifyContent:'center',marginTop:20}} >
            <SliderComponent/>
        </div> 

         <div style={{display:'flex',justifyContent:'center',marginTop:20}} >
            <BrandComponent/>
        </div>

        <div style={{display:'flex',justifyContent:'center',marginTop:20}} >
            <CategoryComponent/>
        </div>

        <div style={{display:'flex',justifyContent:'center',marginTop:20}} >
            <ProductComponent/>
        </div>

        <div style={{marginTop:20}} >
            <FooterComponent/>
        </div>

        {/* <div style={{display:'flex',justifyContent:'center',marginTop:20}} >
            <ProductDetailsComponent/>
        </div> */}
        
        <PlusMinusComponent/>
        
        </div>)
}