import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
// import logo from "../../assests/logo.png"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {serverURL} from "../../services/FetchNodeServices"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createRef } from "react";

import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Grid } from '@mui/material';
import PlusMinusComponent from './PlusMinusComponent';
export default function ProductComponent(props) {

  const theme = useTheme();
  var sld = createRef();
 

  var product = [
    
    {
      productdetailid: 3,
      categoryid: 8,
      subcategoryid: 9,
      brandid: 3,
      productid: 6,
      productsubname: "zzz",
      weight: 275,
      weighttype: "ml",
      type: "cream",
      packaging: "box",
      qty: 8,
      price: 275,
      offerprice: 0,
      offertype: "eos",
      description: "Ponds Body Care Lotion, ",
      picture: "ponds.jpg",
      concernid: 2,
    },
    {
      productdetailid: 4,
      categoryid: 9,
      subcategoryid: 10,
      brandid: 4,
      productid: 7,
      productsubname: "aa",
      weight: 340,
      weighttype: "ml",
      type: "shampoo",
      packaging: "bottle",
      qty: 7,
      price: 319,
      offerprice: 300,
      offertype: "eos",
      description: "Loreal Paris Shampoo, ",
      picture: "coolex.jpg",
      concernid: 3,
    },
    {
      productdetailid: 5,
      categoryid: 10,
      subcategoryid: 11,
      brandid: 5,
      productid: 8,
      productsubname: "b",
      weight: 80,
      weighttype: "gm",
      type: "spray",
      packaging: "bottle",
      qty: 12,
      price: 180,
      offerprice: 0,
      offertype: "eos",
      description: "Coolex Pain Relief Spray, ",
      picture: "coolex.jpg",
      concernid: 4,
    },
    {
      productdetailid: 6,
      categoryid: 11,
      subcategoryid: 12,
      brandid: 6,
      productid: 9,
      productsubname: "c",
      weight: 1,
      weighttype: "kg",
      type: "drink",
      packaging: "box",
      qty: 9,
      price: 1533,
      offerprice: 1500,
      offertype: "eos",
      description: "Ensure Balance Nutrition , ",
      picture: "pediasure.jpg",
      concernid: 5,
    },
    {
      productdetailid: 7,
      categoryid: 12,
      subcategoryid: 13,
      brandid: 7,
      productid: 10,
      productsubname: "d",
      weight: 100,
      weighttype: "ml",
      type: "shampoo",
      packaging: "bottle",
      qty: 10,
      price: 275,
      offerprice: 0,
      offertype: "eos",
      description: "Ketoconazole Shampoo, ",
      picture: "ponds.jpg",
      concernid: 6,
    },
    {
      productdetailid: 8,
      categoryid: 13,
      subcategoryid: 14,
      brandid: 8,
      productid: 11,
      productsubname: "e",
      weight: 400,
      weighttype: "gm",
      type: "drink",
      packaging: "box",
      qty: 60,
      price: 600,
      offerprice: 612,
      offertype: "eos",
      description: "Protinex  Health  Nutrition Drink, ",
      picture: "protinex.jpg",
      concernid: 7,
    },
    {
      productdetailid: 9,
      categoryid: 14,
      subcategoryid: 15,
      brandid: 9,
      productid: 12,
      productsubname: "f",
      weight: 400,
      weighttype: "gm",
      type: "drink",
      packaging: "box",
      qty: 55,
      price: 653,
      offerprice: 0,
      offertype: "eos",
      description: "PediaSure Health Drink, ",
      picture: "pediasure.jpg",
      concernid: 8,
    },
    {
      productdetailid: 10,
      categoryid: 15,
      subcategoryid: 16,
      brandid: 10,
      productid: 13,
      productsubname: "g",
      weight: 25,
      weighttype: "mg",
      type: "cream",
      packaging: "box",
      qty: 20,
      price: 275,
      offerprice: 0,
      offertype: "eos",
      description: "Vicks Vaporup For Cold, ",
      picture: "vicks.jpg",
      concernid: 9,
    },
   
  ];

  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: matchesMd ? 3:  7 ,
    slidesToScroll: 2,
    
  };

  const handleForward = () => {
    sld.current.slickPrev();
  };

  const handleBackward = () => {
    sld.current.slickNext();
    
  };


  const showSlide = (item) => {
    const images = item.picture.split(",");
    return images.map((image, index) => (
      <div >
        <img
          src={`${serverURL}/images/${image}`}
          style={{ width: "80%", display:'block' ,marginRight:'auto',marginLeft:'auto' }}
        />
      </div>
    ));
  };

  const ProductDetail = () =>{
    return product.map((item) => {
      return(
      <div>
        <div 
        style={{
          fontFamily:'kanit',
          width:'80%',
          height:'auto',
          display: "flex",
          justifyContent: "center",
          margin:'0 auto',
        }}>
          <Grid container spacing={1}>
            <Grid item xs={12}
            style={{display:'flex',justifyContent:'right'}}>
              <BookmarkAddOutlinedIcon/>
            </Grid>

            <Grid item xs={12}>

              {showSlide(item)}
              
            </Grid>
            
            
            <Grid item xs={12}
             style={{
              fontWeight:'bold',
              fontSize:  "1.0em",
              display:'flex',
              margin:2,
              overflow: "hidden",
              textOverflow:'ellipsis',
              display:'-webkit-box',
              WebkitLineClamp:"2",
              WebkitBoxOrient:'vertical'
              }}>
              {item.description}
              {item.weight} {item.weighttype}
            </Grid>


            <Grid item xs={12}
                style={{
                  fontSize: matchesMd ? "0.9em" : "1.2em",
                  display: "flex",
                  marginTop: -5,
                  fontWeight: "bolder ",
                  

                }}
              >
              {item.offerprice==0?  

                <span>
                   &#x20B9;{item.price}
                </span>

                :

                <div>
                   <span style={{fontWeight:600,color:'grey',textDecoration:"line-through",marginRight:5}}>
                      &#x20B9;{item.price}
                   </span>

                  <span> 
                    &#x20B9;{item.offerprice}
                  </span>

               </div>
              }
            </Grid>

            <Grid item xs={12} style={{marginTop:-10}}>
                <hr/>
            </Grid>

            <Grid item xs={12} style={{marginTop:-15, display:'flex',alignItems:'center'}}>
              <span ><AccessTimeFilledIcon style={{fontSize:matchesMd?'0.9em':'1.2em',marginBottom:-4}}/></span>
              <span style={{fontSize:matchesMd?'0.6em':'0.8em'}}>Delivery Within </span>
              <span style={{fontSize:matchesMd?'0.6em':'0.8em',fontWeight:'bolder',marginLeft:2 }}>1-3 Days</span>
            </Grid>

            <Grid item xs={12} style={{ display: "flex",alignItems:'center' }}>
              <Grid item xs={6} style={{}}>
                  <PlusMinusComponent/>
                </Grid>

                <Grid item xs={6}>
                  <Button
                      variant="text"
                       style={{color:'#fff',marginLeft:15,background:'#000',fontSize:matchesMd ? '0.2em':'0.6em'}}
                      

                    >
                     Buy Now
                  </Button>
                </Grid>
            </Grid>

          </Grid>

        </div>

      </div>)
    })
  }

  return(<div style={{width:'95%',position:'relative',fontFamily:'kanit'}}>
    <div style={{ fontWeight: "bold",fontSize: 17, margin: "5px 0px 15px 15px",}}>
      {props?.title}

    </div>
    {matchesMd?<div></div>:<div>
    <div
        style={{
          display: "flex",
          width: 35,
          height: 35,
          borderRadius: 19,
          background: "#bdc3c7",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.6,
          position: "absolute",
          zIndex: 2,
          top: "40%",
          left: "0.09%",
        }}
      >
      <ArrowBackIosIcon  onClick={handleBackward} />
      </div>

      <div
        style={{
          display: "flex",
          width: 35,
          height: 35,
          borderRadius: 19,
          background: "#bdc3c7",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          opacity: 0.6,
          position: "absolute",
          zIndex: 2,
          top: "40%",
          right: "0.09%",
          cursor: "pointer",
        }}
      >
     <ArrowForwardIosIcon onClick={handleForward} />
      </div>

      </div>}
    <Slider {...settings}  ref={sld}>
        {ProductDetail()}
      </Slider>

  </div>)

}