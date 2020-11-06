import BirthdayList from './BirthdayList'

export default function Content(props) {

  return (
    <div>
        <BirthdayList
          birthdayList= {props.birthdayList}
        />
    </div>
  )
}