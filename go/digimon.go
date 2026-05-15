package voxgigdigimonsdk

import (
	"github.com/voxgig-sdk/digimon-sdk/core"
	"github.com/voxgig-sdk/digimon-sdk/entity"
	"github.com/voxgig-sdk/digimon-sdk/feature"
	_ "github.com/voxgig-sdk/digimon-sdk/utility"
)

// Type aliases preserve external API.
type DigimonSDK = core.DigimonSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type DigimonEntity = core.DigimonEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type DigimonError = core.DigimonError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewAttributeEntityFunc = func(client *core.DigimonSDK, entopts map[string]any) core.DigimonEntity {
		return entity.NewAttributeEntity(client, entopts)
	}
	core.NewDigimonEntityFunc = func(client *core.DigimonSDK, entopts map[string]any) core.DigimonEntity {
		return entity.NewDigimonEntity(client, entopts)
	}
	core.NewFieldEntityFunc = func(client *core.DigimonSDK, entopts map[string]any) core.DigimonEntity {
		return entity.NewFieldEntity(client, entopts)
	}
	core.NewLevelEntityFunc = func(client *core.DigimonSDK, entopts map[string]any) core.DigimonEntity {
		return entity.NewLevelEntity(client, entopts)
	}
	core.NewSkillEntityFunc = func(client *core.DigimonSDK, entopts map[string]any) core.DigimonEntity {
		return entity.NewSkillEntity(client, entopts)
	}
	core.NewTypeEntityFunc = func(client *core.DigimonSDK, entopts map[string]any) core.DigimonEntity {
		return entity.NewTypeEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewDigimonSDK = core.NewDigimonSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
