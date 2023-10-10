import React, { useState } from "react";
import "./App.css";
import jSonno from "./contacts.json";

function App() {
  const [contacts, setContacts] = useState(jSonno.slice(0, 5));

  const getRandomContact = () => {
    const unused = jSonno.filter((contact) => !contacts.includes(contact));
    const index = Math.floor(Math.random() * unused.length);
    return unused[index];
  };

  const handleAddRandom = () => {
    const randomCont = getRandomContact();
    if (randomCont) setContacts((previous) => [...previous, randomCont]);
  };
  const sortByName = () => {
    const sorted = [...contacts].sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { sensitivity: "base" })
    );
    setContacts(sorted);
  };

  const sortByPop = () => {
    const sorted = [...contacts].sort((a, b) => b.popularity - a.popularity);
    setContacts(sorted);
  };

  const deleteCont = (id) => {
    const toKeep = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(toKeep);
  };

  console.log(contacts);
  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>
      <button onClick={handleAddRandom}>Add Random Contact</button>
      <button onClick={sortByName}>Sort By Name</button>
      <button onClick={sortByPop}>Sort By Popularity</button>
      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <tr key={contact.id}>
              <td>
                <img
                  src={contact.pictureUrl}
                  alt={contact.name}
                  style={{ width: "80px" }}
                />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity}</td>
              <td>{contact.wonOscar ? "🏆" : ""}</td>
              <td>{contact.wonEmmy ? "🌟" : ""}</td>
              <td>
                <button onClick={() => deleteCont(contact.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
