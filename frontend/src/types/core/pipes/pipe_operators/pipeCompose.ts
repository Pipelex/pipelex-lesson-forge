import type { Concept } from '@/types/core/concept/Concept';
import type { PipeBlueprint, PipeCategory, PipeType } from '@/types/core/pipes/base';
import type { PipeOperator } from '@/types/core/pipes/pipe_operators';

export enum TextFormat {
  PLAIN = 'plain',
  MARKDOWN = 'markdown',
  HTML = 'html',
  JSON = 'json',
  SPREADSHEET = 'spreadsheet',
}

export enum TagStyle {
  NO_TAG = 'no_tag',
  TICKS = 'ticks',
  XML = 'xml',
  SQUARE_BRACKETS = 'square_brackets',
}

export enum TemplateCategory {
  BASIC = 'basic',
  EXPRESSION = 'expression',
  HTML = 'html',
  MARKDOWN = 'markdown',
  MERMAID = 'mermaid',
  LLM_PROMPT = 'llm_prompt',
}

export interface TemplatingStyle {
  tag_style: TagStyle;
  text_format?: TextFormat;
}

export interface TemplateBlueprint {
  source: string;
  templating_style?: TemplatingStyle;
  category: TemplateCategory;
  extra_context?: Record<string, any>;
}

export interface PipeComposeBlueprint extends PipeBlueprint {
  type: PipeType.PipeCompose;
  pipe_category: PipeCategory.PipeOperator;
  template: string | TemplateBlueprint;
}

export interface PipeCompose extends PipeOperator {
  type: PipeType.PipeCompose;
  output: Concept;
  template: string;
  templating_style?: TemplatingStyle;
  category: TemplateCategory;
  extra_context?: Record<string, any>;
}
