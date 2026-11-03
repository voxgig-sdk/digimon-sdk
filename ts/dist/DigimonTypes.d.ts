export interface Attribute {
    attribute?: string;
    description?: string;
    fields?: any[];
    id?: number;
    name?: string;
}
export interface AttributeLoadMatch {
    id: string;
}
export interface Digimon {
    attributes?: any[];
    descriptions?: any[];
    fields?: any[];
    href?: string;
    id?: number;
    image?: string;
    images?: any[];
    levels?: any[];
    name?: string;
    nextEvolutions?: any[];
    priorEvolutions?: any[];
    releaseDate?: string;
    skills?: any[];
    types?: any[];
    xAntibody?: boolean;
}
export interface DigimonLoadMatch {
    id: string;
}
export interface DigimonListMatch {
    attribute?: string;
    exact?: boolean;
    level?: string;
    name?: string;
    page?: number;
    page_size?: number;
    x_antibody?: boolean;
}
export interface Field {
    description?: string;
    field?: string;
    fields?: any[];
    id?: number;
    image?: string;
    name?: string;
}
export interface FieldLoadMatch {
    id: string;
}
export interface Level {
    description?: string;
    fields?: any[];
    id?: number;
    level?: string;
    name?: string;
}
export interface LevelLoadMatch {
    id: string;
}
export interface Skill {
    description?: string;
    fields?: any[];
    id?: number;
    name?: string;
    skill?: string;
    translation?: string;
}
export interface SkillLoadMatch {
    id: string;
}
export interface Type {
    description?: string;
    fields?: any[];
    id?: number;
    name?: string;
    type?: string;
}
export interface TypeLoadMatch {
    id: string;
}
