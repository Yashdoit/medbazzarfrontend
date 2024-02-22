import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../services/FetchNodeServices";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createRef } from "react";


export default function SliderComponent(props)
{
    var sld = createRef()

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay:true
      };
    var banners = [{bannerid:1,brandid:2,bannertype:'xx',picture:'1.webp,2.webp,3.webp,4.webp,5.webp,6.webp'}]
    var images = Object.values(banners)[0].picture.split(',')
    const showSlide=()=>{
        return images.map((item)=>{
            return<div><img src={`${serverURL}/images/${item}`} style={{width:'95%',marginLeft:'auto',marginRight:'auto',borderRadius:10,height:'auto',display:'block'}} /></div>
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
            <div style={{position:'absolute',zIndex:2,top:70,display:'flex',justifyContent:'center',alignItems:'center',width:40,height:40,borderRadius:20,background:'#d3d3d382'}} >
                <ArrowBackIosIcon onClick={handleBackward} />
            </div>
            <Slider ref={sld} {...settings}>
                {showSlide()}
            </Slider>
            <div style={{position:'absolute',zIndex:2,top:70,right:1,display:'flex',justifyContent:'center',alignItems:'center',width:40,height:40,borderRadius:20,background:'#d3d3d382'}} >
                <ArrowForwardIosIcon onClick={handleForward} />
            </div>
        </div>
    )
}