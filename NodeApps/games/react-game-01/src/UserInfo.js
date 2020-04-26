import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
      <List>
        <span className="center">
            {/*this.thisUserIsExist ?
                <span>
                    {this.state.user ?
                        <span>
                            Jste přihlášen/a jako: <br/>
                            {this.state.user.displayName || this.state.user.email}<br/>
                            <img className='user-profile1 user-profile-img1' alt={this.state.user.photoURL} src={this.state.user.photoURL}/><br/>
                            <Button color="secondary" onClick={this.logout}>Odhlásit se</Button><br/><hr/>
                            {this.state.user.uid ?
                                <span>
                                    Your uid:<br/>
                                    {this.state.user.uid}<br/>
                                    <Button color="secondary" onClick={this.copyIdToClipboard.bind(this, this.state.user.uid)}>
                                        Copy uid to clipboard
                                    </Button><br/><hr />

                                    Your id:<br/>
                                    {this.userId1}<br/>
                                    <Button color="secondary" onClick={this.copyIdToClipboard.bind(this, this.userId1)}>
                                        Copy id to clipboard
                                    </Button><br/>
                                </span>
                                :
                                null
                            }
                        </span>
                        :
                        <Button color="secondary" onClick={this.login}>Přihlásit se</Button>
                    }
                </span>
                :
                <span>
                    {this.state.user ?
                        <span onClick={this.handleSubmit}>
                            <Button color="secondary" onClick={this.reload}>Vytvořit účet</Button>
                        </span>
                        :
                        <Button color="secondary" onClick={this.login}>Přihlásit se</Button>
                    }
                </span>
            */}
            kkkk
        </span>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    //setOpen(false);
    //setSelectedValue(value);
  };

  return (
    <div>
      <SimpleDialog selectedValue={null/*selectedValue*/} open={true/*open*/} onClose={null/*handleClose*/} />
    </div>
  );
}