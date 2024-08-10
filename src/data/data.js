// Just for funsies
const names = ['Mike', 'Maxine', 'Eleven', 'Will', 'Dustin', 'Lucas'];
export const USERS = Array.from(names, (v, k) => ({ id: k + 1, name: v }));
/* 
Item IDs for dnd-kit should not be 0, as they will not drag.
IDs passed to  the useSortable hook have to be strings or truthy
Negative values are fair game.
*/
/* UniqueIdentifier can also be used and is provided by dnd-kit */
