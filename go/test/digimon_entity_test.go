package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/digimon-sdk/go"
	"github.com/voxgig-sdk/digimon-sdk/go/core"

	vs "github.com/voxgig-sdk/digimon-sdk/go/utility/struct"
)

func TestDigimonEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Digimon(nil)
		if ent == nil {
			t.Fatal("expected non-nil DigimonEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := digimonBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "digimon." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set DIGIMON_TEST_DIGIMON_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		digimonRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.digimon", setup.data)))
		var digimonRef01Data map[string]any
		if len(digimonRef01DataRaw) > 0 {
			digimonRef01Data = core.ToMapAny(digimonRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = digimonRef01Data

		// LIST
		digimonRef01Ent := client.Digimon(nil)
		digimonRef01Match := map[string]any{}

		digimonRef01ListResult, err := digimonRef01Ent.List(digimonRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, digimonRef01ListOk := digimonRef01ListResult.([]any)
		if !digimonRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", digimonRef01ListResult)
		}

		// LOAD
		digimonRef01MatchDt0 := map[string]any{
			"id": digimonRef01Data["id"],
		}
		digimonRef01DataDt0Loaded, err := digimonRef01Ent.Load(digimonRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		digimonRef01DataDt0LoadResult := core.ToMapAny(digimonRef01DataDt0Loaded)
		if digimonRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if digimonRef01DataDt0LoadResult["id"] != digimonRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func digimonBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "digimon", "DigimonTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read digimon test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse digimon test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"digimon01", "digimon02", "digimon03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("DIGIMON_TEST_DIGIMON_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"DIGIMON_TEST_DIGIMON_ENTID": idmap,
		"DIGIMON_TEST_LIVE":      "FALSE",
		"DIGIMON_TEST_EXPLAIN":   "FALSE",
		"DIGIMON_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["DIGIMON_TEST_DIGIMON_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["DIGIMON_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["DIGIMON_APIKEY"],
			},
			extra,
		})
		client = sdk.NewDigimonSDK(core.ToMapAny(mergedOpts))
	}

	live := env["DIGIMON_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["DIGIMON_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
