import { useEffect, useState } from "react"
import './../App.css'

const priorityColors: { [key: number]: string } = {
    0 : '#ffffff',
    1 : '#ffd7b5',
    2 : '#ffb38a',
    3 : '#ff9248',
    4 : '#ff6700',
}

export function TasksList(){
    const [selectedTaskId, setSelectTaskId] = useState(null)
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
    

    return(
        <div>
            <ul>
                {tasks.map((task) => {
                    return(
                        <li key={task.id}>
                            <div className='taskBox' onClick={() => {
                                setSelectTaskId(task.id)
                                // setSelectBoardId(task.attributes.boardId)
                            }
                        }
                            style={
                                { backgroundColor: priorityColors[task.attributes.priority], 
                                border: task.id === selectedTaskId ? '6px solid blue' : '6px solid black'}
                            }>
                            <div className='title'>
                            <h2>Заголовок: </h2> 
                            <p style={
                                {textDecoration: task.attributes.status ? 'line-through' : 'none'}
                            }>{task.attributes.title}
                            </p>
                            </div>
                            <h2>Статус: <input id='inputChecked' type="checkbox" defaultChecked={task.attributes.status === 2}/></h2>
                            <div className='title'>
                                <h2>Дата создания задачи:</h2> 
                                <p>{new Date(task.attributes.addedAt).toLocaleDateString()}</p>
                            </div>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}