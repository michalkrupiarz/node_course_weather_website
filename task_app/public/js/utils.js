function convertTime(time) {
    const date = new Date(time*1000)
    return date.toLocaleDateString("en-UK", {
        timeZone: "Europe/Berlin",
        hour: "2-digit",
        minute: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    })
}