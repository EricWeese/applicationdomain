import './LoginButton.css'

export default function LoginButton({title}){
    return (
        <div>
            <button className="button">{title}</button>
        </div>
    )
}