import React from 'react';
import { BsFillTrashFill, BsFillPencilFill } from 'react-icons/bs';
import moment from 'moment';

const StaticRow = ({ row, idx, testGroup, keys, handleEdit }) => {


  return (
    <tr key={idx}>
      <td>{row.slug}</td>
      <td>{row.tester}</td>
      <td>{testGroup}</td>
        {keys.map((key, idx) => (
          <td key={idx}>
            {row.values[key]?.value} {row.values[key]?.units}
          </td>
        ))}
        <td>{row.run}</td>
        <td>{row.remarks}</td>
        <td>{row.created_at}</td>
        <td>{row.last_updated}</td>

      <td>
        <span>
          <BsFillPencilFill className="edit-btn" onClick={() => handleEdit(idx)} />
          <BsFillTrashFill />
        </span>
      </td>
    </tr>
  );
};

export default StaticRow;