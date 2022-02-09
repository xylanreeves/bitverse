
// have some local nfts added
// export const contractAddress = '0xaFEd7206fd95689edf4eFc0A718146bbb028ABC0'

//updated with like/dislike function:
/* 
    //@notice Returns if the user has liked or disliked an Nft
    //@param _nftId - the unique id given to every nft on bitverse
    //NOTE: Not the token-id of the nft!
    function checkIfUserLikedOrDislikedNft(uint256 _nftId) public view returns (bool likedNft, bool dislikedNft){
        Nft storage n = nftMapping[_nftId];
        likedNft = n.usersLiked[msg.sender];
        dislikedNft = n.usersDisliked[msg.sender];
    }
 */

export const contractAddress = "0x3086d5DDF5B8A3a11434c7B37cE79a285F4B340f"