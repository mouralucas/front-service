import Header from "../components/Header.tsx";
import {Suspense} from "react";
import {Outlet} from "react-router-dom";
import Loader from '../components/Loader'


const App = () => {
    return (
        <>
            <Header />
            <Suspense fallback={<Loader />}>
                <Outlet/>
            </Suspense>
        </>
    )
}

export default App;