export function validateForm(formData: FormData) {
    const email = formData.get("user_email") as string;
    const name = formData.get("user_name") as string;
    const message = formData.get("message") as string;
    if (!email || !name || !message) {
        return false;
    }
    return true;
}