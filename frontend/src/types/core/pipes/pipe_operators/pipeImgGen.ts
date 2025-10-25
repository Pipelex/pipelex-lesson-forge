import type {
  PipeBlueprint,
  PipeCategory,
  PipeType,
  PipeOutputMultiplicity,
} from '@/types/core/pipes/base';
import type { PipeOperator } from '@/types/core/pipes/pipe_operators';

export enum AspectRatio {
  SQUARE = 'square',
  LANDSCAPE_4_3 = 'landscape_4_3',
  LANDSCAPE_3_2 = 'landscape_3_2',
  LANDSCAPE_16_9 = 'landscape_16_9',
  LANDSCAPE_21_9 = 'landscape_21_9',
  PORTRAIT_3_4 = 'portrait_3_4',
  PORTRAIT_2_3 = 'portrait_2_3',
  PORTRAIT_9_16 = 'portrait_9_16',
  PORTRAIT_9_21 = 'portrait_9_21',
}

export enum Background {
  TRANSPARENT = 'transparent',
  OPAQUE = 'opaque',
  AUTO = 'auto',
}

export enum OutputFormat {
  PNG = 'png',
  JPG = 'jpg',
  WEBP = 'webp',
}

export enum Quality {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

export interface ImgGenSetting {
  model: string;
  quality?: Quality;
  nb_steps?: number;
  guidance_scale?: number;
  is_moderated?: boolean;
  safety_tolerance?: number;
}

export type ImgGenModelChoice = ImgGenSetting | string;

export interface PipeImgGenBlueprint extends PipeBlueprint {
  type: PipeType.PipeImgGen;
  pipe_category: PipeCategory.PipeOperator;
  img_gen_prompt?: string;
  img_gen_prompt_var_name?: string;

  model?: ImgGenModelChoice;

  // One-time settings (not in ImgGenSetting)
  aspect_ratio?: AspectRatio;
  is_raw?: boolean;
  seed?: number | 'auto';
  nb_output?: number;
  background?: Background;
  output_format?: OutputFormat;
}

export interface PipeImgGen extends PipeOperator {
  type: PipeType.PipeImgGen;
  img_gen_prompt?: string;
  img_gen_prompt_var_name?: string;
  img_gen?: ImgGenModelChoice;
  img_gen_handle?: string;
  quality?: Quality;
  nb_steps?: number;
  // TODO: guidance_scale shouldbe a float
  guidance_scale?: number;
  is_moderated?: boolean;
  safety_tolerance?: number;
  aspect_ratio?: AspectRatio;
  is_raw?: boolean;
  seed?: number | 'auto';
  background?: Background;
  output_format?: OutputFormat;
  output_multiplicity?: PipeOutputMultiplicity;
}
