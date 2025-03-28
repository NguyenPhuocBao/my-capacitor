// Import các plugin của Capacitor
import { LocalNotifications } from '@capacitor/local-notifications';
import { Share } from '@capacitor/share';
import { Device } from '@capacitor/device';

// Hàm kiểm tra năm nhuận
function isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Hàm tính số ngày trong tháng
function daysInMonth(month: number, year: number): number {
    if (month === 2) return isLeapYear(year) ? 29 : 28;
    if ([4, 6, 9, 11].includes(month)) return 30;
    return 31;
}

// Hàm tính ngày sinh nhật (chỉ 1 implementation duy nhất)
async function calculateBirthdayCountdown(): Promise<void> {
    try {
        const birthDateInput = (document.getElementById("birthDate") as HTMLInputElement)?.value;
        if (!birthDateInput) {
            alert("Vui lòng nhập ngày sinh!");
            return;
        }

        const dateParts = birthDateInput.split("/");
        if (dateParts.length !== 2) {
            alert("Vui lòng nhập đúng định dạng DD/MM");
            return;
        }

        const day = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]);
        const today = new Date();
        const currentYear = today.getFullYear();

        // Kiểm tra tính hợp lệ
        if (isNaN(day) || isNaN(month) || month < 1 || month > 12 || 
            day < 1 || day > daysInMonth(month, currentYear)) {
            alert("Ngày tháng không hợp lệ!");
            return;
        }

        let nextBirthday = new Date(currentYear, month - 1, day);
        
        // Kiểm tra lại tính hợp lệ
        if (nextBirthday.getDate() !== day || nextBirthday.getMonth() + 1 !== month) {
            alert("Ngày tháng không hợp lệ!");
            return;
        }

        if (nextBirthday < today) {
            nextBirthday.setFullYear(currentYear + 1);
        }

        const timeDiff = nextBirthday.getTime() - today.getTime();
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        
        const resultElement = document.getElementById("result");
        if (resultElement) {
            resultElement.innerText = `Còn ${daysLeft} ngày nữa đến sinh nhật của bạn!`;
        }

        // Hiển thị thông báo
        await LocalNotifications.schedule({
            notifications: [
                {
                    title: "Đếm ngược sinh nhật",
                    body: `Còn ${daysLeft} ngày nữa là đến sinh nhật bạn! 🎉`,
                    id: 1,
                    schedule: { at: new Date(Date.now() + 1000) },
                }
            ]
        });
    } catch (error) {
        console.error("Lỗi khi tính ngày sinh nhật:", error);
        alert("Có lỗi xảy ra khi tính ngày sinh nhật!");
    }
}

// Các hàm shareCountdown và checkBatteryStatus giữ nguyên như trước
// ...

// Gán sự kiện
window.onload = () => {
    const calculateBtn = document.getElementById("calculateButton");
    if (calculateBtn) {
        calculateBtn.addEventListener("click", calculateBirthdayCountdown);
    }
    // Gán các sự kiện khác tương tự
};