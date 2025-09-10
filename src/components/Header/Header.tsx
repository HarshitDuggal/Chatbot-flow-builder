import './Header.styles.css'

const Header = () => {
    const saveChanges = () => {
        console.log("Node Saved");
        // save data of node in localstorage
    }
  return (
    <div className="header-continer">
        <h3>Chatbot flow builder</h3>
        <button className="button" onClick={saveChanges}>Save Changes</button>
    </div>
  )
}

export default Header;