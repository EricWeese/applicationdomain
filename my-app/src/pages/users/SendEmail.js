import { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import emailjs from 'emailjs-com'

export default function Signup() {
    const form = useRef();
    const [name, setName] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [email, setEmail] = useState('')

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_0i4nbrd', 'template_2wbknw1', form.current, 'TbAn-vp3myEJSTjbC')
            .then((results) => {
                if (results.text === "ok") {
                    alert("Email was sent")
                } else {
                    alert("Email was sent")
                    //alert("Something went Wrong")
                }
            }, (error) => {
                console.log(error.text)
            })
        e.target.reset()
    }
    return (
        <Form onSubmit={sendEmail} ref={form}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-center">
                    Name
                </Form.Label>
                <Form.Control as="input" onChange={(e) => setName(e.target.value)} type="name" placeholder="Your Name" value={name} name="name" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-center">
                    Email Address
                </Form.Label>
                <Form.Control as="input" onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email Address" value={email} name="email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="text-center">
                    Subject
                </Form.Label>
                <Form.Control as="input" onChange={(e) => setSubject(e.target.value)} type="subject" placeholder="Enter a subject" value={subject} name="subject" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label className="text-center">
                    Message
                </Form.Label>
                <Form.Control as="textarea" row={3} onChange={(e) => setMessage(e.target.value)} type="message" placeholder="Enter a message" value={message} name="message" />
            </Form.Group>
            <div className="d-grid">
                <Button type="submit" variant="primary">
                    Send
                </Button>
            </div>
        </Form>
    )
}