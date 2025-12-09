import { BookAvailability } from '@book/enums';

export const getBookAvailability = (dateDue: Date | null): BookAvailability => {
    if (!dateDue) {
        return BookAvailability.Available;
    }

    const currentDate = new Date();
    if (dateDue < currentDate) {
        return BookAvailability.Overdue;
    }

    return BookAvailability.Loaned;
};
