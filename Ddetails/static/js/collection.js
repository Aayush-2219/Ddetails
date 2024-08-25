function getOSDetails() {
    var userAgent = navigator.userAgent;
    var osName = "Unknown OS";

    if (/Android/.test(userAgent)) osName = "Android";
    else if (/like Mac/.test(userAgent)) osName = "iOS";
    else if (/Win/.test(userAgent)) osName = "Windows";
    else if (/Mac/.test(userAgent)) osName = "MacOS";
    else if (/Linux/.test(userAgent)) osName = "Linux";
    else if (/X11/.test(userAgent)) osName = "UNIX";

    return osName;
}

// Function to get IP address
async function getIPAddress() {
    let ipAddress = null;
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        ipAddress = data.ip;

        let os = getOSDetails();
        console.log("Operating System: " + os);
        
        const battery = await navigator.getBattery();
        batteryLevel = battery.level * 100;
        charging = battery.charging;

        // Set up an event listener to update batteryLevel when it changes
        battery.addEventListener('levelchange', () => {
            batteryLevel = battery.level * 100;
        });

        // Now perform the fetch after the battery level has been set
        fetch('/get_details', {
            method: 'POST',
            body: JSON.stringify({
                ops: os,
                bt: batteryLevel,
                chag: charging,
                ip:ipAddress
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
    }
}

getIPAddress();