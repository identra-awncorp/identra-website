/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { CredentialStatus } from '../identra/schoolPortalClient';
import type { LoadProblem, SignInProblem, StatusAction, StatusChangeProblem } from '../identra/schoolPortalState';

// The portal is offered in Vietnamese and English (src/types/routes.ts, VIEW_LOCALE_OVERRIDES).
export interface SchoolPortalPageCopy {
  universityName: string;
  portalName: string;
  crestLabel: string;
  demoNotice: string;
  memoryNotice: string;
  signInTitle: string;
  signInIntro: string;
  usernameLabel: string;
  passwordLabel: string;
  showPassword: string;
  hidePassword: string;
  signIn: string;
  signingIn: string;
  signInProblems: Record<SignInProblem, string>;
  retryAfter: string;
  sessionExpiredNotice: string;
  signedOutNotice: string;
  sampleAccountsTitle: string;
  sampleAccountsIntro: string;
  samplePasswordLabel: string;
  roleStudent: string;
  roleRegistrar: string;
  useAccount: string;
  useAccountLabel: string;
  howTitle: string;
  howSteps: readonly string[];
  tryEmployerDemo: string;
  signOut: string;
  sessionUntil: string;
  studentTitle: string;
  studentIntro: string;
  recordTitle: string;
  recordFields: {
    hoTen: string;
    ngaySinh: string;
    maSinhVien: string;
    nganh: string;
    hangTotNghiep: string;
    namTotNghiep: string;
    soHieuBang: string;
  };
  walletTitle: string;
  walletIntro: string;
  receive: string;
  creatingOffer: string;
  offerQrLabel: string;
  pinLabel: string;
  pinHelp: string;
  expiresIn: string;
  waitingForWallet: string;
  reconnecting: string;
  issuedTitle: string;
  issuedBody: string;
  expiredTitle: string;
  expiredBody: string;
  newOffer: string;
  openInWallet: string;
  firstTimeTitle: string;
  firstTimeSteps: readonly string[];
  myDiplomasTitle: string;
  myDiplomasEmpty: string;
  issuedOn: string;
  loadProblems: Record<LoadProblem, string>;
  retry: string;
  loading: string;
  registrarTitle: string;
  registrarIntro: string;
  refresh: string;
  updatedAt: string;
  counts: string;
  columnStudent: string;
  columnIssued: string;
  columnStatus: string;
  columnActions: string;
  registrarEmpty: string;
  statusLabels: Record<CredentialStatus, string>;
  actionLabels: Record<StatusAction, string>;
  revokedFinal: string;
  confirmTitle: Record<StatusAction, string>;
  confirmBody: Record<StatusAction, string>;
  confirmAction: Record<StatusAction, string>;
  cancel: string;
  saving: string;
  statusChangeProblems: Record<StatusChangeProblem, string>;
  statusChanged: string;
}

