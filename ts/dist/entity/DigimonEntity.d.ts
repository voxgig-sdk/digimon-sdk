import { DigimonEntityBase } from '../DigimonEntityBase';
import type { DigimonSDK } from '../DigimonSDK';
import type { Control } from '../types';
import type { Digimon, DigimonLoadMatch, DigimonListMatch } from '../DigimonTypes';
declare class DigimonEntity extends DigimonEntityBase<Digimon> {
    constructor(client: DigimonSDK, entopts: any);
    make(this: DigimonEntity): DigimonEntity;
    load(this: any, reqmatch?: DigimonLoadMatch, ctrl?: Control): Promise<DigimonEntity>;
    list(this: any, reqmatch?: DigimonListMatch, ctrl?: Control): Promise<DigimonEntity[]>;
}
export { DigimonEntity };
