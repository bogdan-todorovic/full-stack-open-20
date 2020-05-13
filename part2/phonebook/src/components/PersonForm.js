import React from 'react';

const PersonForm = (props) => (
  <form onSubmit={props.add}>
    <div>
      name: <input type="text" value={props.newName} onChange={props.changeNewName} />
    </div>
    <div>
      number: <input type="text" value={props.newNumber} onChange={props.changeNewNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
  