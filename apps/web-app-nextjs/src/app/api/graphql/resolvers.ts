const resolvers = {
    Query: {
        jobs: () => {
            return [
                {
                    id: 1,
                    title: "hello job",
                    company: "hello company",
                    location: "hello location",
                    description: "hello description",
                },
                {
                    id: 2,
                    title: "hello job",
                    company: "hello company",
                    location: "hello location",
                    description: "hello description",
                },
            ];
        },
    },
};

export default resolvers;
