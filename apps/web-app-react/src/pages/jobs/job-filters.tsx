import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { JobPostingFilter } from "@/__generated__/graphql";
import { useDebounce } from "@/hooks/use-debounce";
import AddTagInput from "./add-tag-input";

export default function JobFilters({ onFilterChange }: { onFilterChange: (filters: JobPostingFilter) => void }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [dateRange, setDateRange] = useState<DateRange | undefined>();
    const [tags, setTags] = useState<string[]>([]);
    const [remoteOnly, setRemoteOnly] = useState(false);

    const debouncedSearch = useDebounce(searchQuery, 150);

    useEffect(() => {
        handleFilterChange();
    }, [debouncedSearch, dateRange, tags, remoteOnly]);

    const handleFilterChange = () => {
        onFilterChange({
            searchQuery: debouncedSearch,
            fromDate: dateRange?.from,
            toDate: dateRange?.to,
            tags,
            remoteOnly,
        });
    };

    const addTag = (tag: string) => {
        if (tag && !tags.includes(tag)) {
            const newTags = [...tags, tag];
            setTags(newTags);
        }
    };

    const removeTag = (tagToRemove: string) => {
        const newTags = tags.filter((tag) => tag !== tagToRemove);
        setTags(newTags);
    };

    return (
        <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="relative">
                    <Input
                        className="w-full"
                        placeholder="Search jobs..."
                        type="search"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                        }}
                    />
                </div>

                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateRange?.from ? (
                                dateRange.to ? (
                                    <>
                                        {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                                    </>
                                ) : (
                                    format(dateRange.from, "LLL dd, y")
                                )
                            ) : (
                                <span>Pick a date range</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={dateRange?.from}
                            selected={dateRange}
                            onSelect={setDateRange}
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>

                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="remote"
                        checked={remoteOnly}
                        onCheckedChange={(checked) => {
                            setRemoteOnly(checked as boolean);
                        }}
                    />
                    <label
                        htmlFor="remote"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Remote only
                    </label>
                </div>
            </div>

            <div className="space-y-2">
                {tags.length === 0 && <div className="text-gray-400 text-sm mr-2">No tags selected</div>}

                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-sm">
                            {tag}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="ml-1 h-auto p-0 text-muted-foreground hover:text-foreground"
                                onClick={() => removeTag(tag)}
                            >
                                <X className="h-3 w-3" />
                                <span className="sr-only">Remove {tag} tag</span>
                            </Button>
                        </Badge>
                    ))}
                </div>

                <AddTagInput onAdd={addTag} />
            </div>
        </div>
    );
}
