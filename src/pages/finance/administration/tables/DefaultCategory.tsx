import { ReactElement, useState, useEffect } from 'react';
import DataGridComp from '../../../../components/table/DataGridV2.tsx';
import { Box, IconButton } from '@mui/material'
import { getBrazilianFunds, getCategories } from "../../../../services/getCommonData/Finance.tsx";
import BrazilianFundsModal from '../modals/BrazilianFunds.tsx'
import { BrazilianFunds, Category } from "../../../../interfaces/Finance.tsx";
import AccountBalanceWalletOutlined from '@mui/icons-material/AccountBalanceWalletOutlined';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { GridColDef } from '@mui/x-data-grid';
import CategoryModal from '../modals/Category.tsx'


const DefaultCategoryTable = (): ReactElement => {
    const [defaultCategories, setDefaultCategories] = useState<Category[]>([])

    const [defaultCategoriesModalState, setDefaultCategoriesModalState] = useState<boolean>(false)
    const [selectedCategories, setSelectedCategories] = useState<Category | undefined>()

    const [isLoading, setIsLoading] = useState<boolean>(true)


    const fetchCategoriesData = async () => {
        setIsLoading(true);
        setDefaultCategories(await getCategories(false))
        setIsLoading(false);
    }

    const showCategoryModal = (e: any) => {
        if (typeof e.row != 'undefined') {
            setSelectedCategories(e.row.data);
        }

        setDefaultCategoriesModalState(true);
    }

    const hideCategoryModal = () => {
        setSelectedCategories(undefined);
        setDefaultCategoriesModalState(false);
    }

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
                    onClick={showCategoryModal}
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
                columnVisibilityModel={{categoryId: false}}
            />
             <CategoryModal modalState={defaultCategoriesModalState} hideModal={hideCategoryModal} category={selectedCategories}/>
        </Box>
    )
}

export default DefaultCategoryTable;