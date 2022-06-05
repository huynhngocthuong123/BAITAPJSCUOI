function DanhsachNhanVien() {
    this.mangNV = [];


    this.themNV = function (nv) {
        this.mangNV.push(nv)
        
    }

    // Xóa nhân viên
    // B1: tìm vị trí dùng chung cho các chức năng khác đi kèm
    this.timViTri = function (id) {
        var viTri = -1;
        this.mangNV.map(function (nv,index) {
            if (id === nv.taiKhoan) {
                viTri = index;              
            }
        })
        return viTri;
    }
    this.xoaNV = function (id) {
        var viTriXoa = this.timViTri(id) 
        if (viTriXoa > -1) {
            this.mangNV.splice(viTriXoa,1);        
        }    
    }
    this.capNhapNhanVien = function (nv) {
        var viTriCapNhap = this.timViTri(nv.taiKhoan)
        if (viTriCapNhap > -1) {
            this.mangNV[viTriCapNhap] = nv;
        }
    }
}
DanhsachNhanVien.prototype.timKiemNV = function (loaiTK) {
    var mangTK = [];
    var thuong = loaiTK.toLowerCase();
    this.mangNV.map(function (nv) {
       var xepLoaiThuong = nv.xepLoai.toLowerCase();
        if (xepLoaiThuong.indexOf(thuong) > -1) {
            mangTK.push(nv)
           
        }    
    })  
    return mangTK;  
}
