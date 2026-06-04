const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/master-guides.ts');
let content = fs.readFileSync(filePath, 'utf8');

const linuxGuide = {
  slug: "linux",
  categorySlug: "linux",
  title: {
    vi: "Làm chủ Linux Server & Deploy Website",
    en: "Master Linux Server & Deploy Website",
    ja: "Linux サーバーとウェブサイトデプロイをマスターする"
  },
  description: {
    vi: "Hướng dẫn chi tiết từ việc thiết lập VPS, cấu hình bảo mật tường lửa, cài đặt môi trường, cấu hình Nginx và cài đặt SSL HTTPS hoàn chỉnh.",
    en: "Step-by-step guide to setting up a VPS, configuring firewall security, installing runtime environments, configuring Nginx, and setting up HTTPS SSL.",
    ja: "VPSのセットアップ、ファイアウォールのセキュリティ設定、実行環境のインストール、Nginxの設定、HTTPS SSLの構成までの詳細なステップバイステップガイド。"
  },
  productName: {
    vi: "Ubuntu Server VPS",
    en: "Ubuntu Server VPS",
    ja: "Ubuntu Server VPS"
  },
  steps: [
    {
      title: {
        vi: "Cập nhật hệ thống & Cài đặt gói cơ bản",
        en: "Update System & Install Utilities",
        ja: "システム更新と基本ツールのインストール"
      },
      content: {
        vi: "Đăng nhập vào VPS mới qua SSH bằng quyền root, sau đó cập nhật toàn bộ hệ thống lên phiên bản mới nhất và cài đặt một số công cụ dòng lệnh cơ bản.",
        en: "Log into your fresh VPS via SSH as root, update all system packages to their latest versions, and install essential command-line tools.",
        ja: "rootユーザーとしてSSHで新しいVPSにログインし、システムパッケージを最新バージョンに更新して、基本的なコマンドラインツールをインストールします。"
      },
      commands: [
        "ssh root@your_server_ip",
        "sudo apt update && sudo apt upgrade -y",
        "sudo apt install -y curl git ufw htop unzip"
      ],
      notes: [
        {
          vi: "Luôn chạy apt update trước khi cài đặt bất kỳ gói phần mềm mới nào để làm mới danh sách package.",
          en: "Always run apt update before installing any new package to fetch the latest metadata.",
          ja: "新しいパッケージをインストールする前に、必ず apt update を実行して最新のメタデータを取得してください。"
        }
      ]
    },
    {
      title: {
        vi: "Tạo người dùng mới và phân quyền sudo",
        en: "Create User & Grant Sudo Privileges",
        ja: "新規ユーザーの作成とSudo権限の付与"
      },
      content: {
        vi: "Không bao giờ chạy ứng dụng hoặc thao tác hệ thống hàng ngày trực tiếp bằng tài khoản root vì lý do an toàn. Hãy tạo một tài khoản user mới chuyên dụng và cấp quyền quản trị sudo.",
        en: "For security, never run applications or perform daily tasks directly as root. Create a dedicated user and grant them sudo privileges.",
        ja: "セキュリティのため、rootユーザーとして直接アプリケーションを実行したり日常業務を行ったりしないでください。専用ユーザーを作成し、sudo権限を付与します。"
      },
      commands: [
        "sudo adduser deploy",
        "sudo usermod -aG sudo deploy"
      ],
      notes: [
        {
          vi: "Lệnh adduser sẽ yêu cầu bạn nhập mật khẩu an toàn và một số thông tin cơ bản.",
          en: "The adduser command will prompt you to enter a secure password and basic user information.",
          ja: "adduser コマンドを実行すると、安全なパスワードと基本情報の入力を求められます。"
        }
      ]
    },
    {
      title: {
        vi: "Thiết lập SSH Key để bảo mật đăng nhập",
        en: "Configure SSH Keys",
        ja: "SSH鍵の設定"
      },
      content: {
        vi: "Đăng nhập bằng SSH Key an toàn hơn nhiều so với việc dùng mật khẩu thông thường. Tạo cặp khóa trên máy tính cá nhân và sao chép khóa công khai (public key) lên server.",
        en: "Logging in via SSH keys is significantly more secure than passwords. Generate a key pair locally and copy the public key to the server.",
        ja: "SSH鍵を使用したログインは、パスワードを使用するよりもはるかに安全です。ローカルで鍵ペアを生成し、公開鍵をサーバーにコピーします。"
      },
      commands: [
        "ssh-keygen -t ed25519 -C \"admin@domain.com\"",
        "ssh-copy-id -i ~/.ssh/id_ed25519.pub deploy@your_server_ip"
      ],
      notes: [
        {
          vi: "Thực hiện lệnh ssh-keygen trên máy tính cá nhân của bạn, không chạy trên VPS.",
          en: "Run the ssh-keygen command on your local machine, not on the VPS.",
          ja: "ssh-keygen コマンドは、VPS上ではなくローカルマシンで実行してください。"
        }
      ]
    },
    {
      title: {
        vi: "Cấu hình bảo mật SSH Daemon",
        en: "Harden SSH Daemon Config",
        ja: "SSHデーモンのセキュリティ強化設定"
      },
      content: {
        vi: "Vô hiệu hóa việc đăng nhập bằng mật khẩu và cấm tài khoản root đăng nhập trực tiếp qua SSH để chống các cuộc tấn công brute-force.",
        en: "Disable password authentication and forbid direct root logins via SSH to prevent brute-force attacks.",
        ja: "ブルートフォース攻撃を防ぐため、パスワード認証を無効化し、SSH経由の直接のrootログイン`を禁止します。"
      },
      folderPath: "/etc/ssh/sshd_config",
      code: `# 📄 /etc/ssh/sshd_config: Secure SSH Configuration
# Turn off root login
PermitRootLogin no

# Only allow SSH Keys
PasswordAuthentication no
PubkeyAuthentication yes

# Optional: Change default SSH port to avoid automated scanners
# Port 2222`,
      notes: [
        {
          vi: "Sau khi sửa file, chạy 'sudo systemctl restart ssh' hoặc 'sudo systemctl restart sshd' để áp dụng cấu hình.",
          en: "After editing, run 'sudo systemctl restart ssh' or 'sudo systemctl restart sshd' to apply the configurations.",
          ja: "編集後、設定を適用するために 'sudo systemctl restart ssh' または 'sudo systemctl restart sshd' を実行します。"
        },
        {
          vi: "ĐỪNG tắt kết nối SSH hiện tại cho đến khi bạn đã mở một Terminal mới thử đăng nhập thành công bằng SSH key.",
          en: "DO NOT close your current SSH connection until you verify login succeeds in a new Terminal window.",
          ja: "新しいターミナルウィンドウでログインの成功を確認するまで、現在のSSH接続を閉じないでください。"
        }
      ]
    },
    {
      title: {
        vi: "Kích hoạt và thiết lập tường lửa UFW",
        en: "Set Up UFW Firewall",
        ja: "UFW ファイアウォールの設定"
      },
      content: {
        vi: "Cấu hình tường lửa UFW (Uncomplicated Firewall) để chặn toàn bộ lưu lượng truy cập không mong muốn và chỉ mở các cổng dịch vụ cần thiết (SSH, HTTP, HTTPS).",
        en: "Configure UFW (Uncomplicated Firewall) to block all unwanted traffic and allow only essential ports (SSH, HTTP, HTTPS).",
        ja: "すべての不要なトラフィックをブロックし、必要なポート（SSH、HTTP、HTTPS）のみを許可するように UFW（Uncomplicated Firewall）を設定します。"
      },
      commands: [
        "sudo ufw default deny incoming",
        "sudo ufw default allow outgoing",
        "sudo ufw allow 22/tcp",
        "sudo ufw allow 80/tcp",
        "sudo ufw allow 443/tcp",
        "sudo ufw enable"
      ],
      notes: [
        {
          vi: "BẮT BUỘC phải chạy lệnh 'allow 22/tcp' trước khi kích hoạt tường lửa, nếu không bạn sẽ bị khóa và mất quyền điều khiển VPS.",
          en: "You MUST run 'allow 22/tcp' before enabling UFW, or you will be locked out of the VPS.",
          ja: "UFWを有効にする前に、必ず 'allow 22/tcp' を実行してください。そうしない to、VPSから切断されます。"
        }
      ]
    },
    {
      title: {
        vi: "Cài đặt môi trường chạy Web (Node.js & Npm)",
        en: "Install Node.js & Npm Runtime",
        ja: "Node.js と Npm 実行環境のインストール"
      },
      content: {
        vi: "Cài đặt Node.js phiên bản LTS ổn định từ kho phân phối chính thức của NodeSource để làm môi trường chạy cho các web app JavaScript.",
        en: "Install the stable Node.js LTS version from the official NodeSource distribution repository to run JavaScript web applications.",
        ja: "JavaScriptウェブアプリケーションを実行するために、公式の NodeSource ディストリビューションレポジトリから安定した Node.js LTS バージョンをインストールします。"
      },
      commands: [
        "curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -",
        "sudo apt install -y nodejs",
        "node -v && npm -v"
      ],
      notes: [
        {
          vi: "Sau khi cài xong, kiểm tra phiên bản để xác nhận cài đặt thành công.",
          en: "After installation, verify the version output to confirm successful setup.",
          ja: "インストール後、バージョン出力を確認してセットアップの成功を確認します。"
        }
      ]
    },
    {
      title: {
        vi: "Cài đặt và cấu hình Nginx làm Reverse Proxy",
        en: "Configure Nginx Reverse Proxy",
        ja: "Nginx リバースプロキシの設定"
      },
      content: {
        vi: "Cài đặt Nginx Web Server và tạo file cấu hình ảo (Virtual Host / Server Block) để định tuyến các yêu cầu từ tên miền bên ngoài về ứng dụng chạy cục bộ của bạn.",
        en: "Install Nginx Web Server and create a server block configuration to route external domain requests to your locally running application.",
        ja: "Nginx Webサーバーをインストールし、外部ドメインからのリクエストをローカルで実行中のアプリケーションにルーティングするためのサーバーブロック設定を作成します。"
      },
      folderPath: "/etc/nginx/sites-available/my-app",
      commands: [
        "sudo apt install -y nginx",
        "sudo ln -s /etc/nginx/sites-available/my-app /etc/nginx/sites-enabled/",
        "sudo nginx -t",
        "sudo systemctl restart nginx"
      ],
      code: `server {
    listen 80;
    server_name example.com www.example.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}`,
      notes: [
        {
          vi: "Xóa server block mặc định (default) bằng lệnh 'sudo rm /etc/nginx/sites-enabled/default' để tránh xung đột cấu hình.",
          en: "Remove the default server block configuration by running 'sudo rm /etc/nginx/sites-enabled/default' to prevent conflicts.",
          ja: "設定の競合を防ぐために、'sudo rm /etc/nginx/sites-enabled/default' を実行してデフォルトのサーバーブロック設定を削除します。"
        }
      ]
    },
    {
      title: {
        vi: "Quản lý tiến trình ứng dụng với PM2",
        en: "Manage Node Process with PM2",
        ja: "PM2 によるプロセス管理"
      },
      content: {
        vi: "Khi tắt terminal, ứng dụng Node.js sẽ dừng hoạt động. Sử dụng PM2 để chạy ngầm (background) ứng dụng, tự động khởi động lại nếu bị crash và tự bật lại khi server reboot.",
        en: "Closing the terminal kills a standard Node.js app. Use PM2 process manager to run it in the background, auto-restart on crashes, and auto-start on server reboots.",
        ja: "ターミナルを閉じると通常の Node.js アプリは停止します。PM2 プロセスマネージャーを使用してバックグラウンドで実行し、クラッシュ時の自動再起動、およびサーバー再起動時の自動起動を設定します。"
      },
      commands: [
        "sudo npm install -g pm2",
        "pm2 start dist/index.js --name \"my-app\"",
        "pm2 save",
        "pm2 startup"
      ],
      notes: [
        {
          vi: "Lệnh pm2 startup sẽ trả về một câu lệnh dài, bạn cần copy câu lệnh đó chạy dưới quyền root để thiết lập systemd service.",
          en: "The pm2 startup command outputs a long command wrapper. Copy and execute it to register the systemd boot script.",
          ja: "pm2 startup コマンドを実行すると、長いコマンドが出力されます。コピーして実行し、systemd の起動スクリプトを登録してください。"
        }
      ]
    },
    {
      title: {
        vi: "Cấu hình SSL HTTPS miễn phí với Certbot",
        en: "Enable HTTPS SSL with Certbot",
        ja: "Certbot による HTTPS SSL の有効化"
      },
      content: {
        vi: "Sử dụng Certbot của Let's Encrypt để lấy chứng chỉ SSL miễn phí và cấu hình tự động bảo mật HTTPS cho Nginx.",
        en: "Install Certbot and request a free Let's Encrypt SSL certificate. Certbot automatically configures HTTPS on Nginx for you.",
        ja: "Certbot をインストールし、無料の Let's Encrypt SSL 証明書を要求します。Certbot が自動的に Nginx に HTTPS を設定してくれます。"
      },
      commands: [
        "sudo apt install -y certbot python3-certbot-nginx",
        "sudo certbot --nginx -d example.com -d www.example.com"
      ],
      notes: [
        {
          vi: "Bản ghi DNS của tên miền phải trỏ về IP của VPS thành công trước khi chạy lệnh này.",
          en: "Your domain's DNS A-record must point to your VPS IP before requesting certificates.",
          ja: "証明書を要求する前に、ドメインの DNS Aレコードが VPS の IP を指している必要があります。"
        },
        {
          vi: "Certbot sẽ tự động tạo cron job để tự động gia hạn chứng chỉ trước khi hết hạn 90 ngày.",
          en: "Certbot automatically configures a system cron job to handle certificate renewals before expiration.",
          ja: "Certbot は、有効期限が切れる前に証明書の更新を行うためのシステム cron ジョブを自動的に設定します。"
        }
      ]
    },
    {
      title: {
        vi: "Kết luận & Giám sát hệ thống",
        en: "Conclusion & System Monitoring",
        ja: "結論とシステム監視"
      },
      content: {
        vi: "Ứng dụng của bạn hiện đã được deploy chạy thực tế một cách an toàn và tối ưu. Bạn có thể sử dụng các lệnh giám sát để kiểm tra tài nguyên và log lỗi.",
        en: "Your application is now securely deployed and optimized. Use diagnostic commands to monitor resources and audit logs.",
        ja: "アプリケーションが安全にデプロイされ、最適化されました。診断コマンドを使用してリソースを監視し、ログを確認します。"
      },
      commands: [
        "htop",
        "sudo ss -tulpn",
        "pm2 logs my-app",
        "sudo tail -f /var/log/nginx/error.log"
      ],
      notes: [
        {
          vi: "Chúc mừng! Bạn đã nắm giữ toàn bộ kiến thức triển khai thực tế trên Linux.",
          en: "Congratulations! You have mastered real-world application deployment on Linux servers.",
          ja: "おめでとうございます！Linuxサーバーでの実践的なアプリケーションデプロイの手法をマスターしました。"
        }
      ]
    }
  ]
};

