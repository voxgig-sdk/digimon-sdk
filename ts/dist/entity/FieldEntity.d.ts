import { DigimonEntityBase } from '../DigimonEntityBase';
import type { DigimonSDK } from '../DigimonSDK';
import type { Control } from '../types';
import type { Field, FieldLoadMatch, FieldListMatch } from '../DigimonTypes';
declare class FieldEntity extends DigimonEntityBase<Field> {
    constructor(client: DigimonSDK, entopts: any);
    make(this: FieldEntity): FieldEntity;
    load(this: any, reqmatch?: FieldLoadMatch, ctrl?: Control): Promise<FieldEntity>;
    list(this: any, reqmatch?: FieldListMatch, ctrl?: Control): Promise<FieldEntity[]>;
}
export { FieldEntity };
