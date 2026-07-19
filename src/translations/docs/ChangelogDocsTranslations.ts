import type { LocalizedDocsContent } from '../../components/docs/docsTypes';

export const CHANGELOG_DOCS_TRANSLATIONS = {
  en: {
    title: 'Changelog',
    category: 'resources',
    sections: [
      {
        id: 'latest-releases',
        title: 'Latest releases',
        blocks: [
          { type: 'p', text: 'This sample changelog records API, SDK, dashboard, and verification-engine changes that may affect an integration. Dates refer to general availability unless an entry says otherwise.' },
          { type: 'changelog', items: [
            { version: '2026-07-15', title: 'Transaction outcome updates', text: 'Added settled, refunded, chargeback, and confirmed_fraud outcomes so historical transaction context can reflect post-authorization events.' },
            { version: '2026-06-24', title: 'Relay delivery diagnostics', text: 'Added delivery attempt timestamps, normalized failure codes, and destination-level latency metrics.' },
            { version: '2026-05-08', title: 'Inquiry session recovery', text: 'Client SDKs can now resume an interrupted Inquiry on the same device while its session token remains valid.' },
            { version: '2026-03-19', title: 'Webhook signing v2', text: 'Introduced timestamped HMAC signatures with replay protection. The previous signature remains available during migration.' }
          ] }
        ]
      },
      {
        id: 'release-types',
        title: 'Release types',
        blocks: [
          { type: 'table', headers: ['Type', 'Examples', 'Action'], rows: [
            ['Additive', 'New optional field or endpoint', 'No immediate action; update schemas when useful'],
            ['Behavioral', 'Improved risk model or retry timing', 'Review metrics and documented expectations'],
            ['Deprecation', 'Older header or SDK method scheduled for removal', 'Migrate before the published end date'],
            ['Breaking', 'Required field or changed response contract', 'Adopt through a new pinned API version']
          ] },
          { type: 'callout', text: 'Identra does not introduce intentional breaking response changes inside a pinned API version.' }
        ]
      },
      {
        id: 'migration-guide',
        title: 'Webhook signing v2 migration',
        blocks: [
          { type: 'p', text: 'Signing v2 adds Identra-Timestamp to the signed payload and lets receivers reject replayed requests. Migrate one endpoint at a time and keep existing event deduplication.' },
          { type: 'list', items: [
            { title: '1. Capture the raw body', text: 'Configure the framework to retain the exact request bytes before JSON parsing.' },
            { title: '2. Verify v2', text: 'Calculate HMAC-SHA256 over timestamp, a period, and the raw body.' },
            { title: '3. Enforce freshness', text: 'Reject timestamps outside your approved tolerance, typically five minutes.' },
            { title: '4. Observe', text: 'Monitor verification failures and clock drift in Sandbox and Production.' },
            { title: '5. Retire v1', text: 'Disable the previous signature only after every active endpoint reports successful v2 verification.' }
          ] }
        ]
      },
      {
        id: 'deprecations',
        title: 'Active deprecations',
        blocks: [
          { type: 'table', headers: ['Feature', 'Replacement', 'End of support'], rows: [
            ['X-Identra-Signature', 'Identra-Signature with Identra-Timestamp', '2026-11-30'],
            ['page[offset]', 'Cursor pagination with page[after]', '2027-02-28'],
            ['SDK complete callback payload v1', 'Fetch the Inquiry by ID', '2027-04-30']
          ] },
          { type: 'p', text: 'End of support means the deprecated behavior may stop working after the listed date. Owners receive dashboard and email notices before Production removal.' }
        ]
      },
      {
        id: 'release-process',
        title: 'Recommended release process',
        blocks: [
          { type: 'list', items: [
            { title: 'Subscribe', text: 'Route changelog and deprecation notices to an owned engineering mailbox or incident channel.' },
            { title: 'Assess', text: 'Assign an owner and determine whether API, SDK, policy, or operational behavior is affected.' },
            { title: 'Test', text: 'Exercise representative success and failure cases in Sandbox with the target API version.' },
            { title: 'Roll out', text: 'Deploy gradually, compare key metrics, and keep a documented rollback path.' }
          ] }
        ]
      }
    ]
  },
  es: {
    title: 'Historial de cambios',
    category: 'resources',
    sections: [
      {
        id: 'latest-releases',
        title: 'Versiones recientes',
        blocks: [
          { type: 'p', text: 'Este historial de ejemplo recoge cambios de API, SDK, panel de administración y motores de verificación que pueden afectar una integración. Las fechas indican disponibilidad general salvo mención contraria.' },
          { type: 'changelog', items: [
            { version: '2026-07-15', title: 'Resultados posteriores de transacciones', text: 'Añadimos settled, refunded, chargeback y confirmed_fraud para reflejar eventos posteriores a la autorización.' },
            { version: '2026-06-24', title: 'Diagnóstico de entregas Relay', text: 'Añadimos fechas de intentos, códigos de fallo normalizados y métricas de latencia por destino.' },
            { version: '2026-05-08', title: 'Recuperación de sesiones Inquiry', text: 'Los SDK de cliente pueden reanudar un Inquiry interrumpido en el mismo dispositivo mientras el token sea válido.' },
            { version: '2026-03-19', title: 'Firma de webhooks v2', text: 'Incorporamos firmas HMAC con fecha y protección contra repetición. La firma anterior sigue disponible durante la migración.' }
          ] }
        ]
      },
      {
        id: 'release-types',
        title: 'Tipos de versión',
        blocks: [
          { type: 'table', headers: ['Tipo', 'Ejemplos', 'Acción'], rows: [
            ['Aditivo', 'Campo opcional o punto de acceso nuevo', 'Sin acción inmediata; actualiza esquemas cuando convenga'],
            ['De comportamiento', 'Mejoras de modelo o tiempos de reintento', 'Revisa métricas y expectativas'],
            ['Obsolescencia', 'Cabecera o método SDK con fecha de retirada', 'Migra antes de la fecha publicada'],
            ['Incompatible', 'Campo obligatorio o contrato de respuesta distinto', 'Adopta una nueva versión fijada de API']
          ] },
          { type: 'callout', text: 'Identra no introduce cambios incompatibles intencionados dentro de una versión API fijada.' }
        ]
      },
      {
        id: 'migration-guide',
        title: 'Migración a la firma de eventos v2',
        blocks: [
          { type: 'p', text: 'La firma v2 incorpora Identra-Timestamp al contenido firmado y permite rechazar repeticiones. Migra un punto de acceso cada vez y conserva la deduplicación actual.' },
          { type: 'list', items: [
            { title: '1. Capturar el cuerpo original', text: 'Configura el entorno de desarrollo para conservar los bytes antes de interpretar JSON.' },
            { title: '2. Verificar v2', text: 'Calcula HMAC-SHA256 sobre la fecha, un punto y el cuerpo original.' },
            { title: '3. Exigir vigencia', text: 'Rechaza fechas fuera de la tolerancia aprobada, normalmente cinco minutos.' },
            { title: '4. Observar', text: 'Supervisa fallos de firma y desfase de reloj en los entornos de pruebas y producción.' },
            { title: '5. Retirar v1', text: 'Desactiva la firma anterior cuando todos los puntos de acceso verifiquen v2 correctamente.' }
          ] }
        ]
      },
      {
        id: 'deprecations',
        title: 'Funciones obsoletas activas',
        blocks: [
          { type: 'table', headers: ['Función', 'Sustitución', 'Fin de soporte'], rows: [
            ['X-Identra-Signature', 'Identra-Signature con Identra-Timestamp', '2026-11-30'],
            ['page[offset]', 'Paginación por cursor con page[after]', '2027-02-28'],
            ['Datos v1 de la función de retorno al completar el SDK', 'Consultar el Inquiry por ID', '2027-04-30']
          ] },
          { type: 'p', text: 'Después de la fecha indicada, el comportamiento obsoleto puede dejar de funcionar. Los responsables reciben avisos antes de retirarlo de producción.' }
        ]
      },
      {
        id: 'release-process',
        title: 'Proceso de actualización recomendado',
        blocks: [
          { type: 'list', items: [
            { title: 'Suscribirse', text: 'Envía avisos del historial y obsolescencias a un buzón técnico con responsable.' },
            { title: 'Evaluar', text: 'Asigna propietario y determina el efecto sobre API, SDK, política u operación.' },
            { title: 'Probar', text: 'Ejecuta casos de éxito y fallo en Sandbox con la versión objetivo.' },
            { title: 'Desplegar', text: 'Publica gradualmente, compara métricas y conserva un plan de reversión.' }
          ] }
        ]
      }
    ]
  },
  ja: {
    title: '変更履歴',
    category: 'resources',
    sections: [
      {
        id: 'latest-releases',
        title: '最新リリース',
        blocks: [
          { type: 'p', text: 'このサンプル変更履歴には、連携へ影響する可能性があるAPI、SDK、管理画面、検証エンジンの変更を記載しています。特記がない日付は一般提供開始日です。' },
          { type: 'changelog', items: [
            { version: '2026-07-15', title: '取引結果の更新', text: '認可後の履歴を反映できるよう、settled、refunded、chargeback、confirmed_fraudを追加しました。' },
            { version: '2026-06-24', title: 'Relay配信診断', text: '配信試行時刻、正規化した失敗コード、送信先ごとの遅延指標を追加しました。' },
            { version: '2026-05-08', title: 'Inquiryセッションの復旧', text: 'セッショントークンが有効な間、クライアントSDKが同じ端末で中断したInquiryを再開できるようになりました。' },
            { version: '2026-03-19', title: 'Webhook署名v2', text: 'タイムスタンプ付きHMAC署名と再送攻撃の防止機能を導入しました。移行期間中は以前の署名も利用できます。' }
          ] }
        ]
      },
      {
        id: 'release-types',
        title: 'リリース種別',
        blocks: [
          { type: 'table', headers: ['種別', '例', '対応'], rows: [
            ['追加', '新しい任意フィールドやエンドポイント', '即時対応不要。必要に応じて構造を更新'],
            ['動作変更', 'リスクモデルや再試行間隔の改善', '指標と想定動作を確認'],
            ['非推奨', '削除予定のヘッダーやSDKメソッド', '公表された期限までに移行'],
            ['破壊的変更', '必須フィールドやレスポンス契約の変更', '新しい固定APIバージョンとして採用']
          ] },
          { type: 'callout', text: 'Identraは固定したAPIバージョン内で意図的な破壊的レスポンス変更を行いません。' }
        ]
      },
      {
        id: 'migration-guide',
        title: 'イベント署名v2への移行',
        blocks: [
          { type: 'p', text: '署名v2では署名対象にIdentra-Timestampを追加し、再送攻撃を拒否できます。エンドポイントごとに移行し、既存のイベント重複排除は維持してください。' },
          { type: 'list', items: [
            { title: '1. 未加工の本文を保持', text: 'JSON解析前のリクエストバイト列を保持するようフレームワークを設定します。' },
            { title: '2. v2を検証', text: 'タイムスタンプ、ピリオド、未加工の本文に対してHMAC-SHA256を計算します。' },
            { title: '3. 有効時間を強制', text: '通常5分など、承認した許容時間外のタイムスタンプを拒否します。' },
            { title: '4. 監視', text: 'Sandboxと本番環境で署名失敗と時計ずれを監視します。' },
            { title: '5. v1を終了', text: 'すべてのエンドポイントでv2成功を確認してから旧署名を無効化します。' }
          ] }
        ]
      },
      {
        id: 'deprecations',
        title: '現在の非推奨機能',
        blocks: [
          { type: 'table', headers: ['機能', '代替', 'サポート終了'], rows: [
            ['X-Identra-Signature', 'Identra-Timestamp付きIdentra-Signature', '2026-11-30'],
            ['page[offset]', 'page[after]によるカーソル方式のページ分割', '2027-02-28'],
            ['SDK完了コールバックのデータ形式v1', 'IDでInquiryを取得', '2027-04-30']
          ] },
          { type: 'p', text: 'サポート終了日以降、非推奨動作は利用できなくなる場合があります。本番環境から削除する前に管理画面とメールで通知します。' }
        ]
      },
      {
        id: 'release-process',
        title: '推奨リリース手順',
        blocks: [
          { type: 'list', items: [
            { title: '購読', text: '変更履歴と非推奨通知を管理者のいる技術メールまたは障害対応チャンネルへ送ります。' },
            { title: '評価', text: '担当者を決め、API、SDK、方針、運用への影響を判定します。' },
            { title: 'テスト', text: '対象APIバージョンで代表的な成功と失敗をSandboxで検証します。' },
            { title: '展開', text: '段階的に配備し、主要指標を比較して切り戻し手順を残します。' }
          ] }
        ]
      }
    ]
  },
  de: {
    title: 'Änderungsprotokoll',
    category: 'resources',
    sections: [
      {
        id: 'latest-releases',
        title: 'Neueste Veröffentlichungen',
        blocks: [
          { type: 'p', text: 'Dieses Beispielprotokoll dokumentiert Änderungen an API, SDK, Verwaltungsoberfläche und Verifizierungsmodulen, die Integrationen betreffen können. Datumsangaben stehen für allgemeine Verfügbarkeit, sofern nicht anders angegeben.' },
          { type: 'changelog', items: [
            { version: '2026-07-15', title: 'Nachträgliche Transaktionsergebnisse', text: 'settled, refunded, chargeback und confirmed_fraud bilden nun Ereignisse nach der Autorisierung im Verlauf ab.' },
            { version: '2026-06-24', title: 'Diagnose der Relay-Zustellung', text: 'Zeitpunkte der Versuche, normalisierte Fehlercodes und Latenzmetriken je Ziel wurden ergänzt.' },
            { version: '2026-05-08', title: 'Wiederaufnahme von Inquiry-Sitzungen', text: 'Nutzer-SDKs können unterbrochene Inquiries auf demselben Gerät fortsetzen, solange das Token gültig ist.' },
            { version: '2026-03-19', title: 'Webhook-Signatur v2', text: 'Zeitgestempelte HMAC-Signaturen mit Schutz vor Wiederholungsangriffen wurden eingeführt. Die alte Signatur bleibt während der Migration verfügbar.' }
          ] }
        ]
      },
      {
        id: 'release-types',
        title: 'Arten von Veröffentlichungen',
        blocks: [
          { type: 'table', headers: ['Typ', 'Beispiele', 'Aktion'], rows: [
            ['Erweiterung', 'Neues optionales Feld oder API-Endpunkt', 'Keine Sofortmaßnahme; Struktur bei Bedarf aktualisieren'],
            ['Verhalten', 'Verbessertes Risikomodell oder Wiederholungsintervall', 'Metriken und Erwartungen prüfen'],
            ['Veraltet', 'Kopfzeile oder SDK-Methode mit Enddatum', 'Vor dem veröffentlichten Termin migrieren'],
            ['Inkompatibel', 'Pflichtfeld oder geänderter Antwortvertrag', 'Über neue festgelegte API-Version übernehmen']
          ] },
          { type: 'callout', text: 'Identra führt innerhalb einer festgelegten API-Version keine beabsichtigten inkompatiblen Antwortänderungen ein.' }
        ]
      },
      {
        id: 'migration-guide',
        title: 'Migration der Ereignissignatur v2',
        blocks: [
          { type: 'p', text: 'Signatur v2 nimmt Identra-Timestamp in den signierten Inhalt auf und schützt vor Wiederholungsangriffen. Migrieren Sie jeden API-Endpunkt einzeln und behalten Sie die Ereignis-Deduplizierung bei.' },
          { type: 'list', items: [
            { title: '1. Unveränderten Inhalt erfassen', text: 'Programmiergerüst so konfigurieren, dass die exakten Bytes vor der JSON-Auswertung erhalten bleiben.' },
            { title: '2. v2 prüfen', text: 'HMAC-SHA256 über Zeitstempel, Punkt und unveränderten Inhalt berechnen.' },
            { title: '3. Aktualität erzwingen', text: 'Zeitstempel außerhalb der Toleranz, typischerweise fünf Minuten, ablehnen.' },
            { title: '4. Beobachten', text: 'Signaturfehler und Uhrabweichung in Test- und Produktivumgebung überwachen.' },
            { title: '5. v1 abschalten', text: 'Alte Signatur erst deaktivieren, wenn alle API-Endpunkte v2 erfolgreich prüfen.' }
          ] }
        ]
      },
      {
        id: 'deprecations',
        title: 'Aktive Abkündigungen',
        blocks: [
          { type: 'table', headers: ['Funktion', 'Ersatz', 'Supportende'], rows: [
            ['X-Identra-Signature', 'Identra-Signature mit Identra-Timestamp', '2026-11-30'],
            ['page[offset]', 'Cursor-Paginierung mit page[after]', '2027-02-28'],
            ['SDK-Abschlussrückruf v1', 'Inquiry anhand der ID laden', '2027-04-30']
          ] },
          { type: 'p', text: 'Nach dem Supportende kann das veraltete Verhalten eingestellt werden. Verantwortliche erhalten vor der Entfernung aus dem Produktivbetrieb Hinweise in der Verwaltungsoberfläche und per E-Mail.' }
        ]
      },
      {
        id: 'release-process',
        title: 'Empfohlener Veröffentlichungsprozess',
        blocks: [
          { type: 'list', items: [
            { title: 'Abonnieren', text: 'Änderungs- und Abkündigungshinweise an ein betreutes technisches Postfach leiten.' },
            { title: 'Bewerten', text: 'Verantwortliche bestimmen und Auswirkungen auf API, SDK, Richtlinie oder Betrieb klären.' },
            { title: 'Testen', text: 'Repräsentative Erfolgs- und Fehlerfälle mit der Zielversion in Sandbox prüfen.' },
            { title: 'Ausrollen', text: 'Schrittweise bereitstellen, zentrale Metriken vergleichen und die Rückkehr zur vorherigen Version dokumentieren.' }
          ] }
        ]
      }
    ]
  },
  vi: {
    title: 'Nhật ký thay đổi',
    category: 'resources',
    sections: [
      {
        id: 'latest-releases',
        title: 'Các bản phát hành mới nhất',
        blocks: [
          { type: 'p', text: 'Nhật ký mẫu này ghi lại những thay đổi của API, SDK, bảng quản trị và bộ máy xác minh có thể ảnh hưởng đến tích hợp. Ngày ghi trong mỗi mục là thời điểm phát hành rộng rãi, trừ khi có chú thích khác.' },
          { type: 'changelog', items: [
            { version: '2026-07-15', title: 'Cập nhật kết quả sau giao dịch', text: 'Bổ sung các trạng thái settled, refunded, chargeback và confirmed_fraud để lịch sử giao dịch phản ánh các sự kiện sau khi cấp phép.' },
            { version: '2026-06-24', title: 'Chẩn đoán việc chuyển dữ liệu Relay', text: 'Bổ sung thời điểm từng lần thử, mã lỗi đã chuẩn hóa và chỉ số độ trễ theo từng đích đến.' },
            { version: '2026-05-08', title: 'Khôi phục phiên Inquiry', text: 'SDK trên thiết bị người dùng có thể tiếp tục một Inquiry bị gián đoạn trên cùng thiết bị khi mã phiên vẫn còn hiệu lực.' },
            { version: '2026-03-19', title: 'Chữ ký sự kiện v2', text: 'Giới thiệu chữ ký HMAC kèm dấu thời gian và cơ chế chống phát lại. Chữ ký cũ vẫn khả dụng trong thời gian chuyển đổi.' }
          ] }
        ]
      },
      {
        id: 'release-types',
        title: 'Các loại bản phát hành',
        blocks: [
          { type: 'table', headers: ['Loại', 'Ví dụ', 'Cách xử lý'], rows: [
            ['Bổ sung', 'Trường tùy chọn hoặc điểm cuối API mới', 'Không cần xử lý ngay; cập nhật cấu trúc khi cần'],
            ['Thay đổi hành vi', 'Cải thiện mô hình rủi ro hoặc thời gian gửi lại', 'Rà soát chỉ số và hành vi dự kiến'],
            ['Ngừng hỗ trợ dần', 'Trường đầu hoặc phương thức SDK sẽ bị loại bỏ', 'Chuyển đổi trước ngày đã công bố'],
            ['Thay đổi không tương thích', 'Trường bắt buộc hoặc hợp đồng phản hồi thay đổi', 'Áp dụng qua một phiên bản API mới được cố định']
          ] },
          { type: 'callout', text: 'Identra không chủ động đưa thay đổi phản hồi thiếu tương thích vào một phiên bản API đã được cố định.' }
        ]
      },
      {
        id: 'migration-guide',
        title: 'Chuyển sang chữ ký sự kiện v2',
        blocks: [
          { type: 'p', text: 'Chữ ký v2 đưa Identra-Timestamp vào dữ liệu ký và cho phép hệ thống nhận từ chối yêu cầu phát lại. Hãy chuyển đổi từng điểm cuối API và tiếp tục loại bỏ sự kiện trùng như hiện tại.' },
          { type: 'list', items: [
            { title: '1. Giữ phần thân nguyên bản', text: 'Cấu hình bộ khung giữ đúng từng byte của yêu cầu trước khi phân tích JSON.' },
            { title: '2. Xác minh v2', text: 'Tính HMAC-SHA256 trên dấu thời gian, một dấu chấm và phần thân nguyên bản.' },
            { title: '3. Kiểm tra độ mới', text: 'Từ chối dấu thời gian nằm ngoài khoảng cho phép, thường là năm phút.' },
            { title: '4. Theo dõi', text: 'Giám sát lỗi xác minh và độ lệch đồng hồ trong môi trường thử nghiệm lẫn môi trường thật.' },
            { title: '5. Dừng v1', text: 'Chỉ tắt chữ ký cũ sau khi mọi điểm cuối API đang hoạt động đều xác minh v2 thành công.' }
          ] }
        ]
      },
      {
        id: 'deprecations',
        title: 'Các tính năng đang được loại bỏ',
        blocks: [
          { type: 'table', headers: ['Tính năng', 'Phương án thay thế', 'Ngày kết thúc hỗ trợ'], rows: [
            ['X-Identra-Signature', 'Identra-Signature kèm Identra-Timestamp', '2026-11-30'],
            ['page[offset]', 'Phân trang bằng con trỏ với page[after]', '2027-02-28'],
            ['Dữ liệu v1 của hàm gọi lại khi SDK hoàn tất', 'Lấy Inquiry bằng ID', '2027-04-30']
          ] },
          { type: 'p', text: 'Sau ngày kết thúc hỗ trợ, hành vi cũ có thể ngừng hoạt động. Chủ sở hữu tích hợp sẽ nhận thông báo trên bảng quản trị và qua email trước khi tính năng bị gỡ khỏi môi trường thật.' }
        ]
      },
      {
        id: 'release-process',
        title: 'Quy trình cập nhật khuyến nghị',
        blocks: [
          { type: 'list', items: [
            { title: 'Đăng ký nhận tin', text: 'Chuyển thông báo thay đổi và ngừng hỗ trợ đến hộp thư kỹ thuật hoặc kênh sự cố có người phụ trách.' },
            { title: 'Đánh giá', text: 'Chỉ định người chịu trách nhiệm và xác định ảnh hưởng đến API, SDK, chính sách hoặc vận hành.' },
            { title: 'Kiểm thử', text: 'Chạy các trường hợp thành công và thất bại tiêu biểu trong Sandbox với phiên bản API mục tiêu.' },
            { title: 'Triển khai', text: 'Phát hành theo từng giai đoạn, so sánh các chỉ số chính và chuẩn bị sẵn phương án quay lui.' }
          ] }
        ]
      }
    ]
  }
} satisfies LocalizedDocsContent;
