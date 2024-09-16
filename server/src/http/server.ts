import fastify from "fastify";
import { createGoal } from "../functions/create-goals";
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from "fastify-type-provider-zod";

import z from "zod";
import { createGoalRoute } from "../routes/create-goals";
import {createCompletionRoute} from '../routes/create-goal-completion'
import { createPendingRoutes } from "../routes/get-week-pending-goals";
import { getWeekSummary } from "../functions/get-week-sammary";
import { getWeekSummaryRoute } from "../routes/get-week-sammary";

const server=fastify().withTypeProvider<ZodTypeProvider>()

// Add schema validator and serializer
server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.get("/", () => {
    return { message: "Hello, World!" };
});

server.register(createGoalRoute)
server.register(createCompletionRoute)
server.register(createPendingRoutes)
server.register(getWeekSummaryRoute)

server.listen({
    port: 3333
}).then(()=>{
    console.log("HTTP server running")
})