const vi: SchoolPortalPageCopy = {
  universityName: 'Trường Đại học Mẫu (DEMO)',
  portalName: 'Cổng thông tin sinh viên',
  crestLabel: 'Biểu trưng Trường Đại học Mẫu',
  demoNotice: 'Đây là cổng trường hư cấu để trải nghiệm Identra. Mọi tên, mã sinh viên và bằng cấp ở đây đều là dữ liệu mẫu, không phải người thật.',
  memoryNotice: 'Phiên đăng nhập chỉ được giữ trong tab này. Tải lại hoặc đóng trang sẽ đăng xuất.',
  signInTitle: 'Đăng nhập cổng trường mẫu',
  signInIntro: 'Dùng một trong các tài khoản mẫu để xem hồ sơ tốt nghiệp và nhận bằng mẫu vào ví Identra.',
  usernameLabel: 'Tên đăng nhập',
  passwordLabel: 'Mật khẩu',
  showPassword: 'Hiện mật khẩu',
  hidePassword: 'Ẩn mật khẩu',
  signIn: 'Đăng nhập',
  signingIn: 'Đang đăng nhập…',
  signInProblems: {
    invalid_credentials: 'Tên đăng nhập hoặc mật khẩu chưa đúng.',
    rate_limited: 'Bạn đã thử đăng nhập quá nhiều lần.',
    network: 'Không kết nối được máy chủ Identra. Kiểm tra mạng rồi thử lại.',
    unavailable: 'Máy chủ Identra chưa trả lời được. Thử lại sau ít phút.',
  },
  retryAfter: 'Đợi {seconds} giây rồi thử lại.',
  sessionExpiredNotice: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
  signedOutNotice: 'Bạn đã đăng xuất.',
  sampleAccountsTitle: 'Tài khoản mẫu',
  sampleAccountsIntro: 'Hồ sơ hư cấu, công khai để ai cũng dùng thử được.',
  samplePasswordLabel: 'Mật khẩu chung:',
  roleStudent: 'Sinh viên',
  roleRegistrar: 'Phòng Đào tạo',
  useAccount: 'Dùng',
  useAccountLabel: 'Điền tài khoản {username} vào ô đăng nhập',
  howTitle: 'Cách trải nghiệm',
  howSteps: [
    'Đăng nhập bằng một tài khoản sinh viên mẫu.',
    'Bấm “Nhận bằng vào ví Identra”, quét mã QR và nhập mã PIN trong ví.',
    'Dùng bằng vừa nhận để ứng tuyển ở trang Nhà tuyển dụng mẫu.',
  ],
  tryEmployerDemo: 'Mở trang Nhà tuyển dụng mẫu',
  signOut: 'Đăng xuất',
  sessionUntil: 'Phiên đăng nhập đến {time}',
  studentTitle: 'Hồ sơ tốt nghiệp',
  studentIntro: 'Thông tin dưới đây là hồ sơ nhà trường đang lưu. Bằng trong ví sẽ mang đúng các thông tin này.',
  recordTitle: 'Hồ sơ nhà trường',
  recordFields: {
    hoTen: 'Họ và tên',
    ngaySinh: 'Ngày sinh',
    maSinhVien: 'Mã sinh viên',
    nganh: 'Ngành',
    hangTotNghiep: 'Hạng tốt nghiệp',
    namTotNghiep: 'Năm tốt nghiệp',
    soHieuBang: 'Số hiệu bằng',
  },
  walletTitle: 'Nhận bằng vào ví',
  walletIntro: 'Nhà trường cấp cho bạn một bản bằng tốt nghiệp có thể kiểm tra được, lưu trong ứng dụng Identra trên điện thoại.',
  receive: 'Nhận bằng vào ví Identra',
  creatingOffer: 'Đang chuẩn bị mã nhận bằng…',
  offerQrLabel: 'Mã QR để nhận bằng tốt nghiệp vào ví Identra. Quét bằng ứng dụng Identra.',
  pinLabel: 'Mã PIN',
  pinHelp: 'Ví sẽ hỏi mã này sau khi quét. Đừng đưa mã cho người khác.',
  expiresIn: 'Mã còn hiệu lực {time}',
  waitingForWallet: 'Đang chờ ví nhận bằng',
  reconnecting: 'Mất kết nối tới máy chủ, đang thử lại…',
  issuedTitle: 'Đã cấp vào ví',
  issuedBody: 'Bằng tốt nghiệp đã nằm trong ví Identra của bạn. Bạn có thể dùng nó để ứng tuyển.',
  expiredTitle: 'Mã nhận bằng đã hết hạn',
  expiredBody: 'Mỗi mã chỉ dùng được trong 10 phút. Tạo mã mới để thử lại.',
  newOffer: 'Tạo mã mới',
  openInWallet: 'Đang dùng điện thoại? Mở trong ví Identra',
  firstTimeTitle: 'Lần đầu dùng ví Identra?',
  firstTimeSteps: [
    'Mở ứng dụng Identra trên điện thoại và chọn Quét mã.',
    'Đưa camera vào mã QR ở trên.',
    'Nhập mã PIN 6 số khi ví hỏi.',
    'Xem lại thông tin và bấm Nhận. Trang này sẽ báo khi bằng đã vào ví.',
  ],
  myDiplomasTitle: 'Bằng đã cấp cho bạn',
  myDiplomasEmpty: 'Chưa có bằng nào được cấp vào ví.',
  issuedOn: 'Cấp ngày {date}',
  loadProblems: {
    network: 'Không kết nối được máy chủ Identra.',
    rate_limited: 'Có quá nhiều yêu cầu trong thời gian ngắn. Đợi một phút rồi thử lại.',
    unavailable: 'Máy chủ Identra chưa trả lời được.',
  },
  retry: 'Thử lại',
  loading: 'Đang tải…',
  registrarTitle: 'Bằng đã cấp',
  registrarIntro: 'Tạm dừng, khôi phục hoặc thu hồi một bằng. Nơi kiểm tra bằng sẽ thấy thay đổi trong vòng vài phút.',
  refresh: 'Tải lại',
  updatedAt: 'Cập nhật lúc {time}',
  counts: '{valid} còn hiệu lực · {suspended} tạm dừng · {revoked} đã thu hồi',
  columnStudent: 'Sinh viên',
  columnIssued: 'Ngày cấp',
  columnStatus: 'Trạng thái',
  columnActions: 'Thao tác',
  registrarEmpty: 'Chưa có bằng nào được cấp. Khi sinh viên nhận bằng vào ví, bằng sẽ hiện ở đây.',
  statusLabels: { valid: 'Còn hiệu lực', suspended: 'Tạm dừng', revoked: 'Đã thu hồi' },
  actionLabels: { suspend: 'Tạm dừng', restore: 'Khôi phục', revoke: 'Thu hồi' },
  revokedFinal: 'Không thể thay đổi',
  confirmTitle: {
    suspend: 'Tạm dừng bằng của {name}?',
    restore: 'Khôi phục bằng của {name}?',
    revoke: 'Thu hồi vĩnh viễn bằng của {name}?',
  },
  confirmBody: {
    suspend: 'Trong thời gian tạm dừng, mọi nơi kiểm tra sẽ thấy bằng này đang bị tạm dừng. Bạn có thể khôi phục sau.',
    restore: 'Bằng sẽ có hiệu lực trở lại với mọi nơi kiểm tra.',
    revoke: 'Thu hồi là vĩnh viễn và không thể hoàn tác. Từ nay mọi nơi kiểm tra sẽ thấy bằng này đã bị thu hồi.',
  },
  confirmAction: { suspend: 'Tạm dừng bằng', restore: 'Khôi phục bằng', revoke: 'Thu hồi vĩnh viễn' },
  cancel: 'Hủy',
  saving: 'Đang gửi tới máy chủ…',
  statusChangeProblems: {
    already_revoked: 'Bằng này đã bị thu hồi trước đó nên không thể thay đổi.',
    session_expired: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
    network: 'Không kết nối được máy chủ Identra. Trạng thái chưa thay đổi.',
    unavailable: 'Máy chủ Identra chưa trả lời được. Trạng thái chưa thay đổi.',
  },
  statusChanged: 'Máy chủ đã ghi nhận: bằng của {name} giờ ở trạng thái {status}.',
};

