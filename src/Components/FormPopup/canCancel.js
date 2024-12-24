import { differenceInHours } from 'date-fns';

// Hàm kiểm tra có thể hủy đặt chỗ không
export const canCancelReservation = (reservationDate) => {
  const timeZoneOffset = 7 * 60 * 60 * 1000; // Múi giờ +7, tính bằng mili giây

  // Lấy thời gian hiện tại
  const now = new Date();
  // Cộng thêm offset múi giờ vào thời gian hiện tại
  const zonedNow = new Date(now.getTime() + timeZoneOffset);

  // Chuyển đổi thời gian đặt chỗ sang múi giờ Việt Nam
  const zonedReservationDate = new Date(new Date(reservationDate).getTime() + timeZoneOffset);

  // Tính sự khác biệt giờ giữa thời gian đặt chỗ và thời gian hiện tại
  const hoursDifference = differenceInHours(zonedReservationDate, zonedNow);

  // Nếu sự khác biệt lớn hơn 2 giờ thì có thể hủy, ngược lại thì không thể hủy
  return hoursDifference >= 2;
};

