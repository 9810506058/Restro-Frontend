import { createBrowserRouter } from "react-router";
import TestProvider from "./Context/Authcontext";
import Layout from "./Layout/Layout";
import Home from "./pages/home";
import Login from "./pages/Loginpage";
import Welcome from "./pages/Welcome";
import Resturantpage from "./pages/Resturantpage";
import UploadHotel from "./pages/uploadhotel";
import AdminMenuPage from "./pages/Adminmenupage";

const routers = createBrowserRouter([{
    path:"/",
    element:
 <TestProvider>
    <Layout/></TestProvider>,
    children:[
        {path:"/home",element:<Home/> },
        {path:"/login",element:<Login/>},
     {path:"/welcome" ,element:<Welcome />},
     {path:"/hotel",element:<Resturantpage/>},
     {path:"/upload",element:<UploadHotel/>},
     {path:"/menu",element:<AdminMenuPage/>}
       

    ]
        
    }]
)
export default routers