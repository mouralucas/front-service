import financeAxios from '../axios/FinanceServiceAxios'
import userAxios from '../axios/UserServiceAxios'


const userSubmit = async (
    e: any,
    url: string,
    values: any,
    method: string
) => {
    e.preventDefault();

    console.log(method);
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

export { financeSubmit, userSubmit};