import {z} from 'zod'


//projects
export const projectSchema = z.object({
        _id: z.string(),
        projectName: z.string(),
        clientName: z.string(),
        description: z.string()
})
export const dashboardProjectSchema = z.array(
        projectSchema.pick({
                _id: true,
                projectName: true,
                clientName: true,
                description: true
        })
)
export type Project = z.infer<typeof projectSchema>
export type projectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>

//tasks
export const taskStatusSchema = z.enum(["pending" , "onHold" , "inProgress" , "underReview" , "completed"])
export const taskSchema = z.object({
        _id: z.string(),
        taskName: z.string(),
        description: z.string(),
        project: z.string(),
        status: taskStatusSchema,
        createdAt: z.string(),
        updatedAt: z.string()
})
export const tasksSchema = z.array(
        taskSchema
)
export type  Task = z.infer<typeof taskSchema>
export type TaskFormData = Pick<Task, 'taskName' | 'description' >
export type taskStatus = z.infer<typeof taskStatusSchema>