/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { CredentialStatus } from '../identra/schoolPortalClient';
import type { LoadProblem, OfferProblem, SignInProblem, StatusAction, StatusChangeProblem } from '../identra/schoolPortalState';

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
  sharedAccountsNote: string;
  samplePasswordLabel: string;
  roleStudent: string;
  presenterNote: string;
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
  anotherCode: string;
  anotherCodeHint: string;
  offerLimitTitle: string;
  offerProblems: Record<OfferProblem, string>;
  retryIn: string;
  openInWallet: string;
  linkLabel: string;
  copyLink: string;
  linkCopied: string;
  qrUnavailable: string;
  reissue: string;
  reissueHint: string;
  firstTimeTitle: string;
  firstTimeSteps: readonly string[];
  myDiplomasTitle: string;
  myDiplomasNote: string;
  myDiplomasEmpty: string;
  issuedOn: string;
  issuedAtTime: string;
  revokeAction: string;
  revokeTitle: string;
  revokePoints: readonly string[];
  revokeConfirm: string;
  revokeProblems: Record<StatusChangeProblem, string>;
  revokedAnnouncement: string;
  revokedHint: string;
  revokedTry: string;
  loadProblems: Record<LoadProblem, string>;
  retry: string;
  loading: string;
  registrarTitle: string;
  registrarIntro: string;
  refresh: string;
  updatedAt: string;
  counts: string;
  countsPartial: string;
  loadMore: string;
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
  timingNote: string;
}

