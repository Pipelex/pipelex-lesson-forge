export enum ConceptStructureBlueprintFieldType {
  TEXT = 'text',
  LIST = 'list',
  DICT = 'dict',
  INTEGER = 'integer',
  BOOLEAN = 'boolean',
  NUMBER = 'number',
  DATE = 'date',
}

export interface ConceptStructureBlueprint {
  description: string;
  type?: ConceptStructureBlueprintFieldType;
  item_type?: string;
  key_type?: string;
  value_type?: string;
  choices?: string[];
  required?: boolean;
  default_value?: any;
}

export interface ConceptBlueprint {
  source?: string;
  description: string;
  structure?: string | Record<string, string | ConceptStructureBlueprint>;
  refines?: string;
}
