import type {
  PipeBlueprint,
  PipeCategory,
  PipeType,
  PipeOutputMultiplicity,
} from '@/types/core/pipes/base';
import type { PipeOperator, TemplateBlueprint } from '@/types/core/pipes/pipe_operators';
import type { TemplatingStyle } from '@/types/core/pipes/pipe_operators/pipeCompose';

export enum StructuringMethod {
  Direct = 'direct',
  PreliminaryText = 'preliminary_text',
}

export enum PromptingTarget {
  OPENAI = 'openai',
  ANTHROPIC = 'anthropic',
  MISTRAL = 'mistral',
  GEMINI = 'gemini',
  FAL = 'fal',
}

export interface LLMSetting {
  model: string;
  temperature: number;
  max_tokens?: number | null;
  prompting_target?: PromptingTarget | null;
}

export type LLMModelChoice = LLMSetting | string;

export interface PipeLLMBlueprint extends PipeBlueprint {
  type: PipeType.PipeLLM;
  pipe_category: PipeCategory.PipeOperator;
  model?: LLMModelChoice;
  model_to_structure?: LLMModelChoice;
  system_prompt?: string;
  prompt?: string;
  structuring_method?: StructuringMethod;
  nb_output?: number;
  multiple_output?: boolean;
}

interface LLMPromptBlueprint {
  templating_style?: TemplatingStyle;
  system_prompt_blueprint?: TemplateBlueprint;
  prompt_blueprint?: TemplateBlueprint;
  user_images?: string[];
}

interface LLMSettingChoices {
  for_text?: LLMModelChoice;
  for_objec?: LLMModelChoice;
}
export interface PipeLLM extends PipeOperator {
  type: PipeType.PipeLLM;
  llm_prompt_spec: LLMPromptBlueprint;
  llm_choices?: LLMSettingChoices;
  structuring_method?: StructuringMethod;
  output_multiplicity?: PipeOutputMultiplicity;
}
