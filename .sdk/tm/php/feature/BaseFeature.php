<?php
declare(strict_types=1);

// Digimon SDK base feature

class DigimonBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(DigimonContext $ctx, array $options): void {}
    public function PostConstruct(DigimonContext $ctx): void {}
    public function PostConstructEntity(DigimonContext $ctx): void {}
    public function SetData(DigimonContext $ctx): void {}
    public function GetData(DigimonContext $ctx): void {}
    public function GetMatch(DigimonContext $ctx): void {}
    public function SetMatch(DigimonContext $ctx): void {}
    public function PrePoint(DigimonContext $ctx): void {}
    public function PreSpec(DigimonContext $ctx): void {}
    public function PreRequest(DigimonContext $ctx): void {}
    public function PreResponse(DigimonContext $ctx): void {}
    public function PreResult(DigimonContext $ctx): void {}
    public function PreDone(DigimonContext $ctx): void {}
    public function PreUnexpected(DigimonContext $ctx): void {}
}
