var moment = require("moment");

export const parseTwitterDate = (twitterDate) => {
	var system_date = new Date(Date.parse(twitterDate));
	var user_date = new Date();

    //  TODO: K ??
    // if (K.ie) {
	// 	system_date = Date.parse(twitterDate.replace(/( \+)/, " UTC$1"));
	// }
	var diff = Math.floor((user_date - system_date) / 1000);
	//if (diff <= 1) {return "just now";}
	if (diff <= 60) {
		return diff + "s";
	}
	//if (diff < 40) {return "half a minute ago";}
	//if (diff < 60) {return "less than a minute ago";}
	//if (diff <= 90) {return "one minute ago";}
	if (diff <= 3540) {
		return Math.round(diff / 60) + "m";
	}
	if (diff <= 5400) {
		return "1h";
	}
	if (diff <= 86400) {
		return Math.round(diff / 3600) + "h";
	}
	if (diff <= 129600) {
		return "1d";
	}
	if (diff < 604800) {
		return Math.round(diff / 86400) + "d";
	}
	if (diff <= 777600) {
		return "1w";
	}
	// Change format to "19 Oct" for example, if years are the same
	if (system_date.getFullYear() == user_date.getFullYear()) {
		return moment(system_date).format("D MMM");
	}
	// Change format to "19 Oct 20" for example
	return moment(system_date).format("D MMM YY");
};
