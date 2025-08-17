import { ReactElement, useEffect, useState } from "react";
import DrawerV2 from "../../../../components/Drawer.tsx";
import { getLibraryData } from "../../../../services/axios/Get.tsx";
import { URL_LIBRARY_READING_STATS } from "../../../../services/axios/ApiUrls.tsx";
import { ReadingStatsResponse } from "../../../../interfaces/LibraryRequest.tsx";
import { ItemReadingStats } from "../../../../interfaces/Library.tsx";
import { toast } from "react-toastify";
import CreateReadingProgressModal from "../modals/CreateReadingProgress.tsx";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { Box, Button } from "@mui/material";

interface BookDrawerProps {
    openDrawerState: boolean;
    itemId?: number;
    item?: any;
    onCloseDrawerClick: (e: any) => void;
};

const BookDrawer = (props: BookDrawerProps): ReactElement => {

    const [stats, setStats] = useState<ItemReadingStats>();
    const [crateReadingProgressModalState, setCrateReadingProgressModalState] = useState<boolean>(false)

    useEffect(() => {
        if (props.openDrawerState) {
            getReadingStats();
        }
    }, [props.openDrawerState])

    const showCreateReadingProgressModal = () => {
        setCrateReadingProgressModalState(true);
    }

    const hideCreateReadingProgressModal = () => {
        setCrateReadingProgressModalState(false);
    }

    const getReadingStats = () => {
        getLibraryData(URL_LIBRARY_READING_STATS, { itemId: props.item.itemId }).then((response: ReadingStatsResponse) => {
            setStats(response.stats);
            //setValue('readingId', response.stats?.currentReadingId || '');
            console.log(response);
        }).catch((e: any) => {
            toast.error(`Erro ao buscar estatísticas de leitura: ${e.message}`)
        });
    }

    const startReading = () => {
        // Implementar lógica para iniciar leitura
        toast.info("Iniciar leitura não implementado ainda. Id do item: " + props.item.itemId);
        const submitData = {
            itemId: props.item.itemId,
        }
        console.log(submitData)
        // librarySubmit('undefined', URL_READING, submitData, 'post').then(() => {
        //     toast.success("Leitura iniciada com sucesso!");
        //     getReadingStats();
        // }).catch((e: any) => {
        //     toast.error(`Erro ao iniciar leitura: ${e.message}`);
        // });
    }

    const getStatusChipVariant = (): "danger" | "success" | "alert" | "info" | "undefined" => {
        if (props.openDrawerState) {
            if (props.item?.lastStatusId == 'lost') {
                return "danger";
            }

            return 'info';
        }

        return "undefined";
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
            <Box sx={{ mb: 2, display: 'flex', gap: 2, alignItems: 'center'}} >
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
        <Box
            className="item-cover"
            sx={{
                backgroundImage: 'url(/images/no-cover.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                borderRadius: 1,
                border: '1px solid #ddd',
                width: 150,
                height: 200,
                flexShrink: 0,
            }}
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

    <hr />

    {/* Reading stats */}
    <Box flex={1} overflow="auto" px={2} pb={2}>
        {(stats?.readingsCount !== undefined && stats.readingsCount > 0) ? (
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
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={startReading}
                >
                    Iniciar Nova Leitura
                </Button>
                }
            </>
        ) : stats?.readingsCount === 0 ? (
            <Box mt={2}>
                <Button
                    fullWidth
                    onClick={startReading}
                >
                    Iniciar Leitura
                </Button>
            </Box>
        ) : (
            <Box mt={2}>
                <span className="text-muted"><b>Leitura em andamento.</b></span>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={startReading}
                >
                    Nova Leitura
                </Button>
            </Box>
        )}
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
                modalState={crateReadingProgressModalState}
                hideCreateReadingProgressModal={hideCreateReadingProgressModal}
                readingId={stats?.currentReadingId || ''}
            />
        </>
    )
}

export default BookDrawer;