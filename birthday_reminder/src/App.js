
import './App.css';
import Title from './Title'
import Content from './Content'
  const birthdayList = [{
    id: 1,
    date: 'Mar 14',
    firstName: 'Luke', 
    lastName: 'Skywalker'},{
    id: 2,
    date: 'Dec 29',
    firstName: 'Darth', 
    lastName: 'Vader'},{
    id: 3,
    date: 'Feb 8',
    firstName: 'lipum', 
    lastName: 'holler'},{
    id: 4,
    date: 'Sept 22',
    firstName: 'han', 
    lastName: 'solo'},{
    id: 5,
    date: 'Aug 18',
    firstName: 'fooooo',
    lastName: 'baaaaz'}
    ]

function App() {
  return (
    <div className="App">
      <header >
      </header>
      <div className="App-body">
        <Title />
        <Content 
          birthdayList= {birthdayList}
        />
      </div>
    </div>
  );
}

export default App;
