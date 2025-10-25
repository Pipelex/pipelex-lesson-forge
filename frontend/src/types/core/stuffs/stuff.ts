import type { Concept } from '@/types/core/concept/Concept';

export interface Stuff {
  stuff_code: string;
  stuff_name?: string;
  concept: Concept;
  content: StuffContent;
}

export interface DictStuff {
  concept: string;
  content: any;
}

export type StuffDict = Record<string, Stuff>;

export type StuffContent = any;
