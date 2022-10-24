import { Form, Button } from "react-bootstrap"


export default function AddAccount() {
    return (
        <Form>
            <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Account Name"
                    required
                />
            </Form.Group>

            <Form.Select aria-label="category">
                <option>Category</option>
                <option value="Asset">Asset</option>
                <option value="Liabilities">Liabilities</option>
                <option value="Equity">Equity</option>
                <option value="Revenues">Revenues</option>
                <option value="Expenses">Expenses</option>
            </Form.Select>

            <Form.Select aria-label="statement">
                <option>Statement</option>
                <option value="Balance Sheet">Balance Sheet</option>
                <option value="Income Sheet">Income Sheet</option>
            </Form.Select>


            <Button variant="success" type="submit" block>
                Add New Account
            </Button>
        </Form>
    )
}
