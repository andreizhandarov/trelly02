import { useEffect, useState } from "react"
import { getTask, type TaskDetailsData } from "../dal/api"

export function useTaskDetails(taskId: string | null, boardId: string | null){

    const [selectedTask, setSelectedTask] = useState<TaskDetailsData | null>(null)

    useEffect(() => {
        if(!taskId){
            setSelectedTask(null)
            return
        }
    
        getTask({boardId, taskId})
            .then(json => {setSelectedTask(json.data)})
    }, [taskId])

    return{selectedTask}
}