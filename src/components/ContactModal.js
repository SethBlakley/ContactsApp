import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { connect } from "react-redux";
import { closeModal, openModal } from "../utils/actions/ModalActions";
import { reRender } from "../utils/actions/RenderAction";
import axios from "axios";

const URL = "https://tester.crs-consulting.com/api";

function getModalStyle() {
  return {
    top: "25%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
}

const styles = (theme) => ({
  paper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

class ContactModal extends React.Component {
  state = {
    name: "",
    email: "",
    phone: "",
  };

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSubmit = () => {
    axios
      .post(`${URL}/entry`, {
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone,
      })
      .then(() => {
        this.props.closeModal();
        this.props.reRender();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.modal}
          onClose={() => {
            this.props.closeModal();
          }}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="title" id="modal-title">
              New Contact
            </Typography>
            <List component="nav">
              <ListItem button>
                <TextField
                  id="name"
                  label="Name"
                  className={classes.textField}
                  margin="normal"
                  onChange={this.handleChange("name")}
                />
              </ListItem>
              <ListItem button>
                <TextField
                  id="email"
                  label="Email"
                  className={classes.textField}
                  margin="normal"
                  onChange={this.handleChange("email")}
                />
              </ListItem>
              <ListItem button>
                <TextField
                  id="phone"
                  label="Phone #"
                  className={classes.textField}
                  margin="normal"
                  onChange={this.handleChange("phone")}
                />
              </ListItem>
            </List>
            <Button
              onClick={() => {
                this.handleSubmit();
              }}
            >
              Submit
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

ContactModal.propTypes = {
  classes: PropTypes.object.isRequired,
};
function mapStateToProps(state) {
  const { modal, render } = state;
  return { modal: modal, render: render };
}
const mapDispatchToProps = { closeModal, openModal, reRender };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ContactModal));
