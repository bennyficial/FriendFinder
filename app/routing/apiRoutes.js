var friendData 	= require('../data/friends.js');

module.exports = function (app) {
	app.get('/api/friends', function(req, res) {
		res.json(friendData);
	})

	app.post("/api/friends", function (req, res) {
	var newFriend = req.body;
	console.log(newFriend);
	console.log("------------------------------")

	for (var i = 0; i<newFriend.scores.length; i ++) {
		if (newFriend.scores[i] == "1 (Strongly Disagree)") {
			newFriend.scores[i] == 1;
		} else if(newFriend.scores[i] == "5 (Strongly Agree)") {
			newFriend.scores[i] = 5;
		} else {
			newFriend.scores[i] = parseInt(newFriend.scores[i]);
		}
	}

	var differences = [];

	for(var i = 0; i < friendData.length; i++) {

			var comparedFriend = friendData[i];
			var totalDifference = 0;
			
			for(var k = 0; k < comparedFriend.scores.length; k++) {
				var differenceOneScore = Math.abs(comparedFriend.scores[k] - newFriend.scores[k]);
				totalDifference += differenceOneScore;
			}

			differences[i] = totalDifference;
		}

	var matchFriendNum = differences[0];
	var matchFriendIndex = 0;

	for (var i = 0; i < differences.length; i ++) {
		if (differences[i] < matchFriendNum) {
			matchFriendNum = differences[i];
			matchFriendIndex = i;
		}
	}
	friendData.push(newFriend);

	res.json(friendData[matchFriendIndex])
});
}
