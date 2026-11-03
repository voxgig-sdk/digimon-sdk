package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewAttributeEntityFunc func(client *DigimonSDK, entopts map[string]any) DigimonEntityBase

var NewDigimonEntityFunc func(client *DigimonSDK, entopts map[string]any) DigimonEntityBase

var NewFieldEntityFunc func(client *DigimonSDK, entopts map[string]any) DigimonEntityBase

var NewLevelEntityFunc func(client *DigimonSDK, entopts map[string]any) DigimonEntityBase

var NewSkillEntityFunc func(client *DigimonSDK, entopts map[string]any) DigimonEntityBase

var NewTypeEntityFunc func(client *DigimonSDK, entopts map[string]any) DigimonEntityBase

