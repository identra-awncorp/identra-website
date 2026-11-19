/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ProductReasonKey, ProductStage, StageOutcome } from '../identra/productPage';
import type { CheckLabelKey } from '../identra/verifierSession';

// The product page is a standalone page in Vietnamese and English (it is reached from a QR code on a
// product, outside the locale-prefixed routes).
export interface ProductPageCopy {
  documentTitle: string;
  documentDescription: string;
  brandName: string;
  homeLabel: string;
  languageLabel: string;
  languageNames: Record<'vi' | 'en', string>;
  loadingTitle: string;
  loadingBody: string;
  checkingBody: string;
  verifiedTitle: string;
  verifiedBody: string;
  inProgressTitle: string;
  inProgressBody: string;
  inProgressNoneYet: string;
  listJoiner: string;
  failedTitle: string;
  failedAtStage: string;
  checkedAt: string;
  recheck: string;
  productTitle: string;
  gtinLabel: string;
  serialLabel: string;
  elementStringLabel: string;
  sampleNote: string;
  timelineTitle: string;
  stages: Record<ProductStage, string>;
  extraStage: string;
  signedBy: string;
  when: string;
  where: string;
  description: string;
  outcomes: Record<StageOutcome, string>;
  outcomeMessages: Record<Exclude<StageOutcome, 'ok' | 'failed'>, string>;
  checksToggle: string;
  checkPassed: string;
  checkFailed: string;
  checkSkipped: string;
  checks: Record<CheckLabelKey, string>;
  reasons: Record<ProductReasonKey, string>;
  deviceTitle: string;
  deviceBody: string;
  rootLinkLead: string;
  rootLink: string;
  limitsTitle: string;
  limits: readonly string[];
  clockTitle: string;
  clockBody: string;
  invalidTitle: string;
  invalidBody: string;
  notFoundTitle: string;
  notFoundBody: string;
  networkTitle: string;
  networkBody: string;
  unreadableTitle: string;
  unreadableBody: string;
  retry: string;
  labelTitle: string;
  labelBody: string;
  labelQrAlt: string;
  print: string;
}

