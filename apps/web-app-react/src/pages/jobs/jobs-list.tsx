import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@apollo/client";
import { gql } from "../../__generated__";
import JobCard from "./job-card";
import { JobPostingFilter } from "@/__generated__/graphql";

const GET_LATEST_JOBS = gql(`
    query GetLatestJobs($filter: JobPostingFilter) {
        jobPostings(filter: $filter) {
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
    }
`);

export default function JobList({ filters }: { filters: JobPostingFilter }) {
    const { loading, error, data, refetch } = useQuery(GET_LATEST_JOBS, {
        variables: {
            filter: filters,
        },
    });

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error! ${error.message}</div>;

    console.log(data);

    return (
        <div className="grid gap-6">
            {data?.jobPostings.map((job: any) => {
                return <JobCard key={job.id} job={job} />;
            })}
        </div>
    );
}
