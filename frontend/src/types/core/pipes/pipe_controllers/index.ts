export * from '@/types/core/pipes/pipe_controllers/pipeBatch';
export * from '@/types/core/pipes/pipe_controllers/pipeCondition';
export * from '@/types/core/pipes/pipe_controllers/pipeParallel';
export * from '@/types/core/pipes/pipe_controllers/pipeSequence';

import type { PipeAbstract, PipeCategory } from '@/types/core/pipes/base';

export interface PipeController extends PipeAbstract {
  pipe_category: PipeCategory.PipeController;
}
