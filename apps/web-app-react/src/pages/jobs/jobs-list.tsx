import { useQuery } from "@apollo/client";
import { gql } from "../../__generated__";
import JobCard from "./job-card";
import { JobPostingFilter } from "@/__generated__/graphql";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const GET_LATEST_JOBS = gql(`
    query GetJobPostingsFilteredPaginated($filter: JobPostingFilter, $limit: Int!, $cursor: ID) {
        jobPostsPaginated(limit: $limit, cursor: $cursor, filter: $filter) {
            edges {
                node {
                    id
                    title
                    company
                    description
                    location
                    contact
                    parsedUrls
                    tags
                    createdAt
                    hnThread {
                        id
                        date
                    }
                    author
                    date
                    urls
                    hasRemote
                    hasQA
                    hasFrontend
                    text
                }
                cursor
            }
            pageInfo {
              endCursor,
              hasNextPage
            }
        }
    }
`);

const GET_NEW_JOBS_COUNT = gql(`
    query GetNewJobPostsCount($lastFetchedTimestamp: UnixTimestamp!, $filter: JobPostingFilter) {
        newJobCount(lastFetchedTimestamp: $lastFetchedTimestamp, filter: $filter) {
            count
        }
    }
`);

export default function JobList({ filters }: { filters: JobPostingFilter }) {
    const [newItemsCount, setNewItemsCount] = useState(0);
    const [lastFetchedTimestamp, setLastFetchedTimestamp] = useState<number>(new Date().getTime());

    useQuery(GET_NEW_JOBS_COUNT, {
        variables: {
            lastFetchedTimestamp,
            filter: filters,
        },
        pollInterval: 5000,
        fetchPolicy: "network-only",
        notifyOnNetworkStatusChange: true,
        onCompleted: (data) => {
            setNewItemsCount(data.newJobCount.count);
        },
    });

    const { loading, error, data, fetchMore, refetch } = useQuery(GET_LATEST_JOBS, {
        variables: {
            filter: filters,
            limit: 10,
        },
        notifyOnNetworkStatusChange: true,
    });

    const handleFetchLatest = () => {
        refetch({
            filter: filters,
            limit: 10,
        });
        setNewItemsCount(0);
        setLastFetchedTimestamp(new Date().getTime());
    };

    // const handleScroll = useCallback(() => {
    //     if (
    //         window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
    //         data?.jobPostsPaginated.pageInfo.hasNextPage &&
    //         !loading
    //     ) {
    //         fetchMore({
    //             variables: {
    //                 cursor: data.jobPostsPaginated.pageInfo.endCursor,
    //             },
    //             updateQuery: (prev, { fetchMoreResult }) => {
    //                 if (!fetchMoreResult) return prev;
    //                 return {
    //                     jobPostsPaginated: {
    //                         ...fetchMoreResult.jobPostsPaginated,
    //                         edges: [...prev.jobPostsPaginated.edges, ...fetchMoreResult.jobPostsPaginated.edges],
    //                     },
    //                 };
    //             },
    //         });
    //     }
    // }, [data, fetchMore, loading]);
    //
    // useEffect(() => {
    //     window.addEventListener("scroll", handleScroll);
    //     return () => window.removeEventListener("scroll", handleScroll);
    // }, [data]);

    const handleLoadMore = () => {
        if (data?.jobPostsPaginated.pageInfo.hasNextPage) {
            fetchMore({
                variables: {
                    cursor: data.jobPostsPaginated.pageInfo.endCursor,
                },
                updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) return prev;
                    return {
                        jobPostsPaginated: {
                            ...fetchMoreResult.jobPostsPaginated,
                            edges: [...prev.jobPostsPaginated.edges, ...fetchMoreResult.jobPostsPaginated.edges],
                        },
                    };
                },
            });
        }
    };

    if (error) return <div>Error! ${error.message}</div>;

    const jobPosts = data?.jobPostsPaginated.edges.map((job: any) => job.node);

    return (
        <div className="grid gap-6">
            {newItemsCount > 0 && (
                <button
                    onClick={handleFetchLatest}
                    className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ease-in-out"
                >
                    <span className="mr-2">🔔</span>
                    {newItemsCount} new jobs. Click to reload.
                </button>
            )}

            {jobPosts?.map((job: any) => {
                return <JobCard key={job.id} job={job} />;
            })}

            {loading && <p>Loading...</p>}

            {!loading && (!jobPosts || jobPosts?.length === 0) && <p className="text-gray-400">No jobs found</p>}

            {!loading && data?.jobPostsPaginated.pageInfo.hasNextPage && (
                <Button onClick={handleLoadMore}>Load more</Button>
            )}
        </div>
    );
}
