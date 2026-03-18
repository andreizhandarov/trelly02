import { useTaskDetails } from "../dll/useTaskDetails"
import style from './TaskDetails.module.css'


type Props = {
    taskId: string | null
    boardId: string | null
}

export function TaskDetails({taskId, boardId}: Props){

    const {selectedTask} = useTaskDetails(taskId, boardId)
    
    return(
        <div>
            <h2>Task ditail</h2>
            {!taskId && !selectedTask && <span>"Not ditails"</span>}
            {((taskId && !selectedTask) || (selectedTask && taskId !== selectedTask.id))  && <span>Loading...</span>}
            {selectedTask && taskId === selectedTask.id && (
                <div>  
                    <ul className={style.task_details}>
                        <li>Title: {selectedTask.attributes.title}</li>
                        <li>BoardTitle: {selectedTask.attributes.boardTitle}</li>
                        <li>Description: {selectedTask.attributes.description}</li>
                    </ul>
                </div>)}
        </div>
    )
}