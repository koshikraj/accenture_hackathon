 pragma solidity ^0.4.18;
 // We have to specify what version of compiler this code will compile with

 contract Voting {

     struct Contributor {
         address cAddress;
         uint rating;
     }


   mapping (bytes32 => Contributor[]) public repoContribution;

     bytes data = "";



   function Voting() payable {

   }

     function updateRating(bytes32 repoId, address userAddress, uint rating) {

         for (uint user_i = 0 ; user_i < repoContribution[repoId].length ; user_i++) {

         if (repoContribution[repoId][user_i].cAddress == userAddress)
         {
            repoContribution[repoId][user_i].rating = rating;
             break;
         }

         }
         if (user_i == repoContribution[repoId].length) {

             Contributor memory cont = Contributor(userAddress, rating);
             Contributor[] conts = repoContribution[repoId];
             conts.push(cont);
             repoContribution[repoId] = conts;
         }


     }

     function createRepo(bytes32 repoId, address userAddress) {
         Contributor memory cont = Contributor(userAddress, 100);
         Contributor[] conts;
         conts.push(cont);
         repoContribution[repoId] = conts;


 }

     function listRepos(bytes32 repoId, address user_address) view public returns (address) {
         for (uint user_i = 0 ; user_i < repoContribution[repoId].length ; user_i++)
         {
             if (repoContribution[repoId][user_i].cAddress == user_address)
             {

                 return repoContribution[repoId][user_i].cAddress;
//                  return data;
             }

         }

//         return repoContribution[repoId].length;



     }

     function crowdFund(bytes32 repoId) payable returns (uint){

         transfer_contribution(msg.value, repoId);
         return repoContribution[repoId].length;


     }

   function() payable {

       bytes32 repoId = 1123213;
       transfer_contribution(msg.value, repoId);



   }

   function transfer_contribution(uint value, bytes32 repoId) payable {

//       Contributor[] contributors = repoContribution[repoId];

       uint totalRatings = 0;


       for (uint i = 0 ; i < repoContribution[repoId].length ; i++) {
           totalRatings += repoContribution[repoId][i].rating;

       }

       for (i = 0 ; i < repoContribution[repoId].length ; i++) {

               repoContribution[repoId][i].cAddress.transfer((value * repoContribution[repoId][i].rating) / totalRatings);

       }


   }


 }