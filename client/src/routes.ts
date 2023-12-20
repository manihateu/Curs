import ArchivePage from "./pages/ArchivePage";
import HomePage from "./pages/HomePage";
import SubscriberPage from "./pages/SubscriberPage";

type route = {
    path: string;
    element: () => JSX.Element
}

export const routes: route[] = [
    {
        path: '/',
        element: HomePage
    },
    {
        path: '/archive/:cellCode',
        element: ArchivePage
    },
    {
        path: '/subscriber/:id',
        element: SubscriberPage
    },
]