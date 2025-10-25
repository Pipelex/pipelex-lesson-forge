from pipelex.core.stuffs.list_content import ListContent
from pipelex.core.stuffs.structured_content import StructuredContent
from pipelex.core.stuffs.text_content import TextContent
from pydantic import Field


class Section(StructuredContent):
    """Represents a major division or chapter within a course."""

    title: str = Field(description="The name or heading of the section")
    description: str = Field(description="A one-sentence concise summary of what the section covers")
    integral_text: TextContent = Field(description="The integral text of the section")


class KeyLearning(StructuredContent):
    """Represents an essential concept, idea, or fact to be learned from the course."""

    concept: str = Field(description="The name or brief statement of the learning point")
    explanation: str = Field(description="A detailed description or clarification of the concept")


class CourseOverview(StructuredContent):
    """Represents the complete analysis of an educational course document."""

    main_theme: str = Field(description="The overarching subject or central topic of the course")
    key_learnings: KeyLearning = Field(description="The essential concepts, ideas, or facts students should learn")
    sections: ListContent[Section] = Field(description="The major divisions or chapters of the course")
