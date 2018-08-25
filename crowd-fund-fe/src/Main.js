import React, { Component } from 'react';
import Web3 from 'web3';
import { default as contract } from 'truffle-contract'
import voting_artifacts from './contracts/Voting.json'
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {isConnected: false};


    }
    componentWillMount() {
        if(this.web3 && this.web3.isConnected()) {
            this.setState({isConnected: true});

        }

    }

    componentDidMount(){
        this.initWeb3Connection();
        this.voting = contract(voting_artifacts);
        this.voting.setProvider(this.web3.currentProvider);
    }

    initWeb3Connection()
    {
        const web3 = window.web3
        if (typeof web3 !== 'undefined') {
            // Use Mist/MetaMask's provider

            this.web3 = new Web3(web3.currentProvider);
            this.user_address = this.web3.eth.accounts[0]
            // this.web3.eth.getBalance('0xacf77f303ca8e3e9573a53f72149cfefc5757cc4', function (a, b) {
            //     console.log(b)
            //
            // })

        } else {
            console.log('No web3? You should consider trying MetaMask!')
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
    }


    crowdFund(repoId)
    {

        try {
            var user_address = this.user_address;
            var web3 = this.web3;
            this.voting.deployed().then(function(contractInstance) {

                contractInstance.crowdFund(repoId, {gas: 1400000, from: user_address, to:contractInstance.address, value:web3.toWei(10, "ether")}).then(function(c) {
                    console.log(c.toLocaleString());
                });
            });
        }

        catch (err) {
            console.log(err);
        }


    }

    updateRating(repoId, address, rating){

        try {
            var user_address = this.user_address;
            var web3 = this.web3;

        this.voting.deployed().then(function(contractInstance) {

        contractInstance.updateRating(repoId, address, rating, {gas: 1400000, from: user_address}).then(function(c) {
            console.log(c.toLocaleString());
        });

        });
        } catch (err) {
            console.log(err);
        }

    }

    createRepo(repoId)
    {

        console.log(repoId);
        try {
            var user_address = this.user_address;
            var web3 = this.web3;
        this.voting.deployed().then(function(contractInstance) {

            contractInstance.createRepo(repoId, user_address, {gas: 1400000, from: user_address}).then(function(c) {
                console.log(c.toLocaleString());
            });


        });
    } catch (err) {
        console.log(err);
    }
    }
    render() {
        return (
            <div>

                <button onClick={(e) => this.createRepo("1")}> Create repo </button>

                <button onClick={(e) => this.updateRating("1", "0xba519a5f622658764fd99af6ac5a3759caf7c8c5", 100 )}> update rating </button>

                <button onClick={(e) => this.crowdFund("1")}> Create repo </button>


    </div>
    );
    }
}
export default Main;