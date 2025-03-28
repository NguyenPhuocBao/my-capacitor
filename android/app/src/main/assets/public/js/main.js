document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("calculateButton").addEventListener("click", calculateBirthdayCountdown);
    document.getElementById("shareButton").addEventListener("click", shareCountdown);
    document.getElementById("batteryButton").addEventListener("click", checkBatteryStatus);
});

async function calculateBirthdayCountdown() {
    const birthDateInput = document.getElementById("birthDate").value;
    if (!birthDateInput) return;

    const [day, month] = birthDateInput.split("/").map(Number);
    const today = new Date();
    const currentYear = today.getFullYear();
    let nextBirthday = new Date(currentYear, month - 1, day);

    if (nextBirthday < today) {
        nextBirthday.setFullYear(currentYear + 1);
    }

    const timeDiff = nextBirthday - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    document.getElementById("result").innerText = `Còn ${daysLeft} ngày nữa đến sinh nhật của bạn!`;

    await Capacitor.Plugins.LocalNotifications.schedule({
        notifications: [{
            title: "Đếm ngược sinh nhật",
            body: `Còn ${daysLeft} ngày nữa là đến sinh nhật bạn! 🎉`,
            id: 1,
            schedule: { at: new Date(Date.now() + 1000) },
        }]
    });
}

async function shareCountdown() {
    const countdownText = document.getElementById("result").innerText;
    if (countdownText) {
        await Capacitor.Plugins.Share.share({
            title: "Đếm ngược sinh nhật",
            text: countdownText,
            dialogTitle: "Chia sẻ thời gian đến sinh nhật"
        });
    }
}

async function checkBatteryStatus() {
    const info = await Capacitor.Plugins.Device.getBatteryInfo();
    alert(`Pin hiện tại: ${info.batteryLevel * 100}%`);
}
