export const findEqualStringInArrayOfObjects = (arr, string) => {
    return arr.find((cur) =>
        Object.keys(cur).some((obj_val) => cur[obj_val].toLowerCase().match(new RegExp(`^${string.toLowerCase()}$`))),
    )
}
