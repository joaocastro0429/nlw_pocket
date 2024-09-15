import fastify from "fastify";
import { createGoal } from "../functions/create-goals";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";

import z from "zod";
import { getWeekPendingGoals } from "../functions/get-week-pending-goals";
import { createGoalCompletion } from "../functions/create-goal-completion";

const server=fastify().withTypeProvider<ZodTypeProvider>()

// Add schema validator and serializer
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.get("/", () => {
    return { message: "Hello, World!" };
});
server.get('/pending-goals', async () => {
    const { pendingGoals } = await getWeekPendingGoals()
  
    return { pendingGoals }
  })
server.post("/goals",{
    schema:{
        body: z.object({
            title: z.string(),
            desiredWeeklyFrequency: z.number().int().max(7),
        })
    }
},async request => {
    const { title, desiredWeeklyFrequency } = request.body

    await createGoal({
      title,
      desiredWeeklyFrequency,
    })
  }
)
server.post(
    '/completions',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async request => {
      const { goalId } = request.body
  
      await createGoalCompletion({
        goalId,
      })
    }
  )
server.listen({
    port: 3333
}).then(()=>{
    console.log("HTTP server running")
})