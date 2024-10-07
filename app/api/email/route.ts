import { NextRequest } from "next/server";

// make this a POST request so nobody can reach this from the browser
export function POST(request: NextRequest) {
    try {

        // grab creds from .env.local
        const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PW } = process.env;
        
        
        // logic will go here
        // console.log('request', request);
        return Response.json(null, {status: 200});
    } catch (error) {
        return Response.json({error: error.message}, {status: 500});
    }
}