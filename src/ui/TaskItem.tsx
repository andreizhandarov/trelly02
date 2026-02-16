import type { GlobalTaskListItemJsonApiData } from "../dal/api"

const priorityColors: { [key: number]: string } = {
    0 : '#ffffff',
    1 : '#ffd7b5',
    2 : '#ffb38a',
    3 : '#ff9248',
    4 : '#ff6700',
}

type Props = {
    isSelect: boolean
    onSelect: (id: string, iDBoard: string) => void
    task: GlobalTaskListItemJsonApiData
}

export function TaskItem({task, onSelect, isSelect}: Props){

    const handlClick = () => {
        onSelect?.(task.id, task.attributes.boardId)}

    return (
        <div>
            <li>
                <div className='taskBox' onClick={handlClick}
                    style={{backgroundColor: priorityColors[task.attributes.priority], 
                            border: isSelect ? '6px solid blue' : '6px solid black'}}>
                    <div className='title'>
                        <h2>Заголовок: </h2> 
                        <p style={{textDecoration: task.attributes.status ? 'line-through' : 'none'}}>{task.attributes.title}</p>
                    </div>
                    <h2>Статус: <input id='inputChecked' type="checkbox" defaultChecked={task.attributes.status === 2}/></h2>
                    <div className='title'>
                        <h2>Дата создания задачи:</h2> 
                        <p>{new Date(task.attributes.addedAt).toLocaleDateString()}</p>
                    </div>
                </div>
            </li>
        </div>
    )
}