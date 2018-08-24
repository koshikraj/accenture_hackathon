import React, { Component } from 'react';
import Web3 from 'web3';
import { default as contract } from 'truffle-contract'
import voting_artifacts from './contracts/Voting.json'
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {isConnected: false};
        this.initWeb3Connection();

        this.voting = contract(voting_artifacts);
        this.voting.setProvider(this.web3.currentProvider);
        this.voteforCandidate()



    }
    componentWillMount() {
        if(this.web3 && this.web3.isConnected()) {
            this.setState({isConnected: true});

        }

    }

    initWeb3Connection()
    {
        const web3 = window.web3
        if (typeof web3 !== 'undefined') {
            // Use Mist/MetaMask's provider

            this.web3 = new Web3(web3.currentProvider);
            this.user_address = this.web3.eth.accounts[0]
            this.web3.eth.getBalance('0xacf77f303ca8e3e9573a53f72149cfefc5757cc4', function (a, b) {
                console.log(b)

            })

        } else {
            console.log('No web3? You should consider trying MetaMask!')
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
    }

    voteforCandidate()
    {
        try {
            var user_address = this.user_address;
            var web3 = this.web3
        this.voting.deployed().then(function(contractInstance) {


            // contractInstance.voteForCandidate('Jose', {gas: 140000, from: user_address});
            // var send = web3.eth.sendTransaction({from:web3.eth.coinbase,to:contractInstance.address,gas: 1400000, data: 'dfsdf', value:web3.toWei(1, "ether")}, function (val) {
            //     console.log(val);

            // });
            //
            // contractInstance.createRepo('1123213', 0x3033a3c2f7f92ecca6edc8603c50a1701e678ddb, {gas: 1400000, from: user_address}).then(function(c) {
            //     console.log(c.toLocaleString());
            // });

            // contractInstance.updateRating('1123213', 0x5ba8d140b98b592547d49b232c0450b49aeecfb0, 100, {gas: 1400000, from: user_address}).then(function(c) {
            //     console.log(c.toLocaleString());
            // });

            contractInstance.crowdFund('1123213', {gas: 1400000, from: user_address, to:contractInstance.address, value:web3.toWei(1, "ether")}).then(function(c) {
                console.log(c.toLocaleString());
            });

            contractInstance.listRepos.call('1123213', 0x3e372cc50f06f207734fbb9765e7ee3a78248f32).then(function(c) {
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

        {this.state.isConnected?'Connected to local node':'Not Connected'}
    </div>
    );
    }
}
export default Main;