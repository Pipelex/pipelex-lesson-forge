import type { PipeBlueprint, PipeCategory, PipeType } from '@/types/core/pipes/base';
import type { PipeController } from '@/types/core/pipes/pipe_controllers';
export interface PipeBatchBlueprint extends PipeBlueprint {
  type: PipeType.PipeBatch;
  pipe_category: PipeCategory.PipeController;
  branch_pipe_code: string;
  input_list_name?: string;
  input_item_name?: string;
}

export interface BatchParams {
  input_list_stuff_name: string;
  input_item_stuff_name: string;
}

export interface PipeBatch extends PipeController {
  type: PipeType.PipeBatch;
  branch_pipe_code: string;
  batch_params?: BatchParams;
}
