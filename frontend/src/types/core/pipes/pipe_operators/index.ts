export * from '@/types/core/pipes/pipe_operators/pipeCompose';
export * from '@/types/core/pipes/pipe_operators/pipeExtract';
export * from '@/types/core/pipes/pipe_operators/pipeFunc';
export * from '@/types/core/pipes/pipe_operators/pipeImgGen';
export * from '@/types/core/pipes/pipe_operators/pipeLLM';

import type { PipeAbstract, PipeCategory } from '@/types/core/pipes/base';

export interface PipeOperator extends PipeAbstract {
  pipe_category: PipeCategory.PipeOperator;
}
