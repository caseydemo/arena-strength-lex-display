import Form from './Form';
import styles from './contact-form.module.css';
export default function ContactUs() {
    
    return (
        <div>
            <h1 className={styles.main_heading} >Contact Us</h1>
            <Form />
        </div>
    );
}