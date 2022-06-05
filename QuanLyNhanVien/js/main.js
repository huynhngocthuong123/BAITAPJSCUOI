// tạo một thể hiện DanhSachNhanVien
const dsnv = new DanhsachNhanVien();
const Valid = new Validation();

function GETELE(id) {
    return document.getElementById(id)
}
function setLocalStorage() {
    localStorage.setItem("DSNV", JSON.stringify(dsnv.mangNV));
    hienThiNhanVien(dsnv.mangNV)
}
function getLocalStorage() {
    if (localStorage.getItem("DSNV") != null) {
        dsnv.mangNV = JSON.parse(localStorage.getItem("DSNV"))
        hienThiNhanVien(dsnv.mangNV)
    }
}
// hiện thị trực tiếp khi load trang wes
getLocalStorage()

GETELE("btnThemNV").onclick = function themNhanVien() {
    var taikhoan = GETELE("tknv").value.trim();
    var ten = GETELE("name").value.trim();
    var email = GETELE("email").value;
    var matkhau = GETELE("password").value;
    var ngay = GETELE("datepicker").value;
    var luong = Number(GETELE("luongCB").value);
    var chucvu = GETELE("chucvu").value;
    var giolam = Number(GETELE("gioLam").value);
    // tao ra một thể hiện của lớp NhanVien
    // kiểm tra dữ liệu đầu vào
    var isValid = true;
    // kiểm tra đầu vào tài khoản
    isValid = Valid.kiemTraTaiKhoan(taikhoan, "tbTKNV", "Tài khoản phải từ 4-6 kí tự, có thể là số,chữ Hoa, chữ Thường") && Valid.kiemTraTrungTaiKhoan(taikhoan, "tbTKNV", "Tên tài khoản đã có người sử dụng", dsnv.mangNV);
    // kiểm tra đầu vào tên
    isValid &= Valid.kiemTraDauVao(ten, "tbTen", "Tên không được để trống") && Valid.kiemTraTen(ten, "tbTen", "Tên không được có chữ số ");;
    // kiểm tra đầu vào email
    isValid &= Valid.kiemTraTrungEmail(email, "tbEmail", "Email đã có người sử dụng", dsnv.mangNV) && Valid.kiemTraEmail(email, "tbEmail", "Email không đúng định dạng");
    // kiểm tra đầu vào mk
    isValid &= Valid.checkpasswork(matkhau, "tbMatKhau", "Mật khẩu từ 6-10 kí tự (chứa ít nhất 1 ký tự số,1 ký tự in hoa,1 ký tự đặc biệt)");
    // kiểm tra đầu vào ngày làm
    isValid &= Valid.kiemTraDauVao(ngay, "tbNgay", "Ngày làm chưa đúng định dạng");
    // kiểm tra đầu vào lương
    isValid &= Valid.dieuKienRangBuoc(luong, "tbLuongCB", "Lương cơ bản trong khoảng từ 1,000,000-20,000,000", 1000000, 20000000);
    // Kiểm tra đầu vào Input chọn chức vụ
    isValid &= Valid.kiemTraInputChucVu("chucvu", "tbChucVu", "Vui lòng chọn một chức vụ hợp lệ")
    // kiểm tra đầu vào số giờ làm
    isValid &= Valid.dieuKienRangBuoc(giolam, "tbGiolam", "Giờ làm trong tháng phải từ 80-->200", 80, 200);

    // dữ liệu đúng thì chạy
    if (isValid) {
        var nv = new NhanVien(taikhoan, ten, email, matkhau, ngay, luong, chucvu, giolam);
        nv.tinhLuong();
        nv.Loai()
        dsnv.themNV(nv);


        // lưu localstorage 
        setLocalStorage();
        // lấy lên dùng 
        getLocalStorage();
    }



}
function hienThiNhanVien(mang) {
    var content = "";
    mang.map(function (nv) {
        var trELE = `<tr>
        <td>${nv.taiKhoan}</td>
        <td>${nv.tenNV}</td>
        <td>${nv.email}</td>
        <td>${nv.ngayLam}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.tongLuong.toLocaleString() + " VNĐ"}</td>
        <td>${nv.xepLoai}</td>
        <td>
        <button onclick ="xoaNhanVien('${nv.taiKhoan}')" class="btn btn-danger">Xóa</button>
        <button onclick ="chiTietNhanVien('${nv.taiKhoan}')" class="btn btn-primary" data-toggle="modal"
        data-target="#myModal" >Xem</button>
        </td>
        </tr>`
        content += trELE;
    })
    GETELE("tableDanhSach").innerHTML = content;
}
function xoaNhanVien(id) {
    dsnv.xoaNV(id);
    // hienThiNhanVien
    setLocalStorage()
    getLocalStorage()

}
function chiTietNhanVien(id) {
    var viTri = dsnv.timViTri(id);
    console.log(viTri);
    if (viTri > -1) {
        GETELE("tknv").value = dsnv.mangNV[viTri].taiKhoan;
        GETELE("tknv").disabled = true; // không cho người dùng sửa tài khoản
        GETELE("name").value = dsnv.mangNV[viTri].tenNV;
        GETELE("email").value = dsnv.mangNV[viTri].email;
        GETELE("email").disabled = true;
        GETELE("password").value = dsnv.mangNV[viTri].matKhau;
        GETELE("password").type = "text";
        GETELE("datepicker").value = dsnv.mangNV[viTri].ngayLam;
        GETELE("luongCB").value = dsnv.mangNV[viTri].Luong;
        GETELE("chucvu").value = dsnv.mangNV[viTri].chucVu;
        GETELE("gioLam").value = dsnv.mangNV[viTri].gioLam;
        // sửa tên chức năng
        GETELE("header-title").innerHTML = "CHI TIẾT NHÂN VIÊN"
        GETELE("btnCapNhat").style.display = "block"
        GETELE("btnThemNV").style.display = "none"
    }
}
function capNhap() {
    var taikhoan = GETELE("tknv").value;
    var ten = GETELE("name").value;
    var email = GETELE("email").value;
    var matkhau = GETELE("password").value;
    var ngay = GETELE("datepicker").value;
    var luong = Number(GETELE("luongCB").value);
    var chucvu = GETELE("chucvu").value;
    var giolam = GETELE("gioLam").value;
    var isValid = true;
    //! kiểm tra đầu vào tài khoản không cho chỉnh sửa

    // kiểm tra đầu vào tên
    isValid &= Valid.kiemTraDauVao(ten, "tbTen", "Tên không được để trống") && Valid.kiemTraTen(ten, "tbTen", "Tên không được có chữ số ");;
    //! kiểm tra đầu vào email không cho chỉnh sửa

    // kiểm tra đầu vào mk
    isValid &= Valid.checkpasswork(matkhau, "tbMatKhau", "Mật khẩu từ 6-10 kí tự (chứa ít nhất 1 ký tự số,1 ký tự in hoa,1 ký tự đặc biệt)");
    // kiểm tra đầu vào ngày làm
    isValid &= Valid.kiemTraDauVao(ngay, "tbNgay", "Ngày làm chưa đúng định dạng");
    // kiểm tra đầu vào lương
    isValid &= Valid.dieuKienRangBuoc(luong, "tbLuongCB", "Lương cơ bản trong khoảng từ 1,000,000-20,000,000", 1000000, 20000000);
    // Kiểm tra đầu vào Input chọn chức vụ
    isValid &= Valid.kiemTraInputChucVu("chucvu", "tbChucVu", "Vui lòng chọn một chức vụ hợp lệ")
    // kiểm tra đầu vào số giờ làm
    isValid &= Valid.dieuKienRangBuoc(giolam, "tbGiolam", "Giờ làm trong tháng phải từ 80-->200", 80, 200);
    if (isValid) {
        var nv = new NhanVien(taikhoan, ten, email, matkhau, ngay, luong, chucvu, giolam);
        nv.tinhLuong();
        nv.Loai()
        dsnv.capNhapNhanVien(nv);
        setLocalStorage();
        getLocalStorage();
    }
}
GETELE("btnThem").onclick = function () {
    GETELE("formInput").reset();
    GETELE("header-title").innerHTML = "TẠO NGƯỜI DÙNG"
    GETELE("email").disabled = false;
    GETELE("tknv").disabled = false;
    GETELE("btnCapNhat").style.display = "none"
    GETELE("btnThemNV").style.display = "block"
}

GETELE("btnTimNV").onclick = function () {
    var loaiTK = GETELE("searchName").value;
    var mangTK = [];
    mangTK = dsnv.timKiemNV(loaiTK);
    hienThiNhanVien(mangTK);
}
GETELE("searchName").onkeyup = function () {
    var tenTK = GETELE('searchName').value;
    var mangTK = [];

    mangTK = dsnv.timKiemNV(tenTK);
    hienThiNhanVien(mangTK);
}