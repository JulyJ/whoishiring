import { formatDistanceToNow, isValid, parseISO } from "date-fns";

export default function RelativeDate({ date }: { date: string }) {
    if (!date) return null;

    let parsed = parseISO(date);
    if (!isValid(parsed)) {
        // try parsing incorrect format for some posts ({isodate} {timestamp})
        const [isoDate] = date.split(" ");
        parsed = parseISO(isoDate);

        if (!isValid(parsed)) {
            return null;
        }
    }
    return <span title={date}>{formatDistanceToNow(parsed, { addSuffix: true })}</span>;
}
