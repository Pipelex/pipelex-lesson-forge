import type { PipeBlueprint, PipeCategory, PipeType } from '@/types/core/pipes/base';
import type { PipeController } from '@/types/core/pipes/pipe_controllers';

export enum SpecialOutcome {
  Continue = 'continue',
  // Break = 'break',
  Fail = 'fail',
}

export type OutcomeMap = Record<string, string>;

export interface PipeConditionBlueprint extends PipeBlueprint {
  type: PipeType.PipeCondition;
  pipe_category: PipeCategory.PipeController;
  expression_template?: string;
  expression?: string;
  outcomes: OutcomeMap;
  default_outcome: string | SpecialOutcome;
  add_alias_from_expression_to?: string;
}
type ConditionOutcomeMap = Record<string, string | SpecialOutcome>;
export interface PipeCondition extends PipeController {
  type: PipeType.PipeCondition;
  expression_template?: string;
  expression?: string;
  outcome_map: ConditionOutcomeMap;
  default_outcome?: string;
  add_alias_from_expression_to?: string;
}
