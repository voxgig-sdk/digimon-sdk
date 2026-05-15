package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewAttributeEntityFunc func(client *DigimonSDK, entopts map[string]any) DigimonEntity

var NewDigimonEntityFunc func(client *DigimonSDK, entopts map[string]any) DigimonEntity

var NewFieldEntityFunc func(client *DigimonSDK, entopts map[string]any) DigimonEntity

var NewLevelEntityFunc func(client *DigimonSDK, entopts map[string]any) DigimonEntity

var NewSkillEntityFunc func(client *DigimonSDK, entopts map[string]any) DigimonEntity

var NewTypeEntityFunc func(client *DigimonSDK, entopts map[string]any) DigimonEntity

