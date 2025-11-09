export const durationParser = (duration: string): number => {
    const match = duration.match(/^(\d+)([smhd])$/);
    if (!match) {
        throw new Error('Invalid duration format');
    }

    const value = parseInt(match[1], 10);
    const unit = match[2];

    switch (unit) {
        case 's':
            return value;
        case 'm':
            return value * 60;
        case 'h':
            return value * 3600;
        case 'd':
            return value * 86400;
        default:
            throw new Error('Invalid duration unit');
    }
};
