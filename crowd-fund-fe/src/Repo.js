import React, { Component } from 'react';
import Popup from "reactjs-popup";
import logo from './logo.svg';
import './App.css';
import './css/style.css';
import Contract from './Contract';

let API = 'http://hackathon.koshikraj.com:8888/';

class Repo extends Component {

    constructor(props) {
        super(props);
        this.state = {files: [],
                      contributors: [],
                      scene: 'code',
                      ratingOverlay: 'none',
                      amounts:{},
                      commits: [],
                      codeType: 'files',
                      donatePop:false
                  };

        this.contract = new Contract();
        this.contract.initContract();
        this.rating = 0;
        this.votes = 0;
        this.callbackHandler = this.callbackHandler.bind(this);



    }

    callbackHandler(address, amount){
        let amounts = this.state.amounts;
        console.log(amounts);
        amounts[address] = amount;
        this.setState({amounts: amounts});

    }

    componentDidMount() {
        fetch(API + 'files?repo_id=' + this.props.details.id)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.setState({files: response.data.files,
                               commits: response.data.commits})
            });

        fetch(API + 'users?repo_id=' + this.props.details.id)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                this.setState({contributors: response.data});
                for (let i = 0; i < response.data.length; i++) {
                    this.contract.getUserBalance(response.data[i].address, this.callbackHandler);
                }
            });
    }

    listFiles() {
        let fileList = [];
        for (let fileI = 0; fileI < this.state.files.length; fileI++) {
            let file =<tr className="js-navigation-item" aria-selected="false">
                <td className="icon">
                    <svg className={this.state.files[fileI].type==='blob' ? "octicon octicon-file" : "octicon octicon-file-directory" } viewBox="0 0 12 16" version="1.1" width={12} height={16} aria-hidden="true"><path fillRule="evenodd"
                        d={ this.state.files[fileI].type==='blob' ? "M6 5H2V4h4v1zM2 8h7V7H2v1zm0 2h7V9H2v1zm0 2h7v-1H2v1zm10-7.5V14c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V2c0-.55.45-1 1-1h7.5L12 4.5zM11 5L8 2H1v12h10V5z" : "M13 4H7V3c0-.66-.31-1-1-1H1c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zM6 4H1V3h5v1z"} /></svg>
                    {/* <img width="16" height="16" class="spinner" alt="" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif"> */}
                </td>
                <td className="content">
                    <span className="css-truncate css-truncate-target"><a className="js-navigation-open" title=".travis.yml" id="354f30a63fb0907d4ad57269548329e3-6cd68bb76d8bd73a20f6eb221ff9dd219702b9db" href="/koshikraj/pynaivechain/blob/master/.travis.yml">{this.state.files[fileI].name}</a></span>
                </td>
                <td className="message">
                    <span className="css-truncate css-truncate-target">
                      <a data-pjax="true" title="updates travis config" className="message" href="/koshikraj/pynaivechain/commit/ceb6d0d84dcc4e2b48f35dfb88f0abe46513a339">updates travis config</a>
                    </span>
                </td>
                <td className="age">
                    <span className="css-truncate css-truncate-target"><time-ago dateTime="2018-03-08T02:49:10Z" title="8 Mar 2018, 08:19 GMT+5:30">few hours ago</time-ago></span>
                </td>
            </tr>;
            fileList.push(file);
        }
        return fileList;
    }

    listCommits(){

        let contributorsList = [];
        for (let fileI = 0; fileI < this.state.commits.length; fileI++) {

            let contributor = <div className="table--content">
                <div className="table--content__column rank">{this.state.commits[fileI].short_id}</div>
                <div className="table--content__column user">
                    <span className="name"><a href="#">{this.state.commits[fileI].title}</a></span>
                </div>
                <div className="table--content__column commits">3</div>
                <div className="table--content__column rating">
                    <button onClick={()=> {this.setState({ratingOverlay: 'block'});
                        this.rating = this.state.contributors[fileI].rating;
                        this.votes = this.state.contributors[fileI].votes;
                        this.address = this.state.contributors[fileI].address;
                        this.user_id = this.state.contributors[fileI].user_id}} className="rating-button">
                        <i className="fa fa-star-o" aria-hidden="true" /> Rate
                    </button>
                </div>
             </div>;

            contributorsList.push(contributor);
        }
        return contributorsList;


    }

    listContributors(){

        let contributorsList = [];
        for (let fileI = 0; fileI < this.state.contributors.length; fileI++) {

        let contributor = <div className="table--content">
            <div className="table--content__column rank">{this.state.contributors[fileI].user_id}</div>
            <div className="table--content__column user">
                <img className="contr-avatar" src="https://avatars2.githubusercontent.com/u/4023530?s=60&v=4" height={30} width={30} alt />
                <span className="name"><a href="#">{this.state.contributors[fileI].name}</a></span>
            </div>
            <div className="table--content__column commits">{this.state.contributors[fileI].votes}</div>
            <div className="table--content__column rating">
                <button onClick={()=> {this.setState({ratingOverlay: 'block'});
                this.rating = this.state.contributors[fileI].rating;
                this.votes = this.state.contributors[fileI].votes;
                this.address = this.state.contributors[fileI].address;
                this.user_id = this.state.contributors[fileI].user_id}} className="rating-button">
                    <i className="fa fa-star-o" aria-hidden="true" /> Rate
                </button>
            </div>
            <div className="table--content__column avg">{this.state.contributors[fileI].rating / this.state.contributors[fileI].votes}</div>
            <div className="table--content__column earnings">{Number.parseFloat(this.state.amounts[this.state.contributors[fileI].address]).toFixed(2)} ETH</div>
        </div>;

        contributorsList.push(contributor);
        }
        return contributorsList;


    }

    rateContributor(new_rating) {

        let updatedRating = (this.rating + new_rating) / (this.votes + 1);
        this.setState({ratingOverlay: 'none'});
        this.contract.updateRating(this.props.details.id, this.address, Number.parseFloat(updatedRating).toFixed(1) * 10);
        fetch(API + 'ratings',
            { method: 'PUT',
              body: JSON.stringify({"rating": new_rating,
                  "repo_id": this.props.details.id,
                  "user_id": 1
              })})
            .then(response => response.json())
            .then(response => {
                console.log(response);

            })
    };

  render() {

        if (this.state.scene == 'code')
    return (
        <div>
            <header className="header">
                <nav className="navbar navbar-expand-lg">
                    <div className="container">
                        <div className="nav-user">
                            <i className="fa fa-user-circle 2x" aria-hidden="true" /> <a className="nav-link disabled" href="#">Koshik Raj</a>
                        </div>
                    </div>
                </nav>
            </header>
            <section>
                <div className="pagehead repohead instapaper_ignore readability-menu experiment-repo-nav  ">
                    <div className="repohead-details-container clearfix container">
                        <h1 className="public ">
                            <svg className="octicon octicon-repo" viewBox="0 0 12 16" version="1.1" width={12} height={16} aria-hidden="true"><path fillRule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z" /></svg>
                            <span className="author" itemProp="author"><a className="url fn" rel="author" href="/koshikraj">koshikraj</a></span>
                            <span className="path-divider">/</span>
                            <strong itemProp="name"><a data-pjax="#js-repo-pjax-container">{this.props.details.name}</a></strong>
                        </h1>
                    </div>
                    <nav className="reponav js-repo-nav js-sidenav-container-pjax container clearfix" itemScope itemType="http://schema.org/BreadcrumbList" role="navigation" data-pjax="#js-repo-pjax-container">
        <span itemScope itemType="http://schema.org/ListItem" itemProp="itemListElement">
          <a onClick={()=>{this.setState({scene: 'code', codeType: 'files'})}} className="js-selected-navigation-item selected reponav-item" itemProp="url" data-hotkey="g c" data-selected-links="repo_source repo_downloads repo_commits repo_releases repo_tags repo_branches repo_packages /koshikraj/pynaivechain" href="#">
            <svg className="octicon octicon-code" viewBox="0 0 14 16" version="1.1" width={14} height={16} aria-hidden="true"><path fillRule="evenodd" d="M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14 8 9.5 3zm-5 0L0 8l4.5 5L6 11.5 2.5 8 6 4.5 4.5 3z" /></svg>
            <span itemProp="name">Code</span>
            <meta itemProp="position" content={1} />
          </a>
        </span>
            <span itemScope itemType="http://schema.org/ListItem" itemProp="itemListElement">
          <a onClick={()=>{this.setState({scene: 'contributors'})}} itemProp="url" data-hotkey="g i" className="js-selected-navigation-item reponav-item" data-selected-links="repo_issues repo_labels repo_milestones /koshikraj/pynaivechain/issues" href="#">
            <svg className="octicon octicon-issue-opened" viewBox="0 0 14 16" version="1.1" width={14} height={16} aria-hidden="true"><path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z" /></svg>
            <span itemProp="name">Contributers</span>
            <meta itemProp="position" content={2} />
          </a>
        </span>
                    </nav>
                </div>
            </section>
            <section className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="js-repo-meta-container">
                                <div className="repository-meta mb-0  js-repo-meta-edit js-details-container ">
                                    <div className="repository-meta-content col-11 mb-1">
                <span className="col-11 text-gray-dark mr-2" style={{fontSize: 16}} itemProp="about">
                    {this.props.details.description}
                </span>
                                    </div>
                                </div>
                            </div>
                            <div className="overall-summary overall-summary-bottomless">
                                <div className="stats-switcher-viewport js-stats-switcher-viewport">
                                    <div className="stats-switcher-wrapper">
                                        <ul className="numbers-summary">
                                            <li className="commits">
                                                <a data-pjax onClick={()=>{this.setState({codeType: 'commits'});}} href="#">
                                                    <svg className="octicon octicon-history" viewBox="0 0 14 16" version="1.1" width={14} height={16} aria-hidden="true"><path fillRule="evenodd" d="M8 13H6V6h5v2H8v5zM7 1C4.81 1 2.87 2.02 1.59 3.59L0 2v4h4L2.5 4.5C3.55 3.17 5.17 2.3 7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-.34.03-.67.09-1H.08C.03 7.33 0 7.66 0 8c0 3.86 3.14 7 7 7s7-3.14 7-7-3.14-7-7-7z" /></svg>
                                                    <span className="num text-emphasized">
                                                        {this.state.commits.length}
                      </span>
                                                    commits
                                                </a>
                                            </li>
                                            <li>
                                                <a data-pjax href="/koshikraj/pynaivechain/branches">
                                                    <svg className="octicon octicon-git-branch" viewBox="0 0 10 16" version="1.1" width={10} height={16} aria-hidden="true"><path fillRule="evenodd" d="M10 5c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v.3c-.02.52-.23.98-.63 1.38-.4.4-.86.61-1.38.63-.83.02-1.48.16-2 .45V4.72a1.993 1.993 0 0 0-1-3.72C.88 1 0 1.89 0 3a2 2 0 0 0 1 1.72v6.56c-.59.35-1 .99-1 1.72 0 1.11.89 2 2 2 1.11 0 2-.89 2-2 0-.53-.2-1-.53-1.36.09-.06.48-.41.59-.47.25-.11.56-.17.94-.17 1.05-.05 1.95-.45 2.75-1.25S8.95 7.77 9 6.73h-.02C9.59 6.37 10 5.73 10 5zM2 1.8c.66 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2C1.35 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2zm0 12.41c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm6-8c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z" /></svg>
                                                    <span className="num text-emphasized">
                        2
                      </span>
                                                    branches
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/*<div onClick={() => {this.contract.crowdFund(this.props.details.id, 10);}} className="clearfix" style={{display: 'block', width: '100%', marginBottom: 13}}>
                                                            <a href="#" className="btn btn-sm new-pull-request-btn donate-btn">
                                                                Donate <span className="caret" />
                                                            </a>
                                                        </div>*/}
                            <Popup
                             trigger={<div onClick={() => {this.setState({donatePop:true})}} className="clearfix" style={{display: 'block', width: '100%', marginBottom: 13}}>
                                <a href="#" className="btn btn-sm new-pull-request-btn donate-btn">
                                    Donate <span className="caret" />
                                </a>
                            </div>}
                            modal>{close => (
                                <div style={{paddingLeft:80, marginTop:20, marginBottom:20}}>
                                    <div>
                                    <div>
                                    <b style={{fontSize:20}}>Contribute to Repository</b>
                                    <br/>
                                    Donations will be given to contruibutors
                                    </div>
                                      <input style={{marginTop:10}} type="text" onChange={(eth)=>{this.setState({ether:eth.target.value})}} value={this.state.ether} placeholder="Enter amount" />
                                      ETH
                                    </div>
                                    <div style={{marginTop:20}}>
                                      <button
                                        style={{color: '#fff',backgroundColor: '#85a6c1'}}
                                        onClick={() => {
                                          close();
                                        }}
                                      >
                                        cancel
                                      </button>
                                      <button
                                        style={{marginLeft:20,color: '#fff',backgroundColor: '#85a6c1'}}
                                        onClick={() => {
                                            this.contract.crowdFund(this.props.details.id, this.state.ether);
                                            close();
                                        }}
                                      >
                                        Contribute
                                      </button>
                                      </div>
                                </div>
                                )}
                            </Popup>
                            <div style={{width: '100%'}} className="commit-tease js-details-container Details d-flex">
                                <div className="AvatarStack flex-self-start ">
                                    <div className="AvatarStack-body" aria-label="koshikraj">
                                        <a className="avatar" data-skip-pjax="true" data-hovercard-user-id={4023530} data-octo-click="hovercard-link-click" data-octo-dimensions="link_type:self" href="/koshikraj" aria-describedby="hovercard-aria-description">
                                            <img height={20} width={20} alt="@koshikraj" src="https://avatars2.githubusercontent.com/u/4023530?s=60&v=4" />
                                        </a>
                                    </div>
                                </div>
                                <div className="flex-auto f6 no-wrap mr-3">
                                    <a href="/koshikraj/pynaivechain/commits?author=koshikraj" className="commit-author tooltipped tooltipped-s user-mention" aria-label="View all commits by koshikraj">koshikraj</a>
                                    <a data-pjax="true" title="changes port and exception class" className="message" href="/koshikraj/pynaivechain/commit/99caabcff9833dbc521a5c6bf6884a337713c9c9">changes port and exception class</a>
                                </div>
                                <div className="no-wrap">
                                    Latest commit
                                    <a className="commit-tease-sha" href="/koshikraj/pynaivechain/commit/99caabcff9833dbc521a5c6bf6884a337713c9c9" data-pjax>
                                        99caabc
                                    </a>
                                    <span itemProp="dateModified"><relative-time dateTime="2018-03-24T06:29:33Z" title="24 Mar 2018, 11:59 GMT+5:30">on 24 Mar</relative-time></span>
                                </div>
                            </div>
                            <div className="file-wrap">
                                <a className="d-none js-permalink-shortcut" data-hotkey="y" href="/koshikraj/pynaivechain/tree/99caabcff9833dbc521a5c6bf6884a337713c9c9">Permalink</a>


                                <table className="files js-navigation-container js-active-navigation-container" data-pjax>
                                    <tbody>
                                    <tr className="warning include-fragment-error">
                                        <td className="icon"><svg className="octicon octicon-alert" viewBox="0 0 16 16" version="1.1" width={16} height={16} aria-hidden="true"><path fillRule="evenodd" d="M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z" /></svg></td>
                                        <td className="content" colSpan={3}>Failed to load latest commit information.</td>
                                    </tr>

                                    {this.state.codeType == 'files'? this.listFiles(): this.listCommits()}


                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>

    );
        else
        return (<div>
                <header className="header">
                    <nav className="navbar navbar-expand-lg">
                        <div className="container">
                            <div className="nav-user">
                                <i className="fa fa-user-circle 2x" aria-hidden="true" /> <a className="nav-link disabled" href="#">Koshik Raj</a>
                            </div>
                        </div>
                    </nav>
                </header>
                <section>
                    <div className="pagehead repohead instapaper_ignore readability-menu experiment-repo-nav  ">
                        <div className="repohead-details-container clearfix container">
                            <h1 className="public ">
                                <svg className="octicon octicon-repo" viewBox="0 0 12 16" version="1.1" width={12} height={16} aria-hidden="true"><path fillRule="evenodd" d="M4 9H3V8h1v1zm0-3H3v1h1V6zm0-2H3v1h1V4zm0-2H3v1h1V2zm8-1v12c0 .55-.45 1-1 1H6v2l-1.5-1.5L3 16v-2H1c-.55 0-1-.45-1-1V1c0-.55.45-1 1-1h10c.55 0 1 .45 1 1zm-1 10H1v2h2v-1h3v1h5v-2zm0-10H2v9h9V1z" /></svg>
                                <span className="author" itemProp="author"><a className="url fn" rel="author" href="/koshikraj">koshikraj</a></span>
                                <span className="path-divider">/</span>
                                <strong itemProp="name"><a data-pjax="#js-repo-pjax-container" href="/koshikraj/pynaivechain">pynaivechain</a></strong>
                            </h1>
                        </div>
                        <nav className="reponav js-repo-nav js-sidenav-container-pjax container clearfix" itemScope itemType="http://schema.org/BreadcrumbList" role="navigation" data-pjax="#js-repo-pjax-container">
        <span itemScope itemType="http://schema.org/ListItem" itemProp="itemListElement">
          <a onClick={()=>{this.setState({scene: 'code'})}} className="js-selected-navigation-item reponav-item" itemProp="url" data-hotkey="g c" data-selected-links="repo_source repo_downloads repo_commits repo_releases repo_tags repo_branches repo_packages /koshikraj/pynaivechain" href="#">
            <svg className="octicon octicon-code" viewBox="0 0 14 16" version="1.1" width={14} height={16} aria-hidden="true"><path fillRule="evenodd" d="M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14 8 9.5 3zm-5 0L0 8l4.5 5L6 11.5 2.5 8 6 4.5 4.5 3z" /></svg>
            <span itemProp="name">Code</span>
            <meta itemProp="position" content={1} />
          </a>
        </span>
                            <span itemScope itemType="http://schema.org/ListItem" itemProp="itemListElement">
          <a itemProp="url" data-hotkey="g i" className="js-selected-navigation-item selected reponav-item" data-selected-links="repo_issues repo_labels repo_milestones /koshikraj/pynaivechain/issues" href="#">
            <svg className="octicon octicon-issue-opened" viewBox="0 0 14 16" version="1.1" width={14} height={16} aria-hidden="true"><path fillRule="evenodd" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z" /></svg>
            <span itemProp="name">Contributers</span>
            <meta itemProp="position" content={2} />
          </a>
        </span>
                        </nav>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">

                                <p className="info">Contributions to master, excluding merge commits</p>
                                <div className="table">
                                    <div className="table--header">
                                        <div className="table--header__column rank">Id</div>
                                        <div className="table--header__column user">User</div>
                                        <div className="table--header__column commits">Votes</div>
                                        <div className="table--header__column rating">Your Rating</div>
                                        <div className="table--header__column avg">Avg Rating</div>
                                        <div className="table--header__column earnings">Earnings</div>
                                    </div>

                                    {this.listContributors()}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Overlay */}
                <div className="overlay-div" style={{display: this.state.ratingOverlay}}>
                    <div className="close-btn">
                        <button className="btn-normal" id="close_btn" onClick="closeOverlay(event)">
                            <span className="fa fa-times-circle-o" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="overlay-div--form-container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="stars">
                                    <div className="stars-container">
                                        <span onClick={()=>{this.rateContributor(1);}}><i className="fa fa-star-o" aria-hidden="true" /></span>
                                        <span onClick={()=>{this.rateContributor(2);}}><i className="fa fa-star-o" aria-hidden="true" /></span>
                                        <span onClick={()=>{this.rateContributor(3);}}><i className="fa fa-star-o" aria-hidden="true" /></span>
                                        <span onClick={()=>{this.rateContributor(4);}}><i className="fa fa-star-o" aria-hidden="true" /></span>
                                        <span onClick={()=>{this.rateContributor(5);}}><i className="fa fa-star-o" aria-hidden="true" /></span>
                                        <span onClick={()=>{this.rateContributor(6);}}><i className="fa fa-star-o" aria-hidden="true" /></span>
                                        <span onClick={()=>{this.rateContributor(7);}}><i className="fa fa-star-o" aria-hidden="true" /></span>
                                        <span onClick={()=>{this.rateContributor(8);}}><i className="fa fa-star-o" aria-hidden="true" /></span>
                                        <span onClick={()=>{this.rateContributor(9);}}><i className="fa fa-star-o" aria-hidden="true" /></span>
                                        <span onClick={()=>{this.rateContributor(10);}}><i className="fa fa-star-o" aria-hidden="true" /></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
  }
}

export default Repo;
