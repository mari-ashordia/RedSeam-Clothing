export const paginationWithDots = (currentPage, totalPages) => {
    const delta = 1;  // current = 5 range = [1,4,5,6,10]  withDots = [1,...,4,5,6,...,10]
    const range = []; // current = 3                       withDots = [1,2,3,4,...,10]
    const rangeWithDots = []; // current = 4               withdots = [1,...,3,4,5,...,10]
    let prev;

    for(let i = 1; i <= totalPages; i++) {
        if(i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta))
            range.push(i);
    }

    for (const i of range) {
        if (prev !== undefined) {
            const gap = i - prev;
            if (gap === 2) {
                rangeWithDots.push(prev + 1); // fill a one-number gap
            } else if (gap > 2) {
            rangeWithDots.push("...");    // big gap -> ellipsis
            }
        }
    rangeWithDots.push(i);
    prev = i;
    }

    return rangeWithDots;
}