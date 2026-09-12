import { DigimonEntityBase } from '../DigimonEntityBase';
import type { DigimonSDK } from '../DigimonSDK';
import type { Control } from '../types';
import type { Skill, SkillLoadMatch, SkillListMatch } from '../DigimonTypes';
declare class SkillEntity extends DigimonEntityBase<Skill> {
    constructor(client: DigimonSDK, entopts: any);
    make(this: SkillEntity): SkillEntity;
    load(this: any, reqmatch?: SkillLoadMatch, ctrl?: Control): Promise<SkillEntity>;
    list(this: any, reqmatch?: SkillListMatch, ctrl?: Control): Promise<SkillEntity[]>;
}
export { SkillEntity };
