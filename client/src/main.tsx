import ReactDOM from 'react-dom/client'
import AppRouter from './AppRouter.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
    // <Provider>
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    // </Provider>
    
   
)
