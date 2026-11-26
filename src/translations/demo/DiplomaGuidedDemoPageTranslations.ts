/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { BlockedStatus } from '../../identra/demoWalletModel';
import type { GuidedNotice, GuidedStepId } from '../../identra/guidedDiplomaDemo';
import type { SignInProblem } from '../../identra/schoolPortalState';

// The guided diploma demo is offered in Vietnamese and English (src/types/routes.ts,
// DEMO_SCENARIO_LOCALE_OVERRIDES). The school's and the employer's own wording comes from the portal's and
// the verifier dialog's translations; this file holds the guide around them.
export interface DiplomaGuidedDemoPageCopy {
  backToDemos: string;
  realLabel: string;
  title: string;
  intro: string;
  noAppTitle: string;
  noAppBody: string;
  stepperLabel: string;
  stepNumber: string;
  stepStatus: { done: string; current: string; upcoming: string };
  steps: Record<GuidedStepId, { title: string; summary: string; instructions: readonly string[] }>;
  instructionsTitle: string;
  /** Instead of a step's instructions while the employer holds a share it could not check yet (the wallet is locked to it). */
  deliveredInstructions: readonly string[];
  organisationSide: string;
  walletSide: string;
  // Step 1: the school
  signInSample: string;
  signingIn: string;
  signInProblems: Record<SignInProblem, string>;
  signedInAs: string;
  receive: string;
  codeTitle: string;
  pinHint: string;
  sendToWallet: string;
  sentToWallet: string;
  sendAgain: string;
  walletBusy: string;
  qrOfferLabel: string;
  qrOfferCaption: string;
  qrRequestLabel: string;
  qrRequestCaption: string;
  qrBeatsTitle: string;
  qrBeats: readonly string[];
  qrDirection: string;
  happenedTitle: string;
  happenedReceive: readonly string[];
  /** The same, when the wallet stored the diploma as "not checked yet" (a list could not be read at receipt). */
  happenedReceiveUnchecked: readonly string[];
  happenedRevoke: readonly string[];
  contactsTitle: string;
  contactWallet: string;
  contactSchool: string;
  contactChecks: string;
  contactDemoNote: string;
  stayedTitle: string;
  stayedNote: string;
  requestDeclinedTitle: string;
  requestDeclinedBody: string;
  clockSkew: string;
  tabsLabel: string;
  tabs: { school: string; employer: string; wallet: string };
  tabTurn: string;
  notThisStep: { school: string; employer: string };
  // Step 2: the employer
  employerName: string;
  employerJob: string;
  requestedTitle: string;
  requestedBody: string;
  apply: string;
  openRequestInWallet: string;
  requestReady: string;
  requestExpiresIn: string;
  requestExpiredTitle: string;
  requestExpiredBody: string;
  newRequest: string;
  requestSentToWallet: string;
  /** Under the request while the employer holds a share it could not check yet. */
  requestDeliveredInWallet: string;
  appliedNext: string;
  verifierUnavailableHint: string;
  // Step 3: revoke and try again
  schoolRevokeTitle: string;
  schoolRevokeBody: string;
  diplomaRow: string;
  noDiplomaListed: string;
  revokedNote: string;
  employerAgainTitle: string;
  employerAgainBody: string;
  verifyAgain: string;
  refusedByEmployer: string;
  refusedByWallet: Record<BlockedStatus, string>;
  otherFailure: string;
  passedAfterRevoke: string;
  // Problems that end the run
  notices: Record<GuidedNotice, { title: string; body: string }>;
  restart: string;
  restartConfirmHint: string;
  // The end
  endTitle: string;
  endPoints: readonly string[];
  endRootTitle: string;
  endRootBody: string;
  endRootDownload: string;
  endProductDemo: string;
  endSecurity: string;
  endAllDemos: string;
  /** The choice between the two sample schools, shown only in a build with CertNet. */
  runSwitch: { label: string; x509: string; certnet: string; hint: string };
  /**
   * The CertNet run (?truong=certnet): what replaces the sentences about Identra's list and the certificate.
   * That school is recognised through CertNet and shown by its identifier, without a name.
   */
  certnetRun: Pick<DiplomaGuidedDemoPageCopy, 'happenedReceive' | 'happenedReceiveUnchecked' | 'contactChecks' | 'endRootTitle' | 'endRootBody'> & {
    receiveInstructions: readonly string[];
    /** The caption under the "30 seconds" diagram. */
    registry: string;
  };
}

