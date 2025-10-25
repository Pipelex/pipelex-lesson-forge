import type { StuffDict, DictStuff } from '@/types/core/stuffs/stuff';

export enum WorkingMemoryAliases {
  MAIN_STUFF = 'main_stuff',
}

export interface WorkingMemory {
  root: StuffDict;
  aliases?: Record<WorkingMemoryAliases, string>;
}

export interface DictWorkingMemory {
  root: Record<string, DictStuff>;
  aliases: Record<string, string>;
}
