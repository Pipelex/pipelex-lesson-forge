domain = "course_content_analysis"
description = "Analyzing high school course documents to extract themes, sections, and key learning concepts."
main_pipe = "analyze_course"

[concept.CourseAnalysis]
description = "Represents the complete analysis of an educational course document."

[concept.CourseAnalysis.structure]
main_theme = { type = "text", description = "The overarching subject or central topic of the course", required = true }
sections = { type = "text", description = "The major divisions or chapters of the course", required = true }
key_learnings = { type = "text", description = "The essential concepts, ideas, or facts students should learn", required = true }

[concept.Section]
description = "Represents a major division or chapter within a course."

[concept.Section.structure]
title = { type = "text", description = "The name or heading of the section", required = true }
description = { type = "text", description = "A summary of what the section covers", required = true }

[concept.KeyLearning]
description = "Represents an essential concept, idea, or fact to be learned from the course."

[concept.KeyLearning.structure]
concept = { type = "text", description = "The name or brief statement of the learning point", required = true }
explanation = { type = "text", description = "A detailed description or clarification of the concept", required = true }

[pipe.analyze_course]
type = "PipeSequence"
description = """
Main pipeline that orchestrates the complete course analysis workflow. Takes a high school course PDF document as input and produces a comprehensive analysis including the main theme, list of main sections, and key concepts/ideas/facts to learn. Executes the extraction and analysis steps in sequence to deliver a structured CourseAnalysis.
"""
inputs = { course_pdf = "PDF" }
output = "CourseAnalysis"
steps = [
    { pipe = "extract_text_from_pdf", result = "pages" },
    { pipe = "analyze_course_content", result = "course_analysis" },
]

[pipe.extract_text_from_pdf]
type = "PipeExtract"
description = """
Extracts all text content from the course PDF document using OCR technology. Processes the entire PDF and outputs a list of pages containing the extracted text content, preserving the document structure for subsequent analysis.
"""
inputs = { course_pdf = "PDF" }
output = "Page[]"
model = "extract_text_from_pdf"

[pipe.analyze_course_content]
type = "PipeLLM"
description = """
Analyzes the extracted text pages from the course document to identify and structure the educational content. Determines the main theme (overarching subject), extracts the list of main sections with their descriptions, and identifies key learnings (essential concepts, ideas, or facts students should master). Produces a comprehensive CourseAnalysis object containing all these structured elements.
"""
inputs = { pages = "Page[]" }
output = "CourseAnalysis"
model = "llm_to_answer_hard_questions"
system_prompt = """
You are an expert educational content analyst. Your task is to analyze course materials and produce a structured CourseAnalysis object that captures the main theme, sections, and key learnings from the course.
"""
prompt = """
Analyze the following course pages and produce a comprehensive course analysis.

@pages

Based on the content above, identify:
1. The main theme (the overarching subject or central topic of the course)
2. The major sections or chapters of the course (with titles and descriptions)
3. The key learnings (essential concepts, ideas, or facts students should master from this course)
"""
