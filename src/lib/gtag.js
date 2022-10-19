export const GA_TRACKING_ID = process.env.REACT_APP_GID;

const gtag = {
	// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
	pageview: (url) => {
		window.gtag("config", GA_TRACKING_ID, {
			page_path: url,
		});
	},

	// https://developers.google.com/analytics/devguides/collection/gtagjs/events
	event: ({ action, category, label, value }) => {
		window.gtag("event", action, {
			event_category: category,
			event_label: label,
			value: value,
		});
	},
};

export default gtag;
