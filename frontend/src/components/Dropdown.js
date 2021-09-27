import React, { Component } from "react";
import { Multiselect } from "multiselect-react-dropdown";
import { useState } from "react";

const Dropdown = () => {
  const objectArray = [
    { key: "Option 1", cat: "Group 1" },
    { key: "Option 2", cat: "Group 1" },
    { key: "Option 3", cat: "Group 1" },
    { key: "Option 4", cat: "Group 2" },
    { key: "Option 5", cat: "Group 2" },
    { key: "Option 6", cat: "Group 2" },
    { key: "Option 7", cat: "Group 2" },
  ];

  const [subjects, setSubjects] = useState([]);

  const onSelect = (selectedList, selectedItem) => {
    if (subjects.includes(selectedItem)) {
      subjects.push(selectedItem);
    }
  };
  const onRemove = (selectedList, selectedItem) => {
    if (subjects.includes(selectedItem)) {
      var index = subjects.indexOf(selectedItem);
      if (index !== -1) {
        subjects.splice(index, 1);
      }
    }
  };

  return (
    <Multiselect
      options={objectArray}
      displayValue="key"
      onSelect={onSelect}
      onRemove={onRemove}
    />
  );
};

// export default Dropdown

// export default class Dropdown extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       objectArray: [
//         { key: "Option 1", cat: "Group 1" },
//         { key: "Option 2", cat: "Group 1" },
//         { key: "Option 3", cat: "Group 1" },
//         { key: "Option 4", cat: "Group 2" },
//         { key: "Option 5", cat: "Group 2" },
//         { key: "Option 6", cat: "Group 2" },
//         { key: "Option 7", cat: "Group 2" },
//       ],
//       subjects: [],
//     };
//     this.onSelect = this.onSelect.bind(this);
//     this.onRemove = this.onRemove.bind(this);
//     this.style = {
//       searchBox: {
//         border: "none",
//         "border-bottom": "1px solid blue",
//         "border-radius": "0px",
//       },
//       multiselectContainer: {
//         color: "red",
//       },
//     };
//   }
//   onSelect(selectedList, selectedItem) {
//     if (!this.state.subjects.includes(selectedItem)) {
//       this.state.subjects.push(selectedItem);
//     }
//   }
//   onRemove(selectedList, selectedItem) {
//     if (this.state.subjects.includes(selectedItem)) {
//       var index = this.state.subjects.indexOf(selectedItem);
//       if (index !== -1) {
//         this.state.subjects.splice(index, 1);
//       }
//     }
//   }

//   render() {
//     return (
//       <Multiselect
//         options={this.state.objectArray}
//         displayValue="key"
//         onSelect={this.onSelect}
//         onRemove={this.onRemove}
//       />
//     );
//   }
// }

export default Dropdown;
