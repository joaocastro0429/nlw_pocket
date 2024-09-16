import { FastifyPluginAsync } from 'fastify';
import { getWeekSummary } from '../functions/get-week-sammary'; // Note the corrected spelling

export const getWeekSummaryRoute: FastifyPluginAsync = async (server) => {
  server.get('/summary', {}, async () => {
    const { summary } = await getWeekSummary();
    return { summary };
  });
};
