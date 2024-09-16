import { z } from 'zod';
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { getWeekPendingGoals } from '../functions/get-week-pending-goals';

export const createPendingRoutes: FastifyPluginAsyncZod = async function (server) {
    server.get('/pending-goals', async () => {
        const { pendingGoals } = await getWeekPendingGoals()
      
        return { pendingGoals }
      })
  
};