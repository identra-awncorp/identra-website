/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Facts only: what protects a credential today and what is not in place yet
// (docs/cto/BAO-CAO-NGHIEM-THU.md sections 1, 3.5 and 5). No certification is claimed.

export interface SecurityPoint {
  title: string;
  body: string;
}

export interface SecurityPageCopy {
  title: string;
  intro: string;
  ctaDemo: string;
  ctaContact: string;
  builtTitle: string;
  builtIntro: string;
  built: SecurityPoint[];
  notYetTitle: string;
  notYetIntro: string;
  notYet: SecurityPoint[];
  nextTitle: string;
  nextBody: string;
  demoDiploma: string;
  demoProduct: string;
  contactTitle: string;
  contactCta: string;
}

const en: SecurityPageCopy = {
  title: 'Security: what is built, and what is not yet',
  intro: 'Identra is in its pilot stage. This page states what protects a credential today, what is not in place yet, and the root certificate every check leads back to.',
  ctaDemo: 'Try the guided demo',
  ctaContact: 'Contact us',
  builtTitle: 'Built and tested',
  builtIntro: 'These parts run in both demos today, with real cryptography and nothing mocked.',
  built: [
    { title: 'Signed credentials', body: 'A diploma or a product step is an SD-JWT verifiable credential signed by the organisation that issued it. Change a single character and the signature no longer matches.' },
    { title: 'One certificate chain, one root', body: 'Each issuer signs with an X.509 certificate that chains to the Identra root certificate published on this page. A signature that does not lead back to it is rejected.' },
    { title: 'A signed list of recognised organisations', body: 'Identra signs the list of organisations it recognises. The wallet and the verifier read that list before they trust a name.' },
    { title: 'Revocation', body: 'An issuer can revoke a credential through a status list. The Identra server sees it at the next check; other verifiers and browsers can take up to 15 minutes, because the list is cached.' },
    { title: 'Only what you choose to share', body: 'With selective disclosure the holder sends only the fields a verifier asks for and the holder agrees to.' },
    { title: 'Open standards, signatures only', body: 'Credentials are issued with OpenID4VCI and presented with OpenID4VP. Trust comes from digital signatures and certificate chains, not from a distributed ledger or tokens.' },
    { title: 'Code reviewed in a separate pass', body: 'Each part of the code was reviewed in a pass independent of the one that wrote it, attack attempts included. High-severity findings were fixed or recorded with a reason. This is an internal review, not a third-party audit.' },
  ],
  notYetTitle: 'Not in place yet',
  notYetIntro: 'Read these before you rely on Identra for anything real.',
  notYet: [
    { title: 'No certification, no independent audit', body: 'Identra holds no security certification, and no outside firm has audited it yet.' },
    { title: 'A demo root certificate', body: 'The root certificate below is a DEMO root; its keys are kept on a development machine. A real root, created in a controlled key ceremony, comes before any production use.' },
    { title: 'The wallet app is in internal testing', body: 'The Identra wallet app is not published on the App Store or Google Play and has not yet run on a physical phone. The demos use a trial wallet in the browser that runs the same library.' },
    { title: 'Sample data only', body: 'The demo portals use sample accounts. Please do not enter real personal data.' },
  ],
  nextTitle: 'See it for yourself',
  nextBody: 'The guided demo issues a sample diploma, presents it to an employer and then revokes it, showing every check. The product journey demo checks each signed step in your own browser.',
  demoDiploma: 'Guided diploma demo',
  demoProduct: 'Product journey demo',
  contactTitle: 'Found a problem, or want to run a pilot?',
  contactCta: 'Contact us',
};

