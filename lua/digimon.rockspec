package = "voxgig-sdk-digimon"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/digimon-sdk.git"
}
description = {
  summary = "Digimon SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["digimon_sdk"] = "digimon_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
