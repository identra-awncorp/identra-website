/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const DEMO_SCENARIO_ACTION_TRANSLATIONS: any = {
  en: {
    backToScenarios: 'Back to Scenarios',
    liveBadge: 'Live interactive demo page',
    resetDemo: 'Reset Demo',
    clientEmulator: 'Client interface emulator',
    flowTitle: 'Identity Verification',
    coreVersion: 'CORE v2.8',
    riskLevel: 'Risk Level',
    trustScore: 'Trust Score',
    systemState: 'System State',
    safeLow: 'SAFE / LOW',
    evaluating: 'EVALUATING',
    analyzing: 'ANALYZING',
    approved: 'APPROVED',
    active: 'Active',
    pass: 'Pass',
    task: 'Task: {action}',
    underlyingChecks: 'Underlying system checks',
    transactionComplete: 'TRANSACTION COMPLETE',
    waitingInput: 'WAITING FOR INPUT',
    viewVerdict: 'View Verdict',
    runAgain: 'Run Again',
    ledgerTitle: 'Secure sandbox log transactions',
    logs: {
      launch: '[SYSTEM] Launched live interactive demo page: {title}',
      environment: '[ENVIRONMENT] Provisioning active frontend sandbox context...',
      instruction: '[INSTRUCTION] Follow interactive tasks in the left panel to trigger identity verification.',
      reset: '[SYSTEM] Reset interactive demo page: {title}',
      resetInstruction: '[INSTRUCTION] Follow tasks in the left panel to trigger identity verification.',
      completedLayer: 'Completed verification layer: {label}',
      nextTask: 'Next task: {action}',
      allPassed: 'All identity verification stages passed successfully!',
      sealed: 'Cryptographic verification credentials signed and sealed.'
    },
    subChecks: {
      'bank-account': [
        ['Profile Integrity Check', 'Synthetic Identity Sweep', 'Regional Credit Verification'],
        ['Cryptographic Watermark Audit', '2D Barcode and MRZ Decoding', 'Document Expiry Analysis'],
        ['3D Depth Liveness Assessment', 'Passive Reflection Matcher', 'Face-to-ID Similarity Audit (99.8%)'],
        ['OFAC Sanctions Registry Scan', 'PEP List Database Screening', 'Interpol Red Notices Query']
      ],
      'apply-job': [
        ['National Register SSN Match', 'Identity Theft Database Sweep', 'Legal Employment Authorization'],
        ['University Registry Verification', 'Accreditation Status Crosscheck', 'Professional Licensure Valid (Active)'],
        ['County Court File Search', 'Federal Registry Database Match', 'Sex Offender Registry Sweep']
      ],
      'ticket-booking': [
        ['WebGL Canvas Fingerprint', 'Mouse Motion Entropy Matcher', 'Headless Browser Detector'],
        ['Mobile Carrier Signal Audit', 'Non-VoIP SIM Authentication', 'OTP Verification Code Match'],
        ['Fan Metadata Encryption', 'Non-transferability Lock Seal', 'Cryptographic QR Signature Stamp']
      ],
      'airlines-hotels': [
        ['NFC Antenna Connection Handshake', 'Government Certificate Audit', 'Encrypted Raw Data Read'],
        ['Selfie vs NFC Image Matcher', '300dpi Extract Photo Similarity', 'Confidence Scoring (99.9%)'],
        ['Flight Passenger List Sync', 'Hotel Reservation Code Check', 'Over-18 Age Attestation Stamp']
      ],
      'government-services': [
        ['National Population DB Search', 'Legal Birth Index Verification', 'Citizen Record Extraction'],
        ['Postal Utility History Scan', 'Geographical Spatial Validation', 'Residency Proof Confirmation'],
        ['RSA Private Key Generation', 'One-time Document Binding', 'Cryptographic Seal Stamp']
      ],
      healthcare: [
        ['Government ID Photo Match', 'Demographic Duplicate Scan', 'Clinical Profile Alignment'],
        ['Policy Active History Check', 'Group and Carrier Number Match', 'Real-time Insurance OCR Read'],
        ['HIPAA RSA-2048 Key Encryption', 'Interactive Signature Capture', 'Consent Attestation Hash']
      ],
      'ticket-transfer': [
        ['Original Purchase Key Audit', 'CA Issuer Signature Decryption', 'Ticket Ledger Ownership Match'],
        ['Relay Smart Contract Init', 'Atomic Escrow Fund Lock', 'Double-Spend Integrity Guard'],
        ['Atomic Swap Execution', 'Buyer Wallet Address Update', 'Escrow Settlement Release']
      ]
    }
  },
  es: {
    backToScenarios: 'Volver a escenarios',
    liveBadge: 'Página demo interactiva en vivo',
    resetDemo: 'Reiniciar demo',
    clientEmulator: 'Emulador de interfaz del cliente',
    flowTitle: 'Verificación de identidad',
    coreVersion: 'CORE v2.8',
    riskLevel: 'Nivel de riesgo',
    trustScore: 'Puntuación de confianza',
    systemState: 'Estado del sistema',
    safeLow: 'SEGURO / BAJO',
    evaluating: 'EVALUANDO',
    analyzing: 'ANALIZANDO',
    approved: 'APROBADO',
    active: 'Activo',
    pass: 'Aprobado',
    task: 'Tarea: {action}',
    underlyingChecks: 'Comprobaciones internas del sistema',
    transactionComplete: 'TRANSACCIÓN COMPLETA',
    waitingInput: 'ESPERANDO ENTRADA',
    viewVerdict: 'Ver dictamen',
    runAgain: 'Ejecutar de nuevo',
    ledgerTitle: 'Transacciones del registro seguro del sandbox',
    logs: {
      launch: '[SYSTEM] Página demo interactiva iniciada: {title}',
      environment: '[ENVIRONMENT] Preparando el contexto activo de interfaz simulada...',
      instruction: '[INSTRUCTION] Sigue las tareas del panel izquierdo para activar la verificación de identidad.',
      reset: '[SYSTEM] Página demo interactiva reiniciada: {title}',
      resetInstruction: '[INSTRUCTION] Sigue las tareas del panel izquierdo para iniciar de nuevo la verificación.',
      completedLayer: 'Capa de verificación completada: {label}',
      nextTask: 'Siguiente tarea: {action}',
      allPassed: 'Todas las etapas de verificación de identidad se aprobaron correctamente.',
      sealed: 'Credenciales criptográficas de verificación firmadas y selladas.'
    },
    subChecks: {
      'bank-account': [
        ['Comprobación de integridad del perfil', 'Barrido de identidad sintética', 'Verificación crediticia regional'],
        ['Auditoría de marca criptográfica', 'Decodificación de código 2D y MRZ', 'Análisis de vencimiento del documento'],
        ['Evaluación de vida 3D', 'Comparador de reflexión pasiva', 'Auditoría de similitud rostro-ID (99,8%)'],
        ['Escaneo del registro de sanciones OFAC', 'Filtrado de base de datos PEP', 'Consulta de alertas rojas de Interpol']
      ],
      'apply-job': [
        ['Coincidencia SSN en registro nacional', 'Barrido de base de robo de identidad', 'Autorización legal de empleo'],
        ['Verificación de registro universitario', 'Comprobación de acreditación', 'Licencia profesional válida (activa)'],
        ['Búsqueda en archivos judiciales del condado', 'Coincidencia en registro federal', 'Barrido de registro de infractores sexuales']
      ],
      'ticket-booking': [
        ['Huella WebGL Canvas', 'Comparador de entropía del movimiento del mouse', 'Detector de navegador sin interfaz'],
        ['Auditoría de señal de operador móvil', 'Autenticación SIM no VoIP', 'Coincidencia de código OTP'],
        ['Cifrado de metadatos del fan', 'Sello de bloqueo contra transferencia', 'Sello de firma QR criptográfica']
      ],
      'airlines-hotels': [
        ['Handshake de antena NFC', 'Auditoría de certificado gubernamental', 'Lectura de datos brutos cifrados'],
        ['Comparador de selfie contra imagen NFC', 'Similitud de foto extraída a 300dpi', 'Puntuación de confianza (99,9%)'],
        ['Sincronización de lista de pasajeros', 'Verificación de código de reserva de hotel', 'Sello de certificación mayor de 18']
      ],
      'government-services': [
        ['Búsqueda en base poblacional nacional', 'Verificación de índice legal de nacimiento', 'Extracción de registro ciudadano'],
        ['Escaneo de historial postal y servicios', 'Validación geoespacial', 'Confirmación de prueba de residencia'],
        ['Generación de clave privada RSA', 'Vinculación documental de un solo uso', 'Sello criptográfico']
      ],
      healthcare: [
        ['Coincidencia de foto de ID gubernamental', 'Escaneo de duplicados demográficos', 'Alineación de perfil clínico'],
        ['Revisión de póliza activa', 'Coincidencia de número de grupo y aseguradora', 'Lectura OCR de seguro en tiempo real'],
        ['Cifrado de clave HIPAA RSA-2048', 'Captura interactiva de firma', 'Hash de certificación de consentimiento']
      ],
      'ticket-transfer': [
        ['Auditoría de clave de compra original', 'Descifrado de firma del emisor CA', 'Coincidencia de propiedad en libro de entradas'],
        ['Inicio de contrato inteligente Relay', 'Bloqueo de fondos en depósito atómico', 'Protección de integridad contra doble gasto'],
        ['Ejecución de intercambio atómico', 'Actualización de billetera del comprador', 'Liberación de liquidación en depósito']
      ]
    }
  },
  ja: {
    backToScenarios: 'シナリオ一覧に戻る',
    liveBadge: 'ライブインタラクティブデモページ',
    resetDemo: 'デモをリセット',
    clientEmulator: 'クライアント画面エミュレーター',
    flowTitle: '本人確認',
    coreVersion: 'CORE v2.8',
    riskLevel: 'リスクレベル',
    trustScore: '信頼スコア',
    systemState: 'システム状態',
    safeLow: '安全 / 低',
    evaluating: '評価中',
    analyzing: '分析中',
    approved: '承認済み',
    active: '実行中',
    pass: '合格',
    task: 'タスク: {action}',
    underlyingChecks: '基盤システムチェック',
    transactionComplete: '取引完了',
    waitingInput: '入力待機中',
    viewVerdict: '判定を見る',
    runAgain: 'もう一度実行',
    ledgerTitle: '安全なSandboxログ取引',
    logs: {
      launch: '[SYSTEM] ライブインタラクティブデモを起動しました: {title}',
      environment: '[ENVIRONMENT] アクティブなフロントエンドSandbox環境を準備中...',
      instruction: '[INSTRUCTION] 左側パネルのタスクを実行して本人確認を開始してください。',
      reset: '[SYSTEM] インタラクティブデモをリセットしました: {title}',
      resetInstruction: '[INSTRUCTION] 左側パネルのタスクを実行して本人確認を再開してください。',
      completedLayer: '検証レイヤー完了: {label}',
      nextTask: '次のタスク: {action}',
      allPassed: 'すべての本人確認ステージに合格しました。',
      sealed: '暗号化された検証資格情報が署名され、封印されました。'
    },
    subChecks: {
      'bank-account': [
        ['プロフィール整合性チェック', '合成IDスイープ', '地域信用確認'],
        ['暗号透かし監査', '2DバーコードとMRZのデコード', '書類有効期限分析'],
        ['3D深度ライブネス評価', '受動反射マッチャー', '顔とIDの類似度監査（99.8%）'],
        ['OFAC制裁レジストリスキャン', 'PEPリストデータベース審査', 'Interpol赤手配照会']
      ],
      'apply-job': [
        ['国別レジストリSSN照合', 'ID盗難データベーススイープ', '合法的就労許可'],
        ['大学レジストリ検証', '認定状況クロスチェック', '専門資格有効（アクティブ）'],
        ['郡裁判所ファイル検索', '連邦レジストリデータベース照合', '性犯罪者レジストリスイープ']
      ],
      'ticket-booking': [
        ['WebGL Canvas指紋', 'マウス動作エントロピーマッチャー', 'ヘッドレスブラウザ検出'],
        ['携帯キャリア信号監査', '非VoIP SIM認証', 'OTP確認コード照合'],
        ['ファンメタデータ暗号化', '譲渡不可ロックシール', '暗号QR署名スタンプ']
      ],
      'airlines-hotels': [
        ['NFCアンテナ接続ハンドシェイク', '政府証明書監査', '暗号化生データ読み取り'],
        ['セルフィーとNFC画像の照合', '300dpi抽出写真類似度', '信頼スコアリング（99.9%）'],
        ['搭乗者リスト同期', 'ホテル予約コード確認', '18歳以上証明スタンプ']
      ],
      'government-services': [
        ['国民人口DB検索', '法的出生インデックス検証', '市民記録抽出'],
        ['郵便・公共料金履歴スキャン', '地理空間検証', '居住証明確認'],
        ['RSA秘密鍵生成', '一回限りの書類バインド', '暗号シールスタンプ']
      ],
      healthcare: [
        ['政府発行ID写真照合', '人口統計重複スキャン', '臨床プロフィール整合'],
        ['有効な保険履歴確認', 'グループ番号と保険者番号の照合', '保険OCRリアルタイム読み取り'],
        ['HIPAA RSA-2048鍵暗号化', 'インタラクティブ署名取得', '同意証明ハッシュ']
      ],
      'ticket-transfer': [
        ['元購入キー監査', 'CA発行者署名復号', 'チケット台帳所有権照合'],
        ['Relayスマートコントラクト初期化', 'アトミックエスクロー資金ロック', '二重使用整合性ガード'],
        ['アトミックスワップ実行', '購入者ウォレットアドレス更新', 'エスクロー決済解除']
      ]
    }
  },
  de: {
    backToScenarios: 'Zurück zu Szenarien',
    liveBadge: 'Live-interaktive Demo-Seite',
    resetDemo: 'Demo zurücksetzen',
    clientEmulator: 'Emulator der Kundenoberfläche',
    flowTitle: 'Identitätsverifizierung',
    coreVersion: 'CORE v2.8',
    riskLevel: 'Risikostufe',
    trustScore: 'Vertrauensscore',
    systemState: 'Systemstatus',
    safeLow: 'SICHER / NIEDRIG',
    evaluating: 'BEWERTUNG',
    analyzing: 'ANALYSE',
    approved: 'GENEHMIGT',
    active: 'Aktiv',
    pass: 'Bestanden',
    task: 'Aufgabe: {action}',
    underlyingChecks: 'Interne Systemprüfungen',
    transactionComplete: 'TRANSAKTION ABGESCHLOSSEN',
    waitingInput: 'WARTET AUF EINGABE',
    viewVerdict: 'Urteil ansehen',
    runAgain: 'Erneut ausführen',
    ledgerTitle: 'Sichere Sandbox-Logtransaktionen',
    logs: {
      launch: '[SYSTEM] Live-interaktive Demo-Seite gestartet: {title}',
      environment: '[ENVIRONMENT] Aktiver Frontend-Sandbox-Kontext wird bereitgestellt...',
      instruction: '[INSTRUCTION] Folgen Sie den Aufgaben im linken Bereich, um die Identitätsverifizierung auszulösen.',
      reset: '[SYSTEM] Interaktive Demo-Seite zurückgesetzt: {title}',
      resetInstruction: '[INSTRUCTION] Folgen Sie den Aufgaben im linken Bereich, um die Verifizierung erneut zu starten.',
      completedLayer: 'Verifizierungsebene abgeschlossen: {label}',
      nextTask: 'Nächste Aufgabe: {action}',
      allPassed: 'Alle Phasen der Identitätsverifizierung wurden erfolgreich bestanden.',
      sealed: 'Kryptografische Verifizierungsnachweise wurden signiert und versiegelt.'
    },
    subChecks: {
      'bank-account': [
        ['Profilintegritätsprüfung', 'Prüfung auf synthetische Identität', 'Regionale Kreditverifizierung'],
        ['Kryptografische Wasserzeichenprüfung', '2D-Barcode- und MRZ-Dekodierung', 'Analyse des Dokumentenablaufs'],
        ['3D-Tiefen-Liveness-Bewertung', 'Passiver Reflexionsabgleich', 'Gesicht-zu-ID-Ähnlichkeitsprüfung (99,8%)'],
        ['OFAC-Sanktionsregisterscan', 'PEP-Listendatenbankprüfung', 'Interpol-Red-Notice-Abfrage']
      ],
      'apply-job': [
        ['SSN-Abgleich im nationalen Register', 'Identitätsdiebstahl-Datenbanksweep', 'Rechtliche Arbeitserlaubnis'],
        ['Universitätsregister-Verifizierung', 'Akkreditierungsstatus-Abgleich', 'Berufszulassung gültig (aktiv)'],
        ['Suche in Kreisgerichtsakten', 'Bundesregister-Datenbankabgleich', 'Sweep im Sexualstraftäterregister']
      ],
      'ticket-booking': [
        ['WebGL-Canvas-Fingerprint', 'Mausbewegungs-Entropieabgleich', 'Headless-Browser-Erkennung'],
        ['Mobilfunkanbieter-Signalaudit', 'Nicht-VoIP-SIM-Authentifizierung', 'OTP-Verifizierungscode-Abgleich'],
        ['Verschlüsselung von Fan-Metadaten', 'Nichtübertragbarkeits-Locksiegel', 'Kryptografischer QR-Signaturstempel']
      ],
      'airlines-hotels': [
        ['NFC-Antennenverbindungs-Handshake', 'Behördliche Zertifikatsprüfung', 'Verschlüsselte Rohdatenlesung'],
        ['Selfie-gegen-NFC-Bildabgleich', '300dpi-Fotoähnlichkeit', 'Konfidenzbewertung (99,9%)'],
        ['Synchronisierung der Passagierliste', 'Hotelreservierungscode-Prüfung', 'Über-18-Altersnachweisstempel']
      ],
      'government-services': [
        ['Suche in nationaler Bevölkerungsdatenbank', 'Verifizierung des Geburtsindex', 'Extraktion des Bürgerdatensatzes'],
        ['Scan von Post- und Versorgungsverlauf', 'Georäumliche Validierung', 'Bestätigung des Wohnsitznachweises'],
        ['RSA-Privatschlüsselgenerierung', 'Einmalige Dokumentbindung', 'Kryptografischer Siegelstempel']
      ],
      healthcare: [
        ['Fotoabgleich mit staatlicher ID', 'Demografischer Dublettenscan', 'Abgleich des klinischen Profils'],
        ['Prüfung aktiver Policenhistorie', 'Abgleich von Gruppen- und Versicherernummer', 'Echtzeit-OCR der Versicherung'],
        ['HIPAA RSA-2048-Schlüsselverschlüsselung', 'Interaktive Signaturerfassung', 'Hash des Einwilligungsnachweises']
      ],
      'ticket-transfer': [
        ['Audit des ursprünglichen Kaufschlüssels', 'Entschlüsselung der CA-Ausstellersignatur', 'Abgleich des Ticketeigentums im Ledger'],
        ['Relay-Smart-Contract-Initialisierung', 'Atomare Escrow-Fondssperre', 'Integritätsschutz gegen Double-Spend'],
        ['Ausführung des atomaren Tauschs', 'Aktualisierung der Käufer-Wallet-Adresse', 'Freigabe der Escrow-Abwicklung']
      ]
    }
  },
  vi: {
    backToScenarios: 'Quay lại danh sách kịch bản',
    liveBadge: 'Trang demo tương tác trực tiếp',
    resetDemo: 'Đặt lại demo',
    clientEmulator: 'Mô phỏng giao diện khách hàng',
    flowTitle: 'Xác minh danh tính',
    coreVersion: 'CORE v2.8',
    riskLevel: 'Mức rủi ro',
    trustScore: 'Điểm tin cậy',
    systemState: 'Trạng thái hệ thống',
    safeLow: 'AN TOÀN / THẤP',
    evaluating: 'ĐANG ĐÁNH GIÁ',
    analyzing: 'ĐANG PHÂN TÍCH',
    approved: 'ĐÃ PHÊ DUYỆT',
    active: 'Đang chạy',
    pass: 'Đạt',
    task: 'Nhiệm vụ: {action}',
    underlyingChecks: 'Mô-đun kiểm tra chuyên sâu',
    transactionComplete: 'GIAO DỊCH HOÀN TẤT',
    waitingInput: 'ĐANG CHỜ TƯƠNG TÁC',
    viewVerdict: 'Xem kết luận',
    runAgain: 'Chạy lại',
    ledgerTitle: 'Giao dịch nhật ký sandbox bảo mật',
    logs: {
      launch: '[SYSTEM] Đã khởi chạy trang demo tương tác trực tiếp: {title}',
      environment: '[ENVIRONMENT] Đang thiết lập ngữ cảnh giao diện mô phỏng...',
      instruction: '[INSTRUCTION] Thực hiện tác vụ ở khung bên trái để kích hoạt xác minh danh tính.',
      reset: '[SYSTEM] Đã đặt lại trang demo tương tác: {title}',
      resetInstruction: '[INSTRUCTION] Thực hiện tác vụ ở khung bên trái để bắt đầu lại.',
      completedLayer: 'Hoàn tất lớp xác minh: {label}',
      nextTask: 'Nhiệm vụ tiếp theo: {action}',
      allPassed: 'Tất cả các giai đoạn xác minh danh tính đã được phê duyệt thành công.',
      sealed: 'Thông tin xác thực mã hóa đã được ký và niêm phong.'
    },
    subChecks: {
      'bank-account': [
        ['Kiểm tra tính toàn vẹn hồ sơ', 'Quét danh tính tổng hợp', 'Xác minh tín dụng khu vực'],
        ['Kiểm tra watermark mã hóa', 'Giải mã mã vạch 2D và MRZ', 'Phân tích hạn sử dụng giấy tờ'],
        ['Đánh giá kiểm tra sống độ sâu 3D', 'Đối chiếu phản xạ thụ động', 'Kiểm định độ giống khuôn mặt với ID (99,8%)'],
        ['Quét sổ đăng ký trừng phạt OFAC', 'Sàng lọc cơ sở dữ liệu PEP', 'Truy vấn cảnh báo đỏ Interpol']
      ],
      'apply-job': [
        ['Khớp SSN trong sổ đăng ký quốc gia', 'Quét cơ sở dữ liệu trộm cắp danh tính', 'Xác thực quyền làm việc hợp pháp'],
        ['Xác minh sổ đăng ký đại học', 'Đối chiếu trạng thái chứng nhận', 'Giấy phép hành nghề hợp lệ (đang hoạt động)'],
        ['Tìm kiếm hồ sơ tòa án cấp hạt', 'Khớp cơ sở dữ liệu liên bang', 'Quét sổ đăng ký tội phạm tình dục']
      ],
      'ticket-booking': [
        ['Dấu vân tay WebGL Canvas', 'Đối chiếu độ nhiễu chuyển động chuột', 'Phát hiện trình duyệt headless'],
        ['Kiểm tra tín hiệu nhà mạng di động', 'Xác thực SIM không VoIP', 'Khớp mã xác minh OTP'],
        ['Mã hóa siêu dữ liệu người hâm mộ', 'Niêm phong khóa chống chuyển nhượng', 'Đóng dấu chữ ký QR mã hóa']
      ],
      'airlines-hotels': [
        ['Bắt tay kết nối ăng-ten NFC', 'Kiểm tra chứng thư chính phủ', 'Đọc dữ liệu thô đã mã hóa'],
        ['Đối chiếu selfie với ảnh NFC', 'So sánh ảnh trích xuất 300dpi', 'Chấm điểm tin cậy (99,9%)'],
        ['Đồng bộ danh sách hành khách bay', 'Kiểm tra mã đặt phòng khách sạn', 'Đóng dấu xác nhận trên 18 tuổi']
      ],
      'government-services': [
        ['Tìm kiếm cơ sở dữ liệu dân cư quốc gia', 'Xác minh chỉ mục khai sinh hợp pháp', 'Trích xuất hồ sơ công dân'],
        ['Quét lịch sử bưu chính và tiện ích', 'Xác thực không gian địa lý', 'Xác nhận bằng chứng cư trú'],
        ['Tạo khóa riêng RSA', 'Liên kết giấy tờ dùng một lần', 'Đóng dấu niêm phong mã hóa']
      ],
      healthcare: [
        ['Khớp ảnh ID do chính phủ cấp', 'Quét trùng lặp nhân khẩu học', 'Căn khớp hồ sơ lâm sàng'],
        ['Kiểm tra lịch sử hiệu lực hợp đồng', 'Khớp số nhóm và nhà bảo hiểm', 'Đọc OCR bảo hiểm theo thời gian thực'],
        ['Mã hóa khóa HIPAA RSA-2048', 'Thu thập chữ ký tương tác', 'Băm chứng nhận đồng ý']
      ],
      'ticket-transfer': [
        ['Kiểm tra khóa mua ban đầu', 'Giải mã chữ ký bên phát hành CA', 'Khớp quyền sở hữu trong sổ cái vé'],
        ['Khởi tạo hợp đồng thông minh Relay', 'Khóa quỹ ký quỹ nguyên tử', 'Bảo vệ toàn vẹn chống chi tiêu hai lần'],
        ['Thực thi hoán đổi nguyên tử', 'Cập nhật địa chỉ ví người mua', 'Giải phóng thanh toán ký quỹ']
      ]
    }
  }
};
