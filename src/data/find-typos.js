import fs from 'fs';

const viReplacements = [
  ["theme", "theme"],
  ["bien moi truong", "biến môi trường"],
  ["moi truong", "môi trường"],
  ["bien", "biến"],
  ["truong", "trường"],
  [" va ", " và "],
  ["Va ", "Và "],
  [" voi ", " với "],
  [" cho ", " cho "],
  ["Tong hop", "Tổng hợp"],
  ["cau lenh", "câu lệnh"],
  ["Quy trinh", "Quy trình"],
  ["Khoi tao", "Khởi tạo"],
  ["khoi tao", "khởi tạo"],
  ["mo i", "mới"],
  ["moi", "mới"],
  ["thu muc", "thư mục"],
  ["hien tai", "hiện tại"],
  ["dang co", "đang có"],
  ["Su dung", "Sử dụng"],
  ["su dung", "sử dụng"],
  ["Kiem tra", "Kiểm tra"],
  ["kiem tra", "kiểm tra"],
  ["bat dau", "bắt đầu"],
  ["trang thai", "trạng thái"],
  ["thay doi", "thay đổi"],
  ["Them", "Thêm"],
  ["them", "thêm"],
  ["tat ca", "tất cả"],
  ["Tat ca", "Tất cả"],
  ["vao", "vào"],
  ["staging", "staging"],
  ["Tao", "Tạo"],
  ["tao", "tạo"],
  ["voi", "với"],
  ["ngan gon", "ngắn gọn"],
  ["ngon", "gọn"],
  ["Day", "Đẩy"],
  ["day", "đẩy"],
  ["len", "lên"],
  ["Keo", "Kéo"],
  ["keo", "kéo"],
  ["tu", "từ"],
  ["ve", "về"],
  ["co the", "có thể"],
  ["co quyen", "có quyền"],
  ["co san", "có sẵn"],
  ["co ban", "cơ bản"],
  ["Khong co", "Không có"],
  ["khong co", "không có"],
  ["Danh sach", "Danh sách"],
  ["danh sach", "danh sách"],
  ["nhanh", "nhánh"],
  ["chuyen", "chuyển"],
  ["Luu", "Lưu"],
  ["luu", "lưu"],
  ["tam", "tạm"],
  ["hoan toan", "hoàn toàn"],
  ["truoc do", "trước đó"],
  ["Lenh nguy hiem", "Lệnh nguy hiểm"],
  ["xoa", "xóa"],
  ["vinh vien", "vĩnh viễn"],
  ["mat du lieu", "mất dữ liệu"],
  ["Xem", "Xem"],
  ["lich su", "lịch sử"],
  ["du an", "dự án"],
  ["nhanh chong", "nhanh chóng"],
  ["Cai", "Cài"],
  ["cai", "cài"],
  ["dependency", "dependency"],
  ["Chay", "Chạy"],
  ["chay", "chạy"],
  ["Hook quan ly state trong component.", "Hook quản lý state trong component."],
  ["Hook xu ly side effects.", "Hook xử lý side effects."],
  ["Cau hinh", "Cấu hình"],
  ["cau hinh", "cấu hình"],
  ["tat ca", "tất cả"],
  ["quan ly", "quản lý"],
  ["du lieu", "dữ liệu"],
  ["lien quan", "liên quan"],
  ["rang buoc", "ràng buộc"],
  ["khoa ngoai", "khóa ngoại"],
  ["khong nhan", "không nhận"],
  ["hien thi", "hiển thị"],
  ["duong dan", "đường dẫn"],
  ["mot lan", "một lần"],
  ["mot lenh", "một lệnh"],
  ["do du lieu", "đổ dữ liệu"],
  ["du lieu mau", "dữ liệu mẫu"],
  ["du lieu demo", "dữ liệu demo"],
  ["ngon ngu", "ngôn ngữ"],
  ["phat trien", "phát triển"],
  ["frontend hien dai", "frontend hiện đại"],
  ["toi uu", "tối ưu"],
  ["CSDL", "CSDL"],
  ["Framework PHP voi artisan day du.", "Framework PHP với artisan đầy đủ."],
  ["Utility-first CSS cho UI nhanh gon.", "Utility-first CSS cho UI nhanh gọn."],
  ["Quan ly", "Quản lý"],
  ["Lenh he thong", "Lệnh hệ thống"],
  ["workflow", "workflow"],
  ["Do du lieu", "Đổ dữ liệu"],
  ["Loi thuong gap", "Lỗi thường gặp"],
  ["Cach khac phuc", "Cách khắc phục"],
  ["Can than", "Cẩn thận"],
  ["Khong", "Không"],
  ["khong", "không"],
  ["quyen", "quyền"],
  ["truy cap", "truy cập"],
  ["ket noi", "kết nối"],
  ["Chinh sua", "Chỉnh sửa"],
  ["chi tiet", "chi tiết"],
  ["dong", "động"],
  ["thu nghiem", "thử nghiệm"],
  ["mau", "mẫu"],
  ["yeu cau", "yêu cầu"],
  ["tai nguyen", "tài nguyên"],
  ["thoi gian thuc", "thời gian thực"],
  ["that", "thật"],
  ["ma hoa", "mã hóa"],
];

const restoreVietnamese = (input) => {
  return viReplacements.reduce(
    (result, [from, to]) => result.split(from).join(to),
    input
  );
};

const fileContent = fs.readFileSync('src/data/commands.json', 'utf8');
const data = JSON.parse(fileContent);

const results = [];

function checkText(text, path) {
  const restored = restoreVietnamese(text);
  if (restored === text) return;
  
  const origWords = text.split(/[\s,.\/()"'`<>:;]+/);
  const restoredWords = restored.split(/[\s,.\/()"'`<>:;]+/);
  
  for (let i = 0; i < origWords.length; i++) {
    const ow = origWords[i].toLowerCase();
    if (ow === 'that' || ow === 'them') {
      results.push({
        path,
        originalWord: origWords[i],
        restoredWord: restoredWords[i] || '',
        originalText: text,
        restoredText: restored
      });
    }
  }
}

function searchObj(obj, path = '') {
  if (typeof obj === 'string') {
    checkText(obj, path);
  } else if (Array.isArray(obj)) {
    obj.forEach((item, index) => searchObj(item, `${path}[${index}]`));
  } else if (obj && typeof obj === 'object') {
    for (const key in obj) {
      searchObj(obj[key], `${path}.${key}`);
    }
  }
}

searchObj(data);
console.log(JSON.stringify(results, null, 2));
