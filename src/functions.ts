export function formatSearchString(string: string): string {
    return string.toLocaleLowerCase().replace(' ', '');
}

export function filterOptionsCollection(coll: HTMLOptionsCollection, filterMethod?: (item: HTMLOptionElement) => boolean): HTMLOptionElement[] {
    const ret = [];
    for (let i = 0; i < coll.length; i++) {
        if (typeof filterMethod === 'undefined' || filterMethod(coll[i])) {
            ret.push(coll[i]);
        }
    }
    return ret;
}
