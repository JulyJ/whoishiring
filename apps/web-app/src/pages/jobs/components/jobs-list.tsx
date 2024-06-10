function JobsList() {
    const jobs = [
        {
            id: 1,
            title: "Software Engineer",
            company: "Tech Corp",
            location: "New York, NY",
            description: "Develop and maintain web applications using React and Node.js.",
        },
        {
            id: 2,
            title: "Product Manager",
            company: "Innovate LLC",
            location: "San Francisco, CA",
            description: "Lead product development teams to build innovative solutions.",
        },
    ];

    return (
        <div className="space-y-4">
            {jobs.map((job) => (
                <div key={job.id} className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-2">{job.title}</h2>
                    <p className="text-gray-700 mb-4">
                        {job.company} - {job.location}
                    </p>
                    <p className="text-gray-600">{job.description}</p>
                    <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Apply Now
                    </button>
                </div>
            ))}
        </div>
    );
}

export default JobsList;
