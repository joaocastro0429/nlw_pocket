import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { createGoal } from '../functions/create-goals';

export const createGoalRoute: FastifyPluginAsyncZod = async function (server) {
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
  
};