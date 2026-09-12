import { DigimonEntityBase } from '../DigimonEntityBase';
import type { DigimonSDK } from '../DigimonSDK';
import type { Control } from '../types';
import type { Level, LevelLoadMatch, LevelListMatch } from '../DigimonTypes';
declare class LevelEntity extends DigimonEntityBase<Level> {
    constructor(client: DigimonSDK, entopts: any);
    make(this: LevelEntity): LevelEntity;
    load(this: any, reqmatch?: LevelLoadMatch, ctrl?: Control): Promise<LevelEntity>;
    list(this: any, reqmatch?: LevelListMatch, ctrl?: Control): Promise<LevelEntity[]>;
}
export { LevelEntity };
