export const getTimeAgo = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInSeconds = Math.abs((now - then) / 1000);
    const diffInMin = diffInSeconds / 60
    const diffInHours = diffInSeconds / 3600;
    const diffInDays = diffInHours / 24;
    const diffInMonths = diffInDays / (365.25 / 12);
    const diffInYears = diffInDays / 365.25;

    if (diffInYears >= 1) {
        return Math.floor(diffInYears) + " tahun lalu";
    } else if (diffInMonths >= 1) {
        return Math.floor(diffInMonths) + " bulan lalu";
    } else if (diffInDays >= 1) {
        return Math.floor(diffInDays) + " hari lalu";
    } else if (diffInHours >= 1) {
        return Math.floor(diffInHours) + " jam lalu";
    } else if (diffInMin >= 1) {
        return Math.floor(diffInMin) + " menit lalu";
    } else {
        return "just now";
    }
}