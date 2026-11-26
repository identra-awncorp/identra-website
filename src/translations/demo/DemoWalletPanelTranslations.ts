/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { WalletCredentialStatus } from '@identra/sdk-app';
import type { DiplomaField, WalletCheckNote, WalletProblem } from '../../identra/demoWalletModel';

// The web trial wallet speaks like the Identra app (identra-app src/native/i18n, `wallet`), with the words
// changed only where a browser is not a phone (no fingerprint prompt, nothing kept after a reload).
// Offered in Vietnamese and English, like the guided demo that shows it.
export interface DemoWalletPanelCopy {
  phoneLabel: string;
  trialBadge: string;
  trialStrip: string;
  honestyTitle: string;
  honestyBody: string;
  loadingWallet: string;
  loadFailed: string;
  retry: string;
  homeTitle: string;
  count: string;
  emptyTitle: string;
  emptyLead: string;
  documentTypes: { diploma: string; unknown: string };
  receivedOn: string;
  statuses: Record<WalletCredentialStatus, string>;
  openDocument: string;
  detailTitle: string;
  fieldsSection: string;
  issuerLabel: string;
  issuerUnknown: string;
  /** A CertNet document: how its issuer was checked, shown with the issuer's identifier (that path has no name). */
  issuerCertNet: string;
  issuerIdShowFull: string;
  issuerIdHideFull: string;
  /** What CertNet is, on the detail screen of such a document. */
  certnetAbout: string;
  statusSection: string;
  checkedAt: string;
  checkAgain: string;
  checking: string;
  checkFailed: string;
  checkNotes: Record<WalletCheckNote, string>;
  backToList: string;
  receiveTitle: string;
  checkingOffer: string;
  offerTitle: string;
  lead: string;
  documentLabel: string;
  senderLabel: string;
  senderHint: string;
  pinLabel: string;
  pinHint: string;
  pinIncomplete: string;
  keyNote: string;
  accept: string;
  accepting: string;
  cancel: string;
  savedTitle: string;
  savedIssuer: string;
  savedLead: string;
  savedLeadUnchecked: string;
  savedIssuerCertNet: string;
  savedIssuerCertNetUnchecked: string;
  savedLeadCertNet: string;
  savedLeadCertNetUnchecked: string;
  viewDocument: string;
  nothingSaved: string;
  offerFailedTitle: string;
  presentTitle: string;
  checkingRequest: string;
  verifiedMark: string;
  wantsToSee: string;
  wantsToSeeUnnamed: string;
  untrustedTitle: string;
  untrustedBody: string;
  purpose: string;
  expiresIn: string;
  documentInUse: string;
  fieldsTitle: string;
  requestedTitle: string;
  required: string;
  optionsTitle: string;
  optionFull: string;
  optionOnly: string;
  stayingLine: string;
  chooseFirst: string;
  requiredHint: string;
  share: string;
  sending: string;
  decline: string;
  noMatchTitle: string;
  noMatchBody: string;
  blocked: { revoked: string; suspended: string; invalid: string };
  sentTitle: string;
  sentTitleUnnamed: string;
  sentBody: string;
  sentFields: string;
  declinedTitle: string;
  declinedBody: string;
  requestFailedTitle: string;
  backHome: string;
  problems: Record<WalletProblem, string>;
  claims: Record<DiplomaField, string>;
  listJoiner: string;
  inboxAnnouncement: string;
}

