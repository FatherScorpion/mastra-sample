import { Mastra } from '@mastra/core';
import { VercelDeployer }  from '@mastra/deployer-vercel';
import { weatherWorkflow } from './workflows/weather-workflow';
import { weatherAgent } from './agents/weather-agent';
import { toolCallAppropriatenessScorer, completenessScorer, translationScorer } from './scorers/weather-scorer';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent },
  deployer: new VercelDeployer(),
  scorers: { toolCallAppropriatenessScorer, completenessScorer, translationScorer },
  logger: false,
  telemetry: {
    // Telemetry is deprecated and will be removed in the Nov 4th release
    enabled: false, 
  },
  observability: {
    // Enables DefaultExporter and CloudExporter for AI tracing
    default: { enabled: true }, 
  },
});
