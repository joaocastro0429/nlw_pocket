import z from 'zod'

const schema=z.object({
    DB_URL:z.string().url(),
})
// verifica se o formato esta correto 
export const env=schema.parse(process.env)