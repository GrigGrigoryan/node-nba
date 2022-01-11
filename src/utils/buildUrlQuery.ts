export const buildUrlQuery = (obj: any) => {
    const str: any[] = [];
    for (let p in obj) {
        console.log('p', p);
        if (obj.hasOwnProperty(p)) {
            str.push(p + "=" + encodeURIComponent(obj[p]));
        }
    }

    return str.join("&");
}