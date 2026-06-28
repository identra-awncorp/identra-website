import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  Share2, 
  CheckCircle, 
  User, 
  X, 
  Wallet, 
  FileText, 
  Lock, 
  Info,
  Layers,
  KeyRound,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Database,
  Cpu,
  RefreshCw,
  Award
} from 'lucide-react';

interface InteractiveDemoProps {
  isOpen: boolean;
  onClose: () => void;
  lang: 'vi' | 'en';
  initialMode?: 'demo' | 'wallet';
}

interface CredentialField {
  key: string;
  label: string;
  value: string;
  originalValue: string;
  maskedValue: string;
  isShared: boolean;
  zkp?: boolean; // Zero knowledge proof compatible
  zkpLabel?: string;
  zkpValue?: string;
  isZkpEnabled?: boolean;
}

interface Credential {
  id: string;
  type: 'citizen_id' | 'drivers_license' | 'academic_degree';
  title: string;
  issuerName: string;
  issuerDid: string;
  color: string;
  gradient: string;
  fields: CredentialField[];
}

export default function InteractiveDemo({ isOpen, onClose, lang, initialMode = 'demo' }: InteractiveDemoProps) {
  const isVi = lang === 'vi';
  const [activeTab, setActiveTab] = useState<'issuer' | 'wallet' | 'verifier'>('issuer');
  
  // Issuance State
  const [issuerType, setIssuerType] = useState<'citizen_id' | 'drivers_license' | 'academic_degree'>('citizen_id');
  const [issueName, setIssueName] = useState('HOÀNG ANH TUẤN');
  const [issueDob, setIssueDob] = useState('12/03/2001');
  const [issueIdNum, setIssueIdNum] = useState('031024508931');
  const [issueExtraName, setIssueExtraName] = useState('B2 (Hạng thông thường)'); // Class for driver license
  const [issueExtraValue, setIssueExtraValue] = useState('Phương tiện dưới 9 chỗ');
  const [issueMajor, setIssueMajor] = useState('Khoa học Máy tính'); // for university
  const [issueCgpa, setIssueCgpa] = useState('8.45 / 10'); // for university
  const [issueUniversity, setIssueUniversity] = useState('ĐH Bách Khoa Hà Nội');

  // Multi-card credentials database state
  const [credentials, setCredentials] = useState<Credential[]>([
    {
      id: 'cred_citizen_id',
      type: 'citizen_id',
      title: 'CĂN CƯỚC CÔNG DÂN SỐ',
      issuerName: 'Cục Cảnh sát QLHC về TTXH',
      issuerDid: 'did:ssi:issuer:gov-ca-01',
      color: 'from-[#1E3A8A] to-[#3B82F6]',
      gradient: 'from-[#1E3A8A]/20 to-[#3B82F6]/5',
      fields: [
        { key: 'fullname', label: 'Họ và tên', value: 'XUÂN NGUYỄN HOÀNG', originalValue: 'XUÂN NGUYỄN HOÀNG', maskedValue: 'X*** N***** H****', isShared: true },
        { key: 'dob', label: 'Ngày sinh', value: '18/02/1998', originalValue: '18/02/1998', maskedValue: '**/**/1998', isShared: false, zkp: true, zkpLabel: 'Chứng minh trên 18 tuổi', zkpValue: 'Xác minh: Đủ điều kiện (> 18 tuổi)', isZkpEnabled: false },
        { key: 'idnumber', label: 'Số Căn cước công dân', value: '079098004561', originalValue: '079098004561', maskedValue: '079*********', isShared: false },
        { key: 'nationality', label: 'Quốc tịch', value: 'Việt Nam', originalValue: 'Việt Nam', maskedValue: 'V********', isShared: true },
      ]
    },
    {
      id: 'cred_drivers_license',
      type: 'drivers_license',
      title: 'GIẤY PHÉP LÁI XE SỐ',
      issuerName: 'Sở Giao thông Vận tải',
      issuerDid: 'did:ssi:issuer:transport-gov-vni',
      color: 'from-[#065F46] to-[#10B981]',
      gradient: 'from-[#065F46]/20 to-[#10B981]/5',
      fields: [
        { key: 'fullname', label: 'Họ và tên', value: 'XUÂN NGUYỄN HOÀNG', originalValue: 'XUÂN NGUYỄN HOÀNG', maskedValue: 'X*** N***** H****', isShared: true },
        { key: 'licensenumber', label: 'Số Giấy phép', value: '790248901245', originalValue: '790248901245', maskedValue: '790*********', isShared: false },
        { key: 'class', label: 'Hạng xe phép', value: 'Hạng B2', originalValue: 'Hạng B2', maskedValue: 'H*** B2', isShared: true },
        { key: 'expiry', label: 'Thời hạn đến', value: '25/12/2032', originalValue: '25/12/2032', maskedValue: '**/**/2032', isShared: false, zkp: true, zkpLabel: 'Kiểm định bằng còn hạn', zkpValue: 'Xác minh: Còn hiệu lực lưu thông', isZkpEnabled: false },
      ]
    }
  ]);

  const [selectedCredId, setSelectedCredId] = useState<string>('cred_citizen_id');
  const [successShared, setSuccessShared] = useState(false);
  const [copiedDID, setCopiedDID] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);

  // Advanced Provision simulation step states
  const [issueStep, setIssueStep] = useState<'idle' | 'checking' | 'signing' | 'saving' | 'done'>('idle');

  // Simulated User DID
  const userDID = "did:ssi:holder:z6MkuByJgG9CqC7c6a9X1q2V3y8m9p0W";

  const activeCredential = credentials.find(c => c.id === selectedCredId) || credentials[0];

  const handleCopyDID = () => {
    navigator.clipboard.writeText(userDID);
    setCopiedDID(true);
    setTimeout(() => setCopiedDID(false), 2000);
  };

  const handleCopyPayload = (payload: string) => {
    navigator.clipboard.writeText(payload);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  // Selective Disclosure toggles inside the current active card
  const toggleFieldShared = (fieldKey: string) => {
    setCredentials(credentials.map(cred => {
      if (cred.id === selectedCredId) {
        return {
          ...cred,
          fields: cred.fields.map(field => {
            if (field.key === fieldKey) {
              return { ...field, isShared: !field.isShared };
            }
            return field;
          })
        };
      }
      return cred;
    }));
    setSuccessShared(false);
  };

  // ZKP Activation toggle
  const toggleZkp = (fieldKey: string) => {
    setCredentials(credentials.map(cred => {
      if (cred.id === selectedCredId) {
        return {
          ...cred,
          fields: cred.fields.map(field => {
            if (field.key === fieldKey) {
              const nextZkp = !field.isZkpEnabled;
              return { 
                ...field, 
                isZkpEnabled: nextZkp,
                isShared: true // Auto disclose verified assertion
              };
            }
            return field;
          })
        };
      }
      return cred;
    }));
    setSuccessShared(false);
  };

  // Perform signing and issuing simulation
  const handleProceedIssue = () => {
    if (!issueName.trim()) return;

    setIssueStep('checking');
    
    // Simulate checking & alignment steps
    setTimeout(() => {
      setIssueStep('signing');
      
      setTimeout(() => {
        setIssueStep('saving');
        
        setTimeout(() => {
          // Construct fields dynamically based on the chosen template
          let newFields: CredentialField[] = [];
          let title = '';
          let issuerName = '';
          let issuerDid = '';
          let color = '';
          let gradient = '';
          let newId = 'cred_' + Date.now();

          if (issuerType === 'citizen_id') {
            title = 'CĂN CƯỚC CÔNG DÂN SỐ';
            issuerName = 'Cục Cảnh sát QLHC về TTXH';
            issuerDid = 'did:ssi:issuer:gov-ca-01';
            color = 'from-[#1E3A8A] to-[#3B82F6]';
            gradient = 'from-[#1E3A8A]/20 to-[#3B82F6]/5';
            newFields = [
              { key: 'fullname', label: 'Họ và tên', value: issueName.toUpperCase(), originalValue: issueName.toUpperCase(), maskedValue: 'H*** ' + 'A** ' + 'T***', isShared: true },
              { key: 'dob', label: 'Ngày sinh', value: issueDob, originalValue: issueDob, maskedValue: '**/**/' + issueDob.split('/')[2], isShared: false, zkp: true, zkpLabel: 'Chứng minh trên 18 tuổi', zkpValue: 'Xác minh: Đủ điều kiện (> 18 tuổi)', isZkpEnabled: false },
              { key: 'idnumber', label: 'Số Căn cước công dân', value: issueIdNum, originalValue: issueIdNum, maskedValue: issueIdNum.substring(0, 3) + '*********', isShared: false },
              { key: 'nationality', label: 'Quốc tịch', value: 'Việt Nam', originalValue: 'Việt Nam', maskedValue: 'V********', isShared: true }
            ];
          } else if (issuerType === 'drivers_license') {
            title = 'GIẤY PHÉP LÁI XE SỐ';
            issuerName = 'Sở Giao thông Vận tải';
            issuerDid = 'did:ssi:issuer:transport-gov-vni';
            color = 'from-[#065F46] to-[#10B981]';
            gradient = 'from-[#065F46]/20 to-[#10B981]/5';
            newFields = [
              { key: 'fullname', label: 'Họ và tên', value: issueName.toUpperCase(), originalValue: issueName.toUpperCase(), maskedValue: 'H*** ' + 'A** ' + 'T***', isShared: true },
              { key: 'licensenumber', label: 'Số Giấy phép', value: issueIdNum, originalValue: issueIdNum, maskedValue: issueIdNum.substring(0, 3) + '*********', isShared: false },
              { key: 'class', label: 'Hạng xe phép', value: issueExtraName, originalValue: issueExtraName, maskedValue: 'H*** **', isShared: true },
              { key: 'expiry', label: 'Thời hạn đến', value: '15/10/2034', originalValue: '15/10/2034', maskedValue: '**/**/2034', isShared: false, zkp: true, zkpLabel: 'Kiểm định bằng còn hạn', zkpValue: 'Xác minh: Còn hiệu lực lưu thông', isZkpEnabled: false }
            ];
          } else {
            title = 'VĂN BẰNG ĐẠI HỌC SỐ';
            issuerName = issueUniversity;
            issuerDid = 'did:ssi:issuer:education-gov-' + issueUniversity.toLowerCase().replace(/[\s.HNV]/g, '');
            color = 'from-[#701A75] to-[#D946EF]';
            gradient = 'from-[#701A75]/20 to-[#D946EF]/5';
            newFields = [
              { key: 'fullname', label: 'Họ và tên', value: issueName.toUpperCase(), originalValue: issueName.toUpperCase(), maskedValue: 'H*** ' + 'A** ' + 'T***', isShared: true },
              { key: 'university', label: 'Trường cấp phát', value: issueUniversity, originalValue: issueUniversity, maskedValue: 'Trường ĐH *********', isShared: true },
              { key: 'major', label: 'Ngành học', value: issueMajor, originalValue: issueMajor, maskedValue: 'Ngành *********', isShared: true },
              { key: 'cgpa', label: 'Xếp loại tốt nghiệp', value: issueCgpa, originalValue: issueCgpa, maskedValue: '*.* / 10', isShared: false, zkp: true, zkpLabel: 'Học lực >= Khá/Giỏi (8.0)', zkpValue: 'Xác minh: Đạt chuẩn CGPA Giỏi (>= 8.0)', isZkpEnabled: false }
            ];
          }

          const newCred: Credential = {
            id: newId,
            type: issuerType,
            title,
            issuerName,
            issuerDid,
            color,
            gradient,
            fields: newFields
          };

          setCredentials([newCred, ...credentials]);
          setSelectedCredId(newId);
          setIssueStep('done');
          setSuccessShared(false);
        }, 800);
      }, 800);
    }, 600);
  };

  const handleResetIssueForm = () => {
    setIssueStep('idle');
  };

  const requestVerify = () => {
    setActiveTab('verifier');
    setSuccessShared(true);
  };

  const resetAllDemoData = () => {
    setCredentials([
      {
        id: 'cred_citizen_id',
        type: 'citizen_id',
        title: 'CĂN CƯỚC CÔNG DÂN SỐ',
        issuerName: 'Cục Cảnh sát QLHC về TTXH',
        issuerDid: 'did:ssi:issuer:gov-ca-01',
        color: 'from-[#1E3A8A] to-[#3B82F6]',
        gradient: 'from-[#1E3A8A]/20 to-[#3B82F6]/5',
        fields: [
          { key: 'fullname', label: 'Họ và tên', value: 'XUÂN NGUYỄN HOÀNG', originalValue: 'XUÂN NGUYỄN HOÀNG', maskedValue: 'X*** N***** H****', isShared: true },
          { key: 'dob', label: 'Ngày sinh', value: '18/02/1998', originalValue: '18/02/1998', maskedValue: '**/**/1998', isShared: false, zkp: true, zkpLabel: 'Chứng minh trên 18 tuổi', zkpValue: 'Xác minh: Đủ điều kiện (> 18 tuổi)', isZkpEnabled: false },
          { key: 'idnumber', label: 'Số Căn cước công dân', value: '079098004561', originalValue: '079098004561', maskedValue: '079*********', isShared: false },
          { key: 'nationality', label: 'Quốc tịch', value: 'Việt Nam', originalValue: 'Việt Nam', maskedValue: 'V********', isShared: true },
        ]
      },
      {
        id: 'cred_drivers_license',
        type: 'drivers_license',
        title: 'GIẤY PHÉP LÁI XE SỐ',
        issuerName: 'Sở Giao thông Vận tải',
        issuerDid: 'did:ssi:issuer:transport-gov-vni',
        color: 'from-[#065F46] to-[#10B981]',
        gradient: 'from-[#065F46]/20 to-[#10B981]/5',
        fields: [
          { key: 'fullname', label: 'Họ và tên', value: 'XUÂN NGUYỄN HOÀNG', originalValue: 'XUÂN NGUYỄN HOÀNG', maskedValue: 'X*** N***** H****', isShared: true },
          { key: 'licensenumber', label: 'Số Giấy phép', value: '790248901245', originalValue: '790248901245', maskedValue: '790*********', isShared: false },
          { key: 'class', label: 'Hạng xe phép', value: 'Hạng B2', originalValue: 'Hạng B2', maskedValue: 'H*** B2', isShared: true },
          { key: 'expiry', label: 'Thời hạn đến', value: '25/12/2032', originalValue: '25/12/2032', maskedValue: '**/**/2032', isShared: false, zkp: true, zkpLabel: 'Kiểm định bằng còn hạn', zkpValue: 'Xác minh: Còn hiệu lực lưu thông', isZkpEnabled: false },
        ]
      }
    ]);
    setSelectedCredId('cred_citizen_id');
    setSuccessShared(false);
    setActiveTab('issuer');
    setIssueStep('idle');
    setIssuerType('citizen_id');
    setIssueName('HOÀNG ANH TUẤN');
    setIssueDob('12/03/2001');
    setIssueIdNum('031024508931');
    setIssueExtraName('B2 (Hạng thông thường)');
    setIssueExtraValue('Phương tiện dưới 9 chỗ');
    setIssueMajor('Khoa học Máy tính');
    setIssueCgpa('8.45 / 10');
    setIssueUniversity('ĐH Bách Khoa Hà Nội');
  };

  // Constructing mock JSON payload to display in Verifier terminal code block
  const getMockPresentationJSON = () => {
    const activeFields = activeCredential.fields.filter(f => f.isShared);
    const disclosedObj = activeFields.reduce((acc, field) => {
      acc[field.key] = (field.zkp && field.isZkpEnabled) ? { "zkProof": "valid", "constraint": field.zkpLabel, "assertion": field.zkpValue } : field.value;
      return acc;
    }, {} as Record<string, any>);

    return JSON.stringify({
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://schema.org"
      ],
      "type": ["VerifiablePresentation"],
      "verifiableCredential": {
        "id": `urn:uuid:${activeCredential.id}`,
        "type": ["VerifiableCredential", activeCredential.type.toUpperCase() + "_SCHEMA"],
        "issuer": activeCredential.issuerDid,
        "issuanceDate": "2026-05-25T15:00:00Z",
        "credentialSubject": {
          "id": userDID,
          ...disclosedObj
        },
        "proof": {
          "type": "Ed25519Signature2020",
          "created": "2026-05-25T15:10:00Z",
          "verificationMethod": `${activeCredential.issuerDid}#key-1`,
          "proofPurpose": "assertionMethod",
          "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..f8kS_p2A1..."
        }
      }
    }, null, 2);
  };

  const getLeftColumnInstructions = () => {
    switch (activeTab) {
      case 'issuer':
        return (
          <>
            <div className="flex items-center gap-2 mb-4">
              <span className="p-1 px-2 text-[10px] font-bold tracking-wider uppercase bg-teal-500/25 border border-teal-500/20 text-teal-400 rounded-md">
                {isVi ? 'Vai trò 1' : 'Role 1'}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8F9BFF]">
                {isVi ? 'Nhà Cấp Phát (Issuer)' : 'Issuer'}
              </span>
            </div>
            
            <h3 className="text-xl md:text-2xl font-black mb-3 tracking-tight">
              {isVi ? 'Ký số & Cấp Chứng chỉ' : 'Digitally Sign & Issue'}
            </h3>
            <p className="text-xs leading-relaxed text-gray-300 mb-5">
              {isVi 
                ? 'Để bắt đầu, bạn hãy nhập vai là một Tổ chức kiểm soát nguồn dữ liệu chính thức (Cục QLHC Dân cư, Sở Giao thông, hay ĐH danh tiếng).' 
                : 'To start, act as an official organization (e.g., Police Department, Bureau of Transport, or a highly accredited University).'}
            </p>
            
            <div className="space-y-4 text-xs font-sans">
              <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                <span className="font-semibold block text-gray-200 mb-1">
                  {isVi ? 'Mã hóa bất biến:' : 'Immutable Encryption:'}
                </span>
                <p className="text-gray-400 leading-normal">
                  {isVi 
                    ? 'Dữ liệu phát hành sẽ được băm mã toán học, bọc bằng chữ ký bảo mật ECDSA của tổ chức phát hành và bơm an toàn vào thiết bị cá nhân của bạn.' 
                    : 'The issued records are cryptographically hashed, wrapped in an ECDSA digital signature, and securely provisioned onto your mobile device.'}
                </p>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-5.5 h-5.5 rounded-full bg-[#5B6CFF]/20 text-[#8F9BFF] text-xs font-bold shrink-0 mt-0.5">1</div>
                <p className="text-gray-400">
                  {isVi ? 'Chọn 1 trong 3 loại biểu mẫu chứng thư số mẫu.' : 'Select 1 of the 3 mock credential templates.'}
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-5.5 h-5.5 rounded-full bg-[#5B6CFF]/20 text-[#8F9BFF] text-xs font-bold shrink-0 mt-0.5">2</div>
                <p className="text-gray-400">
                  {isVi ? 'Điền thông tin và ấn nút phát hành liên kết tức thì.' : 'Complete the assertion parameters and trigger immediate signing.'}
                </p>
              </div>
            </div>
          </>
        );
      case 'wallet':
        return (
          <>
            <div className="flex items-center gap-2 mb-4">
              <span className="p-1 px-2 text-[10px] font-bold tracking-wider uppercase bg-blue-500/25 border border-blue-500/20 text-blue-400 rounded-md">
                {isVi ? 'Vai trò 2' : 'Role 2'}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8F9BFF]">
                {isVi ? 'Chủ sở hữu (Holder / Wallet)' : 'Holder / Wallet'}
              </span>
            </div>
            
            <h3 className="text-xl md:text-2xl font-black mb-3 tracking-tight text-white">
              {isVi ? 'Quản lý Ví an toàn' : 'Secure Wallet Locker'}
            </h3>
            <p className="text-xs leading-relaxed text-gray-300 mb-5">
              {isVi 
                ? 'Bạn đang nắm giữ bộ khóa thiết bị bảo mật. Ví thu nhận tất cả chứng chỉ W3C. Không có cơ sở dữ liệu trung tâm nào kiểm soát dữ liệu gốc này.' 
                : 'You hold the sovereign private keys. The app hosts the credentials conformant to W3C standards with no central tracker storage.'}
            </p>
            
            <div className="space-y-4 text-xs font-sans">
              <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                <span className="font-semibold block text-gray-200 mb-1">
                  {isVi ? 'Quyền quyết định chia sẻ:' : 'Decentralized Sovereignty:'}
                </span>
                <p className="text-gray-400 leading-normal">
                  {isVi 
                    ? 'Chỉ bật các trường dữ liệu thực cần thiết. Với ngày sinh hoặc học lực, hãy thử bật nút **ZKP (Zero-Knowledge Proof)** để giải câu đố mật mã chứng thực mà hoàn toàn ẩn giấu số thô nhạy cảm!' 
                    : 'Disclose only what is required. For sensitive date/grade parameters, turn on the **ZKP (Zero-Knowledge Proof)** switch to assert eligibility mathematically!'}
                </p>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#5B6CFF]/20 text-[#8F9BFF] text-xs font-bold shrink-0">1</div>
                <p className="text-gray-400">
                  {isVi ? 'Click chọn tấm thẻ mong muốn đối soát trên khay.' : 'Select the credential card you want to configure on the tray.'}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#5B6CFF]/20 text-[#8F9BFF] text-xs font-bold shrink-0">2</div>
                <p className="text-gray-400">
                  {isVi ? 'Bật/tắt thanh gạt chia sẻ hoặc ZKP và nhấn gửi đi.' : 'Toggle selective exposure or ZKP assertions, then click verify.'}
                </p>
              </div>
            </div>
          </>
        );
      case 'verifier':
        return (
          <>
            <div className="flex items-center gap-2 mb-4">
              <span className="p-1 px-2 text-[10px] font-bold tracking-wider uppercase bg-indigo-500/25 border border-indigo-500/20 text-indigo-400 rounded-md">
                {isVi ? 'Vai trò 3' : 'Role 3'}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8F9BFF]">
                {isVi ? 'Nhà Kiểm Kiểm Định (Verifier)' : 'Verifier'}
              </span>
            </div>
            
            <h3 className="text-xl md:text-2xl font-black mb-3 tracking-tight">
              {isVi ? 'Đối soát & Thẩm chứng' : 'Audit & Verification'}
            </h3>
            <p className="text-xs leading-relaxed text-gray-300 mb-5">
              {isVi 
                ? 'Bạn đang trong vai trò của một Dịch vụ bên ngoài (Ngân hàng, Sân bay, Tuyển dụng) nhận dữ liệu từ Holder.' 
                : 'Act as a third-party Relying Party (Service Provider, Bank, Airport gating) requesting proof presentations.'}
            </p>
            
            <div className="space-y-3.5 text-xs font-sans">
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-lg">
                <span className="font-semibold block text-emerald-400 mb-0.5">
                  {isVi ? 'Xác minh chữ ký số tức thời:' : 'Instant Digital Signature Verification:'}
                </span>
                <p className="text-gray-300 leading-normal">
                  {isVi 
                    ? 'Hệ thống không liên lạc với cơ sở dữ liệu gốc để đối soát; kiểm định thuần túy dựa vào thuật toán mật mã học bằng khóa công khai (Public Key) đối ứng.' 
                    : 'The verifier audits integrity without touching a central database, evaluating the signature mathematically using the public key.'}
                </p>
              </div>
              
              <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                <span className="font-semibold block text-[#8F9BFF] mb-0.5">
                  {isVi ? 'Tiếp thu Zero Knowledge Proof:' : 'Evaluate Zero-Knowledge Proofs:'}
                </span>
                <p className="text-gray-400 leading-normal">
                  {isVi 
                    ? 'Đối soát mốc tuổi hay thứ hạng học văn bằng của bạn đã vượt qua ranh giới quy chuẩn bảo mật hoàn hảo. Hoàn toàn không lưu dấu dấu vân tay vật lý!' 
                    : 'Accepting boolean claims (e.g., age or validity limits) without processing underlying sensitive data. Zero metadata leaked!'}
                </p>
              </div>
            </div>
          </>
        );
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/50 dark:bg-black/80 backdrop-blur-md cursor-pointer"
    >
      <motion.div 
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-5xl bg-[#F7F8FC] dark:bg-[#0F172A] rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-[#334155]/60 flex flex-col md:flex-row h-[94vh] md:h-[680px] cursor-default"
      >
        {/* Header absolute close button */}
        <button 
          onClick={onClose}
          id="close-demo-btn"
          className="absolute top-4 right-4 z-30 p-2 rounded-full cursor-pointer hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          title="Đóng bảng Sandbox"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: Educational Sidebar Info Controls */}
        <div className="w-full md:w-[35%] p-6 md:p-8 bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white flex flex-col justify-between shrink-0 border-b md:border-b-0 md:border-r border-slate-800">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="p-1 px-1.5 rounded-lg bg-gradient-to-r from-[#5B6CFF] to-[#3B82F6] text-white">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-[13px] font-bold tracking-widest uppercase text-[#8F9BFF] font-mono">SSI TRUST TRIANGLE</span>
            </div>

            <div className="py-2">
              {getLeftColumnInstructions()}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-4">
            <button 
              onClick={resetAllDemoData}
              id="reset-demo-btn"
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-white cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {isVi ? 'Reset toàn bộ dữ liệu mẫu' : 'Reset Simulator Data'}
            </button>
            <span className="text-[9px] text-gray-500 font-mono">V_4.0 Sandbox Ready</span>
          </div>
        </div>

        {/* RIGHT COLUMN: The Interactive Device Core Emulator */}
        <div className="w-full md:w-[65%] flex flex-col h-full overflow-hidden bg-white dark:bg-[#070B14]">
          {/* Main Top Navigation Roles Map */}
          <div className="flex bg-gray-50/50 dark:bg-slate-900 px-4 md:px-6 pt-4 shrink-0 border-b border-gray-100 dark:border-slate-800/80">
            <button
              onClick={() => setActiveTab('issuer')}
              className={`pb-3.5 px-4 text-xs font-bold transition-all relative cursor-pointer flex items-center gap-2 ${
                activeTab === 'issuer' 
                  ? 'text-[#5B6CFF] dark:text-[#7C8CFF]' 
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0" />
              {isVi ? '1. Nhà Cấp Phát' : '1. Issuer'}
              {activeTab === 'issuer' && (
                <motion.div layoutId="sandbox-tab-line" className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#5B6CFF] dark:bg-[#7C8CFF] rounded-t-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('wallet')}
              className={`pb-3.5 px-4 text-xs font-bold transition-all relative cursor-pointer flex items-center gap-2 ${
                activeTab === 'wallet' 
                  ? 'text-[#5B6CFF] dark:text-[#7C8CFF]' 
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Wallet className="w-4 h-4 shrink-0" />
              {isVi ? '2. Ví của bạn (Holder)' : '2. Your Wallet (Holder)'}
              {activeTab === 'wallet' && (
                <motion.div layoutId="sandbox-tab-line" className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#5B6CFF] dark:bg-[#7C8CFF] rounded-t-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('verifier')}
              className={`pb-3.5 px-4 text-xs font-bold transition-all relative cursor-pointer flex items-center gap-2 ${
                activeTab === 'verifier' 
                  ? 'text-[#5B6CFF] dark:text-[#7C8CFF]' 
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              {isVi ? '3. Bên Xác Minh' : '3. Verifier'}
              {activeTab === 'verifier' && (
                <motion.div layoutId="sandbox-tab-line" className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#5B6CFF] dark:bg-[#7C8CFF] rounded-t-full" />
              )}
            </button>
          </div>

          {/* Sub Content View area with scroll */}
          <div className="flex-1 overflow-y-auto p-5 md:p-6 text-left flex flex-col justify-between">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: ISSUER UI */}
              {activeTab === 'issuer' && (
                <motion.div
                  key="tab-issuer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 w-full"
                >
                  <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-xl border border-gray-150 dark:border-slate-800">
                    <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2.5">
                      {isVi ? 'Chọn Biểu mẫu Chứng chỉ ban hành' : 'Select Credential Template to Issue'}
                    </h4>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => { setIssuerType('citizen_id'); setIssueDob('12/03/2001'); }}
                        className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                          issuerType === 'citizen_id'
                            ? 'bg-[#5B6CFF]/10 border-[#5B6CFF] text-[#5B6CFF] dark:text-[#7C8CFF] font-bold'
                            : 'bg-white dark:bg-[#111827]/40 border-gray-200 dark:border-slate-800 text-gray-500 dark:text-gray-400 text-xs'
                        }`}
                      >
                        <span className="block text-[11px] font-bold">{isVi ? 'Căn cước Công dân' : 'National ID'}</span>
                        <span className="text-[9px] opacity-75 mt-0.5 block">{isVi ? 'Bộ Công an cấp' : 'Gov Issued'}</span>
                      </button>

                      <button
                        onClick={() => { setIssuerType('drivers_license'); setIssueDob('20/07/1995'); }}
                        className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                          issuerType === 'drivers_license'
                            ? 'bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold'
                            : 'bg-white dark:bg-[#111827]/40 border-gray-200 dark:border-slate-800 text-gray-500 dark:text-gray-400 text-xs'
                        }`}
                      >
                        <span className="block text-[11px] font-bold">{isVi ? 'Giấy phép Lái xe' : "Driver's License"}</span>
                        <span className="text-[9px] opacity-75 mt-0.5 block">{isVi ? 'Sở Giao thông VT' : 'Dept of Transport'}</span>
                      </button>

                      <button
                        onClick={() => { setIssuerType('academic_degree'); setIssueDob('18/02/1998'); }}
                        className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                          issuerType === 'academic_degree'
                            ? 'bg-purple-500/10 border-purple-500 text-purple-600 dark:text-purple-400 font-bold'
                            : 'bg-white dark:bg-[#111827]/40 border-gray-200 dark:border-slate-800 text-gray-500 dark:text-gray-400 text-xs'
                        }`}
                      >
                        <span className="block text-[11px] font-bold">{isVi ? 'Văn bằng Đại học' : 'University Degree'}</span>
                        <span className="text-[9px] opacity-75 mt-0.5 block">{isVi ? 'Trường Đại học cấp' : 'University Issued'}</span>
                      </button>
                    </div>
                  </div>

                  {issueStep === 'idle' ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3.5">
                        <div className="text-left">
                          <label className="block text-[10px] font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Họ và tên chủ thể hành</label>
                          <input 
                            type="text" 
                            value={issueName}
                            onChange={(e) => setIssueName(e.target.value)}
                            className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-[#161D30]/60 text-gray-900 dark:text-white"
                          />
                        </div>
                        <div className="text-left">
                          <label className="block text-[10px] font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Ngày tháng năm sinh</label>
                          <input 
                            type="text" 
                            value={issueDob}
                            onChange={(e) => setIssueDob(e.target.value)}
                            className="w-full px-3 py-2 text-xs font-semibold font-mono rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-[#161D30]/60 text-gray-900 dark:text-white"
                            placeholder="DD/MM/YYYY"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3.5">
                        <div className="text-left">
                          <label className="block text-[10px] font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">
                            {issuerType === 'citizen_id' && 'Số Căn cước công dân'}
                            {issuerType === 'drivers_license' && 'Số Giấy phép Lái xe'}
                            {issuerType === 'academic_degree' && 'Tên Cơ sở Đào tạo'}
                          </label>
                          {issuerType === 'academic_degree' ? (
                            <select 
                              value={issueUniversity}
                              onChange={(e) => setIssueUniversity(e.target.value)}
                              className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-[#161D30]/60 text-gray-900 dark:text-white"
                            >
                              <option value="ĐH Bách Khoa Hà Nội">ĐH Bách Khoa Hà Nội</option>
                              <option value="ĐH Quốc gia TP.HCM">ĐH Quốc gia TP.HCM</option>
                              <option value="ĐH FPT Hà Nội">ĐH FPT Hà Nội</option>
                            </select>
                          ) : (
                            <input 
                              type="text" 
                              value={issueIdNum}
                              onChange={(e) => setIssueIdNum(e.target.value)}
                              className="w-full px-3 py-2 text-xs font-semibold font-mono rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-[#161D30]/60 text-gray-900 dark:text-white"
                            />
                          )}
                        </div>

                        <div className="text-left">
                          <label className="block text-[10px] font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">
                            {issuerType === 'citizen_id' && 'Quốc gia thường trú'}
                            {issuerType === 'drivers_license' && 'Hạng đăng kiểm lái'}
                            {issuerType === 'academic_degree' && 'Chuyên ngành học'}
                          </label>
                          {issuerType === 'citizen_id' && (
                            <input 
                              type="text" 
                              value="Việt Nam" 
                              disabled 
                              className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-gray-150 dark:border-slate-800/60 bg-gray-50 dark:bg-slate-900 text-gray-500 dark:text-gray-400"
                            />
                          )}
                          {issuerType === 'drivers_license' && (
                            <select 
                              value={issueExtraName}
                              onChange={(e) => setIssueExtraName(e.target.value)}
                              className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-[#161D30]/60 text-gray-900 dark:text-white"
                            >
                              <option value="Hạng B2 (Ô tô &lt;9 chỗ)">Hạng B2 (Ô tô &lt;9 chỗ)</option>
                              <option value="Hạng A1 (Mô tô &lt;175cc)">Hạng A1 (Mô tô &lt;175cc)</option>
                              <option value="Hạng C (Xe tải hạng nặng)">Hạng C (Xe tải hạng nặng)</option>
                            </select>
                          )}
                          {issuerType === 'academic_degree' && (
                            <input 
                              type="text" 
                              value={issueMajor}
                              onChange={(e) => setIssueMajor(e.target.value)}
                              className="w-full px-3 py-2 text-xs font-semibold rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-[#161D30]/60 text-gray-900 dark:text-white"
                            />
                          )}
                        </div>
                      </div>

                      {issuerType === 'academic_degree' && (
                        <div className="text-left">
                          <label className="block text-[10px] font-bold uppercase text-gray-500 dark:text-gray-400 mb-1">Học lực / Điểm số trung bình (CGPA)</label>
                          <input 
                            type="text" 
                            value={issueCgpa}
                            onChange={(e) => setIssueCgpa(e.target.value)}
                            className="w-full px-3 py-2 text-xs font-semibold font-mono rounded-lg border border-gray-200 dark:border-slate-800 bg-white dark:bg-[#161D30]/60 text-gray-900 dark:text-white"
                            placeholder="E.g. 8.45 / 10"
                          />
                        </div>
                      )}

                      <div className="pt-2">
                        <button
                          onClick={handleProceedIssue}
                          className="w-full py-3.5 bg-[#5B6CFF] hover:bg-[#4A5AF0] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-[#5B6CFF]/15 cursor-pointer flex items-center justify-center gap-2 transition-all"
                        >
                          <KeyRound className="w-4 h-4" />
                          Tiến hành Ký số & Phát hành về Ví
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="p-10 text-center bg-gray-50 dark:bg-slate-900/60 rounded-xl border border-dashed border-gray-255 dark:border-slate-800 flex flex-col items-center justify-center min-h-[300px]">
                      {issueStep === 'checking' && (
                        <div className="space-y-4">
                          <RefreshCw className="w-10 h-10 text-[#5B6CFF] animate-spin mx-auto" />
                          <div>
                            <h5 className="font-bold text-sm text-gray-800 dark:text-white">Kiểm tra tính vẹn toàn dữ liệu...</h5>
                            <p className="text-xs text-gray-400 mt-1">Đang đảm bảo các tham số hợp chuẩn W3C Claims schema.</p>
                          </div>
                        </div>
                      )}

                      {issueStep === 'signing' && (
                        <div className="space-y-4">
                          <Cpu className="w-10 h-10 text-teal-400 animate-pulse mx-auto" />
                          <div>
                            <h5 className="font-bold text-sm text-gray-800 dark:text-white">Ký số mã khóa bằng ECDSA...</h5>
                            <p className="text-xs text-gray-400 mt-1">Đóng gói băm SHA-256 chữ ký của cơ quan chủ quản vào chứng chỉ.</p>
                          </div>
                        </div>
                      )}

                      {issueStep === 'saving' && (
                        <div className="space-y-4">
                          <Database className="w-10 h-10 text-purple-400 animate-bounce mx-auto" />
                          <div>
                            <h5 className="font-bold text-sm text-gray-800 dark:text-white">Nạp gói vào Ví SSI...</h5>
                            <p className="text-xs text-gray-400 mt-1">Chuyển mã và bàn giao payload cho Ví của người dùng trên Sandbox.</p>
                          </div>
                        </div>
                      )}

                      {issueStep === 'done' && (
                        <div className="space-y-5">
                          <div className="w-14 h-14 bg-green-500/10 text-[#22C55E] rounded-full flex items-center justify-center mx-auto border border-green-500/20 shadow-sm">
                            <CheckCircle className="w-8 h-8" />
                          </div>
                          <div>
                            <h5 className="font-bold text-base text-gray-800 dark:text-white">Cấp phát Danh tính thành công!</h5>
                            <p className="text-xs text-gray-500 max-w-sm mt-1 mx-auto leading-relaxed">
                              Chứng chỉ số chứa chữ ký số của <strong>{issuerType === 'citizen_id' ? 'Cục QLHC' : issuerType === 'drivers_license' ? 'Sở GTVT' : issueUniversity}</strong> đã được nạp an toàn về Ví của bạn!
                            </p>
                          </div>

                          <div className="flex gap-3 justify-center pt-2">
                            <button
                              onClick={handleResetIssueForm}
                              className="px-4 py-2 border border-gray-200 dark:border-slate-800 hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-semibold cursor-pointer transition"
                            >
                              Tạo thêm thẻ khác
                            </button>
                            <button
                              onClick={() => setActiveTab('wallet')}
                              className="px-4 py-2 bg-gradient-to-r from-[#5B6CFF] to-[#3B82F6] text-white rounded-lg text-xs font-bold shadow-md cursor-pointer transition flex items-center gap-1.5"
                            >
                              Sang Tab Ví của bạn
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

              {/* TAB 2: HOLDER/WALLET UI */}
              {activeTab === 'wallet' && (
                <motion.div
                  key="tab-wallet"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 w-full"
                >
                  {/* Select card slider/strip inside wallet */}
                  <div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 text-left">
                      Danh sách thẻ số của bạn (Chọn 1 để cấu hình)
                    </h4>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {credentials.map((cred) => (
                        <button
                          key={cred.id}
                          onClick={() => { setSelectedCredId(cred.id); setSuccessShared(false); }}
                          className={`flex-1 min-w-[150px] p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                            selectedCredId === cred.id
                              ? 'bg-[#1E293B] border-slate-700 text-white shadow-md'
                              : 'bg-gray-50 hover:bg-gray-100 dark:bg-slate-900/60 border-gray-200 dark:border-slate-800 text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          <span className="block text-[11px] font-black tracking-wide truncate">{cred.title}</span>
                          <span className="text-[9px] opacity-75 truncate block mt-0.5">{cred.issuerName}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Holographic Credential Card Display */}
                  <div className={`relative rounded-2xl bg-gradient-to-r ${activeCredential.color} p-4 sm:p-5 text-white shadow-xl overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-10 -translate-y-10" />
                    <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-white/5 rounded-full" />
                    
                    <div className="flex justify-between items-start mb-4.5 z-10 relative">
                      <div>
                        <span className="text-[9px] font-bold tracking-widest uppercase bg-white/20 p-1 px-2.5 rounded-full">STANDARD VERIFIABLE CREDENTIAL</span>
                        <h4 className="text-[14px] font-bold mt-1.5 font-sans tracking-wide">{activeCredential.title}</h4>
                      </div>
                      <Layers className="w-5.5 h-5.5 opacity-80" />
                    </div>

                    <div className="flex gap-3.5 items-center mb-3 z-10 relative">
                      <div className="w-12 h-12 bg-white/20 md:w-14 md:h-14 rounded-xl flex items-center justify-center p-1 border border-white/15 shrink-0">
                        <User className="w-8 h-8 sm:w-10 sm:h-10 text-white opacity-90" />
                      </div>
                      <div>
                        <span className="block text-[9px] text-blue-150 uppercase tracking-widest leading-none">Chủ sở hữu danh tính</span>
                        <span className="text-sm sm:text-base font-bold font-mono tracking-tight text-white block mt-0.5">
                          {activeCredential.fields.find(f => f.key === 'fullname')?.value || 'N/A'}
                        </span>
                        <span className="text-[9px] text-blue-100 font-mono block mt-0.5">Holder DID: {userDID.substring(0, 22)}...</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs z-10 relative">
                      <div>
                        <span className="text-[9px] text-[#A5B4FC]/80 block uppercase leading-none mb-1">Cơ quan Cấp phát</span>
                        <span className="font-semibold block truncate font-sans text-[11px]">{activeCredential.issuerName}</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-[#A5B4FC]/80 block uppercase leading-none mb-1">Mã định danh issuer</span>
                        <span className="font-bold block font-mono text-[10px] truncate">{activeCredential.issuerDid}</span>
                      </div>
                    </div>
                  </div>

                  {/* Holder Selective Disclosure UI Control Panel */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-[10px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest">
                        Quyết Định Chia Sẻ (Selective Disclosure)
                      </h4>
                      <button 
                        onClick={handleCopyDID}
                        className="text-[10px] text-blue-500 hover:text-blue-600 bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-blue-950 p-1 px-2 rounded font-bold cursor-pointer transition"
                      >
                        {copiedDID ? "Đã chép" : "Copy DID của bạn"}
                      </button>
                    </div>

                    <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
                      {activeCredential.fields.map((field) => (
                        <div 
                          key={field.key}
                          className={`flex flex-col p-2.5 rounded-xl border transition-all ${
                            field.isShared 
                              ? 'bg-slate-50 dark:bg-slate-900/60 border-gray-200 dark:border-slate-800' 
                              : 'bg-white dark:bg-slate-950/20 border-gray-150 dark:border-slate-900/60 opacity-60'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className={`p-1 rounded ${field.isShared ? 'text-[#5B6CFF] bg-[#5B6CFF]/10' : 'text-gray-400'}`}>
                                {field.isShared ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                              </span>
                              <div>
                                <span className="text-[9px] block font-bold text-gray-400 uppercase leading-none mb-1">{field.label}</span>
                                <span className="text-xs font-bold text-gray-900 dark:text-white font-mono">
                                  {field.isShared 
                                    ? (field.zkp && field.isZkpEnabled ? field.zkpValue : field.value) 
                                    : field.maskedValue}
                                </span>
                              </div>
                            </div>

                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={field.isShared} 
                                onChange={() => toggleFieldShared(field.key)}
                                className="sr-only peer"
                              />
                              <div className="w-9 h-5 bg-gray-200 dark:bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-200 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-slate-600 peer-checked:bg-[#5B6CFF]" />
                            </label>
                          </div>

                          {/* Zero-Knowledge Proof Feature if supported for field */}
                          {field.zkp && (
                            <div className="mt-2 pt-2 border-t border-gray-200/50 dark:border-slate-800/60 flex items-center justify-between">
                              <span className="text-[9.5px] text-gray-400 flex items-center gap-1">
                                <Lock className="w-3 h-3 text-[#5B6CFF]" />
                                Zero-Knowledge Proof (ZKP) toán học:
                              </span>
                              <button
                                onClick={() => toggleZkp(field.key)}
                                className={`text-[9px] p-1 px-2.5 font-bold cursor-pointer rounded-lg transition-all ${
                                  field.isZkpEnabled 
                                    ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20' 
                                    : 'bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300'
                                }`}
                              >
                                {field.isZkpEnabled ? 'Đã kích hoạt ZKP ẩn thông tin gốc' : `Ẩn thông tin thô, Chỉ chứng minh: ${field.zkpLabel}`}
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Send Presentation Action */}
                  <div className="pt-2">
                    <button
                      onClick={requestVerify}
                      id="confirm-share-data"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#5B6CFF] to-[#3B82F6] hover:from-[#4A5AF0] hover:to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-500/15 cursor-pointer flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                    >
                      <Share2 className="w-4 h-4" />
                      Kiểm định đầu ra (Ký số & Gửi Present)
                    </button>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: VERIFIER UI */}
              {activeTab === 'verifier' && (
                <motion.div
                  key="tab-verifier"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 w-full flex-1 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-950 rounded-xl flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-[#5B6CFF] shrink-0 mt-0.5" />
                      <div className="text-left">
                        <h5 className="text-[11px] font-bold text-blue-700 dark:text-blue-400 uppercase leading-none">Cơ chế thẩm định phi tập trung</h5>
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 leading-normal">
                          Dịch vụ kiểm định đối soát mật mã học bằng khóa công khai. Nếu người dùng chọn **ZKP**, Verifier sẽ xác nhận tuyên bố hợp lệ thông qua kiểm định toán học mà không bao giờ tiếp cận ngày tháng/điểm số/số thẻ cụ thể.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2.5">
                        DỮ LIỆU ĐÃ TRUYỀN SANG (DỰ THỰC TẾ)
                      </h4>

                      {successShared ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[160px] overflow-y-auto">
                          {activeCredential.fields.map((field) => {
                            if (field.isShared) {
                              const isZkp = field.zkp && field.isZkpEnabled;
                              return (
                                <div 
                                  key={field.key} 
                                  className="p-2.5 rounded-xl bg-orange-50/10 dark:bg-emerald-500/5 border border-emerald-500/20 flex items-center justify-between"
                                >
                                  <div>
                                    <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 block uppercase leading-none mb-1">{field.label}</span>
                                    <span className="text-[13px] font-bold text-gray-800 dark:text-white font-mono">
                                      {isZkp ? field.zkpValue : field.value}
                                    </span>
                                  </div>
                                  <span className={`flex items-center gap-1 text-[9px] font-bold p-1 px-1.5 rounded-md ${isZkp ? 'bg-amber-400/20 text-amber-500' : 'bg-emerald-500/20 text-[#22C55E]'}`}>
                                    {isZkp ? 'ZKP OK' : 'Ký Số Thật'}
                                  </span>
                                </div>
                              );
                            } else {
                              return (
                                <div 
                                  key={field.key} 
                                  className="p-2.5 rounded-xl bg-gray-55/60 dark:bg-slate-900/40 border border-gray-100 dark:border-slate-800/60 opacity-40 flex items-center justify-between"
                                >
                                  <div>
                                    <span className="text-[9px] font-bold text-gray-400 block uppercase leading-none mb-1">{field.label}</span>
                                    <span className="text-xs text-gray-400 font-mono">Ẩn bởi người dùng (Masked)</span>
                                  </div>
                                  <span className="text-[9px] font-bold text-gray-400">Không gửi</span>
                                </div>
                              );
                            }
                          })}
                        </div>
                      ) : (
                        <div className="text-center py-8 border border-dashed border-gray-200 dark:border-slate-800 rounded-xl bg-white dark:bg-[#111625]/40">
                          <Share2 className="w-7 h-7 text-gray-300 dark:text-slate-700 mx-auto mb-2" />
                          <span className="text-[11px] text-gray-500 block">Chưa nhận được gói Presentation tin cậy. Vui lòng bấm "Kiểm định đầu ra" tại Tab Ví!</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {successShared && (
                    <div className="space-y-3">
                      {/* Cryptographic verification logs Terminal output */}
                      <div className="bg-[#030712] rounded-xl border border-slate-800 p-3 relative">
                        <div className="flex items-center justify-between border-b border-slate-800/80 pb-2 mb-2">
                          <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-[#8F9BFF] font-mono">
                            <Cpu className="w-3.5 h-3.5 text-blue-400" />
                            ĐỐI SOÁT PAYLOAD (Decrypted JSON-LD)
                          </div>
                          <button
                            onClick={() => handleCopyPayload(getMockPresentationJSON())}
                            className="text-[9.5px] text-slate-400 hover:text-white p-0.5 px-1.5 rounded border border-slate-800 cursor-pointer transition-colors"
                          >
                            {copiedPayload ? "Đã copy" : "Copy Payload"}
                          </button>
                        </div>
                        <pre className="text-[10px] text-emerald-400 font-mono overflow-x-auto text-left h-[100px] leading-tight select-all">
                          {getMockPresentationJSON()}
                        </pre>
                      </div>

                      {/* Success Badge Banner */}
                      <div className="p-3.5 rounded-xl bg-gradient-to-tr from-emerald-500/10 to-[#5B6CFF]/10 border border-emerald-250 dark:border-[#22C55E]/20 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <CheckCircle className="w-5 h-5 text-[#22C55E]" />
                          <h5 className="text-[11.5px] font-black text-gray-800 dark:text-white uppercase tracking-wider">Xác Thực Mật Mã Thành Công</h5>
                        </div>
                        <p className="text-[10.5px] text-gray-500 dark:text-gray-400 leading-relaxed mt-1.5 max-w-lg mx-auto">
                          Gói Present DID gốc <strong>{activeCredential.title}</strong> được ký tin cậy bởi <strong>{activeCredential.issuerName}</strong>. 
                          Dữ liệu khớp chuẩn khóa, không có dấu hiệu sửa đổi, không bị thu hồi hiệu lực!
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab('wallet')}
                      className="w-full py-3 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 font-bold text-xs text-gray-700 dark:text-gray-300 transition-colors cursor-pointer rounded-xl"
                    >
                      Quay lại ví để thay đổi chia sẻ
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
