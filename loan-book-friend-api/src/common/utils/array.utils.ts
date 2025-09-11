export const isInstanceOf = (obj: any, ...types: any[]) => {
    return types.some((type) => obj instanceof type);
};
