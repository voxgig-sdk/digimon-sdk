<?php
declare(strict_types=1);

// Digimon SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

DigimonUtility::setRegistrar(function (DigimonUtility $u): void {
    $u->clean = [DigimonClean::class, 'call'];
    $u->done = [DigimonDone::class, 'call'];
    $u->make_error = [DigimonMakeError::class, 'call'];
    $u->feature_add = [DigimonFeatureAdd::class, 'call'];
    $u->feature_hook = [DigimonFeatureHook::class, 'call'];
    $u->feature_init = [DigimonFeatureInit::class, 'call'];
    $u->fetcher = [DigimonFetcher::class, 'call'];
    $u->make_fetch_def = [DigimonMakeFetchDef::class, 'call'];
    $u->make_context = [DigimonMakeContext::class, 'call'];
    $u->make_options = [DigimonMakeOptions::class, 'call'];
    $u->make_request = [DigimonMakeRequest::class, 'call'];
    $u->make_response = [DigimonMakeResponse::class, 'call'];
    $u->make_result = [DigimonMakeResult::class, 'call'];
    $u->make_point = [DigimonMakePoint::class, 'call'];
    $u->make_spec = [DigimonMakeSpec::class, 'call'];
    $u->make_url = [DigimonMakeUrl::class, 'call'];
    $u->param = [DigimonParam::class, 'call'];
    $u->prepare_auth = [DigimonPrepareAuth::class, 'call'];
    $u->prepare_body = [DigimonPrepareBody::class, 'call'];
    $u->prepare_headers = [DigimonPrepareHeaders::class, 'call'];
    $u->prepare_method = [DigimonPrepareMethod::class, 'call'];
    $u->prepare_params = [DigimonPrepareParams::class, 'call'];
    $u->prepare_path = [DigimonPreparePath::class, 'call'];
    $u->prepare_query = [DigimonPrepareQuery::class, 'call'];
    $u->result_basic = [DigimonResultBasic::class, 'call'];
    $u->result_body = [DigimonResultBody::class, 'call'];
    $u->result_headers = [DigimonResultHeaders::class, 'call'];
    $u->transform_request = [DigimonTransformRequest::class, 'call'];
    $u->transform_response = [DigimonTransformResponse::class, 'call'];
});
