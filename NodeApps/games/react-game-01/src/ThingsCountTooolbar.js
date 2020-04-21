import React from 'react';
import "./index.css";
import "./App.css"
import clsx from 'clsx';
import firebase, {auth, provider} from "./firebase";
import {coinCount, diamondCount, tab, imgUrl, shopLink, cupCount, brawlerInd, brawlers} from "./count";
import SettingsIcon from '@material-ui/icons/Settings';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Avatar from "@material-ui/core/Avatar";
import MenuIcon from '@material-ui/icons/Menu';
import Link from '@material-ui/core/Link';
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ReloadIcon from '@material-ui/icons/Replay';
import Tooltip from '@material-ui/core/Tooltip';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}));
class ThingsCountTollbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          currentuser: '',
          username: '',
          items: [],
          user: null,
          left: false,
          right: false,
          users: {}//,
          //savedUsers: this.state.users
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        this.list = (anchor) => (<div className={clsx(this.classes.list, {[this.classes.fullList]: anchor === 'top' || anchor === 'bottom',})} role="presentation" onClick={this.toggleDrawer(anchor, false)} onKeyDown={this.toggleDrawer(anchor, false)}>
                <List>
                    <span className="center">
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
                                                <Button color="secondary"
                                                        onClick={this.copyIdToClipboard.bind(this, this.state.user.uid)}>
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
                    </span>
                </List>
            </div>);
        //this.e = "";
        this.thisUserIsExist = false;
        this.userId1 = null;
        //this.savedUsers = this.state.users;
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
    render() {
        let home;
        if (document.location.pathname === "/") {home = true}
        if (this.state.user) {
            this.thisUserIsExist = false;
            for (var inde = 0; inde < this.state.users.length; inde++) {
                if (this.state.users[inde].user || this.state.users[inde].userEmail === this.state.user.displayName || this.state.user.email) {
                    this.thisUserIsExist = true;
                    this.userId1 = this.state.users[inde].id
                }
            }
        }
        /*if (this.state.users !== this.state.savedUsers){
            this.logout();
            this.reload();
        }*/
        return (
            <div>
                <div className="bg-blue">
                    <AppBar position="static" className="right">
                        <Toolbar>
                            <Tooltip title="Delete"><Button color="primary" onClick={this.reload}><ReloadIcon color="secondary"/></Button></Tooltip>
                            {home ?
                                <span className="left">
                                    {['left'].map((anchor) => (
                                        <React.Fragment key={anchor}>
                                            <Button onClick={this.toggleDrawer(anchor, true)}><MenuIcon/></Button>
                                            <Drawer anchor={anchor} open={this.state[anchor]} onClose={this.toggleDrawer(anchor, false)}>
                                                {this.list(anchor)}
                                            </Drawer>
                                        </React.Fragment>
                                    ))}
                                </span>
                                :
                                <span> </span>
                            }
                            <Link className="no-underline" href={"/trophyRoads?brawler=" + brawlers.name[brawlerInd]}><span className="text-black"><Avatar src={imgUrl + "Cup.jpg"}/>{cupCount}{tab}</span></Link>
                            <Link className="no-underline" href={shopLink}><span className="text-black"><Avatar src={imgUrl + "Coin.png"}/>{coinCount}{tab}</span></Link>
                            <Link className="no-underline" href={shopLink}><span className="text-black"><Avatar src={imgUrl + "Diamond.png"}/>{diamondCount}{tab}</span></Link>
                            {home ?
                                <span className="right">
                                  {['right'].map((anchor) => (
                                      <React.Fragment key={anchor}>
                                          <Button onClick={this.toggleDrawer(anchor, true)}><SettingsIcon/></Button>
                                          <Drawer anchor={anchor} open={this.state[anchor]} onClose={this.toggleDrawer(anchor, false)}>
                                              {this.list(anchor)}
                                          </Drawer>
                                      </React.Fragment>
                                  ))}
                                </span>
                                :
                                <span> </span>
                            }
                        </Toolbar>
                    </AppBar>
                </div>
            </div>
        );
    }
}

export default ThingsCountTollbar