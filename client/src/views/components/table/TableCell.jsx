// const TABLE_CELL_EMUM =(content)=> ({
//         boolean: <BooleanCell content={content}/>,
//         string: <td {...otherProps}>{content}</td>,
//         object: <td {...otherProps}>Object</td>
// })

import UserAssignForm from "../inputs/UserAssignForm";

export const BooleanCell = ({ content, positive = "Yes", negative = "No" }) =>
  content ? positive : negative;

export const TableCell = ({ content, type = "default", ...otherProps }) => {
  if (type === "default") {
    if (typeof content === "boolean") {
      return (
        <td {...otherProps}>
          <BooleanCell content={content} />
        </td>
      );
    } else if (typeof content === "object") {
      return <td {...otherProps}>Object</td>;
    }
  } else if (type === "user") {
    return (
      <td {...otherProps}>
        <UserAssignForm deviceData={content} />
      </td>
    );
  }
  return <td {...otherProps}>{content}</td>;
};
