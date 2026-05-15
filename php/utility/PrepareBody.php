<?php
declare(strict_types=1);

// Digimon SDK utility: prepare_body

class DigimonPrepareBody
{
    public static function call(DigimonContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
