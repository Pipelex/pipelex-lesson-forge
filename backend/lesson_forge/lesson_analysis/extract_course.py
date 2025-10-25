import asyncio

from pipelex.core.stuffs.list_content import ListContent
from pipelex.core.stuffs.page_content import PageContent
from pipelex.core.stuffs.text_content import TextContent
from pipelex.pipelex import Pipelex
from pipelex.pipeline.execute import execute_pipeline
from pipelex.tools.misc.json_utils import load_json_dict_from_path

from lesson_forge.utils.results_utils import output_result

SAMPLE_NAME = "analysis"


async def run_extract_course() -> str:
    inputs = load_json_dict_from_path("lesson_forge/lesson_analysis/analysis_inputs.json")
    pipe_output = await execute_pipeline(
        pipe_code="extract_text_from_pdf",
        inputs=inputs,
    )
    page_items = pipe_output.main_stuff_as_list(item_type=PageContent).items
    page_texts: list[str] = []
    for page in page_items:
        # page_texts.append(page.text_and_images.text.text)
        page_texts.append(page.rendered_plain())
    return "\n\n".join(page_texts)


# Initialize Pipelex
Pipelex.make()

# Run the pipeline
all_text = asyncio.run(run_extract_course())

output_result(
    sample_name=SAMPLE_NAME,
    title="Course extraction",
    file_name="course_extract.md",
    content=all_text,
)
