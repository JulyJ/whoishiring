import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { DataSourceContext } from './context.ts';
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
  UnixTimestamp: { input: any; output: any; }
};

export type HnThread = {
  __typename?: 'HnThread';
  date: Scalars['String']['output'];
  id: Scalars['ID']['output'];
};

export type JobPosting = {
  __typename?: 'JobPosting';
  author: Scalars['String']['output'];
  company: Scalars['String']['output'];
  contact?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['UnixTimestamp']['output'];
  date: Scalars['String']['output'];
  description: Scalars['String']['output'];
  hasFrontend: Scalars['Boolean']['output'];
  hasQA: Scalars['Boolean']['output'];
  hasRemote: Scalars['Boolean']['output'];
  hnThread: HnThread;
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  parsedUrls: Array<Scalars['String']['output']>;
  tags: Array<Scalars['String']['output']>;
  text: Scalars['String']['output'];
  title: Scalars['String']['output'];
  urls: Array<Scalars['String']['output']>;
};

export type JobPostingFilter = {
  fromDate?: InputMaybe<Scalars['UnixTimestamp']['input']>;
  searchQuery?: InputMaybe<Scalars['String']['input']>;
  threadId?: InputMaybe<Scalars['ID']['input']>;
  toDate?: InputMaybe<Scalars['UnixTimestamp']['input']>;
};

export type Listing = {
  __typename?: 'Listing';
  closedForBookings?: Maybe<Scalars['Boolean']['output']>;
  costPerNight?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  numOfBeds?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  featuredListings: Array<Listing>;
  jobPostings: Array<JobPosting>;
};


export type QueryJobPostingsArgs = {
  filter?: InputMaybe<JobPostingFilter>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  HnThread: ResolverTypeWrapper<HnThread>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JobPosting: ResolverTypeWrapper<JobPosting>;
  JobPostingFilter: JobPostingFilter;
  Listing: ResolverTypeWrapper<Listing>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UnixTimestamp: ResolverTypeWrapper<Scalars['UnixTimestamp']['output']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Float: Scalars['Float']['output'];
  HnThread: HnThread;
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  JobPosting: JobPosting;
  JobPostingFilter: JobPostingFilter;
  Listing: Listing;
  Query: {};
  String: Scalars['String']['output'];
  UnixTimestamp: Scalars['UnixTimestamp']['output'];
};

export type HnThreadResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['HnThread'] = ResolversParentTypes['HnThread']> = {
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type JobPostingResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['JobPosting'] = ResolversParentTypes['JobPosting']> = {
  author?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  company?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contact?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['UnixTimestamp'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasFrontend?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasQA?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasRemote?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hnThread?: Resolver<ResolversTypes['HnThread'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parsedUrls?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  tags?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  urls?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ListingResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Listing'] = ResolversParentTypes['Listing']> = {
  closedForBookings?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  costPerNight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  numOfBeds?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  featuredListings?: Resolver<Array<ResolversTypes['Listing']>, ParentType, ContextType>;
  jobPostings?: Resolver<Array<ResolversTypes['JobPosting']>, ParentType, ContextType, Partial<QueryJobPostingsArgs>>;
};

export interface UnixTimestampScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['UnixTimestamp'], any> {
  name: 'UnixTimestamp';
}

export type Resolvers<ContextType = DataSourceContext> = {
  HnThread?: HnThreadResolvers<ContextType>;
  JobPosting?: JobPostingResolvers<ContextType>;
  Listing?: ListingResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UnixTimestamp?: GraphQLScalarType;
};

