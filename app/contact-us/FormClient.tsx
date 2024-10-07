"use client";
import styles from "./contact-form.module.css";
import React, { useState, useRef } from "react";

// https://dev.to/ivanms1/protecting-your-api-keys-with-next-js-21ej

export default function FormClient() {

    const form = useRef<HTMLFormElement | null>(null);
    const [formSubmitted, setFormSubmitted] = useState(false);
        
    async function sendEmail(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // call api/email with form data
        const formData = new FormData(form.current);
        const email = formData.get("user_email") as string;
        const name = formData.get("user_name") as string;
        const message = formData.get("message") as string;

        // call api/email with form data
        try {
            // call api/email with form data
            // const res = await fetch(`/api/email`);
            const res = await fetch(`/api/email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, name, message }),
            });
            const data = await res.json();
            // if (!res.ok) throw new Error(data?.error || 'Unable to send email');
            if (!res.ok) {
                throw new Error(data?.error || 'Unable to send email');
            }
            else {
                // set formSubmitted to true - this hides the form and displays the thank you message
                setFormSubmitted(true);
            }
        }
        catch (error) {
            console.error("Error sending email:", error);
        }
    }

    return (
        <>
            {/* if !formSubmitted, display 'contact us' and form, else display 'thank you' */}

            {!formSubmitted && (
                // form not submitted - display form
                <form
                    ref={form}
                    onSubmit={sendEmail}
                    id="contact-us-form"
                >
                    <h1 className={styles.card_title} >Contact Us</h1>

                    <div className={`form-group ${styles.name_input}`}>
                        <label>Name</label>
                        <input
                            type='text'
                            name='user_name'
                            className='form-control'
                        />
                    </div>

                    <div className={`form-group ${styles.email_input}`}>
                        <label>Email</label>
                        <input
                            type='email'
                            name='user_email'
                            className='form-control'
                            aria-describedby='emailHelp'
                            placeholder='Enter email'
                        />
                    </div>

                    <div className={`form-group ${styles.message_input}`}>
                        <label>Message</label>
                        <textarea
                            name='message'
                            className='form-control'
                        />
                    </div>

                    <input
                        className={`btn btn-info btn-md ${styles.send_button}`}
                        id='contact-us-button'
                        type='submit'
                        value='Send'
                    />
                </form>
            )}
            {formSubmitted && (
                // form submitted - display thank you
                <>
                    <h1>Thank You!</h1>
                    <p>We will get back with you as soon as possible, for more immediate contact you can also call us at:</p>
                    <p>Phone: (859) 533-1684</p>
                    <p>Or stop by and say hello!</p>                    
                </>
            )}
        </>
    );
}