const vuejsGuide = {
  slug: "vuejs",
  categorySlug: "vuejs",
  title: {
    vi: "Làm chủ Vue 3 & Composition API",
    en: "Master Vue 3 & Composition API",
    ja: "Vue 3 と Composition API をマスターする"
  },
  description: {
    vi: "Xây dựng ứng dụng Single Page Application (SPA) hoàn chỉnh sử dụng Vue 3, Composition API (<script setup>), Pinia, Vue Router và Vite.",
    en: "Build a complete Single Page Application (SPA) using Vue 3, Composition API (<script setup>), Pinia, Vue Router, and Vite.",
    ja: "Vue 3、Composition API（<script setup>）、Pinia、Vue Router、および Vite を使用して、完全なシングルページアプリケーション（SPA）を構築します。"
  },
  productName: {
    vi: "Vue SPA App",
    en: "Vue SPA App",
    ja: "Vue SPA App"
  },
  steps: [
    {
      title: {
        vi: "Khởi tạo dự án với create-vue",
        en: "Scaffold Project with create-vue",
        ja: "create-vue によるプロジェクト作成"
      },
      content: {
        vi: "Tạo dự án Vue 3 mới bằng công cụ chính thức create-vue. Chọn các tùy chọn TypeScript, Vue Router, Pinia để sẵn sàng cho một ứng dụng quy mô lớn.",
        en: "Initialize a new Vue 3 project using create-vue. Enable options like TypeScript, Vue Router, and Pinia for production readiness.",
        ja: "create-vue を使用して新しい Vue 3 プロジェクトを初期化します。本番環境の構築に向けて、TypeScript、Vue Router、Pinia などのオプションを有効にします。"
      },
      commands: [
        "npm create vue@latest",
        "cd my-vue-app",
        "npm install",
        "npm run dev"
      ],
      notes: [
        {
          vi: "Lệnh sẽ đưa ra các câu hỏi trắc nghiệm để bạn cấu hình dự án ban đầu.",
          en: "The command executes an interactive CLI wizard to scaffold initial configurations.",
          ja: "このコマンドは、初期設定を構築するための対話型 CLI を実行します。"
        }
      ]
    },
    {
      title: {
        vi: "Hiểu cấu trúc Component SFC và script setup",
        en: "Understand SFC & script setup",
        ja: "SFC と script setup の理解"
      },
      content: {
        vi: "Vue sử dụng định dạng Single File Component (.vue) gộp chung logic (script), giao diện (template), và kiểu dáng (style) vào một tệp tin. Cú pháp <script setup> là chuẩn tối ưu của Vue 3 giúp viết code ngắn gọn.",
        en: "Vue uses Single File Components (.vue) containing logic (script), layout (template), and styling (style). Cú pháp <script setup> is the standard, cleaner way to write Vue 3.",
        ja: "Vue は、ロジック（script）、レイアウト（template）、スタイル（style）を含むシングルファイルコンポーネント（.vue）を使用します。`<script setup>` は、Vue 3 をより簡潔に記述するための標準的な構文です。"
      },
      folderPath: "src/App.vue",
      code: `<script setup lang="ts">
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const message = ref('Welcome to Vue 3!')
</script>

<template>
  <main>
    <h1>{{ message }}</h1>
    <HelloWorld msg="Props Message" />
  </main>
</template>

<style scoped>
h1 {
  color: #42b883;
}
</style>`,
      notes: [
        {
          vi: "Thuộc tính scoped trong thẻ style đảm bảo CSS chỉ áp dụng bên trong component này, không rò rỉ ra ngoài.",
          en: "The scoped attribute ensures that CSS rules defined here apply only to this component, preventing global pollution.",
          ja: "style タグの scoped 属性は、定義された CSS ルールがこのコンポーネントにのみ適用されるようにし、グローバルな汚染を防ぎます。"
        }
      ]
    },
    {
      title: {
        vi: "Quản lý Reactivity với ref & reactive",
        en: "Reactivity with ref & reactive",
        ja: "ref と reactive によるリアクティビティ"
      },
      content: {
        vi: "Sử dụng ref() cho các kiểu dữ liệu nguyên thủy (string, number, boolean) hoặc mảng, và reactive() cho đối tượng (object) phức tạp để tự động cập nhật UI khi dữ liệu thay đổi.",
        en: "Use ref() for primitives (string, number, boolean) or arrays, and reactive() for complex objects to trigger automatic UI updates.",
        ja: "データの変更時にUIの自動更新をトリガーするために、プリミティブ値や配列には ref() を、複雑なオブジェクトには reactive() を使用します。"
      },
      folderPath: "src/components/Counter.vue",
      code: `<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

// ref: dynamic state (accessed via .value in script)
const count = ref(0)

// computed: derived state (auto-caches, only updates when dependencies change)
const doubleCount = computed(() => count.value * 2)

// reactive: works only on objects/arrays, no .value required
const state = reactive({
  user: 'Guest',
  roles: ['User']
})

const increment = () => {
  count.value++
}
</script>

<template>
  <div>
    <p>User: {{ state.user }}</p>
    <button @click="increment">Count is: {{ count }}</button>
    <p>Double count is: {{ doubleCount }}</p>
  </div>
</template>`,
      notes: [
        {
          vi: "Trong khối script, bạn bắt buộc phải truy cập giá trị của ref bằng .value. Trong template, Vue tự động giải nén (unwrap) nên không cần viết .value.",
          en: "In script blocks, you must access ref values using .value. In templates, Vue automatically unwraps them.",
          ja: "script ブロック内では、ref 値にアクセスするために `.value` を使用する必要があります。テンプレート内では、Vueが自動的にアンラップします。"
        }
      ]
    },
    {
      title: {
        vi: "Giao tiếp giữa các component (Props & Emits)",
        en: "Component Communication (Props & Emits)",
        ja: "コンポーネント間通信（Props と Emits）"
      },
      content: {
        vi: "Truyền dữ liệu từ cha xuống con thông qua defineProps, và phát sự kiện từ con ngược lên cha thông qua defineEmits.",
        en: "Pass data down from parent to child components via defineProps, and send custom events up using defineEmits.",
        ja: "defineProps を使用して親から子コンポーネントへデータを渡し、defineEmits を使用して子から親へカスタムイベントを送信します。"
      },
      folderPath: "src/components/TodoItem.vue",
      code: `<script setup lang="ts">
// Define type-safe props
interface Props {
  id: number
  title: string
  completed: boolean
}
defineProps<Props>()

// Define event emitter contracts
const emit = defineEmits<{
  (e: 'toggle', id: number): void
  (e: 'delete', id: number): void
}>()
</script>

<template>
  <div class="todo-item">
    <input type="checkbox" :checked="completed" @change="emit('toggle', id)" />
    <span>{{ title }}</span>
    <button @click="emit('delete', id)">Remove</button>
  </div>
</template>`,
      notes: [
        {
          vi: "defineProps và defineEmits là các macro của trình biên dịch, không cần phải import.",
          en: "defineProps and defineEmits are compiler macros that do not need to be explicitly imported.",
          ja: "defineProps および defineEmits は、明示的にインポートする必要のないコンパイラマクロです。"
        }
      ]
    },
    {
      title: {
        vi: "Tách biệt logic với Custom Composables",
        en: "Create Custom Composables",
        ja: "カスタムコンポーザブルの作成"
      },
      content: {
        vi: "Viết hàm helper tái sử dụng logic có trạng thái bằng cách đóng gói các refs và lifecycle hooks vào một tệp tin JS/TS riêng biệt.",
        en: "Write reusable functions for stateful logic by bundling reactive refs and lifecycle hooks in standalone TS files.",
        ja: "リアクティブな ref とライフサイクルフックを独立した TS ファイルにバンドルすることで、状態を持つロジックの再利用可能な関数を作成します。"
      },
      folderPath: "src/composables/useWindowSize.ts",
      code: `import { ref, onMounted, onUnmounted } from 'vue'

export function useWindowSize() {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)

  const update = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  onMounted(() => window.addEventListener('resize', update))
  onUnmounted(() => window.removeEventListener('resize', update))

  return { width, height }
}`,
      notes: [
        {
          vi: "Trong component, bạn có thể gọi: const { width, height } = useWindowSize().",
          en: "Inside a component, consume it like this: const { width, height } = useWindowSize().",
          ja: "コンポーネント内では、次のように使用します: const { width, height } = useWindowSize()。"
        }
      ]
    },
    {
      title: {
        vi: "Thiết lập Vue Router cho SPA",
        en: "Set Up Vue Router",
        ja: "Vue Router の設定"
      },
      content: {
        vi: "Định cấu hình định tuyến cho ứng dụng. Khai báo các trang và hiển thị chúng động qua RouterView mà không cần tải lại trình duyệt.",
        en: "Configure page routes for your application. Render views dynamically inside RouterView without full browser refreshes.",
        ja: "アプリケーションのページルートを設定します。ブラウザのリロードを行わずに、RouterView 内にビューを動的にレンダリングします。"
      },
      folderPath: "src/router/index.ts",
      code: `import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // Lazy-loading routes (highly recommended for performance)
      component: () => import('../views/DashboardView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

export default router`,
      notes: [
        {
          vi: "Sử dụng cú pháp component: () => import(...) để kích hoạt tự động phân tách code (code-splitting) cho tuyến đường đó.",
          en: "Using component: () => import(...) enables automatic route-level code splitting for production builds.",
          ja: "component: () => import(...) を使用すると、本番ビルドの自動ルートレベルコード分割が有効になります。"
        }
      ]
    },
    {
      title: {
        vi: "Quản lý State toàn cục với Pinia",
        en: "Global State Management with Pinia",
        ja: "Pinia によるグローバルステート管理"
      },
      content: {
        vi: "Pinia là thư viện quản lý trạng thái chính thức của Vue 3. Tạo một Store lưu trữ các dữ liệu dùng chung toàn hệ thống như thông tin giỏ hàng, thông tin tài khoản đăng nhập.",
        en: "Pinia is Vue 3's official state store. Create a store for shared states such as shopping carts or login authentication credentials.",
        ja: "Pinia は Vue 3 の公式ステートストアです。ショッピングカートやログイン認証情報などの共有ステート用ストアを作成します。"
      },
      folderPath: "src/stores/todoStore.ts",
      code: `import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<{ id: number; text: string; done: boolean }[]>([])

  const completedCount = computed(() => todos.value.filter(t => t.done).length)

  function addTodo(text: string) {
    todos.value.push({ id: Date.now(), text, done: false })
  }

  function toggleTodo(id: number) {
    const todo = todos.value.find(t => t.id === id)
    if (todo) todo.done = !todo.done
  }

  return { todos, completedCount, addTodo, toggleTodo }
})`,
      notes: [
        {
          vi: "Pinia hỗ trợ cả cú pháp Setup Store (sử dụng ref/computed/function) giúp đồng bộ cách viết với Composition API.",
          en: "Pinia supports Setup Stores (using refs, computeds, and functions), unifying your style with Composition API components.",
          ja: "Pinia は Setup Stores（refs、computeds、および関数を使用）をサポートしており、Composition API コンポーネントとコーディングスタイルを統一できます。"
        }
      ]
    },
    {
      title: {
        vi: "Sử dụng Dynamic Component & Teleport",
        en: "Dynamic Components & Teleport",
        ja: "動的コンポーネントと Teleport"
      },
      content: {
        vi: "Hiển thị các component một cách linh động dựa trên trạng thái và dịch chuyển giao diện (như modal popups) lên thẻ body ngoài cây DOM của component cha.",
        en: "Render components dynamically based on state, and teleport overlays (like modal popups) up to the HTML body to escape container clipping.",
        ja: "状態に基づいて動的にコンポーネントをレンダリングし、コンテナのクリッピングからエスケープするために、オーバーレイ（モーダルポップアップなど）をHTMLボディにテレポートします。"
      },
      folderPath: "src/components/ModalManager.vue",
      code: `<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import LoginModal from './LoginModal.vue'
import RegisterModal from './RegisterModal.vue'

const showModal = ref(false)
// Use shallowRef for component definitions to avoid proxy overhead
const activeModal = shallowRef(LoginModal)

const openRegister = () => {
  activeModal.value = RegisterModal
}
</script>

<template>
  <button @click="showModal = true">Open Dialog</button>
  
  <Teleport to="body">
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-box">
        <!-- Render dynamic component -->
        <component :is="activeModal" @close="showModal = false" />
        <button @click="openRegister">Need account? Register</button>
      </div>
    </div>
  </Teleport>
</template>`,
      notes: [
        {
          vi: "Sử dụng shallowRef thay vì ref khi lưu trữ định nghĩa của Component để tối ưu hóa hiệu năng, tránh để Vue bọc proxy sâu không cần thiết.",
          en: "Always store component definitions in a shallowRef instead of a ref to avoid unnecessary deep proxy performance costs.",
          ja: "不要なディーププロキシによるパフォーマンスコストを避けるため、コンポーネント定義は必ず ref ではなく shallowRef に保存してください。"
        }
      ]
    },
    {
      title: {
        vi: "Tối ưu hiệu năng & Lazy Loading",
        en: "Performance & Lazy Loading",
        ja: "パフォーマンスと遅延読み込み"
      },
      content: {
        vi: "Tối ưu hóa tốc độ tải trang bằng cách định nghĩa các component bất đồng bộ qua defineAsyncComponent để chúng chỉ được tải qua mạng khi thực sự render.",
        en: "Optimize build chunks by loading components asynchronously using defineAsyncComponent, fetching code only when they are rendered.",
        ja: "defineAsyncComponent を使用してコンポーネントを非同期にロードし、レザリング時にのみコードを取得することで、ビルドチャンクを最適化します。"
      },
      folderPath: "src/components/Dashboard.vue",
      code: `<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import LoadingIndicator from './LoadingIndicator.vue'

// Lazy load heavy components
const AsyncHeavyChart = defineAsyncComponent({
  loader: () => import('./HeavyChart.vue'),
  loadingComponent: LoadingIndicator,
  delay: 200 // Show loader only if loading takes > 200ms
})
</script>

<template>
  <div class="dashboard">
    <h2>Analysis Report</h2>
    <!-- Only downloads HeavyChart.vue bundle when this element resolves -->
    <AsyncHeavyChart />
  </div>
</template>`,
      notes: [
        {
          vi: "Việc này giúp trang chủ tải cực kỳ nhanh do không bị gộp chung các thư viện biểu đồ nặng nề vào file js khởi động.",
          en: "This drastically accelerates home page loading speeds by excluding large libraries from the entry bundle.",
          ja: "これにより、エントリーバンドルから大きなライブラリを除外することで、ホームページの読み込み速度が大幅に向上します。"
        }
      ]
    },
    {
      title: {
        vi: "Xây dựng và đóng gói ứng dụng (Build)",
        en: "Build & Bundle Application",
        ja: "アプリケーションのビルドとパッケージング"
      },
      content: {
        vi: "Chạy lệnh build để Vite biên dịch toàn bộ mã nguồn TypeScript/Vue thành các file HTML/JS/CSS tĩnh đã tối ưu và nén gọn, sẵn sàng deploy lên hosting.",
        en: "Run the build task. Vite compiles TypeScript and Vue into minified, optimized static HTML/JS/CSS assets ready for hosting.",
        ja: "ビルドタスクを実行します。Vite は TypeScript と Vue を縮小および最適化された静的 HTML/JS/CSS アセットにコンパイルし、ホスティングの準備を整えます。"
      },
      commands: [
        "npm run build",
        "npm run preview"
      ],
      notes: [
        {
          vi: "Thư mục đầu ra dist/ sẽ chứa toàn bộ sản phẩm hoàn chỉnh của bạn.",
          en: "The output dist/ folder contains all production-ready files.",
          ja: "出力される dist/ フォルダには、本番環境に対応したすべてのファイルが含まれています。"
        },
        {
          vi: "Chúc mừng! Bạn đã nắm giữ trọn vẹn kiến thức xây dựng ứng dụng Vue 3 hiện đại.",
          en: "Congratulations! You have mastered building modern SPA applications using Vue 3.",
          ja: "おめでとうございます！Vue 3 を使用した最新の SPA アプリケーションの構築をマスターしました。"
        }
      ]
    }
  ]
};

// Formulate replacement text
// We can use JSON.stringify for the whole guide and format it as TS code.
// Let's create a custom function to format JS object into TS object string.
// Note: JSON.stringify outputs double quotes, which is 100% valid TypeScript.
const formatGuide = (guide) => {
  return JSON.stringify(guide, null, 2);
};

const linuxGuideStr = formatGuide(linuxGuide);
const vuejsGuideStr = formatGuide(vuejsGuide);

const targetAnchor = '];\n\nexport const findMasterGuide';

if (!content.includes(targetAnchor)) {
  console.error("Could not find target anchor in master-guides.ts!");
  process.exit(1);
}

const replacement = `,\n${linuxGuideStr},\n${vuejsGuideStr}\n];\n\nexport const findMasterGuide`;

content = content.replace(targetAnchor, replacement);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully added Linux and Vue.js Master Guides safely to master-guides.ts.");
