import { EmailFormData } from './route';
export function buildEmailBody(requestBody: EmailFormData) {
    return `
        <table>
            <tr>
                <td><strong>Name:</strong></td>
                <td>${requestBody.name}</td>
            </tr>
            <tr>
                <td><strong>Email:</strong></td>
                <td>${requestBody.email}</td>
            </tr>
            <tr>
                <td><strong>Message:</strong></td>
                <td>${requestBody.message}</td>
            </tr>
        </table>
    `;
}