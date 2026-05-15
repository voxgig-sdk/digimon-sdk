<?php
declare(strict_types=1);

// Digimon SDK utility: result_body

class DigimonResultBody
{
    public static function call(DigimonContext $ctx): ?DigimonResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
