import { Job } from "@/models/job";
import JobPosting from "./job-posting";

function JobsList({ jobs }: { jobs: Job[] }) {
    return (
        <div className="space-y-4">
            {jobs.map((job) => (
                <JobPosting key={job.id} job={jobs[0]} />
            ))}
        </div>
    );
}

export default JobsList;
