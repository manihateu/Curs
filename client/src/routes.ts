import HomePage from "./pages/HomePage";

type route = {
    path: string;
    element: () => JSX.Element
}

export const routes: route[] = [
    {
        path: '/',
        element: HomePage
    }
]