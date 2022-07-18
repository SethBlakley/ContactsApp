import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { TextField } from "@material-ui/core";
import { Icon } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { reRender } from "../utils/actions/RenderAction";

const URL = "https://tester.crs-consulting.com/api";

const styles = (theme) => ({
  root: {
    width: "auto",
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    overflowX: "auto",
  },
  table: {
    minWidth: 600,
  },
});

function createData(ID, Name, Email, Phone) {
  return { ID, Name, Email, Phone };
}
function ContactList(props) {
  const { classes } = props;
  const dispatch = useDispatch();
  const [contactRowData, setContactRowData] = useState([]);
  const rerender = useSelector((state) => state.render);
  const [editContact, setEditContact] = useState(514);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    axios
      .get(`${URL}/entries`)
      .then((res) => {
        let TempContractRowData = [];
        res.data.forEach((contact) => {
          TempContractRowData.push(
            createData(contact.id, contact.name, contact.email, contact.phone)
          );
        });
        setContactRowData(TempContractRowData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [rerender]);

  const deleteContact = async (ID) => {
    axios
      .delete(`${URL}/entry?id=${ID}`)
      .then(() => {
        dispatch(reRender());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onEdit = (ID) => {
    if (editContact == ID) {
      setFormValues({
        name: "",
        email: "",
        phone: "",
      });
    } else {
      setEditContact(ID);
    }
  };

  const handleChange = (name) => (e) => {
    setFormValues({
      ...formValues,
      [name]: e.target.value,
    });
  };

  const handleSubmit = (ID) => {
    axios
      .put(`${URL}/entry`, {
        id: ID,
        name: formValues.name,
        email: formValues.email,
        phone: formValues.phone,
      })
      .then(() => {
        dispatch(reRender());
        setEditContact(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>
              <Icon>mail</Icon>
            </TableCell>
            <TableCell>
              <Icon>phone</Icon>
            </TableCell>
            <TableCell>Edit/Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contactRowData.map((row) => {
            return (
              <TableRow key={row.ID}>
                <TableCell>
                  {editContact === row.ID ? (
                    <TextField
                      id="name"
                      label="Name"
                      defaultValue={row.Name}
                      className={classes.textField}
                      margin="normal"
                      onChange={handleChange("name")}
                    />
                  ) : (
                    row.Name
                  )}
                </TableCell>
                <TableCell>
                  {editContact === row.ID ? (
                    <TextField
                      id="email"
                      label="Email"
                      defaultValue={row.Email}
                      className={classes.textField}
                      margin="normal"
                      onChange={handleChange("email")}
                    />
                  ) : (
                    row.Email
                  )}
                </TableCell>
                <TableCell>
                  {editContact === row.ID ? (
                    <TextField
                      id="phone"
                      label="Phone"
                      defaultValue={row.Phone}
                      className={classes.textField}
                      margin="normal"
                      onChange={handleChange("phone")}
                    />
                  ) : (
                    row.Phone
                  )}
                </TableCell>
                <TableCell className="edit-cell">
                  {editContact === row.ID ? (
                    <Icon
                      onClick={() => {
                        handleSubmit(row.ID);
                      }}
                    >
                      check
                    </Icon>
                  ) : (
                    <Icon
                      className="edit-icon"
                      onClick={() => {
                        setFormValues({
                          name: row.Name,
                          email: row.Email,
                          phone: row.Phone,
                        });
                        onEdit(row.ID);
                      }}
                    >
                      edit
                    </Icon>
                  )}
                  <Icon
                    onClick={() => {
                      deleteContact(row.ID);
                    }}
                  >
                    delete
                  </Icon>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

ContactList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ContactList);
