function NhanVien(taikhoan, ten, email, matkhau, ngay, luong, chucvu, giolam) {
    this.taiKhoan = taikhoan;
    this.tenNV = ten;
    this.email = email;
    this.matKhau = matkhau;
    this.ngayLam = ngay;
    this.Luong = luong;
    this.chucVu = chucvu;
    this.gioLam = giolam;
    this.tongLuong = 0;
    this.xepLoai = "";

    this.tinhLuong = function () {
        if (this.chucVu === "Sếp") {
            return this.tongLuong = this.Luong * 3
        } else if (this.chucVu === "Trưởng phòng") {
            return this.tongLuong = this.Luong * 2
        }else if (this.chucVu === "Nhân viên") {
                return this.tongLuong = this.Luong
        } else {
            return this.tongLuong
        }
    }
    this.Loai =function (){
        if (0<= this.gioLam && this.gioLam <=160 ) {
            return this.xepLoai = "Trung Bình" 
        }else if(160<= this.gioLam && this.gioLam <=176){

            return this.xepLoai = "Khá" 
        }else if(176<= this.gioLam && this.gioLam <=192){

            return this.xepLoai = "Giỏi" 
        }else{
            return this.xepLoai = "Xuất Sắc"
        }
    }
}
