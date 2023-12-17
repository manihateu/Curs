import $host from "../interceptor"
import { CreateDocumentDto } from "./document.dto"

export const createDocument = async (dto: CreateDocumentDto) => {
    try {
        const {data} = await $host.post('documents/create', dto)
        return data
    } catch (error) {
        return null
    }
}

export const getAllDoc = async () => {
    try {
        const {data} = await $host.get('documents/')
        return data
    } catch (error) {
        return null
    }
}

const getByInventoryNumber = async(inventoryNumber: string) => {
    try {
        const {data} = await $host.get(`documents/${inventoryNumber}`)
        return data
    } catch (error) {
        return null
    }
}

const update = async(inventoryNumber: string, data: Partial<CreateDocumentDto>) => {
    try {
        const res = await $host.post(`documents/update/${inventoryNumber}`, data)
        return res.data
    } catch (error) {
        return null
    }
}

export const deleteDocument = async(inventoryNumber: string) => {
    try {
        const res = await $host.delete(`documents/${inventoryNumber}`)
        return res.data
    } catch (error) {
        return null
    }
}


