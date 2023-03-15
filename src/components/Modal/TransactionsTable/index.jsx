import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

export default function TransactionsTable({ transactionList }) {
  const dateFormat = (dateString) => {
    let splittedDateString = dateString.split("-");
    splittedDateString[2] = splittedDateString[2].substring(
      0,
      splittedDateString[2].indexOf("T")
    );
    return splittedDateString.reverse().join("/");
  };

  return (
    <TableContainer>
      <Table>
        <TableBody>
          {transactionList.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell sx={{ border: 0 }} align="left">
                {dateFormat(transaction.date)}
              </TableCell>
              <TableCell sx={{ border: 0 }} align="left">
                {"R$" + transaction.value}
              </TableCell>
              <TableCell sx={{ border: 0 }} align="left">
                {transaction.caqtegory}
              </TableCell>
              <TableCell sx={{ border: 0 }} align="left">
                {transaction.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
