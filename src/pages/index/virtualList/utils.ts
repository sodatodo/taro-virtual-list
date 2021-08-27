const convertPxToInt = (style: string | number) => {
    if (typeof style === 'string') {
        const str = style.toLowerCase();
        if (/px$/.test(str)) {
            return Number(str.replace(/px$/, ''));
        }
    }
    return style;
}

export const isHorizontalFunc = (direction, layout): boolean => {
    return direction === 'horizontal' || layout === 'horizontal';
}

export function isRtlFunc (direction) {
    return direction === 'rtl'
}