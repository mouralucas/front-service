// Estas informações estarão disponíveis via banco de dados
// Buscar os dados e salvar no localStorage e atualizar de tempo em tempo

export const items = [
    {
        title: 'Home',
        url: '/',
    },
    {
        title: 'Biblioteca',
        url: '/library/records',
        submenu: [
            {
                title: 'Home',
                url: '/library/records',
            },
            {
                title: 'Backlog',
                url: '/library/backoffice',
            },
            {
                title: 'Item',
                url: '/library/item',
            },
        ],
    },
    {
        title: 'Financeiro',
        submenu: [
            {
                // TODO: this should not be a submenu, but a direct link in root menu
                title: 'Visão Geral',
                url: '/finance',
            },
            {
                title: 'Investimentos',
                submenu: [
                    {
                        title: 'Dashboard',
                        url: '/finance/investment'
                    },
                    {
                        title: 'Ativos',
                        url: '/finance/investment/active'
                    },
                    {
                        title: 'Liquidados',
                        url: '/finance/investment/settled'
                    }
                ]
            },
            {
                title: 'Dashboard',
                url: 'finance/transaction/dashboard'
            },
            {
                title: 'Transações',
                url: 'finance/transaction'
            },
        ]
    },
    {
        title: 'Esportes',
        submenu: [
            {
                title: 'Futebol',
                url: '/sports/football'
            },
        ]
    },
    {
        title: 'Configurções',
        submenu: [
            {
                title: 'Financeiro',
                url: 'config/financeiro'
            },
            {
                title: 'Biblioteca',
                url: 'config/biblioteca'
            }
        ]
    },
    {
        title: 'Sobre',
        url: '/sobre',
    },
    {
        title: 'Testes',
        url: '/testing',
    },

];