const vi: DiplomaGuidedDemoPageCopy = {
  backToDemos: 'Tất cả demo',
  realLabel: 'Chạy thật trên máy chủ Identra',
  title: 'Thử nhận và dùng bằng tốt nghiệp',
  intro: 'Bạn đóng vai một sinh viên vừa tốt nghiệp. Làm lần lượt ba bước dưới đây; mỗi bước nói rõ bấm gì và sẽ thấy gì. Chữ ký số và các bước kiểm tra là thật, còn trường, người và nhà tuyển dụng là dữ liệu mẫu.',
  noAppTitle: 'Không cần cài ứng dụng',
  noAppBody: 'Ví thử trên web đóng vai điện thoại của bạn. Ứng dụng Identra đang được thử nghiệm nội bộ, chưa có trên App Store hay Google Play.',
  stepperLabel: 'Các bước của demo',
  stepNumber: 'Bước {number}',
  stepStatus: { done: 'Xong', current: 'Đang làm', upcoming: 'Chưa tới' },
  steps: {
    receive: {
      title: 'Nhận bằng từ trường',
      summary: 'Trường cấp bằng tốt nghiệp vào ví của bạn.',
      instructions: [
        'Bấm “Đăng nhập bằng tài khoản mẫu”. Bạn thấy hồ sơ tốt nghiệp của một sinh viên mẫu.',
        'Bấm “Nhận bằng tốt nghiệp”. Trường hiện mã nhận bằng và mã PIN 6 số.',
        'Bấm “Đưa mã này vào ví thử” (ngoài đời, bạn quét mã QR). Ví cho xem nơi gửi và loại giấy tờ.',
        'Gõ mã PIN vào ví rồi bấm “Nhận giấy tờ”. Bằng hiện trong ví và demo sang bước 2.',
      ],
    },
    apply: {
      title: 'Ứng tuyển bằng tấm bằng',
      summary: 'Nhà tuyển dụng kiểm tra bằng mà không cần gọi cho trường.',
      instructions: [
        'Bấm “Ứng tuyển bằng Identra”. Nhà tuyển dụng tạo một yêu cầu xác minh.',
        'Bấm “Mở yêu cầu trong ví thử”. Ví cho biết ai đang hỏi và những thông tin nào sẽ được gửi.',
        'Chọn mức chia sẻ trong ví rồi bấm “Chia sẻ”.',
        'Bên nhà tuyển dụng hiện kết quả từng bước kiểm tra, chỉ với những thông tin bạn đã chọn gửi.',
      ],
    },
    revoke: {
      title: 'Thu hồi và thử lại',
      summary: 'Bản bằng bị thu hồi thì lần kiểm tra sau bị từ chối.',
      instructions: [
        'Giả sử điện thoại giữ bằng bị mất. Bấm “Thu hồi bằng này” ở phía trường rồi xác nhận.',
        'Bấm “Kiểm tra lại bằng này” ở phía nhà tuyển dụng, rồi “Mở yêu cầu trong ví thử” và “Chia sẻ” như ở bước 2.',
        'Lần này kết quả không đạt, đúng ở bước kiểm tra bằng còn hiệu lực.',
      ],
    },
  },
  instructionsTitle: 'Bấm gì, sẽ thấy gì',
  deliveredInstructions: [
    'Nhà tuyển dụng đã nhận bằng nhưng lúc này chưa kiểm tra được, nên chưa có kết luận nào.',
    'Đợi một lát rồi bấm “Gửi lại” trong ví thử. Ví chỉ gửi lại đúng tấm bằng và đúng những thông tin đã gửi; bấm “Mở yêu cầu trong ví thử” lần nữa thì ví cũng chỉ cho “Gửi lại” hoặc “Dừng”.',
    'Khi kiểm tra được, bên nhà tuyển dụng hiện kết quả. Nếu ví báo không gửi lại được nữa, hãy đợi yêu cầu hết hạn rồi tạo yêu cầu mới.',
  ],
  organisationSide: 'Phía tổ chức',
  walletSide: 'Ví của bạn',
  signInSample: 'Đăng nhập bằng tài khoản mẫu',
  signingIn: 'Đang đăng nhập…',
  signInProblems: {
    invalid_credentials: 'Tài khoản mẫu không đăng nhập được. Hãy báo cho chúng tôi; bạn có thể thử lại sau.',
    rejected: 'Máy chủ không nhận yêu cầu đăng nhập này. Thử lại sau ít phút.',
    rate_limited: 'Mạng của bạn vừa đăng nhập quá nhiều lần.',
    network: 'Không kết nối được máy chủ Identra. Kiểm tra mạng rồi thử lại.',
    unavailable: 'Máy chủ Identra đang bận. Thử lại sau ít phút.',
    unusable: 'Máy chủ Identra đã trả lời, nhưng trang này không dùng được câu trả lời đó nên chưa đăng nhập được. Tải lại trang rồi thử lại.',
    school_not_here: 'Trang này hiện chưa làm việc được với trường mẫu này. Hãy mở lại demo từ trang Tất cả demo.',
  },
  signedInAs: 'Đã đăng nhập: {name}, ngành {major}',
  receive: 'Nhận bằng tốt nghiệp',
  codeTitle: 'Mã nhận bằng của bạn',
  pinHint: 'Ví thử sẽ hỏi mã PIN này. Ngoài đời, đừng đưa mã PIN cho người khác.',
  sendToWallet: 'Đưa mã này vào ví thử',
  sentToWallet: 'Đã đưa mã vào ví thử. Gõ mã PIN {pin} vào ví.',
  sendAgain: 'Đưa mã vào ví lần nữa',
  walletBusy: 'Ví đang xử lý, đợi một chút.',
  qrOfferLabel: 'Mã QR nhận bằng tốt nghiệp',
  qrOfferCaption: 'Ngoài đời, trường hiện mã QR này và bạn quét bằng ứng dụng Identra. Ở đây, nút bên cạnh làm thay việc quét.',
  qrRequestLabel: 'Mã QR yêu cầu xem bằng của nhà tuyển dụng',
  qrRequestCaption: 'Ngoài đời, trang tuyển dụng hiện mã này và bạn quét bằng điện thoại. Ở đây, nút bên cạnh làm thay việc quét.',
  qrBeatsTitle: 'Mã này là gì, và cái gì đi đâu',
  qrBeats: [
    'Mã là một phiếu yêu cầu có chữ ký của nhà tuyển dụng: ai hỏi, để làm gì, cần thông tin nào, hết hạn sau 5 phút. Trong mã không có thông tin của ai.',
    'Ví kiểm chữ ký trên phiếu và xem nhà tuyển dụng có trong danh sách được công nhận không, trước khi bạn đưa bất cứ thứ gì.',
    'Cái đi ra: những thông tin bạn chọn, chữ ký của trường trên chúng, và chữ ký của ví chỉ dùng được cho đúng phiếu này. Tất cả được mã hóa, gửi tới máy chủ xác minh của nhà tuyển dụng.',
    'Cái không đi: các thông tin khác trên bằng. Không có gì gửi tới trường.',
  ],
  qrDirection: 'Vì sao nhà tuyển dụng hiện mã và bạn quét, chứ không ngược lại: bạn cần biết ai đang hỏi trước khi đưa. Một mã chứa tấm bằng thì ai quét cũng đọc được.',
  happenedTitle: 'Điều vừa xảy ra',
  happenedReceive: [
    'Trường ký tấm bằng bằng khóa riêng của trường rồi gửi thẳng vào ví của bạn.',
    'Bằng nằm trong ví này. Máy chủ chỉ ghi lại bằng đã cấp cho sinh viên nào và ô của nó trong danh sách thu hồi; nó không giữ nội dung bằng.',
    'Ví tự kiểm trước khi lưu: đúng chữ ký của trường, trường có trong danh sách được công nhận, bằng còn hiệu lực.',
  ],
  happenedReceiveUnchecked: [
    'Trường ký tấm bằng bằng khóa riêng của trường rồi gửi thẳng vào ví của bạn.',
    'Bằng nằm trong ví này. Máy chủ chỉ ghi lại bằng đã cấp cho sinh viên nào và ô của nó trong danh sách thu hồi; nó không giữ nội dung bằng.',
    'Ví đã kiểm chữ ký trên bằng trước khi lưu. Nhưng lúc nhận, ví chưa đọc được danh sách cần dùng, nên chưa xác nhận được trường có được công nhận và bằng có còn hiệu lực hay không. Bằng được lưu với ghi chú chưa kiểm xong: mở bằng trong ví và bấm “Kiểm tra lại” sau.',
  ],
  happenedRevoke: [
    'Trường đánh dấu bản bằng này trong danh sách thu hồi có chữ ký. Không ai phải báo riêng cho nhà tuyển dụng.',
    'Lần kiểm sau, nhà tuyển dụng đọc danh sách đó và thấy ngay. Bên kiểm khác dùng bản lưu tạm có thể chậm tới 15 phút.',
    'Không ai xóa hay sửa được ví của bạn từ xa: bản bằng vẫn nằm trong ví, chỉ là không còn qua kiểm tra.',
  ],
  contactsTitle: 'Điều vừa xảy ra: ai đã liên lạc với ai',
  contactWallet: 'Ví → Nhà tuyển dụng: {fields}, kèm chữ ký của trường và chữ ký của ví cho riêng yêu cầu này.',
  contactSchool: 'Nhà tuyển dụng → Trường: không lần nào.',
  contactChecks: 'Để kiểm, nhà tuyển dụng chỉ dùng danh sách tổ chức được công nhận và danh sách thu hồi, cả hai đều có chữ ký; không hỏi ai về bạn.',
  contactDemoNote: 'Trong bản demo, máy chủ Identra chạy cả phần của trường lẫn phần của nhà tuyển dụng. Kết quả kiểm tra và các thông tin đã gửi được giữ 30 phút rồi xóa.',
  stayedTitle: 'Ở lại trong ví của bạn',
  stayedNote: 'Nhà tuyển dụng không nhận các thông tin này.',
  requestDeclinedTitle: 'Bạn đã từ chối trong ví',
  requestDeclinedBody: 'Không có thông tin nào được gửi; nhà tuyển dụng không nhận được gì. Yêu cầu này không dùng được nữa.',
  clockSkew: 'Giờ trên máy bạn đang lệch khoảng {minutes} phút so với giờ của máy chủ. Ví thử đã tự chỉnh theo giờ máy chủ; ngoài đời, hãy đặt lại giờ trên máy.',
  tabsLabel: 'Xem phía nào',
  tabs: { school: 'Trường', employer: 'Nhà tuyển dụng', wallet: 'Ví của bạn' },
  tabTurn: 'đến lượt',
  notThisStep: { school: 'Ở bước này, trường không cần làm gì.', employer: 'Nhà tuyển dụng chưa tham gia ở bước này.' },
  employerName: 'Nhà tuyển dụng Mẫu (DEMO)',
  employerJob: 'Tuyển kỹ sư phần mềm',
  requestedTitle: 'Hồ sơ cần',
  requestedBody: 'Bắt buộc: họ và tên, ngành. Không bắt buộc: hạng tốt nghiệp, năm tốt nghiệp.',
  apply: 'Ứng tuyển bằng Identra',
  openRequestInWallet: 'Mở yêu cầu trong ví thử',
  requestReady: 'Yêu cầu đã sẵn sàng. Bấm “Mở yêu cầu trong ví thử”.',
  requestExpiresIn: 'Yêu cầu còn hiệu lực trong {time}',
  requestExpiredTitle: 'Yêu cầu đã hết hạn',
  requestExpiredBody: 'Mỗi yêu cầu chỉ dùng được trong 5 phút. Tạo yêu cầu mới để thử lại.',
  newRequest: 'Tạo yêu cầu mới',
  requestSentToWallet: 'Đã mở yêu cầu trong ví thử. Xem ví rồi bấm “Chia sẻ”.',
  requestDeliveredInWallet: 'Nhà tuyển dụng đã nhận bằng nhưng chưa kiểm tra được. Đợi một lát rồi bấm “Gửi lại” trong ví thử.',
  appliedNext: 'Tiếp: thu hồi và thử lại',
  verifierUnavailableHint: 'Nếu lỗi kéo dài, hãy thử lại sau ít phút.',
  schoolRevokeTitle: 'Phía trường: thu hồi bản bằng trên điện thoại bị mất',
  schoolRevokeBody: 'Có hai lý do thu hồi: phòng đào tạo thu hồi một bằng cấp nhầm; hoặc bạn thu hồi bản bằng trên chiếc điện thoại bị mất, rồi nhận lại bản mới. Bản demo cho bạn tự làm cách thứ hai. Thu hồi bản này không xóa bằng cấp của bạn.',
  diplomaRow: 'Bằng cấp lúc {time} ngày {date}',
  noDiplomaListed: 'Trường không còn thấy bằng đã cấp trong lần đăng nhập này.',
  revokedNote: 'Bản bằng này đã bị thu hồi. Ví thử chưa biết điều đó; giờ thử dùng nó thêm một lần.',
  employerAgainTitle: 'Phía nhà tuyển dụng: kiểm tra lại',
  employerAgainBody: 'Nhà tuyển dụng tạo một yêu cầu mới và kiểm tra lại bằng như ở bước 2.',
  verifyAgain: 'Kiểm tra lại bằng này',
  refusedByEmployer: 'Nhà tuyển dụng từ chối vì bản bằng này đã bị thu hồi: chữ ký vẫn đúng, chỉ bước kiểm tra còn hiệu lực không đạt.',
  refusedByWallet: {
    revoked: 'Ví thử đã biết bản bằng này bị thu hồi nên không cho chia sẻ, đúng như ứng dụng Identra sẽ làm. Nhà tuyển dụng không nhận được gì.',
    suspended: 'Ví thử đã biết bản bằng này đang bị tạm dừng nên không cho chia sẻ, đúng như ứng dụng Identra sẽ làm. Nhà tuyển dụng không nhận được gì.',
    invalid: 'Ví thử thấy bản bằng này không còn qua kiểm tra nên không cho chia sẻ, đúng như ứng dụng Identra sẽ làm. Nhà tuyển dụng không nhận được gì.',
  },
  otherFailure: 'Lần kiểm tra này không đạt vì một lý do khác. Thử kiểm tra lại.',
  passedAfterRevoke: 'Lần kiểm tra này vẫn đạt, có thể vì thu hồi chưa tới kịp. Thử kiểm tra lại.',
  notices: {
    reloaded: {
      title: 'Trang vừa được tải lại',
      body: 'Ví thử và phiên đăng nhập chỉ nằm trong bộ nhớ của tab này nên đã bị xóa. Bắt đầu lại từ bước 1.',
    },
    sessionLost: {
      title: 'Phiên đăng nhập của trường đã hết hạn',
      body: 'Phiên chỉ kéo dài 30 phút, và chỉ chính phiên đã cấp bằng mới thu hồi được bằng đó. Làm lại từ đầu để tiếp tục.',
    },
  },
  restart: 'Làm lại từ đầu',
  restartConfirmHint: 'Ví thử sẽ được làm trống và bạn đăng nhập lại từ bước 1.',
  endTitle: 'Bạn vừa thấy gì',
  endPoints: [
    'Trường cấp bằng có chữ ký số vào ví của bạn. Bằng nằm trong ví của bạn, không cần hỏi lại trường mỗi lần dùng.',
    'Bạn chọn đúng những thông tin gửi đi, và nhà tuyển dụng tự kiểm tra được bằng là thật.',
    'Khi bản bằng bị thu hồi, lần kiểm tra kế tiếp thấy ngay và từ chối; bằng cấp của bạn không bị xóa.',
  ],
  endRootTitle: 'Chứng thư gốc mà ví và nhà tuyển dụng tin',
  endRootBody: 'Mọi chữ ký trong demo truy về chứng thư gốc DEMO này. Dấu vân tay SHA-256:',
  endRootDownload: 'Tải tệp chứng thư gốc',
  endProductDemo: 'Demo hành trình sản phẩm',
  endSecurity: 'Bảo mật: đã có gì, chưa có gì',
  endAllDemos: 'Tất cả demo',
  runSwitch: {
    label: 'Ví nhận ra trường bằng cách nào',
    x509: 'Danh sách của Identra',
    certnet: 'CertNet (thử nghiệm)',
    hint: 'Mỗi cách dùng một trường mẫu riêng. Đổi cách thì demo làm lại từ đầu.',
  },
  certnetRun: {
    receiveInstructions: [
      'Bấm “Đăng nhập bằng tài khoản mẫu”. Bạn thấy hồ sơ tốt nghiệp của một sinh viên mẫu.',
      'Bấm “Nhận bằng tốt nghiệp”. Trường hiện mã nhận bằng và mã PIN 6 số.',
      'Bấm “Đưa mã này vào ví thử” (ngoài đời, bạn quét mã QR). Ví cho xem nơi gửi, loại giấy tờ và mã định danh trường tự khai. Không có tên trường: ví sẽ tìm trường qua CertNet.',
      'Gõ mã PIN vào ví rồi bấm “Nhận giấy tờ”. Bằng hiện trong ví, nơi cấp hiện bằng mã định danh, và demo sang bước 2.',
    ],
    registry: 'Ở lượt này, để biết con dấu đúng là của trường, bên kiểm tìm trường qua CertNet, một sổ đăng ký nơi cấp giấy tờ đang thử nghiệm.',
    happenedReceive: [
      'Trường ký tấm bằng bằng khóa riêng của trường rồi gửi thẳng vào ví của bạn.',
      'Bằng nằm trong ví này. Máy chủ chỉ ghi lại bằng đã cấp cho sinh viên nào và ô của nó trong danh sách thu hồi; nó không giữ nội dung bằng.',
      'Ví tự kiểm trước khi lưu: tìm trường qua CertNet, chữ ký khớp với khóa của trường ở đó, CertNet công nhận trường được cấp loại bằng này, bằng còn hiệu lực.',
      'CertNet chưa ghi tên trường nên ví hiện trường bằng mã định danh, không có tên.',
    ],
    happenedReceiveUnchecked: [
      'Trường ký tấm bằng bằng khóa riêng của trường rồi gửi thẳng vào ví của bạn.',
      'Bằng nằm trong ví này. Máy chủ chỉ ghi lại bằng đã cấp cho sinh viên nào và ô của nó trong danh sách thu hồi; nó không giữ nội dung bằng.',
      'Trước khi lưu, ví đã tìm thấy trường qua CertNet và thấy chữ ký khớp với khóa của trường ở đó. Nhưng lúc nhận, ví chưa có câu trả lời về việc CertNet có công nhận trường cho loại bằng này và bằng có còn hiệu lực hay không. Bằng được lưu với ghi chú chưa kiểm xong: mở bằng trong ví và bấm “Kiểm tra lại” sau.',
      'CertNet chưa ghi tên trường nên ví hiện trường bằng mã định danh, không có tên.',
    ],
    contactChecks: 'Để kiểm, nhà tuyển dụng tìm và nhận ra trường qua CertNet, rồi đọc danh sách thu hồi có chữ ký của trường; không hỏi ai về bạn.',
    endRootTitle: 'Chứng thư gốc mà ví dùng để nhận ra nhà tuyển dụng',
    endRootBody: 'Ở lượt này, trường được tìm thấy và công nhận qua CertNet, không qua chứng thư gốc. Chữ ký trên yêu cầu của nhà tuyển dụng thì vẫn truy về chứng thư gốc DEMO này. Dấu vân tay SHA-256:',
  },
};

