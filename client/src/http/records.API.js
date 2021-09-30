import {$host} from "./index";

export const getRecords = async (column, condition, value) => {
    const response = await $host.get('/', {params: {column, condition, value}})
    return response.data
}