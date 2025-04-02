import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router'

import App from './App.jsx'
import { LoadingProvider } from './contexts/LoadingContext.jsx'

createRoot(document.getElementById('root')).render(
<BrowserRouter>
    <LoadingProvider>
    <App />
    </LoadingProvider>
</BrowserRouter>
)