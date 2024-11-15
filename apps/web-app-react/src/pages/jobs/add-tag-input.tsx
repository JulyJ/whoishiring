import { useQuery } from "@apollo/client";
import { useState } from "react";
import { gql } from "../../__generated__";
import { useDebounce } from "@/hooks/use-debounce";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CommandList, CommandEmpty, CommandGroup, CommandItem, Command, CommandInput } from "@/components/ui/command";
import { CommandLoading } from "cmdk";

const SEARCH_TAGS = gql(`
    query SearchTags($searchQuery: String!) {
        searchJobTags(searchQuery: $searchQuery) {
            id,
            tag,
            count
        }
    }
`);

export default function AddTagInput({ onAdd, className }: { onAdd: (tag: string) => void; className?: string }) {
    const [tagInput, setTagInput] = useState("");

    // const debouncedSearch = useDebounce(tagInput, 200);

    const { data, loading } = useQuery(SEARCH_TAGS, {
        variables: { searchQuery: tagInput },
    });

    const addTag = (tag: string) => {
        if (tag) {
            onAdd(tag);
            setTagInput("");
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button>Add tags</Button>
            </PopoverTrigger>

            <PopoverContent className="w-72 p-0">
                <Command>
                    <CommandInput
                        placeholder="Add tags..."
                        value={tagInput}
                        onValueChange={(value) => setTagInput(value)}
                    />

                    <CommandList>
                        {loading && <CommandLoading>Loading...</CommandLoading>}

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
    );
}
