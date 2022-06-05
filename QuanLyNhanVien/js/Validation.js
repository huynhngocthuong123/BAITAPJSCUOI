function Validation() {
    this.kiemTraDauVao = function (value, IDspans, message) {
        // kiểm tra đầu vào không được để trống
        if (value == "") {
            GETELE(IDspans).innerHTML = message
            GETELE(IDspans).style.display = "block";
            return false;
        }
        GETELE(IDspans).style.display = "none";
        return true;
    }
    this.dieuKienRangBuoc = function (value, IDspans, message, a, b) {
        // ràng buộc đầu vào input là số thực
        // ràng buộc điều kiện nhập giới hạn trong khoảng
        if (a <= value && value <= b) {
            GETELE(IDspans).style.display = "none"
            return true;
        }
        GETELE(IDspans).innerHTML = message
        GETELE(IDspans).style.display = "block"
        return false;
    }
    this.kiemTraTrungTaiKhoan = function (value, IDspans, message, mangNV) {
        // kiểm tra loại trùng lặp tài khoản
        // chạy vòng lặp some() trả true/false lọc trùng
        var isExist = mangNV.some(function (nv) {
            return value === nv.taiKhoan
        })
        if (isExist) {
            GETELE(IDspans).innerHTML = message
            GETELE(IDspans).style.display = "block"
            return false;
        }

        GETELE(IDspans).style.display = "none"
        return true;
    }
    this.kiemTraTrungEmail = function (value, IDspans, message, mangNV) {
        // kiểm tra loại trùng lặp loại Email
        // chạy vòng lặp some() trả true/false lọc trùng
        var isExist = mangNV.some(function (nv) {
            return value === nv.email
        })
        if (isExist) {
            GETELE(IDspans).innerHTML = message
            GETELE(IDspans).style.display = "block"
            return false;
        }
        GETELE(IDspans).style.display = "none"
        return true;
    }
    this.kiemTraInputChucVu = function (selectID, IDspans, message) {
        // kiểm tra đầu vào Inputselect
        // seclectedIndex : dữ liệu chọn Input select
        var selectIndex = GETELE(selectID).selectedIndex;
        if (selectIndex === 0) {
            GETELE(IDspans).innerHTML = message
            GETELE(IDspans).style.display = "block"
            return false;
        }
        GETELE(IDspans).style.display = "none"
        return true;
    }
    this.kiemTraTaiKhoan = function (value, IDspans, message) {
        var pattern = /^(?=.{4,6}$)[a-zA-Z0-9]+$/
        if (value.match(pattern)) {
            GETELE(IDspans).style.display = "none"
            return true
        }
        GETELE(IDspans).innerHTML = message
        GETELE(IDspans).style.display = "block"
        return false;
    }
    this.kiemTraTen = function (value, IDspans, message) {
        // kiểm tra nhập ký tự tên (check trên regexr.com)
        var pattern = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/
        if (value.match(pattern)) {

            GETELE(IDspans).style.display = "none"
            return true
        }
        GETELE(IDspans).innerHTML = message
        GETELE(IDspans).style.display = "block"
        return false;
    }
    this.kiemTraEmail = function (value, IDspans, message) {
        // kiểm tra đầu vào INput email đúng định dạng 
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (value.match(pattern)) {
            GETELE(IDspans).style.display = "none"
            return true
        }
        GETELE(IDspans).innerHTML = message
        GETELE(IDspans).style.display = "block"
        return false;
    }
   
    this.daycheck = function (value, IDspans, message) {
        // kiểm tra đầu vào ngày,tháng,năm đúng định dạng
        var pattern = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/
        if (value.match(pattern)) {
            GETELE(IDspans).style.display = "none"
            return true
        }
        GETELE(IDspans).innerHTML = message
        GETELE(IDspans).style.display = "block"
        return false;
    }
    this.checkpasswork = function (value, IDspans, message) {
        // kiểm tra đầu vào passwork tối đa 4-6 kí tự, ít nhất 1 (thương,hoa,kí tự đặc biệt,số)
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/
        if (value.match(pattern)) {
            GETELE(IDspans).style.display = "none"
            return true
        }
        GETELE(IDspans).innerHTML = message
        GETELE(IDspans).style.display = "block"
        return false;
    }
}