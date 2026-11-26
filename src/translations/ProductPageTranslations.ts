/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ProductCheckOutcome, ProductReasonKey, ProductStage, StageOutcome } from '../identra/productPage';
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
  inProgressBodyMany: string;
  inProgressNoneYet: string;
  listJoiner: string;
  failedTitle: string;
  failedAtStage: string;
  listUnreadable: string;
  listTooLarge: string;
  uncheckedTitle: string;
  uncheckedTrustList: string;
  uncheckedStatus: string;
  clockTitle: string;
  clockBody: string;
  checkedAt: string;
  recheck: string;
  busy: string;
  productTitle: string;
  productDescriptionLabel: string;
  signersLabel: string;
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
  missingMessage: string;
  checksToggle: string;
  checkOutcomes: Record<ProductCheckOutcome, string>;
  checks: Record<CheckLabelKey, string>;
  reasons: Record<ProductReasonKey, string>;
  deviceTitle: string;
  deviceBody: string;
  deviceNote: string;
  rootLinkLead: string;
  rootLink: string;
  limitsTitle: string;
  limits: readonly string[];
  invalidTitle: string;
  invalidBody: string;
  notFoundTitle: string;
  notFoundBody: string;
  networkTitle: string;
  networkBody: string;
  serverTitle: string;
  serverBody: string;
  unreadableTitle: string;
  unreadableBody: string;
  retry: string;
  labelTitle: string;
  labelBody: string;
  labelQrAlt: string;
  print: string;
  footerHome: string;
  footerSecurity: string;
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
  inProgressBody: 'Sản phẩm đã qua công đoạn {current}; công đoạn {missing} chưa được ghi nhận.',
  inProgressBodyMany: 'Sản phẩm đã qua công đoạn {current}; công đoạn {missing} chưa được ghi nhận.',
  inProgressNoneYet: 'Chưa có công đoạn nào được ghi nhận.',
  listJoiner: ' và ',
  failedTitle: 'Hồ sơ này có vấn đề',
  failedAtStage: 'Ở công đoạn {stage}: {reason}',
  listUnreadable: 'Máy chủ trả về hồ sơ không đọc được, nên trang không kiểm tra được bước nào.',
  listTooLarge: 'Máy chủ trả về hồ sơ có hơn 20 bước hoặc dung lượng quá lớn, nên trang không kiểm tra.',
  uncheckedTitle: 'Chưa kiểm tra xong',
  uncheckedTrustList: 'Trang chưa tải được danh sách bên ký được Identra công nhận nên chưa kiểm tra được hồ sơ; điều này không có nghĩa là sản phẩm có vấn đề.',
  uncheckedStatus: 'Trang chưa tải được danh sách thu hồi của bên ký nên chưa kiểm tra được hiệu lực của hồ sơ; điều này không có nghĩa là sản phẩm có vấn đề.',
  clockTitle: 'Giờ trên máy bạn đang sai khoảng {duration}',
  clockBody: 'Hãy chỉnh lại giờ rồi kiểm tra lại. Vì giờ sai nên trang chưa kiểm tra được hồ sơ; điều này không có nghĩa là sản phẩm có vấn đề.',
  checkedAt: 'Kiểm tra lúc {time}',
  recheck: 'Kiểm tra lại',
  busy: 'Đang kiểm tra…',
  productTitle: 'Sản phẩm',
  productDescriptionLabel: 'Theo bản ghi sản xuất đã được kiểm chứng',
  signersLabel: 'Các bên đã ký',
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
    unchecked: 'Chưa kiểm tra được',
    untrusted: 'Không rõ bên ký',
    broken: 'Không khớp',
    failed: 'Không hợp lệ',
    missing: 'Chưa có',
  },
  missingMessage: 'Công đoạn này chưa diễn ra hoặc chưa được ghi nhận.',
  checksToggle: 'Các bước kiểm tra',
  checkOutcomes: { passed: 'Đạt', failed: 'Không đạt', unchecked: 'Chưa kiểm tra được', skipped: 'Bỏ qua' },
  checks: {
    structure: 'Bản ghi đúng định dạng',
    algorithm: 'Được ký theo cách được chấp nhận',
    certificate_chain: 'Chứng thư số của bên ký hợp lệ',
    did_resolution: 'Tìm được bên ký và khóa ký của họ trên CertNet',
    signature: 'Không bị sửa kể từ khi ký',
    validity_time: 'Thời điểm ký hợp lệ',
    credential_type: 'Đúng loại bản ghi công đoạn sản phẩm',
    issuer_trust: 'Bên ký được Identra công nhận cho công đoạn này',
    issuer_trust_certnet: 'Bên ký được công nhận trên CertNet',
    status: 'Tình trạng thu hồi, tạm dừng',
    holder_binding: 'Gắn với người giữ',
    query: 'Đáp ứng yêu cầu',
    product_chain: 'Đúng sản phẩm, đúng thứ tự và nối với bước trước',
    other: 'Một bước kiểm tra khác',
  },
  reasons: {
    MALFORMED: 'Bản ghi không đúng định dạng hoặc đã bị hỏng.',
    TYP_INVALID: 'Đây không phải loại bản ghi mà Identra đọc được.',
    TOO_LARGE: 'Hồ sơ dài hoặc lớn bất thường nên trang không kiểm tra.',
    ALG_NOT_ALLOWED: 'Bước này được ký theo cách không còn được chấp nhận.',
    CERT_CHAIN_MALFORMED: 'Chứng thư số của bên ký bị hỏng hoặc bị thiếu.',
    CERT_CHAIN_UNTRUSTED: 'Chứng thư số của bên ký không dẫn về chứng thư gốc của Identra.',
    CERT_NOT_YET_VALID: 'Chứng thư số của bên ký chưa đến ngày có hiệu lực.',
    CERT_EXPIRED: 'Chứng thư số của bên ký đã hết hạn.',
    CERT_CONSTRAINT_INVALID: 'Chứng thư số của bên ký không được phép dùng để ký loại bản ghi này.',
    CERT_KEY_NOT_ALLOWED: 'Chứng thư số của bên ký dùng loại khóa không được chấp nhận.',
    ISSUER_MISMATCH: 'Bên ký ghi trong bản ghi không khớp với chứng thư số của họ.',
    SIGNATURE_INVALID: 'Bản ghi đã bị sửa sau khi ký, hoặc không phải do bên này ký.',
    NOT_YET_VALID: 'Bản ghi ghi thời điểm ký ở tương lai.',
    EXPIRED: 'Bản ghi đã hết hạn.',
    VCT_UNSUPPORTED: 'Đây không phải bản ghi công đoạn sản phẩm.',
    ISSUER_NOT_TRUSTED: 'Bên ký không có trong danh sách được Identra công nhận cho công đoạn này.',
    TRUST_LIST_UNAVAILABLE: 'Chưa tải được danh sách bên ký được công nhận nên chưa kiểm tra được bước này.',
    REVOKED: 'Bên ký đã thu hồi xác nhận này.',
    SUSPENDED: 'Bên ký đang tạm dừng xác nhận này.',
    STATUS_UNAVAILABLE: 'Chưa kiểm tra được hiệu lực của xác nhận này.',
    CHAIN_BROKEN: 'Bước này không khớp với hồ sơ: sai sản phẩm, sai thứ tự, hoặc bước trước đã bị thay đổi.',
    CHAIN_NOT_THIS_PRODUCT: 'Bản ghi này không thuộc sản phẩm này hoặc sai thứ tự công đoạn.',
    CHAIN_LINK: 'Bước này không nối đúng với bước trước.',
    CHAIN_DATE_BACKWARDS: 'Ngày ghi ở bước này sớm hơn ngày của bước trước.',
    CHAIN_DATE_AFTER_SIGNING: 'Ngày ghi ở bước này muộn hơn lúc bước này được ký.',
    CHAIN_EXTRA_STAGE: 'Sau công đoạn phân phối không còn công đoạn nào, nhưng hồ sơ lại có thêm bước này.',
    CLOCK_WRONG: 'Giờ trên máy bạn sai nên chưa kiểm tra được bước này.',
    SKIPPED: 'Bỏ qua vì một bước kiểm tra trước đó không đạt.',
    UNKNOWN: 'Bước này không đạt vì một lý do mà trang này chưa nhận ra.',
  },
  deviceTitle: 'Kiểm tra này diễn ra ngay trên máy của bạn',
  deviceBody: 'Trình duyệt của bạn đã tự kiểm tra chữ ký của từng bước, xem bên ký có được Identra công nhận cho đúng công đoạn không, bản ghi có bị thu hồi không và các bước có nối liền nhau không.',
  deviceNote: 'Trang này kiểm tra hồ sơ ngay trên máy của bạn, không qua máy chủ nào khác.',
  rootLinkLead: 'Chữ ký của mọi bên đều phải dẫn về chứng thư gốc của Identra. Dấu vân tay SHA-256 của chứng thư gốc DEMO mà trang này tin:',
  rootLink: 'Tải tệp chứng thư gốc',
  limitsTitle: 'Bạn nên biết',
  limits: [
    'Kết quả này chứng minh hồ sơ của sản phẩm là thật, không chứng minh chiếc hộp trên tay bạn đúng là sản phẩm trong hồ sơ: một mã QR thật vẫn có thể bị in lại lên hàng giả.',
    'Hãy chắc chắn địa chỉ trên thanh trình duyệt là identra.awncorp.vn. Một trang giả mạo ở địa chỉ khác có thể tự hiện kết quả tốt.',
  ],
  invalidTitle: 'Mã không hợp lệ',
  invalidBody: 'Đường dẫn này không phải mã sản phẩm hợp lệ. Hãy quét lại mã QR trên sản phẩm.',
  notFoundTitle: 'Không tìm thấy sản phẩm',
  notFoundBody: 'Chưa có hồ sơ nào cho mã này. Hãy kiểm tra lại mã trên sản phẩm.',
  networkTitle: 'Không kết nối được máy chủ Identra',
  networkBody: 'Kiểm tra kết nối mạng rồi thử lại.',
  serverTitle: 'Chưa lấy được hồ sơ sản phẩm',
  serverBody: 'Máy chủ Identra đang bận hoặc gặp sự cố. Hãy thử lại sau ít phút.',
  unreadableTitle: 'Máy chủ trả về dữ liệu không đọc được',
  unreadableBody: 'Trang đã dừng lại để không hiển thị thông tin sai. Hãy thử lại sau ít phút.',
  retry: 'Thử lại',
  labelTitle: 'Nhãn QR mẫu',
  labelBody: 'In nhãn này và dán lên sản phẩm mẫu khi trình diễn. Mã QR mở đúng trang này.',
  labelQrAlt: 'Mã QR dẫn tới trang kiểm tra sản phẩm này',
  print: 'In nhãn',
  footerHome: 'Về Identra',
  footerSecurity: 'Bảo mật',
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
  inProgressBody: 'The product has passed the {current} stage; the {missing} stage has not been recorded yet.',
  inProgressBodyMany: 'The product has passed the {current} stage; the {missing} stages have not been recorded yet.',
  inProgressNoneYet: 'No stage has been recorded yet.',
  listJoiner: ' and ',
  failedTitle: 'Something is wrong with this record',
  failedAtStage: 'At {stage}: {reason}',
  listUnreadable: 'The server sent a record that cannot be read, so the page could not check any step.',
  listTooLarge: 'The server sent a record with more than 20 steps or of excessive size, so the page did not check it.',
  uncheckedTitle: 'The check could not finish',
  uncheckedTrustList: 'The page could not load the list of signers Identra recognises, so the record was not checked; this does not mean anything is wrong with the product.',
  uncheckedStatus: 'The page could not load the signers\' revocation lists, so it could not check whether the record is still valid; this does not mean anything is wrong with the product.',
  clockTitle: 'Your device\'s clock is off by about {duration}',
  clockBody: 'Correct the time and check again. Because of the wrong time the page could not check the record; this does not mean anything is wrong with the product.',
  checkedAt: 'Checked at {time}',
  recheck: 'Check again',
  busy: 'Checking…',
  productTitle: 'Product',
  productDescriptionLabel: 'From the verified production record',
  signersLabel: 'Signed by',
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
    unchecked: 'Not checked yet',
    untrusted: 'Unknown signer',
    broken: 'Mismatch',
    failed: 'Not valid',
    missing: 'Not yet',
  },
  missingMessage: 'This stage has not happened or has not been recorded yet.',
  checksToggle: 'Checks',
  checkOutcomes: { passed: 'Passed', failed: 'Failed', unchecked: 'Not checked yet', skipped: 'Skipped' },
  checks: {
    structure: 'Record in the expected format',
    algorithm: 'Signed in an accepted way',
    certificate_chain: 'Signer\'s certificate is valid',
    did_resolution: 'Signer and its signing key found on CertNet',
    signature: 'Unchanged since it was signed',
    validity_time: 'Valid signing time',
    credential_type: 'The kind of record a product stage uses',
    issuer_trust: 'Signer recognised by Identra for this stage',
    issuer_trust_certnet: 'Signer recognised on CertNet',
    status: 'Revocation and suspension status',
    holder_binding: 'Bound to its holder',
    query: 'Answers the request',
    product_chain: 'Right product, right order, linked to the previous step',
    other: 'Another check',
  },
  reasons: {
    MALFORMED: 'The record is in the wrong format or damaged.',
    TYP_INVALID: 'This is not a kind of record Identra can read.',
    TOO_LARGE: 'The record is unusually long or large, so the page did not check it.',
    ALG_NOT_ALLOWED: 'This step was signed in a way that is no longer accepted.',
    CERT_CHAIN_MALFORMED: 'The signer\'s certificate is damaged or missing.',
    CERT_CHAIN_UNTRUSTED: 'The signer\'s certificate does not lead back to Identra\'s root certificate.',
    CERT_NOT_YET_VALID: 'The signer\'s certificate is not valid yet.',
    CERT_EXPIRED: 'The signer\'s certificate has expired.',
    CERT_CONSTRAINT_INVALID: 'The signer\'s certificate may not be used to sign this kind of record.',
    CERT_KEY_NOT_ALLOWED: 'The signer\'s certificate uses a kind of key that is not accepted.',
    ISSUER_MISMATCH: 'The signer named in the record does not match their certificate.',
    SIGNATURE_INVALID: 'The record was changed after it was signed, or was not signed by this party.',
    NOT_YET_VALID: 'The record says it was signed in the future.',
    EXPIRED: 'The record has expired.',
    VCT_UNSUPPORTED: 'This is not a product stage record.',
    ISSUER_NOT_TRUSTED: 'The signer is not on Identra\'s list of recognised signers for this stage.',
    TRUST_LIST_UNAVAILABLE: 'The list of recognised signers could not be loaded, so this step was not checked.',
    REVOKED: 'The signer has revoked this confirmation.',
    SUSPENDED: 'The signer has suspended this confirmation.',
    STATUS_UNAVAILABLE: 'Whether this confirmation is still valid could not be checked.',
    CHAIN_BROKEN: 'This step does not fit the record: wrong product, wrong order, or the previous step was changed.',
    CHAIN_NOT_THIS_PRODUCT: 'This record does not belong to this product, or the stages are in the wrong order.',
    CHAIN_LINK: 'This step does not link correctly to the previous one.',
    CHAIN_DATE_BACKWARDS: 'The date of this step is earlier than the date of the previous step.',
    CHAIN_DATE_AFTER_SIGNING: 'The date of this step is later than the moment it was signed.',
    CHAIN_EXTRA_STAGE: 'No stage comes after distribution, yet the record has this extra step.',
    CLOCK_WRONG: 'Your device\'s clock is wrong, so this step could not be checked.',
    SKIPPED: 'Skipped because an earlier check failed.',
    UNKNOWN: 'This check failed for a reason this page does not recognise yet.',
  },
  deviceTitle: 'This check runs right on your device',
  deviceBody: 'Your browser checked each step\'s signature itself, whether the signer is recognised by Identra for that stage, whether the record was revoked, and whether the steps link up.',
  deviceNote: 'This page checks the record right on your device, without going through any other server.',
  rootLinkLead: 'Every party\'s signature must lead back to Identra\'s root certificate. SHA-256 fingerprint of the DEMO root this page trusts:',
  rootLink: 'Download the root certificate',
  limitsTitle: 'Good to know',
  limits: [
    'This proves the product\'s record is genuine, not that the box in your hand is the product it describes: a real QR code can still be printed on fakes.',
    'Make sure the address bar shows identra.awncorp.vn. A fake page at another address can show a good result by itself.',
  ],
  invalidTitle: 'Invalid code',
  invalidBody: 'This link is not a valid product code. Scan the QR code on the product again.',
  notFoundTitle: 'Product not found',
  notFoundBody: 'There is no record for this code yet. Check the code on the product.',
  networkTitle: 'Cannot reach the Identra server',
  networkBody: 'Check your connection and try again.',
  serverTitle: 'The product record could not be fetched',
  serverBody: 'The Identra server is busy or having a problem. Try again in a few minutes.',
  unreadableTitle: 'The server sent data that cannot be read',
  unreadableBody: 'The page stopped so it would not show wrong information. Try again in a few minutes.',
  retry: 'Try again',
  labelTitle: 'Sample QR label',
  labelBody: 'Print this label and stick it on a sample product for demonstrations. The QR code opens this page.',
  labelQrAlt: 'QR code leading to this product\'s check page',
  print: 'Print label',
  footerHome: 'About Identra',
  footerSecurity: 'Security',
};

export const PRODUCT_PAGE_TRANSLATIONS = {
  en,
  vi,
} as const satisfies Record<'en' | 'vi', ProductPageCopy>;
