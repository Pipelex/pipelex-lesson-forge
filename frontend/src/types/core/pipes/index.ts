export * from '@/types/core/pipes/base';
export * from '@/types/core/pipes/pipe_controllers';
export * from '@/types/core/pipes/pipe_operators';

import type { PipeBatchBlueprint, PipeBatch } from '@/types/core/pipes/pipe_controllers/pipeBatch';
import type {
  PipeConditionBlueprint,
  PipeCondition,
} from '@/types/core/pipes/pipe_controllers/pipeCondition';
import type {
  PipeParallelBlueprint,
  PipeParallel,
} from '@/types/core/pipes/pipe_controllers/pipeParallel';
import type {
  PipeSequenceBlueprint,
  PipeSequence,
} from '@/types/core/pipes/pipe_controllers/pipeSequence';
import type {
  PipeComposeBlueprint,
  PipeCompose,
} from '@/types/core/pipes/pipe_operators/pipeCompose';
import type {
  PipeExtractBlueprint,
  PipeExtract,
} from '@/types/core/pipes/pipe_operators/pipeExtract';
import type { PipeFuncBlueprint, PipeFunc } from '@/types/core/pipes/pipe_operators/pipeFunc';
import type { PipeImgGenBlueprint, PipeImgGen } from '@/types/core/pipes/pipe_operators/pipeImgGen';
import type { PipeLLMBlueprint, PipeLLM } from '@/types/core/pipes/pipe_operators/pipeLLM';

export type PipeBlueprintUnion =
  | PipeLLMBlueprint
  | PipeExtractBlueprint
  | PipeFuncBlueprint
  | PipeImgGenBlueprint
  | PipeComposeBlueprint
  | PipeBatchBlueprint
  | PipeConditionBlueprint
  | PipeParallelBlueprint
  | PipeSequenceBlueprint;

export type PipeUnion =
  | PipeLLM
  | PipeExtract
  | PipeFunc
  | PipeImgGen
  | PipeCompose
  | PipeBatch
  | PipeCondition
  | PipeParallel
  | PipeSequence;
