/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface IdentraRootCertificateSectionCopy {
  title: string;
  purpose: string;
  howToCheck: string;
  demoNote: string;
  currentLabel: string;
  nextLabel: string;
  rolloverNote: string;
  fingerprintLabel: string;
  download: string;
  copy: string;
  copied: string;
  notConfiguredTitle: string;
  notConfiguredBody: string;
}

export const IDENTRA_ROOT_CERTIFICATE_SECTION_TRANSLATIONS = {
  en: {
    title: 'Identra root certificate',
    purpose: 'Every diploma and document in the Identra system traces back to this root certificate. The Identra wallet and verification pages use it to tell whether an issuer is really backed by Identra.',
    howToCheck: 'To check for yourself, compare the fingerprint below with the certificate you are using: if a single character differs, it is not Identra\'s certificate.',
    demoNote: 'The current root certificate is for the Identra demo.',
    currentLabel: 'Current root certificate',
    nextLabel: 'Next root certificate',
    rolloverNote: 'Identra is moving to a new root certificate. Until the move is complete, both are valid.',
    fingerprintLabel: 'SHA-256 fingerprint',
    download: 'Download the certificate (.pem)',
    copy: 'Copy fingerprint',
    copied: 'Fingerprint copied',
    notConfiguredTitle: 'Not configured',
    notConfiguredBody: 'This build does not contain the root certificate yet, so there is no fingerprint to publish.',
  },
  es: {
    title: 'Certificado raíz de Identra',
    purpose: 'Cada título y documento del sistema Identra se remonta a este certificado raíz. La billetera Identra y las páginas de verificación lo usan para saber si un emisor está realmente respaldado por Identra.',
    howToCheck: 'Para comprobarlo usted mismo, compare la huella de abajo con el certificado que está usando: si difiere un solo carácter, no es el certificado de Identra.',
    demoNote: 'El certificado raíz actual es el de la demostración de Identra.',
    currentLabel: 'Certificado raíz actual',
    nextLabel: 'Próximo certificado raíz',
    rolloverNote: 'Identra está cambiando a un nuevo certificado raíz. Hasta que termine el cambio, ambos son válidos.',
    fingerprintLabel: 'Huella SHA-256',
    download: 'Descargar el certificado (.pem)',
    copy: 'Copiar huella',
    copied: 'Huella copiada',
    notConfiguredTitle: 'Sin configurar',
    notConfiguredBody: 'Esta compilación aún no contiene el certificado raíz, así que no hay ninguna huella que publicar.',
  },
  ja: {
    title: 'Identra ルート証明書',
    purpose: 'Identra システムの卒業証書や書類はすべて、このルート証明書にたどり着きます。Identra ウォレットと確認ページは、発行元が本当に Identra の保証を受けているかをこれで判断します。',
    howToCheck: 'ご自身で確認するには、下のフィンガープリントをお使いの証明書と比べてください。1 文字でも違えば Identra の証明書ではありません。',
    demoNote: '現在のルート証明書は Identra のデモ用です。',
    currentLabel: '現在のルート証明書',
    nextLabel: '次のルート証明書',
    rolloverNote: 'Identra は新しいルート証明書へ移行中です。移行が終わるまでは両方が有効です。',
    fingerprintLabel: 'SHA-256 フィンガープリント',
    download: '証明書をダウンロード（.pem）',
    copy: 'フィンガープリントをコピー',
    copied: 'フィンガープリントをコピーしました',
    notConfiguredTitle: '未設定',
    notConfiguredBody: 'このビルドにはまだルート証明書が含まれていないため、公開するフィンガープリントはありません。',
  },
  de: {
    title: 'Identra-Stammzertifikat',
    purpose: 'Jedes Zeugnis und Dokument im Identra-System lässt sich auf dieses Stammzertifikat zurückführen. Die Identra-Wallet und die Prüfseiten erkennen damit, ob ein Aussteller wirklich von Identra gestützt wird.',
    howToCheck: 'Zum Selbstprüfen vergleichen Sie den Fingerabdruck unten mit dem Zertifikat, das Sie verwenden: Weicht auch nur ein Zeichen ab, ist es nicht das Zertifikat von Identra.',
    demoNote: 'Das aktuelle Stammzertifikat gilt für die Identra-Demo.',
    currentLabel: 'Aktuelles Stammzertifikat',
    nextLabel: 'Nächstes Stammzertifikat',
    rolloverNote: 'Identra wechselt zu einem neuen Stammzertifikat. Bis der Wechsel abgeschlossen ist, sind beide gültig.',
    fingerprintLabel: 'SHA-256-Fingerabdruck',
    download: 'Zertifikat herunterladen (.pem)',
    copy: 'Fingerabdruck kopieren',
    copied: 'Fingerabdruck kopiert',
    notConfiguredTitle: 'Nicht konfiguriert',
    notConfiguredBody: 'Dieser Build enthält das Stammzertifikat noch nicht, daher gibt es keinen Fingerabdruck zu veröffentlichen.',
  },
  vi: {
    title: 'Chứng thư gốc của Identra',
    purpose: 'Mọi bằng cấp và giấy tờ trong hệ thống Identra đều truy về chứng thư gốc này. Ví Identra và các trang kiểm tra dùng nó để biết một nơi cấp có thật sự được Identra bảo lãnh hay không.',
    howToCheck: 'Muốn tự kiểm tra, hãy so dấu vân tay dưới đây với chứng thư bạn đang dùng: chỉ cần khác một ký tự là không phải chứng thư của Identra.',
    demoNote: 'Chứng thư gốc hiện tại dùng cho bản demo của Identra.',
    currentLabel: 'Chứng thư gốc hiện tại',
    nextLabel: 'Chứng thư gốc kế tiếp',
    rolloverNote: 'Identra đang chuyển sang chứng thư gốc mới. Cho đến khi chuyển xong, cả hai chứng thư đều hợp lệ.',
    fingerprintLabel: 'Dấu vân tay SHA-256',
    download: 'Tải chứng thư (.pem)',
    copy: 'Sao chép dấu vân tay',
    copied: 'Đã sao chép dấu vân tay',
    notConfiguredTitle: 'Chưa cấu hình',
    notConfiguredBody: 'Bản dựng này chưa có chứng thư gốc nên chưa có dấu vân tay để công bố.',
  },
} as const satisfies Record<'en' | 'es' | 'ja' | 'de' | 'vi', IdentraRootCertificateSectionCopy>;
