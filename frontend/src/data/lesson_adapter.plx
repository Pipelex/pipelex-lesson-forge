domain = "section_personalization"
description = "Personalizing sections based on student profiles, preferences, abilities and learning levels."
main_pipe = "personalise_section"

[concept.Section]
description = "Represents a major division or chapter within a course."

[concept.Section.structure]
title = { type = "text", description = "The name or heading of the section", required = true }
description = { type = "text", description = "A summary of what the section covers", required = true }
text = { type = "text", description = "The integral text of the section", required = true }

[concept.StudentProfile]
description = """
Represents information about a student including their learning characteristics and educational background.
"""

[concept.StudentProfile.structure]
current_performance = { type = "text", description = "Current Performance: [Struggling / Average / Advanced]", required = true }
learns_best_with = { type = "text", description = "Learns Best With: [Visual examples / Step-by-step text / Hands-on practice / Videos]", required = true }
pace = { type = "text", description = "Pace: [Needs more time / Normal / Fast learner]", required = true }
complexity = { type = "text", description = "Complexity: [Prefers simple explanations / Balanced / Likes deep details]", required = true }
strengths = { type = "text", description = "Strengths: [subjects or topics they're good at]", required = false }
needs_help_with = { type = "text", description = "Needs Help With: [areas where they struggle]", required = false }
prior_knowledge = { type = "text", description = "Prior Knowledge: [relevant topics they already know]", required = false }
hobbies_interests = { type = "text", description = "Hobbies/Interests: [e.g., soccer, video games, music]", required = false }
career_goals = { type = "text", description = "Career Goals: [if any - e.g., engineer, doctor, undecided]", required = false }
example_style = { type = "text", description = "Example Style: [Many real-world examples / Abstract concepts / Mix]", required = false }
question_format = { type = "text", description = "Question Format: [Multiple choice / Short answer / Open discussion]", required = false }


[pipe.personalise_section]
type = "PipeLLM"
description = """
Main pipeline that creates a personalized lesson from a section for a specific student. Takes a student profile (including learning preferences, ability level, strengths, weaknesses, interests, and background knowledge) and a section (structured as a CourseOverview with main theme, key learnings, and sections), then uses an LLM to transform the section content into a complete lesson that matches the student's individual needs. The LLM analyzes the student's characteristics and creates a lesson by adjusting complexity, examples, explanations, pacing, and teaching style. The output is a structured lesson that preserves the course format while tailoring all content elements to optimize learning for the specific student.
"""
inputs = { student_profile = "StudentProfile", section = "Section" }
output = "Text"
model = "llm_to_answer_hard_questions"
system_prompt = """
You are an expert educational content designer specializing in personalized learning. Your task is to transform section content into a complete lesson that matches individual student profiles. You will generate a structured Lesson object that is tailored to the specific student's needs.
"""
prompt = """
You are given a student profile and a section. Your task is to transform the section content into a complete personalized lesson that matches the student's individual learning needs.

@student_profile

@section

Analyze the student's learning preferences, ability level, strengths, weaknesses, interests, and background knowledge. Then create a lesson by:
- Adjusting the complexity and difficulty to match the student's ability level
- Modifying examples and explanations to align with the student's interests and background
- Tailoring the teaching style to match the student's learning preferences
- Addressing the student's weaknesses with additional support and leveraging their strengths
- Adjusting pacing and depth based on the student's needs

IMPORTANT: Start the lesson with a brief personalized introduction that:
- Addresses the student by name
- Provides an engaging overview of the lesson topic
- Explains the learning method that will be used (based on their learning preferences)
- Outlines the lesson plan and what they'll accomplish

Transform the section into a complete lesson while preserving the structured course format (main theme, key learnings, and sections) and personalizing all content elements to optimize learning for this specific student.
"""