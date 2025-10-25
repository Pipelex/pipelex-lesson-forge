import type { PipeBlueprint, PipeCategory, PipeType } from '@/types/core/pipes/base';
import type { PipeOperator } from '@/types/core/pipes/pipe_operators';
export interface ExtractSetting {
  model: string;
  max_nb_images?: number;
  image_min_size?: number;
}

export type ExtractModelChoice = ExtractSetting | string;

export interface PipeExtractBlueprint extends PipeBlueprint {
  type: PipeType.PipeExtract;
  pipe_category: PipeCategory.PipeOperator;
  model?: ExtractModelChoice;
  page_images?: boolean;
  page_image_captions?: boolean;
  page_views?: boolean;
  page_views_dpi?: number;
}

export interface PipeExtract extends PipeOperator {
  type: PipeType.PipeExtract;
  extract_choice?: ExtractModelChoice;
  should_caption_images: boolean;
  should_include_images: boolean;
  should_include_page_views: boolean;
  page_views_dpi: number;
  image_stuff_name?: string;
  pdf_stuff_name?: string;
}
