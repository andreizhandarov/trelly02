import { useEffect, useState } from "react"
import { getTask, type TaskDetailsData } from "../dal/api"


type Props = {
    taskId: string | null
    boardId: string | null
}

export function TaskDetails({taskId, boardId}: Props){
    const [selectedTask, setSelectedTask] = useState<TaskDetailsData | null>(null)

    useEffect(() => {
        if(!taskId){
            setSelectedTask(null)
            return
        }
    
        getTask({boardId, taskId})
            .then(json => {setSelectedTask(json.data)})
    }, [taskId])
    
    return(
        <div>
            <h2>Task ditail</h2>
            {!taskId && !selectedTask && <span>"Not ditails"</span>}
            {((taskId && !selectedTask) || (selectedTask && taskId !== selectedTask.id))  && <span>Loading...</span>}
            {selectedTask && taskId === selectedTask.id && (
                <div>  
                    <ul style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                        <li>Title: {selectedTask.attributes.title}</li>
                        <li>BoardTitle: {selectedTask.attributes.boardTitle}</li>
                        <li>Description: {selectedTask.attributes.description}</li>
                    </ul>
                </div>)}
        </div>
    )
}