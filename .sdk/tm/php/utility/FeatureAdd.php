<?php
declare(strict_types=1);

// Digimon SDK utility: feature_add

class DigimonFeatureAdd
{
    public static function call(DigimonContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
