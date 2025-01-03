import Header from "../components/Header.tsx";
import {Suspense} from "react";
import {Outlet} from "react-router-dom";


const App = () => {
    return (
        <>
            <Header />
            <Suspense fallback={<h2>Loading...</h2>}>
                <Outlet/>
            </Suspense>
        </>
    )
}

export default App;