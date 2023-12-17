import $host from "../interceptor"
import { createSubscriberDto } from "./subscriber.dto"

export const createSubscriber = async(dto: createSubscriberDto) => {
    try{
        const res = await $host.post('/subscriber/create', dto)
        return res.data
    }
    catch(e){
        return null
    }
}

const getSubscribersById = async(id: number) => {
    try{
        const res = await $host.get(`/subscriber/${id}`)
        return res.data
    }
    catch(e){
        return null
    }
}

export const getSubscribers = async() => {
    try{
        const res = await $host.get('/subscriber')
        return res.data
    }
    catch(e){
        return null
    }
}

const updateSubscriber = async(id: number) => {
    try{
        const res = await $host.get(`/subscriber/update/${id}`)
        return res.data
    }
    catch(e){
        return null
    }
}

const deleteSubscriber = async(id: number) => {
    try{
        const res = await $host.delete(`/subscriber/${id}`)
        return res.data
    }
    catch(e){
        return null
    }
}
