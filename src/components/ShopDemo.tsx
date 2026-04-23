import React, { useState, useMemo, useEffect } from 'react';
import { Filter, X, ShoppingCart, Eye, ChevronRight, ChevronLeft, PhoneCall, Phone, Check, Star, ChevronDown, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products, filterOptions } from '../data';

// Modern custom checkbox component
const CustomCheckbox = ({ isSelected, isDisabled }: { isSelected: boolean, isDisabled: boolean }) => (
    <div className={`w-5 h-5 flex-shrink-0 rounded border flex items-center justify-center transition-colors
        ${isDisabled ? 'border-slate-200 bg-slate-50' : 
          isSelected ? 'bg-[#0056ad] border-[#0056ad]' : 'border-slate-300 bg-white hover:border-[#0056ad]'}
    `}>
        {isSelected && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
    </div>
);

const FilterAccordion = ({ title, hasSelections = false, onClear = () => {}, children }: any) => {
    return (
        <div className="border-b lg:border-b-0 border-slate-100 py-3 lg:py-0 last:border-0 last:pb-0">
            <div className="flex items-center justify-between py-1 mb-3">
                <h4 className="font-bold text-slate-800 uppercase text-sm">{title}</h4>
                <div className="flex items-center gap-3">
                    {hasSelections && (
                        <button 
                            onClick={(e) => { e.stopPropagation(); onClear(); }} 
                            className="text-sm text-[#008a3d] hover:underline font-medium"
                        >
                            Xóa
                        </button>
                    )}
                </div>
            </div>
            <div className="pt-0 pb-1 space-y-2.5">
                {children}
            </div>
        </div>
    )
}

const FAQItem = ({ question, answer }: { question: string, answer: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-slate-100 last:border-0">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-3 flex items-center justify-between gap-4 text-left focus:outline-none group"
            >
                <span className="font-semibold text-[15px] text-slate-800 group-hover:text-[#0056ad] transition-colors">{question}</span>
                <div className="shrink-0 w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                    <ChevronDown className={`w-4 h-4 text-slate-500 group-hover:text-[#0056ad] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="pb-4 text-slate-600 text-[14px] leading-relaxed pr-8">
                            {answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const PromoSidebar = ({ isSlim = false, className = "" }: { isSlim?: boolean, className?: string }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null);

    const handlePhoneSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!phoneNumber) return;
        setIsSubmitting(true);
        setFormStatus(null);
        
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: phoneNumber })
            });

            if (res.ok) {
                setFormStatus('success');
                setPhoneNumber('');
            } else {
                setFormStatus('error');
            }
        } catch (e) {
            setFormStatus('error');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setFormStatus(null), 4000);
        }
    };

    return (
        <aside className={`hidden xl:flex flex-col shrink-0 sticky top-8 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-white h-fit self-start ${className}`}>
            {/* Header */}
            <div className={`bg-[#D0021B] text-white text-center font-bold uppercase tracking-wider flex items-center justify-center shrink-0 shadow-md z-10 relative
                ${isSlim ? 'py-2 gap-1 text-[11px]' : 'py-2.5 gap-1.5 text-sm'}
            `}>
                <Star className={`${isSlim ? 'w-3 h-3' : 'w-4 h-4'} fill-white animate-pulse`} />
                {isSlim ? 'Ưu đãi hot' : 'Ưu đãi độc quyền'}
            </div>
            
            {/* Banner Image */}
            <div className={`relative w-full overflow-hidden group ${isSlim ? 'aspect-[4/5]' : 'h-[200px]'}`}>
                <img src="https://images.unsplash.com/photo-1544160358-004cb68019ab?auto=format&fit=crop&q=80&w=360&h=640" alt="Khuyến mãi" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                <div className="absolute bottom-4 inset-x-0 text-center px-2 flex flex-col items-center justify-end">
                    <h4 className={`inline-block font-extrabold leading-tight uppercase drop-shadow-md animate-[flash-colors_1.5s_infinite,pulse-scale_1s_ease-in-out_infinite] origin-center text-white
                        ${isSlim ? 'text-lg' : 'text-2xl'}
                    `}>
                        Giảm thêm 10%
                    </h4>
                </div>
            </div>

            {/* Form and Content */}
            <div className={`flex flex-col flex-1 text-center relative z-10 bg-white border-t border-slate-100 ${isSlim ? 'p-3' : 'p-5'}`}>
                <p className={`text-slate-700 font-medium leading-relaxed ${isSlim ? 'text-[11px] mb-3' : 'text-sm mb-5'}`}>
                    Chỉ dành cho khách hàng để lại SĐT nhận báo giá ngay hôm nay!
                </p>
                <form onSubmit={handlePhoneSubmit} className={`w-full flex flex-col relative ${isSlim ? 'gap-2' : 'gap-3'}`}>
                    <p className="text-xs text-[#0056ad] font-bold uppercase tracking-wider mb-1 text-left">Gọi ngay 24/7</p>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-4 w-4 text-[#D0021B] animate-[shake_0.8s_infinite]" />
                        </div>
                        <input
                            type="tel"
                            value={phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)}
                            placeholder={isSlim ? 'Nhập SĐT' : 'Nhập SĐT của bạn'}
                            className={`w-full pl-9 py-2 bg-slate-50 border border-slate-300 rounded text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D0021B] focus:border-transparent font-medium shadow-inner transition-shadow duration-200
                                ${isSlim ? 'pr-2 text-xs placeholder:text-slate-400' : 'pr-3 text-sm placeholder:text-slate-500'}
                            `}
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex items-center justify-center bg-[#D0021B] hover:bg-[#b50117] text-white rounded font-bold transition-colors shadow-sm disabled:opacity-70 disabled:hover:bg-[#D0021B]
                            ${isSlim ? 'gap-1 py-2 text-xs mt-0' : 'gap-1.5 py-2.5 text-sm mt-1'}
                        `}
                    >
                        {isSubmitting ? (isSlim ? 'GỬI...' : 'ĐANG GỬI...') : (isSlim ? 'NHẬN BÁO GIÁ' : 'NHẬN BÁO GIÁ NGAY')}
                        {!isSubmitting && <Send className={isSlim ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
                    </button>
                </form>
                <div className={`relative w-full ${isSlim ? 'mt-2 h-8' : 'mt-3 h-10'}`}>
                    <AnimatePresence>
                        {formStatus === 'success' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`absolute inset-0 text-white font-bold bg-[#008a3d] rounded shadow-md border border-green-400 flex items-center justify-center text-center ${isSlim ? 'text-[10px] p-1 gap-1' : 'text-xs p-2 gap-1.5'}`}>
                                <Check className={`bg-white text-[#008a3d] rounded-full p-[1px] shrink-0 ${isSlim ? 'w-3 h-3' : 'w-3.5 h-3.5'}`} /> Thành công!
                            </motion.div>
                        )}
                        {formStatus === 'error' && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`absolute inset-0 text-white font-bold bg-amber-600 rounded shadow-md border border-amber-400 flex items-center justify-center text-center ${isSlim ? 'text-[10px] p-1' : 'text-xs p-2'}`}>
                                Có lỗi, thử lại sau.
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </aside>
    )
}

