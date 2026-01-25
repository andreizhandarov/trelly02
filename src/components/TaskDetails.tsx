import { useEffect, useState } from "react"

export function TaskDetails(){
    const [selectedTask, setSelectedTask] = useState(null)
    const [selectBoardId, setSelectBoardId] = useState('13923117-72de-4788-a7f0-4c42f162a5ab')

    const selectedTaskId = '4f310604-82b5-4afd-b9a4-ddf12dfac0a3'

    useEffect(() => {
        if(!selectedTaskId){
            return
        }
    
        fetch(`https://trelly.it-incubator.app/api/1.0/boards/${selectBoardId}/tasks/${selectedTaskId}`, {
            headers: {
                'api-key': ''
            }
        })
        .then(res => res.json())
        .then(json => {setSelectedTask(json.data)})
    }, [selectedTaskId])
    
    return(
        <div>
            <h2>Task ditail</h2>
            {!selectedTaskId && !selectedTask && <span>"Not ditails"</span>}
            {((selectedTaskId && !selectedTask) || (selectedTask && selectedTaskId !== selectedTask.id))  && <span>Loading...</span>}
            {selectedTask && selectedTaskId === selectedTask.id && (
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