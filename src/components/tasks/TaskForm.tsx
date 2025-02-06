import { FieldErrors, UseFormRegister } from "react-hook-form"
import { TaskFormData } from "@/types/index"
import Errormessage from "../Errormessage"
type TaskFormProps = {
    errors: FieldErrors<TaskFormData>
    register: UseFormRegister<TaskFormData>
}

export default function TaskForm({errors, register} : TaskFormProps) {
    return (
        <>
            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="taskName"
                >Nombre de la tarea</label>
                <input
                    id="taskName"
                    type="text"
                    placeholder="Nombre de la tarea"
                    className="w-full p-3  border-gray-300 border"
                    {...register("taskName", {
                        required: "El nombre de la tarea es obligatorio",
                    })}
                />
                {errors.taskName && (
                    <Errormessage>{errors.taskName.message}</Errormessage>
                )}
            </div>

            <div className="flex flex-col gap-5">
                <label
                    className="font-normal text-2xl"
                    htmlFor="description"
                >Descripción de la tarea</label>
                <textarea
                    id="description"
                    placeholder="Descripción de la tarea"
                    className="w-full p-3  border-gray-300 border"
                    {...register("description", {
                        required: "La descripción de la tarea es obligatoria"
                    })}
                />
                {errors.description && (
                    <Errormessage>{errors.description.message}</Errormessage>
                )}
            </div>
        </>
    )
}
