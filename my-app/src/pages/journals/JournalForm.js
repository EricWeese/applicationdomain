// JavaScript source code
import './Journal.css'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import NavBar from '../../components/NavBar/NavBar'
// if you import it like above, you can use js files as components

export default function JournalPage() {
    return (
        <div>
            <NavBar />
            <div id='pageForm'>
                <div />
                <div id='contentBoxThin'>
                    <h id='headerText'>
                        Add Journal Entry
                    </ h>
                    Account Name:
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Please Select Account:
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Account 1</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Account 2</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Account 3</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    Debit or Credit:
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Please Select:
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Debit</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Credit</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Amount:</Form.Label>
                            <Form.Control type="number" placeholder="Enter amount" />
                        </ Form.Group>
                    </ Form >
                    Review Journal or Submit?
                    <div id='flexed-display'>
                        <Button variant="secondary">REVIEW</Button>{' '}
                        <Button variant="primary">SUBMIT</Button>{' '}
                    </ div>
                </ div>
                <div />
            </div>
        </div>
    )
}