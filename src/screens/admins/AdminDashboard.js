import { DashboardStyle } from "./AdminDashboardCss"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Divider, Grid, ListItemButton, ListItemIcon } from "@mui/material";
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DraftsIcon from '@mui/icons-material/Drafts';
import LogoutIcon from '@mui/icons-material/Logout';

import Brands from "./Brands";
import Categories from "./Categories";
import DisplayAllCategory from "./DisplayAllCategory";
import DisplayAllBrands from "./DisplayAllBrands";
import SubCategory from "./SubCategory";
import DisplayAllSubCategory from "./DisplayAllSubCategory";
import { BrowserRouter as Router,Routes,Route, useNavigate } from "react-router-dom";
import Products from "./Products";
import DisplayAllProducts from "./DisplayAllProducts";
import ProductDetails from "./ProductDetails"
import DisplayAllProductDetails from "./DisplayAllProductDetails"
import Banner from "./Banner";
import Concern from "./Concern"
import { serverURL } from "../../services/FetchNodeServices";

export default function AdminDashboard(){
    const classes = DashboardStyle()
    const navigate = useNavigate()
    var adminData = JSON.parse(localStorage.getItem("ADMIN"))

    return(
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="sticky" >
                <Toolbar variant="dense">
                    <Typography variant="h6" component="div" sx={{flexGrow: 1 }} >
                     MedBazzar
                    </Typography>
                </Toolbar>
            </AppBar>
            <Grid container space={3} style={{paddingInlineStart:5}} >
                 <Grid item xs={2.2} >
                    <Paper>
                        <div className={classes.leftBarStyle} >
                            <img src={`${serverURL}/images/${adminData.picture}`} width={70} style={{borderRadius:35}}/>
                            <div className={classes.nameStyle} >{adminData.adminname}</div>
                            <div className={classes.emailStyle} >{adminData.emailid}</div>
                            <div className={classes.phoneStyle} >+91 {adminData.mobileno}</div>
                        </div>
                        <div className={classes.menuStyle} >
                            <List>
                                <Divider/>
                                <ListItem disablePadding >
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <DashboardIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={<span className={classes.menuItemStyle}>Dashboard</span>}/>
                                    </ListItemButton>
                                </ListItem>


                                <ListItem disablePadding >
                                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallcategory')} >
                                        <ListItemIcon>
                                            <DraftsIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={<span className={classes.menuItemStyle}>Category List</span>} />
                                    </ListItemButton>
                                </ListItem>


                                <ListItem disablePadding >
                                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallsubcategory')}  >
                                        <ListItemIcon>
                                            <DraftsIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={<span className={classes.menuItemStyle}>Sub Categories</span>}/>
                                    </ListItemButton>
                                </ListItem>


                                <ListItem disablePadding >
                                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallbrands')}  >
                                        <ListItemIcon>
                                            <DraftsIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={<span className={classes.menuItemStyle}>Brands List</span>}/>
                                    </ListItemButton>
                                </ListItem>


                                <ListItem disablePadding >
                                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallproducts')}  >
                                        <ListItemIcon>
                                            <DraftsIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={<span className={classes.menuItemStyle}>Products List</span>}/>
                                    </ListItemButton>
                                </ListItem>


                                <ListItem disablePadding >
                                    <ListItemButton onClick={()=>navigate('/admindashboard/displayallproductdetails')}  >
                                        <ListItemIcon>
                                            <DraftsIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={<span className={classes.menuItemStyle}>ProductDetails List</span>}/>
                                    </ListItemButton>
                                </ListItem>


                                <ListItem disablePadding >
                                    <ListItemButton onClick={()=>navigate('/admindashboard/concern')}  >
                                        <ListItemIcon>
                                            <DraftsIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={<span className={classes.menuItemStyle}>Add Concern</span>}/>
                                    </ListItemButton>
                                </ListItem>


                                <ListItem disablePadding >
                                    <ListItemButton onClick={()=>navigate('/admindashboard/banner')}  >
                                        <ListItemIcon>
                                            <DraftsIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={<span className={classes.menuItemStyle}>Banner</span>}/>
                                    </ListItemButton>
                                </ListItem>


                                <ListItem disablePadding >
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <DraftsIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={<span className={classes.menuItemStyle}>Sales Report</span>}/>
                                    </ListItemButton>
                                </ListItem>

                                <Divider/>
                                <ListItem disablePadding >
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <LogoutIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={<span className={classes.menuItemStyle}>Log out</span>}/>
                                    </ListItemButton>
                                </ListItem>


                            </List>

                        </div>
                    </Paper>
                </Grid>
                    <Grid item xs={9.8} style={{padding:20}}>
                        <Routes>

                            <Route element={<Categories/>} path={'/category'} />
                            <Route element={<DisplayAllCategory/>} path={'/displayallcategory'} />

                            <Route element={<Brands/>} path={'/brands'} />
                            <Route element={<DisplayAllBrands/>} path={'/displayallbrands'} />

                            <Route element={<SubCategory/>} path={'/subcategory'} />
                            <Route element={<DisplayAllSubCategory/>} path={'/displayallsubcategory'} />

                            <Route element={<Products/>} path={'/products'} />
                            <Route element={<DisplayAllProducts/>} path={'/displayallproducts'} />

                            <Route element={<ProductDetails/>} path={'/productdetails'} />
                            <Route element={<DisplayAllProductDetails/>} path={'/displayallproductdetails'} />

                            <Route element={<Banner/>} path={'/banner'} />

                            {/* <Route element={<AdminLogin/>} path={'/admins'} /> */}
                            <Route element={<AdminDashboard/>} path={'/admindashboard/*'}/>

                            <Route element={<Concern/>} path={'/concern'}/>

                        </Routes>
                    </Grid>
        </Grid>
    </Box>
    )
}