import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const TableComponent = ({ items }) => {
  if (!Array.isArray(items)) {
    items = [];
  }
  console.log("TableComponent안의 items :", items);

  return (
    <TableContainer sx={{ borderRadius: "20px" }} component={Paper}>
      <Table sx={{ minWidth: 660 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>닉네임</TableCell>
            <TableCell align="right">보낸 위치</TableCell>
            <TableCell align="right">받는 위치</TableCell>
            <TableCell align="right">비고</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items[0]?.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.from}</TableCell>
              <TableCell align="right">{row.to}</TableCell>
              <TableCell align="right">{}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
