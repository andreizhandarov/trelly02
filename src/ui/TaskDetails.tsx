import { useEffect, useState } from "react"
import { getTask, type TaskDetailsData } from "../dal/api"

// type TaskDetailsDto = {
//     id: string
//     title: string
//     description: string
//     boardId: string
//     boardTitle: string
//     order: number
//     status: number
//     priority: number
//     addedAt: string
//     updatedAt: string
//     attachments: Array<string>
// }

// type TaskDetailsData = {
//     id: string
//     type: string
//     attributes: TaskDetailsDto
// }

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
    
        // fetch(`https://trelly.it-incubator.app/api/1.0/boards/${boardId}/tasks/${taskId}`, {
        //     headers: {
        //         'api-key': '8d196022-a951-4d8e-8c53-82cf604a7d0d'
        //     }
        // })
        // .then(res => res.json())
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