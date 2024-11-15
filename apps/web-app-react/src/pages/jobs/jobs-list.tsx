import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@apollo/client";
import { gql } from "../../__generated__";
import JobCard from "./job-card";
import { JobPostingFilter } from "@/__generated__/graphql";
import { useCallback, useEffect } from "react";

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

export default function JobList({ filters }: { filters: JobPostingFilter }) {
    const { loading, error, data, fetchMore } = useQuery(GET_LATEST_JOBS, {
        variables: {
            filter: filters,
            limit: 10,
        },
        notifyOnNetworkStatusChange: true,
    });

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
            data?.jobPostsPaginated.pageInfo.hasNextPage &&
            !loading
        ) {
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
    }, [data, fetchMore, loading]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [data]);

    if (error) return <div>Error! ${error.message}</div>;

    console.log(data);

    const jobPosts = data?.jobPostsPaginated.edges.map((job: any) => job.node);

    return (
        <div className="grid gap-6">
            {jobPosts?.map((job: any) => {
                return <JobCard key={job.id} job={job} />;
            })}

            {loading && <p>Loading...</p>}
        </div>
    );
}
