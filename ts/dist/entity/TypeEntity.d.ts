import { DigimonEntityBase } from '../DigimonEntityBase';
import type { DigimonSDK } from '../DigimonSDK';
import type { Control } from '../types';
import type { Type, TypeLoadMatch, TypeListMatch } from '../DigimonTypes';
declare class TypeEntity extends DigimonEntityBase<Type> {
    constructor(client: DigimonSDK, entopts: any);
    make(this: TypeEntity): TypeEntity;
    load(this: any, reqmatch?: TypeLoadMatch, ctrl?: Control): Promise<TypeEntity>;
    list(this: any, reqmatch?: TypeListMatch, ctrl?: Control): Promise<TypeEntity[]>;
}
export { TypeEntity };
