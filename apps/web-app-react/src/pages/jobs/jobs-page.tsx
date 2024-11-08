import JobFilters from "./job-filters";
import { useState } from "react";
import JobList from "./jobs-list";
import { JobPostingFilter } from "@/__generated__/graphql";

export default function JobsPage() {
    const [filters, setFilters] = useState<JobPostingFilter>({
        searchQuery: "",
        fromDate: undefined,
        toDate: undefined,
        tags: [],
        remoteOnly: false,
    });

    return (
        <div className="container mx-auto p-4 space-y-6">
            <JobFilters onFilterChange={setFilters} />

            <JobList filters={filters} />
        </div>
    );
}
