import { Link, useNavigate } from "react-router-dom"
import {useForm} from 'react-hook-form'
import { useMutation } from "@tanstack/react-query"
import {toast} from 'react-toastify'
import ProjectForm from "@/components/projects/ProjectForm"
import {  projectFormData } from "@/types/index"
import { createProject } from "@/api/ProjectAPI"

export default function CreateprojectView() {

    const navigate = useNavigate()

    const initialValues = {
        projectName: "",
        clientName: "",
        description: ""
    }
    const {register, handleSubmit, formState: {errors}} = useForm({defaultValues: initialValues})

    const {mutate} = useMutation({
        mutationFn: createProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            navigate('/')
        }
    })    

    const handleForm = (formdata: projectFormData) => mutate(formdata)
  return (
    <>
        <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-black">Crear Proyecto</h1>
            <p className="text-2xl font-light text-gray-500 mt-5">Llena el siguiente formulario para crear un proyecto</p>

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
                    value={'crear proyecto'}
                    className=" bg-fuchsia-500 w-full p-3 uppercase font-bold hover:bg-fuchsia-600 text-white transition-colors cursor-pointer rounded-2xl"
                />
            </form>
        </div>
        
    </>
  )
}
