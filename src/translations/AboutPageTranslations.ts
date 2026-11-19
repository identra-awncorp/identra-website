/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Only true company facts: who builds Identra, what exists today, what does not exist yet.

export interface AboutPoint {
  title: string;
  body: string;
  link: string;
}

export interface AboutPageCopy {
  title: string;
  intro: string;
  ctaDemo: string;
  ctaContact: string;
  notYetTitle: string;
  notYet: string[];
  haveTitle: string;
  haveDemos: AboutPoint;
  haveRoot: AboutPoint;
  haveWallet: AboutPoint;
  nextTitle: string;
  nextBody: string;
  nextCta: string;
}

const en: AboutPageCopy = {
  title: 'Identra is in its pilot stage',
  intro: 'Identra is a verifiable-credential system built by AwnCorp in Vietnam. An organisation issues a signed digital credential, such as a diploma or a product\'s journey, and anyone can check it without calling the issuer.',
  ctaDemo: 'Try the demos',
  ctaContact: 'Contact us',
  notYetTitle: 'What does not exist yet',
  notYet: [
    'No customers yet.',
    'No public price list.',
    'No security certification and no third-party audit.',
    'The mobile wallet app is not published.',
  ],
  haveTitle: 'What exists today',
  haveDemos: {
    title: 'Two working demos',
    body: 'A diploma issued by a sample university, shown to an employer and then revoked; and products whose every step is signed and checked in your browser. Both run on the live server with real cryptography.',
    link: 'Open the demos',
  },
  haveRoot: {
    title: 'A published root certificate',
    body: 'Every check leads back to one root certificate. Today it is a DEMO root. The security page lists what is built and what is not yet.',
    link: 'Read the security page',
  },
  haveWallet: {
    title: 'A wallet app in internal testing',
    body: 'The mobile wallet is built and tested but has not yet run on a physical phone. The demos use a trial wallet in the browser that runs the same library.',
    link: 'Try the guided demo',
  },
  nextTitle: 'Next: a pilot with a school and an employer',
  nextBody: 'The next step is to issue real diplomas with one school and check them with one employer. If you would like to take part, tell us.',
  nextCta: 'Contact us',
};

const es: AboutPageCopy = {
  title: 'Identra está en fase piloto',
  intro: 'Identra es un sistema de credenciales verificables desarrollado por AwnCorp en Vietnam. Una organización emite una credencial digital firmada, como un título o el recorrido de un producto, y cualquiera puede comprobarla sin llamar al emisor.',
  ctaDemo: 'Probar las demos',
  ctaContact: 'Contactar',
  notYetTitle: 'Lo que aún no existe',
  notYet: [
    'Todavía no hay clientes.',
    'No hay una lista de precios pública.',
    'No hay certificación de seguridad ni auditoría de terceros.',
    'La app de billetera móvil no está publicada.',
  ],
  haveTitle: 'Lo que existe hoy',
  haveDemos: {
    title: 'Dos demos que funcionan',
    body: 'Un título emitido por una universidad de ejemplo, mostrado a un empleador y luego revocado; y productos cuyas etapas están todas firmadas y se comprueban en su navegador. Ambas funcionan en el servidor real con criptografía real.',
    link: 'Abrir las demos',
  },
  haveRoot: {
    title: 'Un certificado raíz publicado',
    body: 'Cada comprobación conduce a un único certificado raíz. Hoy es una raíz DEMO. La página de seguridad explica lo que existe y lo que aún no.',
    link: 'Leer la página de seguridad',
  },
  haveWallet: {
    title: 'Una app de billetera en pruebas internas',
    body: 'La billetera móvil está construida y probada, pero aún no se ha ejecutado en un teléfono físico. Las demos usan una billetera de prueba en el navegador con la misma biblioteca.',
    link: 'Probar la demo guiada',
  },
  nextTitle: 'Próximo paso: un piloto con una universidad y un empleador',
  nextBody: 'El siguiente paso es emitir títulos reales con una universidad y comprobarlos con un empleador. Si quiere participar, escríbanos.',
  nextCta: 'Contactar',
};

const ja: AboutPageCopy = {
  title: 'Identra はパイロット段階です',
  intro: 'Identra は、ベトナムの AwnCorp が開発する検証可能な資格情報のシステムです。組織が卒業証書や製品の流通履歴などの署名付きデジタル資格情報を発行し、誰でも発行者に問い合わせることなく確認できます。',
  ctaDemo: 'デモを試す',
  ctaContact: 'お問い合わせ',
  notYetTitle: 'まだないもの',
  notYet: [
    'まだ顧客はいません。',
    '公開の料金表はありません。',
    'セキュリティ認証も第三者監査もありません。',
    'モバイルウォレットアプリは公開されていません。',
  ],
  haveTitle: 'いまあるもの',
  haveDemos: {
    title: '動く 2 つのデモ',
    body: 'サンプル大学が発行し、採用担当者に提示され、その後失効する卒業証書。そして、すべての工程に署名があり、あなたのブラウザで確認される製品。どちらも本番サーバー上で本物の暗号技術によって動きます。',
    link: 'デモを開く',
  },
  haveRoot: {
    title: '公開されたルート証明書',
    body: 'すべての検証は 1 つのルート証明書にたどり着きます。現在は DEMO 用のルートです。できていることとまだのことはセキュリティのページにまとめています。',
    link: 'セキュリティのページを読む',
  },
  haveWallet: {
    title: '社内テスト中のウォレットアプリ',
    body: 'モバイルウォレットは構築・テスト済みですが、実機のスマートフォンではまだ動かしていません。デモでは同じライブラリで動くブラウザ上の試用ウォレットを使います。',
    link: 'ガイド付きデモを試す',
  },
  nextTitle: '次のステップ：大学と採用企業でのパイロット',
  nextBody: '次は、1 つの大学で本物の卒業証書を発行し、1 つの採用企業で確認することです。参加をご希望の方はご連絡ください。',
  nextCta: 'お問い合わせ',
};

