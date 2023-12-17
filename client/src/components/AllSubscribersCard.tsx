import { useEffect, useState } from "react"
import { createSubscriberDto } from "../api/subscribers/subscriber.dto"
import { createSubscriber, getSubscribers } from "../api/subscribers"
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
            {subscribers != null && subscribers && subscribers.length != 0 ? 
                // subscribers.map((subscriber) => 
                //     <div className="w-full mt-5 p-3 shadow-xl cursor-pointer hover:bg-gray-400 rounded-xl">
                //         <p className="font-mono">Ключ - {subscriber.id}</p>
                //         <p className="font-mono">ФИО - {subscriber.name}</p>
                //         <p className="font-mono">Отдел - {subscriber.department}</p>
                //         <p className="font-mono">Телефон - {subscriber.phone}</p>
                //         <p className="font-mono">Дата получения - {subscriber.receivedDate.toString()}</p>
                //     </div>
                // ) 
                null
            : 'Абонентов не найдено'}

            
        </div>
        <Modal handleClose={handleToggleModal} isOpen={openModal}>
            <div className="w-full h-full p-3">
                <p className="text-xl font-bold">Добавить абонента</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("shelf", {required: true, maxLength: 80})} type="text"  placeholder="Стеллаж" className="my-3 p-3 rounded-xl border-0 focus:border-0"/>
                    <input {...register("shelfNumber", {required: true, maxLength: 80})} type="number"  placeholder="Полка" className="my-3 p-3 rounded-xl border-0 focus:border-0"/>
                    <input {...register("cell", {required: true})} type="number"  placeholder="Ячейка" className="my-3 p-3 rounded-xl border-0 focus:border-0"/>
                    <input {...register("cellCode", {required: true, maxLength: 80})} type="text"  placeholder="Код ячейки" className="my-3 p-3 rounded-xl border-0 focus:border-0"/>
                    <input {...register("filling", {required: true, maxLength: 80})} type="text"  placeholder="Заполнение" className="my-3 p-3 rounded-xl border-0 focus:border-0"/>
                    <button type='submit' className="rounded-lg font-medium bg-blue-100 text-blue-500 px-6 py-3">
                    Добавить
                    </button>
                </form>
            </div>
        </Modal>
    </>
    
    }

export default AllSubscribersCard