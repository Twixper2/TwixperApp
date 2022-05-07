class UserTwitterEntity {
	constructor(idStr, ScreenName, name, friendsCount, followersCount, profileImageUrlHttps) {
		this.idStr = idStr;
		this.ScreenName = ScreenName;
		this.name = name;
		this.friendsCount = friendsCount;
		this.followersCount = followersCount;
		this.profileImageUrlHttps = profileImageUrlHttps;
	}
}

export default UserTwitterEntity;