const vi: SchoolPortalPageCopy = {
  universityName: 'Trường Đại học Mẫu (DEMO)',
  portalName: 'Cổng thông tin sinh viên',
  crestLabel: 'Biểu trưng Trường Đại học Mẫu',
  demoNotice: 'Đây là cổng trường hư cấu để trải nghiệm Identra. Mọi tên, mã sinh viên và bằng cấp ở đây đều là dữ liệu mẫu, không phải người thật.',
  memoryNotice: 'Phiên đăng nhập chỉ được giữ trong tab này. Tải lại hoặc đóng trang sẽ đăng xuất.',
  signInTitle: 'Đăng nhập cổng trường mẫu',
  signInIntro: 'Dùng một trong các tài khoản sinh viên mẫu để xem hồ sơ tốt nghiệp và nhận bằng mẫu vào ví Identra.',
  usernameLabel: 'Tên đăng nhập',
  passwordLabel: 'Mật khẩu',
  showPassword: 'Hiện mật khẩu',
  hidePassword: 'Ẩn mật khẩu',
  signIn: 'Đăng nhập',
  signingIn: 'Đang đăng nhập…',
  signInProblems: {
    invalid_credentials: 'Tên đăng nhập hoặc mật khẩu chưa đúng.',
    rejected: 'Máy chủ không nhận yêu cầu đăng nhập này. Kiểm tra lại tên đăng nhập rồi thử lại.',
    rate_limited: 'Bạn đã thử đăng nhập quá nhiều lần.',
    network: 'Không kết nối được máy chủ Identra. Kiểm tra mạng rồi thử lại.',
    unavailable: 'Máy chủ Identra đang không phản hồi. Thử lại sau ít phút.',
  },
  retryAfter: 'Đợi {seconds} giây rồi thử lại.',
  sessionExpiredNotice: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
  signedOutNotice: 'Bạn đã đăng xuất.',
  sampleAccountsTitle: 'Tài khoản mẫu',
  sampleAccountsIntro: 'Hồ sơ hư cấu, công khai để ai cũng dùng thử được.',
  sharedAccountsNote: 'Nhiều khách dùng chung các tài khoản này, nhưng mỗi lần đăng nhập chỉ thấy những gì chính lần đó tạo ra.',
  samplePasswordLabel: 'Mật khẩu chung:',
  roleStudent: 'Sinh viên',
  presenterNote: 'Tài khoản phòng đào tạo dành cho người trình diễn.',
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
  walletIntro: 'Nhà trường cấp cho bạn bằng tốt nghiệp điện tử mà ai cũng kiểm tra được, lưu trong ứng dụng Identra.',
  receive: 'Nhận bằng vào ví Identra',
  creatingOffer: 'Đang chuẩn bị mã nhận bằng…',
  offerQrLabel: 'Mã QR để nhận bằng tốt nghiệp vào ví Identra. Quét bằng ứng dụng Identra.',
  pinLabel: 'Mã PIN',
  pinHelp: 'Ví sẽ hỏi mã này sau khi quét. Đừng đưa mã cho người khác.',
  expiresIn: 'Mã còn hiệu lực trong {time}',
  waitingForWallet: 'Đang chờ ví nhận bằng',
  reconnecting: 'Mất kết nối tới máy chủ, đang thử lại…',
  issuedTitle: 'Đã cấp vào ví',
  issuedBody: 'Bằng tốt nghiệp đã nằm trong ví Identra của bạn. Bạn có thể dùng nó để ứng tuyển.',
  expiredTitle: 'Mã nhận bằng đã hết hạn',
  expiredBody: 'Mỗi mã chỉ dùng được trong 10 phút. Tạo mã mới để thử lại.',
  newOffer: 'Tạo mã mới',
  anotherCode: 'Tạo mã khác',
  anotherCodeHint: 'Mã đang hiện sẽ ngừng dùng được.',
  offerLimitTitle: 'Tạm thời chưa tạo được mã mới',
  offerProblems: {
    too_many_offers: 'Mạng bạn đang dùng đã giữ 5 mã nhận bằng chưa dùng, hoặc đã tạo 30 mã trong 30 phút qua. Mã chưa dùng tự hết hạn sau 10 phút.',
    busy: 'Hệ thống đang đông, thử lại sau ít phút.',
    network: 'Không kết nối được máy chủ Identra. Kiểm tra mạng rồi thử lại.',
    forbidden: 'Tài khoản này không nhận bằng được.',
    rejected: 'Máy chủ không nhận yêu cầu này. Tải lại trang rồi thử lại.',
    unavailable: 'Máy chủ Identra đang không phản hồi. Thử lại sau ít phút.',
  },
  retryIn: 'Có thể thử lại sau {time}.',
  openInWallet: 'Mở trong ví Identra',
  linkLabel: 'Liên kết nhận bằng',
  copyLink: 'Sao chép liên kết',
  linkCopied: 'Đã sao chép liên kết',
  qrUnavailable: 'Không hiển thị được mã QR. Hãy dùng liên kết bên dưới.',
  reissue: 'Nhận lại bằng vào ví',
  reissueHint: 'Dùng khi bạn đổi hoặc mất điện thoại. Mỗi lần nhận là một bản bằng mới; bản cũ vẫn còn hiệu lực cho đến khi bạn thu hồi nó trong danh sách bên dưới.',
  firstTimeTitle: 'Lần đầu dùng ví Identra?',
  firstTimeSteps: [
    'Mở ứng dụng Identra trên điện thoại và chọn Quét mã.',
    'Hướng camera vào mã QR ở trên.',
    'Nhập mã PIN 6 số khi ví hỏi.',
    'Xem lại thông tin và bấm Nhận. Trang này sẽ báo khi bằng đã vào ví.',
  ],
  myDiplomasTitle: 'Bằng đã cấp cho bạn',
  myDiplomasNote: 'Chỉ hiện những bằng bạn nhận trong lần đăng nhập này.',
  myDiplomasEmpty: 'Bạn chưa nhận bằng nào trong lần đăng nhập này.',
  issuedOn: 'Cấp ngày {date}',
  issuedAtTime: 'Cấp lúc {time} ngày {date}',
  revokeAction: 'Thu hồi bằng này',
  revokeTitle: 'Thu hồi bằng này?',
  revokePoints: [
    'Dùng khi điện thoại đang giữ bằng này bị mất hoặc rơi vào tay người khác.',
    'Thu hồi là vĩnh viễn: bằng này không bao giờ dùng được nữa, kể cả khi bạn tìm lại điện thoại.',
    'Sau đó bạn vẫn nhận được một bằng mới vào ví.',
  ],
  revokeConfirm: 'Thu hồi vĩnh viễn',
  revokeProblems: {
    already_revoked: 'Bằng này đã được thu hồi trước đó.',
    session_expired: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
    forbidden: 'Tài khoản này không được thu hồi bằng ở đây. Bằng chưa bị thu hồi.',
    not_found: 'Máy chủ không thấy bằng này trong lần đăng nhập của bạn nên chưa thu hồi gì. Tải lại danh sách rồi thử lại.',
    rejected: 'Máy chủ không nhận yêu cầu này. Bằng chưa bị thu hồi.',
    rate_limited: 'Mạng của bạn vừa gửi quá nhiều yêu cầu. Bằng chưa bị thu hồi.',
    no_answer: 'Không nhận được câu trả lời rõ ràng từ máy chủ Identra, nên chưa biết bằng đã bị thu hồi hay chưa. Bấm thử lại: nếu bằng đã bị thu hồi, trang sẽ báo ngay.',
    unavailable: 'Máy chủ Identra đang bận nên chưa thu hồi được. Bằng vẫn còn hiệu lực.',
  },
  revokedAnnouncement: 'Đã thu hồi bằng cấp lúc {time}.',
  revokedHint: 'Lần kiểm tra tiếp theo ở trang Nhà tuyển dụng mẫu sẽ từ chối bằng này.',
  revokedTry: 'Thử ứng tuyển với bằng này',
  loadProblems: {
    network: 'Không kết nối được máy chủ Identra.',
    rate_limited: 'Có quá nhiều yêu cầu trong thời gian ngắn. Đợi một phút rồi thử lại.',
    unavailable: 'Máy chủ Identra đang không phản hồi.',
    forbidden: 'Tài khoản này không có quyền xem mục này.',
    rejected: 'Máy chủ không nhận yêu cầu này. Tải lại trang rồi thử lại.',
  },
  retry: 'Thử lại',
  loading: 'Đang tải…',
  registrarTitle: 'Bằng đã cấp',
  registrarIntro: 'Tạm dừng, khôi phục hoặc thu hồi một bằng tốt nghiệp đã cấp.',
  refresh: 'Tải lại',
  updatedAt: 'Cập nhật lúc {time}',
  counts: '{valid} còn hiệu lực · {suspended} tạm dừng · {revoked} đã thu hồi',
  countsPartial: 'Trong {total} bằng mới nhất: {valid} còn hiệu lực · {suspended} tạm dừng · {revoked} đã thu hồi',
  loadMore: 'Xem thêm',
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
    suspend: 'Trong thời gian tạm dừng, nơi kiểm tra sẽ thấy bằng này đang bị tạm dừng. Bạn có thể khôi phục sau.',
    restore: 'Bằng sẽ có hiệu lực trở lại.',
    revoke: 'Thu hồi là vĩnh viễn và không thể hoàn tác: bằng này sẽ không bao giờ có hiệu lực trở lại.',
  },
  confirmAction: { suspend: 'Tạm dừng bằng', restore: 'Khôi phục bằng', revoke: 'Thu hồi vĩnh viễn' },
  cancel: 'Hủy',
  saving: 'Đang gửi tới máy chủ…',
  statusChangeProblems: {
    already_revoked: 'Bằng này đã bị thu hồi trước đó nên không thể thay đổi.',
    session_expired: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.',
    forbidden: 'Tài khoản này không có quyền đổi trạng thái bằng. Trạng thái chưa thay đổi.',
    not_found: 'Không còn tìm thấy bằng này. Tải lại danh sách rồi thử lại.',
    rejected: 'Máy chủ không nhận thay đổi này. Trạng thái chưa thay đổi.',
    rate_limited: 'Có quá nhiều thay đổi trong thời gian ngắn. Trạng thái chưa thay đổi.',
    no_answer: 'Không nhận được câu trả lời rõ ràng từ máy chủ Identra, nên chưa biết trạng thái đã đổi hay chưa. Tải lại danh sách để xem trạng thái hiện tại.',
    unavailable: 'Máy chủ Identra đang bận. Trạng thái chưa thay đổi.',
  },
  statusChanged: 'Đã lưu: bằng của {name} chuyển sang “{status}”.',
  timingNote: 'Trang kiểm tra của Identra thấy ngay; nơi kiểm tra khác có thể chậm tới 15 phút.',
};

