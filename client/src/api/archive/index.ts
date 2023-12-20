import { CreateArchiveDto } from './archive.dto'
import $host from '../interceptor'

export const createArchive = async (dto: CreateArchiveDto) => {
    try {
        const {data} = await $host.post('archives/create', dto)
        return data
    } catch (error) {
        return null
    }
}

export const getAllArchives = async () => {
    try {
        const {data} = await $host.get('archives/')
        return data
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getByCell = async (cellCode: string) => {
    try {
        const {data} = await $host.get(`archives/${cellCode}`)
        return data
    } catch (error) {
        return null
    }
}

const update = async (cellCode: string, data: Partial<CreateArchiveDto>) => {
    try {
        const res = await $host.post(`archives/update/${cellCode}`, data)
        return res.data
    } catch (error) {
        return null
    }
}

export const deleteArchive = async (cellCode: string) => {
    try {
        const {data} = await $host.delete(`archives/${cellCode}`)
        return data
    } catch (error) {
        return null
    }
}
