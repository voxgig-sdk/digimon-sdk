<?php
declare(strict_types=1);

// Digimon SDK utility: result_headers

class DigimonResultHeaders
{
    public static function call(DigimonContext $ctx): ?DigimonResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
