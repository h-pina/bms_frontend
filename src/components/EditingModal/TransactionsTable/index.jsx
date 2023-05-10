import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Input from "@mui/material/Input";

export default function TransactionsTable({ transactionList, updateCallback }) {
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
                <Input
                  defaultValue={dateFormat(transaction.date)}
                  onChange={(event) =>
                    updateCallback(transaction.id, "date", event.target.value)
                  }
                />
              </TableCell>
              <TableCell sx={{ border: 0 }} align="left">
                <Input
                  defaultValue={"R$" + transaction.value}
                  onChange={(event) =>
                    updateCallback(transaction.id, "value", event.target.value)
                  }
                />
              </TableCell>
              <TableCell sx={{ border: 0 }} align="left">
                <Input
                  defaultValue={transaction.caqtegory}
                  onChange={(event) =>
                    updateCallback(
                      transaction.id,
                      "caqtegory",
                      event.target.value
                    )
                  }
                />
              </TableCell>
              <TableCell sx={{ border: 0 }} align="left">
                <Input
                  defaultValue={transaction.description}
                  onChange={(event) =>
                    updateCallback(
                      transaction.id,
                      "description",
                      event.target.value
                    )
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
