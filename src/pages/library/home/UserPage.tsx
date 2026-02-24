import { useQuery } from "@apollo/client";
import { Box, Stack } from "@mui/material";
import { ReactElement, useCallback, useState } from "react";
import ItemCard from "../../../components/ItemCard";
import Loader from "../../../components/Loader";
import { Item } from "../../../interfaces/Library";
import { apolloLibraryClient } from "../../../services/apollo/client/ApolloLibraryService";
import { QUERY_ITEMS } from "../../../services/apollo/queries/Library";
import BookDrawer from "./drawer/Book";
import ItemModal from './modals/Item.tsx';

const UserPage = (): ReactElement => {
    const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false)
    const [isItemModalOpen, setIsItemModalOpen] = useState<boolean>(false)
    const [selectedBook, setSelectedBook] = useState<Item>()

    const { data: itemsData, loading: itemsLoading, refetch: itemsRefetch} = useQuery(QUERY_ITEMS, {
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

    const onItemModalToggle = useCallback((book?: Item) => {
        if (book !== undefined) {
            setSelectedBook(book);
        } else {
            setSelectedBook(undefined);
        }
        setIsItemModalOpen(!isItemModalOpen);

        if (!isItemModalOpen) {
            itemsRefetch()
        }

    }, [isItemModalOpen, itemsRefetch]);

    const onOpenDrawerClick = useCallback((book: Item) => {
        if (book !== undefined) {
            setSelectedBook(book);
        } else {
            setSelectedBook(undefined);
        }
        setIsDrawerOpened(!isDrawerOpened);

    }, [isDrawerOpened]);

    return (itemsLoading ? <Loader /> :
        <Box display="flex" flexDirection="column" height="100%">
            <Stack
                direction="row"
                spacing={3}
                p={2}
                flexWrap="wrap"
                useFlexGap
                justifyContent="center"
            >
                {itemsData?.getItems?.items.map((book: Item) => (
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