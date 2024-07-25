import { Job } from "@/models/job";

export default function JobPosting({ job }: { job: Job }) {
    return (
        <div className="bg-white text-gray-700 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
            <div className="mb-4">
                <span className="text-gray-500">{job.date}</span> | <span>{job.company}</span> |{" "}
                <span>{job.location}</span>
            </div>

            <div className="mb-4">
                <div className="flex gap-2">
                    <span className="font-semibold">Tags:</span>
                    <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag) => (
                            <div key={tag} className="bg-gray-200 px-2 py-1 rounded cursor-pointer hover:bg-gray-300">
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mb-4">
                <div>🌐 Remote: ✅</div>
                <div>🧪 QA: ❌</div>
                <div>🖥️ Front-end: ❌</div>
            </div>

            <div className="mb-4">
                <span className="font-semibold">Urls:</span>
                {job.urls.map((url, i) => (
                    <a key={i} href={url} className="block text-blue-500 hover:text-blue-700">
                        {url}
                    </a>
                ))}
            </div>

            <p className="text-gray-800">{job.description}</p>

            {/*
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Apply Now</button>
            */}
        </div>
    );
}
