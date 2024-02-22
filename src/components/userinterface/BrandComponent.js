import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../services/FetchNodeServices";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createRef } from "react";


export default function BrandComponent(props)
{
    var sld = createRef()

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
    };

    var brands = [{brandid:1,brandname:'dgh',brandicon:'b1.webp,b2.webp,b3.webp,b4.webp,b5.webp,b6.webp,b7.webp,b8.webp,b9.webp'}]
    var bImages = Object.values(brands)[0].brandicon.split(',')
    const brandSlide=()=>{
        return bImages.map((item)=>{
            return<div><img src={`${serverURL}/images/${item}`} style={{width:'80%',marginLeft:'auto',marginRight:'auto',boxShadow:'1px 1px 10px 0px #00000045',height:'auto',display:'block'}} /></div>
        })
    } 



    const handleForward=()=>{
        sld.current.slickNext()
    }

    const handleBackward=()=>{
        sld.current.slickPrev()
    }




    return(
        
        <div style={{width:'95%',position:'relative'}} >
            <div style={{display:'flex',alignItems:'center',}} ><h4><b>Brands</b></h4></div>
            <div style={{position:'absolute',zIndex:2,top:123,display:'flex',justifyContent:'center',alignItems:'center',width:40,height:40,borderRadius:20,background:'#d3d3d382'}} >
                <ArrowBackIosIcon onClick={handleBackward} />
            </div>
            <Slider ref={sld} {...settings}>
                {brandSlide()}
            </Slider>
            <div style={{position:'absolute',zIndex:2,top:123,right:1,display:'flex',justifyContent:'center',alignItems:'center',width:40,height:40,borderRadius:20,background:'#d3d3d382'}} >
                <ArrowForwardIosIcon onClick={handleForward} />
            </div>
        </div>
    )





}