import { motion } from 'motion/react';
import { 
  Shield, 
  Play, 
  Key, 
  ShieldCheck, 
  Share2, 
  Calendar, 
  Code2, 
  Rocket, 
  Users, 
  Check,
  ArrowLeft,
  Cpu,
  Layers,
  Network,
  UserCheck,
  Award
} from 'lucide-react';

interface AboutSubpageProps {
  lang: 'vi' | 'en';
  onBack: () => void;
  onOpenDemo: () => void;
  onNavigate?: (page: string) => void;
}

export default function AboutSubpage({ lang, onBack, onOpenDemo, onNavigate }: AboutSubpageProps) {
  const isVi = lang === 'vi';

  return (
    <div className="bg-[#F7F8FC] dark:bg-[#0B0F1A] min-h-screen text-slate-900 dark:text-slate-100 font-sans antialiased pb-20 transition-colors duration-300">
      
      {/* 1. HERO HEADER SECTION (Matching exact full-width premium style of Blog and Document pages) */}
      <section className="py-16 pt-8 lg:pt-12 bg-gradient-to-b from-white dark:from-[#0F172A]/40 via-white dark:via-[#0F172A]/10 to-[#F7F8FC] dark:to-[#0B0F1A] border-b border-[#E5E7EB] dark:border-slate-800/80 px-6 lg:px-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto">
          {/* Back Navigation Button */}
          <div className="mb-6 text-left">
            <motion.button
              whileHover={{ x: -4 }}
              onClick={onBack}
              className="-ml-3 inline-flex min-h-9 items-center gap-2 rounded-xl px-3 py-2 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:stroke-[2.25] text-xs font-bold text-[#5B6CFF] dark:text-[#7C8CFF] hover:text-[#4A5AF0] dark:hover:text-[#6b7bff] transition-colors cursor-pointer group bg-transparent border-none"
            >
              <ArrowLeft className="transition-transform group-hover:-translate-x-0.5" />
              <span>{isVi ? "Quay lại Trang chủ" : "Back to Home"}</span>
            </motion.button>
          </div>

          <div className="relative text-left">
            <div className="grid grid-cols-1 items-start gap-x-12 gap-y-10 lg:grid-cols-12">
              {/* Left Column: Title and subtitle */}
              <div className="space-y-6 lg:col-span-7">
                
                {/* Standard subpage visual tag/pill */}
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF] bg-[#5B6CFF]/8 px-3.5 py-1.5 rounded-full border border-[#5B6CFF]/10">
                  <Award className="w-3.5 h-3.5 mr-0.5" />
                  <span>{isVi ? "Câu chuyện & Đội ngũ" : "Our Story & Vision"}</span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                  {isVi ? 'Về chúng tôi' : 'About Us'}
                  <span className="bg-gradient-to-r from-[#5B6CFF] to-[#8F9BFF] dark:from-[#7C8CFF] dark:to-[#8F9BFF] bg-clip-text text-transparent ml-2">
                    Identra
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-[#6B7280] dark:text-gray-400 leading-relaxed max-w-2xl font-normal">
                  {isVi 
                    ? 'Tìm hiểu về sứ mệnh, các giá trị cốt lõi và hành trình nỗ lực kiến tạo tương lai danh tính số tự chủ an toàn tuyệt đối của chúng tôi.'
                    : 'Discover our mission, core values, and our dedicated journey to creating an absolute, secure self-sovereign digital identity ecosystem.'
                  }
                </p>

                {/* Highly-styled highlight badges card panel to fill whitespace */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-2xl">
                  <div className="bg-white/60 dark:bg-slate-900/10 border border-[#E5E7EB] dark:border-slate-800/60 p-4 rounded-2xl flex flex-col justify-between hover:border-[#5B6CFF]/30 dark:hover:border-[#7C8CFF]/30 transition-all">
                    <div className="text-[#5B6CFF] dark:text-[#7C8CFF] mb-2">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white">100%</div>
                      <div className="text-[11px] text-[#6B7280] dark:text-slate-400 font-semibold uppercase tracking-wider">
                        {isVi ? 'Phi tập trung' : 'Decentralized'}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/60 dark:bg-slate-900/10 border border-[#E5E7EB] dark:border-slate-800/60 p-4 rounded-2xl flex flex-col justify-between hover:border-[#5B6CFF]/30 dark:hover:border-[#7C8CFF]/30 transition-all">
                    <div className="text-[#5B6CFF] dark:text-[#7C8CFF] mb-2">
                      <Key className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white">W3C DID</div>
                      <div className="text-[11px] text-[#6B7280] dark:text-slate-400 font-semibold uppercase tracking-wider">
                        {isVi ? 'Chuẩn quốc tế' : 'Global Standard'}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/60 dark:bg-slate-900/10 border border-[#E5E7EB] dark:border-slate-800/60 p-4 rounded-2xl flex flex-col justify-between hover:border-[#5B6CFF]/30 dark:hover:border-[#7C8CFF]/30 transition-all">
                    <div className="text-[#5B6CFF] dark:text-[#7C8CFF] mb-2">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white">0%</div>
                      <div className="text-[11px] text-[#6B7280] dark:text-slate-400 font-semibold uppercase tracking-wider">
                        {isVi ? 'Lưu trữ server' : 'Cloud Tracking'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Video/Media Container with Overlay Play Button */}
              <div 
                className="subpage-hero-visual w-full max-w-[30rem] mx-auto lg:col-span-5 lg:justify-self-end relative group rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 border border-[#E5E7EB] dark:border-slate-800 shadow-md cursor-pointer"
              >
                <img 
                  src="/src/assets/images/regenerated_image_1780048805304.png" 
                  alt={isVi ? "Câu chuyện của chúng tôi" : "Our Story"}
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Overlay Title */}
                <div className="absolute top-6 left-6">
                  <span className="text-xs font-bold tracking-wider text-white uppercase bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
                    {isVi ? "Câu chuyện của chúng tôi" : "Our Story"}
                  </span>
                </div>

                {/* Pulsing visual Play overlay centered */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onOpenDemo}
                    className="w-16 h-16 rounded-full bg-white text-[#5B6CFF] flex items-center justify-center shadow-2xl cursor-pointer hover:bg-slate-50 transition-colors border-none"
                    aria-label="Play Video"
                  >
                    <Play className="w-5 h-5 fill-current ml-1 text-[#5B6CFF]" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT CONTAINER (Directly matching other subpages layout) */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        
        {/* Story & Mission Section */}
        <div className="w-full mb-16 text-left">
          {/* Mission, Title, Description, and Pillars in Full Width */}
          <div className="flex flex-col space-y-6">
            <div className="inline-flex items-center gap-1.5 self-start text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF] bg-[#5B6CFF]/8 px-3.5 py-1.5 rounded-full border border-[#5B6CFF]/10">
              <Shield className="w-3.5 h-3.5" />
              <span>{isVi ? "Sứ mệnh của chúng tôi" : "Our Mission"}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {isVi ? "Trao quyền cho danh tính số của bạn" : "Empower your digital identity"}
            </h2>

            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-normal max-w-4xl">
              {isVi 
                ? "Chúng tôi tin rằng mỗi cá nhân đều có quyền sở hữu và kiểm soát danh tính của chính mình trong thế giới số. SSI Wallet ra đời để thay đổi cách danh tính được quản lý – từ tập trung sang phi tập trung, từ chia sẻ tràn lan sang chia sẻ có chọn lọc."
                : "We believe that every individual has the right to own and control their own identity in the digital world. SSI Wallet was born to change how identity is managed – from centralized to decentralized, from indiscriminate sharing to selective sharing."}
            </p>

            {/* Three Pillar Icons row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-[#E5E7EB] dark:border-slate-800">
              {/* Pillar 1 */}
              <div className="space-y-2 group text-left">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-500 dark:text-blue-400 flex items-center justify-center border border-blue-100/50 dark:border-blue-900/30 transition-transform group-hover:scale-105">
                  <Key className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-sans">
                  {isVi ? "Toàn quyền sở hữu" : "Total ownership"}
                </h4>
                <p className="text-[11px] text-slate-405 dark:text-slate-500 leading-relaxed font-normal">
                  {isVi ? "Bạn là chủ sở hữu duy nhất của danh tính số của mình." : "You are the sole owner of your private digital credentials."}
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="space-y-2 group text-left">
                <div className="w-10 h-10 rounded-2xl bg-teal-50 dark:bg-teal-950/40 text-teal-500 dark:text-teal-400 flex items-center justify-center border border-teal-100/50 dark:border-teal-900/30 transition-transform group-hover:scale-105">
                  <ShieldCheck className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-sans">
                  {isVi ? "Bảo mật bởi thiết kế" : "Security by design"}
                </h4>
                <p className="text-[11px] text-slate-405 dark:text-slate-500 leading-relaxed font-normal">
                  {isVi ? "Giải pháp sử dụng hoàn toàn ví lưu trữ cục bộ bảo mật." : "Our wallet uses cryptographic storage shielded locally on your device."}
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="space-y-2 group text-left">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 dark:text-indigo-400 flex items-center justify-center border border-indigo-100/50 dark:border-indigo-900/30 transition-transform group-hover:scale-105">
                  <Share2 className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-sans">
                  {isVi ? "Chia sẻ có chọn lọc" : "Selective sharing"}
                </h4>
                <p className="text-[11px] text-slate-405 dark:text-slate-500 leading-relaxed font-normal">
                  {isVi ? "Bạn quyết định chia sẻ thông tin gì, với ai và khi nào." : "You decide what details are dispatched, to whom, and when."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-indigo-50/20 dark:bg-slate-900/45 border border-[#E5E7EB] dark:border-slate-800/80 flex flex-col md:flex-row items-center gap-6 mb-16 shadow-xs text-left">
          <div className="w-12 h-12 rounded-2xl bg-[#5B6CFF]/10 text-blue-500 dark:text-blue-450 flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6 text-[#5B6CFF]" />
          </div>
          <div className="flex-1 space-y-1 text-center md:text-left">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              {isVi ? "Vì một tương lai số an toàn và minh bạch hơn" : "For a Safer and More Transparent Digital Future"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
              {isVi 
                ? "Trong kỷ nguyên mà dữ liệu cá nhân trở thành tài sản quý giá, chúng tôi xây dựng SSI Wallet với mục tiêu mang lại một hệ sinh thái danh tính số phi tập trung, minh bạch và đáng tin cậy – nơi mỗi người dùng thực sự làm chủ dữ liệu của mình và tự do kết nối trong thế giới số."
                : "In the open era where personal data becomes a precious asset, we build SSI Wallet with the goal of bringing a decentralized, transparent, and trustworthy digital identity ecosystem – where every user truly owns their data and freely connects in the digital world."}
            </p>
          </div>
        </div>

        {/* Brand Ecosystem & Architecture Sections (Enriched technology foundation details) */}
        <div className="mb-16 text-left">
          <div className="flex flex-col space-y-4 mb-10">
            <div className="inline-flex items-center gap-1.5 self-start text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 bg-emerald-500/8 px-3.5 py-1.5 rounded-full border border-emerald-500/10">
              <Cpu className="w-3.5 h-3.5" />
              <span>{isVi ? "Nền tảng kiến trúc" : "Architectural Core"}</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {isVi ? "Hệ sinh thái & Công nghệ cốt lõi" : "Sovereign Technical Ecosystem"}
            </h2>
            <p className="text-xs.5 sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-3xl font-normal">
              {isVi 
                ? "Identra phát triển một bộ giải pháp toàn diện, định hình lại cấu trúc bảo mật danh tính số bằng cách áp dụng các tiêu chuẩn mở quốc tế của tổ chức W3C kết hợp với mật mã học Zero-Knowledge tân tiến nhất."
                : "Identra scales a comprehensive suite of digital trust solutions, reimagining the secure transmission of web identities through strict adherence to W3C open standards powered by interactive Zero-Knowledge infrastructure."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tech Item 1 */}
            <div className="p-6 rounded-3xl border border-gray-150 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 hover:border-[#5B6CFF]/30 dark:hover:border-[#7C8CFF]/30 hover:shadow-xs transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-950 dark:text-white mb-2 font-sans uppercase tracking-tight">
                {isVi ? "Ví thông minh Identra Core" : "Identra Core Wallet"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                {isVi 
                  ? "Ví di động cá nhân áp dụng lớp mã hóa tối tân, cách ly hoàn toàn khóa bí mật và thông tin cá nhân trong nền tảng Secure Enclave của thiết bị, loại bỏ nguy cơ rò rỉ dữ liệu đám mây."
                  : "Our native consumer application housing cryptographic keys locally inside isolated mobile device Secure Enclaves, eliminating traditional cloud database single-points-of-failure."}
              </p>
            </div>

            {/* Tech Item 2 */}
            <div className="p-6 rounded-3xl border border-gray-150 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 hover:border-[#5B6CFF]/30 dark:hover:border-[#7C8CFF]/30 hover:shadow-xs transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
                <Network className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-950 dark:text-white mb-2 font-sans uppercase tracking-tight">
                {isVi ? "Cổng phát hành SSI Enterprise" : "Enterprise Issuance Gateway"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                {isVi 
                  ? "Bộ giải pháp API/SDK tích hợp dành cho cơ quan nhà nước và tổ chức giáo dục, cho phép phát hành số lượng lớn Verifiable Credentials (VC) chuẩn W3C có ký tên mật mã chỉ trong vài giây."
                  : "An institution-facing API suite enabling certified issuers to sign and securely publish W3C Verifiable Credentials with automated micro-trust registry validations."}
              </p>
            </div>

            {/* Tech Item 3 */}
            <div className="p-6 rounded-3xl border border-gray-150 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 hover:border-[#5B6CFF]/30 dark:hover:border-[#7C8CFF]/30 hover:shadow-xs transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center mb-4">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-950 dark:text-white mb-2 font-sans uppercase tracking-tight">
                {isVi ? "Bộ xác thực phi trạng thái (Stateless)" : "Stateless Verification Engine"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                {isVi 
                  ? "Cơ cấu xác minh danh tính trung gian phi tập trung, giải mã bằng chứng số từ xa chỉ trong tích tắc mà không lưu vết lịch sử giao dịch hay giữ lại hồ sơ người dùng."
                  : "Fast-executing verification pipelines designed to instantly authenticate digital presentations on-the-fly without collecting, parsing, or caching personal consumer attributes."}
              </p>
            </div>

            {/* Tech Item 4 */}
            <div className="p-6 rounded-3xl border border-gray-150 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/50 hover:border-[#5B6CFF]/30 dark:hover:border-[#7C8CFF]/30 hover:shadow-xs transition-all duration-300">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-[#FF8A5B] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-950 dark:text-white mb-2 font-sans uppercase tracking-tight">
                {isVi ? "Mật mã bằng chứng không tri thức (ZKP)" : "Zero-Knowledge Infrastructure"}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                {isVi 
                  ? "Hạ tầng sử dụng giải thuật Groth16 Snark giúp chứng minh các thông tin phức tạp (vượt tuổi, có quốc tịch, sở hữu số dư) mà không cần tiết lộ chính xác số tuổi hoặc dữ liệu thô."
                  : "A cutting-edge crypto-engine utilizing Groth16 SNARK logic, proving age thresholds, memberships, or balances without dispatching raw values."}
              </p>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="mb-16 text-left">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            {isVi ? "Giá trị cốt lõi của chúng tôi" : "Our Core Values"}
          </h2>
          <p className="text-xs.5 sm:text-sm text-slate-400 dark:text-slate-500 max-w-2xl mb-8 leading-relaxed font-normal">
            {isVi 
              ? "Chúng tôi xây dựng mọi sản phẩm và dịch vụ dựa trên bốn giá trị cốt lõi — là kim chỉ nam trong mọi quyết định và hành động."
              : "We build all virtual products and services under four fundamental core values, directing every operational blueprint and design choice."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Core Value 1 */}
            <div className="p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:border-[#5B6CFF]/30 dark:hover:border-[#7C8CFF]/30 hover:shadow-md transition-all duration-300">
              <h3 className="text-sm.5 sm:text-base font-bold text-slate-950 dark:text-white mb-3 flex items-center gap-2 font-sans">
                <span className="w-1.5 h-4 bg-blue-500 rounded-full inline-block"></span>
                {isVi ? "Quyền riêng tư đặt người dùng lên hàng đầu" : "User Privacy First"}
              </h3>
              <p className="text-xs.5 sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                {isVi 
                  ? "Chúng tôi cam kết dữ liệu cá nhân là tài sản riêng tư và thiêng liêng. SSI Wallet được thiết kế để người dùng toàn quyền kiểm soát danh tính và dữ liệu của mình, không ai có thể theo dõi hay khai thác khi chưa được phép."
                  : "We commit that personal data is a completely private and sacred asset. SSI Wallet is purposefully designed so that users hold absolute control over their identity attributes, securing elements from unauthorized access."}
              </p>
            </div>

            {/* Core Value 2 */}
            <div className="p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:border-[#5B6CFF]/30 dark:hover:border-[#7C8CFF]/30 hover:shadow-md transition-all duration-300">
              <h3 className="text-sm.5 sm:text-base font-bold text-slate-950 dark:text-white mb-3 flex items-center gap-2 font-sans">
                <span className="w-1.5 h-4 bg-teal-500 rounded-full inline-block"></span>
                {isVi ? "Minh bạch trong mọi hoạt động" : "Transparency in Actions"}
              </h3>
              <p className="text-xs.5 sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                {isVi 
                  ? "Chúng tôi cam kết minh bạch về công nghệ, chính sách và cách thức vận hành. Mọi quy trình xác minh, lưu trữ và chia sẻ thông tin đều rõ ràng, có thể kiểm chứng và luôn đặt lợi ích người dùng làm trung tâm."
                  : "We pledge full visibility regarding underlying tech stacks, framework guidelines, and operations. Every transmission and proof generation path is clear, auditable, and focuses solely on user benefits."}
              </p>
            </div>

            {/* Core Value 3 */}
            <div className="p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:border-[#5B6CFF]/30 dark:hover:border-[#7C8CFF]/30 hover:shadow-md transition-all duration-300">
              <h3 className="text-sm.5 sm:text-base font-bold text-slate-950 dark:text-white mb-3 flex items-center gap-2 font-sans">
                <span className="w-1.5 h-4 bg-indigo-500 rounded-full inline-block"></span>
                {isVi ? "Đổi mới để tạo ra giá trị thực" : "Innovation for True Value"}
              </h3>
              <p className="text-xs.5 sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                {isVi 
                  ? "Chúng tôi không ngừng nghiên cứu và ứng dụng các công nghệ tiên tiến như blockchain, mật mã học và xác thực phi tập trung để giải quyết những bài toán thực tế trong quản lý danh tính số."
                  : "We continuously look into innovative methodologies, blending standard distributed ledgers, Zero-Knowledge algebra, and sovereign key management to solve critical modern digital identity challenges."}
              </p>
            </div>

            {/* Core Value 4 */}
            <div className="p-6 sm:p-8 rounded-3xl border border-[#E5E7EB] dark:border-slate-800/80 bg-white dark:bg-slate-900 hover:border-[#5B6CFF]/30 dark:hover:border-[#7C8CFF]/30 hover:shadow-md transition-all duration-300">
              <h3 className="text-sm.5 sm:text-base font-bold text-slate-950 dark:text-white mb-3 flex items-center gap-2 font-sans">
                <span className="w-1.5 h-4 bg-rose-500 rounded-full inline-block"></span>
                {isVi ? "Trao quyền cho cộng đồng" : "Empowering the Community"}
              </h3>
              <p className="text-xs.5 sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                {isVi 
                  ? "Chúng tôi xây dựng một hệ sinh thái mở, nơi mỗi cá nhân và tổ chức đều có thể tham gia, đóng góp và hưởng lợi từ các giải pháp đánh dấu bước chuyển mình của kỷ nguyên Web3."
                  : "We foster a collaborative global ecosystem, allowing developers and companies to implement, contribute, and tap into standards signaling a transition towards absolute digital sovereignty."}
              </p>
            </div>
          </div>
        </div>

        {/* Our Journey Section */}
        <div className="mb-16 text-left">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
            {isVi ? "Hành trình của chúng tôi" : "Our Journey"}
          </h2>
          <p className="text-xs.5 sm:text-sm text-slate-400 dark:text-slate-500 max-w-2xl mb-12 leading-relaxed font-normal">
            {isVi 
              ? "Từ một ý tưởng đơn giản: \"Mọi người xứng đáng được sở hữu danh tính số của chính mình\", SSI Wallet đã không ngừng phát triển, vượt qua nhiều thử thách để trở thành nền tảng đáng tin cậy."
              : "Originating from a single motto: \"Every living soul has the right to own their private credentials\", our framework continues growing organically, helping scale internet security."}
          </p>

          <div className="relative pt-4">
            <div className="hidden md:block absolute left-4 right-4 top-[44px] h-[2px] bg-[#E5E7EB] dark:bg-slate-800" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {/* Step 1: 2021 */}
              <div className="relative pl-8 md:pl-0 group">
                <div className="md:hidden absolute left-[15px] top-8 bottom-0 w-[2px] bg-[#E5E7EB] dark:bg-slate-800" />
                <div className="absolute left-0 md:left-auto md:relative top-0 md:top-auto w-8 h-8 rounded-full border-4 border-white dark:border-[#0B0F1A] bg-blue-500 text-white flex items-center justify-center shadow-xs mb-4 transition-transform group-hover:scale-110">
                  <Calendar className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-black text-[#5B6CFF] dark:text-[#7C8CFF] block mb-1">2022</span>
                <h4 className="text-xs.5 sm:text-sm font-bold text-slate-950 dark:text-white mb-1.5 group-hover:text-blue-500 transition-colors font-sans">
                  {isVi ? "Khởi đầu" : "Inception"}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  {isVi 
                    ? "Ý tưởng về một giải pháp định danh phi tập trung ra đời." 
                    : "The raw design spaces around self-sovereign cryptographic registers is drafted."}
                </p>
              </div>

              {/* Step 2: 2022 */}
              <div className="relative pl-8 md:pl-0 group">
                <div className="md:hidden absolute left-[15px] top-8 bottom-0 w-[2px] bg-[#E5E7EB] dark:bg-slate-800" />
                <div className="absolute left-0 md:left-auto md:relative top-0 md:top-auto w-8 h-8 rounded-full border-4 border-white dark:border-[#0B0F1A] bg-teal-500 text-white flex items-center justify-center shadow-xs mb-4 transition-transform group-hover:scale-110">
                  <Code2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-black text-teal-500 block mb-1">2023</span>
                <h4 className="text-xs.5 sm:text-sm font-bold text-slate-950 dark:text-white mb-1.5 group-hover:text-teal-500 transition-colors font-sans">
                  {isVi ? "Đặt nền móng" : "Laying the foundation"}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  {isVi 
                    ? "Xây dựng ý tưởng mô hình SSI phù hợp với bối cảnh Việt Nam." 
                    : "Developing a SSI model concept suitable for the Vietnamese context."}
                </p>
              </div>

              {/* Step 3: 2023 */}
              <div className="relative pl-8 md:pl-0 group">
                <div className="md:hidden absolute left-[15px] top-8 bottom-0 w-[2px] bg-[#E5E7EB] dark:bg-slate-800" />
                <div className="absolute left-0 md:left-auto md:relative top-0 md:top-auto w-8 h-8 rounded-full border-4 border-white dark:border-[#0B0F1A] bg-indigo-500 text-white flex items-center justify-center shadow-xs mb-4 transition-transform group-hover:scale-110">
                  <Rocket className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-black text-indigo-500 block mb-1">2026</span>
                <h4 className="text-xs.5 sm:text-sm font-bold text-slate-950 dark:text-white mb-1.5 group-hover:text-indigo-500 transition-colors font-sans">
                  {isVi ? "Nghiên cứu & phát triển" : "Research and development"}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  {isVi 
                    ? "Những phiên bản thử nghiệm đầu tiên được xây dựng cùng với tài liệu API/SDK được đưa vào thử nghiệm." 
                    : "The first test versions were built along with the API/SDK documentation that was put into testing."}
                </p>
              </div>

              {/* Step 4: 2027 */}
              <div className="relative pl-8 md:pl-0 group">
                <div className="absolute left-0 md:left-auto md:relative top-0 md:top-auto w-8 h-8 rounded-full border-4 border-white dark:border-[#0B0F1A] bg-rose-500 text-white flex items-center justify-center shadow-xs mb-4 transition-transform group-hover:scale-110">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-black text-rose-500 block mb-1">2027</span>
                <h4 className="text-xs.5 sm:text-sm font-bold text-slate-950 dark:text-white mb-1.5 group-hover:text-rose-500 transition-colors font-sans">
                  {isVi ? "Ra mắt" : "Launch"}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  {isVi 
                    ? "SSI Wallet chính thức được ra mắt và đón nhận cộng đồng người dùng đầu tiên." 
                    : "Officially unveiling the safe mobile app, driving digital credentials verification for home enrollees."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Build Identra / Why SSI Section (Redesigned for superior responsive layout and perfect balance) */}
        <div id="why-build-identra" className="border-t border-[#E5E7EB] dark:border-slate-850 pt-16 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Title and Intro */}
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF] bg-[#5B6CFF]/8 px-3 py-1 rounded-full border border-[#5B6CFF]/10">
                <span>{isVi ? "Tầm nhìn cốt lõi" : "Core Vision"}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                {isVi ? "Tại sao xây dựng Identra?" : "Why Build Identra?"}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                {isVi 
                  ? "Chúng tôi nhận thấy các hệ thống danh tính truyền thống còn nhiều hạn chế: dễ bị rò rỉ dữ liệu, thiếu minh bạch và người dùng không có quyền kiểm soát. Identra ra đời để giải quyết những vấn đề đó bằng cách mang đến một nền tảng danh tính số phi tập trung, an toàn, minh bạch."
                  : "Traditional frameworks harbor severe, persistent trade-offs: massive cloud leaks, lack of process transparency, and complete loss of individual ownership. Identra launches to change this landscape, producing an elegant, decentralized, cryptographically sound trust ecosystem."}
              </p>
            </div>

            {/* Right Column: 4 grid blocks */}
            <div className="lg:col-span-7 col-span-1 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Check 1 */}
              <div className="flex flex-col justify-between bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-gray-150 dark:border-slate-800 hover:border-[#5B6CFF]/30 dark:hover:border-[#7C8CFF]/30 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                    <Shield className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {isVi ? "1. Vấn đề hiện tại" : "1. Current Problem"}
                  </h3>
                </div>
                <p className="text-xs.5 text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  {isVi 
                    ? "Danh tính số tập trung tiềm ẩn rủi ro rò rỉ dữ liệu cao, chia sẻ không mong muốn và bên thứ ba khai thác thông tin cá nhân mà không được kiểm soát." 
                    : "Centralized identities carry severe breach risks, unauthorized selling, and persistent exposure of raw personal values without your consent."}
                </p>
              </div>

              {/* Check 2 */}
              <div className="flex flex-col justify-between bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-gray-150 dark:border-slate-800 hover:border-[#5B6CFF]/30 dark:hover:border-[#7C8CFF]/30 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                    <Key className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {isVi ? "2. Giải pháp của chúng tôi" : "2. Our Solution"}
                  </h3>
                </div>
                <p className="text-xs.5 text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  {isVi 
                    ? "Thiết lập mô hình danh tính tự chủ chuẩn W3C trên blockchain giúp loại bỏ máy chủ trung gian, bảo mật trực tiếp trên thiết bị cá nhân." 
                    : "Leveraging official W3C standards and ledger anchors to fully bypass intermediaries, storing and proving everything securely on device."}
                </p>
              </div>

              {/* Check 3 */}
              <div className="flex flex-col justify-between bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-gray-150 dark:border-slate-800 hover:border-[#5B6CFF]/30 dark:hover:border-[#7C8CFF]/30 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/10 text-teal-500 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {isVi ? "3. Tác động mang lại" : "3. Immediate Impact"}
                  </h3>
                </div>
                <p className="text-xs.5 text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  {isVi 
                    ? "Người dùng kiểm soát hoàn toàn quyền chia sẻ, doanh nghiệp giảm chi phí vận hành và lưu trữ, tối ưu hóa niềm tin số giữa các bên." 
                    : "Empowers consumer sharing control, slashes company overhead on compliance database tracking, and maximizes native mutual reliability."}
                </p>
              </div>

              {/* Check 4 */}
              <div className="flex flex-col justify-between bg-white dark:bg-slate-900/60 p-6 rounded-2xl border border-gray-150 dark:border-slate-800 hover:border-[#5B6CFF]/30 dark:hover:border-[#7C8CFF]/30 hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-[#FF8A5B] flex items-center justify-center shrink-0">
                    <Rocket className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {isVi ? "4. Tầm nhìn dài hạn" : "4. Future Outlook"}
                  </h3>
                </div>
                <p className="text-xs.5 text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  {isVi 
                    ? "Kiến tạo hệ sinh thái mở liên kết dịch vụ xác thực liền mạch, đưa danh tính phi tập trung thành chuẩn mực của kỷ nguyên Web3." 
                    : "Fostering standard networks to bridge verified services smoothly, cementing sovereign authentication standards globally."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Meet Our Team Section (Highly requested to enrich subpage content value) */}
        <div className="border-t border-[#E5E7EB] dark:border-slate-850 pt-16 text-left">
          <div className="flex flex-col space-y-4 mb-10">
            <div className="inline-flex items-center gap-1.5 self-start text-xs font-bold uppercase tracking-widest text-[#5B6CFF] dark:text-[#7C8CFF] bg-[#5B6CFF]/8 px-3.5 py-1.5 rounded-full border border-[#5B6CFF]/10">
              <Award className="w-3.5 h-3.5" />
              <span>{isVi ? "Ban điều hành & Chuyên gia" : "Founders & Visionaries"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {isVi ? "Đội ngũ tiên phong tại Identra" : "The Core Team Behind Identra"}
            </h2>
            <p className="text-xs.5 sm:text-sm text-slate-400 dark:text-slate-500 max-w-2xl leading-relaxed font-normal">
              {isVi 
                ? "Chúng tôi là tập hợp những con người nhiệt huyết, kết nối bởi tầm nhìn mang lại quyền tự chủ số thực sự cho mọi cá nhân trên Internet."
                : "We are a dedicated group of engineers, cryptographers, and design thinkers united by the mission to return absolute digital sovereignty to the internet."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Team Member 1 */}
            <div className="group p-5 rounded-2xl border border-gray-150 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <span className="text-lg font-black font-mono">T</span>
              </div>
              <h3 className="text-sm.5 font-bold text-slate-950 dark:text-white group-hover:text-[#5B6CFF] transition-colors duration-200">
                Nguyễn Minh Trí
              </h3>
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1 mb-3">
                {isVi ? "Đồng Sáng Lập & Kiến Trúc Sư Trưởng" : "Co-Founder & Chief Architect"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed">
                {isVi 
                  ? "Cựu kỹ sư trưởng hệ thống bảo mật phân tác tại các tập đoàn lớn, có hơn 12 năm xây dựng hạ tầng SSI và truyền thông tin cậy."
                  : "Over 12 years of designing secure peer-to-peer registries, guiding protocol layouts, and pioneering sovereign standards."}
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="group p-5 rounded-2xl border border-gray-150 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-teal-500/10 text-teal-500 flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <span className="text-lg font-black font-mono">E</span>
              </div>
              <h3 className="text-sm.5 font-bold text-slate-950 dark:text-white group-hover:text-teal-500 transition-colors duration-200">
                Dr. Elena Rostova
              </h3>
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1 mb-3">
                {isVi ? "Giám Đốc Mật Mã Học" : "Head of Cryptography"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed">
                {isVi 
                  ? "Tiến sĩ Mật mã học từ học viện uy tín thế giới, chuyên sâu các đề tài Zero-Knowledge Proofs và mã hóa bất đối xứng đa phân vùng."
                  : "Academic researcher specializing in interactive and non-interactive zero-knowledge schemas, structuring robust credential shields."}
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="group p-5 rounded-2xl border border-gray-150 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <span className="text-lg font-black font-mono">N</span>
              </div>
              <h3 className="text-sm.5 font-bold text-slate-950 dark:text-white group-hover:text-purple-500 transition-colors duration-200">
                Lê Hoàng Nam
              </h3>
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1 mb-3">
                {isVi ? "Giám Đốc Kỹ Thuật" : "Director of Engineering"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed">
                {isVi 
                  ? "Hơn 10 năm kinh nghiệm vận hành ngân hàng số và cổng thanh toán quốc gia, thiết lập tiêu chuẩn phòng hộ hệ thống nghiêm ngặt nhất."
                  : "Former fintech infrastructure lead, dedicated to hardening system security, strict sandboxing, and high-performance throughput."}
              </p>
            </div>

            {/* Team Member 4 */}
            <div className="group p-5 rounded-2xl border border-gray-150 dark:border-slate-800 bg-white/50 dark:bg-slate-900/30 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-orange-500/10 text-orange-550 flex items-center justify-center mb-4 transition-transform group-hover:scale-105">
                <span className="text-lg font-black font-mono">S</span>
              </div>
              <h3 className="text-sm.5 font-bold text-slate-950 dark:text-white group-hover:text-[#FF8A5B] transition-colors duration-200">
                Trần Minh Thư
              </h3>
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1 mb-3">
                {isVi ? "Trưởng Thiết Kế Sản Phẩm & UX" : "UX & Product Lead Designer"}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-450 leading-relaxed">
                {isVi 
                  ? "Nhà thiết kế sản phẩm tài năng, biến các quy trình xác thực mã hóa phức tạp trở thành trải nghiệm mượt mà, dễ dùng chỉ với vài cú chạm."
                  : "Translates abstract algebraic equations and credentials workflows into accessible, clean, and gorgeous citizen interfaces."}
              </p>
            </div>
          </div>
        </div>

        {/* Careers Call to action section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 mt-12 text-center">
          <div className="bg-[#3B52FF]/5 dark:bg-[#3B52FF]/10 rounded-3xl p-8 border border-[#3B52FF]/10 max-w-4xl mx-auto space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {isVi ? "Muốn đồng hành cùng chúng tôi?" : "Want to join our quest?"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
              {isVi 
                ? "Chúng tôi luôn tìm kiếm những kỹ sư, nhà mật mã học và tài năng xuất sắc để cùng xây dựng tương lai định danh số tự chủ."
                : "We are always hunting for world-class engineers, cryptographers, and creative minds to co-build decentralized identity protocols."}
            </p>
            <button
              onClick={() => onNavigate?.('careers')}
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-[#3B52FF] hover:bg-[#2B42EF] text-white text-xs font-black transition-all cursor-pointer shadow-md shadow-[#3B52FF]/15 border-none outline-none"
            >
              <span>{isVi ? "Xem các vị trí đang tuyển dụng →" : "Explore Open Careers →"}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
