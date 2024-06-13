import { getJobs } from "./actions";
import JobsList from "./components/jobs-list";

export default async function Home() {
    const jobs = await getJobs();

    return (
        <div className="p-6">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center underline">Job Postings</h1>

                <JobsList jobs={jobs} />
            </div>
        </div>
    );
}
