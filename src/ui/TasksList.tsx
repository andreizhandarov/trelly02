import { useEffect, useState } from "react"
import './../App.css'
import { TaskItem } from "./TaskItem"
import { getTasks, type GlobalTaskListItemJsonApiData } from "../dal/api"

type Props = {
    selectedTaskId: string | null
    onTaskSelect: (id: string | null, iDBoard: string | null) => void 
}


export function TasksList({onTaskSelect, selectedTaskId}: Props){

    const [tasks, setTasks] = useState<Array<GlobalTaskListItemJsonApiData> | null>(null)

    useEffect(() => {

        getTasks()
            .then(json => {setTasks(json.data)})
    }, [])

    if (tasks === null) {
        return (
            <div>
                <span>Загрузка...</span>
            </div>
        )
    }
    
    if (tasks.length === 0) {
        return (
            <div>
                <span>Задачи отсутствуют</span>
            </div>
        )
    }

    const handleResetClick = () => {
        onTaskSelect?.(null, null)
    }

    const handlClick = (taskId: string , boardId: string) => {
        onTaskSelect?.(taskId, boardId)
    }
    
    return(
        <div>
            <button onClick={handleResetClick}>reset    
            </button>
            <ul>
                {tasks.map((task) => {
                    return(
                        <TaskItem 
                            key={task.id}
                            task={task}
                            onSelect={handlClick}
                            isSelect={task.id === selectedTaskId}
                        />
                    )
                })}
            </ul>
        </div>
    )
}


