import type { Concept } from '@/types/core/concept/Concept';
import type { PipeOutputMultiplicity } from '@/types/core/pipes/base';

export interface InputRequirementBlueprint {
  type: string;
  required?: boolean;
  description?: string;
}

export interface InputRequirement {
  concept: Concept;
  multiplicity?: PipeOutputMultiplicity;
}

type InputRequirementsRoot = Record<string, InputRequirement>;

export interface InputRequirements {
  root: InputRequirementsRoot;
}
