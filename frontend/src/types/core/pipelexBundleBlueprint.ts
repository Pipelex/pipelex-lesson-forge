import type { ConceptBlueprint } from '@/types/core/concept/conceptBlueprint';
import type { PipeBlueprintUnion } from '@/types/core/pipes';

export interface PipelexBundleBlueprint {
  source?: string;
  domain: string;
  description?: string;
  system_prompt?: string;
  main_pipe?: string;
  concept?: Record<string, ConceptBlueprint | string>;
  pipe?: Record<string, PipeBlueprintUnion>;
}
