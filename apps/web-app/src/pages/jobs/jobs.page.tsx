import JobsList from "./components/jobs-list";

function JobsPage() {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center underline">Job Postings</h1>

                <JobsList />
            </div>
        </div>
    );
}

export default JobsPage;
