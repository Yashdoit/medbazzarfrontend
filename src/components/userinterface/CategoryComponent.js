import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../services/FetchNodeServices";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createRef } from "react";


export default function CategoryComponent(props)
{
    var sld = createRef()

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
    };

    var categories = [{categoryid:1,categoryname:'zzz',picture:'c1.webp,c2.webp,c3.webp,c4.webp,c5.webp,c6.webp,c7.webp,c8.webp'}]
    var cImages = Object.values(categories)[0].picture.split(',')
    const categorySlide=()=>{
        return cImages.map((item)=>{
            return<div><img src={`${serverURL}/images/${item}`} style={{width:'80%',marginLeft:'auto',marginRight:'auto',borderRadius:10,height:'auto',display:'block'}} /></div>
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
            <div style={{display:'flex',alignItems:'center',}} ><h4><b>Browse By Category</b></h4></div>
            <div style={{position:'absolute',zIndex:2,top:123,display:'flex',justifyContent:'center',alignItems:'center',width:40,height:40,borderRadius:20,background:'#d3d3d382'}} >
                <ArrowBackIosIcon onClick={handleBackward} />
            </div>
            <Slider ref={sld} {...settings}>
                {categorySlide()}
            </Slider>
            <div style={{position:'absolute',zIndex:2,top:123,right:1,display:'flex',justifyContent:'center',alignItems:'center',width:40,height:40,borderRadius:20,background:'#d3d3d382'}} >
                <ArrowForwardIosIcon onClick={handleForward} />
            </div>
        </div>
    )





}