/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// How Identra works, in plain words: the seal, the list of recognised organisations, who holds what, and the
// comparison with an ordinary database. Shown on the demo hub (five locales) and, in short, at the top of the
// guided diploma demo. Every row must stay true of the product as deployed (no distributed ledger, a real database
// that is only a store, revocation seen at once by Identra's server and up to 15 minutes later elsewhere).
export interface IdentraHowItWorksCopy {
  summaryTitle: string;
  summaryBody: string;
  diagramLabel: string;
  school: { title: string; note: string };
  wallet: { title: string; note: string };
  verifier: { title: string; note: string };
  issueArrow: string;
  shareArrow: string;
  noCall: string;
  registry: string;
  fullTitle: string;
  fullIntro: string;
  beats: readonly { title: string; body: string }[];
  comparisonTitle: string;
  comparisonIntro: string;
  columns: { topic: string; database: string; identra: string };
  rows: readonly { topic: string; database: string; identra: string }[];
}

const vi: IdentraHowItWorksCopy = {
  summaryTitle: '30 giây hiểu Identra',
  summaryBody: 'Trường ký số lên tấm bằng, như đóng một con dấu không ai làm giả được. Bằng nằm trong ví trên điện thoại của bạn. Ai nhận bằng tự đối chiếu con dấu, không cần gọi về trường.',
  diagramLabel: 'Sơ đồ: trường gửi bằng có chữ ký vào ví của bạn; bạn gửi thông tin đã chọn cho nhà tuyển dụng; nhà tuyển dụng không cần hỏi lại trường.',
  school: { title: 'Trường', note: 'Ký bằng khóa chỉ trường giữ' },
  wallet: { title: 'Ví của bạn', note: 'Giữ bằng, bạn chọn gửi gì' },
  verifier: { title: 'Nhà tuyển dụng', note: 'Tự đối chiếu con dấu' },
  issueArrow: 'Bằng có chữ ký',
  shareArrow: 'Thông tin bạn chọn, kèm chữ ký',
  noCall: 'Nhà tuyển dụng → Trường: không cần hỏi lại',
  registry: 'Để biết con dấu đúng là của trường, bên kiểm dùng danh sách tổ chức được công nhận, danh sách này cũng có chữ ký.',
  fullTitle: 'Identra hoạt động thế nào',
  fullIntro: 'Ba ý là đủ để hiểu vì sao bên nhận tin được giấy tờ mà không phải hỏi lại nơi cấp.',
  beats: [
    { title: 'Con dấu số', body: 'Nơi cấp ký lên giấy tờ bằng khóa riêng chỉ họ giữ. Sửa một chữ là chữ ký không còn khớp, ai đối chiếu cũng thấy.' },
    { title: 'Danh sách tổ chức được công nhận', body: 'Mẫu dấu của từng tổ chức nằm trong một danh sách có chữ ký. Hiện Identra vận hành danh sách này; bản demo dùng chứng thư gốc DEMO.' },
    { title: 'Ai giữ gì', body: 'Người học giữ bằng trong ví. Máy chủ Identra không giữ nội dung bằng; nó giữ danh sách công nhận, danh sách thu hồi và những bản ghi có chữ ký. Bên kiểm tự đối chiếu.' },
  ],
  comparisonTitle: 'Cơ sở dữ liệu thông thường và Identra',
  comparisonIntro: 'Câu hỏi đầu tiên ai cũng hỏi: sao không lưu bằng vào một cơ sở dữ liệu rồi cho tra cứu?',
  columns: { topic: 'Câu hỏi', database: 'Cơ sở dữ liệu thông thường', identra: 'Identra' },
  rows: [
    { topic: 'Kiểm bằng cách nào', database: 'Hỏi máy chủ của trường hoặc nền tảng: “bằng số X có thật không?”', identra: 'Tự đối chiếu con dấu số trên chính tấm bằng, không hỏi trường.' },
    { topic: 'Ai sửa được', database: 'Quản trị viên hoặc kẻ xâm nhập sửa một dòng mà không để lại dấu vết.', identra: 'Sửa một ký tự là chữ ký vỡ, bên kiểm thấy ngay.' },
    { topic: 'Ai biết bạn nộp hồ sơ ở đâu', database: 'Chủ kho dữ liệu thấy mọi lượt tra cứu.', identra: 'Trường không được hỏi. Danh sách thu hồi dùng chung cho mọi người, không lộ đang kiểm bằng của ai.' },
    { topic: 'Dữ liệu tập trung', database: 'Một kho chứa thông tin của mọi người, là mục tiêu tấn công.', identra: 'Máy chủ không giữ nội dung bằng; bằng nằm trong ví của người học.' },
    { topic: 'Chia sẻ', database: 'Gửi cả bản chụp hay tệp PDF, lộ ngày sinh, số hiệu bằng.', identra: 'Chỉ gửi thông tin được chọn; phần còn lại ở lại trong ví.' },
    { topic: 'Thu hồi', database: 'Sửa một dòng.', identra: 'Danh sách thu hồi có chữ ký. Máy chủ Identra thấy ngay ở lần kiểm sau; bên kiểm khác có thể chậm tới 15 phút.' },
    { topic: 'Identra có cơ sở dữ liệu không?', database: '—', identra: 'Có, nhưng chỉ là nơi chứa. Thứ được tin là chữ ký, không phải kho dữ liệu.' },
  ],
};

