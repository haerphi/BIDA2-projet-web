export const fromValidationFieldError = (
    formErrorFields: any[],
    key: string,
): any[] => {
    const el = formErrorFields.find((f) => f.field === key);
    if (!el) {
        return [];
    }
    return el.errors || [];
};
