import type { LocalizedDocsContent } from '../../components/docs/docsTypes';

const apiRequestCode = `curl https://api.withidentra.com/v1/inquiries/inq_01JEXAMPLE \\
  --header "Authorization: Bearer $IDENTRA_API_KEY" \\
  --header "Accept: application/json" \\
  --header "Identra-Version: 2025-12-08"`;

const errorResponseCode = `{
  "errors": [
    {
      "id": "err_01JEXAMPLE",
      "status": "422",
      "code": "invalid_attribute",
      "title": "Request validation failed",
      "detail": "amount must be an integer in minor currency units",
      "source": { "pointer": "/data/attributes/amount" }
    }
  ]
}`;

const verifyWebhookCode = `const signature = request.header('Identra-Signature');
const timestamp = request.header('Identra-Timestamp');
const signedPayload = \`\${timestamp}.\${request.rawBody.toString('utf8')}\`;

const expected = crypto
  .createHmac('sha256', process.env.IDENTRA_WEBHOOK_SECRET)
  .update(signedPayload)
  .digest('hex');

if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
  return response.sendStatus(401);
}`;

export const API_REFERENCE_DOCS_TRANSLATIONS = {
  en: {
    title: 'API Reference',
    category: 'retrieving',
    sections: [
      {
        id: 'api-basics',
        title: 'API basics',
        blocks: [
          { type: 'p', text: 'The Identra API is a JSON-over-HTTPS REST API. Resource URLs are stable within a pinned API version, request and response bodies use UTF-8, and timestamps use ISO 8601 in UTC.' },
          { type: 'code', language: 'bash', fileName: 'request.sh', code: apiRequestCode },
          { type: 'list', items: [
            { title: 'Base URL', text: 'Use https://api.withidentra.com/v1 for both Sandbox and Production; the API key selects the environment.' },
            { title: 'Authentication', text: 'Send the secret API key as a Bearer token in the Authorization header.' },
            { title: 'Versioning', text: 'Send Identra-Version on every request and update it only after compatibility testing.' },
            { title: 'Content type', text: 'Send Content-Type: application/json for requests with a body.' }
          ] }
        ]
      },
      {
        id: 'resource-endpoints',
        title: 'Core endpoints',
        blocks: [
          { type: 'table', headers: ['Method', 'Path', 'Purpose'], rows: [
            ['POST', '/v1/inquiries', 'Create a verification session'],
            ['GET', '/v1/inquiries/{id}', 'Retrieve status, checks, and decision'],
            ['POST', '/v1/transactions', 'Submit an account or money movement event'],
            ['GET', '/v1/transactions/{id}', 'Retrieve evaluation and recommendation'],
            ['POST', '/v1/relays', 'Create a destination mapping'],
            ['GET', '/v1/relay-deliveries/{id}', 'Inspect delivery status and attempts']
          ] },
          { type: 'callout', text: 'Resource IDs are opaque and case-sensitive. Store the exact value returned by the API and never derive meaning from its prefix.' }
        ]
      },
      {
        id: 'request-conventions',
        title: 'Request conventions',
        blocks: [
          { type: 'list', items: [
            { title: 'Idempotency', text: 'Include Idempotency-Key on create requests. Reusing a key with a different body returns a conflict.' },
            { title: 'Expansion', text: 'Use include only for related resources required by the current operation to keep payloads small.' },
            { title: 'Filtering', text: 'Use documented filter fields; unknown filters fail instead of being silently ignored.' },
            { title: 'Correlation', text: 'Record Identra-Request-Id from every response for support and distributed tracing.' }
          ] },
          { type: 'table', headers: ['Header', 'Direction', 'Description'], rows: [
            ['Authorization', 'Request', 'Secret Bearer credential'],
            ['Identra-Version', 'Request', 'Pinned API contract date'],
            ['Idempotency-Key', 'Request', 'Stable key for a logical write'],
            ['Identra-Request-Id', 'Response', 'Unique request correlation ID'],
            ['Retry-After', 'Response', 'Delay before retrying a rate-limited request']
          ] }
        ]
      },
      {
        id: 'pagination-and-rate-limits',
        title: 'Pagination and rate limits',
        blocks: [
          { type: 'p', text: 'List endpoints use cursor pagination. Follow links.next exactly as returned and stop when it is null. Do not construct or persist cursors as business identifiers.' },
          { type: 'list', items: [
            { title: 'Page size', text: 'Use page[size] within the documented maximum; smaller pages reduce tail latency.' },
            { title: 'Rate limits', text: 'A 429 response means the current credential or account exceeded a limit.' },
            { title: 'Backoff', text: 'Honor Retry-After, add jitter, and cap retries to protect both systems.' },
            { title: 'Concurrency', text: 'Limit parallel list requests instead of opening one request per resource.' }
          ] }
        ]
      },
      {
        id: 'errors',
        title: 'Errors',
        blocks: [
          { type: 'p', text: 'Non-2xx responses use a structured errors array. Log the request ID and stable error code; show users a localized message that does not expose internal validation or risk details.' },
          { type: 'code', language: 'json', fileName: 'error.json', code: errorResponseCode },
          { type: 'table', headers: ['Status', 'Meaning', 'Retry'], rows: [
            ['400 / 422', 'Malformed or invalid request', 'No; correct the request'],
            ['401 / 403', 'Invalid credential or insufficient permission', 'No; fix access configuration'],
            ['404', 'Resource does not exist in this environment', 'No; verify ID and environment'],
            ['409', 'State or idempotency conflict', 'Fetch current state first'],
            ['429', 'Rate limit exceeded', 'Yes; honor Retry-After'],
            ['5xx', 'Temporary Identra failure', 'Yes; exponential backoff with jitter']
          ] }
        ]
      },
      {
        id: 'webhooks',
        title: 'Webhooks',
        blocks: [
          { type: 'p', text: 'Webhook endpoints must accept duplicate and out-of-order events. Verify the signature against the unmodified request body, reject stale timestamps, then enqueue processing before returning a 2xx response.' },
          { type: 'code', language: 'javascript', fileName: 'verifyWebhook.js', code: verifyWebhookCode },
          { type: 'callout', text: 'A valid signature proves delivery by Identra, not that the resource is still in the event state. Fetch the current resource before applying side effects.' }
        ]
      }
    ]
  },
  es: {
    title: 'Referencia API',
    category: 'retrieving',
    sections: [
      {
        id: 'api-basics',
        title: 'Fundamentos de la API',
        blocks: [
          { type: 'p', text: 'La API de Identra es una API REST JSON sobre HTTPS. Las URL son estables dentro de una versión fijada, los cuerpos usan UTF-8 y las fechas siguen ISO 8601 en UTC.' },
          { type: 'code', language: 'bash', fileName: 'request.sh', code: apiRequestCode },
          { type: 'list', items: [
            { title: 'URL base', text: 'Usa https://api.withidentra.com/v1 en los entornos de pruebas y producción; la clave selecciona el entorno.' },
            { title: 'Autenticación', text: 'Envía la clave secreta como token Bearer en Authorization.' },
            { title: 'Versionado', text: 'Envía Identra-Version en cada solicitud y cámbiala solo después de probar compatibilidad.' },
            { title: 'Tipo de contenido', text: 'Envía Content-Type: application/json cuando la solicitud tenga cuerpo.' }
          ] }
        ]
      },
      {
        id: 'resource-endpoints',
        title: 'Puntos de acceso principales',
        blocks: [
          { type: 'table', headers: ['Método', 'Ruta', 'Finalidad'], rows: [
            ['POST', '/v1/inquiries', 'Crear una sesión de verificación'],
            ['GET', '/v1/inquiries/{id}', 'Consultar estado, comprobaciones y decisión'],
            ['POST', '/v1/transactions', 'Enviar un evento de cuenta o dinero'],
            ['GET', '/v1/transactions/{id}', 'Consultar evaluación y recomendación'],
            ['POST', '/v1/relays', 'Crear un mapeo de destino'],
            ['GET', '/v1/relay-deliveries/{id}', 'Revisar estado e intentos de entrega']
          ] },
          { type: 'callout', text: 'Los ID son opacos y distinguen mayúsculas. Guarda el valor exacto de la API y no deduzcas significado de su prefijo.' }
        ]
      },
      {
        id: 'request-conventions',
        title: 'Convenciones de solicitudes',
        blocks: [
          { type: 'list', items: [
            { title: 'Idempotencia', text: 'Incluye Idempotency-Key al crear. Reutilizar una clave con otro cuerpo devuelve conflicto.' },
            { title: 'Expansión', text: 'Usa include solo para relaciones necesarias y mantén pequeño el contenido devuelto.' },
            { title: 'Filtros', text: 'Usa campos documentados; un filtro desconocido produce error.' },
            { title: 'Correlación', text: 'Registra Identra-Request-Id para soporte y trazabilidad.' }
          ] },
          { type: 'table', headers: ['Cabecera', 'Dirección', 'Descripción'], rows: [
            ['Authorization', 'Solicitud', 'Credencial Bearer secreta'],
            ['Identra-Version', 'Solicitud', 'Fecha del contrato API'],
            ['Idempotency-Key', 'Solicitud', 'Clave estable para una escritura lógica'],
            ['Identra-Request-Id', 'Respuesta', 'ID único de correlación'],
            ['Retry-After', 'Respuesta', 'Espera antes de reintentar']
          ] }
        ]
      },
      {
        id: 'pagination-and-rate-limits',
        title: 'Paginación y límites',
        blocks: [
          { type: 'p', text: 'Las listas usan paginación por cursor. Sigue links.next tal como se devuelve y detente cuando sea null. No uses cursores como identificadores de negocio.' },
          { type: 'list', items: [
            { title: 'Tamaño', text: 'Usa page[size] dentro del máximo; páginas pequeñas reducen la latencia final.' },
            { title: 'Límites', text: 'Un 429 indica que la credencial o cuenta superó un límite.' },
            { title: 'Espera', text: 'Respeta Retry-After, añade variación y limita el número de reintentos.' },
            { title: 'Concurrencia', text: 'Limita solicitudes paralelas en vez de abrir una por recurso.' }
          ] }
        ]
      },
      {
        id: 'errors',
        title: 'Errores',
        blocks: [
          { type: 'p', text: 'Las respuestas no 2xx incluyen un array errors. Registra el ID de solicitud y el código estable; muestra al usuario un mensaje localizado sin detalles internos de riesgo.' },
          { type: 'code', language: 'json', fileName: 'error.json', code: errorResponseCode },
          { type: 'table', headers: ['Estado', 'Significado', 'Reintento'], rows: [
            ['400 / 422', 'Solicitud inválida', 'No; corrige la solicitud'],
            ['401 / 403', 'Credencial o permiso inválido', 'No; corrige el acceso'],
            ['404', 'Recurso inexistente en el entorno', 'No; verifica ID y entorno'],
            ['409', 'Conflicto de estado o idempotencia', 'Consulta primero el estado'],
            ['429', 'Límite superado', 'Sí; respeta Retry-After'],
            ['5xx', 'Fallo temporal de Identra', 'Sí; espera exponencial con variación']
          ] }
        ]
      },
      {
        id: 'webhooks',
        title: 'Eventos entrantes',
        blocks: [
          { type: 'p', text: 'El punto de acceso debe aceptar eventos duplicados y desordenados. Verifica la firma sobre el cuerpo original, rechaza fechas antiguas y encola el proceso antes de responder 2xx.' },
          { type: 'code', language: 'javascript', fileName: 'verifyWebhook.js', code: verifyWebhookCode },
          { type: 'callout', text: 'Una firma válida demuestra que Identra envió el evento, no que el recurso conserve ese estado. Consulta el recurso actual antes de producir efectos.' }
        ]
      }
    ]
  },
  ja: {
    title: 'APIリファレンス',
    category: 'retrieving',
    sections: [
      {
        id: 'api-basics',
        title: 'APIの基本',
        blocks: [
          { type: 'p', text: 'Identra APIはHTTPS上のJSON REST APIです。固定したAPIバージョン内ではリソースURLが安定し、本文はUTF-8、時刻はUTCのISO 8601形式を使用します。' },
          { type: 'code', language: 'bash', fileName: 'request.sh', code: apiRequestCode },
          { type: 'list', items: [
            { title: 'ベースURL', text: 'Sandboxと本番環境でhttps://api.withidentra.com/v1を使い、APIキーで環境を選択します。' },
            { title: '認証', text: '秘密のAPIキーをAuthorizationヘッダーのBearerトークンとして送信します。' },
            { title: 'バージョン管理', text: '全リクエストでIdentra-Versionを送り、互換性テスト後にだけ更新します。' },
            { title: 'コンテンツ形式', text: '本文を持つリクエストではContent-Type: application/jsonを送信します。' }
          ] }
        ]
      },
      {
        id: 'resource-endpoints',
        title: '主要エンドポイント',
        blocks: [
          { type: 'table', headers: ['メソッド', 'パス', '用途'], rows: [
            ['POST', '/v1/inquiries', '検証セッションを作成'],
            ['GET', '/v1/inquiries/{id}', '状態、チェック、判定を取得'],
            ['POST', '/v1/transactions', 'アカウントまたは資金移動イベントを送信'],
            ['GET', '/v1/transactions/{id}', '評価と推奨を取得'],
            ['POST', '/v1/relays', '送信先の項目対応を作成'],
            ['GET', '/v1/relay-deliveries/{id}', '配信状態と試行を確認']
          ] },
          { type: 'callout', text: 'リソースIDは不透明で大文字小文字を区別します。APIから返された値をそのまま保存し、接頭辞から意味を推測しないでください。' }
        ]
      },
      {
        id: 'request-conventions',
        title: 'リクエスト規約',
        blocks: [
          { type: 'list', items: [
            { title: '冪等性', text: '作成リクエストにIdempotency-Keyを含めます。異なる本文で同じキーを再利用すると競合になります。' },
            { title: '展開', text: '現在の操作に必要な関連リソースだけをincludeで指定し、応答データを小さく保ちます。' },
            { title: '絞り込み', text: '文書化されたフィルターだけを使い、不明なフィルターはエラーとして処理します。' },
            { title: '相関', text: 'サポート対応と分散追跡のためIdentra-Request-Idを記録します。' }
          ] },
          { type: 'table', headers: ['ヘッダー', '方向', '説明'], rows: [
            ['Authorization', 'リクエスト', '秘密のBearer認証情報'],
            ['Identra-Version', 'リクエスト', '固定したAPI契約の日付'],
            ['Idempotency-Key', 'リクエスト', '論理的な書き込みに使う安定したキー'],
            ['Identra-Request-Id', 'レスポンス', '一意なリクエスト相関ID'],
            ['Retry-After', 'レスポンス', '流量制限後の待機時間']
          ] }
        ]
      },
      {
        id: 'pagination-and-rate-limits',
        title: 'ページ分割と流量制限',
        blocks: [
          { type: 'p', text: '一覧エンドポイントはカーソル方式のページ分割を使います。返されたlinks.nextをそのまま利用し、nullで停止します。カーソルを業務IDとして保存しないでください。' },
          { type: 'list', items: [
            { title: 'ページサイズ', text: '上限内のpage[size]を使い、小さなページで末尾遅延を抑えます。' },
            { title: '流量制限', text: '429は認証情報またはアカウントが上限を超えたことを示します。' },
            { title: '再試行の待機', text: 'Retry-Afterに従い、ランダムな揺らぎを加えて再試行回数を制限します。' },
            { title: '並行処理', text: 'リソースごとにリクエストを開かず、同時に送る一覧リクエスト数を制限します。' }
          ] }
        ]
      },
      {
        id: 'errors',
        title: 'エラー',
        blocks: [
          { type: 'p', text: '2xx以外のレスポンスは構造化されたerrors配列を返します。リクエストIDと安定したエラーコードを記録し、内部の検証やリスク詳細を含まない翻訳済みメッセージを表示します。' },
          { type: 'code', language: 'json', fileName: 'error.json', code: errorResponseCode },
          { type: 'table', headers: ['状態', '意味', '再試行'], rows: [
            ['400 / 422', '形式または値が不正', '不可。リクエストを修正'],
            ['401 / 403', '認証または権限が不正', '不可。アクセス設定を修正'],
            ['404', '現在の環境にリソースがない', '不可。IDと環境を確認'],
            ['409', '状態または冪等性の競合', '現在状態を先に取得'],
            ['429', '流量制限超過', '可。Retry-Afterに従う'],
            ['5xx', 'Identraの一時障害', '可。待機時間を指数的に延ばし、ランダムな揺らぎを加える']
          ] }
        ]
      },
      {
        id: 'webhooks',
        title: 'イベント通知',
        blocks: [
          { type: 'p', text: 'Webhookエンドポイントは重複や順不同のイベントを受け入れる必要があります。未加工のリクエスト本文で署名を検証し、古いタイムスタンプを拒否し、処理を待ち行列へ入れてから2xxを返します。' },
          { type: 'code', language: 'javascript', fileName: 'verifyWebhook.js', code: verifyWebhookCode },
          { type: 'callout', text: '有効な署名はIdentraからの配信を証明しますが、リソースが今もイベント記載の状態とは限りません。副作用前に最新リソースを取得してください。' }
        ]
      }
    ]
  },
  de: {
    title: 'API-Referenz',
    category: 'retrieving',
    sections: [
      {
        id: 'api-basics',
        title: 'API-Grundlagen',
        blocks: [
          { type: 'p', text: 'Die Identra API ist eine JSON-REST-API über HTTPS. Ressourcen-URLs bleiben innerhalb einer festgelegten Version stabil, Inhalte verwenden UTF-8 und Zeitangaben ISO 8601 in UTC.' },
          { type: 'code', language: 'bash', fileName: 'request.sh', code: apiRequestCode },
          { type: 'list', items: [
            { title: 'Basis-URL', text: 'Nutzen Sie https://api.withidentra.com/v1 für Test- und Produktivumgebung; der API-Schlüssel wählt die Umgebung.' },
            { title: 'Authentifizierung', text: 'Senden Sie den geheimen API-Schlüssel als Bearer-Token im Authorization-Header.' },
            { title: 'Versionierung', text: 'Senden Sie Identra-Version bei jeder Anfrage und aktualisieren Sie erst nach Kompatibilitätstests.' },
            { title: 'Inhaltstyp', text: 'Anfragen mit Inhalt senden Content-Type: application/json.' }
          ] }
        ]
      },
      {
        id: 'resource-endpoints',
        title: 'Zentrale API-Endpunkte',
        blocks: [
          { type: 'table', headers: ['Methode', 'Pfad', 'Zweck'], rows: [
            ['POST', '/v1/inquiries', 'Verifizierungssitzung erstellen'],
            ['GET', '/v1/inquiries/{id}', 'Status, Prüfungen und Entscheidung laden'],
            ['POST', '/v1/transactions', 'Konto- oder Geldbewegung senden'],
            ['GET', '/v1/transactions/{id}', 'Bewertung und Empfehlung laden'],
            ['POST', '/v1/relays', 'Zielfeldzuordnung erstellen'],
            ['GET', '/v1/relay-deliveries/{id}', 'Zustellstatus und Versuche prüfen']
          ] },
          { type: 'callout', text: 'Ressourcen-IDs sind undurchsichtig und unterscheiden Groß- und Kleinschreibung. Speichern Sie den exakten API-Wert und leiten Sie nichts aus dem Präfix ab.' }
        ]
      },
      {
        id: 'request-conventions',
        title: 'Konventionen für Anfragen',
        blocks: [
          { type: 'list', items: [
            { title: 'Idempotenz', text: 'Idempotency-Key bei Erstellung senden. Derselbe Schlüssel mit anderem Inhalt führt zum Konflikt.' },
            { title: 'Erweiterung', text: 'include nur für benötigte Beziehungen verwenden und Antwortdaten klein halten.' },
            { title: 'Filter', text: 'Nur dokumentierte Filter verwenden; unbekannte Filter schlagen sichtbar fehl.' },
            { title: 'Korrelation', text: 'Identra-Request-Id für Unterstützung und verteilte Nachverfolgung speichern.' }
          ] },
          { type: 'table', headers: ['Kopfzeile', 'Richtung', 'Beschreibung'], rows: [
            ['Authorization', 'Anfrage', 'Geheime Bearer-Berechtigung'],
            ['Identra-Version', 'Anfrage', 'Datum des API-Vertrags'],
            ['Idempotency-Key', 'Anfrage', 'Stabiler Schlüssel einer logischen Schreiboperation'],
            ['Identra-Request-Id', 'Antwort', 'Eindeutige Korrelations-ID der Anfrage'],
            ['Retry-After', 'Antwort', 'Wartezeit vor erneutem Versuch']
          ] }
        ]
      },
      {
        id: 'pagination-and-rate-limits',
        title: 'Paginierung und Limits',
        blocks: [
          { type: 'p', text: 'Listen verwenden Cursor-Paginierung. Folgen Sie links.next unverändert und stoppen Sie bei null. Cursor sind keine dauerhaften Geschäftskennungen.' },
          { type: 'list', items: [
            { title: 'Seitengröße', text: 'page[size] innerhalb des Maximums verwenden; kleinere Seiten senken die Endlatenz.' },
            { title: 'Limits', text: '429 bedeutet, dass Zugang oder Konto ein Limit überschritten hat.' },
            { title: 'Wartezeit', text: 'Retry-After beachten, eine zufällige Abweichung ergänzen und Wiederholungen begrenzen.' },
            { title: 'Parallelität', text: 'Parallele Listenanfragen begrenzen statt je Ressource eine Anfrage zu öffnen.' }
          ] }
        ]
      },
      {
        id: 'errors',
        title: 'Fehler',
        blocks: [
          { type: 'p', text: 'Nicht-2xx-Antworten enthalten ein strukturiertes errors-Array. Protokollieren Sie Anfrage-ID und stabilen Fehlercode; zeigen Sie Nutzern eine lokalisierte Meldung ohne interne Risikoangaben.' },
          { type: 'code', language: 'json', fileName: 'error.json', code: errorResponseCode },
          { type: 'table', headers: ['Status', 'Bedeutung', 'Wiederholung'], rows: [
            ['400 / 422', 'Fehlerhafte oder ungültige Anfrage', 'Nein; Anfrage korrigieren'],
            ['401 / 403', 'Ungültiger Zugang oder fehlende Rechte', 'Nein; Zugriff korrigieren'],
            ['404', 'Ressource nicht in dieser Umgebung', 'Nein; ID und Umgebung prüfen'],
            ['409', 'Status- oder Idempotenzkonflikt', 'Zuerst aktuellen Status laden'],
            ['429', 'Anfragelimit überschritten', 'Ja; Retry-After beachten'],
            ['5xx', 'Vorübergehender Identra-Fehler', 'Ja; Wartezeit exponentiell erhöhen und zufällig variieren']
          ] }
        ]
      },
      {
        id: 'webhooks',
        title: 'Ereignisbenachrichtigungen',
        blocks: [
          { type: 'p', text: 'Webhook-Endpunkte müssen doppelte und ungeordnete Ereignisse akzeptieren. Prüfen Sie die Signatur am unveränderten Inhalt, verwerfen Sie alte Zeitstempel und stellen Sie die Verarbeitung vor der 2xx-Antwort in eine Warteschlange.' },
          { type: 'code', language: 'javascript', fileName: 'verifyWebhook.js', code: verifyWebhookCode },
          { type: 'callout', text: 'Eine gültige Signatur belegt die Zustellung durch Identra, nicht den aktuellen Ressourcenstatus. Laden Sie die Ressource vor Seiteneffekten erneut.' }
        ]
      }
    ]
  },
  vi: {
    title: 'Tham chiếu API',
    category: 'retrieving',
    sections: [
      {
        id: 'api-basics',
        title: 'Kiến thức API cơ bản',
        blocks: [
          { type: 'p', text: 'Identra cung cấp REST API dùng JSON qua HTTPS. URL tài nguyên ổn định trong một phiên bản API đã cố định, phần thân yêu cầu và phản hồi dùng UTF-8, còn thời gian dùng ISO 8601 theo UTC.' },
          { type: 'code', language: 'bash', fileName: 'request.sh', code: apiRequestCode },
          { type: 'list', items: [
            { title: 'URL gốc', text: 'Dùng https://api.withidentra.com/v1 cho cả môi trường thử nghiệm và môi trường thật; khóa API xác định môi trường.' },
            { title: 'Xác thực', text: 'Gửi khóa API bí mật dưới dạng mã Bearer trong trường Authorization.' },
            { title: 'Quản lý phiên bản', text: 'Gửi Identra-Version trong mọi yêu cầu và chỉ cập nhật sau khi kiểm thử tương thích.' },
            { title: 'Loại nội dung', text: 'Gửi Content-Type: application/json cho những yêu cầu có phần thân.' }
          ] }
        ]
      },
      {
        id: 'resource-endpoints',
        title: 'Các điểm cuối API chính',
        blocks: [
          { type: 'table', headers: ['Phương thức', 'Đường dẫn', 'Mục đích'], rows: [
            ['POST', '/v1/inquiries', 'Tạo phiên xác minh'],
            ['GET', '/v1/inquiries/{id}', 'Lấy trạng thái, kết quả kiểm tra và quyết định'],
            ['POST', '/v1/transactions', 'Gửi sự kiện tài khoản hoặc dòng tiền'],
            ['GET', '/v1/transactions/{id}', 'Lấy đánh giá và khuyến nghị'],
            ['POST', '/v1/relays', 'Tạo ánh xạ cho hệ thống đích'],
            ['GET', '/v1/relay-deliveries/{id}', 'Kiểm tra trạng thái và số lần chuyển']
          ] },
          { type: 'callout', text: 'ID tài nguyên là chuỗi không mang ý nghĩa nghiệp vụ và phân biệt chữ hoa, chữ thường. Hãy lưu đúng giá trị API trả về và không suy diễn từ tiền tố.' }
        ]
      },
      {
        id: 'request-conventions',
        title: 'Quy ước gửi yêu cầu',
        blocks: [
          { type: 'list', items: [
            { title: 'Tính lũy đẳng', text: 'Gửi Idempotency-Key khi tạo tài nguyên. Dùng lại khóa với phần thân khác sẽ trả về xung đột.' },
            { title: 'Mở rộng dữ liệu', text: 'Chỉ dùng include cho những tài nguyên liên quan thực sự cần trong thao tác hiện tại.' },
            { title: 'Bộ lọc', text: 'Chỉ dùng trường lọc đã được tài liệu hóa; bộ lọc không hợp lệ sẽ báo lỗi rõ ràng.' },
            { title: 'Đối soát', text: 'Lưu Identra-Request-Id của mọi phản hồi để hỗ trợ và theo dõi phân tán.' }
          ] },
          { type: 'table', headers: ['Trường đầu', 'Chiều', 'Mô tả'], rows: [
            ['Authorization', 'Yêu cầu', 'Thông tin xác thực Bearer bí mật'],
            ['Identra-Version', 'Yêu cầu', 'Ngày phiên bản hợp đồng API'],
            ['Idempotency-Key', 'Yêu cầu', 'Khóa ổn định cho một thao tác ghi logic'],
            ['Identra-Request-Id', 'Phản hồi', 'ID đối soát duy nhất của yêu cầu'],
            ['Retry-After', 'Phản hồi', 'Thời gian chờ trước khi gửi lại']
          ] }
        ]
      },
      {
        id: 'pagination-and-rate-limits',
        title: 'Phân trang và giới hạn tốc độ',
        blocks: [
          { type: 'p', text: 'Điểm cuối dạng danh sách dùng phân trang bằng con trỏ. Đi theo links.next đúng như phản hồi trả về và dừng khi giá trị là null. Không dùng con trỏ làm ID nghiệp vụ.' },
          { type: 'list', items: [
            { title: 'Kích thước trang', text: 'Dùng page[size] trong giới hạn tài liệu; trang nhỏ giúp giảm độ trễ ở cuối truy vấn.' },
            { title: 'Giới hạn tốc độ', text: 'Phản hồi 429 cho biết khóa hoặc tài khoản đã vượt giới hạn.' },
            { title: 'Thời gian chờ', text: 'Tuân theo Retry-After, thêm độ lệch ngẫu nhiên và giới hạn số lần thử lại.' },
            { title: 'Đồng thời', text: 'Giới hạn số yêu cầu danh sách song song thay vì mở một yêu cầu cho mỗi tài nguyên.' }
          ] }
        ]
      },
      {
        id: 'errors',
        title: 'Lỗi API',
        blocks: [
          { type: 'p', text: 'Phản hồi không thuộc nhóm 2xx trả về mảng errors có cấu trúc. Ghi lại ID yêu cầu và mã lỗi ổn định; hiển thị thông báo đã bản địa hóa mà không làm lộ chi tiết xác thực hoặc rủi ro nội bộ.' },
          { type: 'code', language: 'json', fileName: 'error.json', code: errorResponseCode },
          { type: 'table', headers: ['Trạng thái', 'Ý nghĩa', 'Gửi lại'], rows: [
            ['400 / 422', 'Yêu cầu sai cấu trúc hoặc dữ liệu', 'Không; sửa yêu cầu'],
            ['401 / 403', 'Khóa không hợp lệ hoặc thiếu quyền', 'Không; sửa cấu hình truy cập'],
            ['404', 'Không có tài nguyên trong môi trường này', 'Không; kiểm tra ID và môi trường'],
            ['409', 'Xung đột trạng thái hoặc lũy đẳng', 'Lấy trạng thái hiện tại trước'],
            ['429', 'Vượt giới hạn tốc độ', 'Có; tuân theo Retry-After'],
            ['5xx', 'Lỗi Identra tạm thời', 'Có; chờ tăng dần kèm độ lệch ngẫu nhiên']
          ] }
        ]
      },
      {
        id: 'webhooks',
        title: 'Sự kiện gửi về',
        blocks: [
          { type: 'p', text: 'Điểm cuối nhận sự kiện phải chấp nhận sự kiện trùng và không đúng thứ tự. Xác minh chữ ký trên phần thân chưa chỉnh sửa, từ chối dấu thời gian quá cũ rồi đưa sự kiện vào hàng đợi trước khi trả phản hồi 2xx.' },
          { type: 'code', language: 'javascript', fileName: 'verifyWebhook.js', code: verifyWebhookCode },
          { type: 'callout', text: 'Chữ ký hợp lệ chứng minh sự kiện do Identra gửi, không đảm bảo tài nguyên vẫn còn ở trạng thái trong sự kiện. Hãy lấy tài nguyên mới nhất trước khi tạo tác động phụ.' }
        ]
      }
    ]
  }
} satisfies LocalizedDocsContent;
