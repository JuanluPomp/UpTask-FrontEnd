import { Navigate, useNavigate, useParams } from "react-router-dom"
import {  useQuery } from "@tanstack/react-query"
import { getProjectById } from "@/api/ProjectAPI"
import AddTaskModal from "@/components/tasks/AddTaskModal"
import TaskList from "@/components/tasks/TaskList"
import EditTaskData from "@/components/tasks/EditTaskdata"

export default function ProjectDetailView() {
    
    const navigate = useNavigate()

    const params = useParams()
    const projectId = params.projectId!

    const { data: projectData, isLoading, isError } = useQuery({
      queryKey: ['getProject', projectId],
      queryFn: () => getProjectById(projectId),
      retry: false
    })
    
    if(isLoading) return 'cargando...'
    if(isError) return <Navigate to={'/404'}></Navigate>
    
  if(projectData) return (
    <>
        <h1 className="  text-5xl font-black">{projectData.projectName}</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">{projectData.description}</p>
        <nav className="my-5 flex gap-3">
            <button
                type="button"
                className="bg-purple-400 hover:bg-purple-500 px-8 py-2 text-white text-xl font-bold cursor-pointer transition-colors"
                onClick={() => navigate(location.pathname + '?newTask=true')}
            >Agregar Tarea</button>
        </nav>
        <TaskList
          tasks={projectData.tasks}
        />
        <AddTaskModal/>
        <EditTaskData/>
    </>
  )
}