const en: IdentraHowItWorksCopy = {
  summaryTitle: 'Identra in 30 seconds',
  summaryBody: 'The university signs the diploma digitally, like a seal nobody can forge. The diploma lives in the wallet on your phone. Whoever receives it checks the seal themselves, without calling the university.',
  diagramLabel: 'Diagram: the university sends a signed diploma to your wallet; you send the details you choose to the employer; the employer does not need to ask the university.',
  school: { title: 'University', note: 'Signs with a key only it holds' },
  wallet: { title: 'Your wallet', note: 'Holds the diploma, you choose what to send' },
  verifier: { title: 'Employer', note: 'Checks the seal itself' },
  issueArrow: 'Signed diploma',
  shareArrow: 'The details you chose, with signatures',
  noCall: 'Employer → University: no need to ask',
  registry: 'To know the seal really is the university\'s, the verifier uses the list of recognised organisations, which is signed too.',
  fullTitle: 'How Identra works',
  fullIntro: 'Three ideas explain why the receiver can trust a document without asking the issuer again.',
  beats: [
    { title: 'A digital seal', body: 'The issuer signs the document with a private key only it holds. Change one character and the signature no longer matches; anyone who checks sees it.' },
    { title: 'A list of recognised organisations', body: 'Each organisation\'s seal is in a signed list. Identra runs this list today; the demo uses a DEMO root certificate.' },
    { title: 'Who holds what', body: 'The graduate holds the diploma in a wallet. Identra\'s server does not keep the diploma\'s content; it keeps the recognised list, the revocation lists and signed records. The verifier checks by itself.' },
  ],
  comparisonTitle: 'An ordinary database and Identra',
  comparisonIntro: 'The first question everyone asks: why not keep diplomas in a database and let people look them up?',
  columns: { topic: 'Question', database: 'Ordinary database', identra: 'Identra' },
  rows: [
    { topic: 'How it is checked', database: 'Ask the university\'s or a platform\'s server: “is diploma number X real?”', identra: 'Check the digital seal on the diploma itself, without asking the university.' },
    { topic: 'Who can change it', database: 'An administrator or an intruder edits a row and leaves no trace.', identra: 'Change one character and the signature breaks; the verifier sees it at once.' },
    { topic: 'Who knows where you apply', database: 'The database owner sees every lookup.', identra: 'The university is not asked. The revocation list is the same for everyone and does not reveal whose diploma is being checked.' },
    { topic: 'Data in one place', database: 'One store holds everyone\'s data and is a target.', identra: 'The server does not keep the diploma\'s content; the diploma lives in the graduate\'s wallet.' },
    { topic: 'Sharing', database: 'Send a whole scan or PDF, with date of birth and diploma number.', identra: 'Send only the details chosen; the rest stays in the wallet.' },
    { topic: 'Revocation', database: 'Edit a row.', identra: 'A signed revocation list. Identra\'s server sees it at the next check; other verifiers may take up to 15 minutes.' },
    { topic: 'Does Identra have a database?', database: '—', identra: 'Yes, but only as a store. What is trusted is the signature, not the database.' },
  ],
};

