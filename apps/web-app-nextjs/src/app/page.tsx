import { getJobs } from "./actions";
import JobsList from "./components/jobs-list";
import { gql } from "@apollo/client";
import { getClient } from "@/app/lib/apollo-client";
import { Job } from "@/models/job";
import { formatDate } from "./utils/date";

export const dynamic = "force-dynamic";
// export const revalidate = 5;

const GET_JOBS = gql`
    query GetJobs {
        jobs {
            _id
            author
            company
            contact
            created
            location
            date
            urls
            tags
            hasRemote
            hasQA
            hasFrontend
            original {
                text
            }
        }
    }
`;

export default async function Home() {
    const res = await getClient().query({ query: GET_JOBS });

    if (res.loading) {
        return <div>Loading...</div>;
    }

    const data = res.data;

    if (res.error || !data) {
        return <div>Failed to fetch jobs</div>;
    }

    const parsedJobs: Job[] = data.jobs.map((job: any) => {
        const ogText = job.original.text.split("\n");
        const title = ogText[0];
        const date = formatDate(job.date);
        let description = ogText.slice(1).join("\n");
        description = description
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");

        return {
            id: job._id,
            title: title,
            date: date,
            company: job.company,
            urls: job.urls,
            tags: job.tags,
            location: job.location,
            description: description,
            isRemote: job.hasRemote,
            hasFrontend: job.hasFrontend,
            hasQa: job.hasQA,
        };
    });

    return (
        <div className="p-6">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center underline">Latest Posts</h1>
                <JobsList jobs={parsedJobs} />
            </div>
        </div>
    );
}
