import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {  useLocation, useNavigate, useParams } from 'react-router-dom'
import TaskForm from './TaskForm';
import { useForm } from 'react-hook-form';
import { Project, TaskFormData } from '@/types/index';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '@/api/TaskAPI';
import { toast } from 'react-toastify';


export default function AddTaskModal() {
    const navigate = useNavigate()
    //Encontrar parametro para activar modal
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const modalTask = queryParams.get('newTask')
    const showModal = modalTask ? true : false

    //React hook form y sus funciones
    const initialValues = {
        taskName: '',
        description: ''
    }
    const {register, handleSubmit, reset, formState: {errors}} = useForm({defaultValues: initialValues})

    //Obbtener projectId 
    const params = useParams()
    const projectId : Project['_id'] = params.projectId!
    //mutation para crear tareas nuevas

    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: createTask,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['getProject']} )
            reset()
            navigate(location.pathname, {replace: true})
        }
    })  
    //Funcion del submit
    const handleCreateTask = (formData : TaskFormData) => {
        const data = {
            formData,
            projectId
        }
        mutate(data)
    }

    
    return (
        <>
            <Transition appear show={showModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => navigate(location.pathname, {replace: true})}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl  my-5"
                                    >
                                        Nueva Tarea
                                    </Dialog.Title>

                                    <p className="text-xl font-bold">Llena el formulario y crea  {''}
                                        <span className="text-fuchsia-600">una tarea</span>
                                    </p>
                                    <form 
                                        className='mt-10 space-y-3'
                                        onSubmit={handleSubmit(handleCreateTask)}
                                        noValidate
                                    >
                                        <TaskForm
                                            errors={errors}
                                            register={register}
                                        />
                                        <input
                                             type="submit"
                                             value={'Guardar tarea'}
                                             className=" bg-fuchsia-500 w-full p-3 uppercase font-bold hover:bg-fuchsia-600 text-white transition-colors cursor-pointer rounded-2xl"
                                        />
                                    </form>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
