export const filterNullish = <T>(objectToFilter: T | null | undefined): objectToFilter is T => {
    return Boolean(objectToFilter);
};
