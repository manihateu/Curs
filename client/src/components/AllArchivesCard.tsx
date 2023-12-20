import { useEffect, useState } from "react"
import {createArchive, deleteArchive, getAllArchives} from '../api/archive'
import {CreateArchiveDto} from '../api/archive/archive.dto'
import { useForm } from "react-hook-form"
import Modal from "./Modal"
import { useNavigate } from "react-router-dom"

const AllArchivesCard = () => {
    const [archives,setArchives] = useState<CreateArchiveDto[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const deleteArch = async(cellCode: string) => {
        await deleteArchive(cellCode)
        location.reload()
    }

    const onSubmit = async (data: CreateArchiveDto) => {
        await createArchive(data).then(() => alert("Архив добавлен"))
        location.reload()
    };

    const handleToggleModal = () => {
        setOpenModal((open) => !open)
    }
    useEffect(() => {
        const getData = async() => {
            try {
                setLoading(true)
                await getAllArchives().then((data) => setArchives(data))
            } finally {
                setLoading(false)
            }
            
        }
        getData()
    }, [])
    const navigate = useNavigate()
    return loading ?
        <div
            aria-label="loading-skeleton"
            className=" w-full md:h-2/3 h-72 rounded-2xl bg-slate-200 animate-pulse"
        ></div>
        :
        <>
        <div className="w-full md:h-2/3 h-72 rounded-2xl bg-white shadow-xl p-3 overflow-y-auto overflow-x-hidden">
            <div className="flex w-full justify-between items center">
                <h1 className="text-xl font-bold">Архив</h1>
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
            {archives != null && archives && Array.isArray(archives) && archives.length != 0 ? 
                archives.map((archive) => 
                    <div onClick={() => {navigate(`/archive/${archive.cellCode}`)}} className="w-full mt-5 p-3 shadow-xl cursor-pointer hover:bg-gray-400 rounded-xl">
                        <p className="font-mono">Ключ - {archive.id}</p>
                        <p className="font-mono">Стеллаж - {archive.shelf}</p>
                        <p className="font-mono">Полка - {archive.shelfNumber}</p>
                        <p className="font-mono">Ячейка - {archive.cell}</p>
                        <p className="font-mono">Код ячейки - {archive.cellCode}</p>
                        <p className="font-mono">Заполнение - {archive.filling}</p>
                        <button onClick={async () => {await deleteArch(archive.cellCode)}} className="rounded-lg mt-3 font-medium bg-red-100 text-red-500 px-6 py-3">
                            Удалить
                        </button>
                    </div>
                )
            : 'Архивов не найдено'}

            
        </div>
        <Modal handleClose={handleToggleModal} isOpen={openModal}>
            <div className="w-full h-full p-3">
                <p className="text-xl font-bold">Добавить архив</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("shelf", {required: true, maxLength: 80})} type="text"  placeholder="Стеллаж" className="my-3 p-3 rounded-xl border-0 focus:border-0"/>
                    <input {...register("shelfNumber", {required: true, maxLength: 80})} type="number"  placeholder="Полка" className="my-3 p-3 rounded-xl border-0 focus:border-0"/>
                    <input {...register("cell", {required: true})} type="number"  placeholder="Ячейка" className="my-3 p-3 rounded-xl border-0 focus:border-0"/>
                    <input {...register("cellCode", {required: true, maxLength: 80})} type="text"  placeholder="Код ячейки" className="my-3 p-3 rounded-xl border-0 focus:border-0"/>
                    <button type='submit' className="rounded-lg font-medium bg-blue-100 text-blue-500 px-6 py-3">
                      Добавить
                    </button>
                </form>
            </div>
        </Modal>
        </>
    }

export default AllArchivesCard