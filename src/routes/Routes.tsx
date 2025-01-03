import {lazy, ReactElement, FC} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import WithoutNav from './WithoutNav'
import Landing from '../pages/Landing'
import WithNav from "./WithNav.tsx";

const Investment: FC = lazy(() => import('../pages/finance/investment/landing'))

function RolfRoutes(): ReactElement {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<WithNav/>}>
                    <Route element={<Landing/>} path={''}></Route>
                    <Route element={<Landing/>} path={'/test'}/>

                    <Route element={<Investment/>} path="/finance/investment"/>
                </Route>
            </Routes>
            <Routes>
                <Route element={<WithoutNav/>}>

                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RolfRoutes;