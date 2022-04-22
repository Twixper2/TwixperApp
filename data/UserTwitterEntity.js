const participant1 = {
	exp_id: "102",
	group_id: 11,
	participant_twitter_id_str: "333",
	participant_twitter_username: "yossi",
	participant_twitter_name: "Yossi",
	participant_twitter_friends_count: 84,
	participant_twitter_followers_count: 11,
	participant_twitter_profile_image: "https://pbs.twimg.com/profile_images/1327926340046229505/-XM4INec_normal.jpg",
	participant_email: "gmail@gmail.com",
	user_twitter_token: "555",
	user_twitter_token_secret: "666",
	group_manipulations: [
		{
			type: "mute",
			users: ["ManUtd", "YNB", "CoopSport", "NoamPrinz"],
			keywords: ["soccer"],
		},
		{
			type: "inject",
			users: [],
			keywords: [],
		},
		{
			type: "pixel_media",
			users: [],
			keywords: [],
		},
		{
			type: "remove_media",
			users: [],
			keywords: [],
		},
	],
};

const participant2 = {
	exp_id: "100",
	group_id: 11,
	participant_twitter_id_str: "111",
	participant_twitter_username: "ishlach_koren",
	participant_twitter_name: "Koren Ishlach",
	participant_twitter_friends_count: 84,
	participant_twitter_followers_count: 11,
	participant_twitter_profile_image: "https://pbs.twimg.com/profile_images/1327926340046229505/-XM4INec_normal.jpg",
	participant_email: "gmail@gmail.com",
	user_twitter_token: "222",
	user_twitter_token_secret: "333",
	group_manipulations: [
		{
			type: "mute",
			users: ["ManUtd", "YNB", "CoopSport", "NoamPrinz"],
			keywords: ["soccer"],
		},
		{
			type: "inject",
			users: [],
			keywords: [],
		},
		{
			type: "pixel_media",
			users: [],
			keywords: [],
		},
		{
			type: "remove_media",
			users: [],
			keywords: [],
		},
	],
};

const participant3 = {
	exp_id: "103",
	group_id: 11,
	participant_twitter_id_str: "555",
	participant_twitter_username: "nir",
	participant_twitter_name: "Nir",
	participant_twitter_friends_count: 84,
	participant_twitter_followers_count: 11,
	participant_twitter_profile_image: "https://pbs.twimg.com/profile_images/1327926340046229505/-XM4INec_normal.jpg",
	participant_email: "gmail@gmail.com",
	user_twitter_token: "900",
	user_twitter_token_secret: "901",
	group_manipulations: [
		{
			type: "mute",
			users: ["ManUtd", "YNB", "CoopSport", "NoamPrinz"],
			keywords: ["soccer"],
		},
		{
			type: "inject",
			users: [],
			keywords: [],
		},
		{
			type: "pixel_media",
			users: [],
			keywords: [],
		},
		{
			type: "remove_media",
			users: [],
			keywords: [],
		},
	],
};

const userTwitterEntity1 = {
	id_str: participant1.participant_twitter_id_str,
	screen_name: participant1.participant_twitter_username,
	name: participant1.participant_twitter_name,
	friends_count: participant1.participant_twitter_friends_count,
	followers_count: participant1.participant_twitter_followers_count,
	profile_image_url_https: participant1.participant_twitter_profile_image,
};

const userTwitterEntity2 = {
	id_str: participant2.participant_twitter_id_str,
	screen_name: participant2.participant_twitter_username,
	name: participant2.participant_twitter_name,
	friends_count: participant2.participant_twitter_friends_count,
	followers_count: participant2.participant_twitter_followers_count,
	profile_image_url_https: participant2.participant_twitter_profile_image,
};

const userTwitterEntity3 = {
	id_str: participant3.participant_twitter_id_str,
	screen_name: participant3.participant_twitter_username,
	name: participant3.participant_twitter_name,
	friends_count: participant3.participant_twitter_friends_count,
	followers_count: participant3.participant_twitter_followers_count,
	profile_image_url_https: participant3.participant_twitter_profile_image,
};

exports.data = [userTwitterEntity1, userTwitterEntity2, userTwitterEntity3];
