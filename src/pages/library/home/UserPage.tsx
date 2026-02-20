import { useQuery } from "@apollo/client";
import { Box, Stack } from "@mui/material";
import { ReactElement, useCallback, useState } from "react";
import ItemCard from "../../../components/ItemCard";
import { Item } from "../../../interfaces/Library";
import { apolloLibraryClient } from "../../../services/apollo/client/ApolloLibraryService";
import { QUERY_ITEMS } from "../../../services/apollo/queries/Library";
import BookDrawer from "./drawer/Book";
import Loader from "../../../components/Loader";

const UserPage = (): ReactElement => {
    const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false)
    const [selectedBook, setSelectedBook] = useState<Item>()

    const { data: itemsData, loading: itemsLoading } = useQuery(QUERY_ITEMS, {
        client: apolloLibraryClient,
        variables: {
            params: {
                // statusId: "owned",
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
                    />
                ))}
            </Stack>
            {selectedBook && (
                <BookDrawer
                    openDrawerState={isDrawerOpened}
                    onCloseDrawerClick={onOpenDrawerClick}
                    item={selectedBook}
                />
            )}
        </Box>
    )
}

export default UserPage;