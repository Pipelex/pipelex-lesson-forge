import type { WorkingMemory, DictWorkingMemory } from '@/types/core/memory/workingMemory';

export interface PipeOutput {
  working_memory: WorkingMemory;
  pipeline_run_id: string;
}

export interface DictPipeOutput {
  working_memory: DictWorkingMemory;
  pipeline_run_id: string;
}
