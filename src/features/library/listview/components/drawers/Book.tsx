import { useQuery } from "@apollo/client";
import { Box, Button, Divider, LinearProgress, LinearProgressProps, Typography } from "@mui/material";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { ReactElement, useState } from "react";
import DrawerV2 from "../../../../../components/Drawer.tsx";
import { Item } from "../../../../../interfaces/Library.tsx";
import { apolloLibraryClient } from "../../../../../services/apollo/client/ApolloLibraryService.tsx";
import { QUERY_READING_STATS } from "../../../../../services/apollo/queries/Library.tsx";
import CreateReadingModal from "../modals/CreateReading.tsx";
import CreateReadingProgressModal from "../modals/CreateReadingProgress.tsx";
import ItemCard from "../../../../../components/ItemCard.tsx";


interface BookDrawerProps {
    openDrawerState: boolean;
    item: Item;
    onCloseDrawerClick: (e: any) => void;
};

const BookDrawer = (props: BookDrawerProps): ReactElement => {

    const [crateReadingProgressModalState, setCrateReadingProgressModalState] = useState<boolean>(false)
    const [createReadingModalState, setCrateReadingModalState] = useState<boolean>(false)

    const { data: statsData, refetch: refetchStats } = useQuery(QUERY_READING_STATS, {
        client: apolloLibraryClient,
        variables: { itemId: props.item?.id },
        skip: !props.openDrawerState,
    });


    // Flatten stats data
    const stats = statsData?.getReadingStats?.stats;

    // Create reading progress modal
    const showCreateReadingProgressModal = () => {
        setCrateReadingProgressModalState(true);
    }

    const hideCreateReadingProgressModal = () => {
        setCrateReadingProgressModalState(false);
        refetchStats();
    }

    // Create reading modal
    const showCreateReadingModal = () => {
        setCrateReadingModalState(true);
    }

    const hideCreateReadingModal = () => {
        setCrateReadingModalState(false);
        refetchStats();
    }

    const getStatusChipVariant = (): any => {
        if (props.openDrawerState) {
            if (props.item?.lastStatusId === 'lost') {
                return "danger";
            }

            return 'info';
        }

        return "undefined";
    }


    function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
        return (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                    <Typography
                        variant="body2"
                        sx={{ color: 'text.secondary' }}
                    >
                        {`${Math.round(props.value)}%`}
                    </Typography>
                </Box>
            </Box>
        );
    }

    const content: ReactElement =
        <Box display="flex" flexDirection="column" height="100%">
            {/* Toolbar */}
            <Box className="custom-toolbar">
                <Stack
                    direction="row"
                    spacing={2}
                    alignItems="flex-end"
                    sx={{ width: '100%' }}
                >
                    <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center' }} >
                        <Chip
                            label={props.item?.lastStatusName}
                            variant={getStatusChipVariant()}
                        />
                        <span className="contact-name"> | {props.item?.title}</span>
                    </Box>
                </Stack>
            </Box>

            {/* Cover + Main info */}
            <Stack direction="row" spacing={2} p={2}>
                <ItemCard
                    key={props.item.id}
                    coverUrl={props.item.cover}
                />
                <Stack spacing={2}>
                    <Box>
                        <div className="contact-name">Título</div>
                        <div>{props.item?.title}</div>
                        <div className="fw-light text-muted small">{props.item?.subtitle}</div>
                    </Box>
                    <Box>
                        <div className="contact-name">Autor</div>
                        <div>{props.item?.mainAuthorName}</div>
                        <div className="fw-light text-muted small">Owen King; Outro Autor; Mais um ainda</div>
                    </Box>
                    <Box>
                        <div className="contact-name">Páginas</div>
                        <div>{props.item?.pages}</div>
                    </Box>
                </Stack>
            </Stack>

            {/* Publisher + Serie */}
            <Stack direction="row" spacing={2} px={2}>
                <Box flex={1}>
                    <div className="contact-name">Editora</div>
                    <div>{props.item?.publisherName}</div>
                </Box>
                <Box flex={2}>
                    <div className="contact-name">Série</div>
                    <div>{props.item?.serieName}</div>
                </Box>
            </Stack>

            {/* ISBN */}
            <Stack direction="row" spacing={2} px={2}>
                <Box flex={1}>
                    <div className="contact-name">ISBN</div>
                    <div>{props.item?.isbn}</div>
                </Box>
            </Stack>

            <hr />

            {/* Reading stats */}
            <Box flex={1} overflow="auto" px={2} pb={2}>
                {(stats && stats?.readingsCount !== undefined && stats.readingsCount > 0) ? (
                    <>
                        <Stack direction="row" spacing={2}>
                            <Box flex={1}>
                                <div className="contact-name">Leituras</div>
                                <div>{stats?.readingsCount}</div>
                            </Box>
                            <Box flex={1}>
                                <div className="contact-name">Última leitura</div>
                                <div>{stats?.lastReadingDate}</div>
                            </Box>
                        </Stack>

                        {stats?.isCurrentlyReading ? (
                            // If currently reading, show current page and percentage, and button to add progress
                            <>
                                <Stack direction="row" spacing={2} mt={2}>
                                    <Box flex={1}>
                                        <div className="contact-name">Página atual</div>
                                        <div>{stats?.currentPage}</div>
                                    </Box>
                                    <Box flex={1}>
                                        <div className="contact-name">Perc. atual</div>
                                        <div>{stats?.currentPercentage}</div>
                                    </Box>
                                </Stack>
                                <Box >
                                    <LinearProgressWithLabel value={stats?.currentPercentage} />
                                </Box>
                                <Divider />
                                <Box mt={2}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={showCreateReadingProgressModal}
                                    >
                                        Adicionar Progresso
                                    </Button>
                                </Box>
                            </>
                        ) :
                            // If not currently reading, but already read once, show button to start a new reading
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={showCreateReadingModal}
                            >
                                Iniciar Nova Leitura
                            </Button>
                        }
                    </>
                ) :
                    // If no previous reading for the item, then show the button to start the first reading
                    stats?.readingsCount === 0 && (
                        <Box mt={2}>
                            <Button
                                fullWidth
                                variant='outlined'
                                onClick={showCreateReadingModal}
                            >
                                Iniciar Leitura
                            </Button>
                        </Box>
                    )
                }
            </Box>
        </Box>

    return (
        <>
            <DrawerV2
                isOpened={props.openDrawerState}
                changePanelOpened={props.onCloseDrawerClick}
                anchor="right"
                content={content}
            />
            <CreateReadingProgressModal
                isOpen={crateReadingProgressModalState}
                onToggle={hideCreateReadingProgressModal}
                readingId={stats?.currentReadingId || ''}
            />
            {props?.item?.id &&
                <CreateReadingModal
                    isOpen={createReadingModalState}
                    onToggle={hideCreateReadingModal}
                    itemId={props.item.id}
                    itemTitle={props.item.title}
                />
            }
        </>
    )
}

export default BookDrawer;