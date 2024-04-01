import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../Pages/Layout/HomeLayout";
import MainPages from "../Pages/MainPage";

const myBrowser = createBrowserRouter([
    {
        path:"/",
        element:<HomeLayout></HomeLayout>,
        children:[
            {
                path:'/',
                element:<MainPages></MainPages>
            }
        ]
        
    }
])
export { myBrowser };