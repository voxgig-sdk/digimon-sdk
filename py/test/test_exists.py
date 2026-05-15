# ProjectName SDK exists test

import pytest
from digimon_sdk import DigimonSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = DigimonSDK.test(None, None)
        assert testsdk is not None
