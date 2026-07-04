# Level entity test

import json
import os
import time

import pytest

from utility.voxgig_struct import voxgig_struct as vs
from digimon_sdk import DigimonSDK
from core import helpers

_TEST_DIR = os.path.dirname(os.path.abspath(__file__))
from test import runner


class TestLevelEntity:

    def test_should_create_instance(self):
        testsdk = DigimonSDK.test(None, None)
        ent = testsdk.Level(None)
        assert ent is not None

    def test_should_run_basic_flow(self):
        setup = _level_basic_setup(None)
        # Per-op sdk-test-control.json skip — basic test exercises a flow with
        # multiple ops; skipping any one skips the whole flow (steps depend
        # on each other).
        _live = setup.get("live", False)
        for _op in ["list", "load"]:
            _skip, _reason = runner.is_control_skipped("entityOp", "level." + _op, "live" if _live else "unit")
            if _skip:
                pytest.skip(_reason or "skipped via sdk-test-control.json")
                return
        # The basic flow consumes synthetic IDs from the fixture. In live mode
        # without an *_ENTID env override, those IDs hit the live API and 4xx.
        if setup.get("synthetic_only"):
            pytest.skip("live entity test uses synthetic IDs from fixture — "
                        "set DIGIMON_TEST_LEVEL_ENTID JSON to run live")
        client = setup["client"]

        # Bootstrap entity data from existing test data.
        level_ref01_data_raw = vs.items(helpers.to_map(
            vs.getpath(setup["data"], "existing.level")))
        level_ref01_data = None
        if len(level_ref01_data_raw) > 0:
            level_ref01_data = helpers.to_map(level_ref01_data_raw[0][1])

        # LIST
        level_ref01_ent = client.Level(None)
        level_ref01_match = {}

        level_ref01_list_result = level_ref01_ent.list(level_ref01_match, None)
        assert isinstance(level_ref01_list_result, list)

        # LOAD
        level_ref01_match_dt0 = {
            "id": level_ref01_data["id"],
        }
        level_ref01_data_dt0_loaded = level_ref01_ent.load(level_ref01_match_dt0, None)
        level_ref01_data_dt0_load_result = helpers.to_map(level_ref01_data_dt0_loaded)
        assert level_ref01_data_dt0_load_result is not None
        assert level_ref01_data_dt0_load_result["id"] == level_ref01_data["id"]



def _level_basic_setup(extra):
    runner.load_env_local()

    entity_data_file = os.path.join(_TEST_DIR, "../../.sdk/test/entity/level/LevelTestData.json")
    with open(entity_data_file, "r") as f:
        entity_data_source = f.read()

    entity_data = json.loads(entity_data_source)

    options = {}
    options["entity"] = entity_data.get("existing")

    client = DigimonSDK.test(options, extra)

    # Generate idmap via transform.
    idmap = vs.transform(
        ["level01", "level02", "level03"],
        {
            "`$PACK`": ["", {
                "`$KEY`": "`$COPY`",
                "`$VAL`": ["`$FORMAT`", "upper", "`$COPY`"],
            }],
        }
    )

    # Detect ENTID env override before envOverride consumes it. When live
    # mode is on without a real override, the basic test runs against synthetic
    # IDs from the fixture and 4xx's. We surface this so the test can skip.
    _entid_env_raw = os.environ.get(
        "DIGIMON_TEST_LEVEL_ENTID")
    _idmap_overridden = _entid_env_raw is not None and _entid_env_raw.strip().startswith("{")

    env = runner.env_override({
        "DIGIMON_TEST_LEVEL_ENTID": idmap,
        "DIGIMON_TEST_LIVE": "FALSE",
        "DIGIMON_TEST_EXPLAIN": "FALSE",
    })

    idmap_resolved = helpers.to_map(
        env.get("DIGIMON_TEST_LEVEL_ENTID"))
    if idmap_resolved is None:
        idmap_resolved = helpers.to_map(idmap)

    if env.get("DIGIMON_TEST_LIVE") == "TRUE":
        merged_opts = vs.merge([
            {
            },
            extra or {},
        ])
        client = DigimonSDK(helpers.to_map(merged_opts))

    _live = env.get("DIGIMON_TEST_LIVE") == "TRUE"
    return {
        "client": client,
        "data": entity_data,
        "idmap": idmap_resolved,
        "env": env,
        "explain": env.get("DIGIMON_TEST_EXPLAIN") == "TRUE",
        "live": _live,
        "synthetic_only": _live and not _idmap_overridden,
        "now": int(time.time() * 1000),
    }
