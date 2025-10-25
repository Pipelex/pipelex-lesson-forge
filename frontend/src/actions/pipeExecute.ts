'use server';

import type { PipelineRequest, PipelineResponse } from '@/types/core/protocol';
import { logError, ExternalServiceError, InternalError } from '@/lib/errors';
import type { Result } from '@/types/result';

const PIPELEX_API_BASE_URL = process.env.PIPELEX_API_BASE_URL;
const PIPELEX_API_KEY = process.env.PIPELEX_API_KEY;

/**
 * Execute a pipe with the given inputs
 * Uses /pipeline/{pipe_code}/execute which validates PLX and executes the pipe in one call
 */
export async function executePipe(
  pipeCode: string,
  plxContent: string,
  inputs: PipelineRequest['inputs'],
): Promise<Result<PipelineResponse & { pipe_structures?: Record<string, any> }>> {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${PIPELEX_API_KEY}`,
  };
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 600000); // 10 minute timeout

  try {
    const requestBody: PipelineRequest = {
      pipe_code: pipeCode,
      inputs,
      plx_content: plxContent,
    };

    const response = await fetch(`${PIPELEX_API_BASE_URL}/api/v1/pipeline/execute`, {
      method: 'POST',
      headers,
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.text();

      // Try to parse the error message from the API response
      let userMessage = 'Failed to execute pipeline. Please try again.';
      try {
        const errorJson = JSON.parse(errorData);
        if (errorJson.detail) {
          if (typeof errorJson.detail === 'string') {
            userMessage = errorJson.detail;
          } else if (errorJson.detail.message) {
            userMessage = errorJson.detail.message;
          }
        }
      } catch {
        // If not JSON, use the raw error data if it's short enough
        if (errorData.length < 200) {
          userMessage = errorData;
        }
      }

      const error = new ExternalServiceError(
        `FastAPI error: ${response.status} - ${errorData}`,
        userMessage,
      );
      logError(error, { action: 'executePipe', status: response.status, errorData });
      return {
        success: false,
        error: {
          type: 'external',
          message: error.userMessage,
        },
      };
    }

    const data = await response.json();

    // Handle response with pipeline_response wrapper and pipe_structures
    if (data.pipeline_response) {
      return {
        success: true,
        data: {
          pipeline_run_id: data.pipeline_response.pipeline_run_id,
          pipeline_state: data.pipeline_response.pipeline_state,
          created_at: data.pipeline_response.created_at,
          finished_at: data.pipeline_response.finished_at,
          pipe_output: data.pipeline_response.pipe_output,
          main_stuff_name: data.pipeline_response.main_stuff_name,
          pipe_structures: data.pipe_structures,
        },
      };
    }

    // Fallback to direct response structure
    return {
      success: true,
      data: {
        pipeline_run_id: data.pipeline_run_id,
        pipeline_state: data.pipeline_state,
        created_at: data.created_at,
        finished_at: data.finished_at,
        pipe_output: data.pipe_output,
        main_stuff_name: data.main_stuff_name,
        pipe_structures: data.pipe_structures,
      },
    };
  } catch (error: any) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      const appError = new ExternalServiceError(
        'Request timed out after 10 minutes',
        'The pipeline execution is taking longer than expected. Please try again.',
      );
      logError(appError, { action: 'executePipe', timeout: '10min' });
      return {
        success: false,
        error: {
          type: 'external',
          message: appError.userMessage,
        },
      };
    }

    if (error.cause?.code === 'ECONNREFUSED') {
      const appError = new ExternalServiceError(
        'Connection refused to FastAPI',
        'Cannot connect to the API service. Please try again later.',
      );
      logError(appError, { action: 'executePipe', cause: 'ECONNREFUSED' });
      return {
        success: false,
        error: {
          type: 'external',
          message: appError.userMessage,
        },
      };
    }

    const appError = new InternalError(
      error instanceof Error ? error.message : 'Unknown error occurred',
      'An unexpected error occurred while executing the pipeline.',
    );
    logError(appError, { action: 'executePipe', originalError: error });
    return {
      success: false,
      error: {
        type: 'internal',
        message: appError.userMessage,
      },
    };
  }
}
