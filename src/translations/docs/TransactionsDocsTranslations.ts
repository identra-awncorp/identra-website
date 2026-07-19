import type { LocalizedDocsContent } from '../../components/docs/docsModel';

const createTransactionCode = `const transaction = await fetch('https://api.withidentra.com/v1/transactions', {
  method: 'POST',
  headers: {
    Authorization: \`Bearer \${process.env.IDENTRA_API_KEY}\`,
    'Content-Type': 'application/json',
    'Identra-Version': '2025-12-08',
    'Idempotency-Key': order.id
  },
  body: JSON.stringify({
    data: {
      attributes: {
        reference_id: order.id,
        type: 'card_payment',
        amount: 12900,
        currency: 'USD',
        account_id: customer.id,
        occurred_at: new Date().toISOString(),
        signals: {
          ip_address: request.ip,
          device_id: request.deviceId
        }
      }
    }
  })
}).then(response => response.json());`;

export const TRANSACTIONS_DOCS_TRANSLATIONS = {
  en: {
    title: 'Transactions',
    category: 'sending',
    sections: [
      {
        id: 'transaction-overview',
        title: 'Transaction monitoring overview',
        blocks: [
          { type: 'p', text: 'A Transaction records a meaningful account or money movement event. Identra evaluates the event with identity, device, network, behavioral, and historical context to help your policy decide whether to allow, challenge, review, or block it.' },
          { type: 'cards', cards: [
            { title: 'Payments', text: 'Card payments, wallet transfers, payouts, deposits, and withdrawals.' },
            { title: 'Account events', text: 'Login, password reset, beneficiary changes, and account recovery.' },
            { title: 'Marketplace activity', text: 'Orders, listings, refunds, and seller disbursements.' },
            { title: 'Custom events', text: 'Business-specific actions represented by a stable transaction type.' }
          ] }
        ]
      },
      {
        id: 'transaction-schema',
        title: 'Design the event schema',
        blocks: [
          { type: 'p', text: 'Send facts available at decision time. Keep field meaning stable so rules and models can compare behavior over time.' },
          { type: 'table', headers: ['Field', 'Required', 'Guidance'], rows: [
            ['reference_id', 'Yes', 'Unique internal event or order ID'],
            ['type', 'Yes', 'Stable snake_case business event name'],
            ['occurred_at', 'Yes', 'UTC timestamp when the event occurred'],
            ['amount / currency', 'For money movement', 'Integer minor units and ISO 4217 currency'],
            ['account_id', 'Recommended', 'Opaque internal account reference'],
            ['signals', 'Recommended', 'Device, network, location, and session context']
          ] },
          { type: 'callout', text: 'Do not send full card numbers, security codes, passwords, authentication tokens, or unneeded identity documents.' }
        ]
      },
      {
        id: 'send-transaction',
        title: 'Send a Transaction',
        blocks: [
          { type: 'p', text: 'Create the Transaction from the trusted service that owns the business event. Use the same idempotency key when retrying the same event.' },
          { type: 'code', language: 'javascript', fileName: 'createTransaction.js', code: createTransactionCode },
          { type: 'p', text: 'For synchronous policies, use the returned recommendation as one input to your own authorization decision. For asynchronous policies, keep the action pending until the corresponding webhook is processed.' }
        ]
      },
      {
        id: 'transaction-decisions',
        title: 'Interpret recommendations',
        blocks: [
          { type: 'table', headers: ['Recommendation', 'Typical meaning', 'Suggested handling'], rows: [
            ['allow', 'No material risk detected', 'Continue and record the decision'],
            ['challenge', 'Additional assurance is useful', 'Request step-up verification'],
            ['review', 'Signals conflict or exceed a threshold', 'Queue for an authorized analyst'],
            ['block', 'Strong policy or fraud match', 'Stop the action and protect the account']
          ] },
          { type: 'p', text: 'Recommendations support your policy; they do not replace legal, compliance, or business rules. Version your decision logic and preserve the inputs used for each outcome.' }
        ]
      },
      {
        id: 'transaction-operations',
        title: 'Operational guidance',
        blocks: [
          { type: 'list', items: [
            { title: 'Ordering', text: 'Use occurred_at for event time and do not assume webhooks arrive in creation order.' },
            { title: 'Updates', text: 'Send outcome updates such as settled, refunded, or confirmed_fraud to improve historical context.' },
            { title: 'Latency', text: 'Set a timeout that protects checkout or login and define a documented fallback when Identra is unavailable.' },
            { title: 'Monitoring', text: 'Track request volume, latency, recommendation mix, review backlog, and confirmed fraud rate.' }
          ] }
        ]
      }
    ]
  },
  es: {
    title: 'Transacciones',
    category: 'sending',
    sections: [
      {
        id: 'transaction-overview',
        title: 'Descripción del monitoreo',
        blocks: [
          { type: 'p', text: 'Una Transacción registra un movimiento de dinero o un evento relevante de cuenta. Identra lo evalúa con contexto de identidad, dispositivo, red, comportamiento e historial para que tu política decida si permite, desafía, revisa o bloquea la acción.' },
          { type: 'cards', cards: [
            { title: 'Pagos', text: 'Pagos con tarjeta, transferencias, desembolsos, depósitos y retiros.' },
            { title: 'Eventos de cuenta', text: 'Inicio de sesión, cambio de contraseña, beneficiarios y recuperación.' },
            { title: 'Marketplaces', text: 'Pedidos, publicaciones, reembolsos y pagos a vendedores.' },
            { title: 'Eventos propios', text: 'Acciones específicas del negocio con un tipo de transacción estable.' }
          ] }
        ]
      },
      {
        id: 'transaction-schema',
        title: 'Diseñar el esquema del evento',
        blocks: [
          { type: 'p', text: 'Envía los hechos disponibles al tomar la decisión. Mantén estable el significado de los campos para poder comparar el comportamiento a lo largo del tiempo.' },
          { type: 'table', headers: ['Campo', 'Obligatorio', 'Orientación'], rows: [
            ['reference_id', 'Sí', 'ID interno único del evento o pedido'],
            ['type', 'Sí', 'Nombre estable del evento en snake_case'],
            ['occurred_at', 'Sí', 'Fecha UTC del evento'],
            ['amount / currency', 'En movimientos de dinero', 'Unidades monetarias menores y moneda ISO 4217'],
            ['account_id', 'Recomendado', 'Referencia interna opaca de la cuenta'],
            ['signals', 'Recomendado', 'Contexto de dispositivo, red, ubicación y sesión']
          ] },
          { type: 'callout', text: 'No envíes números completos de tarjeta, códigos de seguridad, contraseñas, tokens de autenticación ni documentos innecesarios.' }
        ]
      },
      {
        id: 'send-transaction',
        title: 'Enviar una Transacción',
        blocks: [
          { type: 'p', text: 'Crea la Transacción desde el servicio de confianza que controla el evento. Usa la misma clave de idempotencia al reintentar el mismo evento.' },
          { type: 'code', language: 'javascript', fileName: 'createTransaction.js', code: createTransactionCode },
          { type: 'p', text: 'En políticas síncronas, toma la recomendación como una entrada de tu decisión. En políticas asíncronas, mantén la acción pendiente hasta procesar el webhook.' }
        ]
      },
      {
        id: 'transaction-decisions',
        title: 'Interpretar recomendaciones',
        blocks: [
          { type: 'table', headers: ['Recomendación', 'Significado habitual', 'Tratamiento sugerido'], rows: [
            ['allow', 'Sin riesgo relevante', 'Continuar y registrar la decisión'],
            ['challenge', 'Conviene una garantía adicional', 'Solicitar verificación reforzada'],
            ['review', 'Señales contradictorias o sobre el umbral', 'Enviar a un analista autorizado'],
            ['block', 'Coincidencia fuerte de política o fraude', 'Detener la acción y proteger la cuenta']
          ] },
          { type: 'p', text: 'Las recomendaciones apoyan tu política, pero no sustituyen reglas legales, de cumplimiento o negocio. Versiona la lógica y conserva las entradas de cada resultado.' }
        ]
      },
      {
        id: 'transaction-operations',
        title: 'Orientación operativa',
        blocks: [
          { type: 'list', items: [
            { title: 'Orden', text: 'Usa occurred_at como hora del evento y no supongas que los webhooks llegan en orden.' },
            { title: 'Actualizaciones', text: 'Envía resultados como settled, refunded o confirmed_fraud para mejorar el historial.' },
            { title: 'Latencia', text: 'Define un tiempo límite y una alternativa documentada cuando Identra no esté disponible.' },
            { title: 'Monitoreo', text: 'Controla volumen, latencia, recomendaciones, cola de revisión y fraude confirmado.' }
          ] }
        ]
      }
    ]
  },
  ja: {
    title: '取引',
    category: 'sending',
    sections: [
      {
        id: 'transaction-overview',
        title: '取引モニタリング概要',
        blocks: [
          { type: 'p', text: '取引リソースは、重要なアカウント操作や資金移動を記録します。Identraは本人情報、端末、ネットワーク、行動、履歴を評価し、許可、追加確認、審査、ブロックの判断を支援します。' },
          { type: 'cards', cards: [
            { title: '支払い', text: 'カード決済、ウォレット送金、払出し、入金、出金。' },
            { title: 'アカウント操作', text: 'ログイン、パスワード変更、受取人変更、アカウント復旧。' },
            { title: 'オンライン市場', text: '注文、出品、返金、販売者への支払い。' },
            { title: '独自イベント', text: '安定した取引種別で表す業務固有の操作。' }
          ] }
        ]
      },
      {
        id: 'transaction-schema',
        title: 'イベントスキーマの設計',
        blocks: [
          { type: 'p', text: '判定時点で利用できる事実を送信します。長期的に行動を比較できるよう、各フィールドの意味を一定に保ってください。' },
          { type: 'table', headers: ['フィールド', '必須', 'ガイド'], rows: [
            ['reference_id', '必須', 'イベントまたは注文の一意な社内ID'],
            ['type', '必須', 'snake_caseの安定したイベント名'],
            ['occurred_at', '必須', 'イベント発生時のUTC時刻'],
            ['amount / currency', '資金移動時', '最小通貨単位の整数とISO 4217通貨'],
            ['account_id', '推奨', '不透明な社内アカウント参照'],
            ['signals', '推奨', '端末、ネットワーク、位置、セッション情報']
          ] },
          { type: 'callout', text: 'カード番号全体、セキュリティコード、パスワード、認証トークン、不要な本人確認書類は送信しないでください。' }
        ]
      },
      {
        id: 'send-transaction',
        title: '取引を送信する',
        blocks: [
          { type: 'p', text: '業務イベントを管理する信頼済みサービスから取引リソースを作成します。同じイベントの再試行には同じ冪等キーを使用します。' },
          { type: 'code', language: 'javascript', fileName: 'createTransaction.js', code: createTransactionCode },
          { type: 'p', text: '同期ポリシーでは返された推奨を自社判定の入力として使います。非同期ポリシーではWebhook処理まで操作を保留します。' }
        ]
      },
      {
        id: 'transaction-decisions',
        title: '推奨結果の解釈',
        blocks: [
          { type: 'table', headers: ['推奨', '一般的な意味', '推奨対応'], rows: [
            ['allow', '重要なリスクなし', '処理を続行して判定を記録'],
            ['challenge', '追加保証が有効', '追加の本人確認を要求'],
            ['review', 'シグナルが矛盾または閾値超過', '権限を持つ分析担当へ送る'],
            ['block', '強い不正またはポリシー一致', '操作を停止しアカウントを保護']
          ] },
          { type: 'p', text: '推奨結果は自社ポリシーを支援するもので、法務、コンプライアンス、業務ルールを置き換えるものではありません。判定ロジックを版管理してください。' }
        ]
      },
      {
        id: 'transaction-operations',
        title: '運用ガイド',
        blocks: [
          { type: 'list', items: [
            { title: '順序', text: 'イベント時刻にはoccurred_atを使い、Webhookが作成順に届くとは仮定しません。' },
            { title: '更新', text: 'settled、refunded、confirmed_fraudなどの結果を送り、履歴精度を高めます。' },
            { title: '遅延', text: '決済やログインを守るためのタイムアウトと、Identra停止時の代替動作を定義します。' },
            { title: '監視', text: '件数、遅延、推奨結果の比率、審査待ち件数、確認済み不正率を追跡します。' }
          ] }
        ]
      }
    ]
  },
  de: {
    title: 'Transaktionen',
    category: 'sending',
    sections: [
      {
        id: 'transaction-overview',
        title: 'Überblick zur Transaktionsüberwachung',
        blocks: [
          { type: 'p', text: 'Eine Transaktion erfasst wichtige Konto- oder Geldbewegungen. Identra bewertet Identitäts-, Geräte-, Netzwerk-, Verhaltens- und Verlaufsdaten, damit Ihre Richtlinie den Vorgang erlauben, absichern, prüfen oder blockieren kann.' },
          { type: 'cards', cards: [
            { title: 'Zahlungen', text: 'Kartenzahlungen, Überweisungen aus digitalen Brieftaschen, Auszahlungen, Einzahlungen und Abhebungen.' },
            { title: 'Kontoereignisse', text: 'Login, Passwortwechsel, neue Empfänger und Kontowiederherstellung.' },
            { title: 'Marktplätze', text: 'Bestellungen, Angebote, Erstattungen und Händlerauszahlungen.' },
            { title: 'Eigene Ereignisse', text: 'Unternehmensspezifische Aktionen mit einem stabilen Transaktionstyp.' }
          ] }
        ]
      },
      {
        id: 'transaction-schema',
        title: 'Ereignisschema entwerfen',
        blocks: [
          { type: 'p', text: 'Senden Sie die zum Entscheidungszeitpunkt verfügbaren Fakten. Halten Sie die Bedeutung der Felder stabil, damit Verhalten langfristig vergleichbar bleibt.' },
          { type: 'table', headers: ['Feld', 'Pflicht', 'Hinweis'], rows: [
            ['reference_id', 'Ja', 'Eindeutige interne Ereignis- oder Bestell-ID'],
            ['type', 'Ja', 'Stabiler Ereignisname in snake_case'],
            ['occurred_at', 'Ja', 'UTC-Zeitpunkt des Ereignisses'],
            ['amount / currency', 'Bei Geldbewegung', 'Ganzzahlige Untereinheiten und ISO-4217-Währung'],
            ['account_id', 'Empfohlen', 'Undurchsichtige interne Kontoreferenz'],
            ['signals', 'Empfohlen', 'Geräte-, Netzwerk-, Orts- und Sitzungskontext']
          ] },
          { type: 'callout', text: 'Senden Sie keine vollständigen Kartennummern, Sicherheitscodes, Passwörter, Authentifizierungstoken oder unnötigen Ausweisdokumente.' }
        ]
      },
      {
        id: 'send-transaction',
        title: 'Transaktion senden',
        blocks: [
          { type: 'p', text: 'Erstellen Sie die Transaktion im vertrauenswürdigen Dienst, der das Geschäftsereignis verwaltet. Verwenden Sie bei Wiederholungen denselben Idempotenzschlüssel.' },
          { type: 'code', language: 'javascript', fileName: 'createTransaction.js', code: createTransactionCode },
          { type: 'p', text: 'Bei synchronen Richtlinien ist die Empfehlung ein Eingangswert Ihrer Freigabeentscheidung. Bei asynchronen Richtlinien bleibt der Vorgang bis zur Webhook-Verarbeitung offen.' }
        ]
      },
      {
        id: 'transaction-decisions',
        title: 'Empfehlungen auswerten',
        blocks: [
          { type: 'table', headers: ['Empfehlung', 'Typische Bedeutung', 'Vorgehen'], rows: [
            ['allow', 'Kein wesentliches Risiko', 'Fortfahren und Entscheidung dokumentieren'],
            ['challenge', 'Zusätzliche Absicherung sinnvoll', 'Stärkere Verifizierung anfordern'],
            ['review', 'Widersprüchliche oder hohe Signale', 'An berechtigte Analysten weitergeben'],
            ['block', 'Starke Regel- oder Betrugsübereinstimmung', 'Vorgang stoppen und Konto schützen']
          ] },
          { type: 'p', text: 'Empfehlungen unterstützen Ihre Richtlinie, ersetzen aber keine rechtlichen, regulatorischen oder geschäftlichen Regeln. Versionieren Sie die Entscheidungslogik.' }
        ]
      },
      {
        id: 'transaction-operations',
        title: 'Betriebshinweise',
        blocks: [
          { type: 'list', items: [
            { title: 'Reihenfolge', text: 'Nutzen Sie occurred_at als Ereigniszeit und erwarten Sie keine geordnete Webhook-Zustellung.' },
            { title: 'Aktualisierungen', text: 'Melden Sie Ergebnisse wie settled, refunded oder confirmed_fraud für besseren Verlaufskontext.' },
            { title: 'Latenz', text: 'Definieren Sie eine Zeitüberschreitung und dokumentiertes Ersatzverhalten bei Nichterreichbarkeit.' },
            { title: 'Überwachung', text: 'Überwachen Sie Volumen, Latenz, Empfehlungsverteilung, Prüfrückstand und bestätigte Betrugsrate.' }
          ] }
        ]
      }
    ]
  },
  vi: {
    title: 'Giao dịch',
    category: 'sending',
    sections: [
      {
        id: 'transaction-overview',
        title: 'Tổng quan giám sát giao dịch',
        blocks: [
          { type: 'p', text: 'Một Giao dịch ghi nhận sự kiện quan trọng liên quan đến tài khoản hoặc dòng tiền. Identra đánh giá sự kiện dựa trên bối cảnh danh tính, thiết bị, mạng, hành vi và lịch sử để hỗ trợ chính sách quyết định cho phép, xác minh thêm, đánh giá hoặc chặn.' },
          { type: 'cards', cards: [
            { title: 'Thanh toán', text: 'Thanh toán thẻ, chuyển ví, giải ngân, nạp tiền và rút tiền.' },
            { title: 'Sự kiện tài khoản', text: 'Đăng nhập, đổi mật khẩu, thay người thụ hưởng và khôi phục tài khoản.' },
            { title: 'Sàn giao dịch', text: 'Đơn hàng, tin đăng, hoàn tiền và thanh toán cho người bán.' },
            { title: 'Sự kiện tùy chỉnh', text: 'Hành động đặc thù của doanh nghiệp được biểu diễn bằng một loại giao dịch ổn định.' }
          ] }
        ]
      },
      {
        id: 'transaction-schema',
        title: 'Thiết kế cấu trúc sự kiện',
        blocks: [
          { type: 'p', text: 'Gửi những dữ kiện có sẵn tại thời điểm ra quyết định. Giữ nguyên ý nghĩa của từng trường để quy tắc và mô hình có thể so sánh hành vi theo thời gian.' },
          { type: 'table', headers: ['Trường', 'Bắt buộc', 'Hướng dẫn'], rows: [
            ['reference_id', 'Có', 'ID sự kiện hoặc đơn hàng nội bộ duy nhất'],
            ['type', 'Có', 'Tên sự kiện nghiệp vụ ổn định dạng snake_case'],
            ['occurred_at', 'Có', 'Thời điểm sự kiện xảy ra theo UTC'],
            ['amount / currency', 'Với dòng tiền', 'Số nguyên theo đơn vị tiền nhỏ nhất và mã ISO 4217'],
            ['account_id', 'Nên có', 'Mã tham chiếu tài khoản nội bộ khó đoán'],
            ['signals', 'Nên có', 'Bối cảnh thiết bị, mạng, vị trí và phiên']
          ] },
          { type: 'callout', text: 'Không gửi đầy đủ số thẻ, mã bảo mật, mật khẩu, mã xác thực hoặc giấy tờ danh tính không cần thiết.' }
        ]
      },
      {
        id: 'send-transaction',
        title: 'Gửi một Giao dịch',
        blocks: [
          { type: 'p', text: 'Tạo Giao dịch từ dịch vụ đáng tin cậy đang sở hữu sự kiện nghiệp vụ. Dùng lại cùng khóa lũy đẳng khi gửi lại cùng một sự kiện.' },
          { type: 'code', language: 'javascript', fileName: 'createTransaction.js', code: createTransactionCode },
          { type: 'p', text: 'Với chính sách đồng bộ, dùng khuyến nghị trả về làm một đầu vào cho quyết định cấp quyền. Với chính sách bất đồng bộ, giữ hành động ở trạng thái chờ đến khi xử lý sự kiện gửi về.' }
        ]
      },
      {
        id: 'transaction-decisions',
        title: 'Diễn giải khuyến nghị',
        blocks: [
          { type: 'table', headers: ['Khuyến nghị', 'Ý nghĩa thường gặp', 'Cách xử lý'], rows: [
            ['allow', 'Không phát hiện rủi ro đáng kể', 'Tiếp tục và ghi lại quyết định'],
            ['challenge', 'Cần thêm mức đảm bảo', 'Yêu cầu bước xác minh tăng cường'],
            ['review', 'Tín hiệu mâu thuẫn hoặc vượt ngưỡng', 'Chuyển cho chuyên viên có thẩm quyền'],
            ['block', 'Khớp mạnh với quy tắc hoặc gian lận', 'Dừng hành động và bảo vệ tài khoản']
          ] },
          { type: 'p', text: 'Khuyến nghị hỗ trợ chính sách của bạn chứ không thay thế quy định pháp lý, tuân thủ hay nghiệp vụ. Hãy quản lý phiên bản logic quyết định và lưu các đầu vào của từng kết quả.' }
        ]
      },
      {
        id: 'transaction-operations',
        title: 'Hướng dẫn vận hành',
        blocks: [
          { type: 'list', items: [
            { title: 'Thứ tự', text: 'Dùng occurred_at làm thời điểm sự kiện và không giả định thông báo gửi về sẽ đến theo thứ tự tạo.' },
            { title: 'Cập nhật', text: 'Gửi kết quả như settled, refunded hoặc confirmed_fraud để cải thiện bối cảnh lịch sử.' },
            { title: 'Độ trễ', text: 'Đặt thời gian chờ phù hợp và xác định phương án dự phòng khi Identra không khả dụng.' },
            { title: 'Giám sát', text: 'Theo dõi lưu lượng, độ trễ, tỷ lệ khuyến nghị, hàng chờ đánh giá và tỷ lệ gian lận đã xác nhận.' }
          ] }
        ]
      }
    ]
  }
} satisfies LocalizedDocsContent;
