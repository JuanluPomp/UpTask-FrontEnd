import { Link, useNavigate, } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useForm } from "react-hook-form";
import {  Project, projectFormData } from "@/types/index";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { ediProject } from "@/api/ProjectAPI";
import { toast } from "react-toastify";

type EditProjectFormProps = {
    data: projectFormData,
    projectId: Project['_id']
}

export default function EditProjectForm({data, projectId}: EditProjectFormProps) {

    const navigate = useNavigate()
    const initialValues: projectFormData = {
        projectName: data.projectName,
        clientName: data.clientName,
        description: data.description
    }

    const { register, handleSubmit,  formState: {errors} } = useForm({defaultValues: initialValues})

    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn: ediProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['projects']})
            queryClient.invalidateQueries({queryKey: ['editProject'], projectId})
            toast.success(data)
            navigate('/')
        }
    })

    const handleForm = (formData: projectFormData)=> {
        const data = {
            formData,
            projectId
        }
        mutate(data)
        
    }
  return (
    <>
        <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black">Editar Proyecto</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para editar un proyecto</p>

            <nav className="my-5">
                <Link
                    className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl
                    font-bold cursor-pointer transition-colors"
                    to={'/'}
                >Volver a proyectos</Link>
            </nav>

            <form
                className=" bg-white mt-10 p-10 rounded-xl shadow-lg"
                onSubmit={handleSubmit(handleForm)}
                noValidate
            >
                <ProjectForm
                    register={register}
                    errors={errors}
                />
                <input 
                    type="submit"
                    value={'Guardar Cambios'}
                    className=" bg-fuchsia-500 w-full p-3 uppercase font-bold hover:bg-fuchsia-600 text-white transition-colors cursor-pointer rounded-2xl"
                />
            </form>
        </div>
        
    </>
  )
}
