import financeAxios from '../axios/FinanceServiceAxios'
import userAxios from '../axios/UserServiceAxios'
import libraryAxios from './LibraryServiceAxios.tsx'


const userSubmit = async (
    e: any,
    url: string,
    values: any,
    method: string
) => {
    e.preventDefault();

    const response = await userAxios({
        method: method,
        url: url,
        data: values,
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response?.data
}


/**
 * @deprecated Deprecated to use Graphql endpoints
 */
const financeSubmit = async (
    e: any, url: string,
    values: any,
    method: string
) => {
    e.preventDefault();

    const response = await financeAxios({
        method: method,
        url: url,
        data: values,
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response?.data
}

/**
 * @deprecated Deprecated to use Graphql endpoints
 */
const librarySubmit = async (
    e: any, url: string,
    values: any,
    method: string
) => {
    e.preventDefault();

    const response = await libraryAxios({
        method: method,
        url: url,
        data: values,
        headers: {
            'Content-Type': 'application/json'
        }
    })

    return response?.data
}

export { financeSubmit, librarySubmit, userSubmit};