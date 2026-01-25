import { createRoot } from 'react-dom/client'
import { Header } from './components/Header.tsx'
import { PageTitle } from './components/PageTitle.tsx'
import { TasksList } from './components/TasksList.tsx'
import { Footer } from './components/Footer.tsx'
import { TaskDetails } from './components/TaskDetails.tsx'

createRoot(document.getElementById('root')!).render(
    <MainPage />
)

function MainPage(){
    return(
        <div>
            <Header />
            <PageTitle />
            <div style={{display: 'flex', gap: '20px'}}>
                <TasksList />
                <TaskDetails />
            </div>
            <Footer />
        </div>
    )
}
