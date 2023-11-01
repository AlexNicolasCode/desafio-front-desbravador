export const useTextConverter = () => {
    const truncateText = (text) => {
        if (text.length >= 7) {
            return `${text.substring(0, 7)}...`
        }
        return text
    }

    return { truncateText }
}