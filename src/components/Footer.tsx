import React from 'react';
import { Facebook, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full font-sans pb-16 lg:pb-0">
      
      {/* Newsletter Section */}
      <div className="bg-[#0056ad] text-white">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between py-6 gap-6">
            <h3 className="text-lg font-bold uppercase tracking-wide">Chấp Nhận Thanh Toán</h3>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <h3 className="text-lg font-bold uppercase tracking-wide text-center sm:text-left">
                Mời Bạn Nhập Email Để Nhận Thông Tin Khuyến Mãi
              </h3>
              <div className="flex w-full sm:w-[400px]">
                <input 
                  type="email" 
                  placeholder="Nhập email của bạn" 
                  className="flex-1 px-4 py-2.5 text-slate-800 rounded-l focus:outline-none placeholder:text-slate-500"
                />
                <button className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-2.5 rounded-r font-bold transition-colors">
                  GỬI
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="bg-[#F4F6F8] border-t border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Column 1 */}
            <div className="space-y-4">
              <h4 className="text-[13px] font-bold text-[#0056ad] uppercase tracking-wider mb-2">Giới Thiệu Chung</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-slate-600 hover:text-[#0056ad] uppercase transition-colors">Giới thiệu</a></li>
                <li><a href="#" className="text-sm text-slate-600 hover:text-[#0056ad] uppercase transition-colors">Liên hệ</a></li>
                <li><a href="#" className="text-sm text-slate-600 hover:text-[#0056ad] uppercase transition-colors">Tin tức công ty</a></li>
                <li><a href="#" className="text-sm text-slate-600 hover:text-[#0056ad] uppercase transition-colors">Tin tức</a></li>
                <li><a href="#" className="text-sm text-slate-600 hover:text-[#0056ad] uppercase transition-colors">Tuyển dụng</a></li>
              </ul>
            </div>

            {/* Column 2 */}
            <div className="space-y-4">
              <h4 className="text-[13px] font-bold text-[#0056ad] uppercase tracking-wider mb-2">Hướng Dẫn</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-slate-600 hover:text-[#0056ad] uppercase transition-colors">Hướng dẫn đặt hàng</a></li>
                <li><a href="#" className="text-sm text-slate-600 hover:text-[#0056ad] uppercase transition-colors">Hướng dẫn kỹ thuật</a></li>
                <li><a href="#" className="text-sm text-slate-600 hover:text-[#0056ad] uppercase transition-colors">Hướng dẫn thanh toán</a></li>
                <li><a href="#" className="text-sm text-slate-600 hover:text-[#0056ad] uppercase transition-colors">Sitemap</a></li>
              </ul>
            </div>

            {/* Column 3 */}
            <div className="space-y-4">
              <h4 className="text-[13px] font-bold text-[#0056ad] uppercase tracking-wider mb-2">Chính Sách</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-slate-600 hover:text-[#0056ad] uppercase transition-colors">Chính sách bảo mật</a></li>
                <li><a href="#" className="text-sm text-slate-600 hover:text-[#0056ad] uppercase transition-colors">Chính sách bảo hành</a></li>
                <li><a href="#" className="text-sm text-slate-600 hover:text-[#0056ad] uppercase transition-colors">Chính sách đổi trả</a></li>
                <li><a href="#" className="text-sm text-slate-600 hover:text-[#0056ad] uppercase transition-colors">Chính sách giao hàng</a></li>
                <li><a href="#" className="text-sm text-slate-600 hover:text-[#0056ad] uppercase transition-colors">Điều khoản sử dụng</a></li>
              </ul>
            </div>

            {/* Column 4 */}
            <div className="space-y-4">
              <h4 className="text-[13px] font-bold text-[#0056ad] uppercase tracking-wider mb-2">Theo Dõi Chúng Tôi</h4>
              <div className="flex items-center gap-3">
                <a href="#" className="w-10 h-10 rounded-full bg-[#3b5998] hover:bg-blue-800 flex items-center justify-center text-white transition-colors">
                  <Facebook className="w-5 h-5 fill-current" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-[#ff0000] hover:bg-red-700 flex items-center justify-center text-white transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Footer Info */}
      <div className="bg-[#00458a] text-white">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6 py-6 md:py-8">
          <div className="text-[13px] text-white/80 space-y-2 max-w-4xl">
            <p className="font-bold text-white mb-2">© 2018. Công ty cổ phần Viễn Thông Xanh Việt Nam</p>
            <p>GPĐKKD: 0107619297 do Sở Kế hoạch và Đầu tư Thành phố Hà Nội cấp ngày 02/11/2016.</p>
            <p>Địa chỉ: Số 2, ngõ 53 Đường Phạm Tuấn Tài, Phường Nghĩa Đô, Thành phố Hà Nội, Việt Nam.</p>
            <p>Email: vienthongxanh.vn@gmail.com - Điện thoại: 024 6662 3616</p>
            <p>Chịu trách nhiệm nội dung: Nguyễn Anh Tuấn. Email: anhtuan@vienthongxanh.vn</p>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
