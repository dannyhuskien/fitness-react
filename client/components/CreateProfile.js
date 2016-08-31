/* eslint-disable max-len, arrow-body-style, no-underscore-dangle, react/no-string-refs, react/self-closing-comp, no-undef */

import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';

export default class CreateProfile extends React.Component {
  constructor(props) {
    super(props);
    const authorization = `${localStorage.getItem('token')}`;
    this.create = this.create.bind(this);
    this.state = { authorization };
  }

  componentWillMount() {
    axios.get('/api/users/profile', { principal: this.state.authorization })
    .then((rsp) => {
      this.setState({ pokemon: rsp.data.pokemon });
    });
  }

  create(e) {
    e.preventDefault();
    const gender = this.refs.gender.value;
    const age = this.refs.age.value;
    const weight = this.refs.weight.value;
    const height = this.refs.height.value;
    const photo = this.refs.photo.value;
    console.log(this.state.authorization);
    axios.post('http://localhost:9001/api/users/profile', { gender, age, weight, height, photo }, { headers: { authorization: this.state.authorization } })
    .then(() => {
      browserHistory.push('/');
    })
    .catch(() => {
      // notify user registration failed
    });
  }

  render() {
    return (
      <div>

        <h1>Profile</h1>

        <div className="row">
          <div className="col-xs-3">
            <form>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <input ref="gender" type="text" className="form-control" id="gender" />
              </div>

              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input ref="age" type="age" className="form-control" id="age" />
              </div>

              <div className="form-group">
                <label htmlFor="height">Height</label>
                <input ref="height" type="height" className="form-control" id="height" />
              </div>
              <div className="form-group">
                <label htmlFor="weight">Weight</label>
                <input ref="weight" type="weight" className="form-control" id="weight" />
              </div>
              <div className="form-group">
                <label htmlFor="photo">Photo</label>
                <input ref="photo" type="photo" className="form-control" id="photo" />
              </div>
              <button onClick={this.create} type="submit" className="btn btn-default">Create Profile</button>
            </form>
          </div>
          <div className="col-xs-9">
          </div>
        </div>

        <div className="row">
          <div className="col-xs-3">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Pokemon</th>
                  <th>Image</th>
                </tr>
              </thead>
              <tbody>

                {this.state.pokemon.map(p => (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td><img className="thumbnail pokemon" alt="pokemon" src={p.url} /></td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
          <div className="col-xs-9"></div>
        </div>

      </div>
    );
  }
}
