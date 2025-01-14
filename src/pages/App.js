import '../todoList.css';
import '../App.css';
import AddToList from '../components/todoList';
import LinkList from '../components/Link';


function App() {
  return (
    <div>
      <LinkList/>
      <div>
        <AddToList />
      </div>
    </div>
  );
}
export default App;