const es: IdentraHowItWorksCopy = {
  summaryTitle: 'Identra en 30 segundos',
  summaryBody: 'La universidad firma digitalmente el título, como un sello que nadie puede falsificar. El título vive en la billetera de tu teléfono. Quien lo recibe comprueba el sello por sí mismo, sin llamar a la universidad.',
  diagramLabel: 'Diagrama: la universidad envía un título firmado a tu billetera; tú envías los datos que eliges a la empresa; la empresa no necesita preguntar a la universidad.',
  school: { title: 'Universidad', note: 'Firma con una clave que solo ella tiene' },
  wallet: { title: 'Tu billetera', note: 'Guarda el título; tú eliges qué enviar' },
  verifier: { title: 'Empresa', note: 'Comprueba el sello por sí misma' },
  issueArrow: 'Título firmado',
  shareArrow: 'Los datos que eliges, con firmas',
  noCall: 'Empresa → Universidad: no hace falta preguntar',
  registry: 'Para saber que el sello es de verdad de la universidad, quien verifica usa la lista de organizaciones reconocidas, que también está firmada.',
  fullTitle: 'Cómo funciona Identra',
  fullIntro: 'Tres ideas explican por qué quien recibe un documento puede confiar en él sin volver a preguntar al emisor.',
  beats: [
    { title: 'Un sello digital', body: 'El emisor firma el documento con una clave privada que solo él tiene. Si se cambia un carácter, la firma deja de coincidir y cualquiera que compruebe lo ve.' },
    { title: 'Una lista de organizaciones reconocidas', body: 'El sello de cada organización está en una lista firmada. Hoy Identra gestiona esta lista; la demo usa un certificado raíz DEMO.' },
    { title: 'Quién guarda qué', body: 'El titulado guarda el título en una billetera. El servidor de Identra no guarda el contenido del título; guarda la lista de reconocidos, las listas de revocación y registros firmados. Quien verifica comprueba por sí mismo.' },
  ],
  comparisonTitle: 'Una base de datos normal e Identra',
  comparisonIntro: 'La primera pregunta de todos: ¿por qué no guardar los títulos en una base de datos y permitir consultarlos?',
  columns: { topic: 'Pregunta', database: 'Base de datos normal', identra: 'Identra' },
  rows: [
    { topic: 'Cómo se comprueba', database: 'Preguntar al servidor de la universidad o de una plataforma: «¿es real el título número X?»', identra: 'Comprobar el sello digital del propio título, sin preguntar a la universidad.' },
    { topic: 'Quién puede cambiarlo', database: 'Un administrador o un intruso edita una fila sin dejar rastro.', identra: 'Si se cambia un carácter la firma se rompe y quien verifica lo ve al instante.' },
    { topic: 'Quién sabe dónde te postulas', database: 'El dueño de la base de datos ve cada consulta.', identra: 'No se pregunta a la universidad. La lista de revocación es la misma para todos y no revela qué título se comprueba.' },
    { topic: 'Datos en un solo lugar', database: 'Un almacén con los datos de todos, objetivo de ataques.', identra: 'El servidor no guarda el contenido del título; el título vive en la billetera del titulado.' },
    { topic: 'Compartir', database: 'Enviar un escaneo o PDF completo, con fecha de nacimiento y número de título.', identra: 'Solo se envían los datos elegidos; el resto se queda en la billetera.' },
    { topic: 'Revocación', database: 'Editar una fila.', identra: 'Una lista de revocación firmada. El servidor de Identra la ve en la siguiente comprobación; otros verificadores pueden tardar hasta 15 minutos.' },
    { topic: '¿Identra tiene base de datos?', database: '—', identra: 'Sí, pero solo como almacén. Lo que inspira confianza es la firma, no la base de datos.' },
  ],
};