const vi: DemoWalletPanelCopy = {
  phoneLabel: 'Ví thử trên web, mô phỏng màn hình điện thoại',
  trialBadge: 'Ví thử trên web',
  trialStrip: 'Chỉ để trình diễn, không phải ứng dụng Identra',
  honestyTitle: 'Ví thử này là gì?',
  honestyBody: 'Ví chạy ngay trong trình duyệt để bạn trải nghiệm khi chưa có ứng dụng, với cùng phần mềm ví và cùng các bước kiểm tra như ứng dụng. Khóa và giấy tờ chỉ nằm trong bộ nhớ của tab này và mất khi bạn tải lại trang. Ứng dụng Identra thật giữ khóa trong phần cứng bảo mật của điện thoại; ứng dụng đang được thử nghiệm nội bộ và chưa có trên App Store hay Google Play.',
  loadingWallet: 'Đang mở ví thử…',
  loadFailed: 'Chưa mở được ví thử. Kiểm tra mạng rồi thử lại.',
  retry: 'Thử lại',
  homeTitle: 'Giấy tờ của tôi',
  count: '{count} giấy tờ trong ví',
  emptyTitle: 'Ví chưa có giấy tờ nào',
  emptyLead: 'Khi trường đưa mã nhận bằng vào ví, ví sẽ cho bạn xem trước rồi hỏi mã PIN.',
  documentTypes: { diploma: 'Bằng tốt nghiệp', unknown: 'Loại giấy tờ khác' },
  receivedOn: 'Nhận lúc {time}',
  statuses: {
    valid: 'Đã xác minh',
    unknown: 'Chưa kiểm được trạng thái',
    revoked: 'Đã bị thu hồi',
    suspended: 'Đang tạm ngưng',
    invalid: 'Không qua kiểm tra',
  },
  openDocument: 'Xem {document}',
  detailTitle: 'Giấy tờ',
  fieldsSection: 'Thông tin trên giấy tờ',
  issuerLabel: 'Nơi cấp',
  issuerUnknown: 'Chưa xác nhận được nơi cấp',
  issuerCertNet: 'Nơi cấp kiểm tra qua CertNet',
  issuerIdShowFull: 'Xem mã đầy đủ',
  issuerIdHideFull: 'Thu gọn',
  certnetAbout: 'Nơi cấp của giấy tờ này được kiểm tra qua CertNet, một sổ đăng ký nơi cấp giấy tờ đang thử nghiệm, thay cho danh sách của Identra. CertNet chưa ghi tên nơi cấp nên ví chỉ hiện mã định danh của họ.',
  statusSection: 'Hiệu lực',
  checkedAt: 'Kiểm tra lần cuối lúc {time}',
  checkAgain: 'Kiểm tra lại',
  checking: 'Đang kiểm tra…',
  checkFailed: 'Chưa kiểm tra được. Kiểm tra mạng rồi thử lại.',
  checkNotes: {
    certnetUnavailable: 'CertNet chưa trả lời nên ví chưa kiểm được nơi cấp. Hãy thử lại sau.',
    issuerNotRecognised: 'CertNet không còn công nhận nơi cấp này cho loại giấy tờ này.',
  },
  backToList: 'Về danh sách giấy tờ',
  receiveTitle: 'Nhận giấy tờ',
  checkingOffer: 'Đang kiểm tra mã nhận bằng…',
  offerTitle: 'Bạn được mời nhận {document}',
  lead: 'Xem nơi gửi và loại giấy tờ trước khi nhận.',
  documentLabel: 'Giấy tờ',
  senderLabel: 'Nơi gửi',
  senderHint: 'Lúc này ví mới chỉ biết địa chỉ nơi gửi. Trước khi lưu, ví kiểm tra nơi cấp có được Identra công nhận, rồi cho bạn biết tên chính thức.',
  pinLabel: 'Mã PIN 6 chữ số nơi cấp đưa cho bạn',
  pinHint: 'Mã PIN hiện ngay cạnh mã nhận bằng trên trang của trường.',
  pinIncomplete: 'Nhập đủ mã PIN để tiếp tục.',
  keyNote: 'Ví tạo một khóa riêng cho giấy tờ này. Ở ứng dụng thật, điện thoại hỏi vân tay hoặc khuôn mặt để tạo khóa; ví thử tạo khóa ngay trong trình duyệt.',
  accept: 'Nhận giấy tờ',
  accepting: 'Đang nhận và kiểm tra giấy tờ…',
  cancel: 'Hủy',
  savedTitle: 'Đã lưu vào ví',
  savedIssuer: 'Nơi cấp: {name}, được Identra công nhận.',
  savedLead: 'Giấy tờ đã qua kiểm tra: chữ ký của nơi cấp khớp, nơi cấp được Identra công nhận và giấy tờ còn hiệu lực.',
  savedLeadUnchecked: 'Giấy tờ đã được lưu. Ví chưa kiểm được trạng thái của nó lúc nhận; hãy kiểm tra lại khi có mạng.',
  savedIssuerCertNet: 'Nơi cấp được công nhận trên CertNet, mã định danh:',
  savedIssuerCertNetUnchecked: 'Nơi cấp kiểm tra qua CertNet, mã định danh:',
  savedLeadCertNet: 'Giấy tờ đã qua kiểm tra: chữ ký khớp với khóa của nơi cấp trên CertNet, nơi cấp được công nhận cho loại giấy tờ này và giấy tờ còn hiệu lực.',
  savedLeadCertNetUnchecked: 'Giấy tờ đã được lưu nhưng chưa kiểm xong: lúc nhận, CertNet hoặc nơi cấp chưa trả lời. Hãy kiểm tra lại sau.',
  viewDocument: 'Xem giấy tờ',
  nothingSaved: 'Chưa có gì được lưu vào ví.',
  offerFailedTitle: 'Không nhận được giấy tờ',
  presentTitle: 'Chia sẻ giấy tờ',
  checkingRequest: 'Đang kiểm tra bên yêu cầu…',
  verifiedMark: 'Đã được Identra xác nhận',
  wantsToSee: '{name} muốn xem giấy tờ của bạn',
  wantsToSeeUnnamed: 'Có bên muốn xem giấy tờ của bạn',
  untrustedTitle: 'Bên này chưa được Identra xác nhận',
  untrustedBody: 'Ví thử không chia sẻ với bên chưa được xác nhận. Chưa có gì được gửi.',
  purpose: 'Mục đích: {purpose}',
  expiresIn: 'Còn {time}',
  documentInUse: 'Giấy tờ sẽ dùng',
  fieldsTitle: 'Thông tin sẽ rời ví',
  requestedTitle: 'Họ yêu cầu',
  required: 'Bắt buộc',
  optionsTitle: 'Bạn muốn gửi bao nhiêu?',
  optionFull: 'Gửi đủ {count} thông tin họ hỏi',
  optionOnly: 'Chỉ gửi {fields}',
  stayingLine: 'Không rời ví lần này: {fields}',
  chooseFirst: 'Chọn mức chia sẻ để tiếp tục.',
  requiredHint: 'Thông tin bắt buộc không bỏ được. Nếu không muốn gửi, hãy từ chối.',
  share: 'Chia sẻ',
  sending: 'Đang ký và gửi…',
  decline: 'Từ chối',
  noMatchTitle: 'Ví chưa có giấy tờ được yêu cầu',
  noMatchBody: 'Bên yêu cầu cần một bằng tốt nghiệp mà ví chưa có. Hãy nhận bằng từ trường trước.',
  blocked: {
    revoked: 'Nơi cấp đã thu hồi giấy tờ này nên bên yêu cầu sẽ không chấp nhận. Ví không gửi đi.',
    suspended: 'Nơi cấp đang tạm ngưng giấy tờ này nên bên yêu cầu sẽ không chấp nhận. Ví không gửi đi.',
    invalid: 'Giấy tờ này không còn qua được kiểm tra nên bên yêu cầu sẽ không chấp nhận. Ví không gửi đi.',
  },
  sentTitle: 'Đã gửi cho {name}',
  sentTitleUnnamed: 'Đã gửi',
  sentBody: 'Kết quả kiểm tra hiện ở phía bên yêu cầu, không phải trong ví.',
  sentFields: 'Đã chia sẻ: {fields}',
  declinedTitle: 'Đã từ chối',
  declinedBody: 'Không có thông tin nào rời ví.',
  requestFailedTitle: 'Không chia sẻ được',
  backHome: 'Về giấy tờ của tôi',
  problems: {
    pinWrong: 'Mã PIN không khớp. Kiểm tra mã PIN cạnh mã nhận bằng rồi nhập lại.',
    pinRequired: 'Nhập mã PIN 6 chữ số rồi bấm Nhận giấy tờ.',
    offerExpired: 'Mã nhận bằng đã hết hạn hoặc đã được dùng. Hãy xin trường một mã mới.',
    offerInvalid: 'Đây không phải mã nhận giấy tờ mà ví dùng được.',
    offerNeedsCertNet: 'Ví thử ở trang này không nhận được giấy tờ này. Có thể nơi cấp được kiểm tra qua CertNet, một sổ đăng ký nơi cấp giấy tờ mà ví thử ở đây chưa dùng.',
    notAllowed: 'Mã này dẫn tới một địa chỉ không phải máy chủ Identra nên ví không mở.',
    network: 'Không kết nối được máy chủ Identra. Kiểm tra mạng rồi thử lại.',
    certnetUnavailable: 'CertNet chưa trả lời nên ví chưa kiểm được nơi cấp. Chưa có gì được lưu. Bấm Nhận giấy tờ để thử lại, không cần nhập lại mã PIN.',
    issuerError: 'Nơi cấp trả lời không như mong đợi. Hãy thử lại sau ít phút.',
    credentialInvalid: 'Giấy tờ nhận được không qua được kiểm tra nên chưa được lưu.',
    storage: 'Ví thử chưa lưu hay mở được giấy tờ. Hãy thử lại.',
    requestInvalid: 'Yêu cầu này không đúng dạng nên ví không mở. Chưa có gì được gửi.',
    requestExpired: 'Yêu cầu đã hết hạn. Hãy tạo yêu cầu mới ở phía nhà tuyển dụng. Chưa có gì được gửi.',
    verifierUntrusted: 'Bên yêu cầu chưa được Identra xác nhận nên ví không gửi gì.',
    trustListUnavailable: 'Ví chưa tải được danh sách bên được Identra công nhận nên chưa biết ai đang yêu cầu. Chưa có gì được gửi; hãy thử lại.',
    certificateInvalid: 'Không xác nhận được danh tính của bên yêu cầu. Chưa có gì được gửi.',
    submitNetwork: 'Mất kết nối khi đang gửi, có thể bên yêu cầu chưa nhận được. Hãy tạo yêu cầu mới rồi gửi lại.',
    submitVerifierError: 'Bên yêu cầu không xác nhận đã nhận. Xem kết quả ở phía họ; nếu chưa có, hãy tạo yêu cầu mới.',
    requestClosed: 'Yêu cầu này đã được trả lời hoặc không còn dùng được. Hãy tạo yêu cầu mới.',
    other: 'Ví thử chưa làm được việc này. Chưa có gì thay đổi; hãy thử lại.',
  },
  claims: {
    ho_ten: 'Họ và tên',
    ngay_sinh: 'Ngày sinh',
    ma_sinh_vien: 'Mã sinh viên',
    nganh: 'Ngành',
    hang_tot_nghiep: 'Hạng tốt nghiệp',
    nam_tot_nghiep: 'Năm tốt nghiệp',
    so_hieu_bang: 'Số hiệu bằng',
  },
  listJoiner: ', ',
  inboxAnnouncement: 'Ví thử vừa nhận một mã mới.',
};

