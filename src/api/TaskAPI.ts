import api from "@/lib/axios"
import { isAxiosError } from "axios"
import { Project, Task, TaskFormData, tasksSchema } from "../types"

type CreateTaskType = {
    formData: TaskFormData,
    projectId: Project['_id'],
    taskId: Task['_id']
}
export async function createTask({formData, projectId}: Pick<CreateTaskType, 'formData' | 'projectId'>){
    try {
        const {data} = await api.post<string>(`/projects/${projectId}/tasks`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.message)
        }
    }
}

export async function getTasks(projectId: Project['_id']){
    try {
        const url = `/projects/${projectId}/tasks`
        const {data} = await api(url)
        console.log(data)
        const response = tasksSchema.safeParse(data)
        if(response.success){
            return data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function getTaskById({projectId, taskId} : Pick<CreateTaskType, 'projectId' | 'taskId'>){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const {data} = await api(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export async function editTask({taskId, formData, projectId} : Pick<CreateTaskType, 'projectId' | 'taskId' | 'formData'>){
    try {
        const url = `projects/${projectId}/tasks/${taskId}`
        const {data} = await api.put<string>(url, formData)
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function deleteTask({projectId, taskId}: Pick<CreateTaskType, 'projectId' | 'taskId'>){
    try {
        const url = `/projects/${projectId}/tasks/${taskId}`
        const {data} = await api.delete(url)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
        
    }
}