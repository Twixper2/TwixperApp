class UserTwitterEntity {
	constructor(
		username,
		userHandle,
		friendsCount,
		followersCount,
		profileImgURL,
		coverImgURL,
		userDescription,
		userLocation,
		whenJoined,
		userURL,
		profession
	) {
		this.username = username;
		this.userHandle = userHandle;
		this.friendsCount = friendsCount;
		this.followersCount = followersCount;
		this.profileImgURL = profileImgURL;
		this.coverImgURL = coverImgURL;
		this.userDescription = userDescription;
		this.userLocation = userLocation;
		this.whenJoined = whenJoined;
		this.userURL = userURL;
		this.profession = profession;
	}
}

export default UserTwitterEntity;
