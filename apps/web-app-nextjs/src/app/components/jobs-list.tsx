import { Job } from "@/models/job";
import JobPosting from "./job-posting";

async function JobsList({ jobs }: { jobs: Job[] }) {
    return (
        <div className="max-w-6xl mx-auto p-6 rounded-lg shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {jobs.map((job) => (
                    <JobPosting key={job.id} job={job} />
                ))}
            </div>
        </div>
    );
}

export default JobsList;
