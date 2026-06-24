import {createOpenAI} from "@ai-sdk/openai"

const apiKey = process.env.OPEN_AI_API_KEY;

export const openaiProvider = apiKey ? createOpenAI({apiKey}) : null