const en: DemoWalletPanelCopy = {
  phoneLabel: 'Web trial wallet, shown as a phone screen',
  trialBadge: 'Web trial wallet',
  trialStrip: 'For the demo only, not the Identra app',
  honestyTitle: 'What is this trial wallet?',
  honestyBody: 'It runs right in your browser so you can try Identra without the app, using the same wallet software and the same checks as the app. Keys and documents live only in this tab\'s memory and are gone when you reload the page. The real Identra app keeps keys in the phone\'s secure hardware; it is in internal testing and not yet on the App Store or Google Play.',
  loadingWallet: 'Opening the trial wallet…',
  loadFailed: 'The trial wallet did not open. Check your connection and try again.',
  retry: 'Try again',
  homeTitle: 'My documents',
  count: '{count} documents in the wallet',
  emptyTitle: 'No documents yet',
  emptyLead: 'When the university puts a diploma code into the wallet, the wallet shows you what it is and asks for the PIN.',
  documentTypes: { diploma: 'Diploma', unknown: 'Other document' },
  receivedOn: 'Received at {time}',
  statuses: {
    valid: 'Verified',
    unknown: 'Status not checked yet',
    revoked: 'Revoked',
    suspended: 'Suspended',
    invalid: 'Failed the checks',
  },
  openDocument: 'Open {document}',
  detailTitle: 'Document',
  fieldsSection: 'What the document says',
  issuerLabel: 'Issued by',
  issuerUnknown: 'Issuer not confirmed yet',
  issuerCertNet: 'Issuer checked through CertNet',
  issuerIdShowFull: 'Show full identifier',
  issuerIdHideFull: 'Show less',
  certnetAbout: 'This document\'s issuer is checked through CertNet, a register of document issuers being trialled, instead of Identra\'s list. CertNet records no name for the issuer yet, so the wallet shows only its identifier.',
  statusSection: 'Validity',
  checkedAt: 'Last checked at {time}',
  checkAgain: 'Check again',
  checking: 'Checking…',
  checkFailed: 'Could not check. Check your connection and try again.',
  checkNotes: {
    certnetUnavailable: 'CertNet is not answering, so the wallet could not check the issuer. Try again later.',
    issuerNotRecognised: 'CertNet no longer recognises this issuer for this kind of document.',
  },
  backToList: 'Back to my documents',
  receiveTitle: 'Receive a document',
  checkingOffer: 'Checking the code…',
  offerTitle: 'You are invited to receive a {document}',
  lead: 'Look at where it comes from and what it is before you accept.',
  documentLabel: 'Document',
  senderLabel: 'Sent from',
  senderHint: 'For now the wallet only knows the sender\'s address. Before saving, it checks that Identra recognises the issuer, then tells you its official name.',
  pinLabel: 'The 6-digit PIN the issuer gave you',
  pinHint: 'The PIN is shown right next to the diploma code on the university\'s page.',
  pinIncomplete: 'Enter the whole PIN to continue.',
  keyNote: 'The wallet makes a key for this document alone. In the real app the phone asks for your fingerprint or face to make it; the trial wallet makes it in the browser.',
  accept: 'Accept document',
  accepting: 'Receiving and checking the document…',
  cancel: 'Cancel',
  savedTitle: 'Saved to the wallet',
  savedIssuer: 'Issued by {name}, recognised by Identra.',
  savedLead: 'The document passed the checks: the issuer\'s signature matches, Identra recognises the issuer and the document is valid.',
  savedLeadUnchecked: 'The document is saved. The wallet could not check its status on receipt; check again when you are online.',
  savedIssuerCertNet: 'Issuer recognised on CertNet, identifier:',
  savedIssuerCertNetUnchecked: 'Issuer checked through CertNet, identifier:',
  savedLeadCertNet: 'The document passed the checks: the signature matches the issuer\'s key on CertNet, the issuer is recognised for this kind of document and the document is valid.',
  savedLeadCertNetUnchecked: 'The document is saved but not fully checked: CertNet or the issuer was not answering on receipt. Check again later.',
  viewDocument: 'View document',
  nothingSaved: 'Nothing was saved to the wallet.',
  offerFailedTitle: 'Document not received',
  presentTitle: 'Share a document',
  checkingRequest: 'Checking who is asking…',
  verifiedMark: 'Confirmed by Identra',
  wantsToSee: '{name} wants to see your document',
  wantsToSeeUnnamed: 'Someone wants to see your document',
  untrustedTitle: 'Identra has not confirmed who this is',
  untrustedBody: 'The trial wallet does not share with an unconfirmed party. Nothing was sent.',
  purpose: 'Purpose: {purpose}',
  expiresIn: '{time} left',
  documentInUse: 'Document to use',
  fieldsTitle: 'What leaves the wallet',
  requestedTitle: 'What they ask for',
  required: 'Required',
  optionsTitle: 'How much do you want to send?',
  optionFull: 'Send all {count} details they asked for',
  optionOnly: 'Send only {fields}',
  stayingLine: 'Not leaving the wallet this time: {fields}',
  chooseFirst: 'Choose how much to share to continue.',
  requiredHint: 'Required details cannot be left out. If you do not want to send them, decline.',
  share: 'Share',
  sending: 'Signing and sending…',
  decline: 'Decline',
  noMatchTitle: 'The wallet does not hold what they ask for',
  noMatchBody: 'They need a diploma the wallet does not hold yet. Receive one from the university first.',
  blocked: {
    revoked: 'The issuer revoked this document, so they will not accept it. The wallet does not send it.',
    suspended: 'The issuer suspended this document, so they will not accept it. The wallet does not send it.',
    invalid: 'This document no longer passes the checks, so they will not accept it. The wallet does not send it.',
  },
  sentTitle: 'Sent to {name}',
  sentTitleUnnamed: 'Sent',
  sentBody: 'The result of the check appears on their side, not in the wallet.',
  sentFields: 'Shared: {fields}',
  declinedTitle: 'Declined',
  declinedBody: 'Nothing left the wallet.',
  requestFailedTitle: 'Not shared',
  backHome: 'Back to my documents',
  problems: {
    pinWrong: 'The PIN does not match. Check the PIN next to the diploma code and enter it again.',
    pinRequired: 'Enter the 6-digit PIN, then press Accept document.',
    offerExpired: 'This diploma code has expired or was already used. Ask the university for a new one.',
    offerInvalid: 'This is not a document code the wallet can use.',
    offerNeedsCertNet: 'This trial wallet cannot receive this document here. The issuer may be checked through CertNet, a register of document issuers that this trial wallet does not use here.',
    notAllowed: 'This code points somewhere other than the Identra server, so the wallet does not open it.',
    network: 'Cannot reach the Identra server. Check your connection and try again.',
    certnetUnavailable: 'CertNet is not answering, so the wallet could not check the issuer. Nothing was saved. Press Accept document to try again; you do not need the PIN again.',
    issuerError: 'The issuer answered in an unexpected way. Try again in a few minutes.',
    credentialInvalid: 'The document received did not pass the checks, so it was not saved.',
    storage: 'The trial wallet could not save or open the document. Try again.',
    requestInvalid: 'This request is malformed, so the wallet does not open it. Nothing was sent.',
    requestExpired: 'The request has expired. Create a new one on the employer\'s side. Nothing was sent.',
    verifierUntrusted: 'Identra has not confirmed the requester, so the wallet sends nothing.',
    trustListUnavailable: 'The wallet could not load the list of parties Identra recognises, so it cannot tell who is asking. Nothing was sent; try again.',
    certificateInvalid: 'The requester\'s identity could not be confirmed. Nothing was sent.',
    submitNetwork: 'The connection dropped while sending; they may not have received it. Create a new request and send again.',
    submitVerifierError: 'They did not confirm receipt. Check their side; if there is no result, create a new request.',
    requestClosed: 'This request was already answered or can no longer be used. Create a new one.',
    other: 'The trial wallet could not do this. Nothing changed; try again.',
  },
  claims: {
    ho_ten: 'Full name',
    ngay_sinh: 'Date of birth',
    ma_sinh_vien: 'Student number',
    nganh: 'Major',
    hang_tot_nghiep: 'Degree classification',
    nam_tot_nghiep: 'Graduation year',
    so_hieu_bang: 'Diploma number',
  },
  listJoiner: ', ',
  inboxAnnouncement: 'The trial wallet just received a new code.',
};

export const DEMO_WALLET_PANEL_TRANSLATIONS = {
  en,
  vi,
} as const satisfies Record<'en' | 'vi', DemoWalletPanelCopy>;
