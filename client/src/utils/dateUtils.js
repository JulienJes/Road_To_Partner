export function formatDate(dateString) {
    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    }
    const date = new Date(dateString)
    const dateToString = date.toLocaleString("fr-FR", dateOptions)
    return (
        dateToString.replace(":", "h").charAt(0).toUpperCase() +
        dateToString.slice(1)
    )
}
