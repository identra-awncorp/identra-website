import type { LocalizedDocsContent } from '../../components/docs/docsModel';

const createInquiryCode = `const response = await fetch('https://api.withidentra.com/v1/inquiries', {
  method: 'POST',
  headers: {
    Authorization: \`Bearer \${process.env.IDENTRA_API_KEY}\`,
    'Content-Type': 'application/json',
    'Identra-Version': '2025-12-08',
    'Idempotency-Key': \`onboarding-\${customerId}\`
  },
  body: JSON.stringify({
    data: {
      attributes: {
        template_id: 'itmpl_example',
        reference_id: customerId,
        redirect_uri: 'https://app.example.com/verification/complete'
      }
    }
  })
});

if (!response.ok) throw new Error(\`Identra request failed: \${response.status}\`);
const { data: inquiry } = await response.json();`;

const inquiryResponseCode = `{
  "data": {
    "id": "inq_01JEXAMPLE",
    "type": "inquiry",
    "attributes": {
      "status": "created",
      "reference_id": "customer_12345",
      "session_token": "inqs_01JEXAMPLE",
      "expires_at": "2026-07-19T12:30:00Z"
    }
  }
}`;

export const INQUIRIES_DOCS_TRANSLATIONS = {
  en: {
    title: 'Inquiries',
    category: 'sending',
    sections: [
      {
        id: 'inquiry-concepts',
        title: 'Inquiry concepts',
        blocks: [
          { type: 'p', text: 'An Inquiry represents one verification attempt for one person. It connects the selected template, the client session, collected evidence, verification checks, and final decision under a single resource ID.' },
          { type: 'cards', cards: [
            { title: 'Template', text: 'Defines which checks run and when manual review or fallback steps are required.' },
            { title: 'Reference ID', text: 'Your stable, non-sensitive identifier for joining the Inquiry to an internal customer or case.' },
            { title: 'Session token', text: 'A short-lived client credential used only to launch the verification experience.' },
            { title: 'Decision', text: 'The resulting approval, decline, or review outcome after all required checks finish.' }
          ] },
          { type: 'callout', text: 'Create a new Inquiry for each verification attempt. Do not reuse a completed, expired, or declined Inquiry.' }
        ]
      },
      {
        id: 'create-an-inquiry',
        title: 'Create an Inquiry',
        blocks: [
          { type: 'p', text: 'Create Inquiries from your backend after authenticating the user and validating the business action. An idempotency key prevents duplicate sessions when a request is retried.' },
          { type: 'code', language: 'javascript', fileName: 'createInquiry.js', code: createInquiryCode },
          { type: 'p', text: 'Store the Inquiry ID with your internal case. Return only the session token and expiry time to the client that will open the Identra flow.' },
          { type: 'code', language: 'json', fileName: 'inquiry.json', code: inquiryResponseCode }
        ]
      },
      {
        id: 'inquiry-lifecycle',
        title: 'Inquiry lifecycle',
        blocks: [
          { type: 'p', text: 'Status changes are asynchronous. Treat webhook events as signals to fetch the current Inquiry rather than as the complete source of truth.' },
          { type: 'table', headers: ['Status', 'Meaning', 'Recommended action'], rows: [
            ['created', 'Session exists but has not started', 'Present the flow before the token expires'],
            ['pending', 'The user is completing required steps', 'Wait; do not create another Inquiry'],
            ['submitted', 'Evidence has been sent for evaluation', 'Show a processing state'],
            ['completed', 'A final decision is available', 'Fetch checks and apply your policy'],
            ['needs_review', 'Automated checks require human review', 'Restrict the action until review finishes'],
            ['expired', 'The session token is no longer valid', 'Create a new Inquiry if verification is still needed']
          ] }
        ]
      },
      {
        id: 'decision-handling',
        title: 'Handle results safely',
        blocks: [
          { type: 'p', text: 'Verify the webhook signature, acknowledge delivery quickly, and process the event in a background job. Fetch the Inquiry again before granting access because events may be duplicated or delivered out of order.' },
          { type: 'list', items: [
            { title: 'Approved', text: 'Confirm the required checks passed, record the policy version, and continue the user journey.' },
            { title: 'Declined', text: 'Apply a neutral user message and avoid exposing detailed fraud or risk signals.' },
            { title: 'Needs review', text: 'Keep the protected action pending and route the case to an authorized reviewer.' },
            { title: 'Abandoned', text: 'Allow the user to resume while the token is valid or create a fresh Inquiry after expiry.' }
          ] }
        ]
      },
      {
        id: 'inquiry-production-checklist',
        title: 'Production checklist',
        blocks: [
          { type: 'list', items: [
            { title: 'References', text: 'Use opaque internal IDs instead of email addresses, phone numbers, or names.' },
            { title: 'Retries', text: 'Retry network and 5xx failures with exponential backoff; do not retry validation errors unchanged.' },
            { title: 'Expiry', text: 'Display token expiry gracefully and create a new Inquiry only after the previous one can no longer be used.' },
            { title: 'Audit', text: 'Record resource IDs, timestamps, decision reasons, and policy versions without logging raw identity evidence.' }
          ] }
        ]
      }
    ]
  },
  es: {
    title: 'Solicitudes de verificación',
    category: 'sending',
    sections: [
      {
        id: 'inquiry-concepts',
        title: 'Conceptos de la solicitud',
        blocks: [
          { type: 'p', text: 'Un Inquiry representa un intento de verificación para una persona. Reúne la plantilla, la sesión del cliente, las pruebas recopiladas, las comprobaciones y la decisión final bajo un único ID.' },
          { type: 'cards', cards: [
            { title: 'Plantilla', text: 'Define las comprobaciones y cuándo se requiere revisión manual o un paso alternativo.' },
            { title: 'ID de referencia', text: 'Identificador interno estable y no sensible que vincula el Inquiry con un cliente o caso.' },
            { title: 'Token de sesión', text: 'Credencial temporal para iniciar la experiencia de verificación en el cliente.' },
            { title: 'Decisión', text: 'Resultado de aprobación, rechazo o revisión cuando terminan las comprobaciones obligatorias.' }
          ] },
          { type: 'callout', text: 'Crea un Inquiry nuevo para cada intento. No reutilices uno completado, vencido o rechazado.' }
        ]
      },
      {
        id: 'create-an-inquiry',
        title: 'Crear una solicitud',
        blocks: [
          { type: 'p', text: 'Crea el Inquiry desde el backend después de autenticar al usuario y validar la acción. Una clave de idempotencia evita sesiones duplicadas cuando se reintenta la solicitud.' },
          { type: 'code', language: 'javascript', fileName: 'createInquiry.js', code: createInquiryCode },
          { type: 'p', text: 'Guarda el ID del Inquiry con el caso interno. Devuelve al cliente únicamente el token de sesión y su caducidad.' },
          { type: 'code', language: 'json', fileName: 'inquiry.json', code: inquiryResponseCode }
        ]
      },
      {
        id: 'inquiry-lifecycle',
        title: 'Ciclo de vida de la solicitud',
        blocks: [
          { type: 'p', text: 'Los estados cambian de forma asíncrona. Usa los webhooks como aviso para consultar el Inquiry actual, no como única fuente de información.' },
          { type: 'table', headers: ['Estado', 'Significado', 'Acción recomendada'], rows: [
            ['created', 'La sesión existe, pero no comenzó', 'Muestra el flujo antes de que venza el token'],
            ['pending', 'El usuario completa los pasos', 'Espera; no crees otro Inquiry'],
            ['submitted', 'Las pruebas se enviaron para evaluación', 'Muestra un estado de procesamiento'],
            ['completed', 'Hay una decisión final', 'Consulta las comprobaciones y aplica tu política'],
            ['needs_review', 'Se requiere revisión humana', 'Restringe la acción hasta terminar la revisión'],
            ['expired', 'El token ya no es válido', 'Crea un Inquiry nuevo si aún hace falta verificar']
          ] }
        ]
      },
      {
        id: 'decision-handling',
        title: 'Procesar resultados de forma segura',
        blocks: [
          { type: 'p', text: 'Verifica la firma del webhook, confirma la recepción enseguida y procesa el evento en segundo plano. Consulta de nuevo el Inquiry antes de conceder acceso porque los eventos pueden duplicarse o llegar desordenados.' },
          { type: 'list', items: [
            { title: 'Aprobado', text: 'Confirma las comprobaciones necesarias, registra la versión de política y continúa el recorrido.' },
            { title: 'Rechazado', text: 'Muestra un mensaje neutral sin revelar señales detalladas de fraude o riesgo.' },
            { title: 'Revisión necesaria', text: 'Mantén la acción protegida en espera y envía el caso a un revisor autorizado.' },
            { title: 'Abandonado', text: 'Permite reanudar mientras el token sea válido o crea un Inquiry nuevo después de su caducidad.' }
          ] }
        ]
      },
      {
        id: 'inquiry-production-checklist',
        title: 'Lista de producción',
        blocks: [
          { type: 'list', items: [
            { title: 'Referencias', text: 'Usa ID internos opacos, no correos, teléfonos ni nombres.' },
            { title: 'Reintentos', text: 'Reintenta fallos de red y 5xx con espera exponencial; no repitas errores de validación sin corregirlos.' },
            { title: 'Caducidad', text: 'Gestiona el vencimiento del token y crea otro Inquiry solo cuando el anterior ya no pueda usarse.' },
            { title: 'Auditoría', text: 'Registra ID, fechas, motivos y versiones de política sin guardar pruebas de identidad en bruto.' }
          ] }
        ]
      }
    ]
  },
  ja: {
    title: '照会',
    category: 'sending',
    sections: [
      {
        id: 'inquiry-concepts',
        title: '照会の基本概念',
        blocks: [
          { type: 'p', text: 'Inquiryは、1人に対する1回の検証試行を表します。テンプレート、クライアントセッション、収集した証拠、確認結果、最終判定を1つのリソースIDで管理します。' },
          { type: 'cards', cards: [
            { title: 'テンプレート', text: '実行するチェックと、手動審査や代替手順が必要になる条件を定義します。' },
            { title: '参照ID', text: 'Inquiryを社内の顧客や案件へ関連付ける、機密性のない安定したIDです。' },
            { title: 'セッショントークン', text: 'クライアントで検証画面を開始するための短期間有効な認証情報です。' },
            { title: '判定', text: '必須チェック完了後の承認、否認、審査待ちの結果です。' }
          ] },
          { type: 'callout', text: '検証を試行するたびに新しいInquiryを作成し、完了済み、期限切れ、否認済みのInquiryは再利用しないでください。' }
        ]
      },
      {
        id: 'create-an-inquiry',
        title: '照会を作成する',
        blocks: [
          { type: 'p', text: 'ユーザー認証と業務操作の検証後、バックエンドからInquiryを作成します。冪等キーを指定すると、リクエスト再試行時の重複セッションを防げます。' },
          { type: 'code', language: 'javascript', fileName: 'createInquiry.js', code: createInquiryCode },
          { type: 'p', text: 'Inquiry IDは社内案件とともに保存し、Identraを開くクライアントにはセッショントークンと有効期限だけを返します。' },
          { type: 'code', language: 'json', fileName: 'inquiry.json', code: inquiryResponseCode }
        ]
      },
      {
        id: 'inquiry-lifecycle',
        title: '照会のライフサイクル',
        blocks: [
          { type: 'p', text: '状態は非同期で変化します。Webhookイベントは最新のInquiryを取得するための通知として扱い、完全な情報源にはしないでください。' },
          { type: 'table', headers: ['状態', '意味', '推奨対応'], rows: [
            ['created', 'セッションは作成済みで未開始', 'トークン期限前にフローを表示'],
            ['pending', 'ユーザーが手順を実行中', '待機し、別のInquiryは作らない'],
            ['submitted', '証拠を評価へ送信済み', '処理中画面を表示'],
            ['completed', '最終判定が利用可能', 'チェックを取得して方針を適用'],
            ['needs_review', '手動審査が必要', '審査完了まで対象操作を制限'],
            ['expired', 'セッショントークンが無効', '必要であれば新しいInquiryを作成']
          ] }
        ]
      },
      {
        id: 'decision-handling',
        title: '結果を安全に処理する',
        blocks: [
          { type: 'p', text: 'Webhook署名を検証し、受信応答はすぐに返して、イベント処理をバックグラウンドで行います。重複や順序の入れ替わりに備え、アクセス許可前にInquiryを再取得してください。' },
          { type: 'list', items: [
            { title: '承認', text: '必須チェックの合格を確認し、適用したポリシーバージョンを記録して処理を続けます。' },
            { title: '否認', text: '不正やリスクの詳細を公開せず、中立的なメッセージを表示します。' },
            { title: '審査待ち', text: '保護対象の操作を保留し、権限を持つ担当者へケースを送ります。' },
            { title: '中断', text: 'トークンの有効期間中は再開を許可し、期限後は新しいInquiryを作成します。' }
          ] }
        ]
      },
      {
        id: 'inquiry-production-checklist',
        title: '本番導入前の確認事項',
        blocks: [
          { type: 'list', items: [
            { title: '参照値', text: 'メールアドレス、電話番号、氏名ではなく、不透明な社内IDを使います。' },
            { title: '再試行', text: 'ネットワーク障害と5xxは指数バックオフで再試行し、検証エラーは修正せずに再送しません。' },
            { title: '有効期限', text: 'トークンの期限切れを適切に案内し、以前のInquiryが使えない場合だけ新規作成します。' },
            { title: '監査', text: '生の本人確認証拠をログへ残さず、ID、時刻、判定理由、ポリシーバージョンを記録します。' }
          ] }
        ]
      }
    ]
  },
  de: {
    title: 'Prüfvorgänge',
    category: 'sending',
    sections: [
      {
        id: 'inquiry-concepts',
        title: 'Grundlagen eines Prüfvorgangs',
        blocks: [
          { type: 'p', text: 'Ein Inquiry steht für einen Verifizierungsversuch einer Person. Vorlage, Clientsitzung, Nachweise, Prüfergebnisse und endgültige Entscheidung werden unter einer Ressourcen-ID zusammengeführt.' },
          { type: 'cards', cards: [
            { title: 'Vorlage', text: 'Legt Prüfungen und Bedingungen für manuelle Überprüfungen oder alternative Schritte fest.' },
            { title: 'Referenz-ID', text: 'Stabile, nicht sensible Kennung zur Verknüpfung mit einem internen Kunden oder Fall.' },
            { title: 'Sitzungstoken', text: 'Kurzlebige Client-Berechtigung zum Starten des Verifizierungsablaufs.' },
            { title: 'Entscheidung', text: 'Ergebnis als Freigabe, Ablehnung oder Überprüfung nach Abschluss aller Pflichtprüfungen.' }
          ] },
          { type: 'callout', text: 'Erstellen Sie für jeden Versuch ein neues Inquiry. Abgeschlossene, abgelaufene oder abgelehnte Inquiries dürfen nicht wiederverwendet werden.' }
        ]
      },
      {
        id: 'create-an-inquiry',
        title: 'Prüfvorgang erstellen',
        blocks: [
          { type: 'p', text: 'Erstellen Sie das Inquiry im Backend, nachdem Nutzer und Geschäftsvorgang geprüft wurden. Ein Idempotenzschlüssel verhindert doppelte Sitzungen bei wiederholten Anfragen.' },
          { type: 'code', language: 'javascript', fileName: 'createInquiry.js', code: createInquiryCode },
          { type: 'p', text: 'Speichern Sie die Inquiry-ID am internen Fall. An den Client gehen nur Sitzungstoken und Ablaufzeit.' },
          { type: 'code', language: 'json', fileName: 'inquiry.json', code: inquiryResponseCode }
        ]
      },
      {
        id: 'inquiry-lifecycle',
        title: 'Lebenszyklus eines Prüfvorgangs',
        blocks: [
          { type: 'p', text: 'Statusänderungen erfolgen asynchron. Behandeln Sie Webhooks als Signal zum erneuten Abruf des Inquiry und nicht als vollständige Datenquelle.' },
          { type: 'table', headers: ['Status', 'Bedeutung', 'Empfohlene Aktion'], rows: [
            ['created', 'Sitzung erstellt, aber nicht begonnen', 'Ablauf vor Token-Verfall anzeigen'],
            ['pending', 'Nutzer bearbeitet Pflichtschritte', 'Warten und kein weiteres Inquiry erstellen'],
            ['submitted', 'Nachweise wurden zur Prüfung gesendet', 'Verarbeitungsstatus anzeigen'],
            ['completed', 'Endgültige Entscheidung verfügbar', 'Prüfungen laden und Richtlinie anwenden'],
            ['needs_review', 'Manuelle Überprüfung erforderlich', 'Vorgang bis zum Abschluss einschränken'],
            ['expired', 'Sitzungstoken ungültig', 'Bei weiterem Bedarf neues Inquiry erstellen']
          ] }
        ]
      },
      {
        id: 'decision-handling',
        title: 'Ergebnisse sicher verarbeiten',
        blocks: [
          { type: 'p', text: 'Prüfen Sie die Webhook-Signatur, bestätigen Sie den Empfang schnell und verarbeiten Sie das Ereignis im Hintergrund. Laden Sie das Inquiry vor einer Freigabe erneut, da Ereignisse doppelt oder in anderer Reihenfolge eintreffen können.' },
          { type: 'list', items: [
            { title: 'Freigegeben', text: 'Pflichtprüfungen bestätigen, Richtlinienversion protokollieren und Nutzerprozess fortsetzen.' },
            { title: 'Abgelehnt', text: 'Neutrale Meldung anzeigen und keine detaillierten Betrugs- oder Risikosignale offenlegen.' },
            { title: 'Überprüfung erforderlich', text: 'Geschützten Vorgang offenhalten und den Fall an berechtigte Prüfer weitergeben.' },
            { title: 'Abgebrochen', text: 'Fortsetzung bei gültigem Token erlauben oder nach Ablauf ein neues Inquiry erstellen.' }
          ] }
        ]
      },
      {
        id: 'inquiry-production-checklist',
        title: 'Prüfliste für den Produktivbetrieb',
        blocks: [
          { type: 'list', items: [
            { title: 'Referenzen', text: 'Undurchsichtige interne IDs statt E-Mail-Adressen, Telefonnummern oder Namen verwenden.' },
            { title: 'Wiederholungen', text: 'Netzwerk- und 5xx-Fehler exponentiell wiederholen; Validierungsfehler zuerst korrigieren.' },
            { title: 'Ablauf', text: 'Token-Verfall verständlich behandeln und erst danach ein neues Inquiry erstellen.' },
            { title: 'Prüfprotokoll', text: 'IDs, Zeitpunkte, Gründe und Richtlinienversionen erfassen, aber keine rohen Identitätsnachweise protokollieren.' }
          ] }
        ]
      }
    ]
  },
  vi: {
    title: 'Hồ sơ xác minh',
    category: 'sending',
    sections: [
      {
        id: 'inquiry-concepts',
        title: 'Khái niệm về hồ sơ xác minh',
        blocks: [
          { type: 'p', text: 'Một Inquiry đại diện cho một lần xác minh của một người. Tài nguyên này liên kết mẫu cấu hình, phiên phía người dùng, bằng chứng đã thu thập, kết quả kiểm tra và quyết định cuối cùng dưới cùng một ID.' },
          { type: 'cards', cards: [
            { title: 'Mẫu cấu hình', text: 'Xác định những bước kiểm tra cần chạy và khi nào phải đánh giá thủ công hoặc dùng phương án dự phòng.' },
            { title: 'Mã tham chiếu', text: 'Mã nội bộ ổn định, không nhạy cảm, dùng để liên kết Inquiry với khách hàng hoặc hồ sơ.' },
            { title: 'Mã phiên', text: 'Thông tin xác thực có thời hạn ngắn, chỉ dùng để mở trải nghiệm xác minh trên thiết bị người dùng.' },
            { title: 'Quyết định', text: 'Kết quả phê duyệt, từ chối hoặc chờ đánh giá sau khi hoàn tất các bước bắt buộc.' }
          ] },
          { type: 'callout', text: 'Tạo một Inquiry mới cho mỗi lần xác minh. Không dùng lại Inquiry đã hoàn tất, hết hạn hoặc bị từ chối.' }
        ]
      },
      {
        id: 'create-an-inquiry',
        title: 'Tạo hồ sơ xác minh',
        blocks: [
          { type: 'p', text: 'Tạo Inquiry từ máy chủ sau khi đã xác thực người dùng và kiểm tra hành động nghiệp vụ. Khóa lũy đẳng giúp tránh tạo trùng phiên khi yêu cầu được gửi lại.' },
          { type: 'code', language: 'javascript', fileName: 'createInquiry.js', code: createInquiryCode },
          { type: 'p', text: 'Lưu ID Inquiry cùng hồ sơ nội bộ. Chỉ trả mã phiên và thời điểm hết hạn cho thiết bị sẽ mở luồng Identra.' },
          { type: 'code', language: 'json', fileName: 'inquiry.json', code: inquiryResponseCode }
        ]
      },
      {
        id: 'inquiry-lifecycle',
        title: 'Vòng đời của hồ sơ xác minh',
        blocks: [
          { type: 'p', text: 'Trạng thái thay đổi bất đồng bộ. Hãy xem sự kiện webhook là tín hiệu để lấy Inquiry mới nhất, không phải nguồn dữ liệu đầy đủ duy nhất.' },
          { type: 'table', headers: ['Trạng thái', 'Ý nghĩa', 'Cách xử lý'], rows: [
            ['created', 'Phiên đã tồn tại nhưng chưa bắt đầu', 'Hiển thị luồng trước khi mã phiên hết hạn'],
            ['pending', 'Người dùng đang hoàn tất các bước', 'Chờ và không tạo thêm Inquiry'],
            ['submitted', 'Bằng chứng đã được gửi để đánh giá', 'Hiển thị trạng thái đang xử lý'],
            ['completed', 'Đã có quyết định cuối cùng', 'Lấy kết quả kiểm tra và áp dụng chính sách'],
            ['needs_review', 'Cần chuyên viên đánh giá', 'Tạm giữ hành động cho đến khi đánh giá xong'],
            ['expired', 'Mã phiên không còn hiệu lực', 'Tạo Inquiry mới nếu vẫn cần xác minh']
          ] }
        ]
      },
      {
        id: 'decision-handling',
        title: 'Xử lý kết quả an toàn',
        blocks: [
          { type: 'p', text: 'Xác minh chữ ký webhook, phản hồi tiếp nhận nhanh và xử lý sự kiện trong tác vụ nền. Luôn lấy lại Inquiry trước khi cấp quyền vì sự kiện có thể bị gửi trùng hoặc đến không đúng thứ tự.' },
          { type: 'list', items: [
            { title: 'Được phê duyệt', text: 'Xác nhận các bước bắt buộc đã đạt, lưu phiên bản chính sách rồi tiếp tục hành trình người dùng.' },
            { title: 'Bị từ chối', text: 'Dùng thông báo trung lập và không tiết lộ tín hiệu gian lận hoặc rủi ro chi tiết.' },
            { title: 'Cần đánh giá', text: 'Giữ hành động được bảo vệ ở trạng thái chờ và chuyển hồ sơ cho người có thẩm quyền.' },
            { title: 'Bị gián đoạn', text: 'Cho phép tiếp tục khi mã phiên còn hạn hoặc tạo Inquiry mới sau khi hết hạn.' }
          ] }
        ]
      },
      {
        id: 'inquiry-production-checklist',
        title: 'Danh sách kiểm tra trước khi vận hành chính thức',
        blocks: [
          { type: 'list', items: [
            { title: 'Mã tham chiếu', text: 'Dùng ID nội bộ khó đoán thay cho email, số điện thoại hoặc tên.' },
            { title: 'Gửi lại yêu cầu', text: 'Thử lại lỗi mạng và lỗi 5xx theo thời gian chờ tăng dần; không gửi lại lỗi xác thực khi chưa sửa dữ liệu.' },
            { title: 'Hết hạn', text: 'Thông báo hợp lý khi mã phiên hết hạn và chỉ tạo Inquiry mới khi phiên cũ không còn dùng được.' },
            { title: 'Kiểm toán', text: 'Lưu ID, thời gian, lý do quyết định và phiên bản chính sách nhưng không ghi bằng chứng danh tính thô vào nhật ký.' }
          ] }
        ]
      }
    ]
  }
} satisfies LocalizedDocsContent;
