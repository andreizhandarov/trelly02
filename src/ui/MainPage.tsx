import { PageTitle } from "./PageTitle";
import { TaskDetails } from "./TaskDetails";
import { TasksList } from "./TasksList";
import { useTaskSelection } from "../dll/useTaskSelection";

export function MainPage(){

    const {taskId, setTaskId, boardId, setBoardId} = useTaskSelection()

    const handelTaskSelect = (id: string | null, idBoard: string | null) => {
        setTaskId(id),
        setBoardId(idBoard)
    }

    return(
        <div>
            <PageTitle />
            <div style={{display: 'flex', gap: '20px'}}>
                <TasksList 
                    onTaskSelect = {handelTaskSelect}
                    selectedTaskId = {taskId}
                />
                <TaskDetails 
                    taskId = {taskId}
                    boardId = {boardId}
                />
            </div>
        </div>
    )
}
