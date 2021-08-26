const convertPxToInt = (style: string | number) => {
    if (typeof style === 'string') {
        const str = style.toLowerCase();
        if (/px$/.test(str)) {
            return Number(str.replace(/px$/, ''));
        }
    }
    return style;
}