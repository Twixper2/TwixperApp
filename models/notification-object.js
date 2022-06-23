class NotificationObject {
	constructor(
		notificationID,
		notificationType,
		username,
		userHandle,
		profileImgURL,
		profileLink,
		titleText,
		bodyText
	) {
		this.username = username;
		this.bodyText = bodyText;
		this.titleText = titleText;
		this.userHandle = userHandle;
		this.profileLink = profileLink;
		this.profileImgURL = profileImgURL;
		this.notificationID = notificationID;
		this.notificationType = notificationType;
	}
}

export default NotificationObject;
