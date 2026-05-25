export async function getErrorMessage(response: Response): Promise<string> {
    try {
        const errorData = await response.json();
        return errorData.message ?? "Invalid credentials";
    } catch {
        return "Invalid credentials";
    }
}