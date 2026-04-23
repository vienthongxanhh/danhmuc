import React from 'react';
import { Search, Phone, Mail, ShoppingCart, Menu, Info, Newspaper, PhoneCall, Gift, CreditCard, ChevronDown } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full bg-white shadow-sm font-sans z-50 relative border-b border-slate-200">
      {/* Top Header */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between py-4 gap-4 lg:gap-8">
          
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <a href="/" className="flex items-center gap-2">
              <div className="text-[#0056ad] font-black text-4xl tracking-tighter italic flex items-center">
                V<span className="text-[#D0021B]">T</span>X
              </div>
              <div className="flex flex-col">
                <span className="text-[#0056ad] font-bold text-sm uppercase leading-tight tracking-wide">Viễn Thông Xanh</span>
                <span className="text-[10px] text-slate-500 uppercase font-bold leading-none tracking-[0.1em]">Kết nối công nghệ việt</span>
              </div>
            </a>
          </div>

          {/* Search Bar */}
          <div className="flex-1 w-full max-w-[600px] flex items-center border-[2px] border-[#0056ad] rounded-md overflow-hidden h-10">
            <div className="flex z-10 items-center justify-between h-full bg-white border-r border-slate-200 px-3 cursor-pointer min-w-[140px] hover:bg-slate-50">
              <span className="text-sm text-slate-700 font-medium whitespace-nowrap">Sản phẩm</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </div>
            <input 
              type="text" 
              placeholder="Bạn tìm gì..." 
              className="flex-1 h-full px-4 text-sm focus:outline-none placeholder:text-slate-400"
            />
            <button className="h-full bg-[#0056ad] text-white px-6 font-bold text-sm flex items-center gap-2 hover:bg-[#00458a] transition-colors whitespace-nowrap">
              <Search className="w-4 h-4" />
              TÌM KIẾM
            </button>
          </div>

          {/* Contact Info container - explicitly hidden on small screens, shown side by side with gap on large */}
          <div className="hidden xl:flex items-center gap-8 shrink-0">
            <div className="flex items-center gap-3">
              <Phone className="w-7 h-7 text-[#0056ad]" />
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-medium">Hotline:</span>
                <span className="text-sm font-bold text-[#0056ad]">0982 960 685</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail className="w-7 h-7 text-[#0056ad]" />
              <div className="flex flex-col">
                <span className="text-xs text-slate-500 font-medium">Email:</span>
                <span className="text-sm font-bold text-[#0056ad]">Admin@vienthongxanh.vn</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pl-6 border-l border-slate-200 cursor-pointer group">
              <div className="relative">
                <ShoppingCart className="w-7 h-7 text-[#0056ad] group-hover:text-[#D0021B] transition-colors" />
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-slate-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">0</span>
              </div>
              <span className="text-sm font-bold text-[#0056ad] group-hover:text-[#D0021B] transition-colors">Giỏ Hàng</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="w-full bg-[#0056ad] text-white hidden md:block border-t border-blue-800">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6 flex items-center h-12">
          
          {/* Category Button */}
          <div className="h-full flex items-center gap-3 bg-[#00458a] px-5 font-bold cursor-pointer w-[260px] hover:bg-[#00366d] transition-colors relative">
            <Menu className="w-5 h-5" />
            <span className="uppercase text-[13px] tracking-wide">Danh Mục Sản Phẩm</span>
            <ChevronDown className="w-4 h-4 ml-auto" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-l-[6px] border-l-white border-b-[6px] border-b-transparent animate-pulse mr-2" />
          </div>

          <nav className="flex items-center h-full ml-8 gap-8">
            <a href="#" className="flex items-center gap-2 text-[13px] font-bold hover:text-yellow-400 transition-colors uppercase tracking-wide group">
              <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-yellow-400/20 flex items-center justify-center transition-colors">
                <Info className="w-3.5 h-3.5" />
              </div>
              Giới thiệu
            </a>
            <a href="#" className="flex items-center gap-2 text-[13px] font-bold hover:text-yellow-400 transition-colors uppercase tracking-wide group">
              <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-yellow-400/20 flex items-center justify-center transition-colors">
                <Newspaper className="w-3.5 h-3.5" />
              </div>
              Tin Tức
            </a>
            <a href="#" className="flex items-center gap-2 text-[13px] font-bold hover:text-yellow-400 transition-colors uppercase tracking-wide group">
              <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-yellow-400/20 flex items-center justify-center transition-colors">
                <PhoneCall className="w-3.5 h-3.5" />
              </div>
              Liên hệ
            </a>
            <a href="#" className="flex items-center gap-2 text-[13px] font-bold hover:text-yellow-400 transition-colors uppercase tracking-wide group">
              <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-yellow-400/20 flex items-center justify-center transition-colors">
                <Gift className="w-3.5 h-3.5 text-yellow-400" />
              </div>
              Khuyến mại
            </a>
            <a href="#" className="flex items-center gap-2 text-[13px] font-bold hover:text-yellow-400 transition-colors uppercase tracking-wide group">
              <div className="w-6 h-6 rounded-full bg-white/10 group-hover:bg-yellow-400/20 flex items-center justify-center transition-colors">
                <CreditCard className="w-3.5 h-3.5" />
              </div>
              Thanh Toán
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
