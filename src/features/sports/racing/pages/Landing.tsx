import { Grid } from "@mui/material";
import { ReactElement } from "react"
import EventResultTable from "../components/tables/EventResultTable";


const CarRaceLanding = (): ReactElement => {
    return (
         <div className="container">
            <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                <EventResultTable />
                </Grid>
            </Grid>
         </div>
    )
}

export default CarRaceLanding;