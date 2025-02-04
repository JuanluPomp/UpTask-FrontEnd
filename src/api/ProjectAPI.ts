import { dashboardProjectSchema, projectFormData } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";


export async function createProject(formData: projectFormData){
    try {
        const {data} = await api.post('/projects', formData)
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