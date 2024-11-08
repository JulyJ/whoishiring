import { useQuery } from "@apollo/client";
import { useState, KeyboardEvent, useEffect } from "react";
import { gql } from "../../__generated__";
import { useDebounce } from "@/hooks/use-debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SEARCH_TAGS = gql(`
    query SearchTags($searchQuery: String!) {
        searchJobTags(searchQuery: $searchQuery) {
            id,
            tag,
            count
        }
    }
`);

export default function AddTagInput({ onAdd, className }: { onAdd: (tag: string) => void; className: string }) {
    const [tagInput, setTagInput] = useState("");

    const debouncedSearch = useDebounce(tagInput, 150);

    const { data, loading } = useQuery(SEARCH_TAGS, {
        variables: { searchQuery: debouncedSearch },
    });

    useEffect(() => {
        console.log("tags", data);
    }, [data]);

    const handleTagInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && tagInput) {
            e.preventDefault();
            addTag(tagInput.trim());
        }
    };

    const addTag = (tag: string) => {
        if (tag) {
            onAdd(tag);
            setTagInput("");
        }
    };

    return (
        <div className={className}>
            <Input
                placeholder="Add tags..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
            />

            <Button onClick={() => addTag(tagInput.trim())}>Add Tag</Button>
        </div>
    );
}
