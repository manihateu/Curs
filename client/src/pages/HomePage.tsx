import AllArchivesCard from "../components/AllArchivesCard"
import AllDocumentsCard from "../components/AllDocumentsCard"
import AllSubscribersCard from "../components/AllSubscribersCard"

const HomePage = () => {
  return (
    <div className="w-screen md:h-screen flex justify-between items-center px-3 md:gap-x-5 gap-x-0 flex-col gap-y-5 md:gap-y-0 md:flex-row overflow-auto">
            <AllArchivesCard />
            <AllSubscribersCard />
            <AllDocumentsCard />
    </div>
  )
}

export default HomePage