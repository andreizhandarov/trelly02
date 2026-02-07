import { useEffect, useState } from "react"
import './../App.css'
import { TaskItem } from "./TaskItem"


export function TasksList({onTaskSelect, selectedTaskId}){

    const [tasks, setTasks] = useState(null)

    useEffect(() => {
        fetch('https://trelly.it-incubator.app/api/1.0/boards/tasks', {
            headers: {
                'api-key': ''
            }
        })
        .then(res => res.json())
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

    const handlClick = (taskId, boardId) => {
        onTaskSelect?.(taskId, boardId)
    }
    
    return(
        <div>
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


