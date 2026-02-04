import { useState } from "react";
import { PageTitle } from "./PageTitle";
import { TaskDetails } from "./TaskDetails";
import { TasksList } from "./TasksList";

export function MainPage(){

    const [taskId, setTaskId] = useState(null)
    const [boardId, setBoardId] = useState(null)

    const handelTaskSelect = (id, idBoard) => {
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