const en: SchoolPortalPageCopy = {
  universityName: 'Sample University (DEMO)',
  portalName: 'Student portal',
  crestLabel: 'Sample University crest',
  demoNotice: 'This is a fictional university portal for trying Identra. Every name, student number and diploma here is sample data, not a real person.',
  memoryNotice: 'Your sign-in is kept in this tab only. Reloading or closing the page signs you out.',
  signInTitle: 'Sign in to the sample university',
  signInIntro: 'Use one of the sample accounts to see a graduation record and receive a sample diploma in your Identra wallet.',
  usernameLabel: 'Username',
  passwordLabel: 'Password',
  showPassword: 'Show password',
  hidePassword: 'Hide password',
  signIn: 'Sign in',
  signingIn: 'Signing in…',
  signInProblems: {
    invalid_credentials: 'The username or password is not correct.',
    rate_limited: 'Too many sign-in attempts.',
    network: 'Cannot reach the Identra server. Check your connection and try again.',
    unavailable: 'The Identra server is not answering. Try again in a few minutes.',
  },
  retryAfter: 'Wait {seconds} seconds, then try again.',
  sessionExpiredNotice: 'Your session has expired. Please sign in again.',
  signedOutNotice: 'You have signed out.',
  sampleAccountsTitle: 'Sample accounts',
  sampleAccountsIntro: 'Fictional records, public so that anyone can try them.',
  samplePasswordLabel: 'Shared password:',
  roleStudent: 'Student',
  roleRegistrar: 'Registrar\'s office',
  useAccount: 'Use',
  useAccountLabel: 'Fill in the account {username}',
  howTitle: 'How to try it',
  howSteps: [
    'Sign in with a sample student account.',
    'Choose “Receive in my Identra wallet”, scan the QR code and enter the PIN in the wallet.',
    'Use the new diploma to apply on the sample employer page.',
  ],
  tryEmployerDemo: 'Open the sample employer page',
  signOut: 'Sign out',
  sessionUntil: 'Signed in until {time}',
  studentTitle: 'Graduation record',
  studentIntro: 'This is the record the university holds. The diploma in your wallet carries exactly these details.',
  recordTitle: 'University record',
  recordFields: {
    hoTen: 'Full name',
    ngaySinh: 'Date of birth',
    maSinhVien: 'Student number',
    nganh: 'Field of study',
    hangTotNghiep: 'Classification',
    namTotNghiep: 'Graduation year',
    soHieuBang: 'Diploma number',
  },
  walletTitle: 'Receive your diploma',
  walletIntro: 'The university issues you a diploma that anyone can check, kept in the Identra app on your phone.',
  receive: 'Receive in my Identra wallet',
  creatingOffer: 'Preparing your code…',
  offerQrLabel: 'QR code to receive your diploma in the Identra wallet. Scan it with the Identra app.',
  pinLabel: 'PIN',
  pinHelp: 'The wallet asks for this after scanning. Do not share it.',
  expiresIn: 'Code valid for {time}',
  waitingForWallet: 'Waiting for the wallet to collect the diploma',
  reconnecting: 'Lost the connection to the server, retrying…',
  issuedTitle: 'Issued to your wallet',
  issuedBody: 'The diploma is now in your Identra wallet. You can use it to apply for a job.',
  expiredTitle: 'This code has expired',
  expiredBody: 'Each code works for 10 minutes. Create a new one to try again.',
  newOffer: 'New code',
  openInWallet: 'On your phone? Open in the Identra wallet',
  firstTimeTitle: 'New to the Identra wallet?',
  firstTimeSteps: [
    'Open the Identra app on your phone and tap Scan.',
    'Point the camera at the QR code above.',
    'Enter the 6-digit PIN when the wallet asks.',
    'Review the details and tap Accept. This page updates when the diploma is in the wallet.',
  ],
  myDiplomasTitle: 'Diplomas issued to you',
  myDiplomasEmpty: 'No diploma has been issued to your wallet yet.',
  issuedOn: 'Issued {date}',
  loadProblems: {
    network: 'Cannot reach the Identra server.',
    rate_limited: 'Too many requests in a short time. Wait a minute, then try again.',
    unavailable: 'The Identra server is not answering.',
  },
  retry: 'Try again',
  loading: 'Loading…',
  registrarTitle: 'Issued diplomas',
  registrarIntro: 'Suspend, restore or revoke a diploma. Anyone checking it sees the change within a few minutes.',
  refresh: 'Refresh',
  updatedAt: 'Updated {time}',
  counts: '{valid} valid · {suspended} suspended · {revoked} revoked',
  columnStudent: 'Student',
  columnIssued: 'Issued',
  columnStatus: 'Status',
  columnActions: 'Actions',
  registrarEmpty: 'No diplomas issued yet. When a student receives one in their wallet, it appears here.',
  statusLabels: { valid: 'Valid', suspended: 'Suspended', revoked: 'Revoked' },
  actionLabels: { suspend: 'Suspend', restore: 'Restore', revoke: 'Revoke' },
  revokedFinal: 'Cannot be changed',
  confirmTitle: {
    suspend: 'Suspend {name}\'s diploma?',
    restore: 'Restore {name}\'s diploma?',
    revoke: 'Permanently revoke {name}\'s diploma?',
  },
  confirmBody: {
    suspend: 'While suspended, anyone checking this diploma sees that it is suspended. You can restore it later.',
    restore: 'The diploma becomes valid again for anyone checking it.',
    revoke: 'Revoking is permanent and cannot be undone. From now on anyone checking this diploma sees that it was revoked.',
  },
  confirmAction: { suspend: 'Suspend diploma', restore: 'Restore diploma', revoke: 'Revoke permanently' },
  cancel: 'Cancel',
  saving: 'Sending to the server…',
  statusChangeProblems: {
    already_revoked: 'This diploma was already revoked, so it cannot be changed.',
    session_expired: 'Your session has expired. Please sign in again.',
    network: 'Cannot reach the Identra server. The status has not changed.',
    unavailable: 'The Identra server is not answering. The status has not changed.',
  },
  statusChanged: 'Saved by the server: {name}\'s diploma is now {status}.',
};

export const SCHOOL_PORTAL_PAGE_TRANSLATIONS = {
  en,
  vi,
} as const satisfies Record<'en' | 'vi', SchoolPortalPageCopy>;

/** Public sample accounts seeded by the server (vc-api.md section 5). */
export const SCHOOL_PORTAL_SAMPLE_ACCOUNTS = [
  { username: 'sv001', role: 'student' },
  { username: 'sv002', role: 'student' },
  { username: 'sv003', role: 'student' },
  { username: 'phongdaotao', role: 'registrar' },
] as const;

export const SCHOOL_PORTAL_SAMPLE_PASSWORD = 'Identra@2026';
