import './Title.css'

export default function Title({title}){
    return (
        <div className="title-block">
            <h2 className="title">{title}</h2>
        </div>
    )
}