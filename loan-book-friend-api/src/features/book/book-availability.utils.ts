import { BookAvailability } from './enums';

export const GetBookAvailability = (date: Date | null): BookAvailability => {
    let available: BookAvailability = date
        ? BookAvailability.Loaned
        : BookAvailability.Available;

    if (date) {
        if (date > new Date()) {
            available = BookAvailability.Overdue;
        }
    }

    return available;
};
