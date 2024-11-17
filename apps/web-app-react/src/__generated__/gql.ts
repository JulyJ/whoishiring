/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n    query SearchTags($searchQuery: String!) {\n        searchJobTags(searchQuery: $searchQuery) {\n            id,\n            tag,\n            count\n        }\n    }\n": types.SearchTagsDocument,
    "\n    query GetJobPostingsFilteredPaginated($filter: JobPostingFilter, $limit: Int!, $cursor: ID) {\n        jobPostsPaginated(limit: $limit, cursor: $cursor, filter: $filter) {\n            edges {\n                node {\n                    id\n                    title\n                    company\n                    description\n                    location\n                    contact\n                    parsedUrls\n                    tags\n                    createdAt\n                    hnThread {\n                        id\n                        date\n                    }\n                    author\n                    date\n                    urls\n                    hasRemote\n                    hasQA\n                    hasFrontend\n                    text\n                }\n                cursor\n            }\n            pageInfo {\n              endCursor,\n              hasNextPage\n            }\n        }\n    }\n": types.GetJobPostingsFilteredPaginatedDocument,
    "\n    query GetNewJobPostsCount($lastFetchedTimestamp: UnixTimestamp!, $filter: JobPostingFilter) {\n        newJobCount(lastFetchedTimestamp: $lastFetchedTimestamp, filter: $filter) {\n            count\n        }\n    }\n": types.GetNewJobPostsCountDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query SearchTags($searchQuery: String!) {\n        searchJobTags(searchQuery: $searchQuery) {\n            id,\n            tag,\n            count\n        }\n    }\n"): (typeof documents)["\n    query SearchTags($searchQuery: String!) {\n        searchJobTags(searchQuery: $searchQuery) {\n            id,\n            tag,\n            count\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetJobPostingsFilteredPaginated($filter: JobPostingFilter, $limit: Int!, $cursor: ID) {\n        jobPostsPaginated(limit: $limit, cursor: $cursor, filter: $filter) {\n            edges {\n                node {\n                    id\n                    title\n                    company\n                    description\n                    location\n                    contact\n                    parsedUrls\n                    tags\n                    createdAt\n                    hnThread {\n                        id\n                        date\n                    }\n                    author\n                    date\n                    urls\n                    hasRemote\n                    hasQA\n                    hasFrontend\n                    text\n                }\n                cursor\n            }\n            pageInfo {\n              endCursor,\n              hasNextPage\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetJobPostingsFilteredPaginated($filter: JobPostingFilter, $limit: Int!, $cursor: ID) {\n        jobPostsPaginated(limit: $limit, cursor: $cursor, filter: $filter) {\n            edges {\n                node {\n                    id\n                    title\n                    company\n                    description\n                    location\n                    contact\n                    parsedUrls\n                    tags\n                    createdAt\n                    hnThread {\n                        id\n                        date\n                    }\n                    author\n                    date\n                    urls\n                    hasRemote\n                    hasQA\n                    hasFrontend\n                    text\n                }\n                cursor\n            }\n            pageInfo {\n              endCursor,\n              hasNextPage\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetNewJobPostsCount($lastFetchedTimestamp: UnixTimestamp!, $filter: JobPostingFilter) {\n        newJobCount(lastFetchedTimestamp: $lastFetchedTimestamp, filter: $filter) {\n            count\n        }\n    }\n"): (typeof documents)["\n    query GetNewJobPostsCount($lastFetchedTimestamp: UnixTimestamp!, $filter: JobPostingFilter) {\n        newJobCount(lastFetchedTimestamp: $lastFetchedTimestamp, filter: $filter) {\n            count\n        }\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;