import { Job } from "@/models/job";

export async function getJobs(): Promise<Job[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    title: "Software Engineer",
                    company: "Google",
                    location: "Mountain View, CA",
                    description: "Work on the Google search engine.",
                },
                {
                    id: 2,
                    title: "Software Engineer",
                    company: "Facebook",
                    location: "Menlo Park, CA",
                    description: "Work on the Facebook social network.",
                },
            ]);
        }, 1000);
    });
}