const es: SecurityPageCopy = {
  title: 'Seguridad: lo que existe y lo que aún no',
  intro: 'Identra está en fase piloto. Esta página explica qué protege hoy una credencial, qué aún no está implantado y el certificado raíz al que conduce cada comprobación.',
  ctaDemo: 'Probar la demo guiada',
  ctaContact: 'Contactar',
  builtTitle: 'Construido y probado',
  builtIntro: 'Estas partes funcionan hoy en las dos demos, con criptografía real y nada simulado.',
  built: [
    { title: 'Credenciales firmadas', body: 'Un título o una etapa de un producto es una credencial verificable SD-JWT firmada por la organización que la emitió. Si cambia un solo carácter, la firma deja de coincidir.' },
    { title: 'Una cadena de certificados, una raíz', body: 'Cada emisor firma con un certificado X.509 que se encadena al certificado raíz de Identra publicado en esta página. Una firma que no conduce a él se rechaza.' },
    { title: 'Una lista firmada de organizaciones reconocidas', body: 'Identra firma la lista de organizaciones que reconoce. La billetera y el verificador la leen antes de confiar en un nombre.' },
    { title: 'Revocación', body: 'Un emisor puede revocar una credencial mediante una lista de estado. El servidor de Identra lo ve en la siguiente comprobación; otros verificadores y los navegadores pueden tardar hasta 15 minutos, porque la lista se guarda en caché.' },
    { title: 'Solo lo que decide compartir', body: 'Con la divulgación selectiva, el titular envía solo los campos que pide el verificador y que el titular acepta.' },
    { title: 'Estándares abiertos, solo firmas', body: 'Las credenciales se emiten con OpenID4VCI y se presentan con OpenID4VP. La confianza viene de firmas digitales y cadenas de certificados, no de un registro distribuido ni de tokens.' },
    { title: 'Código revisado en una pasada aparte', body: 'Cada parte del código se revisó en una pasada independiente de la que lo escribió, con intentos de ataque incluidos. Los hallazgos graves se corrigieron o se registraron con su motivo. Es una revisión interna, no una auditoría de terceros.' },
  ],
  notYetTitle: 'Aún no implantado',
  notYetIntro: 'Léalo antes de confiar en Identra para algo real.',
  notYet: [
    { title: 'Sin certificación ni auditoría independiente', body: 'Identra no tiene ninguna certificación de seguridad y ninguna empresa externa la ha auditado todavía.' },
    { title: 'Un certificado raíz de demostración', body: 'El certificado raíz de abajo es una raíz DEMO; sus claves se guardan en un equipo de desarrollo. Una raíz real, creada en una ceremonia de claves controlada, llegará antes de cualquier uso en producción.' },
    { title: 'La app de billetera está en pruebas internas', body: 'La app de billetera de Identra no está publicada en App Store ni en Google Play y aún no se ha ejecutado en un teléfono físico. Las demos usan una billetera de prueba en el navegador que ejecuta la misma biblioteca.' },
    { title: 'Solo datos de ejemplo', body: 'Los portales de demostración usan cuentas de ejemplo. No introduzca datos personales reales.' },
  ],
  nextTitle: 'Compruébelo usted mismo',
  nextBody: 'La demo guiada emite un título de ejemplo, lo presenta a un empleador y luego lo revoca, mostrando cada comprobación. La demo del recorrido de un producto comprueba cada etapa firmada en su propio navegador.',
  demoDiploma: 'Demo guiada del título',
  demoProduct: 'Demo del recorrido de un producto',
  contactTitle: '¿Encontró un problema o quiere hacer un piloto?',
  contactCta: 'Contactar',
};

