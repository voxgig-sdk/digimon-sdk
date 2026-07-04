# Field entity test

require "minitest/autorun"
require "json"
require_relative "../Digimon_sdk"
require_relative "runner"

class FieldEntityTest < Minitest::Test
  def test_create_instance
    testsdk = DigimonSDK.test(nil, nil)
    ent = testsdk.Field(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = field_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "field." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set DIGIMON_TEST_FIELD_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    field_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.field")))
    field_ref01_data = nil
    if field_ref01_data_raw.length > 0
      field_ref01_data = Helpers.to_map(field_ref01_data_raw[0][1])
    end

    # LIST
    field_ref01_ent = client.Field(nil)
    field_ref01_match = {}

    field_ref01_list_result = field_ref01_ent.list(field_ref01_match, nil)
    assert field_ref01_list_result.is_a?(Array)

    # LOAD
    field_ref01_match_dt0 = {
      "id" => field_ref01_data["id"],
    }
    field_ref01_data_dt0_loaded = field_ref01_ent.load(field_ref01_match_dt0, nil)
    field_ref01_data_dt0_load_result = Helpers.to_map(field_ref01_data_dt0_loaded)
    assert !field_ref01_data_dt0_load_result.nil?
    assert_equal field_ref01_data_dt0_load_result["id"], field_ref01_data["id"]

  end
end

def field_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "field", "FieldTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = DigimonSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["field01", "field02", "field03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["DIGIMON_TEST_FIELD_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "DIGIMON_TEST_FIELD_ENTID" => idmap,
    "DIGIMON_TEST_LIVE" => "FALSE",
    "DIGIMON_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["DIGIMON_TEST_FIELD_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["DIGIMON_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = DigimonSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["DIGIMON_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["DIGIMON_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
