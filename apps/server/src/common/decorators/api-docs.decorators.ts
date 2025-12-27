import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
/**
 * Interface for markdown frontmatter metadata
 */
type MarkdownMetadata = Partial<{
  summary: string;
}>;

/**
 * Options for the ApiDocs decorator
 */
interface ApiDocsOptions {
  path: string;
}

/**
 * Parses markdown frontmatter and content
 */
function parseMarkdown(md: string): {
  metadata: MarkdownMetadata;
  body: string;
} {
  const { data = {}, content = '' } = matter(md);

  return {
    metadata: data as MarkdownMetadata,
    body: content,
  };
}

/**
 * Custom decorator that reads markdown documentation and applies ApiOperation
 * Searches for markdown files in src/docs/{given path} and extracts metadata
 * Returns: NestJS decorator that applies ApiOperation with parsed content
 */
function ApiDocs(options: ApiDocsOptions) {
  return applyDecorators(
    (() => {
      try {
        /** Construct absolute path to the markdown file */
        const docsPath = path.join(
          __dirname,
          '../../../../src',
          'docs',
          options.path,
        );

        /** Read and parse the markdown file */
        const content = fs.readFileSync(docsPath, 'utf-8');
        const { metadata, body } = parseMarkdown(content);

        /** Apply ApiOperation with extracted data */
        return ApiOperation({
          summary: metadata.summary || 'API Endpoint',
          description: body || 'No description available',
        });
      } catch (err) {
        console.error(
          `[ERROR]: Failed to read documentation file: ${options.path}`,
          err,
        );
        return ApiOperation({
          summary: 'API Endpoint',
          description: `[ERROR]: Failed to read documentation file: ${options.path} ${err.message}`,
        });
      }
    })(),
  );
}

export { ApiDocs };
