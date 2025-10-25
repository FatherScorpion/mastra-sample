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
