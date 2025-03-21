export const useTimeFormatter = () => {
    const formatBlockedTime = (seconds: number): string => {
        if (seconds <= 0) return "0 detik";

        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        const parts: string[] = [];
        if (hours > 0) parts.push(`${hours} jam`);
        if (minutes > 0) parts.push(`${minutes} menit`);
        if (remainingSeconds > 0) parts.push(`${remainingSeconds} detik`);

        return parts.join(" ");
    };

    return { formatBlockedTime };
};
