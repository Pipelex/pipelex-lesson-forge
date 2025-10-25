import asyncio

from pipelex import pretty_print
from pipelex.core.stuffs.list_content import ListContent
from pipelex.core.stuffs.page_content import PageContent
from pipelex.core.stuffs.stuff_content import StuffContent
from pipelex.core.stuffs.text_content import TextContent
from pipelex.pipelex import Pipelex
from pipelex.pipeline.execute import execute_pipeline
from pipelex.tools.misc.file_utils import load_text_from_path
from pipelex.tools.misc.json_utils import load_json_dict_from_path

from lesson_forge.lesson_analysis.analysis_struct import CourseOverview
from lesson_forge.utils.results_utils import output_result

SAMPLE_NAME = "analysis"


async def run_analyze_course() -> StuffContent:
    inputs = load_json_dict_from_path("lesson_forge/lesson_analysis/analysis_inputs.json")
    pipe_output = await execute_pipeline(
        pipe_code="analyze_course",
        inputs=inputs,
    )
    pretty_print(pipe_output, title="Pipe output")
    # analysis = pipe_output.main_stuff_as(content_type=CourseOverview)
    # pretty_print(analysis, title="Course analysis")
    return pipe_output.main_stuff.content


# Initialize Pipelex
Pipelex.make()

# Run the pipeline
result = asyncio.run(run_analyze_course())

output_result(
    sample_name=SAMPLE_NAME,
    title="Course analysis",
    file_name="course_analysis.json",
    content=result.rendered_json(),
)
