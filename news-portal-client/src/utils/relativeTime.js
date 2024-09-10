export const formatRelativeTime = (date) => {
    const now = new Date();
    const then = new Date(date);
    const diffInSeconds = Math.floor((now - then) / 1000);

    const intervals = [
        { label: 'month', seconds: 2592000 }, // 60 * 60 * 24 * 30
        { label: 'day', seconds: 86400 }, // 60 * 60 * 24
        { label: 'hour', seconds: 3600 }, // 60 * 60
        { label: 'minute', seconds: 60 },
        { label: 'second', seconds: 1 }
    ];

    for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);
        if (count > 0) {
            return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
        }
    }

    return 'just now';
};

export function formatCurrentDate() {
    // Create a new Date object for the current date and time
    const now = new Date();

    // Define options for formatting the date
    const options = {
        weekday: 'long',   // Full name of the day of the week
        day: '2-digit',    // Day of the month as two digits
        month: 'long',      // Full name of the month
        year: 'numeric'     // Four-digit year
    };

    // Use Intl.DateTimeFormat to format the date
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(now);

    return formattedDate;
}