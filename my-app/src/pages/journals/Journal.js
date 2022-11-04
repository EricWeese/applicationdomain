import './Journal.css'
import NavBar from '../../components/NavBar/NavBar'

export default function JournalPage() {
    return (
        <div>
            <div id="journalHead">
                <div>
                    <img src={require("../../img/Logo.png") } />
                </div>
                <div id="nameDisplay">
                    <div id="pad">
                        CGeorge0922
                    </div>
                    <div id="pad">
                        <img src={require("../../img/ProfilePic.jfif")} />
                    </div>
                </div>
            </div>
            <NavBar />
            </div>
    )
}