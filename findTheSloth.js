document.addEventListener("DOMContentLoaded", (event) => {
	const userInfo = {
		userAgent: navigator.userAgent,
		languages: navigator.languages,
		connectionType: navigator.connection ? navigator.connection.effectiveType : "unknown",
		deviceMemory: navigator.deviceMemory,
		hardwareConcurrency: navigator.hardwareConcurrency,
		screenWidth: screen.width,
		screenHeight: screen.height,
		mediaDevices: navigator.mediaDevices?.getUserMedia(),
		perf: window.performance,
	};

	fetch("/log-visit", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userInfo),
	})
		.then((response) => response.json())
		.then((data) => console.log("Info logged:", data))
		.catch((error) => console.error("Error:", error));
});
