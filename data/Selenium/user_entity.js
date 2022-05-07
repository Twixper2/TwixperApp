/* spell-checker: disable */
const userData = {
	cover_photo: "https://pbs.twimg.com/profile_banners/804535273/1520779263/1080x360",
	profile_img: "https://pbs.twimg.com/profile_images/1515412932640886788/phVH3RLi_200x200.jpg",
	username: "Ben Caspit בן כספית\n@BenCaspit",
	following_count: "1,218 Following",
	followers_count: "308.3K Followers",
	user_description:
		"Author of the best seller The Netanyahu Years, senior columnist, \nWalla, Maariv, Al-Monitor, Radio 103 fm, TV anchorman, Retweets do not imply endorsement.",
	user_location: "ישראל",
	when_joined: "Joined September 2012",
	user_url: "103fm.maariv.co.il/programs/progr…",
	user_profession: undefined,
};

exports.userEntity = {
	id_str: "1339687461107077120",
	screen_name: userData.username.split("\n@")[1],
	name: userData.username.split("\n@")[0],
	friends_count: userData.following_count.split(" ")[0],
	followers_count: userData.followers_count.split(" ")[0],
	profile_image_url_https: userData.profile_img,
};
