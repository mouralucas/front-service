import { useQuery } from "@apollo/client";
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Divider, Stack, TextField, Typography } from "@mui/material";
import { ReactElement, useCallback, useState } from "react";
import ItemCard from "../../../components/ItemCard";
import CircularLoader from "../../../components/Loader";
import { ItemSummary } from "../../../interfaces/Library";
import { apolloLibraryClient } from "../../../services/apollo/client/ApolloLibraryService";
import { QUERY_ITEMS_SUMMARY } from "../../../services/apollo/queries/Library";
import BookDrawer from "../../../features/library/listview/components/drawers/ItemDrawer.tsx";
import ItemModal from "../../../features/library/listview/components/modals/ItemV2.tsx";
import { Item } from "../../../features/library/type/Item.ts";

const UserPage = (): ReactElement => {
    const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false)
    const [isItemModalOpen, setIsItemModalOpen] = useState<boolean>(false)
    const [selectedItemId, setSelectedItemId] = useState<number>()
    const [bookFilter, setBookFilter] = useState('');

    const { data: itemSummaryData, loading: itemSummaryLoading, refetch: itemsRefetch } = useQuery(QUERY_ITEMS_SUMMARY, {
        client: apolloLibraryClient,
        variables: {
            params: {
                orderBy: [
                    {
                        field: 'created_at',
                        direction: "DESC"
                    },
                    {
                        field: 'edited_at',
                        direction: "DESC"
                    }
                ]
            }
        }
    });

    const { data: readingGoalData } = useQuery(QUERY_ITEMS_SUMMARY, {
        client: apolloLibraryClient,
        variables: {
            params: {
                activeGoal: true,
                orderBy: [
                    {
                        field: 'serie_id'
                    },
                    {
                        field: 'collection_id'
                    },
                    {
                        field: "volume",
                        direction: "ASC"
                    }
                ]
            }
        }
    })

    const onItemModalToggle = useCallback((itemId?: number) => {
        if (itemId !== undefined) {
            setSelectedItemId(itemId);
        } else {
            setSelectedItemId(undefined);
        }

        if (isItemModalOpen) {
            itemsRefetch()
        }

        setIsItemModalOpen(!isItemModalOpen);

    }, [isItemModalOpen, itemsRefetch]);

    const onOpenDrawerClick = useCallback((itemId: number) => {
        if (itemId !== undefined) {
            setSelectedItemId(itemId);
        } else {
            setSelectedItemId(undefined);
        }
        setIsDrawerOpened(!isDrawerOpened);

    }, [isDrawerOpened]);

    const filterdRows = bookFilter
        ? itemSummaryData?.getItemSummary.summary.filter((row: Item) => row.title.toLowerCase().includes(bookFilter.toLowerCase()))
        : itemSummaryData?.getItemSummary.summary

    return (itemSummaryLoading ? <CircularLoader /> :
        <Box display="flex" flexDirection="column" height="100%">
            <Box display="flex" justifyContent="flex-end" sx={{ mb: 4 }}>
                <TextField
                    label='Filtrar por título'
                    variant='outlined'
                    size='small'
                    value={bookFilter}
                    onChange={e => setBookFilter(e.target.value)}
                    sx={{ minWidth: 250 }}
                    onFocus={(e) => e.currentTarget.select()}
                    slotProps={{
                        input: {
                            endAdornment: bookFilter && (
                                <ClearIcon
                                    onClick={() => setBookFilter('')}
                                    sx={{ cursor: 'pointer' }}
                                />
                            ),
                        },
                    }}
                />
            </Box>
            <Box display="flex" flexDirection="column" height="100%">
                <Typography
                    variant="h5"
                    textAlign="center"
                    fontWeight={600}
                    sx={{ mt: 2, mb: 1 }}
                >
                    Meta de leitura
                </Typography>
                <Stack
                    direction="row"
                    spacing={3}
                    p={2}
                    flexWrap="wrap"
                    useFlexGap
                    justifyContent="center"
                >
                    {readingGoalData?.getItemSummary?.summary?.map((summary: ItemSummary) => (
                        <ItemCard
                            key={summary.id}
                            title={summary.title}
                            author={summary.mainAuthorName}
                            coverUrl={summary.cover}
                            readingGoalAchieved={summary.readingGoalAchieved}
                            readingGoalAchievedDate={summary.readingGoalDateAchieved}
                            onClick={() => onOpenDrawerClick(summary.id)}
                            onEdit={() => onItemModalToggle(summary.id)}
                        />
                    ))}
                </Stack>
            </Box>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ my: 4 }}
            >
                <Divider sx={{ flex: 1 }} />

                <Typography
                    variant="h6"
                    sx={{ mx: 2, fontWeight: 600 }}
                >
                    Meus itens
                </Typography>

                <Divider sx={{ flex: 1 }} />
            </Box>
            <Stack
                direction="row"
                spacing={3}
                p={2}
                flexWrap="wrap"
                useFlexGap
                justifyContent="center"
            >
                {filterdRows?.map((item: ItemSummary) => (
                    <ItemCard
                        key={item.id}
                        title={item.title}
                        author={item.mainAuthorName}
                        coverUrl={item.cover}
                        readingGoalAchieved={item.readingGoalAchieved}
                        readingGoalAchievedDate={item.readingGoalDateAchieved}
                        onClick={() => onOpenDrawerClick(item.id)}
                        onEdit={() => onItemModalToggle(item.id)}
                    />
                ))}
            </Stack>
            {(selectedItemId && isDrawerOpened) && (
                <BookDrawer
                    isOpen={isDrawerOpened}
                    onToggle={onOpenDrawerClick}
                    itemId={selectedItemId}
                />
            )}
            {(selectedItemId && isItemModalOpen) && (
                <ItemModal
                    itemId={selectedItemId}
                    itemTypeId='book'
                    onToggle={onItemModalToggle}
                    isOpen={isItemModalOpen}
                />
            )}
        </Box>
    )
}

export default UserPage;