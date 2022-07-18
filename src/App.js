import "./styles/App.css";
import ContactList from "./components/ContractList";
import NavBar from "./components/NavBar";
import NewContact from "./components/NewContact";

function App() {
  return (
    <div className="App">
      <NavBar />
      <NewContact />
      <ContactList />
    </div>
  );
}

export default App;
