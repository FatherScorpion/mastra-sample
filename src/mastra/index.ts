import { Mastra } from '@mastra/core';
// import { PinoLogger } from '@mastra/loggers';
import { VercelDeployer }  from '@mastra/deployer-vercel';
import { weatherWorkflow } from './workflows/weather-workflow';
import { weatherAgent } from './agents/weather-agent';
import { toolCallAppropriatenessScorer, completenessScorer, translationScorer } from './scorers/weather-scorer';

// Simple console logger to avoid pino dependency issues
const consoleLogger = {
  info: (message: string, ...args: any[]) => console.log(`[INFO] ${message}`, ...args),
  error: (message: string, ...args: any[]) => console.error(`[ERROR] ${message}`, ...args),
  warn: (message: string, ...args: any[]) => console.warn(`[WARN] ${message}`, ...args),
  debug: (message: string, ...args: any[]) => console.debug(`[DEBUG] ${message}`, ...args),
  trackException: (error: Error, context?: any) => console.error(`[EXCEPTION] ${error.message}`, error, context),
  getTransports: () => new Map(),
  getLogs: () => Promise.resolve({ logs: [], total: 0, page: 1, perPage: 10, hasMore: false }),
  getLogsByRunId: (args: { transportId: string; runId: string; fromDate?: Date; toDate?: Date; logLevel?: any; filters?: Record<string, any>; page?: number; perPage?: number; }) => Promise.resolve({ logs: [], total: 0, page: 1, perPage: 10, hasMore: false }),
};

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent },
  deployer: new VercelDeployer(),
  scorers: { toolCallAppropriatenessScorer, completenessScorer, translationScorer },
  logger: consoleLogger,
  telemetry: {
    // Telemetry is deprecated and will be removed in the Nov 4th release
    enabled: false, 
  },
  observability: {
    // Enables DefaultExporter and CloudExporter for AI tracing
    default: { enabled: true }, 
  },
});
