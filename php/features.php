<?php
declare(strict_types=1);

// Digimon SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class DigimonFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new DigimonBaseFeature();
            case "test":
                return new DigimonTestFeature();
            default:
                return new DigimonBaseFeature();
        }
    }
}