const ja: IdentraHowItWorksCopy = {
  summaryTitle: '30 秒でわかる Identra',
  summaryBody: '大学は卒業証書にデジタル署名をします。誰にも偽造できない印鑑のようなものです。卒業証書はあなたのスマートフォンのウォレットに入ります。受け取った人は大学に問い合わせず、自分で印鑑を照合します。',
  diagramLabel: '図：大学が署名入りの卒業証書をウォレットに送り、あなたは選んだ情報を企業に送り、企業は大学に問い合わせる必要がありません。',
  school: { title: '大学', note: '大学だけが持つ鍵で署名' },
  wallet: { title: 'あなたのウォレット', note: '証書を保管し、送る内容はあなたが選ぶ' },
  verifier: { title: '企業', note: '自分で印鑑を照合' },
  issueArrow: '署名入りの卒業証書',
  shareArrow: '選んだ情報と署名',
  noCall: '企業 → 大学：問い合わせ不要',
  registry: '印鑑が本当に大学のものか確かめるため、確認する側は認定組織リストを使います。このリストにも署名があります。',
  fullTitle: 'Identra の仕組み',
  fullIntro: '受け取る側が発行元に問い合わせずに書類を信頼できる理由は、次の 3 点でわかります。',
  beats: [
    { title: 'デジタルの印鑑', body: '発行元は自分だけが持つ秘密鍵で書類に署名します。1 文字でも変えると署名が合わなくなり、照合すれば誰でも気づきます。' },
    { title: '認定組織のリスト', body: '各組織の印鑑は署名付きのリストに載っています。現在は Identra がこのリストを運営し、デモでは DEMO ルート証明書を使います。' },
    { title: '誰が何を持つか', body: '卒業生はウォレットで卒業証書を持ちます。Identra のサーバーは証書の内容を保存せず、認定リスト・失効リスト・署名付き記録を保管します。確認する側は自分で照合します。' },
  ],
  comparisonTitle: '通常のデータベースと Identra',
  comparisonIntro: '誰もが最初に聞く質問：卒業証書をデータベースに入れて照会できるようにすればよいのでは？',
  columns: { topic: '質問', database: '通常のデータベース', identra: 'Identra' },
  rows: [
    { topic: '確認方法', database: '大学やプラットフォームのサーバーに「証書番号 X は本物か」と問い合わせる。', identra: '大学に問い合わせず、証書そのもののデジタル印鑑を照合する。' },
    { topic: '誰が書き換えられるか', database: '管理者や侵入者が 1 行を書き換えても痕跡が残らない。', identra: '1 文字変えれば署名が壊れ、確認する側がすぐに気づく。' },
    { topic: 'どこに応募したか誰が知るか', database: 'データベースの持ち主がすべての照会を見られる。', identra: '大学には問い合わせない。失効リストは全員共通で、誰の証書を確認しているかは分からない。' },
    { topic: 'データの集中', database: '全員の情報が 1 か所にあり、攻撃の標的になる。', identra: 'サーバーは証書の内容を保存しない。証書は卒業生のウォレットにある。' },
    { topic: '共有', database: 'スキャンや PDF を丸ごと送り、生年月日や証書番号も見える。', identra: '選んだ情報だけを送り、残りはウォレットに残る。' },
    { topic: '失効', database: '1 行を書き換える。', identra: '署名付きの失効リスト。Identra のサーバーは次の確認ですぐ分かり、他の確認者は最大 15 分遅れることがある。' },
    { topic: 'Identra にデータベースはあるか', database: '—', identra: 'ある。ただし保管場所にすぎず、信頼の根拠はデータベースではなく署名。' },
  ],
};

