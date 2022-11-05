import './Journal.css'
import Table from 'react-bootstrap/Table';
import NavBar from '../../components/NavBar/NavBar'
// if you import it like above, you can use js files as components

export default function JournalPage() {
    return (
        <div>
            <NavBar />
            <div id='pageForm'>
                <div />
                <div id='contentBox'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td colSpan={2}>Larry the Bird</td>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </Table>
                </ div>
                <div />
            </div>
        </div>
    )
}