const ja: SecurityPageCopy = {
  title: 'セキュリティ：できていること、まだのこと',
  intro: 'Identra はパイロット段階です。このページでは、いま資格情報を守っているもの、まだ整っていないもの、そしてすべての検証がたどり着くルート証明書を示します。',
  ctaDemo: 'ガイド付きデモを試す',
  ctaContact: 'お問い合わせ',
  builtTitle: '構築済み・テスト済み',
  builtIntro: '以下は現在、2 つのデモの両方で、本物の暗号技術によって動いています。模擬はありません。',
  built: [
    { title: '署名された資格情報', body: '卒業証書や製品の工程は、発行した組織が署名した SD-JWT 形式の検証可能な資格情報です。1 文字でも変えると署名は一致しなくなります。' },
    { title: '1 本の証明書チェーン、1 つのルート', body: '各発行者は、このページで公開している Identra ルート証明書につながる X.509 証明書で署名します。ルートにたどり着かない署名は拒否されます。' },
    { title: '署名付きの認定組織リスト', body: 'Identra は認定する組織のリストに署名します。ウォレットと検証者は、名前を信頼する前にこのリストを確認します。' },
    { title: '失効', body: '発行者はステータスリストで資格情報を失効できます。Identra サーバーは次の検証で反映します。他の検証者やブラウザでは、リストがキャッシュされるため最大 15 分かかることがあります。' },
    { title: '選んだ項目だけを共有', body: '選択的開示により、保有者は検証者が求め、かつ保有者が同意した項目だけを送ります。' },
    { title: 'オープン標準、署名のみ', body: '資格情報は OpenID4VCI で発行され、OpenID4VP で提示されます。信頼の根拠はデジタル署名と証明書チェーンであり、分散型台帳やトークンではありません。' },
    { title: '別工程でのコードレビュー', body: 'コードの各部分は、書いた工程とは独立した工程でレビューされ、攻撃の試行も含まれています。重大な指摘は修正するか、理由とともに記録しました。これは内部レビューであり、第三者監査ではありません。' },
  ],
  notYetTitle: 'まだ整っていないこと',
  notYetIntro: '実際の用途で Identra に頼る前にお読みください。',
  notYet: [
    { title: '認証も独立監査もありません', body: 'Identra はセキュリティ認証を取得しておらず、外部の監査もまだ受けていません。' },
    { title: 'デモ用のルート証明書', body: '下のルート証明書は DEMO 用で、その鍵は開発用マシンに保管されています。本番利用の前に、管理された鍵生成式典で本物のルートを作成します。' },
    { title: 'ウォレットアプリは社内テスト中', body: 'Identra ウォレットアプリは App Store や Google Play で公開されておらず、実機のスマートフォンではまだ動かしていません。デモでは、同じライブラリで動くブラウザ上の試用ウォレットを使います。' },
    { title: 'サンプルデータのみ', body: 'デモのポータルはサンプルアカウントを使います。実際の個人情報は入力しないでください。' },
  ],
  nextTitle: 'ご自身で確かめる',
  nextBody: 'ガイド付きデモでは、サンプルの卒業証書を発行し、採用担当者に提示してから失効させ、すべての検証を表示します。製品の流通履歴デモでは、署名された各工程をあなたのブラウザで確認します。',
  demoDiploma: '卒業証書のガイド付きデモ',
  demoProduct: '製品の流通履歴デモ',
  contactTitle: '問題を見つけた、またはパイロットをご希望ですか？',
  contactCta: 'お問い合わせ',
};

