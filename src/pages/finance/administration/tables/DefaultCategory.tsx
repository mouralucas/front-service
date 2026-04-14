import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined';
import { Box, IconButton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import DataGridComp from '../../../../components/table/DataGridV2.tsx';
import { Category } from "../../../../interfaces/Finance.tsx";
import { getCategories } from "../../../../services/getCommonData/Finance.tsx";
import CategoryModal from '../modals/Category.tsx';


const DefaultCategoryTable = (): ReactElement => {
    const [defaultCategories, setDefaultCategories] = useState<Category[]>([])

    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState<boolean>(false)
    const [selectedCategories, setSelectedCategories] = useState<Category | undefined>()

    const [isLoading, setIsLoading] = useState<boolean>(true)


    const fetchCategoriesData = async () => {
        setIsLoading(true);
        setDefaultCategories(await getCategories(false))
        setIsLoading(false);
    }

    const onCategoryModalToggle = useCallback((e: any) => {
         if (typeof e.row != 'undefined') {
            setSelectedCategories(e.row.data);
        }

        if (isCategoryModalOpen) {
            setSelectedCategories(undefined);
        }

        setIsCategoryModalOpen(!isCategoryModalOpen);
    })

    useEffect(() => {
        fetchCategoriesData().then();
    }, []);

    const columns: GridColDef[] = [
        {
            field: "categoryId",
            headerName: "Id",
            flex: 1
        },
        {
            field: 'name',
            headerName: 'Nome',
            type: 'string',
            flex: 1
        },
        {
            field: 'description',
            headerName: 'Descrição',
            type: 'string',
            flex: 1
        },
        {
            field: 'parentName',
            headerName: 'Categoria Mãe',
            type: 'string',
            flex: 1
        }
    ]

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'right', gap: 0, mb: 2, me: 2 }}>
                <IconButton
                    aria-label="Novo Registro"
                    onClick={onCategoryModalToggle}
                    loading={isLoading}
                >
                    <AddCircleOutline />
                </IconButton>
                <IconButton
                    aria-label="Atualizar"
                    onClick={fetchCategoriesData}
                    loading={isLoading}
                >
                    <AutorenewOutlined />
                </IconButton>
            </Box>
            <DataGridComp
                columns={columns}
                data={defaultCategories}
                isLoading={isLoading}
                getRowId={(row) => row.categoryId}
                columnVisibilityModel={{ categoryId: false }}
            />
            <CategoryModal
                isOpen={isCategoryModalOpen}
                onToggle={onCategoryModalToggle}
                category={selectedCategories} />
        </Box>
    )
}

export default DefaultCategoryTable;