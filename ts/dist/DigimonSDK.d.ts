import { AttributeEntity } from './entity/AttributeEntity';
import { DigimonEntity } from './entity/DigimonEntity';
import { FieldEntity } from './entity/FieldEntity';
import { LevelEntity } from './entity/LevelEntity';
import { SkillEntity } from './entity/SkillEntity';
import { TypeEntity } from './entity/TypeEntity';
export type * from './DigimonTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { DigimonEntityBase } from './DigimonEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
type DirectResult = {
    ok: false;
    err: any;
    status?: undefined;
    headers?: undefined;
    data?: undefined;
} | {
    ok: boolean;
    status: number;
    headers: any;
    data: any;
    err?: any;
};
declare class DigimonSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<DirectResult>;
    _rawRequest(fetchargs?: any): Promise<DirectResult>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Attribute(entopts?: Record<string, any>): AttributeEntity;
    Digimon(entopts?: Record<string, any>): DigimonEntity;
    Field(entopts?: Record<string, any>): FieldEntity;
    Level(entopts?: Record<string, any>): LevelEntity;
    Skill(entopts?: Record<string, any>): SkillEntity;
    Type(entopts?: Record<string, any>): TypeEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): DigimonSDK;
    tester(testopts?: any, sdkopts?: any): DigimonSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof DigimonSDK;
export { stdutil, config, BaseFeature, DigimonEntityBase, DigimonSDK, SDK, };
export type { DirectResult };
