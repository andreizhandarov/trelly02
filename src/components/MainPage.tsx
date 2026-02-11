import { useState } from "react";
import { PageTitle } from "./PageTitle";
import { TaskDetails } from "./TaskDetails";
import { TasksList } from "./TasksList";

export function MainPage(){

    const [taskId, setTaskId] = useState<string | null>(null)
    const [boardId, setBoardId] = useState<string | null>(null)

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
