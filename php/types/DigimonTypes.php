<?php
declare(strict_types=1);

// Typed models for the Digimon SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Attribute entity data model. */
class Attribute
{
    public ?string $attribute = null;
    public ?string $description = null;
    public ?string $href = null;
    public ?int $id = null;
}

/** Request payload for Attribute#load. */
class AttributeLoadMatch
{
    public string $id;
}

/** Request payload for Attribute#list. */
class AttributeListMatch
{
    public ?string $attribute = null;
    public ?string $description = null;
    public ?string $href = null;
    public ?int $id = null;
}

/** Digimon entity data model. */
class Digimon
{
    public ?array $attribute = null;
    public ?array $description = null;
    public ?array $field = null;
    public ?string $href = null;
    public ?int $id = null;
    public ?array $image = null;
    public ?array $level = null;
    public ?string $name = null;
    public ?array $next_evolution = null;
    public ?array $prior_evolution = null;
    public ?string $release_date = null;
    public ?array $skill = null;
    public ?array $type = null;
    public ?bool $x_antibody = null;
}

/** Request payload for Digimon#load. */
class DigimonLoadMatch
{
    public string $id;
}

/** Request payload for Digimon#list. */
class DigimonListMatch
{
    public ?array $attribute = null;
    public ?array $description = null;
    public ?array $field = null;
    public ?string $href = null;
    public ?int $id = null;
    public ?array $image = null;
    public ?array $level = null;
    public ?string $name = null;
    public ?array $next_evolution = null;
    public ?array $prior_evolution = null;
    public ?string $release_date = null;
    public ?array $skill = null;
    public ?array $type = null;
    public ?bool $x_antibody = null;
}

/** Field entity data model. */
class Field
{
    public ?string $description = null;
    public ?string $field = null;
    public ?string $href = null;
    public ?int $id = null;
    public ?string $image = null;
}

/** Request payload for Field#load. */
class FieldLoadMatch
{
    public string $id;
}

/** Request payload for Field#list. */
class FieldListMatch
{
    public ?string $description = null;
    public ?string $field = null;
    public ?string $href = null;
    public ?int $id = null;
    public ?string $image = null;
}

/** Level entity data model. */
class Level
{
    public ?string $href = null;
    public ?int $id = null;
    public ?string $level = null;
}

/** Request payload for Level#load. */
class LevelLoadMatch
{
    public string $id;
}

/** Request payload for Level#list. */
class LevelListMatch
{
    public ?string $href = null;
    public ?int $id = null;
    public ?string $level = null;
}

/** Skill entity data model. */
class Skill
{
    public ?string $description = null;
    public ?string $href = null;
    public ?int $id = null;
    public ?string $skill = null;
    public ?string $translation = null;
}

/** Request payload for Skill#load. */
class SkillLoadMatch
{
    public string $id;
}

/** Request payload for Skill#list. */
class SkillListMatch
{
    public ?string $description = null;
    public ?string $href = null;
    public ?int $id = null;
    public ?string $skill = null;
    public ?string $translation = null;
}

/** Type entity data model. */
class Type
{
    public ?string $href = null;
    public ?int $id = null;
    public ?string $type = null;
}

/** Request payload for Type#load. */
class TypeLoadMatch
{
    public string $id;
}

/** Request payload for Type#list. */
class TypeListMatch
{
    public ?string $href = null;
    public ?int $id = null;
    public ?string $type = null;
}

