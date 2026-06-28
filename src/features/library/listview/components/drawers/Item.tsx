import { useMutation, useQuery } from "@apollo/client";
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import { Box, Button, Divider, IconButton, LinearProgress, LinearProgressProps, Stack, Typography } from "@mui/material";
import { ReactElement, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import DrawerV2 from "../../../../../components/Drawer.tsx";
import ItemCard from "../../../../../components/ItemCard.tsx";
import ItemStatusChip from "../../../../../components/ItemStatusChip.tsx";
import CircularLoader from "../../../../../components/Loader.tsx";
import { apolloLibraryClient } from "../../../../../services/apollo/client/ApolloLibraryService.tsx";
import { UPDATE_ITEM_ON_QUEUE, UPDATE_READING_STATUS_MUTATION } from "../../../../../services/apollo/mutations/Library.tsx";
import CreateReadingModal from "../modals/CreateReading";
import CreateReadingProgressModal from "../modals/CreateReadingProgress.tsx";
import ReadingHistoryTable from "../tables/ReadingHistory.tsx";
import { QUERY_ITEMS, QUERY_READING_STATS } from "../../../api/queries.ts";
import { Item } from "../../../type/Item.ts";


interface ItemDrawerProps {
    isOpen: boolean;
    onToggle: (e: any) => void;
    itemId: number;
};


const ItemDrawer = (props: ItemDrawerProps): ReactElement => {
    const [isReadingModalOpen, setIsReadingModalOpen] = useState<boolean>(false);
    const [isProgressModalOpen, setIsProgressModalOpen] = useState<boolean>(false);

    const [isInReadingQueue, setIsInReadingQueue] = useState<boolean>(false)

    const { data: itemData, loading: itemLoading } = useQuery(QUERY_ITEMS, {
        client: apolloLibraryClient,
        variables: {
            params: {
                itemId: props.itemId
            }
        },
        fetchPolicy: "no-cache",
    });

    const item: Item = itemData?.getDetailedItems?.items[0];

    useEffect(() => {
        // Set the variable for the item in queue
        setIsInReadingQueue(item?.isInReadingQueue)
    }, [item])

    const { data: statsData, loading: loadingStats, refetch: refetchStats } = useQuery(QUERY_READING_STATS, {
        client: apolloLibraryClient,
        variables: { itemId: props.itemId },
        fetchPolicy: "no-cache",
        skip: !props.isOpen || !item,
    });

    const stats = statsData?.getReadingStats?.stats;

    const [updateReadingStatus] = useMutation(UPDATE_READING_STATUS_MUTATION, {
        client: apolloLibraryClient,
        onCompleted: (data) => {
            toast.success(
                `Leitura abandonada para o item ${data?.updateReadingStatus?.itemTitle}`
            );
            // props.onToggle()
        },
        onError: (error) => {
            toast.error(`Erro: ${error.message}`);
        },
    })

    const updateStatus = async (newStatus: string) => {
        await updateReadingStatus({
            variables: {
                params: {
                    itemId: props.itemId,
                    newStatus: newStatus
                }

            }
        })
    }

    const [updateItemOnQueue] = useMutation(UPDATE_ITEM_ON_QUEUE, {
        client: apolloLibraryClient,
        onCompleted: (data) => {
            let message;
            if (data?.updateReadingQueue?.isCurrentlyInQueue === true) {
                message = `Item ${data?.updateReadingQueue?.itemTitle} adicionado a lista de leitura`
            } else if (data?.updateReadingQueue?.isCurrentlyInQueue === false) {
                message = `Item ${data?.updateReadingQueue?.itemTitle} removido da lista de leitura`
            }
            toast.success(message);
            setIsInReadingQueue(data?.updateItemInQueue?.isCurrentlyInQueue);
        },
        onError: (error) => {
            toast.error(`Erro: ${error.message}`);
        },
    })

    const updateItemInQueue = async () => {
        await updateItemOnQueue({
            variables: {
                params: {
                    itemId: props.itemId,
                }
            }
        })
    }

    const onReadingModalToggle = useCallback(() => {
        // If the reading modal is closing, refetch the reading stats
        if (isReadingModalOpen) {
            refetchStats();
        }
        setIsReadingModalOpen(!isReadingModalOpen);
    }, [isReadingModalOpen])

    const onProgresModalToggle = useCallback(() => {
        // If the progress modal is closing, refetch the reading stats
        if (isProgressModalOpen) {
            refetchStats();
        }
        setIsProgressModalOpen(!isProgressModalOpen);
    }, [isProgressModalOpen])

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

    const content: ReactElement = itemLoading ? <CircularLoader /> :
        <>
            <Box display="flex" flexDirection="column" height="100%">
                {/* Toolbar */}
                <Box className="custom-toolbar">
                    <Stack
                        direction="row"
                        spacing={2}
                        alignItems="flex-end"
                        sx={{ width: '100%' }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                            }}
                        >
                            <ItemStatusChip
                                label={item.lastStatusName}
                                status={item.lastStatusId}
                            />

                            <Divider
                                orientation="vertical"
                                flexItem
                                sx={{
                                    borderColor: 'text.primary',
                                    opacity: 0.2,
                                }}
                            />

                            <Typography className="contact-name">
                                {item?.title}
                            </Typography>

                            <IconButton
                                aria-label="performance"
                                onClick={updateItemInQueue}
                            >
                                <BookOutlinedIcon
                                    sx={{
                                        color: isInReadingQueue ? 'primary.main' : 'secondary.main'
                                    }}
                                />
                            </IconButton>
                        </Box>
                    </Stack>
                </Box>

                {/* Cover + Main info */}
                <Stack direction="row" spacing={2} p={2}>
                    <ItemCard
                        key={item?.id}
                        coverUrl={item?.cover}
                    />
                    <Stack spacing={2}>
                        <Box>
                            <div className="title">Título</div>
                            <div>{item?.title}</div>
                            <div className="fw-light text-muted small">{item?.subtitle}</div>
                        </Box>
                        <Box>
                            <div className="title">Autor</div>
                            <div>{item?.mainAuthorName}</div>
                            <div className="fw-light text-muted small">
                                {item?.authorsNames?.join("; ")}
                            </div>
                        </Box>
                        <Box>
                            <div className="title">Páginas</div>
                            <div>{item?.pages}</div>
                        </Box>
                    </Stack>
                </Stack>

                {/* Publisher + Serie  + Collection */}
                <Stack direction="row" spacing={2} px={2}>
                    <Box flex={2}>
                        <div className="title">Editora</div>
                        <div>{item?.publisherName}</div>
                    </Box>
                    <Box flex={2}>
                        <div className="title">Série</div>
                        <div>{item?.serieName}</div>
                    </Box>
                    {item?.collectionId !== 0 &&
                        <Box flex={2}>
                            <div className="title">Coleção</div>
                            <div>{item?.collectionName}</div>
                        </Box>
                    }
                </Stack>

                {/* description */}
                <Stack direction="row" spacing={2} px={2}>
                    {/* TODO: need to add scroll to drawer view */}
                    {/* {item?.summary} */}
                </Stack>

                <Divider variant="middle" component="li" sx={{ mb: 5 }} />
                {/* Reading stats */}
                {loadingStats ? <CircularLoader /> :
                    <Box flex={1} overflow="auto" px={2} pb={2}>
                        {(stats && stats?.readingsCount !== undefined && stats.readingsCount > 0) ? (
                            <>
                                <Stack direction="row" spacing={2}>
                                    <Box flex={1}>
                                        <div className="title">Leituras</div>
                                        <div>{stats?.readingsCount}</div>
                                    </Box>
                                    <Box flex={1}>
                                        <div className="title">Última leitura</div>
                                        <div>{new Date(stats?.lastReadingDate).toLocaleDateString('pt-BR')}</div>
                                    </Box>
                                </Stack>

                                {stats?.isCurrentlyReading ? (
                                    // If currently reading, show current page and percentage, and button to add progress
                                    <>
                                        <Stack direction="row" spacing={2} mt={2}>
                                            <Box flex={1}>
                                                <div className="title">Página atual</div>
                                                <div>{stats?.currentPage}</div>
                                            </Box>
                                            <Box flex={1}>
                                                <div className="title">Perc. atual</div>
                                                <div>{Math.min(parseFloat((stats?.currentPercentage || 0).toFixed(2)), 100)}%</div>
                                            </Box>
                                        </Stack>
                                        <Box >
                                            <LinearProgressWithLabel value={stats?.currentPercentage} />
                                        </Box>
                                        <Divider />
                                        <Box mt={2} display="flex" gap={2}>
                                            <Button
                                                variant="contained"
                                                onClick={onProgresModalToggle}
                                                fullWidth
                                                color="info"
                                            >
                                                Progresso
                                            </Button>
                                            <Button
                                                variant="contained"
                                                fullWidth
                                                color="warning"
                                                onClick={() => updateStatus("dropped")}
                                            >
                                                Abandonar
                                            </Button>
                                        </Box>
                                    </>
                                ) :
                                    // If not currently reading, but already read once, show button to start a new reading
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={onReadingModalToggle}
                                    >
                                        Iniciar Nova Leitura
                                    </Button>
                                }
                                <Divider variant="middle" component="li" />

                                <ReadingHistoryTable itemId={props.itemId} />
                            </>
                        ) :
                            // If no previous reading for the item, then show the button to start the first reading
                            stats?.readingsCount === 0 && (
                                <Box mt={2}>
                                    <Button
                                        fullWidth
                                        variant='outlined'
                                        onClick={onReadingModalToggle}
                                    >
                                        Iniciar Leitura
                                    </Button>
                                </Box>
                            )
                        }
                    </Box>
                }
            </Box>
        </>



    return (
        <>
            <DrawerV2
                isOpened={props.isOpen}
                changePanelOpened={props.onToggle}
                anchor="right"
                content={content}
            />
            <CreateReadingProgressModal
                isOpen={isProgressModalOpen}
                onToggle={onProgresModalToggle}
                readingId={stats?.currentReadingId || ''}
            />
            {props?.itemId && item &&
                <CreateReadingModal
                    isOpen={isReadingModalOpen}
                    onToggle={onReadingModalToggle}
                    itemId={props.itemId}
                    itemTitle={item.title}
                />
            }
        </>
    )
}

export default ItemDrawer;