const de: IdentraHowItWorksCopy = {
  summaryTitle: 'Identra in 30 Sekunden',
  summaryBody: 'Die Hochschule signiert das Zeugnis digital, wie mit einem Siegel, das niemand fälschen kann. Das Zeugnis liegt in der Wallet auf Ihrem Smartphone. Wer es erhält, prüft das Siegel selbst, ohne die Hochschule anzurufen.',
  diagramLabel: 'Diagramm: Die Hochschule sendet ein signiertes Zeugnis an Ihre Wallet; Sie senden die gewählten Angaben an den Arbeitgeber; der Arbeitgeber muss die Hochschule nicht fragen.',
  school: { title: 'Hochschule', note: 'Signiert mit einem Schlüssel, den nur sie hat' },
  wallet: { title: 'Ihre Wallet', note: 'Hält das Zeugnis, Sie wählen, was Sie senden' },
  verifier: { title: 'Arbeitgeber', note: 'Prüft das Siegel selbst' },
  issueArrow: 'Signiertes Zeugnis',
  shareArrow: 'Gewählte Angaben mit Signaturen',
  noCall: 'Arbeitgeber → Hochschule: keine Rückfrage nötig',
  registry: 'Um zu wissen, dass das Siegel wirklich von der Hochschule stammt, nutzt der Prüfer die Liste anerkannter Organisationen, die ebenfalls signiert ist.',
  fullTitle: 'So funktioniert Identra',
  fullIntro: 'Drei Gedanken erklären, warum der Empfänger einem Dokument vertrauen kann, ohne beim Aussteller nachzufragen.',
  beats: [
    { title: 'Ein digitales Siegel', body: 'Der Aussteller signiert das Dokument mit einem privaten Schlüssel, den nur er besitzt. Ändert man ein Zeichen, passt die Signatur nicht mehr, und jeder Prüfer sieht es.' },
    { title: 'Eine Liste anerkannter Organisationen', body: 'Das Siegel jeder Organisation steht in einer signierten Liste. Derzeit betreibt Identra diese Liste; die Demo nutzt ein DEMO-Stammzertifikat.' },
    { title: 'Wer was hält', body: 'Die Absolventin hält das Zeugnis in einer Wallet. Der Identra-Server speichert den Inhalt des Zeugnisses nicht; er hält die Anerkennungsliste, die Widerrufslisten und signierte Einträge. Der Prüfer prüft selbst.' },
  ],
  comparisonTitle: 'Eine gewöhnliche Datenbank und Identra',
  comparisonIntro: 'Die erste Frage aller: Warum nicht Zeugnisse in einer Datenbank speichern und abfragen lassen?',
  columns: { topic: 'Frage', database: 'Gewöhnliche Datenbank', identra: 'Identra' },
  rows: [
    { topic: 'Wie geprüft wird', database: 'Den Server der Hochschule oder einer Plattform fragen: „Ist Zeugnis Nummer X echt?“', identra: 'Das digitale Siegel auf dem Zeugnis selbst prüfen, ohne die Hochschule zu fragen.' },
    { topic: 'Wer es ändern kann', database: 'Ein Administrator oder Eindringling ändert eine Zeile ohne Spuren.', identra: 'Ein geändertes Zeichen bricht die Signatur; der Prüfer sieht es sofort.' },
    { topic: 'Wer weiß, wo Sie sich bewerben', database: 'Der Datenbankbetreiber sieht jede Abfrage.', identra: 'Die Hochschule wird nicht gefragt. Die Widerrufsliste ist für alle gleich und verrät nicht, wessen Zeugnis geprüft wird.' },
    { topic: 'Daten an einem Ort', database: 'Ein Speicher mit allen Daten, ein Angriffsziel.', identra: 'Der Server speichert den Inhalt des Zeugnisses nicht; das Zeugnis liegt in der Wallet der Absolventin.' },
    { topic: 'Teilen', database: 'Einen ganzen Scan oder ein PDF senden, mit Geburtsdatum und Zeugnisnummer.', identra: 'Nur die gewählten Angaben senden; der Rest bleibt in der Wallet.' },
    { topic: 'Widerruf', database: 'Eine Zeile ändern.', identra: 'Eine signierte Widerrufsliste. Der Identra-Server sieht sie bei der nächsten Prüfung; andere Prüfer können bis zu 15 Minuten später sein.' },
    { topic: 'Hat Identra eine Datenbank?', database: '—', identra: 'Ja, aber nur als Speicher. Vertraut wird der Signatur, nicht der Datenbank.' },
  ],
};

export const IDENTRA_HOW_IT_WORKS_TRANSLATIONS = {
  en,
  es,
  ja,
  de,
  vi,
} as const satisfies Record<'en' | 'es' | 'ja' | 'de' | 'vi', IdentraHowItWorksCopy>;
