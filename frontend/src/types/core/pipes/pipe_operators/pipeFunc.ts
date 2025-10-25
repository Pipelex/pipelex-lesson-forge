import type { PipeBlueprint, PipeCategory, PipeType } from '@/types/core/pipes/base';
import type { PipeOperator } from '@/types/core/pipes/pipe_operators';
export interface PipeFuncBlueprint extends PipeBlueprint {
  type: PipeType.PipeFunc;
  pipe_category: PipeCategory.PipeOperator;
  function_name: string;
}

export interface PipeFunc extends PipeOperator {
  type: PipeType.PipeFunc;
  function_name: string;
}
