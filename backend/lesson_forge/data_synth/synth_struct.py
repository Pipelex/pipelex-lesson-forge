from pipelex.core.stuffs.structured_content import StructuredContent
from pydantic import Field


class Sample(StructuredContent):
    foo: str = Field(description="A description of the foo")
    bar: int = Field(description="A description of the bar")
