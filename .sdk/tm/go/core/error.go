package core

type DigimonError struct {
	IsDigimonError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewDigimonError(code string, msg string, ctx *Context) *DigimonError {
	return &DigimonError{
		IsDigimonError: true,
		Sdk:              "Digimon",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *DigimonError) Error() string {
	return e.Msg
}
