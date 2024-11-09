import { useQuery } from "@apollo/client";
import { useState, KeyboardEvent, useEffect } from "react";
import { gql } from "../../__generated__";
import { useDebounce } from "@/hooks/use-debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CommandList, CommandEmpty, CommandGroup, CommandItem, Command } from "@/components/ui/command";

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
    const [acOpen, setAcOpen] = useState(false);

    const debouncedSearch = useDebounce(tagInput, 200);

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
            <Popover open={acOpen}>
                <PopoverTrigger asChild>
                    <div className="w-72">
                        <Input
                            placeholder="Add tags..."
                            value={tagInput}
                            onFocus={() => setAcOpen(true)}
                            onBlur={() => setAcOpen(false)}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagInputKeyDown}
                        />
                    </div>
                </PopoverTrigger>

                <PopoverContent className="w-72 p-0" onOpenAutoFocus={(e) => e.preventDefault()}>
                    {loading && <div>Loading...</div>}

                    <Command>
                        <CommandList>
                            <CommandEmpty>No tags</CommandEmpty>

                            <CommandGroup>
                                {data?.searchJobTags.map((tag) => {
                                    return (
                                        <CommandItem
                                            className="cursor-pointer"
                                            key={tag.id}
                                            onSelect={(tag) => addTag(tag)}
                                        >
                                            {tag.tag}
                                        </CommandItem>
                                    );
                                })}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            <Button onClick={() => addTag(tagInput.trim())}>Add Tag</Button>
        </div>
    );
}
