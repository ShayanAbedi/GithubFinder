import React, { Component } from 'react';

class UserItem extends Component {
  render() {
    //destructuring - instead of keep repeating this.state
    const { login, avatar_url, html_url } = this.props.user;
    return (
      <div className="card text-center">
        <img
          src={avatar_url}
          className="round-img"
          style={{ width: '60px' }}
        ></img>
        <h3>{login}</h3>
        <div>
          <a href={html_url} className="btn btn-dark btn-sm my-1">
            More
          </a>
        </div>
      </div>
    );
  }
}

export default UserItem;