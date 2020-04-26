import React from 'react';
import "../index.css";
import "../App.css"
import firebase, {auth, provider} from "../firebase";
import {coinCount, diamondCount, tab, imgUrl, shopLink, cupCount, brawlerInd, brawlers} from "../count";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import Link from '@material-ui/core/Link';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import ReloadIcon from '@material-ui/icons/Replay';
import Tooltip from '@material-ui/core/Tooltip';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          currentuser: '',
          username: '',
          items: [],
          user: null,
          left: false,
          right: false,
          users: {},
          selectedValue: "",
          open: false,
          open1: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClickOpen = () => {
            this.setState({open: true});
        };
        this.handleClose = () => {
            this.setState({open: false});
        };
        this.handleClickOpen1 = () => {
            this.setState({open1: true});
        };
        this.handleClose1 = () => {
            this.setState({open1: false});
        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.reload = this.reload.bind(this);
        this.classes = useStyles.bind(this);
        this.toggleDrawer = (anchor, open) => (event) => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }
            this.setState({...this.state, [anchor]: open});
        };
        this.copyIdToClipboard = this.copyIdToClipboard.bind(this);
        this.thisUserIsExist = false;
        this.userId1 = null;
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    login() {
        auth.signInWithPopup(provider)
          .then((result) => {
            const user = result.user;
            this.setState({ user });
          });
    }
    logout() {
        auth.signOut()
            .then(
                () => {
                    this.setState({ user: null });
                    this.reload();
                }
            )
    }
    handleSubmit(e) {
        //this.e = e;
        let thisUserIsExist = false;
        for (var inde = 0;inde<this.state.users.length; inde++){
            if (this.state.users[inde].user === this.state.user.displayName || this.state.user.email){
                thisUserIsExist = true
            }
        }
        if (thisUserIsExist === false) {
            e.preventDefault();
            const usersRef = firebase.database().ref('users');
            const user = {
                coins: 2453653532,
                gems: 25874236574322214,
                poharky: 2536,
                user: this.state.user.displayName || this.state.user.email,
                userEmail: this.state.user.email || this.state.user.displayName
            };
            usersRef.push(user);
            this.setState({
                currentuser: '',
                username: ''
            });
        }
    }
    componentDidMount() {
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({ user })
          }
        });
        const usersRef = firebase.database().ref('users');
        usersRef.on('value', (snapshot) => {
          let users = snapshot.val();
          let newState = [];
          for (let user in users) {
            newState.push({
                id: user,
                coins: users[user].coins,
                gems: users[user].gems,
                poharky: users[user].poharky,
                user: users[user].user || users[user].email,
                userEmail: users[user].email
            })
          }
          this.setState({ users: newState })
        });
    }
    removeUser(userId) {
        const userRef = firebase.database().ref(`/users/${userId}`);
        userRef.remove();
    }
    reload() {window.location.reload();}
    copyIdToClipboard(id) {
        if (this.state.user) {
            function listener(e) {
                e.clipboardData.setData("text/html", id);
                e.clipboardData.setData("text/plain", id);
                e.preventDefault();
            }

            document.addEventListener("copy", listener);
            document.execCommand("copy");
            document.removeEventListener("copy", listener);
            //alert("Copied the text: " + id);
        }
    };
    deleteUser(){
        if (document.getElementById("deleteUserInput").value === "DELETE"){
            console.log("Deleting user...");
            this.handleClose1.bind(this)
        }
        else {
            document.getElementById("deleteUserInput").value = ""
        }
    }
    render() {
        let settings;
        if (document.location.pathname === "/settings") {settings = true}
        if (this.state.user) {
            this.thisUserIsExist = false;
            for (var inde = 0; inde < this.state.users.length; inde++) {
                if (this.state.users[inde].user || this.state.users[inde].userEmail === this.state.user.displayName || this.state.user.email) {
                    this.thisUserIsExist = true;
                    this.userId1 = this.state.users[inde].id
                }
            }
        }
        return (
            <div>
                <Dialog open={this.state.open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"User Data"}</DialogTitle>
                    <DialogContent>
                      {/*<DialogContentText id="alert-dialog-description">*/}
                        {this.thisUserIsExist ?
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
                        }
                      {/*</DialogContentText>*/}
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose} color="primary">
                        OK
                      </Button>
                    </DialogActions>
                  </Dialog>
                <Dialog open={this.state.open1} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">{"Delete user"}</DialogTitle>
                    <DialogContent>
                        Please write to next input text : <b>DELETE</b><br /><br />
                        <TextField id="deleteUserInput" label="Write: DELETE" variant="outlined" />
                        <Button onClick={this.deleteUser} color="primary">
                            Delete user
                        </Button>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose1} color="primary">
                        Cancel
                      </Button>
                    </DialogActions>
                  </Dialog>
                <div className="bg-blue">
                    <AppBar position="fixed" className="right">
                        <Toolbar>
                            <Tooltip title="Reload">
                                <Button color="secondary" onClick={this.reload}><ReloadIcon color="secondary"/></Button>
                            </Tooltip>
                            <Link className="no-underline" href={"/trophyRoads?brawler=" + brawlers.name[brawlerInd]}><span className="text-black"><Avatar src={imgUrl + "Cup.jpg"}/>{cupCount}{tab}</span></Link>
                            <Link className="no-underline" href={shopLink}><span className="text-black"><Avatar src={imgUrl + "Coin.png"}/>{coinCount}{tab}</span></Link>
                            <Link className="no-underline" href={shopLink}><span className="text-black"><Avatar src={imgUrl + "Diamond.png"}/>{diamondCount}{tab}</span></Link>
                        </Toolbar>
                    </AppBar>
                </div>

                <br /><br /><br />

                <Button color="secondary" onClick={this.handleClickOpen}>
                    User data
                </Button>

                <Button color="secondary" onClick={this.handleClickOpen1}>
                    Delete user
                </Button>
            </div>
        );
    }
}

export default Settings