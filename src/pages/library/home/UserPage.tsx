import { useQuery } from "@apollo/client";
import { Box, Stack } from "@mui/material";
import { ReactElement } from "react";
import ItemCard from "../../../components/ItemCard";
import { Item } from "../../../interfaces/Library";
import { apolloLibraryClient } from "../../../services/apollo/client/ApolloLibraryService";
import { QUERY_ITEMS } from "../../../services/apollo/queries/Library";

const UserPage = (): ReactElement => {

    const { data: itemsData } = useQuery(QUERY_ITEMS, {
        client: apolloLibraryClient,
        variables: {params: {statusId: "owned"}}
    });

    return (
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
                        onClick={() => console.log(book.id)}
                    />
                ))}
            </Stack>
        </Box>
    )
}

export default UserPage;