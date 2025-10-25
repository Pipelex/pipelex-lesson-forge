import type { Concept } from '@/types/core/concept/Concept';
import type { InputRequirementBlueprint, InputRequirements } from '@/types/core/pipes/inputs';
export enum PipeCategory {
  PipeOperator = 'PipeOperator',
  PipeController = 'PipeController',
}

export enum PipeType {
  // Operators
  PipeLLM = 'PipeLLM',
  PipeExtract = 'PipeExtract',
  PipeFunc = 'PipeFunc',
  PipeImgGen = 'PipeImgGen',
  PipeCompose = 'PipeCompose',
  // Controllers
  PipeBatch = 'PipeBatch',
  PipeCondition = 'PipeCondition',
  PipeParallel = 'PipeParallel',
  PipeSequence = 'PipeSequence',
}

export type PipeOutputMultiplicity = boolean | number;

export interface PipeBlueprint {
  source?: string;
  type: PipeType;
  pipe_category: PipeCategory;
  description?: string;
  inputs?: Record<string, string | InputRequirementBlueprint>;
  output: string;
}

export interface SubPipeBlueprint {
  pipe: string;
  result?: string;
  nb_output?: number;
  multiple_output?: boolean;
  batch_over?: string;
  batch_as?: string;
}

export interface PipeAbstract {
  pipe_category: PipeCategory;
  type: PipeType;
  code: string;
  domain: string;
  description?: string;
  inputs: InputRequirements;
  output: Concept;
}
