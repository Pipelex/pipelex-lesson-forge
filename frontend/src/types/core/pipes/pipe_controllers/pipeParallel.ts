import type {
  PipeBlueprint,
  SubPipeBlueprint,
  PipeCategory,
  PipeType,
} from '@/types/core/pipes/base';
import type { PipeController } from '@/types/core/pipes/pipe_controllers';

export interface PipeParallelBlueprint extends PipeBlueprint {
  type: PipeType.PipeParallel;
  pipe_category: PipeCategory.PipeController;
  parallels: SubPipeBlueprint[];
  add_each_output: boolean;
  combined_output?: string;
}

export interface PipeParallel extends PipeController {
  type: PipeType.PipeParallel;
  parallels: SubPipeBlueprint[];
  add_each_output: boolean;
  combined_output?: string;
}
