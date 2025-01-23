import {lazy, ReactElement, FC} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import WithoutNav from './WithoutNav'
import Landing from '../pages/Landing'
import WithNav from "./WithNav.tsx";
import Login from '../pages/user/Login.tsx'
import RequireAuth from "../services/auth/RequireAuth.tsx";

const Error404: FC = lazy(() => import('../pages/errors/404'))
const Investment: FC = lazy(() => import('../pages/finance/investment/Landing'))
const FinanceLanding: FC = lazy(() => import('../pages/finance/records/Landing.tsx'))
const LibraryLanding: FC = lazy(() => import('../pages/library/home/Landing.tsx'))
const LibraryBackoffice: FC = lazy(() => import('../pages/library/backoffice/Landing'));


function RolfRoutes(): ReactElement {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<WithNav/>}>
                    {/* Default page */}
                    <Route element={<Landing/>} path={'/'}></Route>

                    {/* Finance */}
                    <Route element={<RequireAuth><Investment/></RequireAuth>} path="/finance/investment"/>
                    <Route element={<RequireAuth><FinanceLanding/></RequireAuth>} path="/finance/records"/>

                    {/* Library */}
                    <Route element={<RequireAuth><LibraryLanding/></RequireAuth>} path={'/library/records'} />
                    <Route element={<RequireAuth><LibraryBackoffice/></RequireAuth>} path={'/library/backoffice'} />
                </Route>
                <Route element={<WithoutNav/>}>
                    <Route element={<Login />} path={'/login'}/>
                    <Route element={<Error404/>} path="*"/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RolfRoutes;