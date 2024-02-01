import { z } from 'zod'

export const registerUserFormSchema = z.object({
    username: z.string().min(1, "O usuário é obrigatório!"),
    password: z.string().min(1, "A senha é obrigatória!")
})
