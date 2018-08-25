import React, { Component } from 'react';
import Web3 from 'web3';
import { default as contract } from 'truffle-contract'
import voting_artifacts from './contracts/Voting.json'
import "./node_modules/font-awesome/css/font-awesome.min.css";
export default class Contract {

    initContract(){
        this.initWeb3Connection();
        this.voting = contract(voting_artifacts);
        this.voting.setProvider(this.web3.currentProvider);
    }

    initWeb3Connection()
    {
        const web3 = window.web3;
        if (typeof web3 !== 'undefined') {
            // Use Mist/MetaMask's provider

            this.web3 = new Web3(web3.currentProvider);
            this.user_address = this.web3.eth.accounts[0];

        } else {
            console.log('No web3? You should consider trying MetaMask!')
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }
    }


    crowdFund(repoId, amount=1)
    {

        try {
            var user_address = this.user_address;
            var web3 = this.web3;
            this.voting.deployed().then(function(contractInstance) {

                contractInstance.crowdFund(repoId, {gas: 1400000, from: user_address, to:contractInstance.address, value:web3.toWei(amount, "ether")}).then(function(c) {
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

    getUserBalance(address) {
        let web3 = this.web3;
        this.web3.eth.getBalance(address, function (a, b) {
        })


    }

    createRepo(repoId)
    {

        console.log(repoId);
        try {
            var user_address = this.user_address;
            console.log(user_address);
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

}

module.export = Contract;
