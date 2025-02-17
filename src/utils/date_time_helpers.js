/**
 * Converts an ISO 8601 formatted date string to a more human-readable format.
 *
 * The function takes an appointment date in the ISO 8601 format (e.g., "2025-02-20T00:00:00.000Z")
 * and returns a formatted string like "Feb 20, 2025" using the 'en-US' locale.
 *
 * @param {string} dateString - The ISO 8601 date string to be converted.
 * @returns {string} - The formatted date string in the format "Month Day, Year" (e.g., "Feb 20, 2025").
 *
 * @example
 * const appointmentDate = "2025-02-20T00:00:00.000Z";
 * console.log(formatAppointmentDate(appointmentDate)); // Output: "Feb 20, 2025"
 */
export function formatAppointmentDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}


