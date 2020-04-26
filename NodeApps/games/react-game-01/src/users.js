import React, { Component } from 'react';
import './App.css';
//import './loginAndLogout.css'
import firebase, { auth, provider } from './firebase.js';

class Users extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({ user })
      });
  }

  logout() {
    auth.signOut().then(() => { this.setState({ user: null }) })
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user })
      }
    });
    const itemsRef = firebase.database().ref('users');
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          title: items[item].title,
          user: items[item].user
        })
      }
      this.setState({ items: newState })
    });
  }

  removeItem(itemId) {
    const itemRef = firebase.database().ref(`/users/${itemId}`);
    itemRef.remove();
  }

  render() {
    return (
      <div className='app'>
        <header>
            <div className="wrapper">
              <h1>Přátelé jídla</h1>
              {this.state.user ?
                <button onClick={this.logout}>Odhlásit se</button>
              :
                <button onClick={this.login}>Přihlásit se</button>
              }
            </div>
        </header>
        {this.state.user ?
          <div>
            <div className='user-profile'>
                <img alt={this.state.user.photoURL} src={this.state.user.photoURL} />
            </div>
            <div className='container'>
              <section className='display-item'>
                  <div className="wrapper">
                    <ul>
                      {this.state.items.map((item) => {
                        return (
                          <li key={item.id}>
                            <h3>{item.title}</h3>
                            <p>Uživatel: {item.user}
                              <button onClick={() => this.removeItem(item.id)}>Smazat uživatele</button>
                              {/*item.user === this.state.user.displayName || item.user === this.state.user.email ?
                                <button onClick={() => this.removeItem(item.id)}>Odebrat uživatele</button>
                              : null*/}
                            </p>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
              </section>
            </div>
          </div>
        :
          <p>Musíte se přihlásit aby jste měl/a přístup k datům a mohl/a do něj přidávat a odebírat.</p>
        }
      </div>
    );
  }
}

export default Users
