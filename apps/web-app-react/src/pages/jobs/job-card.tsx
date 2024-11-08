import { GetLatestJobsQuery } from "@/__generated__/graphql";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function JobCard({ job }: { job: GetLatestJobsQuery["jobPostings"][number] }) {
    const isRemote = job.hasRemote || job.tags.includes("remote");

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl font-bold">{job.title}</CardTitle>
                <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </CardHeader>

            <CardContent>
                <div className="flex gap-3 items-center">
                    <div className="text-sm text-muted-foreground">{job.date}</div>
                    <div className="text-muted-foreground">{job.company}</div>
                </div>

                <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">{job.text}</p>

                {isRemote && (
                    <Badge variant="rainbow" className="mt-2">
                        Remote
                    </Badge>
                )}
            </CardContent>
        </Card>
    );
}
