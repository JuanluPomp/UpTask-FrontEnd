
import { Navigate, useLocation, useParams } from "react-router-dom"
import EditTaskModal from "./EditTaskModal"
import { useQuery } from "@tanstack/react-query"
import { getTaskById } from "@/api/TaskAPI"


export default function EditTaskData() {

    //obteniendo el id del query string de la url
    const location = useLocation()
    const queryParams  = new URLSearchParams(location.search)!
    const taskId = queryParams.get('editTask')!

    //Obtenemos el id del proyecto por medio de los params de la url
    const params = useParams()
    const  projectId = params.projectId!

    //este query llama la funcion que hace la consulta
    const {data, isError} = useQuery({
        queryKey: ['editTask', taskId],
        queryFn:() => getTaskById({projectId, taskId}),
        enabled: !!taskId,
        retry: false
    })

    if(isError) return <Navigate to={'/404'}/>


    if(data) return <EditTaskModal data={data} taskId={taskId}/>
}