const en: SchoolPortalPageCopy = {
  universityName: 'Sample University (DEMO)',
  portalName: 'Student portal',
  crestLabel: 'Sample University crest',
  demoNotice: 'This is a fictional university portal for trying Identra. Every name, student number and diploma here is sample data, not a real person.',
  memoryNotice: 'Your sign-in is kept in this tab only. Reloading or closing the page signs you out.',
  signInTitle: 'Sign in to the sample university',
  signInIntro: 'Use one of the sample student accounts to see a graduation record and receive a sample diploma in your Identra wallet.',
  usernameLabel: 'Username',
  passwordLabel: 'Password',
  showPassword: 'Show password',
  hidePassword: 'Hide password',
  signIn: 'Sign in',
  signingIn: 'Signing in…',
  signInProblems: {
    invalid_credentials: 'The username or password is not correct.',
    rejected: 'The server did not accept this sign-in request. Check the username and try again.',
    rate_limited: 'Too many sign-in attempts.',
    network: 'Cannot reach the Identra server. Check your connection and try again.',
    unavailable: 'The Identra server is not responding. Try again in a few minutes.',
  },
  retryAfter: 'Wait {seconds} seconds, then try again.',
  sessionExpiredNotice: 'Your session has expired. Please sign in again.',
  signedOutNotice: 'You have signed out.',
  sampleAccountsTitle: 'Sample accounts',
  sampleAccountsIntro: 'Fictional records, public so that anyone can try them.',
  sharedAccountsNote: 'Many visitors share these accounts, but each sign-in only sees what it created itself.',
  samplePasswordLabel: 'Shared password:',
  roleStudent: 'Student',
  presenterNote: 'The registrar\'s account is for presenters.',
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
  walletIntro: 'The university issues you an electronic diploma that anyone can check, kept in the Identra app.',
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
  anotherCode: 'Get another code',
  anotherCodeHint: 'The code shown now will stop working.',
  offerLimitTitle: 'No new code for the moment',
  offerProblems: {
    too_many_offers: 'The network you are on already holds 5 unused codes, or made 30 codes in the last 30 minutes. Unused codes expire by themselves after 10 minutes.',
    busy: 'The system is busy. Try again in a few minutes.',
    network: 'Cannot reach the Identra server. Check your connection and try again.',
    forbidden: 'This account cannot receive a diploma.',
    rejected: 'The server did not accept this request. Reload the page and try again.',
    unavailable: 'The Identra server is not responding. Try again in a few minutes.',
  },
  retryIn: 'You can try again in {time}.',
  openInWallet: 'Open in the Identra wallet',
  linkLabel: 'Link to receive the diploma',
  copyLink: 'Copy link',
  linkCopied: 'Link copied',
  qrUnavailable: 'The QR code cannot be shown. Use the link below instead.',
  reissue: 'Receive the diploma again',
  reissueHint: 'For a new or lost phone. Each time is a new copy of the diploma; the old one stays valid until you revoke it in the list below.',
  firstTimeTitle: 'New to the Identra wallet?',
  firstTimeSteps: [
    'Open the Identra app on your phone and tap Scan.',
    'Point the camera at the QR code above.',
    'Enter the 6-digit PIN when the wallet asks.',
    'Review the details and tap Accept. This page updates when the diploma is in the wallet.',
  ],
  myDiplomasTitle: 'Diplomas issued to you',
  myDiplomasNote: 'Only the diplomas you received during this sign-in are shown.',
  myDiplomasEmpty: 'You have not received a diploma during this sign-in yet.',
  issuedOn: 'Issued {date}',
  issuedAtTime: 'Issued at {time} on {date}',
  revokeAction: 'Revoke this diploma',
  revokeTitle: 'Revoke this diploma?',
  revokePoints: [
    'For when the phone holding this diploma is lost or in someone else\'s hands.',
    'Revoking is permanent: this diploma can never be used again, even if you find the phone.',
    'You can still receive a new diploma in your wallet afterwards.',
  ],
  revokeConfirm: 'Revoke permanently',
  revokeProblems: {
    already_revoked: 'This diploma was already revoked.',
    session_expired: 'Your session has expired. Please sign in again.',
    forbidden: 'This account may not revoke diplomas here. The diploma has not been revoked.',
    not_found: 'The server cannot find this diploma in your sign-in, so nothing was revoked. Refresh the list and try again.',
    rejected: 'The server did not accept this request. The diploma has not been revoked.',
    rate_limited: 'Your network sent too many requests just now. The diploma has not been revoked.',
    no_answer: 'No clear answer came back from the Identra server, so it is not known whether the diploma was revoked. Try again: if it was, the page says so at once.',
    unavailable: 'The Identra server is busy and could not revoke it. The diploma is still valid.',
  },
  revokedAnnouncement: 'Revoked the diploma issued at {time}.',
  revokedHint: 'The next check on the sample employer page will refuse this diploma.',
  revokedTry: 'Try applying with this diploma',
  loadProblems: {
    network: 'Cannot reach the Identra server.',
    rate_limited: 'Too many requests in a short time. Wait a minute, then try again.',
    unavailable: 'The Identra server is not responding.',
    forbidden: 'This account may not see this.',
    rejected: 'The server did not accept this request. Reload the page and try again.',
  },
  retry: 'Try again',
  loading: 'Loading…',
  registrarTitle: 'Issued diplomas',
  registrarIntro: 'Suspend, restore or revoke a diploma that has been issued.',
  refresh: 'Refresh',
  updatedAt: 'Updated {time}',
  counts: '{valid} valid · {suspended} suspended · {revoked} revoked',
  countsPartial: 'Of the {total} newest: {valid} valid · {suspended} suspended · {revoked} revoked',
  loadMore: 'Show more',
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
    suspend: 'While suspended, verifiers see that this diploma is suspended. You can restore it later.',
    restore: 'The diploma becomes valid again.',
    revoke: 'Revoking is permanent and cannot be undone: this diploma will never be valid again.',
  },
  confirmAction: { suspend: 'Suspend diploma', restore: 'Restore diploma', revoke: 'Revoke permanently' },
  cancel: 'Cancel',
  saving: 'Sending to the server…',
  statusChangeProblems: {
    already_revoked: 'This diploma was already revoked, so it cannot be changed.',
    session_expired: 'Your session has expired. Please sign in again.',
    forbidden: 'This account may not change a diploma\'s status. The status has not changed.',
    not_found: 'This diploma can no longer be found. Refresh the list and try again.',
    rejected: 'The server did not accept this change. The status has not changed.',
    rate_limited: 'Too many changes in a short time. The status has not changed.',
    no_answer: 'No clear answer came back from the Identra server, so it is not known whether the status changed. Refresh the list to see the current status.',
    unavailable: 'The Identra server is busy. The status has not changed.',
  },
  statusChanged: 'Saved: {name}\'s diploma is now “{status}”.',
  timingNote: 'Identra\'s own checks see it at once; other verifiers may take up to 15 minutes.',
};

export const SCHOOL_PORTAL_PAGE_TRANSLATIONS = {
  en,
  vi,
} as const satisfies Record<'en' | 'vi', SchoolPortalPageCopy>;

/**
 * The public sample student accounts seeded by the server (vc-api.md section 5). The registrar's account is
 * private (its password is set by the operator) and is never listed or prefilled here.
 */
export const SCHOOL_PORTAL_SAMPLE_ACCOUNTS = ['sv001', 'sv002', 'sv003'] as const;

export const SCHOOL_PORTAL_SAMPLE_PASSWORD = 'Identra@2026';
