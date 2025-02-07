import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTaskById, updateTaskStatus } from '@/api/TaskAPI';
import { toast } from 'react-toastify';
import { formatDate } from '@/utils/utils';
import { statusTranslations } from '@/locales/es';
import { taskStatus } from '@/types/index';


export default function TaskModalDetails() {
  
    const navigate = useNavigate()

    const location = useLocation()
    const query = new URLSearchParams(location.search)
    const taskId = query.get('taskView')!

    const params = useParams()
    const projectId = params.projectId!

    const taskModalData = {
        projectId,
        taskId
    }

    const {data, isError, error} = useQuery({
        queryKey: ['getTaskById', taskId],
        queryFn: () => getTaskById(taskModalData),
        enabled: !!taskId,
        retry: false
    })

    const queryClient = useQueryClient()
    const {mutate} = useMutation({
        mutationFn: updateTaskStatus,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['getProject', projectId]})
            queryClient.invalidateQueries({queryKey: ['getTaskById', taskId]})
        }
    })

    const handdleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const status = e.target.value as taskStatus
        mutate({
            projectId,
            taskId,
            status
        })
    }

    
    if(isError) {
        toast.error(error.message, {toastId: 'toastError'})
        return <Navigate to={`/projects/${projectId}`}/>
    }

    console.log(data)
    
    if(data) return (
        <>
            <Transition appear show={taskId ? true : false} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() =>   navigate(location.pathname, {replace: true})}>
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
                                     
                                    <p className='text-sm text-slate-400'>Agregada el: <span className='font-black text-xs'>{formatDate(data.createdAt)}</span>  </p>
                                    <p className='text-sm text-slate-400'>Última actualización: <span className='font-black text-xs'>{formatDate(data.updatedAt)}</span></p>

                                    <Dialog.Title
                                        as="h3"
                                        className="font-black text-4xl text-slate-600 my-5"
                                    >{data?.taskName}
                                    </Dialog.Title>

                                    <p className='text-lg text-slate-500 mb-2'>Descripción: {data?.description}</p>

                                    <div className='my-5 space-y-3'>
                                        <label className='font-bold'>Estado Actual: <span className=' font-normal'>{data.status}</span></label>
                                        <select
                                            className='w-full bg-white p-3 border border-gray-300'
                                            defaultValue={data.status}
                                            onChange={handdleOnChange}
                                        >
                                            {Object.entries(statusTranslations).map(([key, value ]) => (
                                                <option key={key} value={key}>{value}</option>
                                            ))}
                                        </select>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
