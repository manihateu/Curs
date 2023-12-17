import { useEffect, useState } from "react"
import { createSubscriberDto } from "../api/subscribers/subscriber.dto"
import { createSubscriber, deleteSubscriber, getSubscribers } from "../api/subscribers"
import Modal from "./Modal"
import { useForm } from "react-hook-form"

const AllSubscribersCard = () => {
    const [subscribers,setSubscribers] = useState<createSubscriberDto[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data: createSubscriberDto) => {
        await createSubscriber(data).then(() => alert("Абонент добавлен"))
        location.reload()
    };

    const handleToggleModal = () => {
        setOpenModal((open) => !open)
    }

    const deleteSub = async (id: number | undefined) => {
        if (id) {
            await deleteSubscriber(id)
            location.reload()
        }
    }

    useEffect(() => {
        const getData = async() => {
            try {
                await getSubscribers().then((data) => setSubscribers(data))
                setLoading(true)
            } finally {
                setLoading(false)
            }
            
        }
        getData()
    }, [])
    return loading ?
        <div
            aria-label="loading-skeleton"
            className=" w-full md:h-2/3 h-72 rounded-2xl bg-slate-200 animate-pulse"
        ></div>
        :
        <>
        <div className="w-full md:h-2/3 h-72 rounded-2xl bg-white shadow-xl p-3 overflow-y-auto overflow-x-hidden">
            <div className="flex w-full justify-between items center">
                <h1 className="text-xl font-bold">Абоненты</h1>
                <button onClick={handleToggleModal} className="inline-flex items-center justify-center font-sans font-semibold tracking-wide text-white bg-green-500 w-8 h-8 cursor-pointer hover:bg-green-600 rounded-lg">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </span>

                </button>
            </div>
            {subscribers != null && subscribers && subscribers.length != 0 && Array.isArray(subscribers) && subscribers.length != 0 ? 
                subscribers.map((subscriber) => 
                    <div className="w-full mt-5 p-3 shadow-xl cursor-pointer hover:bg-gray-400 rounded-xl">
                        <p className="font-mono">Ключ - {subscriber.id}</p>
                        <p className="font-mono">ФИО - {subscriber.name}</p>
                        <p className="font-mono">Отдел - {subscriber.department}</p>
                        <p className="font-mono">Телефон - {subscriber.phone}</p>
                        <p className="font-mono">Дата получения - {subscriber.receivedDate.toString().split('T')[0]}</p>
                        <button onClick={async () => {await deleteSub(subscriber.id)}} className="rounded-lg mt-3 font-medium bg-red-100 text-red-500 px-6 py-3">
                            Удалить
                        </button>
                    </div>
                ) 
            : 'Абонентов не найдено'}

            
        </div>
        <Modal handleClose={handleToggleModal} isOpen={openModal}>
            <div className="w-full h-full p-3">
                <p className="text-xl font-bold">Добавить абонента</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("name", {required: true, maxLength: 80})} type="text"  placeholder="Имя" className="my-3 p-3 rounded-xl border-0 focus:border-0"/>
                    <input {...register("department", {required: true, maxLength: 80})} type="text"  placeholder="Отдел" className="my-3 p-3 rounded-xl border-0 focus:border-0"/>
                    <input {...register("phone", {required: true})} type="tel"  placeholder="Телефон" className="my-3 p-3 rounded-xl border-0 focus:border-0"/>
                    <input {...register("receivedDate", {required: true, maxLength: 80})} type="date"  placeholder="Дата получения" className="my-3 p-3 rounded-xl border-0 focus:border-0"/>
                    <input {...register("subscriberName", {required: true, maxLength: 80})} type="text"  placeholder="Имя прикрепленного абонента" className="my-3 p-3 rounded-xl border-0 focus:border-0"/>
                    <button type='submit' className="rounded-lg font-medium bg-blue-100 text-blue-500 px-6 py-3">
                        Добавить
                    </button>
                </form>
            </div>
        </Modal>
    </>
    
    }

export default AllSubscribersCard