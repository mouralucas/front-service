import { useQuery } from '@apollo/client';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { ReactElement } from "react";
import { apolloLibraryClient } from '../../../../../services/apollo/client/ApolloLibraryService';
import { GetItemsByLocationQuery } from '../../../type/ItemQueries';
import { QUERY_ITEM_BY_LOCATION } from '../../../api/queries';
import DataGrid from '../../../../../components/table/DataGrid';
import { Item } from '../../../type/Item';
import { GridColDef } from '@mui/x-data-grid';


const ItemLocationAccordion = (): ReactElement => {

    const { data: itemByLocationData } = useQuery<GetItemsByLocationQuery>(QUERY_ITEM_BY_LOCATION, {
        client: apolloLibraryClient,
    })

    const itemLocations = itemByLocationData?.getItemsByLocation ?? [];

    const columns: GridColDef<Item>[] = [
        { field: 'id', headerName: 'Id', flex: 1 },
        { field: 'mainAuthorId', headerName: 'Autor', flex: 1 },
        { field: 'title', headerName: 'Título', flex: 2.5 },
        { field: 'physicalLocation', headerName: 'Localização', flex: 3}
    ]


    return (
        <>
            {itemLocations.map((itemLocation, index: number) => {
                const itemLocationName = itemLocation?.locationName ?? `Location ${index + 1}`;
                const panelId = `item-location-${itemLocationName.replace(/\s+/g, '-').toLowerCase()}`;

                return (
                    <Accordion key={panelId}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`${panelId}-content`}
                            id={`${panelId}-header`}
                        >
                            <Typography component="span">{itemLocationName}</Typography>
                        </AccordionSummary>

                        <AccordionDetails>
                            <DataGrid
                                columns={columns}
                                data={itemLocation.items}
                            />
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </>
    )
}

export default ItemLocationAccordion;