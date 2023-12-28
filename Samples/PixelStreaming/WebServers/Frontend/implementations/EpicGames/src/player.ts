// Copyright Epic Games, Inc. All Rights Reserved.

import { Config, PixelStreaming } from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.2';
import { Application, PixelStreamingApplicationStyle } from '@epicgames-ps/lib-pixelstreamingfrontend-ui-ue5.2';
const PixelStreamingApplicationStyles =
    new PixelStreamingApplicationStyle();
PixelStreamingApplicationStyles.applyStyleSheet();

document.body.onload = function() {
	// Example of how to set the logger level
	// Logger.SetLoggerVerbosity(10);

	// Create a config object
	const config = new Config({ useUrlParams: true });

	// Create a Native DOM delegate instance that implements the Delegate interface class
	const stream = new PixelStreaming(config);
	const application = new Application({
		stream,
		onColorModeChanged: (isLightMode) => PixelStreamingApplicationStyles.setColorMode(isLightMode)
	});
	// document.getElementById("centrebox").appendChild(application.rootElement);
	document.body.appendChild(application.rootElement);

	window.addEventListener('beforeunload', (event) => {
		application.onCloseBrowserTab();
		event.returnValue = '';
	});

	if (window.navigator.userAgent.indexOf("Android") != -1 || window.navigator.userAgent.indexOf("iPhone") != -1) {
		document.addEventListener("visibilitychange", () => {
			if (document.visibilityState === "visible") {
				console.log("Visible");
				application.onEnterBrowser();
			} else {
				console.log("Hidden");
				application.onExitBrowser();
			}
		});
	}
}
