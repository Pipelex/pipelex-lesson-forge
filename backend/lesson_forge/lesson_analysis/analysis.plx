domain = "course_content_analysis"
description = "Analyzing high school course documents to extract themes, sections, and key learning concepts."
main_pipe = "analyze_course"


[concept]
CourseOverview = "Represents the complete analysis of an educational course document."
Section = "A major division or chapter within a course."
SectionText = "The integral text of a section of a course."
KeyLearning = "Represents an essential concept, idea, or fact to be learned from the course."

[pipe.analyze_course]
type = "PipeSequence"
description = """
Main pipeline that orchestrates the complete course analysis workflow. Takes a high school course PDF document as input and produces a comprehensive analysis including the main theme, list of main sections, and key concepts/ideas/facts to learn. Executes the extraction and analysis steps in sequence to deliver a structured CourseOverview.
"""
inputs = { course_pdf = "PDF" }
output = "CourseOverview"
steps = [
    { pipe = "extract_text_from_pdf", result = "pages" },
    { pipe = "overview_course", result = "course_overview" },
]

[pipe.extract_text_from_pdf]
type = "PipeExtract"
description = """
Extracts all text content from the course PDF document using OCR technology. Processes the entire PDF and outputs a list of pages containing the extracted text content, preserving the document structure for subsequent analysis.
"""
inputs = { course_pdf = "PDF" }
output = "Page[]"
model = "extract_text_from_pdf"

[pipe.overview_course]
type = "PipeLLM"
description = """
Analyzes the extracted text pages from the course document to identify and structure the educational content. Determines the main theme (overarching subject), extracts the list of main sections with their descriptions, and identifies key learnings (essential concepts, ideas, or facts students should master). Produces a comprehensive CourseOverview object containing all these structured elements.
"""
inputs = { pages = "Page[]" }
output = "CourseOverview"
model = "llm_for_structuring"
# model_to_structure = "llm_for_structuring"
# structuring_method = "preliminary_text"
system_prompt = """
You are an expert educational content analyst. Your task is to analyze course materials and produce a structured outputs"
"""
prompt = """
Analyze the following course pages and produce a comprehensive course analysis.

@pages

Based on the content above, identify:
1. The main theme (the overarching subject or central topic of the course)
2. The major sections or chapters of the course (with title, descriptions, and integral text)
3. The key learnings (essential concepts, ideas, or facts students should master from this course)
"""

