import type { PipeOutputMultiplicity } from '@/types/core/pipes';
import type { DictPipeOutput } from '@/types/core/pipes/pipe-output';
import type { StuffContent, DictStuff } from '@/types/core/stuffs/stuff';

export type StuffContentOrData =
  | string
  | string[]
  | StuffContent
  | StuffContent[]
  | Record<string, any>
  | DictStuff;

export type PipelineInputs = Record<string, StuffContentOrData>;

interface ApiResponse {
  status?: string;
  message?: string;
  error?: string;
}

export enum PipelineState {
  RUNNING = 'RUNNING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  ERROR = 'ERROR',
  STARTED = 'STARTED',
}

/**
 * Request for executing a pipeline.
 * Matches Python PipelineRequest model.
 */
export interface PipelineRequest {
  inputs?: PipelineInputs | null;
  output_name?: string | null;
  output_multiplicity?: PipeOutputMultiplicity | null;
  dynamic_output_concept_code?: string | null;
  plx_content?: string | null;
}

export interface PipelineResponse extends ApiResponse {
  pipeline_run_id: string;
  created_at: string;
  pipeline_state: PipelineState;
  finished_at?: string;
  pipe_output?: DictPipeOutput;
  main_stuff_name?: string;
  pipe_structures?: Record<string, any>;
}
