import React, { useState } from 'react';
import { router } from '@inertiajs/react';

const PatientScreening = () => {
    const [message, setMessage] = useState('');

    const sendMessage = (e) => {
        e.preventDefault();

        router.post('/send', { message }, {
            onSuccess: () => {
                setMessage('');
                alert('Message sent successfully');
            },
            onError: (errors) => {
                console.error(errors);
                alert('Failed to send message');
            }
        });
    };

    return (
        <div>
            <h1>Patient Screening Update</h1>
            <form onSubmit={sendMessage}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter message for screening update"
                ></textarea>
                <button type="submit">Send Message</button>
            </form>
        </div>
    );
};

export default PatientScreening;
