import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Layout from "../components/Layout";
import AccountInfo from "../components/AccountInfo";
import {
  Box,
  Card,
  Container,
  CssBaseline,
  TablePagination,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import TableFooter from "@mui/material/TableFooter";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { getOrders } from "../server/api/user";
// Generate Order Data
function createData(id, date, name, clicksId) {
  return { id, date, name, clicksId };
}

const rows = [
  createData(0, "16 Mar, 2019", "Elvis Presley", "632d9fd618048a00139179d8"),
  createData(1, "16 Mar, 2019", "Paul McCartney", "London, UK"),
  createData(2, "16 Mar, 2019", "Tom Scholz", "Boston, MA"),
  createData(3, "16 Mar, 2019", "Michael Jackson", "Gary, IN"),
  createData(4, "15 Mar, 2019", "Bruce Springsteen", "Long Branch, NJ"),
  createData(5, "15 Mar, 2019", "Bruce Springsteen", "Long Branch, NJ"),
  createData(6, "15 Mar, 2019", "Bruce Springsteen", "Long Branch, NJ"),
];

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function CustomPaginationActionsTable() {
  const theme = useTheme();

  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [orders, setOrders] = React.useState({
    items: [],
    meta: {
      totalPage: 1,
    }
  });
  React.useEffect(() => {
    getOrders({
      page: page,
      limit: rowsPerPage,
    }).then((res) => {
      console.log(res)
      setOrders(res)

    });
  }, [page])
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Table>
      <TableHead
        sx={{
          [theme.breakpoints.only("xs")]: {
            display: "none",
          },
        }}
      >
        <TableRow>
          <TableCell style={{ fontWeight: "bold" }}>{"Date/Time"}</TableCell>
          <TableCell style={{ fontWeight: "bold" }}>Store Name</TableCell>
          <TableCell style={{ fontWeight: "bold" }}>Orders Id</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders?.items.map((row) => (
          <TableRow
            key={row.id}
            sx={{
              [theme.breakpoints.only("xs")]: {
                display: "grid",
                gridTemplateColumns: "1fr .55fr",
                gridColumnGap: "10px",
                columnGap: "10px",
                gridRowGap: "10px",
                rowRgap: "10px",
                marginTop: "12px",
                paddingBottom: "12px",
                borderBottom: "1px solid hsla(0,0%,93%,.2)",
              },
            }}
          >
            <TableCell
              style={{ width: 160 }}
              sx={{
                [theme.breakpoints.only("xs")]: {
                  border: "none",
                  padding: 0,
                },
              }}
            >
              {row.createdAt}
            </TableCell>
            <TableCell
              style={{ width: 160 }}
              sx={{
                [theme.breakpoints.only("xs")]: {
                  border: "none",
                  padding: 0,
                },
              }}
            >
              {row.amount}
            </TableCell>
            <TableCell
              style={{ width: 160 }}
              sx={{
                [theme.breakpoints.only("xs")]: {
                  display: "none",
                },
              }}
            >
              {row.numerical}
            </TableCell>
            <TableCell
              style={{ width: 160 }}
              sx={{
                [theme.breakpoints.only("xs")]: {
                  border: "none",
                  padding: 0,
                },
                [theme.breakpoints.not("xs")]: {
                  display: "none",
                },
              }}
            >
              <span>Clicks Id:</span> <span>{row.clicksId}</span>{" "}
            </TableCell>
          </TableRow>
        ))}
        {/* {emptyRows > 0 && (
          <TableRow style={{ height: 53 * emptyRows }}>
            <TableCell colSpan={6} />
          </TableRow>
        )} */}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { label: "All", value: 1 }]}
            colSpan={3}
            count={orders?.meta.totalPage}
            rowsPerPage={rowsPerPage}
            page={page}
            SelectProps={{
              inputProps: {
                "aria-label": "rows per page",
              },
              native: true,
            }}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    </Table>
  );
}

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
        sx={{
          display: { xs: "none", md: "inline-flex" },
        }}
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
        sx={{
          display: { xs: "none", md: "inline-flex" },
        }}
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function Orders() {
  return (
    <Layout>
      <Container
        component="main"
        maxWidth="xl"
        sx={{
          display: { xs: "unset", md: "flex" },
          justifyContent: "space-between",
          marginTop: 4,
        }}
      >
        <AccountInfo></AccountInfo>
        <Card
          sx={{
            flex: 1,
            marginLeft: {
              xs: "0",
              md: "20px",
            },
            padding: "20px",
          }}
        >
          <Typography component="h1" variant="h5">
            Recent Orders
          </Typography>
          <CustomPaginationActionsTable />
        </Card>
      </Container>
    </Layout>
  );
}