const vi: ProductPageCopy = {
  documentTitle: 'Kiểm tra sản phẩm | Identra',
  documentDescription: 'Xem hành trình đã được kiểm chứng của một sản phẩm: sản xuất, kiểm định và phân phối.',
  brandName: 'Identra',
  homeLabel: 'Trang chủ Identra',
  languageLabel: 'Ngôn ngữ',
  languageNames: { vi: 'Tiếng Việt', en: 'English' },
  loadingTitle: 'Đang chuẩn bị kiểm tra',
  loadingBody: 'Trang đang tải bộ kiểm tra để xác minh hồ sơ sản phẩm ngay trên máy của bạn.',
  checkingBody: 'Đang kiểm tra từng bước trên máy của bạn…',
  verifiedTitle: 'Hồ sơ sản phẩm đã được kiểm chứng',
  verifiedBody: 'Cả ba công đoạn sản xuất, kiểm định và phân phối đều do đúng bên được phép ký, không bị sửa và nối liền nhau.',
  inProgressTitle: 'Các bước đã có đều hợp lệ',
  inProgressBody: 'Sản phẩm đang ở công đoạn {current}; chưa có công đoạn {missing}.',
  inProgressNoneYet: 'Chưa có công đoạn nào được ghi.',
  listJoiner: ' và ',
  failedTitle: 'Hồ sơ này có vấn đề',
  failedAtStage: 'Ở công đoạn {stage}: {reason}',
  checkedAt: 'Kiểm tra lúc {time}',
  recheck: 'Kiểm tra lại',
  productTitle: 'Sản phẩm',
  gtinLabel: 'Mã sản phẩm (GTIN)',
  serialLabel: 'Số sê-ri',
  elementStringLabel: 'Mã đầy đủ',
  sampleNote: 'Mã GTIN này thuộc dải 952 mà GS1 dành cho trình diễn: đây là sản phẩm mẫu, không phải hàng bán thật.',
  timelineTitle: 'Hành trình sản phẩm',
  stages: { san_xuat: 'Sản xuất', kiem_dinh: 'Kiểm định', phan_phoi: 'Phân phối' },
  extraStage: 'Bước thừa',
  signedBy: 'Bên ký',
  when: 'Thời điểm',
  where: 'Địa điểm',
  description: 'Mô tả',
  outcomes: {
    ok: 'Đã kiểm chứng',
    revoked: 'Đã bị thu hồi',
    suspended: 'Đang bị tạm dừng',
    status_unavailable: 'Chưa kiểm được tình trạng',
    untrusted: 'Không rõ bên ký',
    broken: 'Không nối đúng',
    failed: 'Không hợp lệ',
    missing: 'Chưa có',
  },
  outcomeMessages: {
    revoked: 'Bên ký đã thu hồi xác nhận này.',
    suspended: 'Bên ký đang tạm dừng xác nhận này.',
    status_unavailable: 'Chưa kiểm được xác nhận này còn hiệu lực hay không. Hãy kiểm tra lại sau.',
    untrusted: 'Không xác nhận được ai ký bước này.',
    broken: 'Bước này không nối đúng với bước trước.',
    missing: 'Công đoạn này chưa diễn ra hoặc chưa được ghi.',
  },
  checksToggle: 'Các bước kiểm tra',
  checkPassed: 'Đạt',
  checkFailed: 'Không đạt',
  checkSkipped: 'Bỏ qua',
  checks: {
    structure: 'Bản ghi đúng định dạng',
    algorithm: 'Được ký theo cách được chấp nhận',
    certificate_chain: 'Giấy chứng nhận của bên ký hợp lệ',
    signature: 'Không bị sửa kể từ khi ký',
    validity_time: 'Thời điểm ký hợp lệ',
    credential_type: 'Đúng loại bản ghi công đoạn sản phẩm',
    issuer_trust: 'Bên ký được Identra công nhận cho công đoạn này',
    status: 'Tình trạng thu hồi, tạm dừng',
    holder_binding: 'Gắn với người giữ',
    query: 'Đáp ứng yêu cầu',
    product_chain: 'Đúng sản phẩm, đúng thứ tự và nối với bước trước',
    other: 'Một bước kiểm tra khác',
  },
  reasons: {
    MALFORMED: 'Bản ghi bị hỏng hoặc sai định dạng.',
    TYP_INVALID: 'Đây không phải loại bản ghi mà Identra đọc được.',
    TOO_LARGE: 'Hồ sơ dài hoặc lớn bất thường nên trang không kiểm.',
    ALG_NOT_ALLOWED: 'Bước này được ký theo cách không còn được chấp nhận.',
    CERT_CHAIN_MALFORMED: 'Giấy chứng nhận của bên ký bị hỏng hoặc thiếu.',
    CERT_CHAIN_UNTRUSTED: 'Giấy chứng nhận của bên ký không do Identra bảo lãnh.',
    CERT_NOT_YET_VALID: 'Giấy chứng nhận của bên ký chưa đến ngày có hiệu lực.',
    CERT_EXPIRED: 'Giấy chứng nhận của bên ký đã hết hạn.',
    CERT_CONSTRAINT_INVALID: 'Giấy chứng nhận của bên ký không được phép dùng để ký bản ghi này.',
    CERT_KEY_NOT_ALLOWED: 'Giấy chứng nhận của bên ký dùng loại khóa bảo mật không được chấp nhận.',
    ISSUER_MISMATCH: 'Bên ký ghi trong bản ghi không khớp với giấy chứng nhận của họ.',
    SIGNATURE_INVALID: 'Bản ghi đã bị sửa sau khi ký, hoặc không phải do bên này ký.',
    NOT_YET_VALID: 'Bản ghi ghi thời điểm ký ở tương lai.',
    EXPIRED: 'Bản ghi đã hết hạn.',
    VCT_UNSUPPORTED: 'Đây không phải bản ghi công đoạn sản phẩm.',
    ISSUER_NOT_TRUSTED: 'Bên ký không có trong danh sách được Identra công nhận cho công đoạn này.',
    TRUST_LIST_UNAVAILABLE: 'Tạm thời chưa tải được danh sách bên ký được công nhận. Hãy kiểm tra lại sau.',
    REVOKED: 'Bên ký đã thu hồi xác nhận này.',
    SUSPENDED: 'Bên ký đang tạm dừng xác nhận này.',
    STATUS_UNAVAILABLE: 'Chưa kiểm được xác nhận này còn hiệu lực hay không.',
    CHAIN_BROKEN: 'Bước này không nối đúng với bước trước: sai sản phẩm, sai thứ tự, hoặc bước trước đã bị thay đổi.',
    SKIPPED: 'Bỏ qua vì một bước kiểm tra trước đó không đạt.',
    UNKNOWN: 'Bước này không đạt vì một lý do mà trang này chưa nhận ra.',
  },
  deviceTitle: 'Kiểm tra này diễn ra ngay trên máy của bạn',
  deviceBody: 'Trình duyệt của bạn đã tự kiểm chữ ký của từng bước, xem bên ký có được Identra công nhận cho đúng công đoạn không, bản ghi có bị thu hồi không và các bước có nối liền nhau không.',
  rootLinkLead: 'Mọi bên ký đều phải truy về chứng thư gốc của Identra, có dấu vân tay công bố tại',
  rootLink: 'trang Bảo mật',
  limitsTitle: 'Bạn nên biết',
  limits: [
    'Kết quả này chứng minh hồ sơ của sản phẩm là thật, không chứng minh chiếc hộp trên tay bạn đúng là sản phẩm trong hồ sơ: một mã QR thật vẫn có thể bị in lại lên hàng giả.',
    'Hãy chắc chắn địa chỉ trên thanh trình duyệt là identra.awncorp.vn. Một trang giả mạo ở địa chỉ khác có thể tự hiện kết quả tốt.',
  ],
  clockTitle: 'Giờ trên máy của bạn có vẻ chưa đúng',
  clockBody: 'Giờ trên máy đang lệch khoảng {minutes} phút, nên một số bước có thể không đạt chỉ vì giờ sai, không phải vì sản phẩm. Hãy chỉnh lại giờ rồi kiểm tra lại.',
  invalidTitle: 'Mã không hợp lệ',
  invalidBody: 'Đường dẫn này không phải mã sản phẩm hợp lệ. Hãy quét lại mã QR trên sản phẩm.',
  notFoundTitle: 'Không tìm thấy sản phẩm',
  notFoundBody: 'Chưa có hồ sơ nào cho mã này. Hãy kiểm tra lại mã trên sản phẩm.',
  networkTitle: 'Không kết nối được máy chủ Identra',
  networkBody: 'Kiểm tra kết nối mạng rồi thử lại.',
  unreadableTitle: 'Máy chủ trả về dữ liệu không đọc được',
  unreadableBody: 'Trang đã dừng lại để không hiển thị thông tin sai. Thử lại sau ít phút.',
  retry: 'Thử lại',
  labelTitle: 'Nhãn QR mẫu',
  labelBody: 'In nhãn này và dán lên sản phẩm mẫu khi trình diễn. Mã QR mở đúng trang này.',
  labelQrAlt: 'Mã QR dẫn tới trang kiểm tra sản phẩm này',
  print: 'In nhãn',
};