const de: SecurityPageCopy = {
  title: 'Sicherheit: was steht, was noch fehlt',
  intro: 'Identra befindet sich in der Pilotphase. Diese Seite zeigt, was einen Nachweis heute schützt, was noch fehlt und welches Wurzelzertifikat am Ende jeder Prüfung steht.',
  ctaDemo: 'Geführte Demo testen',
  ctaContact: 'Kontakt',
  builtTitle: 'Gebaut und getestet',
  builtIntro: 'Diese Teile laufen heute in beiden Demos, mit echter Kryptografie und ohne Attrappen.',
  built: [
    { title: 'Signierte Nachweise', body: 'Ein Abschluss oder ein Produktschritt ist ein SD-JWT-Nachweis, signiert von der Organisation, die ihn ausgestellt hat. Ändert sich ein einziges Zeichen, passt die Signatur nicht mehr.' },
    { title: 'Eine Zertifikatskette, eine Wurzel', body: 'Jeder Aussteller signiert mit einem X.509-Zertifikat, das zum auf dieser Seite veröffentlichten Identra-Wurzelzertifikat führt. Eine Signatur, die nicht dorthin führt, wird abgelehnt.' },
    { title: 'Eine signierte Liste anerkannter Organisationen', body: 'Identra signiert die Liste der Organisationen, die es anerkennt. Wallet und Prüfer lesen diese Liste, bevor sie einem Namen vertrauen.' },
    { title: 'Widerruf', body: 'Ein Aussteller kann einen Nachweis über eine Statusliste widerrufen. Der Identra-Server sieht das bei der nächsten Prüfung; andere Prüfer und Browser können bis zu 15 Minuten brauchen, weil die Liste zwischengespeichert wird.' },
    { title: 'Nur, was Sie teilen möchten', body: 'Mit selektiver Offenlegung sendet die Inhaberin nur die Felder, die der Prüfer anfragt und denen sie zustimmt.' },
    { title: 'Offene Standards, nur Signaturen', body: 'Nachweise werden mit OpenID4VCI ausgestellt und mit OpenID4VP vorgelegt. Vertrauen entsteht durch digitale Signaturen und Zertifikatsketten, nicht durch ein verteiltes Register oder Token.' },
    { title: 'Code in einem eigenen Durchgang geprüft', body: 'Jeder Teil des Codes wurde in einem Durchgang geprüft, der von dem Durchgang, der ihn schrieb, unabhängig war, einschließlich Angriffsversuchen. Schwere Befunde wurden behoben oder mit Begründung festgehalten. Das ist eine interne Prüfung, kein Audit durch Dritte.' },
  ],
  notYetTitle: 'Noch nicht vorhanden',
  notYetIntro: 'Bitte lesen Sie das, bevor Sie sich für etwas Echtes auf Identra verlassen.',
  notYet: [
    { title: 'Keine Zertifizierung, kein unabhängiges Audit', body: 'Identra besitzt keine Sicherheitszertifizierung, und bisher hat kein externes Unternehmen ein Audit durchgeführt.' },
    { title: 'Ein Demo-Wurzelzertifikat', body: 'Das Wurzelzertifikat unten ist eine DEMO-Wurzel; ihre Schlüssel liegen auf einem Entwicklungsrechner. Eine echte Wurzel, erzeugt in einer kontrollierten Schlüsselzeremonie, kommt vor jedem Produktiveinsatz.' },
    { title: 'Die Wallet-App ist im internen Test', body: 'Die Identra-Wallet-App ist weder im App Store noch bei Google Play veröffentlicht und lief noch nicht auf einem echten Smartphone. Die Demos nutzen eine Test-Wallet im Browser mit derselben Bibliothek.' },
    { title: 'Nur Beispieldaten', body: 'Die Demo-Portale verwenden Beispielkonten. Bitte geben Sie keine echten personenbezogenen Daten ein.' },
  ],
  nextTitle: 'Selbst nachprüfen',
  nextBody: 'Die geführte Demo stellt einen Beispielabschluss aus, legt ihn einem Arbeitgeber vor und widerruft ihn dann, mit jeder Prüfung sichtbar. Die Produktweg-Demo prüft jeden signierten Schritt in Ihrem eigenen Browser.',
  demoDiploma: 'Geführte Abschluss-Demo',
  demoProduct: 'Produktweg-Demo',
  contactTitle: 'Ein Problem gefunden oder Interesse an einem Pilotprojekt?',
  contactCta: 'Kontakt aufnehmen',
};

