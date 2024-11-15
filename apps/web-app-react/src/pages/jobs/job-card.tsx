import { GetJobPostingsFilteredPaginatedQuery } from "@/__generated__/graphql";
import RelativeDate from "@/components/date/relative-date";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function JobCard({
    job,
}: {
    job: GetJobPostingsFilteredPaginatedQuery["jobPostsPaginated"]["edges"][number]["node"];
}) {
    const isRemote = job.hasRemote || job.tags.includes("remote");

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold mb-1">
                    {job.title} <span className="text-sm text-gray-500">({job.company})</span>
                    <span className="text-sm font-light text-gray-400 ml-2">
                        <RelativeDate date={job.date} />
                    </span>
                    {isRemote && (
                        <Badge variant="rainbow" className="ml-2 cursor-default">
                            Remote
                        </Badge>
                    )}
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardHeader>

            <CardContent>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{job.text}</p>
            </CardContent>
        </Card>
    );
}