const de: AboutPageCopy = {
  title: 'Identra ist in der Pilotphase',
  intro: 'Identra ist ein System für verifizierbare Nachweise, entwickelt von AwnCorp in Vietnam. Eine Organisation stellt einen signierten digitalen Nachweis aus, etwa einen Abschluss oder den Weg eines Produkts, und jeder kann ihn prüfen, ohne beim Aussteller nachzufragen.',
  ctaDemo: 'Demos testen',
  ctaContact: 'Kontakt',
  notYetTitle: 'Was es noch nicht gibt',
  notYet: [
    'Noch keine Kunden.',
    'Keine öffentliche Preisliste.',
    'Keine Sicherheitszertifizierung und kein Audit durch Dritte.',
    'Die mobile Wallet-App ist nicht veröffentlicht.',
  ],
  haveTitle: 'Was es heute gibt',
  haveDemos: {
    title: 'Zwei funktionierende Demos',
    body: 'Ein Abschluss einer Beispieluniversität, der einem Arbeitgeber vorgelegt und dann widerrufen wird; und Produkte, deren Schritte alle signiert sind und in Ihrem Browser geprüft werden. Beide laufen auf dem echten Server mit echter Kryptografie.',
    link: 'Demos öffnen',
  },
  haveRoot: {
    title: 'Ein veröffentlichtes Wurzelzertifikat',
    body: 'Jede Prüfung führt zu einem einzigen Wurzelzertifikat. Heute ist es eine DEMO-Wurzel. Die Sicherheitsseite zeigt, was steht und was noch fehlt.',
    link: 'Zur Sicherheitsseite',
  },
  haveWallet: {
    title: 'Eine Wallet-App im internen Test',
    body: 'Die mobile Wallet ist gebaut und getestet, lief aber noch nicht auf einem echten Smartphone. Die Demos nutzen eine Test-Wallet im Browser mit derselben Bibliothek.',
    link: 'Geführte Demo testen',
  },
  nextTitle: 'Als Nächstes: ein Pilot mit einer Hochschule und einem Arbeitgeber',
  nextBody: 'Der nächste Schritt ist, mit einer Hochschule echte Abschlüsse auszustellen und sie mit einem Arbeitgeber zu prüfen. Wenn Sie mitmachen möchten, schreiben Sie uns.',
  nextCta: 'Kontakt aufnehmen',
};

const vi: AboutPageCopy = {
  title: 'Identra đang ở giai đoạn thí điểm',
  intro: 'Identra là hệ thống chứng nhận số có thể kiểm chứng do AwnCorp (Việt Nam) xây dựng. Một tổ chức phát hành chứng nhận số có chữ ký, như một tấm bằng hay hành trình của một sản phẩm, và ai cũng kiểm tra được mà không cần gọi cho bên phát hành.',
  ctaDemo: 'Thử các bản demo',
  ctaContact: 'Liên hệ',
  notYetTitle: 'Những gì chưa có',
  notYet: [
    'Chưa có khách hàng.',
    'Chưa có bảng giá công khai.',
    'Chưa có chứng nhận bảo mật, chưa có kiểm toán của bên thứ ba.',
    'Ứng dụng ví di động chưa phát hành.',
  ],
  haveTitle: 'Những gì đang có',
  haveDemos: {
    title: 'Hai bản demo chạy thật',
    body: 'Một tấm bằng do trường mẫu phát hành, xuất trình cho nhà tuyển dụng rồi bị thu hồi; và các sản phẩm có từng công đoạn được ký, kiểm tra ngay trên trình duyệt của bạn. Cả hai chạy trên máy chủ thật, bằng mật mã thật.',
    link: 'Mở các bản demo',
  },
  haveRoot: {
    title: 'Chứng thư gốc được công bố',
    body: 'Mọi lần kiểm tra đều dẫn về một chứng thư gốc. Hiện đó là chứng thư gốc bản DEMO. Trang bảo mật ghi rõ những gì đã có và chưa có.',
    link: 'Đọc trang bảo mật',
  },
  haveWallet: {
    title: 'Ứng dụng ví đang thử nghiệm nội bộ',
    body: 'Ví di động đã xây và qua kiểm thử nhưng chưa chạy trên điện thoại thật. Các bản demo dùng ví thử trên trình duyệt, chạy cùng thư viện với ứng dụng.',
    link: 'Thử demo từng bước',
  },
  nextTitle: 'Bước tiếp theo: thí điểm với một trường và một nhà tuyển dụng',
  nextBody: 'Bước tiếp theo là phát hành bằng thật với một trường và kiểm tra bằng đó với một nhà tuyển dụng. Nếu bạn muốn tham gia, hãy cho chúng tôi biết.',
  nextCta: 'Liên hệ với chúng tôi',
};

export const ABOUT_TRANSLATIONS = { en, es, ja, de, vi } as const;
