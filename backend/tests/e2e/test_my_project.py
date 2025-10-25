import pytest


@pytest.mark.dry_runnable
@pytest.mark.inference
class TestMyProject:
    def test_hello_world(self):
        import lesson_forge.hello_world  # noqa: F401
