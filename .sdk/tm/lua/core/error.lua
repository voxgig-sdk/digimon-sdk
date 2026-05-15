-- Digimon SDK error

local DigimonError = {}
DigimonError.__index = DigimonError


function DigimonError.new(code, msg, ctx)
  local self = setmetatable({}, DigimonError)
  self.is_sdk_error = true
  self.sdk = "Digimon"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function DigimonError:error()
  return self.msg
end


function DigimonError:__tostring()
  return self.msg
end


return DigimonError
