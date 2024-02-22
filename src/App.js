// import Brands from "./screens/admins/Brands";
// import Categories from "./screens/admins/Categories";
// import DisplayAllCategory from "./screens/admins/DisplayAllCategory";
// import DisplayAllBrands from "./screens/admins/DisplayAllBrands";
// import SubCategory from "./screens/admins/SubCategory";
// import DisplayAllSubCategory from "./screens/admins/DisplayAllSubCategory";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
// import Products from "./screens/admins/Products";
// import DisplayAllProducts from "./screens/admins/DisplayAllProducts";
// import ProductDetails from "./screens/admins/ProductDetails"
// import DisplayAllProductDetails from "./screens/admins/DisplayAllProductDetails"
import AdminLogin from "./screens/admins/AdminLogin";
import AdminDashboard from "./screens/admins/AdminDashboard";
import Home from "./screens/userinterface/Home";
import ProductDetails from "./screens/userinterface/ProductDetails";
import Carts from "./screens/userinterface/Carts";
// import PlusMinusComponent from "./components/userinterface/PlusMinusComponent";
// import Banner from "./screens/admins/Banner";
function App() {
  return (
    <div>
       <Router>
        <Routes>
          {/* <Route element={<Categories/>} path={'/category'} />
          <Route element={<DisplayAllCategory/>} path={'/displayallcategory'} />

          <Route element={<Brands/>} path={'/brands'} />
          <Route element={<DisplayAllBrands/>} path={'/displayallbrands'} />

          <Route element={<SubCategory/>} path={'/subcategory'} />
          <Route element={<DisplayAllSubCategory/>} path={'/displayallsubcategory'} />

          <Route element={<Products/>} path={'/products'} />
          <Route element={<DisplayAllProducts/>} path={'/displayallproducts'} />

          <Route element={<ProductDetails/>} path={'/productdetails'} />
          <Route element={<DisplayAllProductDetails/>} path={'/displayallproductdetails'} />

          <Route element={<Banner/>} path={'/banner'} /> */}

          <Route element={<AdminLogin/>} path={'/admins'} />
          <Route element={<AdminDashboard/>} path={'/admindashboard/*'}/>

          <Route element={<Home/>} path={'/home'}/>

          <Route element={<ProductDetails/>} path={'/productdetails'} />

          <Route element={<Carts/>} path="/carts" />

          {/* <Route element={<PlusMinusComponent/>} path="/plusminus" /> */}

        </Routes>
      </Router>
    </div>
  );
}

export default App;
