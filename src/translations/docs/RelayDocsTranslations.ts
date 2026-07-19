import type { LocalizedDocsContent } from '../../components/docs/docsModel';

const relayConfigCode = `{
  "name": "approved-customer-profile",
  "destination": {
    "url": "https://api.example.com/identra/profile",
    "method": "POST",
    "authentication": {
      "type": "bearer",
      "secret_ref": "customer-profile-token"
    }
  },
  "trigger": "inquiry.completed",
  "conditions": [{ "field": "decision", "operator": "eq", "value": "approved" }],
  "mapping": {
    "external_id": "$.inquiry.reference_id",
    "full_name": "$.inquiry.fields.name",
    "country": "$.inquiry.fields.address.country_code"
  }
}`;

const relayReceiverCode = `app.post('/identra/profile', express.json(), async (request, response) => {
  const deliveryId = request.header('Identra-Delivery-Id');

  if (await deliveryStore.has(deliveryId)) {
    return response.sendStatus(200);
  }

  await customerStore.update(request.body.external_id, request.body);
  await deliveryStore.markProcessed(deliveryId);
  return response.sendStatus(204);
});`;

export const RELAY_DOCS_TRANSLATIONS = {
  en: {
    title: 'Relay',
    category: 'sending',
    sections: [
      {
        id: 'relay-overview',
        title: 'Relay overview',
        blocks: [
          { type: 'p', text: 'Relay securely sends selected Inquiry or Transaction attributes from Identra to a system you control. It is useful when a downstream service needs verified data but your frontend or orchestration service should not handle the complete source payload.' },
          { type: 'cards', cards: [
            { title: 'Destination', text: 'A customer-controlled HTTPS endpoint that receives the transformed payload.' },
            { title: 'Trigger', text: 'The resource event that starts a delivery, such as inquiry.completed.' },
            { title: 'Condition', text: 'Optional rules that limit delivery to an approved status, template, or environment.' },
            { title: 'Mapping', text: 'An explicit allowlist that selects and renames fields for the destination.' }
          ] }
        ]
      },
      {
        id: 'configure-relay',
        title: 'Configure a Relay',
        blocks: [
          { type: 'p', text: 'Create one Relay per destination and business purpose. The example sends a small approved customer profile after an Inquiry completes.' },
          { type: 'code', language: 'json', fileName: 'relay-config.json', code: relayConfigCode },
          { type: 'callout', text: 'Start with an empty mapping and add fields deliberately. Wildcard mappings make data minimization and schema reviews harder.' }
        ]
      },
      {
        id: 'receive-deliveries',
        title: 'Receive deliveries',
        blocks: [
          { type: 'p', text: 'Expose a TLS endpoint that can accept repeated deliveries. Validate authentication, reject oversized bodies, and record the delivery ID before updating business data.' },
          { type: 'code', language: 'javascript', fileName: 'relayReceiver.js', code: relayReceiverCode },
          { type: 'table', headers: ['Response', 'Relay behavior'], rows: [
            ['2xx', 'Delivery is complete'],
            ['408 / 429 / 5xx', 'Delivery is retried with backoff'],
            ['Other 4xx', 'Delivery fails and requires configuration review'],
            ['Timeout', 'Outcome is unknown; Relay retries with the same delivery ID']
          ] }
        ]
      },
      {
        id: 'relay-security',
        title: 'Security and privacy',
        blocks: [
          { type: 'list', items: [
            { title: 'Authentication', text: 'Use a secret reference or mutually authenticated TLS; never place credentials directly in a mapping.' },
            { title: 'Allowlisting', text: 'Restrict destination paths and network access to the exact receiver that needs the data.' },
            { title: 'Minimization', text: 'Map only fields covered by the destination purpose, retention policy, and user notice.' },
            { title: 'Rotation', text: 'Rotate destination credentials without changing the Relay schema or interrupting deliveries.' }
          ] }
        ]
      },
      {
        id: 'relay-operations',
        title: 'Testing and operations',
        blocks: [
          { type: 'p', text: 'Test successful, duplicate, delayed, and rejected deliveries in Sandbox. Monitor delivery latency and failure rate separately for each destination.' },
          { type: 'list', items: [
            { title: 'Idempotency', text: 'Deduplicate using Identra-Delivery-Id before applying side effects.' },
            { title: 'Observability', text: 'Log delivery ID, Relay ID, status code, and processing time without logging the full payload.' },
            { title: 'Replay', text: 'Replay only after the receiver is safe to process an old delivery and the underlying purpose is still valid.' },
            { title: 'Schema changes', text: 'Add fields compatibly, coordinate removals, and version breaking destination contracts.' }
          ] }
        ]
      }
    ]
  },
  es: {
    title: 'Retransmisión',
    category: 'sending',
    sections: [
      {
        id: 'relay-overview',
        title: 'Descripción de la retransmisión',
        blocks: [
          { type: 'p', text: 'Relay envía de forma segura atributos seleccionados de un Inquiry o una Transacción desde Identra a un sistema bajo tu control. Es útil cuando un servicio posterior necesita datos verificados, pero la interfaz o el orquestador no deben manejar el contenido completo.' },
          { type: 'cards', cards: [
            { title: 'Destino', text: 'Punto de acceso HTTPS controlado por el cliente que recibe el contenido transformado.' },
            { title: 'Disparador', text: 'Evento que inicia la entrega, como inquiry.completed.' },
            { title: 'Condición', text: 'Reglas opcionales que limitan la entrega por estado, plantilla o entorno.' },
            { title: 'Mapeo', text: 'Lista explícita de campos seleccionados y renombrados para el destino.' }
          ] }
        ]
      },
      {
        id: 'configure-relay',
        title: 'Configurar la retransmisión',
        blocks: [
          { type: 'p', text: 'Crea un Relay por destino y finalidad. El ejemplo envía un perfil mínimo aprobado cuando termina un Inquiry.' },
          { type: 'code', language: 'json', fileName: 'relay-config.json', code: relayConfigCode },
          { type: 'callout', text: 'Empieza con un mapeo vacío y añade cada campo de forma deliberada. Los comodines dificultan la minimización y la revisión del esquema.' }
        ]
      },
      {
        id: 'receive-deliveries',
        title: 'Recibir entregas',
        blocks: [
          { type: 'p', text: 'Publica un punto de acceso TLS que acepte entregas repetidas. Valida la autenticación, rechaza cuerpos demasiado grandes y registra el ID de entrega antes de modificar datos.' },
          { type: 'code', language: 'javascript', fileName: 'relayReceiver.js', code: relayReceiverCode },
          { type: 'table', headers: ['Respuesta', 'Comportamiento de Relay'], rows: [
            ['2xx', 'Entrega completada'],
            ['408 / 429 / 5xx', 'Reintento con espera progresiva'],
            ['Otros 4xx', 'Fallo que exige revisar la configuración'],
            ['Tiempo agotado', 'Resultado desconocido; se reintenta con el mismo ID']
          ] }
        ]
      },
      {
        id: 'relay-security',
        title: 'Seguridad y privacidad',
        blocks: [
          { type: 'list', items: [
            { title: 'Autenticación', text: 'Usa una referencia secreta o TLS mutuo; no incluyas credenciales en el mapeo.' },
            { title: 'Lista permitida', text: 'Limita rutas y acceso de red al receptor exacto que necesita los datos.' },
            { title: 'Minimización', text: 'Mapea solo campos cubiertos por la finalidad, retención y aviso al usuario.' },
            { title: 'Rotación', text: 'Rota credenciales sin cambiar el esquema ni interrumpir entregas.' }
          ] }
        ]
      },
      {
        id: 'relay-operations',
        title: 'Pruebas y operación',
        blocks: [
          { type: 'p', text: 'Prueba en Sandbox entregas correctas, duplicadas, retrasadas y rechazadas. Supervisa latencia y fallos por destino.' },
          { type: 'list', items: [
            { title: 'Idempotencia', text: 'Elimina duplicados con Identra-Delivery-Id antes de producir efectos.' },
            { title: 'Observabilidad', text: 'Registra ID de entrega, Relay, código y tiempo sin guardar el contenido completo.' },
            { title: 'Reenvío', text: 'Reenvía solo cuando el receptor pueda procesar datos antiguos de forma segura.' },
            { title: 'Cambios de esquema', text: 'Añade campos de forma compatible y versiona los contratos incompatibles.' }
          ] }
        ]
      }
    ]
  },
  ja: {
    title: '中継',
    category: 'sending',
    sections: [
      {
        id: 'relay-overview',
        title: '中継機能の概要',
        blocks: [
          { type: 'p', text: 'Relayは、Inquiryや取引から選択した属性をIdentraからお客様のシステムへ安全に送ります。後続サービスには検証済みデータが必要でも、フロントエンドや制御サービスで元のデータ全体を扱いたくない場合に有効です。' },
          { type: 'cards', cards: [
            { title: '送信先', text: '変換済みデータを受け取る、お客様管理のHTTPSエンドポイントです。' },
            { title: '起動条件', text: 'inquiry.completedなど、配信を開始するリソースイベントです。' },
            { title: '条件', text: '承認状態、テンプレート、環境などで配信を制限する任意ルールです。' },
            { title: '項目の対応付け', text: '送信先向けにフィールドを選択、改名する明示的な許可リストです。' }
          ] }
        ]
      },
      {
        id: 'configure-relay',
        title: '中継を設定する',
        blocks: [
          { type: 'p', text: '送信先と利用目的ごとにRelayを作成します。この例ではInquiry完了後、承認済みの最小限のプロフィールを送信します。' },
          { type: 'code', language: 'json', fileName: 'relay-config.json', code: relayConfigCode },
          { type: 'callout', text: '空の項目対応から始め、必要なフィールドだけを追加してください。ワイルドカードはデータ最小化と構造審査を難しくします。' }
        ]
      },
      {
        id: 'receive-deliveries',
        title: '配信を受信する',
        blocks: [
          { type: 'p', text: '同じ配信を複数回受け取れるTLSエンドポイントを用意します。認証を検証し、過大な本文を拒否し、業務データ更新前に配信IDを記録します。' },
          { type: 'code', language: 'javascript', fileName: 'relayReceiver.js', code: relayReceiverCode },
          { type: 'table', headers: ['レスポンス', 'Relayの動作'], rows: [
            ['2xx', '配信完了'],
            ['408 / 429 / 5xx', '待機時間を延ばしながら再試行'],
            ['その他の4xx', '設定確認が必要な失敗'],
            ['タイムアウト', '結果不明。同じ配信IDで再試行']
          ] }
        ]
      },
      {
        id: 'relay-security',
        title: 'セキュリティとプライバシー',
        blocks: [
          { type: 'list', items: [
            { title: '認証', text: '秘密情報への参照または相互TLSを使い、項目対応に認証情報を直接記載しません。' },
            { title: '許可リスト', text: '送信先のパスとネットワークアクセスを、データを必要とする受信サービスに限定します。' },
            { title: '最小化', text: '利用目的、保持方針、利用者への通知で認められたフィールドだけを送ります。' },
            { title: '認証情報の更新', text: 'Relayの構造と配信を止めずに送信先の認証情報を更新します。' }
          ] }
        ]
      },
      {
        id: 'relay-operations',
        title: 'テストと運用',
        blocks: [
          { type: 'p', text: 'Sandboxで成功、重複、遅延、拒否の配信を検証し、送信先ごとに遅延と失敗率を監視します。' },
          { type: 'list', items: [
            { title: '冪等性', text: '副作用を適用する前にIdentra-Delivery-Idで重複を排除します。' },
            { title: '可観測性', text: 'データ全体を残さず、配信ID、Relay ID、状態コード、処理時間を記録します。' },
            { title: '再配信', text: '古い配信を安全に処理でき、利用目的が有効な場合だけ再配信します。' },
            { title: '構造変更', text: '互換性を保って追加し、削除は関係者と調整し、破壊的変更は版管理します。' }
          ] }
        ]
      }
    ]
  },
  de: {
    title: 'Weiterleitung',
    category: 'sending',
    sections: [
      {
        id: 'relay-overview',
        title: 'Überblick zur Weiterleitung',
        blocks: [
          { type: 'p', text: 'Relay sendet ausgewählte Attribute eines Inquiry oder einer Transaktion sicher von Identra an ein von Ihnen kontrolliertes System. So erhält ein nachgelagerter Dienst verifizierte Daten, ohne dass Frontend oder Orchestrierung die vollständigen Quelldaten verarbeiten.' },
          { type: 'cards', cards: [
            { title: 'Ziel', text: 'Kundenseitig kontrollierter HTTPS-Endpunkt für die umgewandelten Daten.' },
            { title: 'Auslöser', text: 'Ressourcenereignis wie inquiry.completed, das eine Zustellung startet.' },
            { title: 'Bedingung', text: 'Optionale Regeln zur Begrenzung nach Status, Vorlage oder Umgebung.' },
            { title: 'Feldzuordnung', text: 'Explizite Positivliste zur Auswahl und Umbenennung von Zielfeldern.' }
          ] }
        ]
      },
      {
        id: 'configure-relay',
        title: 'Weiterleitung konfigurieren',
        blocks: [
          { type: 'p', text: 'Erstellen Sie je Ziel und Verwendungszweck ein Relay. Das Beispiel überträgt nach Abschluss eines Inquiry ein minimales freigegebenes Kundenprofil.' },
          { type: 'code', language: 'json', fileName: 'relay-config.json', code: relayConfigCode },
          { type: 'callout', text: 'Beginnen Sie mit einer leeren Feldzuordnung und fügen Sie Felder bewusst hinzu. Platzhalter erschweren Datenminimierung und Strukturprüfung.' }
        ]
      },
      {
        id: 'receive-deliveries',
        title: 'Zustellungen empfangen',
        blocks: [
          { type: 'p', text: 'Stellen Sie einen TLS-Endpunkt bereit, der wiederholte Zustellungen akzeptiert. Prüfen Sie die Authentifizierung, begrenzen Sie die Größe des Inhalts und speichern Sie die Zustell-ID vor Datenänderungen.' },
          { type: 'code', language: 'javascript', fileName: 'relayReceiver.js', code: relayReceiverCode },
          { type: 'table', headers: ['Antwort', 'Relay-Verhalten'], rows: [
            ['2xx', 'Zustellung abgeschlossen'],
            ['408 / 429 / 5xx', 'Wiederholung mit zunehmender Wartezeit'],
            ['Andere 4xx', 'Fehler erfordert Konfigurationsprüfung'],
            ['Zeitüberschreitung', 'Ergebnis unbekannt; Wiederholung mit derselben ID']
          ] }
        ]
      },
      {
        id: 'relay-security',
        title: 'Sicherheit und Datenschutz',
        blocks: [
          { type: 'list', items: [
            { title: 'Authentifizierung', text: 'Referenz auf ein Geheimnis oder gegenseitiges TLS verwenden; keine Zugangsdaten in der Feldzuordnung hinterlegen.' },
            { title: 'Positivliste', text: 'Zielpfade und Netzwerkzugriff auf den benötigten Empfänger beschränken.' },
            { title: 'Minimierung', text: 'Nur Felder mit gedecktem Zweck, Aufbewahrungskonzept und Nutzerhinweis übertragen.' },
            { title: 'Rotation', text: 'Zielzugangsdaten ohne Schemaänderung und Lieferunterbrechung austauschen.' }
          ] }
        ]
      },
      {
        id: 'relay-operations',
        title: 'Tests und Betrieb',
        blocks: [
          { type: 'p', text: 'Testen Sie erfolgreiche, doppelte, verzögerte und abgelehnte Zustellungen in Sandbox. Überwachen Sie Latenz und Fehlerrate je Ziel.' },
          { type: 'list', items: [
            { title: 'Idempotenz', text: 'Vor Seiteneffekten anhand von Identra-Delivery-Id deduplizieren.' },
            { title: 'Beobachtbarkeit', text: 'Zustell-ID, Relay-ID, Statuscode und Dauer ohne vollständigen Payload protokollieren.' },
            { title: 'Wiederholung', text: 'Nur wiederholen, wenn der Empfänger alte Daten sicher verarbeiten kann und der Zweck fortbesteht.' },
            { title: 'Schemaänderung', text: 'Felder kompatibel ergänzen, Entfernungen koordinieren und inkompatible Verträge versionieren.' }
          ] }
        ]
      }
    ]
  },
  vi: {
    title: 'Chuyển tiếp',
    category: 'sending',
    sections: [
      {
        id: 'relay-overview',
        title: 'Tổng quan về chuyển tiếp dữ liệu',
        blocks: [
          { type: 'p', text: 'Relay chuyển an toàn những thuộc tính được chọn từ Inquiry hoặc Giao dịch trên Identra đến hệ thống do bạn kiểm soát. Tính năng này phù hợp khi dịch vụ phía sau cần dữ liệu đã xác minh nhưng giao diện người dùng hoặc dịch vụ điều phối không nên xử lý toàn bộ dữ liệu nguồn.' },
          { type: 'cards', cards: [
            { title: 'Đích đến', text: 'Điểm cuối HTTPS do khách hàng kiểm soát, dùng để nhận dữ liệu đã được chuyển đổi.' },
            { title: 'Sự kiện kích hoạt', text: 'Sự kiện tài nguyên bắt đầu lần chuyển dữ liệu, chẳng hạn inquiry.completed.' },
            { title: 'Điều kiện', text: 'Quy tắc tùy chọn giới hạn việc chuyển theo trạng thái, mẫu cấu hình hoặc môi trường.' },
            { title: 'Ánh xạ', text: 'Danh sách cho phép rõ ràng để chọn và đổi tên trường cho hệ thống đích.' }
          ] }
        ]
      },
      {
        id: 'configure-relay',
        title: 'Cấu hình chuyển tiếp dữ liệu',
        blocks: [
          { type: 'p', text: 'Tạo một Relay riêng cho từng đích đến và mục đích nghiệp vụ. Ví dụ dưới đây chuyển hồ sơ khách hàng tối thiểu đã được phê duyệt sau khi Inquiry hoàn tất.' },
          { type: 'code', language: 'json', fileName: 'relay-config.json', code: relayConfigCode },
          { type: 'callout', text: 'Bắt đầu với ánh xạ trống rồi chủ động thêm từng trường cần thiết. Ánh xạ ký tự đại diện khiến việc giảm thiểu dữ liệu và rà soát cấu trúc khó hơn.' }
        ]
      },
      {
        id: 'receive-deliveries',
        title: 'Tiếp nhận dữ liệu',
        blocks: [
          { type: 'p', text: 'Cung cấp điểm cuối TLS có thể tiếp nhận cùng một lần chuyển nhiều lần. Xác thực yêu cầu, từ chối phần thân quá lớn và lưu ID lần chuyển trước khi cập nhật dữ liệu nghiệp vụ.' },
          { type: 'code', language: 'javascript', fileName: 'relayReceiver.js', code: relayReceiverCode },
          { type: 'table', headers: ['Phản hồi', 'Cách Relay xử lý'], rows: [
            ['2xx', 'Đã chuyển thành công'],
            ['408 / 429 / 5xx', 'Gửi lại với thời gian chờ tăng dần'],
            ['Mã 4xx khác', 'Dừng và yêu cầu kiểm tra cấu hình'],
            ['Hết thời gian chờ', 'Chưa rõ kết quả; gửi lại với cùng ID lần chuyển']
          ] }
        ]
      },
      {
        id: 'relay-security',
        title: 'Bảo mật và quyền riêng tư',
        blocks: [
          { type: 'list', items: [
            { title: 'Xác thực', text: 'Dùng tham chiếu bí mật hoặc TLS hai chiều; không đặt thông tin xác thực trực tiếp trong ánh xạ.' },
            { title: 'Danh sách cho phép', text: 'Giới hạn đường dẫn đích và quyền truy cập mạng cho đúng dịch vụ cần dữ liệu.' },
            { title: 'Giảm thiểu', text: 'Chỉ ánh xạ những trường phù hợp với mục đích, chính sách lưu giữ và thông báo cho người dùng.' },
            { title: 'Luân chuyển khóa', text: 'Thay thông tin xác thực của đích đến mà không đổi cấu trúc Relay hoặc gián đoạn việc chuyển.' }
          ] }
        ]
      },
      {
        id: 'relay-operations',
        title: 'Kiểm thử và vận hành',
        blocks: [
          { type: 'p', text: 'Kiểm thử các trường hợp thành công, trùng lặp, chậm và bị từ chối trong Sandbox. Theo dõi riêng độ trễ và tỷ lệ lỗi của từng đích đến.' },
          { type: 'list', items: [
            { title: 'Tính lũy đẳng', text: 'Loại bỏ lần chuyển trùng bằng Identra-Delivery-Id trước khi tạo tác động phụ.' },
            { title: 'Khả năng quan sát', text: 'Ghi ID lần chuyển, Relay ID, mã trạng thái và thời gian xử lý nhưng không ghi toàn bộ dữ liệu.' },
            { title: 'Chuyển lại', text: 'Chỉ chuyển lại khi hệ thống nhận có thể xử lý dữ liệu cũ an toàn và mục đích sử dụng vẫn còn hiệu lực.' },
            { title: 'Đổi cấu trúc', text: 'Thêm trường theo cách tương thích, phối hợp khi xóa và quản lý phiên bản cho thay đổi phá vỡ hợp đồng.' }
          ] }
        ]
      }
    ]
  }
} satisfies LocalizedDocsContent;
