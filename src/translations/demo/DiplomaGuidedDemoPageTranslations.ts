/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  organisationSide: string;
  walletSide: string;
  openWallet: string;
  walletHasSomething: string;
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
  receivedBanner: string;
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
  refusedByWallet: string;
  otherFailure: string;
  passedAfterRevoke: string;
  // Problems that end the run
  notices: Record<GuidedNotice, { title: string; body: string }>;
  restart: string;
  restartConfirmHint: string;
  // The end
  endTitle: string;
  endPoints: readonly string[];
  endSecurity: string;
  endProductDemo: string;
  endAllDemos: string;
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
        'Bấm “Đưa mã này vào ví thử”. Ví bên cạnh cho xem ai cấp và cấp gì.',
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
      summary: 'Bằng bị thu hồi thì lần kiểm tra sau bị từ chối.',
      instructions: [
        'Giả sử điện thoại giữ bằng bị mất. Bấm “Thu hồi bằng này” ở phía trường rồi xác nhận.',
        'Bấm “Kiểm tra lại bằng này” ở phía nhà tuyển dụng, rồi “Mở yêu cầu trong ví thử” và “Chia sẻ” như ở bước 2.',
        'Lần này kết quả không đạt, đúng ở bước kiểm tra bằng còn hiệu lực.',
      ],
    },
  },
  instructionsTitle: 'Bấm gì, sẽ thấy gì',
  organisationSide: 'Phía tổ chức',
  walletSide: 'Ví của bạn',
  openWallet: 'Mở ví thử',
  walletHasSomething: 'Ví thử đang chờ bạn',
  signInSample: 'Đăng nhập bằng tài khoản mẫu',
  signingIn: 'Đang đăng nhập…',
  signInProblems: {
    invalid_credentials: 'Tài khoản mẫu không đăng nhập được. Hãy báo cho chúng tôi; bạn có thể thử lại sau.',
    rejected: 'Máy chủ không nhận yêu cầu đăng nhập này. Thử lại sau ít phút.',
    rate_limited: 'Mạng của bạn vừa đăng nhập quá nhiều lần.',
    network: 'Không kết nối được máy chủ Identra. Kiểm tra mạng rồi thử lại.',
    unavailable: 'Máy chủ Identra đang bận. Thử lại sau ít phút.',
  },
  signedInAs: 'Đã đăng nhập: {name}, ngành {major}',
  receive: 'Nhận bằng tốt nghiệp',
  codeTitle: 'Mã nhận bằng của bạn',
  pinHint: 'Ví thử sẽ hỏi mã PIN này. Ngoài đời, đừng đưa mã PIN cho người khác.',
  sendToWallet: 'Đưa mã này vào ví thử',
  sentToWallet: 'Đã đưa mã vào ví thử. Gõ mã PIN {pin} vào ví.',
  sendAgain: 'Đưa mã vào ví lần nữa',
  receivedBanner: 'Xong bước 1: bằng đã nằm trong ví thử. Giờ dùng nó để ứng tuyển.',
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
  appliedNext: 'Tiếp: thu hồi và thử lại',
  verifierUnavailableHint: 'Nếu lỗi kéo dài, hãy thử lại sau ít phút.',
  schoolRevokeTitle: 'Phía trường: thu hồi bằng',
  schoolRevokeBody: 'Điện thoại giữ bằng bị mất thì sinh viên tự thu hồi bản bằng đó. Thu hồi là vĩnh viễn.',
  diplomaRow: 'Bằng cấp lúc {time} ngày {date}',
  noDiplomaListed: 'Trường không còn thấy bằng đã cấp trong lần đăng nhập này.',
  revokedNote: 'Trường đã thu hồi bằng. Ví thử chưa biết điều đó; giờ thử dùng bằng thêm một lần.',
  employerAgainTitle: 'Phía nhà tuyển dụng: kiểm tra lại',
  employerAgainBody: 'Nhà tuyển dụng tạo một yêu cầu mới và kiểm tra lại bằng như ở bước 2.',
  verifyAgain: 'Kiểm tra lại bằng này',
  refusedByEmployer: 'Nhà tuyển dụng từ chối vì trường đã thu hồi bằng: chữ ký vẫn đúng, chỉ bước kiểm tra bằng còn hiệu lực không đạt.',
  refusedByWallet: 'Ví thử đã biết bằng bị thu hồi nên không cho chia sẻ, đúng như ứng dụng Identra sẽ làm. Nhà tuyển dụng không nhận được gì.',
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
    walletEmpty: {
      title: 'Ví thử không còn giữ bằng',
      body: 'Bằng của lần chạy này không còn trong ví thử. Làm lại từ đầu để nhận bằng mới.',
    },
  },
  restart: 'Làm lại từ đầu',
  restartConfirmHint: 'Ví thử sẽ được làm trống và bạn đăng nhập lại từ bước 1.',
  endTitle: 'Bạn vừa thấy gì',
  endPoints: [
    'Trường cấp bằng có chữ ký số vào ví của bạn. Bằng nằm trong ví của bạn, không cần hỏi lại trường mỗi lần dùng.',
    'Bạn chọn đúng những thông tin gửi đi, và nhà tuyển dụng tự kiểm tra được bằng là thật.',
    'Khi trường thu hồi bằng, lần kiểm tra kế tiếp thấy ngay và từ chối.',
  ],
  endSecurity: 'Cách Identra giữ an toàn',
  endProductDemo: 'Demo hành trình sản phẩm',
  endAllDemos: 'Tất cả demo',
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
        'Press “Put this code into the trial wallet”. The wallet shows who is issuing what.',
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
      summary: 'A revoked diploma is refused at the next check.',
      instructions: [
        'Suppose the phone holding the diploma was lost. Press “Revoke this diploma” on the university\'s side and confirm.',
        'Press “Check this diploma again” on the employer\'s side, then “Open the request in the trial wallet” and “Share” as in step 2.',
        'This time the result fails, exactly at the check that the diploma is still valid.',
      ],
    },
  },
  instructionsTitle: 'What to press, what you will see',
  organisationSide: 'The organisation\'s side',
  walletSide: 'Your wallet',
  openWallet: 'Open the trial wallet',
  walletHasSomething: 'The trial wallet is waiting for you',
  signInSample: 'Sign in with a sample account',
  signingIn: 'Signing in…',
  signInProblems: {
    invalid_credentials: 'The sample account could not sign in. Please let us know; you can try again later.',
    rejected: 'The server did not accept this sign-in. Try again in a few minutes.',
    rate_limited: 'Your network has signed in too many times.',
    network: 'Cannot reach the Identra server. Check your connection and try again.',
    unavailable: 'The Identra server is busy. Try again in a few minutes.',
  },
  signedInAs: 'Signed in: {name}, {major}',
  receive: 'Receive the diploma',
  codeTitle: 'Your diploma code',
  pinHint: 'The trial wallet will ask for this PIN. In real life, never give your PIN to anyone.',
  sendToWallet: 'Put this code into the trial wallet',
  sentToWallet: 'The code is in the trial wallet. Type the PIN {pin} into the wallet.',
  sendAgain: 'Put the code into the wallet again',
  receivedBanner: 'Step 1 done: the diploma is in the trial wallet. Now use it to apply.',
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
  appliedNext: 'Next: revoke and try again',
  verifierUnavailableHint: 'If this keeps happening, try again in a few minutes.',
  schoolRevokeTitle: 'The university\'s side: revoke the diploma',
  schoolRevokeBody: 'When the phone holding a diploma is lost, the student revokes that copy. Revocation is permanent.',
  diplomaRow: 'Diploma issued at {time} on {date}',
  noDiplomaListed: 'The university no longer lists the diploma issued in this session.',
  revokedNote: 'The university revoked the diploma. The trial wallet does not know yet; now try to use the diploma once more.',
  employerAgainTitle: 'The employer\'s side: check again',
  employerAgainBody: 'The employer creates a new request and checks the diploma again, as in step 2.',
  verifyAgain: 'Check this diploma again',
  refusedByEmployer: 'The employer refuses because the university revoked the diploma: the signature is still correct, only the check that the diploma is still valid fails.',
  refusedByWallet: 'The trial wallet already knew the diploma was revoked and would not share it, as the Identra app does. The employer received nothing.',
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
    walletEmpty: {
      title: 'The trial wallet no longer holds the diploma',
      body: 'This run\'s diploma is no longer in the trial wallet. Start again to receive a new one.',
    },
  },
  restart: 'Start again',
  restartConfirmHint: 'The trial wallet is emptied and you sign in again at step 1.',
  endTitle: 'What you just saw',
  endPoints: [
    'The university put a digitally signed diploma into your wallet. It stays with you; nobody has to ask the university each time it is used.',
    'You chose exactly what to send, and the employer checked by itself that the diploma is genuine.',
    'Once the university revoked the diploma, the next check saw it at once and refused it.',
  ],
  endSecurity: 'How Identra keeps this safe',
  endProductDemo: 'Product journey demo',
  endAllDemos: 'All demos',
};

export const DIPLOMA_GUIDED_DEMO_PAGE_TRANSLATIONS = {
  en,
  vi,
} as const satisfies Record<'en' | 'vi', DiplomaGuidedDemoPageCopy>;
