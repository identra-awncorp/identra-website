/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const LOGIN_PAGE_TRANSLATIONS = {
  en: {
    brand: 'identra',
    backToSite: 'Back to site',
    emailLabel: 'Email address',
    emailPlaceholder: 'you@example.com',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Password',
    errors: {
      validEmail: 'Please enter a valid email address.',
      passwordLength: 'Password must be at least 6 characters.',
      nameRequired: 'Name is required.'
    },
    success: {
      signedIn: 'Successfully signed in! Redirecting to dashboard...',
      accountCreated: 'Account successfully created! Please log in.',
      resetSent: 'Password reset link sent! Please check your inbox.',
      ssoPrefix: 'Successfully authenticated via',
      ssoSuffix: 'Redirecting...'
    },
    signin: {
      title: 'Sign in to your account',
      desc: 'Access your Identra integrations, configurations, and inquiries.',
      forgotPassword: 'Forgot your password?',
      loading: 'Signing in...',
      submit: 'Sign in',
      ssoPrompt: 'Use Google, Okta, OneLogin, or SAML?',
      needAccount: 'Need an account?',
      signup: 'Sign up.'
    },
    signup: {
      title: 'Create your account',
      desc: 'Get started with a free sandbox environment or join an existing company team.',
      fullName: 'Full Name',
      fullNamePlaceholder: 'Jane Doe',
      companyName: 'Company Name',
      companyPlaceholder: 'Acme Corporation',
      passwordPlaceholder: 'At least 6 characters',
      loading: 'Creating account...',
      submit: 'Create Account',
      alreadyHaveAccount: 'Already have an account?',
      login: 'Log in.'
    },
    forgot: {
      title: 'Reset your password',
      desc: "Enter your email below and we'll send you instructions to reset your password.",
      loading: 'Sending code...',
      submit: 'Send reset link',
      back: 'Back to Log in'
    },
    sso: {
      title: 'Single Sign-On (SSO)',
      desc: 'Use your company workspace identity provider to log in securely.',
      google: 'Continue with Google Workspace',
      okta: 'Continue with Okta SSO',
      oneLogin: 'Continue with OneLogin',
      saml: 'Continue with Corporate SAML',
      back: 'Back to standard login'
    },
    compliance: 'Protected by Identra Shield • SOC2 Type II Certified • GDPR Compliant',
    sidePanel: {
      badge: 'Identra Enterprise Identity',
      titleLine1: 'A single platform for',
      titleLine2: 'every stage of user trust',
      desc: 'Dynamically verify IDs, screen against sanctions lists, run behavioral check algorithms, and manage manual case queues within a unified, secure dashboard ecosystem.',
      metrics: [
        { value: '99.8%', label: 'AI Match Accuracy' },
        { value: '< 3.5s', label: 'Verification Speed' },
        { value: '195+', label: 'Countries Supported' },
        { value: '0%', label: 'Exposed Personal Data' }
      ],
      copyright: 'Identra identities, Inc. © 2026'
    }
  },
  es: {
    brand: 'identra',
    backToSite: 'Volver al sitio',
    emailLabel: 'Correo electrónico',
    emailPlaceholder: 'tu@ejemplo.com',
    passwordLabel: 'Contraseña',
    passwordPlaceholder: 'Contraseña',
    errors: {
      validEmail: 'Introduce una dirección de correo válida.',
      passwordLength: 'La contraseña debe tener al menos 6 caracteres.',
      nameRequired: 'El nombre es obligatorio.'
    },
    success: {
      signedIn: 'Sesión iniciada correctamente. Redirigiendo al panel...',
      accountCreated: 'Cuenta creada correctamente. Inicia sesión.',
      resetSent: 'Enlace de restablecimiento enviado. Revisa tu bandeja de entrada.',
      ssoPrefix: 'Autenticación correcta mediante',
      ssoSuffix: 'Redirigiendo...'
    },
    signin: {
      title: 'Inicia sesión en tu cuenta',
      desc: 'Accede a tus integraciones, configuraciones y consultas de Identra.',
      forgotPassword: '¿Olvidaste tu contraseña?',
      loading: 'Iniciando sesión...',
      submit: 'Iniciar sesión',
      ssoPrompt: '¿Usas Google, Okta, OneLogin o SAML?',
      needAccount: '¿Necesitas una cuenta?',
      signup: 'Regístrate.'
    },
    signup: {
      title: 'Crea tu cuenta',
      desc: 'Comienza con un entorno sandbox gratuito o únete al equipo de una empresa existente.',
      fullName: 'Nombre completo',
      fullNamePlaceholder: 'Jane Doe',
      companyName: 'Nombre de la empresa',
      companyPlaceholder: 'Acme Corporation',
      passwordPlaceholder: 'Al menos 6 caracteres',
      loading: 'Creando cuenta...',
      submit: 'Crear cuenta',
      alreadyHaveAccount: '¿Ya tienes una cuenta?',
      login: 'Inicia sesión.'
    },
    forgot: {
      title: 'Restablece tu contraseña',
      desc: 'Introduce tu correo y te enviaremos instrucciones para restablecer tu contraseña.',
      loading: 'Enviando código...',
      submit: 'Enviar enlace de restablecimiento',
      back: 'Volver a iniciar sesión'
    },
    sso: {
      title: 'Inicio de sesión único (SSO)',
      desc: 'Usa el proveedor de identidad de tu empresa para iniciar sesión de forma segura.',
      google: 'Continuar con Google Workspace',
      okta: 'Continuar con Okta SSO',
      oneLogin: 'Continuar con OneLogin',
      saml: 'Continuar con SAML corporativo',
      back: 'Volver al inicio estándar'
    },
    compliance: 'Protegido por Identra Shield • Certificación SOC2 Tipo II • Cumple GDPR',
    sidePanel: {
      badge: 'Identidad empresarial de Identra',
      titleLine1: 'Una sola plataforma para',
      titleLine2: 'cada etapa de confianza del usuario',
      desc: 'Verifica documentos de identidad de forma dinámica, revisa listas de sanciones, ejecuta algoritmos de comportamiento y gestiona colas de casos manuales en un panel unificado y seguro.',
      metrics: [
        { value: '99,8%', label: 'Precisión de coincidencia con IA' },
        { value: '< 3,5 s', label: 'Velocidad de verificación' },
        { value: '195+', label: 'Países compatibles' },
        { value: '0%', label: 'Datos personales expuestos' }
      ],
      copyright: 'Identra identities, Inc. © 2026'
    }
  },
  ja: {
    brand: 'identra',
    backToSite: 'サイトに戻る',
    emailLabel: 'メールアドレス',
    emailPlaceholder: 'you@example.com',
    passwordLabel: 'パスワード',
    passwordPlaceholder: 'パスワード',
    errors: {
      validEmail: '有効なメールアドレスを入力してください。',
      passwordLength: 'パスワードは6文字以上で入力してください。',
      nameRequired: '氏名は必須です。'
    },
    success: {
      signedIn: 'サインインしました。ダッシュボードへ移動しています...',
      accountCreated: 'アカウントを作成しました。ログインしてください。',
      resetSent: 'パスワード再設定リンクを送信しました。受信トレイをご確認ください。',
      ssoPrefix: '認証に成功しました:',
      ssoSuffix: 'リダイレクトしています...'
    },
    signin: {
      title: 'アカウントにサインイン',
      desc: 'Identra の連携、設定、問い合わせにアクセスできます。',
      forgotPassword: 'パスワードをお忘れですか？',
      loading: 'サインイン中...',
      submit: 'サインイン',
      ssoPrompt: 'Google、Okta、OneLogin、SAML を使用しますか？',
      needAccount: 'アカウントが必要ですか？',
      signup: '登録する。'
    },
    signup: {
      title: 'アカウントを作成',
      desc: '無料のサンドボックス環境を始めるか、既存の会社チームに参加できます。',
      fullName: '氏名',
      fullNamePlaceholder: 'Jane Doe',
      companyName: '会社名',
      companyPlaceholder: 'Acme Corporation',
      passwordPlaceholder: '6文字以上',
      loading: 'アカウントを作成中...',
      submit: 'アカウントを作成',
      alreadyHaveAccount: 'すでにアカウントをお持ちですか？',
      login: 'ログイン。'
    },
    forgot: {
      title: 'パスワードをリセット',
      desc: 'メールアドレスを入力すると、パスワード再設定の手順を送信します。',
      loading: 'コードを送信中...',
      submit: '再設定リンクを送信',
      back: 'ログインに戻る'
    },
    sso: {
      title: 'シングルサインオン (SSO)',
      desc: '会社のワークスペース ID プロバイダーを使用して安全にログインします。',
      google: 'Google Workspace で続行',
      okta: 'Okta SSO で続行',
      oneLogin: 'OneLogin で続行',
      saml: '企業 SAML で続行',
      back: '標準ログインに戻る'
    },
    compliance: 'Identra Shield で保護 • SOC2 Type II 認証 • GDPR 準拠',
    sidePanel: {
      badge: 'Identra エンタープライズ本人確認',
      titleLine1: 'ユーザー信頼のあらゆる段階に対応する',
      titleLine2: '単一プラットフォーム',
      desc: 'ID を動的に検証し、制裁リストを照合し、行動チェックアルゴリズムを実行し、手動ケースキューを統合された安全なダッシュボードで管理します。',
      metrics: [
        { value: '99.8%', label: 'AI 照合精度' },
        { value: '< 3.5秒', label: '検証速度' },
        { value: '195+', label: '対応国' },
        { value: '0%', label: '公開された個人データ' }
      ],
      copyright: 'Identra identities, Inc. © 2026'
    }
  },
  de: {
    brand: 'identra',
    backToSite: 'Zurück zur Website',
    emailLabel: 'E-Mail-Adresse',
    emailPlaceholder: 'du@beispiel.de',
    passwordLabel: 'Passwort',
    passwordPlaceholder: 'Passwort',
    errors: {
      validEmail: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
      passwordLength: 'Das Passwort muss mindestens 6 Zeichen lang sein.',
      nameRequired: 'Der Name ist erforderlich.'
    },
    success: {
      signedIn: 'Erfolgreich angemeldet. Weiterleitung zum Dashboard...',
      accountCreated: 'Konto erfolgreich erstellt. Bitte melden Sie sich an.',
      resetSent: 'Link zum Zurücksetzen gesendet. Bitte prüfen Sie Ihren Posteingang.',
      ssoPrefix: 'Erfolgreich authentifiziert über',
      ssoSuffix: 'Weiterleitung...'
    },
    signin: {
      title: 'Bei Ihrem Konto anmelden',
      desc: 'Greifen Sie auf Identra-Integrationen, Konfigurationen und Anfragen zu.',
      forgotPassword: 'Passwort vergessen?',
      loading: 'Anmeldung läuft...',
      submit: 'Anmelden',
      ssoPrompt: 'Google, Okta, OneLogin oder SAML verwenden?',
      needAccount: 'Benötigen Sie ein Konto?',
      signup: 'Registrieren.'
    },
    signup: {
      title: 'Konto erstellen',
      desc: 'Starten Sie mit einer kostenlosen Sandbox-Umgebung oder treten Sie einem bestehenden Unternehmensteam bei.',
      fullName: 'Vollständiger Name',
      fullNamePlaceholder: 'Jane Doe',
      companyName: 'Unternehmensname',
      companyPlaceholder: 'Acme Corporation',
      passwordPlaceholder: 'Mindestens 6 Zeichen',
      loading: 'Konto wird erstellt...',
      submit: 'Konto erstellen',
      alreadyHaveAccount: 'Sie haben bereits ein Konto?',
      login: 'Einloggen.'
    },
    forgot: {
      title: 'Passwort zurücksetzen',
      desc: 'Geben Sie unten Ihre E-Mail-Adresse ein. Wir senden Ihnen Anweisungen zum Zurücksetzen.',
      loading: 'Code wird gesendet...',
      submit: 'Reset-Link senden',
      back: 'Zurück zum Login'
    },
    sso: {
      title: 'Single Sign-On (SSO)',
      desc: 'Melden Sie sich sicher über den Identitätsanbieter Ihres Unternehmens an.',
      google: 'Mit Google Workspace fortfahren',
      okta: 'Mit Okta SSO fortfahren',
      oneLogin: 'Mit OneLogin fortfahren',
      saml: 'Mit Unternehmens-SAML fortfahren',
      back: 'Zurück zum Standard-Login'
    },
    compliance: 'Geschützt durch Identra Shield • SOC2 Type II zertifiziert • GDPR-konform',
    sidePanel: {
      badge: 'Identra Enterprise Identity',
      titleLine1: 'Eine Plattform für',
      titleLine2: 'jede Phase des Nutzervertrauens',
      desc: 'Prüfen Sie IDs dynamisch, screenen Sie Sanktionslisten, führen Sie Verhaltensalgorithmen aus und verwalten Sie manuelle Fallqueues in einem einheitlichen, sicheren Dashboard.',
      metrics: [
        { value: '99,8%', label: 'KI-Treffergenauigkeit' },
        { value: '< 3,5 s', label: 'Verifizierungsgeschwindigkeit' },
        { value: '195+', label: 'Unterstützte Länder' },
        { value: '0%', label: 'Offengelegte personenbezogene Daten' }
      ],
      copyright: 'Identra identities, Inc. © 2026'
    }
  },
  vi: {
    brand: 'identra',
    backToSite: 'Quay lại trang',
    emailLabel: 'Địa chỉ email',
    emailPlaceholder: 'ban@example.com',
    passwordLabel: 'Mật khẩu',
    passwordPlaceholder: 'Mật khẩu',
    errors: {
      validEmail: 'Vui lòng nhập địa chỉ email hợp lệ.',
      passwordLength: 'Mật khẩu phải có ít nhất 6 ký tự.',
      nameRequired: 'Vui lòng nhập họ tên.'
    },
    success: {
      signedIn: 'Đăng nhập thành công. Đang chuyển đến bảng điều khiển...',
      accountCreated: 'Tạo tài khoản thành công. Vui lòng đăng nhập.',
      resetSent: 'Đã gửi liên kết đặt lại mật khẩu. Vui lòng kiểm tra hộp thư.',
      ssoPrefix: 'Xác thực thành công qua',
      ssoSuffix: 'Đang chuyển hướng...'
    },
    signin: {
      title: 'Đăng nhập vào tài khoản',
      desc: 'Truy cập các tích hợp, cấu hình và hồ sơ yêu cầu của Identra.',
      forgotPassword: 'Quên mật khẩu?',
      loading: 'Đang đăng nhập...',
      submit: 'Đăng nhập',
      ssoPrompt: 'Bạn dùng Google, Okta, OneLogin hoặc SAML?',
      needAccount: 'Bạn cần tài khoản?',
      signup: 'Đăng ký.'
    },
    signup: {
      title: 'Tạo tài khoản',
      desc: 'Bắt đầu với môi trường kiểm thử miễn phí hoặc tham gia nhóm công ty hiện có.',
      fullName: 'Họ tên',
      fullNamePlaceholder: 'Jane Doe',
      companyName: 'Tên công ty',
      companyPlaceholder: 'Acme Corporation',
      passwordPlaceholder: 'Ít nhất 6 ký tự',
      loading: 'Đang tạo tài khoản...',
      submit: 'Tạo tài khoản',
      alreadyHaveAccount: 'Bạn đã có tài khoản?',
      login: 'Đăng nhập.'
    },
    forgot: {
      title: 'Đặt lại mật khẩu',
      desc: 'Nhập email bên dưới, chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu cho bạn.',
      loading: 'Đang gửi mã...',
      submit: 'Gửi liên kết đặt lại',
      back: 'Quay lại đăng nhập'
    },
    sso: {
      title: 'Đăng nhập một lần (SSO)',
      desc: 'Dùng nhà cung cấp danh tính của không gian làm việc công ty để đăng nhập an toàn.',
      google: 'Tiếp tục với Google Workspace',
      okta: 'Tiếp tục với Okta SSO',
      oneLogin: 'Tiếp tục với OneLogin',
      saml: 'Tiếp tục với SAML doanh nghiệp',
      back: 'Quay lại đăng nhập tiêu chuẩn'
    },
    compliance: 'Được bảo vệ bởi Identra Shield • Chứng nhận SOC2 Type II • Tuân thủ GDPR',
    sidePanel: {
      badge: 'Danh tính doanh nghiệp Identra',
      titleLine1: 'Một nền tảng duy nhất cho',
      titleLine2: 'mọi giai đoạn xây dựng niềm tin người dùng',
      desc: 'Xác minh ID linh hoạt, sàng lọc danh sách cấm vận, chạy thuật toán kiểm tra hành vi và quản lý hàng đợi hồ sơ thủ công trong một bảng điều khiển hợp nhất, an toàn.',
      metrics: [
        { value: '99,8%', label: 'Độ chính xác khớp bằng AI' },
        { value: '< 3,5 giây', label: 'Tốc độ xác minh' },
        { value: '195+', label: 'Quốc gia được hỗ trợ' },
        { value: '0%', label: 'Dữ liệu cá nhân bị lộ' }
      ],
      copyright: 'Identra identities, Inc. © 2026'
    }
  }
} as const;
