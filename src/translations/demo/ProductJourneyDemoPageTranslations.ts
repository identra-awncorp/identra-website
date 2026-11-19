/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// The guided product demo is offered in Vietnamese and English (src/types/routes.ts,
// DEMO_SCENARIO_LOCALE_OVERRIDES), like the product page it leads to.
export interface ProductJourneyDemoPageCopy {
  backToDemos: string;
  realLabel: string;
  title: string;
  intro: string;
  browserTitle: string;
  browserBody: string;
  listTitle: string;
  products: readonly { title: string; lookFor: string }[];
  productNumber: string;
  serialLabel: string;
  open: string;
  scanHint: string;
  qrLabel: string;
  stagesTitle: string;
  stages: readonly { name: string; body: string }[];
  nextTitle: string;
  nextBody: string;
  nextAction: string;
}

const vi: ProductJourneyDemoPageCopy = {
  backToDemos: 'Tất cả demo',
  realLabel: 'Chạy thật trên máy chủ Identra',
  title: 'Kiểm tra hành trình của một sản phẩm',
  intro: 'Mỗi sản phẩm mẫu mang một mã QR. Mở trang sản phẩm hoặc quét mã bằng camera điện thoại: trang tự kiểm tra từng chặng do nhà sản xuất, đơn vị kiểm định và nhà phân phối ký. Không cần ứng dụng.',
  browserTitle: 'Việc kiểm tra chạy trên máy của bạn',
  browserBody: 'Trình duyệt của bạn tải các bản ghi có chữ ký và danh sách đơn vị được Identra công nhận, rồi tự kiểm tra; không phải tin vào lời của một máy chủ nào.',
  listTitle: 'Ba sản phẩm mẫu để mở',
  products: [
    {
      title: 'Đủ ba chặng',
      lookFor: 'Cả ba chặng sản xuất, kiểm định, phân phối đều được đánh dấu hợp lệ: chữ ký khớp và bên ký được công nhận cho đúng chặng của mình.',
    },
    {
      title: 'Đang đi tiếp',
      lookFor: 'Mới có hai chặng. Trang nói rõ các chặng đã có đều hợp lệ và chặng phân phối chưa được ghi nhận, chứ không báo lỗi.',
    },
    {
      title: 'Bản ghi kiểm định đã bị thu hồi',
      lookFor: 'Chặng kiểm định chuyển sang đỏ: đơn vị kiểm định đã thu hồi bản ghi của họ, nên trang không xác nhận hành trình này.',
    },
  ],
  productNumber: 'Sản phẩm mẫu {number}',
  serialLabel: 'Số sê-ri',
  open: 'Mở trang sản phẩm',
  scanHint: 'Hoặc quét mã này bằng camera điện thoại.',
  qrLabel: 'Mã QR của sản phẩm mẫu {number}, mở trang sản phẩm',
  stagesTitle: 'Ai ký từng chặng',
  stages: [
    { name: 'Sản xuất', body: 'Nhà sản xuất ghi nhận lô hàng và ký bản ghi.' },
    { name: 'Kiểm định', body: 'Đơn vị kiểm định ghi kết quả kiểm tra và ký; họ có thể thu hồi bản ghi nếu phát hiện sai.' },
    { name: 'Phân phối', body: 'Nhà phân phối ghi nhận hàng tới cửa hàng và ký.' },
  ],
  nextTitle: 'Muốn thử với bằng tốt nghiệp?',
  nextBody: 'Demo có hướng dẫn: nhận bằng vào ví thử ngay trên trình duyệt, dùng bằng để ứng tuyển, rồi xem bằng bị thu hồi bị từ chối.',
  nextAction: 'Mở demo bằng tốt nghiệp',
};

const en: ProductJourneyDemoPageCopy = {
  backToDemos: 'All demos',
  realLabel: 'Runs for real on the Identra server',
  title: 'Check the journey of a product',
  intro: 'Each sample product carries a QR code. Open its page or scan the code with your phone camera: the page checks each stage signed by the manufacturer, the inspector and the distributor by itself. No app needed.',
  browserTitle: 'The check runs on your device',
  browserBody: 'Your browser fetches the signed records and the list of organisations Identra recognises, then checks them itself; it does not have to take any server\'s word for it.',
  listTitle: 'Three sample products to open',
  products: [
    {
      title: 'All three stages',
      lookFor: 'Production, inspection and distribution are all marked valid: each signature matches and each signer is recognised for its own stage.',
    },
    {
      title: 'Still on its way',
      lookFor: 'Only two stages so far. The page says the stages recorded are valid and distribution has not been recorded yet, rather than reporting an error.',
    },
    {
      title: 'Inspection record revoked',
      lookFor: 'The inspection stage turns red: the inspector revoked its record, so the page does not confirm this journey.',
    },
  ],
  productNumber: 'Sample product {number}',
  serialLabel: 'Serial number',
  open: 'Open the product page',
  scanHint: 'Or scan this code with your phone camera.',
  qrLabel: 'QR code of sample product {number}, opens the product page',
  stagesTitle: 'Who signs each stage',
  stages: [
    { name: 'Production', body: 'The manufacturer records the batch and signs the record.' },
    { name: 'Inspection', body: 'The inspector records the result and signs; it can revoke its record if it finds a mistake.' },
    { name: 'Distribution', body: 'The distributor records the arrival at the shop and signs.' },
  ],
  nextTitle: 'Want to try it with a diploma?',
  nextBody: 'A guided demo: receive a diploma into a trial wallet in your browser, apply for a job with it, then see a revoked diploma refused.',
  nextAction: 'Open the diploma demo',
};

export const PRODUCT_JOURNEY_DEMO_PAGE_TRANSLATIONS = {
  en,
  vi,
} as const satisfies Record<'en' | 'vi', ProductJourneyDemoPageCopy>;
