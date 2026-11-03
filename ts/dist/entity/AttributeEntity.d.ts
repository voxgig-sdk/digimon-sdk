import { DigimonEntityBase } from '../DigimonEntityBase';
import type { DigimonSDK } from '../DigimonSDK';
import type { Control } from '../types';
import type { Attribute, AttributeLoadMatch } from '../DigimonTypes';
declare class AttributeEntity extends DigimonEntityBase<Attribute> {
    constructor(client: DigimonSDK, entopts: any);
    make(this: AttributeEntity): AttributeEntity;
    load(this: any, reqmatch?: AttributeLoadMatch, ctrl?: Control): Promise<AttributeEntity>;
}
export { AttributeEntity };