const vi: SecurityPageCopy = {
  title: 'Bảo mật: đã có gì, chưa có gì',
  intro: 'Identra đang ở giai đoạn thí điểm. Trang này nói rõ điều gì đang bảo vệ một chứng nhận số hôm nay, điều gì chưa có, và chứng thư gốc mà mọi lần kiểm tra đều dẫn về.',
  ctaDemo: 'Thử demo từng bước',
  ctaContact: 'Liên hệ',
  builtTitle: 'Đã xây và đã kiểm thử',
  builtIntro: 'Các phần này đang chạy trong cả hai bản demo, bằng mật mã thật, không có gì giả lập.',
  built: [
    { title: 'Chứng nhận có chữ ký số', body: 'Một tấm bằng hay một công đoạn sản phẩm là một chứng nhận số dạng SD-JWT VC, do chính tổ chức phát hành ký. Sửa một ký tự là chữ ký không còn khớp.' },
    { title: 'Một chuỗi chứng thư, một gốc', body: 'Mỗi tổ chức phát hành ký bằng chứng thư X.509 nối về chứng thư gốc của Identra công bố trên trang này. Chữ ký không dẫn về gốc này bị từ chối.' },
    { title: 'Danh sách tổ chức được công nhận, có chữ ký', body: 'Identra ký danh sách các tổ chức mình công nhận. Ví và bên xác minh đọc danh sách này trước khi tin một cái tên.' },
    { title: 'Thu hồi', body: 'Tổ chức phát hành có thể thu hồi chứng nhận qua danh sách trạng thái. Máy chủ Identra thấy ngay ở lần kiểm tra kế tiếp; bên xác minh khác và trình duyệt có thể chậm tới 15 phút vì danh sách được lưu đệm.' },
    { title: 'Chỉ chia sẻ phần bạn chọn', body: 'Nhờ tiết lộ có chọn lọc, người giữ chỉ gửi những trường mà bên xác minh yêu cầu và người giữ đồng ý.' },
    { title: 'Chuẩn mở, chỉ dùng chữ ký số', body: 'Chứng nhận được phát hành theo OpenID4VCI và xuất trình theo OpenID4VP. Niềm tin đến từ chữ ký số và chuỗi chứng thư, không đến từ sổ cái phân tán hay token.' },
    { title: 'Mã được rà ở một lượt riêng', body: 'Mỗi phần mã được rà ở một lượt độc lập với lượt viết ra nó, có cả thử tấn công. Phát hiện mức cao đã được sửa hoặc ghi rõ lý do. Đây là rà soát nội bộ, không phải kiểm toán của bên thứ ba.' },
  ],
  notYetTitle: 'Chưa có',
  notYetIntro: 'Hãy đọc phần này trước khi dựa vào Identra cho việc thật.',
  notYet: [
    { title: 'Chưa có chứng nhận, chưa có kiểm toán độc lập', body: 'Identra chưa có chứng nhận bảo mật nào và chưa được một đơn vị bên ngoài kiểm toán.' },
    { title: 'Chứng thư gốc bản DEMO', body: 'Chứng thư gốc bên dưới là bản DEMO, khóa của nó nằm trên máy phát triển. Chứng thư gốc thật, tạo trong một buổi sinh khóa có kiểm soát, sẽ có trước khi dùng thật.' },
    { title: 'Ứng dụng ví đang thử nghiệm nội bộ', body: 'Ứng dụng ví Identra chưa phát hành trên App Store hay Google Play và chưa chạy trên điện thoại thật. Các bản demo dùng ví thử trên trình duyệt, chạy cùng thư viện với ứng dụng.' },
    { title: 'Chỉ dùng dữ liệu mẫu', body: 'Cổng trường trong demo dùng tài khoản mẫu. Đừng nhập dữ liệu cá nhân thật.' },
  ],
  nextTitle: 'Tự kiểm chứng',
  nextBody: 'Demo từng bước phát hành một tấm bằng mẫu, xuất trình cho nhà tuyển dụng rồi thu hồi, với mọi bước kiểm tra hiện ra. Demo hành trình sản phẩm kiểm tra từng công đoạn có chữ ký ngay trên trình duyệt của bạn.',
  demoDiploma: 'Demo bằng tốt nghiệp',
  demoProduct: 'Demo hành trình sản phẩm',
  contactTitle: 'Thấy vấn đề, hoặc muốn thí điểm?',
  contactCta: 'Liên hệ với chúng tôi',
};

export const SECURITY_PAGE_TRANSLATIONS = { en, es, ja, de, vi } as const;
