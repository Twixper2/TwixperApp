class UserTwitterEntity {
	constructor(idStr, screenName, name, friendsCount, followersCount, profileImageUrlHttps) {
		this.idStr = idStr;
		this.screenName = screenName;
		this.name = name;
		this.friendsCount = friendsCount;
		this.followersCount = followersCount;
		this.profileImageUrlHttps = profileImageUrlHttps;
	}
}

export default UserTwitterEntity;
