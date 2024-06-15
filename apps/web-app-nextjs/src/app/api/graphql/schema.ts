const typeDefs = `#graphql
    type OriginalJob {
        time: Int,
        title: String,
        text: String,
    }

    type ParsedJob {
        jobTitle: String
        jobDescription: String
        company: String
        location: String
        contact: String
        notes: String
        parsedUrls: [String]
    }

    type Job {
        _id: ID!
        original: String
        parsed: ParsedJob
    }

    type Query {
        jobs: [Job]
    }
`;

export default typeDefs;
