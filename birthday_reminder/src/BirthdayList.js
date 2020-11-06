import Birthday from './Birthday'

export default function BirthdayList(props) {

  console.log(props.birthdayList)
  return (
    <div>
      {props.birthdayList.map(birthday => {
        return(<Birthday 
          key={birthday.id}
          date= {birthday.date}
          firstName= {birthday.firstName}
          lastName= {birthday.lastName}
        />)
      })}
    </div>
  )
}