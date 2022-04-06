import React, { useState, useEffect } from "react";

const Cell = ({ value, editable, onChange }) => {
  const [inputValue, setInputValue] = useState(value);
  const onValueChange = (e) => {
    setInputValue(e.target.value);
    onChange && onChange(e.target.value);
  };

  return (
    <td>
      {editable ? (
        <input value={inputValue} onChange={onValueChange} />
      ) : (
        inputValue
      )}
    </td>
  );
};

const CellButton = ({ value, onClick, id }) => {
  return (
    <td>
      <input type="button" value={value} onClick={() => onClick(id)} />
    </td>
  );
};

const TableRow = ({ data, onEdit }) => {
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const onSubmitRow = (id) => {
    onEdit(tableData[id]);
  };

  const onEditRow = (id) => {
    tableData[id]["editable"] = true;
    setTableData([...tableData]);
  };

  const onInputChange = (value, id, key) => {
    tableData[id][key] = value;
    setTableData([...tableData]);
  };

  return tableData.map((row, index) => {
    return (
      <tr key={`table_${index}`}>
        <Cell
          value={row.firstname}
          editable={row.editable}
          onChange={(e) => onInputChange(e, index, "firstname")}
        />
        <Cell
          value={row.lastname}
          editable={row.editable}
          onChange={(e) => onInputChange(e, index, "lastname")}
        />

        {/** we will make email as non-editable because this value we are using for authorization */}
        <Cell value={row.email} editable={false} />

        {/* when user clicks on edit button firstname and lastname will change to input boxes and user can edit the values */}
        <CellButton value="edit" id={index} onClick={() => onEditRow(index)} />

        {/* when user clicks on sbimit button the edited values will be submitted and input boxes will turn into non-editable */}
        <CellButton
          value="submit"
          id={index}
          onClick={() => onSubmitRow(index)}
        />
      </tr>
    );
  });
};

export default TableRow;
