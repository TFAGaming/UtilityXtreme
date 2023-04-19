export function idGen(): number {
    return (Date.now() + Math.floor(Math.random() * 999999999999));
};