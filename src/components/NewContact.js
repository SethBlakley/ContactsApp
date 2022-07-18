import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import ContactModal from "./ContactModal";
import { connect } from "react-redux";
import { closeModal, openModal } from "../utils/actions/ModalActions";

const styles = (theme) => ({
  root: {
    width: "auto",
    marginLeft: theme.spacing.unit * 5,
    marginRight: theme.spacing.unit * 5,
    marginTop: theme.spacing.unit * 4,
    overflowX: "auto",
  },
});

class NewContact extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar
          position="static"
          onClick={() => {
            this.props.openModal();
          }}
        >
          <Typography component="div" style={{ padding: 8 * 3 }}>
            New Contact
          </Typography>
          <ContactModal />
        </AppBar>
      </div>
    );
  }
}

NewContact.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { modal } = state;
  return { modal: modal };
}
const mapDispatchToProps = { closeModal, openModal };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(NewContact));
