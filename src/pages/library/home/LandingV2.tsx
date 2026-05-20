import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { Box } from "@mui/material";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { ReactElement, SyntheticEvent, useEffect, useState } from "react";
import Card from '../../../components/Card';
import BookTable from './tables/Books.tsx'
import MangaTable from "./tables/Mangas.tsx";
import UserPage from "./UserPage.tsx"
import ItemLocationAccordion from './accordion/ItemLocation.tsx';


const LibraryLanding = (): ReactElement => {
    useEffect(() => {
        document.title = 'Biblioteca';
    }, [])

    const [selectedTab, setSelectedTab] = useState(0);

    const handleTabChange = (event: SyntheticEvent, newValue: number) => {
        console.log(event);
        setSelectedTab(newValue);
    };

    return (
        <div className="container">
            <Box>
                <TabContext value={String(selectedTab)}>
                    <Tabs
                        value={selectedTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab label="Resumo de <Username>" value={0} />
                        <Tab label="Livros" value={1} />
                        <Tab label="Mangás" value={2} />
                        <Tab label="Localização" value={3} />
                    </Tabs>
                    <TabPanel value="0">
                        <Card>
                            <Card.Body>
                                <UserPage />
                            </Card.Body>
                        </Card>
                    </TabPanel>
                    <TabPanel value="1">
                        <Card>
                            <Card.Body>
                                <BookTable />
                            </Card.Body>
                        </Card>
                    </TabPanel>
                    <TabPanel value="2">
                        <Card>
                            <Card.Body>
                                <MangaTable />
                            </Card.Body>
                        </Card>
                    </TabPanel>
                    <TabPanel value="3">
                        <Card>
                            <Card.Body>
                                <ItemLocationAccordion />
                            </Card.Body>
                        </Card>
                    </TabPanel>
                </TabContext>
            </Box>
        </div>
    )
}

export default LibraryLanding;