const en: DiplomaGuidedDemoPageCopy = {
  backToDemos: 'All demos',
  realLabel: 'Runs for real on the Identra server',
  title: 'Try receiving and using a diploma',
  intro: 'You play a student who has just graduated. Work through the three steps below; each one says what to press and what you will see. The signatures and checks are real; the university, the people and the employer are sample data.',
  noAppTitle: 'No app to install',
  noAppBody: 'The web trial wallet plays your phone. The Identra app is in internal testing and not yet on the App Store or Google Play.',
  stepperLabel: 'Steps of the demo',
  stepNumber: 'Step {number}',
  stepStatus: { done: 'Done', current: 'In progress', upcoming: 'Not yet' },
  steps: {
    receive: {
      title: 'Receive the diploma',
      summary: 'The university issues a diploma into your wallet.',
      instructions: [
        'Press “Sign in with a sample account”. You see a sample student\'s graduation record.',
        'Press “Receive the diploma”. The university shows a diploma code and a 6-digit PIN.',
        'Press “Put this code into the trial wallet” (in real life, you scan the QR code). The wallet shows where it comes from and what it is.',
        'Type the PIN into the wallet and press “Accept document”. The diploma appears in the wallet and the demo moves to step 2.',
      ],
    },
    apply: {
      title: 'Apply with the diploma',
      summary: 'The employer checks the diploma without calling the university.',
      instructions: [
        'Press “Apply with Identra”. The employer creates a verification request.',
        'Press “Open the request in the trial wallet”. The wallet says who is asking and what would be sent.',
        'Choose how much to share in the wallet and press “Share”.',
        'The employer\'s side shows the result of each check, with only the details you chose to send.',
      ],
    },
    revoke: {
      title: 'Revoke and try again',
      summary: 'A revoked copy is refused at the next check.',
      instructions: [
        'Suppose the phone holding the diploma was lost. Press “Revoke this diploma” on the university\'s side and confirm.',
        'Press “Check this diploma again” on the employer\'s side, then “Open the request in the trial wallet” and “Share” as in step 2.',
        'This time the result fails, exactly at the check that the diploma is still valid.',
      ],
    },
  },
  instructionsTitle: 'What to press, what you will see',
  deliveredInstructions: [
    'The employer received the diploma but could not check it right now, so nothing has been decided yet.',
    'Wait a moment, then press “Send again” in the trial wallet. The wallet only sends the same diploma with the same details again; pressing “Open the request in the trial wallet” again also only offers “Send again” or “Stop”.',
    'Once it can be checked, the employer\'s side shows the result. If the wallet says it cannot be sent again, wait for the request to expire, then create a new one.',
  ],
  organisationSide: 'The organisation\'s side',
  walletSide: 'Your wallet',
  signInSample: 'Sign in with a sample account',
  signingIn: 'Signing in…',
  signInProblems: {
    invalid_credentials: 'The sample account could not sign in. Please let us know; you can try again later.',
    rejected: 'The server did not accept this sign-in. Try again in a few minutes.',
    rate_limited: 'Your network has signed in too many times.',
    network: 'Cannot reach the Identra server. Check your connection and try again.',
    unavailable: 'The Identra server is busy. Try again in a few minutes.',
    unusable: 'The Identra server answered, but this page cannot use its answer, so the sign-in did not happen. Reload the page and try again.',
    school_not_here: 'This site cannot work with this sample university here yet. Open the demo again from All demos.',
  },
  signedInAs: 'Signed in: {name}, {major}',
  receive: 'Receive the diploma',
  codeTitle: 'Your diploma code',
  pinHint: 'The trial wallet will ask for this PIN. In real life, never give your PIN to anyone.',
  sendToWallet: 'Put this code into the trial wallet',
  sentToWallet: 'The code is in the trial wallet. Type the PIN {pin} into the wallet.',
  sendAgain: 'Put the code into the wallet again',
  walletBusy: 'The wallet is working; wait a moment.',
  qrOfferLabel: 'QR code to receive the diploma',
  qrOfferCaption: 'In real life the university shows this QR code and you scan it with the Identra app. Here, the button next to it does the scanning for you.',
  qrRequestLabel: 'The employer\'s QR code asking to see a diploma',
  qrRequestCaption: 'In real life the job site shows this code and you scan it with your phone. Here, the button next to it does the scanning for you.',
  qrBeatsTitle: 'What this code is, and what goes where',
  qrBeats: [
    'The code is a request slip signed by the employer: who asks, why, which details, expiring in 5 minutes. It contains nobody\'s data.',
    'The wallet checks the signature on the slip and whether the employer is on the list of recognised organisations, before you give anything.',
    'What leaves: the details you choose, the university\'s signature on them, and a wallet signature that only works for this very slip. All encrypted, sent to the employer\'s verification server.',
    'What does not: the other details on the diploma. Nothing goes to the university.',
  ],
  qrDirection: 'Why the employer shows the code and you scan, not the other way round: you need to know who is asking before you give. A code holding your diploma could be read by anyone who scans it.',
  happenedTitle: 'What just happened',
  happenedReceive: [
    'The university signed the diploma with its own private key and sent it straight to your wallet.',
    'The diploma is in this wallet. The server only records which student it was issued to and its slot in the revocation list; it does not keep the diploma\'s content.',
    'Before saving, the wallet checked by itself: the university\'s signature, the university is on the recognised list, the diploma is valid.',
  ],
  happenedReceiveUnchecked: [
    'The university signed the diploma with its own private key and sent it straight to your wallet.',
    'The diploma is in this wallet. The server only records which student it was issued to and its slot in the revocation list; it does not keep the diploma\'s content.',
    'Before saving, the wallet checked the signature on the diploma. But at receipt it could not read the lists it needs, so it has not confirmed yet that the university is recognised and that the diploma is still valid. The diploma is saved as not fully checked: open it in the wallet and press “Check again” later.',
  ],
  happenedRevoke: [
    'The university marked this copy in its signed revocation list. Nobody had to tell the employer.',
    'At the next check the employer reads that list and sees it at once. Other verifiers using a cached copy may take up to 15 minutes.',
    'Nobody can delete or change your wallet remotely: the copy is still in the wallet, it simply no longer passes the checks.',
  ],
  contactsTitle: 'What just happened: who contacted whom',
  contactWallet: 'Wallet → Employer: {fields}, with the university\'s signature and the wallet\'s signature for this request only.',
  contactSchool: 'Employer → University: never.',
  contactChecks: 'To check, the employer used only the list of recognised organisations and the revocation list, both signed; it asked nobody about you.',
  contactDemoNote: 'In this demo, Identra\'s server runs both the university\'s side and the employer\'s side. The result and the details sent are kept for 30 minutes, then deleted.',
  stayedTitle: 'Stayed in your wallet',
  stayedNote: 'The employer did not receive these details.',
  requestDeclinedTitle: 'You declined in the wallet',
  requestDeclinedBody: 'Nothing was sent; the employer received nothing. This request can no longer be used.',
  clockSkew: 'Your device clock is about {minutes} minutes off the server\'s time. The trial wallet follows the server\'s time; in real life, set your device clock right.',
  tabsLabel: 'Which side to show',
  tabs: { school: 'University', employer: 'Employer', wallet: 'Your wallet' },
  tabTurn: 'your turn here',
  notThisStep: { school: 'The university has nothing to do in this step.', employer: 'The employer is not part of this step yet.' },
  employerName: 'Sample Employer (DEMO)',
  employerJob: 'Hiring a software engineer',
  requestedTitle: 'What they ask for',
  requestedBody: 'Required: full name, major. Optional: degree classification, graduation year.',
  apply: 'Apply with Identra',
  openRequestInWallet: 'Open the request in the trial wallet',
  requestReady: 'The request is ready. Press “Open the request in the trial wallet”.',
  requestExpiresIn: 'The request is valid for {time}',
  requestExpiredTitle: 'The request has expired',
  requestExpiredBody: 'Each request can be used for 5 minutes. Create a new one to try again.',
  newRequest: 'Create a new request',
  requestSentToWallet: 'The request is open in the trial wallet. Look at the wallet and press “Share”.',
  requestDeliveredInWallet: 'The employer received the diploma but could not check it yet. Wait a moment, then press “Send again” in the trial wallet.',
  appliedNext: 'Next: revoke and try again',
  verifierUnavailableHint: 'If this keeps happening, try again in a few minutes.',
  schoolRevokeTitle: 'The university\'s side: revoke the copy on a lost phone',
  schoolRevokeBody: 'There are two reasons to revoke: the registrar revokes a diploma issued by mistake; or you revoke the copy on a lost phone and receive a new one. The demo lets you do the second. Revoking this copy does not cancel your degree.',
  diplomaRow: 'Diploma issued at {time} on {date}',
  noDiplomaListed: 'The university no longer lists the diploma issued in this session.',
  revokedNote: 'This copy of the diploma has been revoked. The trial wallet does not know yet; now try to use it once more.',
  employerAgainTitle: 'The employer\'s side: check again',
  employerAgainBody: 'The employer creates a new request and checks the diploma again, as in step 2.',
  verifyAgain: 'Check this diploma again',
  refusedByEmployer: 'The employer refuses because this copy was revoked: the signature is still correct, only the validity check fails.',
  refusedByWallet: {
    revoked: 'The trial wallet already knew this copy was revoked and would not share it, as the Identra app does. The employer received nothing.',
    suspended: 'The trial wallet already knew this copy was suspended and would not share it, as the Identra app does. The employer received nothing.',
    invalid: 'The trial wallet saw that this copy no longer passes the checks and would not share it, as the Identra app does. The employer received nothing.',
  },
  otherFailure: 'This check failed for another reason. Check again.',
  passedAfterRevoke: 'This check still passed, perhaps because the revocation had not arrived yet. Check again.',
  notices: {
    reloaded: {
      title: 'The page was reloaded',
      body: 'The trial wallet and the sign-in live only in this tab\'s memory, so they were cleared. Start again from step 1.',
    },
    sessionLost: {
      title: 'The university sign-in has expired',
      body: 'A sign-in lasts 30 minutes, and only the session that issued a diploma can revoke it. Start again to continue.',
    },
  },
  restart: 'Start again',
  restartConfirmHint: 'The trial wallet is emptied and you sign in again at step 1.',
  endTitle: 'What you just saw',
  endPoints: [
    'The university put a digitally signed diploma into your wallet. It stays with you; nobody has to ask the university each time it is used.',
    'You chose exactly what to send, and the employer checked by itself that the diploma is genuine.',
    'Once the copy was revoked, the next check saw it at once and refused it; your degree itself is not cancelled.',
  ],
  endRootTitle: 'The root certificate the wallet and the employer trust',
  endRootBody: 'Every signature in this demo traces back to this DEMO root certificate. SHA-256 fingerprint:',
  endRootDownload: 'Download the root certificate',
  endProductDemo: 'Product journey demo',
  endSecurity: 'Security: what is built, what is not yet',
  endAllDemos: 'All demos',
  runSwitch: {
    label: 'How the wallet recognises the university',
    x509: 'Identra\'s list',
    certnet: 'CertNet (trial)',
    hint: 'Each way uses its own sample university. Switching starts the demo again.',
  },
  certnetRun: {
    receiveInstructions: [
      'Press “Sign in with a sample account”. You see a sample student\'s graduation record.',
      'Press “Receive the diploma”. The university shows a diploma code and a 6-digit PIN.',
      'Press “Put this code into the trial wallet” (in real life, you scan the QR code). The wallet shows where it comes from, what it is and the identifier the university gives for itself. There is no name: the wallet will look the university up through CertNet.',
      'Type the PIN into the wallet and press “Accept document”. The diploma appears in the wallet with its issuer shown by identifier, and the demo moves to step 2.',
    ],
    registry: 'In this run, to know the seal really is the university\'s, the verifier looks the university up through CertNet, a register of document issuers being trialled.',
    happenedReceive: [
      'The university signed the diploma with its own private key and sent it straight to your wallet.',
      'The diploma is in this wallet. The server only records which student it was issued to and its slot in the revocation list; it does not keep the diploma\'s content.',
      'Before saving, the wallet checked by itself: it found the university through CertNet, the signature matches the university\'s key there, CertNet recognises it for this kind of diploma, and the diploma is valid.',
      'CertNet records no name for the university yet, so the wallet shows it by its identifier, without a name.',
    ],
    happenedReceiveUnchecked: [
      'The university signed the diploma with its own private key and sent it straight to your wallet.',
      'The diploma is in this wallet. The server only records which student it was issued to and its slot in the revocation list; it does not keep the diploma\'s content.',
      'Before saving, the wallet found the university through CertNet and saw that the signature matches the university\'s key there. But at receipt it got no answer on whether CertNet recognises the university for this kind of diploma and whether the diploma is still valid. The diploma is saved as not fully checked: open it in the wallet and press “Check again” later.',
      'CertNet records no name for the university yet, so the wallet shows it by its identifier, without a name.',
    ],
    contactChecks: 'To check, the employer found and recognised the university through CertNet, then read the university\'s signed revocation list; it asked nobody about you.',
    endRootTitle: 'The root certificate the wallet uses to recognise the employer',
    endRootBody: 'In this run the university was found and recognised through CertNet, not through a root certificate. The signature on the employer\'s request still traces back to this DEMO root certificate. SHA-256 fingerprint:',
  },
};

export const DIPLOMA_GUIDED_DEMO_PAGE_TRANSLATIONS = {
  en,
  vi,
} as const satisfies Record<'en' | 'vi', DiplomaGuidedDemoPageCopy>;
