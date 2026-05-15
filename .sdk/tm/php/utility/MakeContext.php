<?php
declare(strict_types=1);

// Digimon SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class DigimonMakeContext
{
    public static function call(array $ctxmap, ?DigimonContext $basectx): DigimonContext
    {
        return new DigimonContext($ctxmap, $basectx);
    }
}
