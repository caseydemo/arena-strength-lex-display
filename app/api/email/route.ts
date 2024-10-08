import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { buildEmailBody } from "./lib";

export type EmailFormData = {
    email: string;
    name: string;
    message: string;
}

// make this a POST request so nobody can reach this from the browser
export async function POST(request: NextRequest) {
    try {

        if(!request.body) {
            throw new Error("No body found in request");
        }
        // Get body from request
		let requestBody = await request.json()
        requestBody = requestBody as EmailFormData;        
        
        if(!requestBody.email || !requestBody.name || !requestBody.message) {
            throw new Error("Missing required fields in request body");
        }
		
        // grab creds from .env.local
        const { 
            SMTP_HOST, 
            SMTP_PORT, 
            SMTP_USER, 
            SMTP_PW,
        } = process.env;

        // create a nodemailer transporter
        const transporter = nodemailer.createTransport({
            host: SMTP_HOST,
            port: Number(SMTP_PORT),
            secure: false, // true for port 465, false for other ports
            auth: {
                user: SMTP_USER,
                pass: SMTP_PW,
            },
        });

        if(!transporter) {
            throw new Error("Could not create transporter");
        }
        
        // build the email body as a table containing the form data
        const emailBody = buildEmailBody(requestBody);

        // # email defaults
        const arenaEmail  ='info@arena-strength-lex.com';
        const subject = 'Form Submission | arena-strength-lex.com';

        // send mail with defined transport object
        const info = await transporter.sendMail({
            from: `Arena Strength & Performance <${arenaEmail}>`, // sender address
            to: arenaEmail,
            subject: subject,
            text: `From: ${requestBody.name}\n\n${requestBody.email}\n\n${requestBody.message}`, // plain text body
            html: emailBody, // html body
        });        

        if(!info) {
            throw new Error("Could not send email");
        }        

        return Response.json(null, {status: 200});

    } catch (error) {
        return Response.json({error: error.message}, {status: 500});
    }
}