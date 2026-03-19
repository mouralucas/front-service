import { useQuery } from "@apollo/client";
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Stack, TextField, Typography } from "@mui/material";
import { ReactElement, useCallback, useState } from "react";
import ItemCard from "../../../components/ItemCard";
import Loader from "../../../components/Loader";
import { Item, ItemReadingGoal } from "../../../interfaces/Library";
import { apolloLibraryClient } from "../../../services/apollo/client/ApolloLibraryService";
import { QUERY_ITEMS, QUERY_READING_GOALS } from "../../../services/apollo/queries/Library";
import BookDrawer from "./drawer/Book";
import ItemModal from './modals/Item.tsx';

const UserPage = (): ReactElement => {
    const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false)
    const [isItemModalOpen, setIsItemModalOpen] = useState<boolean>(false)
    const [selectedBook, setSelectedBook] = useState<Item>()
    const [bookFilter, setBookFilter] = useState('');

    const { data: itemsData, loading: itemsLoading, refetch: itemsRefetch } = useQuery(QUERY_ITEMS, {
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

    const { data: readingGoalData } = useQuery(QUERY_READING_GOALS, {
        client: apolloLibraryClient,
        variables: {
            params: {
                year: 2026
            }
        }
    })

    const onItemModalToggle = useCallback((book?: Item) => {
        if (book !== undefined) {
            setSelectedBook(book);
        } else {
            setSelectedBook(undefined);
        }

        if (isItemModalOpen) {
            itemsRefetch()
        }

        setIsItemModalOpen(!isItemModalOpen);

    }, [isItemModalOpen, itemsRefetch]);

    const onOpenDrawerClick = useCallback((book: Item) => {
        if (book !== undefined) {
            setSelectedBook(book);
        } else {
            setSelectedBook(undefined);
        }
        setIsDrawerOpened(!isDrawerOpened);

    }, [isDrawerOpened]);

    const filterdRows = bookFilter
        ? itemsData?.getItems.items.filter((row: Item) => row.title.toLowerCase().includes(bookFilter.toLowerCase()))
        : itemsData?.getItems.items

    return (itemsLoading ? <Loader /> :
        <Box display="flex" flexDirection="column" height="100%">
            <Box display="flex" justifyContent="flex-end" sx={{mb: 4}}>
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
                <Typography variant="h6" sx={{ px: 2, pt: 2 }}>
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
                    {readingGoalData?.getReadingGoals?.goals?.map((goal: ItemReadingGoal) => (
                        <ItemCard
                            key={goal.id}
                            title={goal.item?.title}
                            author={goal.item?.mainAuthorName}
                            coverUrl={goal.item?.cover}
                            readingGoalAchieved={goal.acheived}
                            readingGoalAchievedDate={goal.dateAcheived}
                            onClick={() => onOpenDrawerClick(goal.item)}
                            onEdit={() => onItemModalToggle(goal.item)}
                        />
                    ))}
                </Stack>
            </Box>
            Lucas
            <Stack
                direction="row"
                spacing={3}
                p={2}
                flexWrap="wrap"
                useFlexGap
                justifyContent="center"
            >
                {filterdRows?.map((book: Item) => (
                    <ItemCard
                        key={book.id}
                        title={book.title}
                        author={book.mainAuthorName}
                        coverUrl={book.cover}
                        onClick={() => onOpenDrawerClick(book)}
                        onEdit={() => onItemModalToggle(book)}
                    />
                ))}
            </Stack>
            {(selectedBook && isDrawerOpened) && (
                <BookDrawer
                    openDrawerState={isDrawerOpened}
                    onCloseDrawerClick={onOpenDrawerClick}
                    item={selectedBook}
                />
            )}
            {(selectedBook && isItemModalOpen) && (
                <ItemModal
                    item={selectedBook}
                    itemTypeId='book'
                    onToggle={onItemModalToggle}
                    isOpen={isItemModalOpen}
                />
            )}
        </Box>
    )
}

export default UserPage;