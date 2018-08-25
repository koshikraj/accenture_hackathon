import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/style.css';
import Main from './Main';

let API = 'http://localhost:8888/';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {repositories: []};
    }

    componentDidMount() {
        fetch(API + 'repositories')
            .then(response => response.json())
            .then(response => {this.setState({ repositories: response.data })});
    }

  selectRepo (repo_id) {
      this.props.page(repo_id);
  }

  listRepos(){
        let repoList = [];
      for(let repoI=0; repoI<this.state.repositories.length; repoI++) {
          let repo = <li className="pinned-repo-item p-3 mb-3 border border-gray-dark rounded-1 public source">
                                            <span className="pinned-repo-item-content">
                                            <span className="d-block" onClick={() => {
                                                this.selectRepo(this.state.repositories[repoI]);
                                            }}>
                                            <a href="#" className="text-bold">
                                            <span className="repo js-repo"
                                                  title="pynaivechain">{this.state.repositories[repoI].name}</span>
                                            </a>
                                            </span>
                                            <p className="pinned-repo-desc text-gray text-small d-block mt-2 mb-3">{this.state.repositories[repoI].description}</p>
                                            <p className="mb-0 f6 text-gray">
                                            <span className="repo-language-color pinned-repo-meta"
                                                  style={{backgroundColor: '#3572A5'}}/>
                                            Python
                                            <a href="/koshikraj/pynaivechain/stargazers"
                                               className="pinned-repo-meta muted-link">
                                            <svg aria-label="stars" className="octicon octicon-star" viewBox="0 0 14 16"
                                                 version="1.1" width={14} height={16} role="img"><path
                                                fillRule="evenodd"
                                                d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"/></svg>
                                                {this.state.repositories[repoI].star_count}
                                            </a>
                                            <a href="/koshikraj/pynaivechain/network"
                                               className="pinned-repo-meta muted-link">
                                            <svg aria-label="forks" className="octicon octicon-repo-forked"
                                                 viewBox="0 0 10 16" version="1.1" width={10} height={16} role="img"><path
                                                fillRule="evenodd"
                                                d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"/></svg>
                                                {this.state.repositories[repoI].forks_count}
                                            </a>
                                            </p>
                                            </span>
          </li>
          repoList.push(repo);
      }
      return repoList;

  }
  render() {
    return (
        <div>
            <header className="header">
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <div className="nav-user">
                            <i className="fa fa-user-circle 2x" aria-hidden="true"></i> <a className="nav-link disabled" href="#">Consensus</a>
                        </div>
                    </div>
                </nav>
            </header>
            <section className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <img alt width={230} height={230} className="avatar width-full rounded-2" src="https://avatars2.githubusercontent.com/u/4023530?s=460&v=4" />
                            <div className="vcard-names-container py-3 js-sticky js-user-profile-sticky-fields" style={{position: 'static', top: 0, left: 230, width: 229}}>
                                <h1 className="vcard-names">
                                    <span className="p-name vcard-fullname d-block overflow-hidden" itemProp="name">Koshik Raj</span>
                                    <span className="p-nickname vcard-username d-block" itemProp="additionalName">koshikraj</span>
                                </h1>
                            </div>
                        </div>
                        <div className="col-lg-9">
                            <div className="UnderlineNav user-profile-nav top-0 is-placeholder" style={{visibility: 'hidden', display: 'none', height: 55}} />
                            <div className="UnderlineNav user-profile-nav js-sticky top-0" style={{position: 'static', top: 0, left: 483, width: 727}}>
                                <nav className="UnderlineNav-body" data-pjax role="navigation">
                                    <a href="/koshikraj" className="UnderlineNav-item selected" aria-selected="true" role="tab" title="Overview">
                                        Overview
                                    </a>
                                </nav>
                            </div>
                            <div className="mt-4">
                                <div className="js-pinned-repos-reorder-container">
                                    <h2 className="f4 mb-2 text-normal">
                                        Popular repositories
                                    </h2>
                                    <ol className="pinned-repos-list mb-4">

                                        {this.listRepos()}

                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>

    );
  }
}

export default Home;
