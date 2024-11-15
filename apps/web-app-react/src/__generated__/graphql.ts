/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Unix timestamp in seconds */
  UnixTimestamp: { input: any; output: any; }
};

export type JobPostingFilter = {
  fromDate?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  remoteOnly?: InputMaybe<Scalars['Boolean']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
  threadId?: InputMaybe<Scalars['ID']['input']>;
  toDate?: InputMaybe<Scalars['UnixTimestamp']['input']>;
};

export type SearchTagsQueryVariables = Exact<{
  searchQuery: Scalars['String']['input'];
}>;


export type SearchTagsQuery = { __typename?: 'Query', searchJobTags: Array<{ __typename?: 'JobTag', id: string, tag: string, count: number }> };

export type GetJobPostingsFilteredPaginatedQueryVariables = Exact<{
  filter?: InputMaybe<JobPostingFilter>;
  limit: Scalars['Int']['input'];
  cursor?: InputMaybe<Scalars['ID']['input']>;
}>;


export type GetJobPostingsFilteredPaginatedQuery = { __typename?: 'Query', jobPostsPaginated: { __typename?: 'JobPostConnection', edges: Array<{ __typename?: 'JobPostEdge', cursor: string, node: { __typename?: 'JobPosting', id: string, title: string, company: string, description: string, location: string, contact?: string | null, parsedUrls: Array<string>, tags: Array<string>, createdAt: any, author: string, date: string, urls: Array<string>, hasRemote: boolean, hasQA: boolean, hasFrontend: boolean, text: string, hnThread: { __typename?: 'HnThread', id: string, date: string } } }>, pageInfo: { __typename?: 'PageInfo', endCursor?: string | null, hasNextPage: boolean } } };


export const SearchTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchTags"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchQuery"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchJobTags"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchQuery"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchQuery"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tag"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<SearchTagsQuery, SearchTagsQueryVariables>;
export const GetJobPostingsFilteredPaginatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetJobPostingsFilteredPaginated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JobPostingFilter"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"jobPostsPaginated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"cursor"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cursor"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"contact"}},{"kind":"Field","name":{"kind":"Name","value":"parsedUrls"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"hnThread"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}},{"kind":"Field","name":{"kind":"Name","value":"author"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"urls"}},{"kind":"Field","name":{"kind":"Name","value":"hasRemote"}},{"kind":"Field","name":{"kind":"Name","value":"hasQA"}},{"kind":"Field","name":{"kind":"Name","value":"hasFrontend"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endCursor"}},{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}}]}}]}}]}}]} as unknown as DocumentNode<GetJobPostingsFilteredPaginatedQuery, GetJobPostingsFilteredPaginatedQueryVariables>;