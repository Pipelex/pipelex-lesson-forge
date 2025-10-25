import type {
  PipeBlueprint,
  SubPipeBlueprint,
  PipeCategory,
  PipeType,
  PipeOutputMultiplicity,
} from '@/types/core/pipes/base';
import type { PipeController } from '@/types/core/pipes/pipe_controllers';
import type { BatchParams } from '@/types/core/pipes/pipe_controllers/pipeBatch';
export interface PipeSequenceBlueprint extends PipeBlueprint {
  type: PipeType.PipeSequence;
  pipe_category: PipeCategory.PipeController;
  steps: SubPipeBlueprint[];
}

interface SubPipe {
  pipe_code: string;
  output_name?: string;
  output_multiplicity?: PipeOutputMultiplicity;
  batch_params?: BatchParams;
  concept_codes_from_the_same_domain?: string[];
}
export interface PipeSequence extends PipeController {
  type: PipeType.PipeSequence;
  sequential_sub_pipes: SubPipe[];
}
