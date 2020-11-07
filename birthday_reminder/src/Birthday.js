import './Birthday.css';


export default function Birthday(props) {

  return (
    <div className='Birthday-container'>
        <h3>{props.date}</h3>
        <h3>{props.firstName}</h3>
        <h3>{props.lastName}</h3> 
    </div>
  )
}