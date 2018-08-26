import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './css/style.css';
import Main from './Main';

let API = 'http://hackathon.koshikraj.com:8888/';

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
                            <img alt width={230} height={230} className="avatar width-full rounded-2" src="data:image/jpeg;base64,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" />
                            <div className="vcard-names-container py-3 js-sticky js-user-profile-sticky-fields" style={{position: 'static', top: 0, left: 230, width: 229}}>
                                <h1 className="vcard-names">
                                    <span className="p-name vcard-fullname d-block overflow-hidden" itemProp="name">Consensus</span>
                                    <span className="p-nickname vcard-username d-block" itemProp="additionalName">Accenture hackathon</span>
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
