import { dashboardProjectSchema, Project, projectFormData, projectSchema } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";


export async function createProject(formData: projectFormData){
    try {
        const {data} = await api.post<string>('/projects', formData)
        if(data){
            return data
        }
    } catch (error) {
        if(isAxiosError(error) && error.response){
           throw new Error(error.response.data.error)
        }
    }
    
}

export async function getProjects(){
    try {
        const {data} = await api('/projects')
        const response = dashboardProjectSchema.safeParse(data)
        if(response.success){
            return response.data
        } 
    } catch (error) {
        console.log(error)
    }
}

export async function getProjectById(id: Project['_id']) {
    try {
        const {data} = await api(`/projects/${id}`)
        const response = projectSchema.safeParse(data)
        if(response.success){
            return data
        }
    } catch (error) {
        console.log(error)
    }
}

type editProjectType = {
    formData: projectFormData,
    projectId: Project['_id']
}
export async function ediProject ({formData, projectId}: editProjectType){
    try {
        const {data} = await api.put<string>(`/projects/${projectId}`, formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
        
    }
}

export async function deletProject(id: Project['_id']){
    try {
        const {data} = await api.delete(`/projects/${id}`)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response)
        throw new Error(error.response.data.message)
        
    }
}