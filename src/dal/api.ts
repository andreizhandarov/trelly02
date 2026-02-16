type GlobalTaskListItemDto = {
    id: string
    title: string
    boardId: string
    status: number
    priority: number
    addedAt: string
    attachmentsCount: number 
}

export type GlobalTaskListItemJsonApiData = {
    id: string
    type: string
    attributes: GlobalTaskListItemDto
}

type GlobalTaskListResponse = {
    data: Array<GlobalTaskListItemJsonApiData>
}

export const getTasks = () => {
    const promise: Promise<GlobalTaskListResponse> = fetch('https://trelly.it-incubator.app/api/1.0/boards/tasks', {
        headers: {
            'api-key': ''
        }
    })
    .then(res => res.json())

    return promise
}

type TaskDetailsDto = {
    id: string
    title: string
    description: string
    boardId: string
    boardTitle: string
    order: number
    status: number
    priority: number
    addedAt: string
    updatedAt: string
    attachments: Array<string>
}

export type TaskDetailsData = {
    id: string
    type: string
    attributes: TaskDetailsDto
}

type GetTaskOutput = {
    data: TaskDetailsData
}

type Props = {
    boardId: string | null,
    taskId: string | null
}


export const getTask = ({boardId, taskId}: Props) => {
    const promise: Promise<GetTaskOutput> = fetch(`https://trelly.it-incubator.app/api/1.0/boards/${boardId}/tasks/${taskId}`, {
        headers: {
            'api-key': ''
        }
    })
    .then(res => res.json())

    return promise
}