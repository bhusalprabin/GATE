import React from "react";
import { MultiSelect } from "multiselect-react-dropdown";

export default TutorSubjectUpdate = () => {
  const subjects = [];

  const objectArray = [
    { key: "Option 1", cat: "Group 1" },
    { key: "Option 2", cat: "Group 1" },
    { key: "Option 3", cat: "Group 1" },
    { key: "Option 4", cat: "Group 2" },
    { key: "Option 5", cat: "Group 2" },
    { key: "Option 6", cat: "Group 2" },
    { key: "Option 7", cat: "Group 2" },
  ];

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
    <div>
      <MultiSelect
        options={objectArray}
        displayValue="key"
        onSelect={onSelect}
        onRemove={onRemove}
      />
    </div>
  );
};
