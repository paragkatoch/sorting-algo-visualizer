import { useEffect, useState } from "react";
import gtag, { GA_TRACKING_ID } from "../lib/gtag";

export default function GoogleAnalytics() {
	const [loaded, setLoaded] = useState(false);

	// setup google analytics
	useEffect(() => {
		const scriptTag = document.createElement("script");
		scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${
			GA_TRACKING_ID ?? "123"
		}`;
		scriptTag.addEventListener("load", () => setLoaded(true));
		document.body.appendChild(scriptTag);
	}, []);

	useEffect(() => {
		if (loaded) {
			gtag.pageview(window.location.href);
		}
	}, [loaded]);

	return (
		<>
			<script
				id="gtag-init"
				dangerouslySetInnerHTML={{
					__html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID ?? "123"}', {
              page_path: window.location.pathname,
            });
          `,
				}}
			/>
		</>
	);
}
