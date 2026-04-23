---
title: "Ethereum 101: Blockchain as Distributed Computation Platform"
description: "Ethereum 101: Blockchain as Distributed Computation Platform"
pubDate: 2025-01-28
author: "Chun Chung Wu"
category: "engineering"
image: "https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67993d2033e340b8738a2c62_blog_header3.webp"
draft: false
webflowId: "67993d40a11369db32691cf6"
---

![](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67993d1194397904b35a93e1_blog_header3.png)

_Editor’s Note: Chung is an Oursky Intern. After participating in our Smart Contract consulting project, he wrote this introductory article to catalog his learnings about the Ethereum network._

You must have heard of [Bitcoin](https://bitcoin.org/), the distributed currency system.

Bitcoin utilizes a technique called blockchain which stores all the transaction records. Blockchain also ensures that no malicious modifications could be applied to the records.

As a distributed system, Bitcoin utilizes machines on the whole network to compute and verify the changes on the records.

What if we go went beyond storing transaction records into program states? This makes the whole network a computer for general purpose computations with program states that no one can modify illegally. [Ethereum](https://www.ethereum.org/) does this.

Let me explain below.  

## What is missing from Bitcoin?

Bitcoin blockchain architecture has several problems for general purpose computations. They include network state dependency, Turing-completeness and block time.

### Program States

Bitcoin only stores the transactions of coins in the blockchain. Therefore, the state of the network (implicitly constructed by transaction records) is just the amount of coins for each account. For general purpose computations, we need general purpose program states.

### Turing-Completeness

Bitcoin has a simple script system. It is not Turing-complete and does not have loop control structures.

The fundamental problem is that a loop-supporting script allows an attacker to easily perform a DOS attack by telling miners to do infinite loops.

Thus we need an approach that prevents infinite loops while keeping a certain level of Turing-completeness.

### Block Time

Bitcoin is adjusted to about 10 minutes per block, which means that a transaction will take at least 10 minutes. For security reasons, one usually waits for more blocks to confirm the transaction, which usually takes an hour.

It is not quite acceptable if we need an hour for every run of a program.

## How Ethereum solve these problems?

### Tree of States

Instead of transactions, Ethereum stores a tree of program states. It utilizes a special data structure called Merkle Patricia Tree to make fast modification and verification of the states possible.

### Gas

Each time when a program executes, there is a gas limit on the execution.

Each instruction in the program codes consumes a fixed amount of gas, and the execution will be aborted if it runs out of gas.

This provides a mechanism to ensure that every execution will be eventually terminated.

### GHOST Protocol

Ethereum has implemented a simplified version of the Greedy Heaviest Observed Subtree (GHOST) protocol, which can speed up the block creation without compromising security.

With the help of the GHOST protocol, block generation is now at the rate of about 30 seconds per block.

## Contracts

In Ethereum, everyone has an account (public key) and can transfer coins (Ether) to other accounts, which is the same as Bitcoin.

The difference is that an account can have associated code and storage data. Such an account is called a contract, which represents a program in the Ethereum network.

In Ethereum, everyone can deploy new contracts, and call functions exposed by other contracts.

Contracts are written in a language called Solidity. For details, please refer to the [documentation of Solidity](http://solidity.readthedocs.io/en/latest/).

## Example – Distributed computation done with Ethereum

Suppose now I want to have a contract for voting. Below is the code of the contract written in Solidity:

contract Voting {  
  mapping(address => bool) voted;

  // Number of candidates, exposed by the "public" keyword  
  uint public numCandidates;

  // key: candidate number, value: number of votes of the candidate  
  mapping(uint => uint) public votes;

  // Constructor of the contract  
  function Voting(uint myNumCandidates) {  
      numCandidates = myNumCandidates;  
  }

  function vote(uint candidate) {  
      // the address of the account which initiated this call  
      address from = tx.origin;  
      if (voted) {  
          // voted before and is trying to vote again, so throw error  
          throw;  
      }  
      // candidate: from 1 to numCandidates  
      if (candidate <= 0 || candidate > numCandidates) {  
          throw;  
      }  
      voted = true;  
      votes += 1;  
  }

  function getWinner() returns (uint) {  
      uint winner = 0;  
      uint winnerVotes = 0;  
      for (uint candidate = 1; candidate <= numCandidates; candidate++) {  
          if (votes > winnerVotes) {  
              winner = candidate;  
              winnerVotes = votes;  
          }  
      }  
      return winner;  
  }

  function() {  
      // In case someone deposited Ether into this account  
      // accidentally without calling any function, this "fallthrough"  
      // function will be called, which throws an error and abort the  
      // transaction  
      throw;  
  }  
}

In this contract, I can specify the number of candidates when creating the contract.

After creating the contract, everyone can vote for one of the candidates by calling the Vote function exposed by the contract.

The contract will check that everyone can vote once only. The contract also exposes the number of votes for each candidate and provides a function to check the winner.

Now I need to deploy the code onto the Ethereum network.

First, I open the Ethereum wallet. Then go to the “Contracts” tab for deploying a new contract.

![Distributed computation with Ethereum - Contract UI](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67993d10e3ba247ff388c5e6_ContractUI-1024x662.png)

Contract UI

In “Deploy New Contract”, I paste my code written in Solidity.

![Distributed computation with Ethereum - Deploy Contract](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67993d105fcf8e46e9e031a0_DeployContract-1024x706.png)

Deploy Contract

Now I can specify the parameters needed by the constructor, i.e. the number of candidates.

After that, I scroll to the bottom to deploy the contract.

You can see that I can specify the fee I want to pay for the contract. The more I pay, the faster the deployment of the contract will be accepted.

![Distributed computation with Ethereum - Select Fee](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67993d11349163223abd354e_SelectFee-1024x687.png)

Select Fee

One can check the estimated fee of the deployment in the confirmation dialog.

![Distributed computation with Ethereum - Confirm Contract](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67993d1194397904b35a93f0_ConfirmContract-807x1024.png)

Confirm contract

Then the contract is sent through the Ethereum network and awaits confirmation by the nodes in the network.

![Distributed computation with Ethereum - Deploying](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67993d1194397904b35a93de_Deploying-1024x226.png)

Deploying

After that, the contract will appear in the “Contracts” tab. You can see the public variables and functions exposed by the contract.

![Distributed computation with Ethereum - Deployed Contract](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67993d103451eeb69b9254b2_DeployedContract-1024x624.png)

Deployed Contract

Note that others cannot view the interfaces exposed by the contract unless they have both the contract address and the contract interface, which one can view by clicking “Show Interface”.

![Distributed computation with Ethereum - JSON Interface](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67993d100a904779ac2f81ad_JSONInterface-1024x526.png)

JSON interface

Now we can try to execute the contract. In this example, I try to vote for candidate 1 by calling the “Vote” function.

![Distributed computation with Ethereum - Call Function](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67993d1005a71790042080b1_CallFunction-1024x620.png)

Call function

The confirmation and waiting are the same as deploying a contract. After that, we can see that the “Votes” array increased by 1 at index 1, means that candidate 1 has got 1 vote.

![Distributed computation with Ethereum - After Execution](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67993d10092544fdcad9d5a5_AfterExecution-1024x985.png)

After Execution

If we try to vote again using the same account, or vote for “candidate 0” in another account, the execution will fail, and the wallet will send a warning.

![Distributed computation with Ethereum - Execute Will Fail](https://cdn.prod.website-files.com/654ba60def05336c1f0eb138/67993d108bd1b37b3ce7ee09_ExecuteWillFail-736x1024.png)

Execute will fail

That’s it! Enjoy smart-contracting!

## Reference

*   [Ethereum Whitepaper](https://github.com/ethereum/wiki/wiki/White-Paper)
*   [Paper of the GHOST Protocol](http://www.cs.huji.ac.il/%7Eavivz/pubs/13/btc_scalability_full.pdf)
*   [Documentation of Solidity](http://solidity.readthedocs.io/en/latest/)

‍
