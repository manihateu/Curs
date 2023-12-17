import { useEffect, useState } from "react"
import { createDocument, getAllDoc } from "../api/document"
import { CreateDocumentDto } from "../api/document/document.dto"
import Modal from "./Modal"
import { useForm } from "react-hook-form"

const AllDocumentsCard = () => {
    const [documents,setDocuments] = useState<CreateDocumentDto[] | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data: CreateDocumentDto) => {
        await createDocument(data).then(() => alert("Документ добавлен"))
        location.reload()
    };

    const handleToggleModal = () => {
        setOpenModal((open) => !open)
    }

    useEffect(() => {
        const getData = async() => {
            try {
                await getAllDoc().then((data) => setDocuments(data))
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
                <h1 className="text-xl font-bold">Документы</h1>
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
            {documents != null && documents ? 
                documents.map((document) => 
                    <div className="w-full mt-5 p-3 shadow-xl cursor-pointer hover:bg-gray-400 rounded-xl">
                        <p className="font-mono">Ключ - {document.id}</p>
                        <p className="font-mono">Название - {document.name}</p>
                        <p className="font-mono">Тема - {document.theme}</p>
                        <p className="font-mono">Инвентарный № - {document.inventoryNumber}</p>
                        <p className="font-mono">Код ячейки - {document.cellCode}</p>
                        <p className="font-mono">Количество - {document.quantity}</p>
                        <p className="font-mono">Дата поступления - {document.entryDate.toString()}</p>
                    </div>
                )
            : 'Документов не найдено'}
        </div>
        <Modal handleClose={handleToggleModal} isOpen={openModal}>
            <div className="w-full h-full p-3">
                <p className="text-xl font-bold">Добавить документ</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input {...register("name", {required: true, maxLength: 80})} type="text"  placeholder="Имя" className="my-3 p-3 rounded-xl border-0 focus:border-0"/>
                    <input {...register("theme", {required: true, maxLength: 80})} type="text"  placeholder="Тема" className="my-3 p-3 rounded-xl border-0 focus:border-0"/>
                    <input {...register("inventoryNumber", {required: true})} type="text"  placeholder="Инвентарный номер" className="my-3 p-3 rounded-xl border-0 focus:border-0"/>
                    <input {...register("quantity", {required: true, maxLength: 80})} type="text"  placeholder="Код ячейки" className="my-3 p-3 rounded-xl border-0 focus:border-0"/>
                    <input {...register("cellCode", {required: true, maxLength: 80})} type="number"  placeholder="Количество" className="my-3 p-3 rounded-xl border-0 focus:border-0"/>
                    <input {...register("entryDate", {required: true, maxLength: 80})} type="date"  placeholder="Дата поступления" className="my-3 p-3 rounded-xl border-0 focus:border-0"/>
                    <button type='submit' className="rounded-lg font-medium bg-blue-100 text-blue-500 px-6 py-3">
                      Добавить
                    </button>
                </form>
            </div>
        </Modal>
        </>
    }

export default AllDocumentsCard