const en: ProductPageCopy = {
  documentTitle: 'Product check | Identra',
  documentDescription: 'See the verified journey of a product: production, inspection and distribution.',
  brandName: 'Identra',
  homeLabel: 'Identra home',
  languageLabel: 'Language',
  languageNames: { vi: 'Tiếng Việt', en: 'English' },
  loadingTitle: 'Getting the check ready',
  loadingBody: 'The page is loading its checker to verify the product record right on your device.',
  checkingBody: 'Checking every step on your device…',
  verifiedTitle: 'This product\'s record is verified',
  verifiedBody: 'All three stages, production, inspection and distribution, were signed by the right parties, were not changed and link up.',
  inProgressTitle: 'Every step so far is valid',
  inProgressBody: 'The product is at the {current} stage; {missing} has not happened yet.',
  inProgressNoneYet: 'No stage has been recorded yet.',
  listJoiner: ' and ',
  failedTitle: 'Something is wrong with this record',
  failedAtStage: 'At {stage}: {reason}',
  checkedAt: 'Checked at {time}',
  recheck: 'Check again',
  productTitle: 'Product',
  gtinLabel: 'Product code (GTIN)',
  serialLabel: 'Serial number',
  elementStringLabel: 'Full code',
  sampleNote: 'This GTIN is in the 952 range GS1 reserves for demonstrations: this is a sample product, not one sold in shops.',
  timelineTitle: 'Product journey',
  stages: { san_xuat: 'Production', kiem_dinh: 'Inspection', phan_phoi: 'Distribution' },
  extraStage: 'Extra step',
  signedBy: 'Signed by',
  when: 'When',
  where: 'Where',
  description: 'Description',
  outcomes: {
    ok: 'Verified',
    revoked: 'Revoked',
    suspended: 'Suspended',
    status_unavailable: 'Status not checked',
    untrusted: 'Unknown signer',
    broken: 'Does not link',
    failed: 'Not valid',
    missing: 'Not yet',
  },
  outcomeMessages: {
    revoked: 'The signer has revoked this confirmation.',
    suspended: 'The signer has suspended this confirmation.',
    status_unavailable: 'It could not be checked whether this confirmation is still valid. Check again later.',
    untrusted: 'Who signed this step could not be confirmed.',
    broken: 'This step does not link correctly to the previous one.',
    missing: 'This stage has not happened or has not been recorded yet.',
  },
  checksToggle: 'Checks',
  checkPassed: 'Passed',
  checkFailed: 'Failed',
  checkSkipped: 'Skipped',
  checks: {
    structure: 'Record in the expected format',
    algorithm: 'Signed in an accepted way',
    certificate_chain: 'Signer\'s certificate is valid',
    signature: 'Unchanged since it was signed',
    validity_time: 'Valid signing time',
    credential_type: 'The kind of record a product stage uses',
    issuer_trust: 'Signer recognised by Identra for this stage',
    status: 'Revocation and suspension status',
    holder_binding: 'Bound to its holder',
    query: 'Answers the request',
    product_chain: 'Right product, right order, linked to the previous step',
    other: 'Another check',
  },
  reasons: {
    MALFORMED: 'The record is damaged or in the wrong format.',
    TYP_INVALID: 'This is not a kind of record Identra can read.',
    TOO_LARGE: 'The record is unusually long or large, so the page did not check it.',
    ALG_NOT_ALLOWED: 'This step was signed in a way that is no longer accepted.',
    CERT_CHAIN_MALFORMED: 'The signer\'s certificate is damaged or missing.',
    CERT_CHAIN_UNTRUSTED: 'The signer\'s certificate is not backed by Identra.',
    CERT_NOT_YET_VALID: 'The signer\'s certificate is not valid yet.',
    CERT_EXPIRED: 'The signer\'s certificate has expired.',
    CERT_CONSTRAINT_INVALID: 'The signer\'s certificate may not be used to sign this record.',
    CERT_KEY_NOT_ALLOWED: 'The signer\'s certificate uses a kind of security key that is not accepted.',
    ISSUER_MISMATCH: 'The signer named in the record does not match their certificate.',
    SIGNATURE_INVALID: 'The record was changed after it was signed, or was not signed by this party.',
    NOT_YET_VALID: 'The record says it was signed in the future.',
    EXPIRED: 'The record has expired.',
    VCT_UNSUPPORTED: 'This is not a product stage record.',
    ISSUER_NOT_TRUSTED: 'The signer is not on Identra\'s list of recognised signers for this stage.',
    TRUST_LIST_UNAVAILABLE: 'The list of recognised signers could not be loaded right now. Check again later.',
    REVOKED: 'The signer has revoked this confirmation.',
    SUSPENDED: 'The signer has suspended this confirmation.',
    STATUS_UNAVAILABLE: 'It could not be checked whether this confirmation is still valid.',
    CHAIN_BROKEN: 'This step does not link correctly to the previous one: wrong product, wrong order, or the previous step was changed.',
    SKIPPED: 'Skipped because an earlier check failed.',
    UNKNOWN: 'This check failed for a reason this page does not recognise yet.',
  },
  deviceTitle: 'This check runs right on your device',
  deviceBody: 'Your browser checked each step\'s signature itself, whether the signer is recognised by Identra for that stage, whether the record was revoked, and whether the steps link up.',
  rootLinkLead: 'Every signer must trace back to Identra\'s root certificate, whose fingerprint is published on the',
  rootLink: 'Security page',
  limitsTitle: 'Good to know',
  limits: [
    'This proves the product\'s record is genuine, not that the box in your hand is the product it describes: a real QR code can still be printed on fakes.',
    'Make sure the address bar shows identra.awncorp.vn. A fake page at another address can show a good result by itself.',
  ],
  clockTitle: 'Your device\'s clock looks wrong',
  clockBody: 'Your device\'s clock is about {minutes} minutes off, so some steps may fail only because of the wrong time, not because of the product. Correct the time and check again.',
  invalidTitle: 'Invalid code',
  invalidBody: 'This link is not a valid product code. Scan the QR code on the product again.',
  notFoundTitle: 'Product not found',
  notFoundBody: 'There is no record for this code yet. Check the code on the product.',
  networkTitle: 'Cannot reach the Identra server',
  networkBody: 'Check your connection and try again.',
  unreadableTitle: 'The server sent data that cannot be read',
  unreadableBody: 'The page stopped so it would not show wrong information. Try again in a few minutes.',
  retry: 'Try again',
  labelTitle: 'Sample QR label',
  labelBody: 'Print this label and stick it on a sample product for demonstrations. The QR code opens this page.',
  labelQrAlt: 'QR code leading to this product\'s check page',
  print: 'Print label',
};

export const PRODUCT_PAGE_TRANSLATIONS = {
  en,
  vi,
} as const satisfies Record<'en' | 'vi', ProductPageCopy>;
