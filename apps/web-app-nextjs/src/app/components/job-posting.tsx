import { Job } from "@/models/job";

export default function JobPosting({ job }: { job: Job }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
            <p className="text-gray-700 mb-4">
                {job.company} - {job.location}
            </p>
            <p className="text-gray-600">{job.description}</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Apply Now</button>
        </div>
    );
}