export default function ShopDemo() {
    const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
    const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 12;
    
    // Filter states
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedShielding, setSelectedShielding] = useState<string[]>([]);
    const [selectedEnvironments, setSelectedEnvironments] = useState<string[]>([]);
    
    const [sortBy, setSortBy] = useState('newest');

    // Applied states for two-step filtering
    const [appliedBrands, setAppliedBrands] = useState<string[]>([]);
    const [appliedTypes, setAppliedTypes] = useState<string[]>([]);
    const [appliedShielding, setAppliedShielding] = useState<string[]>([]);
    const [appliedEnvironments, setAppliedEnvironments] = useState<string[]>([]);
    
    // Contact form state
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null);

    // Voucher Popup state
    const [showVoucherPopup, setShowVoucherPopup] = useState(false);
    const [popupPhoneNumber, setPopupPhoneNumber] = useState('');

    const handlePhoneSubmit = async (e: React.FormEvent, phone: string, setter: (val: string) => void) => {
        e.preventDefault();
        if (!phone) return;
        setIsSubmitting(true);
        setFormStatus(null);
        
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: phone })
            });

            if (res.ok) {
                setFormStatus('success');
                setter('');
                if (showVoucherPopup) {
                    setTimeout(() => setShowVoucherPopup(false), 2000);
                }
            } else {
                setFormStatus('error');
            }
        } catch (e) {
            setFormStatus('error');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setFormStatus(null), 4000); // clear status after 4s
        }
    };

    // Lock body scroll when mobile menu or popup is open
    useEffect(() => {
        if (isMobileFilterOpen || showVoucherPopup) {
            document.body.style.overflow = 'hidden';
            // Disable scrolling on iOS
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = 'unset';
            document.body.style.position = 'static';
        }
    }, [isMobileFilterOpen, showVoucherPopup]);

    // Show voucher popup after delay
    useEffect(() => {
        const timer = setTimeout(() => {
            const hasSeenPopup = localStorage.getItem('hasSeenVoucherPopup');
            if (!hasSeenPopup) {
                setShowVoucherPopup(true);
                localStorage.setItem('hasSeenVoucherPopup', 'true');
            }
        }, 5000); // Show after 5 seconds

        return () => clearTimeout(timer);
    }, []);

    // Filtering logic (uses APPLIED states)
    const filteredProducts = useMemo(() => {
        let result = products.filter(p => {
            if (selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
            if (selectedTypes.length && !selectedTypes.includes(p.cableType)) return false;
            if (selectedShielding.length && !selectedShielding.includes(p.shielding)) return false;
            if (selectedEnvironments.length && !selectedEnvironments.includes(p.environment)) return false;
            
            return true;
        });

        if (sortBy === 'price-asc') {
            result.sort((a, b) => {
                // Keep 'contact' (0 price) at the bottom or top depending on preference, let's just use numeric sort
                if (a.price === 0) return 1;
                if (b.price === 0) return -1;
                return a.price - b.price;
            });
        } else if (sortBy === 'price-desc') {
            result.sort((a, b) => {
                if (a.price === 0) return 1;
                if (b.price === 0) return -1;
                return b.price - a.price;
            });
        }

        return result;
    }, [selectedBrands, selectedTypes, selectedShielding, selectedEnvironments, sortBy]);

    // Reset page to 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedBrands, selectedTypes, selectedShielding, selectedEnvironments])

    // Calculate pagination slices
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const currentProducts = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Count options based on DRAFT states (for dynamic preview inside filter menu)
    const getCountForOption = (key: 'brand' | 'cableType' | 'shielding' | 'environment', value: any) => {
        return products.filter(p => {
            if (key !== 'brand' && selectedBrands.length && !selectedBrands.includes(p.brand)) return false;
            if (key !== 'cableType' && selectedTypes.length && !selectedTypes.includes(p.cableType)) return false;
            if (key !== 'shielding' && selectedShielding.length && !selectedShielding.includes(p.shielding)) return false;
            if (key !== 'environment' && selectedEnvironments.length && !selectedEnvironments.includes(p.environment)) return false;

            if (key === 'brand' && p.brand !== value) return false;
            if (key === 'cableType' && p.cableType !== value) return false;
            if (key === 'shielding' && p.shielding !== value) return false;
            if (key === 'environment' && p.environment !== value) return false;

            return true;
        }).length;
    };

    const toggleFilter = (setState: React.Dispatch<React.SetStateAction<string[]>>, state: string[], val: string) => {
        setState(prev => prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]);
    };

    const clearFilters = () => {
        setSelectedBrands([]);
        setSelectedTypes([]);
        setSelectedShielding([]);
        setSelectedEnvironments([]);
    }

    const clearSpecificGroup = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
        setter([]);
    }

    const hasActiveFilters = selectedBrands.length > 0 || selectedTypes.length > 0 || selectedShielding.length > 0 || selectedEnvironments.length > 0;
    const activeFiltersCount = selectedBrands.length + selectedTypes.length + selectedShielding.length + selectedEnvironments.length;

    const formatCurrency = (amount: number) => {
        if (amount === 0) return "Liên hệ";
        return new Intl.NumberFormat('vi-VN').format(amount) + ' đ';
    }

    const renderFilterContent = () => (
        <div className="w-full">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 lg:hidden">
                <h3 className="font-bold text-lg text-[#0056ad] flex items-center gap-2 uppercase tracking-wide">
                    <Filter className="w-5 h-5" />
                    Bộ lọc sản phẩm
                </h3>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:items-start pt-4 lg:pt-0 w-full overflow-x-auto pb-4 custom-scrollbar lg:flex-nowrap snap-x">
            {/* Brands (As Subcategories Widget - pure links, no filtering) */}
            <div className="w-full lg:w-auto lg:min-w-[200px] shrink-0 snap-start">
                <FilterAccordion title="Danh mục / Hãng">
                    <div className="bg-[#f0f8ff] border text-sm border-slate-200 rounded-md overflow-hidden shadow-sm">
                        <div className="bg-[#e6f3fc] px-3 py-2 font-bold text-[#0056ad] border-b border-slate-200">
                            Cáp mạng
                        </div>
                        <ul className="max-h-[250px] overflow-y-auto custom-scrollbar flex flex-col">
                            {filterOptions.brands.map((brand, index) => {
                                // Only count total available products for category display, do not grey out
                                const count = products.filter(p => p.brand === brand).length;
                                return (
                                    <li key={brand} className={`${index !== filterOptions.brands.length - 1 ? 'border-b border-slate-200' : ''}`}>
                                        <a 
                                            href={`https://vienthongxanh.vn/danh-muc/cap-mang/cap-mang-${brand.toLowerCase().replace(/\s+/g, '-')}/`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full flex items-center justify-between py-1.5 px-2.5 group transition-colors cursor-pointer hover:bg-[#e6f3fc]"
                                        >
                                            <div className="flex items-center gap-1.5 flex-1 text-slate-700 group-hover:text-[#D0021B] whitespace-nowrap">
                                                <ChevronRight className="w-3 h-3 shrink-0 text-slate-500 group-hover:text-[#D0021B] transition-transform group-hover:translate-x-1" />
                                                <span className="truncate">Cáp mạng {brand}</span>
                                            </div>
                                            <span className="text-sm opacity-90 text-slate-600 ml-2">({count})</span>
                                        </a>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </FilterAccordion>
            </div>
            
            {/* Cable Types - Checkbox List */}
            <div className="w-full lg:w-auto lg:min-w-[170px] shrink-0 snap-start">
                <FilterAccordion 
                    title="Chuẩn cáp mạng" 
                    hasSelections={selectedTypes.length > 0} 
                    onClear={() => clearSpecificGroup(setSelectedTypes)}
                >
                    <div className="bg-[#f0f8ff] border border-slate-200 rounded-md p-2.5 shadow-sm space-y-2">
                        {filterOptions.cableTypes.map(type => {
                            const count = getCountForOption('cableType', type);
                            const isSelected = selectedTypes.includes(type);
                            const isDisabled = count === 0 && !isSelected;
                            return (
                                <label key={type} className={`flex items-center gap-2 group ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
                                    <div className="sr-only">
                                        <input 
                                            type="checkbox" 
                                            checked={isSelected}
                                            disabled={isDisabled}
                                            onChange={() => toggleFilter(setSelectedTypes, selectedTypes, type)}
                                        />
                                    </div>
                                    <CustomCheckbox isSelected={isSelected} isDisabled={isDisabled} />
                                    <span className={`text-sm whitespace-nowrap flex-1 ${isSelected ? 'font-medium text-[#0056ad]' : 'text-slate-700 group-hover:text-[#0056ad]'}`}>{type}</span>
                                    <span className="text-sm text-slate-600 bg-slate-100 rounded-full px-1.5 py-0.5">{count}</span>
                                </label>
                            )
                        })}
                    </div>
                </FilterAccordion>
            </div>

            {/* Shielding Checkbox List */}
            <div className="w-full lg:w-auto lg:min-w-[170px] shrink-0 snap-start">
                <FilterAccordion 
                    title="Chống nhiễu" 
                    hasSelections={selectedShielding.length > 0} 
                    onClear={() => clearSpecificGroup(setSelectedShielding)}
                >
                    <div className="bg-[#f0f8ff] border border-slate-200 rounded-md p-2.5 shadow-sm space-y-2">
                        {filterOptions.shielding.map(shield => {
                            const count = getCountForOption('shielding', shield);
                            const isSelected = selectedShielding.includes(shield);
                            const isDisabled = count === 0 && !isSelected;
                            return (
                                <label key={shield} className={`flex items-center gap-2 group ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
                                    <div className="sr-only">
                                        <input 
                                            type="checkbox" 
                                            checked={isSelected}
                                            disabled={isDisabled}
                                            onChange={() => toggleFilter(setSelectedShielding, selectedShielding, shield)}
                                        />
                                    </div>
                                    <CustomCheckbox isSelected={isSelected} isDisabled={isDisabled} />
                                    <span className={`text-sm whitespace-nowrap flex-1 ${isSelected ? 'font-medium text-[#0056ad]' : 'text-slate-700 group-hover:text-[#0056ad]'}`}>{shield}</span>
                                    <span className="text-sm text-slate-600 bg-slate-100 rounded-full px-1.5 py-0.5">{count}</span>
                                </label>
                            )
                        })}
                    </div>
                </FilterAccordion>
            </div>

            {/* Environment Checkbox List */}
            <div className="w-full lg:w-auto lg:min-w-[170px] shrink-0 snap-start">
                <FilterAccordion 
                    title="Môi trường sử dụng" 
                    hasSelections={selectedEnvironments.length > 0} 
                    onClear={() => clearSpecificGroup(setSelectedEnvironments)}
                >
                    <div className="bg-[#f0f8ff] border border-slate-200 rounded-md p-2.5 shadow-sm space-y-2">
                        {filterOptions.environments.map(env => {
                            const count = getCountForOption('environment', env);
                            const isSelected = selectedEnvironments.includes(env);
                            const isDisabled = count === 0 && !isSelected;
                            const envMap:any = { Indoor: "Trong nhà", Outdoor: "Ngoài trời", Suspended: "Cáp treo thép", Underground: "Cáp luồn cống" };
                            
                            return (
                                <label key={env} className={`flex items-center gap-2 group ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
                                    <div className="sr-only">
                                        <input 
                                            type="checkbox" 
                                            checked={isSelected}
                                            disabled={isDisabled}
                                            onChange={() => toggleFilter(setSelectedEnvironments, selectedEnvironments, env)}
                                        />
                                    </div>
                                    <CustomCheckbox isSelected={isSelected} isDisabled={isDisabled} />
                                    <span className={`text-sm whitespace-nowrap flex-1 ${isSelected ? 'font-medium text-[#0056ad]' : 'text-slate-700 group-hover:text-[#0056ad]'}`}>{envMap[env]}</span>
                                    <span className="text-sm text-slate-600 bg-slate-100 rounded-full px-1.5 py-0.5">{count}</span>
                                </label>
                            )
                        })}
                    </div>
                </FilterAccordion>
            </div>
            </div>
            
            <div className="h-6 lg:hidden" />
        </div>
    );

    return (
        <div className="w-full bg-[#F4F6F8] min-h-screen -mx-4 md:-mx-6 -my-8 md:-my-12 px-4 md:px-6 py-8 md:py-12">
            <div className="max-w-[1440px] mx-auto flex flex-col xl:flex-row gap-6 lg:gap-8 items-start">
                
                {/* LEFT SIDEBAR (Width 8 units -> 160px) */}
                <PromoSidebar isSlim={true} className="w-[160px]" />

                {/* MAIN CONTENT */}
                <div className="flex-1 min-w-0 w-full pb-20 lg:pb-0">
                    
                    {/* BREADCRUMB & TITLE */}
                    <div className="bg-white p-4 md:p-6 mb-6 rounded-xl shadow-sm border border-slate-200">
                        <div className="flex items-center text-sm text-slate-600 mb-3 gap-2">
                            <span className="hover:text-[#0056ad] cursor-pointer">Trang chủ</span>
                            <ChevronRight className="w-4 h-4" />
                            <span className="hover:text-[#0056ad] cursor-pointer">Sản phẩm</span>
                            <ChevronRight className="w-4 h-4" />
                            <span className="text-slate-800 font-medium">Cáp mạng</span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0056ad] p-4 rounded-lg shadow-sm -mx-2 sm:-mx-0 mt-2">
                            <div>
                                <h1 className="text-2xl font-bold text-white uppercase">Dây cáp mạng</h1>
                                <p className="text-blue-100 text-sm mt-1">Tìm thấy <strong className="text-white">{filteredProducts.length}</strong> sản phẩm phù hợp</p>
                            </div>
                            
                            {/* Mobile filter toggle only */}
                            <div className="lg:hidden w-full flex justify-center py-2">
                                <button 
                                    onClick={() => setIsMobileFilterOpen(true)}
                                    className="flex items-center justify-center gap-2 px-10 py-2.5 bg-white border border-transparent rounded-full text-sm font-bold text-[#0056ad] hover:bg-blue-50 transition-all shadow-sm w-full max-w-[280px]"
                                >
                                    <Filter className="w-5 h-5" />
                                    BỘ LỌC SẢN PHẨM {activeFiltersCount > 0 && <span className="bg-[#0056ad] text-white text-xs px-2 py-0.5 rounded-full">{activeFiltersCount}</span>}
                                </button>
                            </div>
                        </div>

                        {/* DESCRIPTIVE TEXT */}
                        <div className="mt-4 pt-4 border-t border-slate-100 text-sm text-slate-600 leading-relaxed">
                            <p>
                                <strong>Viễn Thông Xanh</strong> tự hào là nhà cung cấp các mặt hàng Sản phẩm <strong>Dây cáp mạng</strong> chính hãng, đạt tiêu chuẩn chất lượng quốc tế. 
                                Chúng tôi phân phối đa dạng các chủng loại từ cáp mạng <strong className="text-[#0056ad]">Cat5e, Cat6, Cat6A, Cat7</strong> từ các thương hiệu hàng đầu thế giới như: 
                                <strong className="text-slate-800"> Commscope/AMP, Alantek, LS, Belden, Vinacap...</strong> phù hợp cho mọi nhu cầu từ hệ thống mạng gia đình đến các dự án công trình quy mô lớn với mức giá ưu đãi nhất thị trường.
                            </p>
                        </div>
                        
                        {/* Active Filters Tag (Desktop) */}
                        {hasActiveFilters && (
                            <div className="hidden lg:flex items-center gap-2 mt-4 pt-4 border-t border-slate-100 flex-wrap">
                                <span className="text-sm text-slate-600 mr-1">Đang chọn:</span>
                                {[...selectedBrands, ...selectedTypes, ...selectedShielding, ...selectedEnvironments].map(f => (
                                    <span key={f} className="inline-flex items-center px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-[#0056ad] text-sm font-medium">
                                        {f}
                                    </span>
                                ))}
                                <button onClick={clearFilters} className="text-sm text-red-600 hover:underline ml-2">Xóa tất cả</button>
                            </div>
                        )}
                    </div>

                    {/* TOP ROW: FILTER & BANNER (Desktop only) */}
                    <div className="w-full hidden lg:flex mb-6">
                        <div className="w-full bg-white p-4 lg:p-6 rounded-xl shadow-sm border border-slate-200">
                            {renderFilterContent()}
                        </div>
                    </div>

                    {/* SORT BAR (Always visible above products) */}
                    <div className="flex justify-end mb-4">
                        <div className="flex items-center gap-2 bg-[#D0021B] px-3 py-1.5 rounded-lg shadow-sm border border-[#D0021B]">
                            <span className="text-sm text-[#F4F6F8] whitespace-nowrap">Sắp xếp:</span>
                            <select 
                                className="text-sm border-none focus:ring-0 outline-none bg-transparent font-medium cursor-pointer py-0 pr-8 text-[#F4F6F8]"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="newest" className="text-slate-800 bg-white">Mới nhất</option>
                                <option value="price-asc" className="text-slate-800 bg-white">Giá thấp nhất</option>
                                <option value="price-desc" className="text-slate-800 bg-white">Giá cao nhất</option>
                            </select>
                        </div>
                    </div>

                    {/* PRODUCT LISTING AREA */}
                    <div className="bg-white p-5 md:p-8 rounded-2xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-200/60">
                        {/* PRODUCT GRID */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-7">
                            <AnimatePresence mode="popLayout">
                                {currentProducts.map(product => (
                                <motion.div 
                                    key={product.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    className="bg-white group rounded-lg overflow-hidden border border-slate-100 hover:border-[#0056ad] shadow-[0_2px_10px_-3px_rgba(0,0,0,0.07)] hover:shadow-[0_15px_30px_-10px_rgba(0,80,157,0.15)] transition-all flex flex-col h-full"
                                >
                                    <div className="aspect-square bg-white px-2 pt-2 relative overflow-hidden flex items-center justify-center">
                                        <img src={product.image} alt={product.name} className="object-cover w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500 rounded-md" />
                                    </div>
                                    <div className="p-3 flex flex-col flex-1">
                                        <div className="flex items-center text-amber-400 mb-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="w-3 h-3 fill-current" />
                                            ))}
                                        </div>
                                        <h3 className="text-sm md:text-base font-bold text-slate-800 leading-snug group-hover:text-[#0056ad] transition-colors mb-2 truncate">
                                            {product.name}
                                        </h3>
                                        <div className="flex flex-wrap gap-1 mb-auto pb-1">
                                            <span className="text-sm uppercase border border-slate-200 text-slate-600 px-1 rounded-sm bg-slate-50">{product.cableType}</span>
                                            <span className="text-sm uppercase border border-slate-200 text-slate-600 px-1 rounded-sm bg-slate-50">{product.shielding}</span>
                                        </div>
                                        <div className="mt-1.5 flex flex-col">
                                            {product.price > 0 && <span className="text-sm text-slate-400 line-through mb-0.5">{formatCurrency(product.price * 1.2)}</span>}
                                            <span className="font-bold text-[#D0021B] text-base">{formatCurrency(product.price)}</span>
                                        </div>
                                    </div>
                                    <div className="px-3 pb-3 pt-0">
                                         <button className="w-full py-1.5 bg-[#f8f9fa] border border-slate-200 group-hover:border-[#0056ad] hover:!bg-[#D0021B] hover:!border-[#D0021B] text-[#0056ad] hover:!text-white text-sm font-semibold rounded transition-colors flex items-center justify-center gap-1.5">
                                            <Eye className="w-3.5 h-3.5" />
                                            Xem chi tiết
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {filteredProducts.length === 0 && (
                            <div className="col-span-full py-16 text-center bg-white rounded-xl border border-slate-200 shadow-sm">
                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Filter className="w-8 h-8 text-slate-300" />
                                </div>
                                <p className="text-xl font-medium text-slate-800">Không có sản phẩm nào phù hợp</p>
                                <p className="text-slate-600 mt-2 mb-6 max-w-md mx-auto">Thử xóa một vài tiêu chí lọc để tìm thấy nhiều sản phẩm hơn.</p>
                                <button onClick={clearFilters} className="px-6 py-2.5 bg-[#0056ad] text-white rounded-lg font-medium hover:bg-[#00458a] transition-colors inline-block">
                                    Xóa bộ lọc
                                </button>
                            </div>
                        )}
                    </div>

                    {/* PAGINATION */}
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-10 mb-8">
                            <nav className="flex items-center gap-1">
                                <button 
                                    className="w-10 h-10 flex items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                {[...Array(totalPages)].map((_, index) => {
                                    const pageNumber = index + 1;
                                    return (
                                        <button 
                                            key={pageNumber}
                                            onClick={() => setCurrentPage(pageNumber)}
                                            className={`w-10 h-10 flex items-center justify-center rounded-md font-medium transition-colors ${
                                                currentPage === pageNumber
                                                    ? 'bg-[#0056ad] text-white border border-[#0056ad]'
                                                    : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                                            }`}
                                        >
                                            {pageNumber}
                                        </button>
                                    )
                                })}
                                <button 
                                    className="w-10 h-10 flex items-center justify-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={currentPage === totalPages}
                                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </nav>
                        </div>
                    )}
                    </div>

                    {/* DETAILED CATEGORY DESCRIPTION */}
                    <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200 mt-8 mb-12 relative overflow-hidden">
                        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-4 pb-4 border-b border-slate-100">Cáp mạng là gì? Lựa chọn cáp mạng như thế nào cho công trình?</h2>
                        <div className={`relative ${!isDescriptionExpanded ? 'max-h-[160px] overflow-hidden' : ''}`}>
                            <div className="prose prose-sm font-sans md:prose-base max-w-none text-slate-600 prose-headings:text-slate-800 prose-a:text-[#0056ad]">
                                <p>
                                    Cáp mạng lưới, thường được gọi chung là dây mạng, là phần cứng mạng được thiết kế để kết nối 
                                    các thiết bị mạng khác nhau. Ví dụ như kết nối nhiều máy tính, máy in hoặc máy scan nối mạng... tạo thành một mạng nội bộ hoàn chỉnh.
                                </p>
                                <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">1. Phân loại theo cấu trúc chống nhiễu</h3>
                                <p>
                                    <strong>UTP (Unshielded Twisted Pair):</strong> Là loại cáp không có lớp chống nhiễu, 
                                    thường được dùng cho các không gian trong nhà, văn phòng trống không có từ trường cao. 
                                    Giá thành bình dân, phổ biến nhất hiện nay.
                                </p>
                                <p className="mt-2">
                                    <strong>FTP (Foiled Twisted Pair):</strong> Có một lớp bọc bạc giúp triệt tiêu nhiễu điện từ ngoài môi trường.
                                    Loại này được khuyên dùng khi kéo cáp âm tường dính cùng đường phào điện hay những nới nhiễu loạn sóng phức tạp.
                                </p>
                                <h3 className="text-lg font-bold text-slate-800 mt-6 mb-2">2. Lựa chọn cáp theo chuẩn tốc độ (Cat)</h3>
                                <ul className="list-disc pl-5 mt-2 space-y-2">
                                    <li><strong>Cat5e:</strong> Có tốc độ 10/100/1000 Mbps. Thích hợp gia đình, quán net vừa, văn phòng cơ bản. Giá rẻ nhất thị trường.</li>
                                    <li><strong>Cat6:</strong> Đáp ứng tốt tốc độ 1 Gigabit. Cấu trúc có thêm lõi chữ thập xoắn (cross filler) chống nhiễu chéo khá tốt, đáp ứng đường truyền ổn định ở khoảng cách dài.</li>
                                    <li><strong>Cat6A:</strong> Phiên bản cải tiến chuẩn đáp ứng băng thông 10 Gigabit cực nhanh. Dùng cho server cao cấp, hệ thống camera AI, tòa nhà chọc trời.</li>
                                </ul>
                                <div className="bg-slate-50/50 p-4 rounded-lg mt-6 border border-slate-200">
                                    <p className="mb-0 text-[#0056ad]">
                                        <strong>Viễn Thông Xanh</strong> tự tin mang đến cho bạn các dòng sản phẩm cáp mạng có đầy đủ CO/CQ, 
                                        đã qua đo kiểm chuyên dụng. Vui lòng liên hệ <strong className="font-bold">Hotline</strong> để được phòng kỹ thuật hỗ trợ tính toán phương án đi cáp miễn phí!
                                    </p>
                                </div>
                            </div>
                            {!isDescriptionExpanded && (
                                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
                            )}
                        </div>
                        <div className="mt-6 flex justify-center border-t border-slate-100 pt-6">
                            <button 
                                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                                className="text-[#0056ad] border border-[#0056ad] hover:bg-[#0056ad] hover:text-white px-6 py-2.5 rounded-lg font-medium transition-colors bg-white relative z-10 flex items-center justify-center min-w-[200px]"
                            >
                                {isDescriptionExpanded ? 'Thu gọn nội dung' : 'Xem toàn bộ nội dung'}
                            </button>
                        </div>
                    </div>

                    {/* FAQ SECTION */}
                    <div className="bg-[#f0f8ff] p-5 md:p-6 rounded-xl shadow-sm border border-slate-200 mt-6 mb-12">
                        <div className="flex flex-col items-center justify-center text-center mb-4 pb-4 border-b border-slate-200">
                            <h2 className="text-xl font-bold text-slate-800 mb-1">Câu hỏi thường gặp (FAQ)</h2>
                            <p className="text-slate-600 text-sm max-w-lg">Giải đáp những thắc mắc phổ biến nhất của người dùng khi chọn mua và thi công cáp mạng</p>
                        </div>
                        <div className="flex flex-col max-w-4xl mx-auto">
                            <FAQItem 
                                question="Cáp mạng lõi đồng nguyên chất và lõi hợp kim (CCA) khác nhau như thế nào?" 
                                answer="Cáp lõi đồng nguyên chất (Solid Copper) mang lại tốc độ truyền tải cực kỳ ổn định, ít nhiễu và đặc biệt là khả năng truyền nguồn PoE cho camera mà không bị suy hao dòng điện. Ngược lại, cáp CCA (nhôm mạ đồng) chỉ thích hợp truyền tín hiệu mạng khoảng cách ngắn, mềm hơn và dễ đứt ngầm, giá thành rẻ dùng cho các công trình tạm."
                            />
                            <FAQItem 
                                question="Tôi nên dùng cáp âm tường (Indoor) hay cáp ngoài trời (Outdoor)?" 
                                answer="Cáp chạy trong nhà (Indoor) có lớp vỏ nhựa PVC dễ uốn quanh các góc hẹp nhưng dễ giòn rách nếu phơi ngoài nắng mưa. Cáp ngoài trời (Outdoor) được bọc lớp vỏ nhựa HDPE màu đen cực kì cứng cáp, chống tia UV và chống thấm. Nếu đường đi cáp của bạn có dù chỉ 1-2m đi ra ngoài ban công, hãy ưu tiên mua cáp Outdoor để tránh mục vỏ sau thời gian ngắn."
                            />
                            <FAQItem 
                                question="Viễn Thông Xanh có hỗ trợ cắt lẻ bán theo mét không?" 
                                answer="Có. Nhằm hỗ trợ tối đa nhu cầu của khách hàng cá nhân hoặc văn phòng nhỏ, chúng tôi có cắt lẻ cáp mạng theo mét (áp dụng với các mã cáp thông dụng thương hiệu Commscope, Alantek...) và hỗ trợ bấm sẵn hạt mạng miễn phí để bạn mang về cắm thiết bị dùng được ngay."
                            />
                            <FAQItem 
                                question="Cáp mạng Cat6 có thể dùng chung với hạt mạng Cat5e không?" 
                                answer="Lõi đồng của cáp Cat6 to hơn lõi của Cat5e. Nếu bạn cố nhét lõi Cat6 vào hạt mạng Cat5e sẽ rất chật chội, thao tác khó khăn và làm suy hao băng thông. Để đạt tốc độ 1 Gigabit tối đa, bạn nên sử dụng hạt mạng chuẩn Cat6 đi kèm."
                            />
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDEBAR (Width 8 units -> 160px) */}
                <PromoSidebar isSlim={true} className="w-[160px]" />
            </div>

            {/* MOBILE OFF-CANVAS BACKDROP */}
            <AnimatePresence>
                {isMobileFilterOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMobileFilterOpen(false)}
                        className="fixed inset-0 bg-slate-900/70 z-50 lg:hidden backdrop-blur-sm"
                    />
                )}
            </AnimatePresence>

            {/* MOBILE OFF-CANVAS DRAWER */}
            <AnimatePresence>
                {isMobileFilterOpen && (
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 left-0 w-[85vw] max-w-sm bg-white z-50 lg:hidden shadow-2xl flex flex-col overscroll-contain"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-[#0056ad] text-white">
                            <h2 className="font-bold text-lg flex items-center gap-2 uppercase tracking-wide">
                                <Filter className="w-5 h-5" /> Bộ lộc
                            </h2>
                            <button 
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="p-2 -mr-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        
                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
                            {renderFilterContent()}
                        </div>

                        {/* Sticky Footer */}
                        <div className="p-4 border-t border-slate-200 bg-white flex flex-col gap-3 sticky bottom-0 shrink-0 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
                            <div className="flex justify-between items-center text-sm mb-1 px-1">
                                <span className="text-slate-600">Đã chọn: <strong className="text-[#0056ad]">{selectedBrands.length + selectedTypes.length + selectedShielding.length + selectedEnvironments.length}</strong></span>
                                <button onClick={clearFilters} className="text-[#D0021B] font-medium hover:underline">Xóa tất cả</button>
                            </div>
                            <button 
                                onClick={() => setIsMobileFilterOpen(false)}
                                className="w-full bg-[#0056ad] text-white font-bold uppercase rounded-lg py-3 shadow-md hover:bg-[#00458a] flex justify-center items-center gap-2 active:scale-[0.98] transition-transform"
                            >
                                Hiển thị {filteredProducts.length} sản phẩm
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* VOUCHER POPUP */}
            <AnimatePresence>
                {showVoucherPopup && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowVoucherPopup(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="relative aspect-[16/9] bg-[#0056ad]">
                                <img 
                                    src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=600&h=300" 
                                    alt="Voucher" 
                                    className="w-full h-full object-cover opacity-60"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-gradient-to-t from-[#0056ad] to-transparent">
                                    <div className="bg-yellow-400 text-[#0056ad] px-4 py-1 rounded-full font-bold text-sm uppercase tracking-widest mb-3 shadow-lg">Quà tặng đặc biệt</div>
                                    <h2 className="text-3xl font-extrabold text-white leading-tight uppercase drop-shadow-md">
                                        Voucher Giảm 10%
                                    </h2>
                                </div>
                            </div>

                            <div className="p-8 text-center">
                                <p className="text-slate-600 mb-6 font-medium leading-relaxed">
                                    Chúc mừng! Bạn là khách hàng may mắn nhận được voucher giảm giá 10%. Hãy để lại SĐT để nhận voucher trong vòng 24h!
                                </p>

                                <form onSubmit={(e) => handlePhoneSubmit(e, popupPhoneNumber, setPopupPhoneNumber)} className="space-y-4">
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Phone className="h-5 w-5 text-[#0056ad] animate-[shake_1s_infinite] drop-shadow-[0_0_8px_rgba(0,80,157,0.3)]" />
                                        </div>
                                        <input
                                            type="tel"
                                            value={popupPhoneNumber}
                                            onChange={e => setPopupPhoneNumber(e.target.value)}
                                            placeholder="Nhập số điện thoại của bạn"
                                            className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0056ad] focus:border-transparent transition-all placeholder:text-slate-400 font-medium"
                                            required
                                            disabled={isSubmitting}
                                        />
                                    </div>
                                    <button 
                                        type="submit"
                                        disabled={isSubmitting || formStatus === 'success'}
                                        className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all shadow-lg active:scale-[0.98]
                                            ${formStatus === 'success' 
                                                ? 'bg-green-600 text-white cursor-default' 
                                                : 'bg-[#D0021B] hover:bg-[#b50117] text-white hover:shadow-red-200'}
                                        `}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center gap-2">Đang xử lý...</span>
                                        ) : formStatus === 'success' ? (
                                            <span className="flex items-center gap-2"><Check className="w-5 h-5" /> Đã gửi thành công!</span>
                                        ) : (
                                            <span className="flex items-center gap-2">NHẬN VOUCHER NGAY <Send className="w-4 h-4" /></span>
                                        )}
                                    </button>
                                </form>

                                <p className="text-sm text-slate-500 mt-6">
                                    * Voucher sẽ được gửi qua SMS hoặc Zalo cho bạn. 
                                    <br />Cam kết bảo mật thông tin khách hàng tuyệt đối.
                                </p>

                                <button 
                                    onClick={() => setShowVoucherPopup(false)}
                                    className="mt-6 text-sm text-slate-500 hover:text-slate-700 underline transition-colors cursor-pointer"
                                >
                                    Không, tôi muốn mua giá gốc.
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    )
}

