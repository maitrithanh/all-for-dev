const fs = require('fs');
const path = require('path');

const commandsPath = path.join(__dirname, '../src/data/commands.json');
const commands = JSON.parse(fs.readFileSync(commandsPath, 'utf8'));

// Define the new commands to add
const newLinuxCommands = [
  {
    "id": "linux-ss",
    "name": "ss",
    "group": "Linux / Ubuntu / WSL",
    "categorySlug": "linux",
    "description": {
      "vi": "Kiểm tra các cổng mạng đang mở (sockets) và kết nối hiện tại.",
      "en": "Investigate socket statistics and check open listening network ports.",
      "ja": "ネットワークソケットの状態や解放されているポートを確認します。"
    },
    "detail": {
      "vi": "Dùng để kiểm tra xem ứng dụng (Node, Go, Python, Nginx) đã khởi động thành công và đang lắng nghe (listen) trên cổng nào chưa. Nhanh hơn lệnh netstat cũ.",
      "en": "Used to check if your web applications (Node, Go, Python, Nginx) have successfully started and are listening on their respective ports. Faster than the obsolete netstat.",
      "ja": "Web アプリケーション（Node、Go、Python、Nginx）が起動し、ポートで待受（Listen）しているか確認するために使用します。古い netstat コマンドより高速です。"
    },
    "syntax": "ss -tulpn",
    "example": "ss -tulpn",
    "breakdown": [
      {
        "vi": "-t: hiển thị các kết nối TCP.",
        "en": "-t: display TCP sockets.",
        "ja": "-t: TCP ソケットを表示します。"
      },
      {
        "vi": "-u: hiển thị các kết nối UDP.",
        "en": "-u: display UDP sockets.",
        "ja": "-u: UDP ソケットを表示します。"
      },
      {
        "vi": "-l: chỉ hiển thị các socket đang ở trạng thái lắng nghe (listening).",
        "en": "-l: display only listening sockets.",
        "ja": "-l: リスニングソケットのみを表示します。"
      },
      {
        "vi": "-p: hiển thị tiến trình (Process/PID) đang sở hữu socket đó.",
        "en": "-p: show process/PID using the socket.",
        "ja": "-p: ソケットを使用しているプロセス/PIDを表示します。"
      },
      {
        "vi": "-n: hiển thị cổng dưới dạng số (ví dụ 80, 443) thay vì tên dịch vụ.",
        "en": "-n: show numeric port numbers instead of service names.",
        "ja": "-n: サービス名の代わりにポート番号を数値で表示します。"
      }
    ],
    "commonErrors": [
      {
        "vi": "Cột Process/PID bị trống hoặc không có thông tin.",
        "en": "Process/PID column is empty or missing details.",
        "ja": "プロセス/PID列が空であるか、詳細が表示されません。"
      }
    ],
    "fixes": [
      {
        "vi": "Bắt buộc chạy với quyền root: sudo ss -tulpn để thấy thông tin PID của các dịch vụ.",
        "en": "Must run with root privileges: sudo ss -tulpn to reveal PID information.",
        "ja": "ルート権限で実行する必要があります: sudo ss -tulpn で各プロセスのPIDを表示します。"
      }
    ],
    "tags": [
      "linux",
      "network",
      "port",
      "ss",
      "diagnose"
    ],
    "variations": [
      {
        "syntax": "ss -tula",
        "description": {
          "vi": "Hiển thị tất cả sockets TCP và UDP (cả listening và established).",
          "en": "Show all TCP and UDP sockets (both listening and established connections).",
          "ja": "すべての TCP および UDP ソケットを表示します（リスニングおよび接続確立状態の両方）。"
        }
      }
    ]
  },
  {
    "id": "linux-lsof",
    "name": "lsof",
    "group": "Linux / Ubuntu / WSL",
    "categorySlug": "linux",
    "description": {
      "vi": "Tìm tiến trình đang chiếm dụng cổng mạng hoặc file nhất định.",
      "en": "List open files and locate the process utilizing a specific port.",
      "ja": "特定のポートまたはファイルを使用しているプロセスを特定します。"
    },
    "detail": {
      "vi": "Thường dùng để tìm xem app nào đang chạy ngầm chiếm cổng 80, 443, 3000 làm app mới không khởi động được (lỗi EADDRINUSE).",
      "en": "Commonly used to identify which background app is hogging port 80, 443, 3000, causing new apps to crash with EADDRINUSE errors.",
      "ja": "新しいアプリが起動できない場合（EADDRINUSEエラーなど）、ポート80、443、3000などを占有しているバックグラウンドプロセスを特定するために使用されます。"
    },
    "syntax": "sudo lsof -i :<port>",
    "example": "sudo lsof -i :80",
    "breakdown": [
      {
        "vi": "lsof: list open files (liệt kê danh sách file đang mở).",
        "en": "lsof: list open files.",
        "ja": "lsof: 開いているファイルを一覧表示します。"
      },
      {
        "vi": "-i: lọc theo kết nối internet/mạng.",
        "en": "-i: filter by internet/network connections.",
        "ja": "-i: インターネット/ネットワーク接続でフィルタリングします。"
      },
      {
        "vi": ":80: chỉ định số cổng (port) cụ thể.",
        "en": ":80: specify the target port number.",
        "ja": ":80: 特定のポート番号を指定します。"
      }
    ],
    "commonErrors": [
      {
        "vi": "Lệnh không trả về kết quả nào mặc dù cổng đang bị trùng.",
        "en": "The command returns no output even though the port is blocked.",
        "ja": "ポートが使用中であるにもかかわらず、コマンドが何も返しません。"
      }
    ],
    "fixes": [
      {
        "vi": "Luôn thêm sudo phía trước lệnh để có quyền quét toàn hệ thống.",
        "en": "Always prepend sudo to grant system-wide scanning permissions.",
        "ja": "システム全体のスキャン権限を付与するために、常に先頭に sudo を付けてください。"
      }
    ],
    "tags": [
      "linux",
      "network",
      "port",
      "lsof",
      "process"
    ],
    "variations": [
      {
        "syntax": "lsof -p <PID>",
        "description": {
          "vi": "Liệt kê toàn bộ files và cổng mạng đang được tiến trình có PID này mở.",
          "en": "List all open files and network sockets associated with a specific PID.",
          "ja": "特定の PID に関連付けられているすべての開いているファイルとネットワークソケットをリストします。"
        }
      }
    ]
  },
  {
    "id": "linux-ps",
    "name": "ps aux",
    "group": "Linux / Ubuntu / WSL",
    "categorySlug": "linux",
    "description": {
      "vi": "Xem danh sách các tiến trình (process) đang chạy trên hệ thống.",
      "en": "List all active processes running on the operating system.",
      "ja": "システム上で動作しているすべてのアクティブなプロセスの一覧を表示します。"
    },
    "detail": {
      "vi": "Dùng để kiểm tra xem một service, daemon, ứng dụng Node.js, hay web server có đang chạy ẩn dưới nền hay không.",
      "en": "Inspect whether a service, daemon, Node.js app, or web server is running in the background.",
      "ja": "サービス、デーモン、Node.js アプリ、または Web サーバーがバックグラウンドで動作しているか確認します。"
    },
    "syntax": "ps aux | grep <pattern>",
    "example": "ps aux | grep node",
    "breakdown": [
      {
        "vi": "a: hiển thị tiến trình của mọi người dùng.",
        "en": "a: show processes for all users.",
        "ja": "a: すべてのユーザーのプロセスを表示します。"
      },
      {
        "vi": "u: hiển thị thông tin chi tiết về tài nguyên và người sở hữu.",
        "en": "u: display resource usage and ownership details.",
        "ja": "u: リソース使用率と所有者の詳細を表示します。"
      },
      {
        "vi": "x: liệt kê cả tiến trình không gắn vào terminal (các daemon chạy ẩn).",
        "en": "x: show processes not attached to a terminal (background daemons).",
        "ja": "x: 制御端末を持たないプロセスも表示します（バックグラウンドデーモン）。"
      },
      {
        "vi": "| grep: lọc danh sách tiến trình theo từ khóa mong muốn.",
        "en": "| grep: pipe search filter for specific process names.",
        "ja": "| grep: 特定のプロセス名をパイプで絞り込みます。"
      }
    ],
    "commonErrors": [
      {
        "vi": "Hiển thị thêm dòng tiến trình của chính lệnh grep trong kết quả.",
        "en": "The grep command itself appears in the filtered process list.",
        "ja": "検索結果に grep コマンド自体のプロセスも表示されてしまう。"
      }
    ],
    "fixes": [
      {
        "vi": "Sử dụng ký tự regex để loại bỏ dòng grep: ps aux | grep [n]ode.",
        "en": "Use regex brackets to exclude the grep process: ps aux | grep [n]ode.",
        "ja": "grep プロセスを除外するために正規表現を使用します: ps aux | grep [n]ode。"
      }
    ],
    "tags": [
      "linux",
      "process",
      "ps",
      "monitor"
    ],
    "variations": [
      {
        "syntax": "ps -ef",
        "description": {
          "vi": "Liệt kê tiến trình sử dụng định dạng System V tiêu chuẩn Unix.",
          "en": "List all running processes using standard System V syntax.",
          "ja": "標準の System V 構文を使用して、実行中のすべてのプロセスを一覧表示します。"
        }
      }
    ]
  },
  {
    "id": "linux-kill",
    "name": "kill",
    "group": "Linux / Ubuntu / WSL",
    "categorySlug": "linux",
    "description": {
      "vi": "Gửi tín hiệu dừng hoặc tắt cưỡng bức một tiến trình (process).",
      "en": "Send termination signals or force-stop a specific running process.",
      "ja": "プロセスに対して終了シグナルを送信し、強制停止します。"
    },
    "detail": {
      "vi": "Dùng để tắt các app chạy ngầm bị đơ, treo hoặc chặn cổng mạng của web server (sau khi đã tìm ra PID từ lsof hoặc ps).",
      "en": "Used to terminate hung or crashed background web applications or processes blocking web server ports (after retrieving PID from lsof or ps).",
      "ja": "ハングアップしたプロセスや、ポートを塞いでいるバックグラウンドプロセスを停止します（lsof や ps で PID を取得した後に実行）。"
    },
    "syntax": "kill -9 <PID>",
    "example": "kill -9 1245",
    "breakdown": [
      {
        "vi": "kill: gửi tín hiệu đến tiến trình.",
        "en": "kill: send a signal to a process.",
        "ja": "kill: プロセスにシグナルを送信します。"
      },
      {
        "vi": "-9: tín hiệu SIGKILL (tắt cưỡng bức ngay lập tức, không cho dọn dẹp).",
        "en": "-9: SIGKILL signal (force-kill immediately, does not allow graceful cleanup).",
        "ja": "-9: SIGKILL シグナル（クリーンアップを許可せず、即座に強制終了します）。"
      },
      {
        "vi": "<PID>: ID của tiến trình cần dừng.",
        "en": "<PID>: the Process ID to be terminated.",
        "ja": "<PID>: 終了するプロセスのプロセスID。"
      }
    ],
    "commonErrors": [
      {
        "vi": "Lỗi 'Operation not permitted' khi tắt tiến trình.",
        "en": "'Operation not permitted' error when killing a process.",
        "ja": "プロセス終了時に 'Operation not permitted' エラーが発生する。"
      }
    ],
    "fixes": [
      {
        "vi": "Chạy kèm sudo để nâng quyền tắt tiến trình của hệ thống hoặc user khác: sudo kill -9 <PID>.",
        "en": "Prepend sudo to kill system services or other users' processes: sudo kill -9 <PID>.",
        "ja": "システムサービスや他ユーザーのプロセスを終了するには sudo を付与します: sudo kill -9 <PID>。"
      }
    ],
    "tags": [
      "linux",
      "process",
      "kill",
      "stop",
      "force"
    ],
    "variations": [
      {
        "syntax": "killall -9 <process_name>",
        "description": {
          "vi": "Tắt cưỡng bức toàn bộ các tiến trình theo tên (ví dụ: killall -9 node).",
          "en": "Force-kill all active processes matching a name pattern (e.g. killall -9 node).",
          "ja": "名前に一致するすべてのアクティブなプロセスを強制終了します（例: killall -9 node）。"
        }
      },
      {
        "syntax": "kill -15 <PID>",
        "description": {
          "vi": "Gửi tín hiệu SIGTERM yêu cầu tắt an toàn (cho phép app giải phóng tài nguyên trước khi tắt).",
          "en": "Send SIGTERM signal requesting a graceful shutdown (allows app to release resources).",
          "ja": "正常終了を要求する SIGTERM シグナルを送信します（アプリのリソース解放を許可）。"
        }
      }
    ]
  },
  {
    "id": "linux-htop",
    "name": "htop",
    "group": "Linux / Ubuntu / WSL",
    "categorySlug": "linux",
    "description": {
      "vi": "Giám sát hiệu năng hệ thống (CPU, RAM, Swap) theo thời gian thực trực quan.",
      "en": "Monitor system resources (CPU, RAM, Swap) and processes in real-time.",
      "ja": "CPU、メモリ、スワップなどのシステムリソースをリアルタイムで視覚的に監視します。"
    },
    "detail": {
      "vi": "Trực quan hơn lệnh top cổ điển. Hỗ trợ cuộn chuột, lọc tiến trình, sắp xếp theo lượng tài nguyên tiêu hao, giúp tìm ra app làm nghẽn server.",
      "en": "A visually enhanced replacement for the classic top command. Supports mouse interaction, filtering, and sorting processes by RAM/CPU usage.",
      "ja": "古典的な top コマンドの進化版。マウス操作、フィルタリング、CPU/メモリ使用量でのソートをサポートし、ボトルネックの特定を容易にします。"
    },
    "syntax": "htop",
    "example": "htop",
    "breakdown": [
      {
        "vi": "htop: ứng dụng giám sát tiến trình trực quan trên giao diện terminal.",
        "en": "htop: interactive process viewer and system resources monitor.",
        "ja": "htop: ターミナル上で動作する対話型システムモニター。"
      }
    ],
    "commonErrors": [
      {
        "vi": "Lỗi 'htop: command not found' do hệ thống chưa cài sẵn.",
        "en": "'htop: command not found' error on clean server installations.",
        "ja": "システムに htop がインストールされていないため 'htop: command not found' となる。"
      }
    ],
    "fixes": [
      {
        "vi": "Cài đặt: sudo apt install htop (Ubuntu/Debian) hoặc sudo yum install htop (CentOS/RedHat).",
        "en": "Install it: sudo apt install htop (Ubuntu/Debian) or sudo yum install htop (CentOS/RedHat).",
        "ja": "インストールします: sudo apt install htop (Ubuntu/Debian) または sudo yum install htop (CentOS/RedHat)。"
      }
    ],
    "tags": [
      "linux",
      "monitor",
      "htop",
      "cpu",
      "ram"
    ],
    "variations": [
      {
        "syntax": "htop -u <username>",
        "description": {
          "vi": "Chỉ hiển thị các tiến trình được sở hữu bởi một user cụ thể.",
          "en": "Display only the processes owned by a specified user.",
          "ja": "指定したユーザーが所有するプロセスのみを表示します。"
        }
      }
    ]
  },
  {
    "id": "linux-ufw",
    "name": "ufw",
    "group": "Linux / Ubuntu / WSL",
    "categorySlug": "linux",
    "description": {
      "vi": "Quản lý tường lửa (Firewall) đơn giản trên Ubuntu.",
      "en": "Manage uncomplicated firewall (UFW) rules for server security.",
      "ja": "Ubuntuのファイアウォール（UFW）ルールを簡単に管理します。"
    },
    "detail": {
      "vi": "Khi deploy web, bắt buộc phải mở cổng 80 (HTTP) và 443 (HTTPS) để người dùng truy cập, đồng thời luôn cho phép cổng 22 (SSH) để tránh bị mất kết nối điều khiển server.",
      "en": "Crucial for web deployments: must open ports 80 (HTTP) and 443 (HTTPS) for client traffic, while ensuring port 22 (SSH) is permitted to prevent locked-out sessions.",
      "ja": "Web展開で不可欠です。ユーザーアクセスのためにポート 80 (HTTP) と 443 (HTTPS) を開放し、リモート接続が切れないようにポート 22 (SSH) を許可します。"
    },
    "syntax": "sudo ufw status",
    "example": "sudo ufw status verbose",
    "breakdown": [
      {
        "vi": "ufw: Uncomplicated Firewall (tường lửa đơn giản).",
        "en": "ufw: Uncomplicated Firewall.",
        "ja": "ufw: 簡単に扱えるファイアウォール管理ツール。"
      },
      {
        "vi": "status: kiểm tra trạng thái hoạt động và các rules đã cấu hình.",
        "en": "status: check current firewall status and active rules list.",
        "ja": "status: 現在のファイアウォールの状態と適用されているルールを確認します。"
      }
    ],
    "commonErrors": [
      {
        "vi": "Kích hoạt tường lửa mà quên cấu hình cho phép cổng SSH (cổng 22) làm mất quyền kết nối từ xa.",
        "en": "Enabling UFW without allowing SSH (port 22) first, locking yourself out of the server.",
        "ja": "SSH（ポート22）を許可する前に UFW を有効にしてしまい、サーバーから切断される。"
      }
    ],
    "fixes": [
      {
        "vi": "Luôn chạy sudo ufw allow 22/tcp hoặc sudo ufw allow ssh trước khi kích hoạt tường lửa.",
        "en": "Always run sudo ufw allow 22/tcp or sudo ufw allow ssh before enabling the firewall.",
        "ja": "ファイアウォールを有効にする前に、必ず sudo ufw allow 22/tcp を実行してください。"
      }
    ],
    "tags": [
      "linux",
      "firewall",
      "security",
      "ufw",
      "port"
    ],
    "variations": [
      {
        "syntax": "sudo ufw allow 80/tcp",
        "description": {
          "vi": "Mở cổng 80 cho phép truy cập HTTP thông thường.",
          "en": "Open port 80 to allow incoming HTTP traffic.",
          "ja": "ポート 80 を開放し、HTTP トラフィックを許可します。"
        }
      },
      {
        "syntax": "sudo ufw allow 443/tcp",
        "description": {
          "vi": "Mở cổng 443 cho phép truy cập HTTPS bảo mật.",
          "en": "Open port 443 to allow incoming secure HTTPS traffic.",
          "ja": "ポート 443 を開放し、安全な HTTPS トラフィックを許可します。"
        }
      },
      {
        "syntax": "sudo ufw enable",
        "description": {
          "vi": "Bật và kích hoạt tường lửa (áp dụng các rules).",
          "en": "Turn on and enforce UFW firewall rules.",
          "ja": "ファイアウォールを有効にし、ルールを適用します。"
        }
      },
      {
        "syntax": "sudo ufw disable",
        "description": {
          "vi": "Tắt tường lửa hoàn toàn.",
          "en": "Completely turn off the firewall.",
          "ja": "ファイアウォールを完全に無効化します。"
        }
      }
    ]
  },
  {
    "id": "linux-rsync",
    "name": "rsync",
    "group": "Linux / Ubuntu / WSL",
    "categorySlug": "linux",
    "description": {
      "vi": "Đồng bộ hóa file/thư mục cục bộ hoặc từ xa hiệu quả.",
      "en": "Fast, versatile, remote and local file-synchronizing tool.",
      "ja": "ローカルまたはリモートでファイルやディレクトリを効率的に同期します。"
    },
    "detail": {
      "vi": "Rất tối ưu cho deploy code. Lệnh chỉ truyền đi phần khác biệt (delta) giữa code cũ và mới thay vì copy đè toàn bộ như scp, giúp tiết kiệm thời gian truyền tải dữ liệu.",
      "en": "Highly optimized for deployment. Syncs only the changes (deltas) instead of copying everything, saving time and network bandwidth compared to scp.",
      "ja": "展開に最適です。scp のように全体を上書きするのではなく、差分のみを転送するため、帯域幅と時間を大幅に節約できます。"
    },
    "syntax": "rsync -avz --exclude 'node_modules' <source> user@host:<destination>",
    "example": "rsync -avz --exclude 'node_modules' ./dist/ root@192.168.1.100:/var/www/my-app/",
    "breakdown": [
      {
        "vi": "-a: archive (bảo toàn quyền truy cập, sở hữu và mốc thời gian).",
        "en": "-a: archive mode (preserves permissions, ownership, and timestamps).",
        "ja": "-a: アーカイブモード（権限、所有者、タイムスタンプを保持します）。"
      },
      {
        "vi": "-v: verbose (hiển thị chi tiết danh sách tệp được truyền).",
        "en": "-v: verbose output detailing synced files.",
        "ja": "-v: 同期されるファイルの詳細を表示します。"
      },
      {
        "vi": "-z: compress (nén dữ liệu trên đường truyền để tải nhanh hơn).",
        "en": "-z: compress file data during transfer for speed.",
        "ja": "-z: 転送速度向上のためデータを圧縮します。"
      },
      {
        "vi": "--exclude: loại bỏ thư mục hoặc tệp không muốn đồng bộ khi deploy.",
        "en": "--exclude: ignore files or directories from being synced.",
        "ja": "--exclude: 同期から除外するファイルまたはディレクトリを指定します。"
      }
    ],
    "commonErrors": [
      {
        "vi": "Đồng bộ cả các thư mục rác nặng (node_modules, logs) lên server.",
        "en": "Accidentally syncing heavy folders like node_modules or logs to production.",
        "ja": "node_modules やログなどの重いフォルダを誤って本番環境に同期してしまう。"
      }
    ],
    "fixes": [
      {
        "vi": "Luôn dùng cờ --exclude 'node_modules' --exclude '.git' để bỏ qua.",
        "en": "Always specify --exclude 'node_modules' --exclude '.git' in deploy scripts.",
        "ja": "デプロイスクリプトには必ず --exclude 'node_modules' --exclude '.git' を指定します。"
      }
    ],
    "tags": [
      "linux",
      "deploy",
      "sync",
      "rsync",
      "file"
    ],
    "variations": [
      {
        "syntax": "rsync --dry-run -avz ./dist/ user@host:/path",
        "description": {
          "vi": "Chạy thử (dry-run) để kiểm tra danh sách file sẽ được thay đổi mà không truyền đi thật.",
          "en": "Perform a trial run (dry-run) without making any actual changes or data transfers.",
          "ja": "実際のデータ転送や変更を行わずに、テスト実行（dry-run）を行います。"
        }
      }
    ]
  },
  {
    "id": "linux-scp",
    "name": "scp",
    "group": "Linux / Ubuntu / WSL",
    "categorySlug": "linux",
    "description": {
      "vi": "Sao chép file an toàn giữa các máy tính qua giao thức SSH.",
      "en": "Securely copy files between hosts over the SSH protocol.",
      "ja": "SSHプロトコル経由でホスト間でファイルを安全にコピーします。"
    },
    "detail": {
      "vi": "Dùng để tải nhanh file cấu hình (như config Nginx, file .env nhạy cảm) từ máy cá nhân lên server Linux hoặc ngược lại.",
      "en": "Quickly upload or download configuration files (like Nginx conf, sensitive .env) between your local machine and Linux servers.",
      "ja": "ローカルマシンと Linux サーバー間で、設定ファイル（Nginx 設定や機密の .env など）をすばやくアップロード/ダウンロードします。"
    },
    "syntax": "scp -r <source> user@host:<destination_path>",
    "example": "scp .env.production root@192.168.1.100:/var/www/my-app/.env",
    "breakdown": [
      {
        "vi": "scp: Secure Copy (sao chép mã hóa qua SSH).",
        "en": "scp: Secure Copy.",
        "ja": "scp: SSH を使用した暗号化コピー。"
      },
      {
        "vi": "-r: sao chép đệ quy thư mục (recursive).",
        "en": "-r: copy directories recursively.",
        "ja": "-r: ディレクトリを再帰的にコピーします。"
      }
    ],
    "commonErrors": [
      {
        "vi": "Lỗi kết nối thất bại do server không dùng cổng SSH mặc định (cổng 22).",
        "en": "Connection failure because the server uses a non-standard SSH port.",
        "ja": "サーバーが非標準の SSH ポートを使用しているため接続に失敗する。"
      }
    ],
    "fixes": [
      {
        "vi": "Sử dụng cờ -P (viết hoa) để chỉ định port SSH: scp -P <port_number> <file> user@host:<path>.",
        "en": "Use the capital -P flag to specify the custom SSH port: scp -P <port_number> <file> user@host:<path>.",
        "ja": "大文字の -P フラグを使用して SSH ポートを指定します: scp -P <port_number> <file> user@host:<path>。"
      }
    ],
    "tags": [
      "linux",
      "transfer",
      "scp",
      "ssh",
      "file"
    ],
    "variations": [
      {
        "syntax": "scp user@host:/var/log/nginx/error.log ./logs/",
        "description": {
          "vi": "Tải một file từ server từ xa về máy tính cục bộ.",
          "en": "Download a specific file from a remote server to your local machine.",
          "ja": "リモートサーバーからローカルマシンに特定のファイルをダウンロードします。"
        }
      }
    ]
  },
  {
    "id": "linux-wget",
    "name": "wget",
    "group": "Linux / Ubuntu / WSL",
    "categorySlug": "linux",
    "description": {
      "vi": "Tải xuống các tệp từ internet trực tiếp qua terminal.",
      "en": "Non-interactive network downloader for files from the web.",
      "ja": "ウェブからファイルを直接ターミナルにダウンロードします。"
    },
    "detail": {
      "vi": "Thường dùng để tải các mã nguồn, tệp cài đặt (như nodejs binary, zip bundle) hoặc cấu hình chuẩn trên internet về server.",
      "en": "Commonly used to fetch source code archives, binary installers, or configurations directly onto your server.",
      "ja": "ソースコードアーカイブ、インストーラー、または設定ファイルをサーバーに直接ダウンロードするために使用されます。"
    },
    "syntax": "wget <URL>",
    "example": "wget https://nodejs.org/dist/v20.11.0/node-v20.11.0-linux-x64.tar.xz",
    "breakdown": [
      {
        "vi": "wget: lệnh tải tệp qua mạng không tương tác.",
        "en": "wget: non-interactive file download command.",
        "ja": "wget: バックグラウンドでのファイルダウンロードコマンド。"
      }
    ],
    "commonErrors": [
      {
        "vi": "Lỗi xác thực SSL khi tải tệp từ các server có chứng chỉ tự ký hoặc hết hạn.",
        "en": "SSL verification error when downloading from self-signed or expired certificate hosts.",
        "ja": "自己署名証明書や期限切れ証明書を持つホストからのダウンロード時の SSL 検証エラー。"
      }
    ],
    "fixes": [
      {
        "vi": "Thêm cờ --no-check-certificate để bỏ qua xác thực SSL (chỉ dùng khi tin tưởng nguồn tải).",
        "en": "Add --no-check-certificate to skip SSL validation (use only for trusted sources).",
        "ja": "SSL検証をスキップするために --no-check-certificate を追加します（信頼できるソースにのみ使用）。"
      }
    ],
    "tags": [
      "linux",
      "download",
      "wget",
      "network"
    ],
    "variations": [
      {
        "syntax": "wget -O app.zip <URL>",
        "description": {
          "vi": "Tải tệp xuống và lưu dưới tên tệp mới được chỉ định.",
          "en": "Download and save the file with a custom designated name.",
          "ja": "カスタム指定名でファイルをダウンロードして保存します。"
        }
      }
    ]
  },
  {
    "id": "linux-curl-diag",
    "name": "curl (kiểm tra Web)",
    "group": "Linux / Ubuntu / WSL",
    "categorySlug": "linux",
    "description": {
      "vi": "Kiểm tra phản hồi HTTP từ server nội bộ hoặc bên ngoài.",
      "en": "Fetch HTTP headers or inspect responses from web servers.",
      "ja": "Web サーバーからの HTTP ヘッダーやレスポンスを確認します。"
    },
    "detail": {
      "vi": "Dùng để kiểm tra xem Nginx hoặc Node app đang chạy có phản hồi tốt không, kiểm tra các mã HTTP (200, 301, 502) ngay trên server bằng terminal.",
      "en": "Verify if Nginx or your background app responds correctly and check HTTP status codes (200, 301, 502) directly via terminal.",
      "ja": "Nginx やバックグラウンドアプリが正しく応答するか確認し、HTTP ステータスコード（200、301、502）をサーバー上で直接テストします。"
    },
    "syntax": "curl -I <URL_or_IP>",
    "example": "curl -I http://localhost:3000",
    "breakdown": [
      {
        "vi": "-I: chỉ lấy phần thông tin headers (metadata phản hồi), bỏ qua nội dung HTML/body.",
        "en": "-I: fetch only the HTTP headers, skipping the HTML/response body.",
        "ja": "-I: HTML本体をスキップし、HTTPヘッダーのみを取得します。"
      }
    ],
    "commonErrors": [
      {
        "vi": "Lỗi 'Connection refused' khi kiểm tra dịch vụ nội bộ (port bị sai hoặc app đã crash).",
        "en": "'Connection refused' error when checking local ports (app crashed or incorrect port).",
        "ja": "ローカルポート確認時の 'Connection refused' エラー（アプリが起動していないかポートが不適切）。"
      }
    ],
    "fixes": [
      {
        "vi": "Kiểm tra xem app đã lắng nghe cổng chưa bằng sudo ss -tulpn.",
        "en": "Verify the app status and listening ports using sudo ss -tulpn.",
        "ja": "sudo ss -tulpn を使用して、アプリがポートで待受しているか確認します。"
      }
    ],
    "tags": [
      "linux",
      "network",
      "curl",
      "diagnose",
      "http"
    ],
    "variations": [
      {
        "syntax": "curl -L <URL>",
        "description": {
          "vi": "Tự động đi theo đường dẫn chuyển hướng của trang web (HTTP redirect 301/302).",
          "en": "Follow HTTP redirects (301/302 status codes) automatically.",
          "ja": "HTTP リダイレクト（301/302 ステータス）を自動的に追跡します。"
        }
      },
      {
        "syntax": "curl -k <URL>",
        "description": {
          "vi": "Bỏ qua xác thực SSL (khi kiểm tra cục bộ localhost với chứng chỉ tự ký).",
          "en": "Ignore SSL/TLS certificate warnings (ideal for testing local dev with self-signed SSL).",
          "ja": "自己署名証明書による SSL 警告を無視します（ローカルテストに最適）。"
        }
      }
    ]
  },
  {
    "id": "linux-journalctl",
    "name": "journalctl",
    "group": "Linux / Ubuntu / WSL",
    "categorySlug": "linux",
    "description": {
      "vi": "Kiểm tra nhật ký hệ thống (logs) và các dịch vụ systemd.",
      "en": "Query and inspect system logs and systemd services.",
      "ja": "システムログや systemd サービスの詳細な動作ログを確認します。"
    },
    "detail": {
      "vi": "Công cụ số một để xem log lỗi khi dịch vụ (như Node.js app service, Nginx, Docker) bị crash không rõ lý do.",
      "en": "The ultimate tool to inspect crash logs of services (Node.js apps, Nginx, Docker) managed by systemd.",
      "ja": "systemd で管理されているサービス（Node.js、Nginx、Docker など）がクラッシュした際のエラーログを閲覧するための必須ツールです。"
    },
    "syntax": "journalctl -u <service_name> -n 100 -f",
    "example": "journalctl -u my-node-app.service -n 100 -f",
    "breakdown": [
      {
        "vi": "journalctl: lệnh truy vấn systemd journal logs.",
        "en": "journalctl: query the systemd journal logs.",
        "ja": "journalctl: systemd ジャーナルログを照会します。"
      },
      {
        "vi": "-u <service>: lọc nhật ký của một unit/service cụ thể.",
        "en": "-u <service>: filter logs for a specific systemd unit/service.",
        "ja": "-u <service>: 特定の systemd サービスに絞って表示します。"
      },
      {
        "vi": "-n 100: chỉ hiển thị 100 dòng log gần nhất.",
        "en": "-n 100: output only the most recent 100 lines.",
        "ja": "-n 100: 最新の 100 行のみを出力します。"
      },
      {
        "vi": "-f: follow (theo dõi và cập nhật log mới liên tục theo thời gian thực).",
        "en": "-f: follow output in real-time (similar to tail -f).",
        "ja": "-f: リアルタイムで新しいログを出力し続けます（tail -f と同様）。"
      }
    ],
    "commonErrors": [
      {
        "vi": "Logs hiện ra quá dài và lẫn lộn thông tin của các dịch vụ hệ thống khác.",
        "en": "Log output is too cluttered with other system messages.",
        "ja": "他のシステムログが混ざって、対象サービスのエラーが見づらい。"
      }
    ],
    "fixes": [
      {
        "vi": "Luôn luôn chỉ định dịch vụ cần lọc bằng cờ -u (ví dụ -u nginx.service).",
        "en": "Always scope the query with the -u flag for the target service (e.g. -u nginx.service).",
        "ja": "常に対象サービスを -u フラグで指定してください（例: -u nginx.service）。"
      }
    ],
    "tags": [
      "linux",
      "logs",
      "journalctl",
      "service",
      "debug"
    ],
    "variations": [
      {
        "syntax": "journalctl --since \"1 hour ago\"",
        "description": {
          "vi": "Xem toàn bộ logs hệ thống được ghi nhận trong vòng 1 giờ qua.",
          "en": "Show all logs generated within the last 1 hour.",
          "ja": "過去 1 時間に生成されたすべてのログを表示します。"
        }
      },
      {
        "syntax": "journalctl -xe",
        "description": {
          "vi": "Mở xem nhật ký lỗi hệ thống kèm giải thích chi tiết (thường dùng khi khởi động service thất bại).",
          "en": "View system error logs with diagnostic explanations (great for service startup failure debug).",
          "ja": "システムのエラーログを詳細な説明付きで表示します（サービスの起動失敗時の診断に便利）。"
        }
      }
    ]
  },
  {
    "id": "linux-dig",
    "name": "dig",
    "group": "Linux / Ubuntu / WSL",
    "categorySlug": "linux",
    "description": {
      "vi": "Tra cứu thông tin DNS của tên miền.",
      "en": "Query DNS records (IP address, CNAME) of a domain.",
      "ja": "ドメインの DNS レコード（IP アドレスや CNAME）を照会します。"
    },
    "detail": {
      "vi": "Rất cần thiết để xác định xem tên miền đã trỏ đúng IP của server chưa trước khi chạy lệnh tạo chứng chỉ SSL/HTTPS.",
      "en": "Crucial to verify if the domain points to your server's public IP address before issuing SSL/HTTPS certificates.",
      "ja": "SSL/HTTPS 証明書を発行する前に、ドメインがサーバーのパブリック IP アドレスを正しく指しているか確認するために必要です。"
    },
    "syntax": "dig <domain> A",
    "example": "dig allfordev.maitrithanh.dev A",
    "breakdown": [
      {
        "vi": "dig: Domain Information Groper (công cụ truy vấn DNS).",
        "en": "dig: Domain Information Groper DNS diagnostic tool.",
        "ja": "dig: ドメイン情報を照会するための DNS ツール。"
      },
      {
        "vi": "A: tra cứu bản ghi địa chỉ IPv4 (bản ghi A).",
        "en": "A: query IPv4 address records.",
        "ja": "A: IPv4 アドレスレコードを照会します。"
      }
    ],
    "commonErrors": [
      {
        "vi": "Kết quả trả về không có phần ANSWER SECTION (tên miền chưa trỏ DNS thành công).",
        "en": "Missing ANSWER SECTION in output, meaning DNS propagation is incomplete.",
        "ja": "DNS浸透が完了していないため、出力に ANSWER SECTION が含まれない。"
      }
    ],
    "fixes": [
      {
        "vi": "Kiểm tra lại cấu hình bản ghi tại trang quản lý tên miền và đợi DNS cập nhật (thường từ 5 phút đến 24 giờ).",
        "en": "Verify host records in your domain registrar control panel and wait for DNS propagation.",
        "ja": "ドメインレジストラの設定を確認し、DNSレコードが浸透するまでお待ちください。"
      }
    ],
    "tags": [
      "linux",
      "network",
      "dns",
      "dig"
    ],
    "variations": [
      {
        "syntax": "dig <domain> CNAME",
        "description": {
          "vi": "Tra cứu bản ghi định danh bí danh (CNAME) của tên miền.",
          "en": "Query the CNAME (Canonical Name) records for a domain.",
          "ja": "ドメインの CNAME レコードを照会します。"
        }
      },
      {
        "syntax": "dig <domain> A +short",
        "description": {
          "vi": "Chỉ lấy thông tin địa chỉ IP ngắn gọn (không hiển thị headers rườm rà).",
          "en": "Retrieve only the short IP mapping, clean of header comments.",
          "ja": "ヘッダーなどの余計な情報を省き、IPアドレスのみを短く返します。"
        }
      }
    ]
  }
];

const newNginxCommands = [
  {
    "id": "nginx-certbot",
    "name": "certbot SSL",
    "group": "Nginx",
    "categorySlug": "nginx",
    "description": {
      "vi": "Tự động cấu hình chứng chỉ SSL Let's Encrypt cho Nginx.",
      "en": "Automatically configure Let's Encrypt SSL/TLS certificates for Nginx.",
      "ja": "Nginx 用の Let's Encrypt SSL/TLS 証明書を自動設定します。"
    },
    "detail": {
      "vi": "Công cụ tự động hóa việc xác minh tên miền, tải chứng chỉ HTTPS và sửa file cấu hình Nginx tự động chỉ bằng một lệnh.",
      "en": "An automation tool that verifies domain ownership, fetches HTTPS certificates, and updates Nginx configuration automatically.",
      "ja": "ドメイン所有権の検証、HTTPS 証明書の取得、および Nginx 設定の自動更新を行う自動化ツール。"
    },
    "syntax": "sudo certbot --nginx -d <domain>",
    "example": "sudo certbot --nginx -d example.com -d www.example.com",
    "breakdown": [
      {
        "vi": "--nginx: sử dụng plugin Nginx để tự cấu hình server block.",
        "en": "--nginx: use the Nginx plugin for automated configuration.",
        "ja": "--nginx: 自動設定用の Nginx プラグインを使用します。"
      },
      {
        "vi": "-d <domain>: xác định các tên miền cần được áp dụng SSL.",
        "en": "-d <domain>: specify domains to request certificates for.",
        "ja": "-d <domain>: 証明書を要求するドメインを指定します。"
      }
    ],
    "commonErrors": [
      {
        "vi": "Lỗi xác thực (Challenge failed) do cổng 80 bị chặn hoặc DNS chưa trỏ thành công.",
        "en": "Challenge failed error because port 80 is closed or DNS points elsewhere.",
        "ja": "ポート 80 が閉じているか、DNS が別の場所を指しているためのチャレンジ失敗エラー。"
      }
    ],
    "fixes": [
      {
        "vi": "Mở cổng 80 trên tường lửa (sudo ufw allow 80/tcp) và xác nhận dig <domain> trỏ về đúng IP.",
        "en": "Open port 80 (sudo ufw allow 80/tcp) and verify DNS IP mapping with dig.",
        "ja": "ファイアウォールでポート 80 を開放し（sudo ufw allow 80/tcp）、dig で DNS 状態を確認します。"
      }
    ],
    "tags": [
      "nginx",
      "ssl",
      "https",
      "certbot",
      "security"
    ],
    "variations": [
      {
        "syntax": "sudo certbot renew --dry-run",
        "description": {
          "vi": "Chạy thử (dry-run) tiến trình gia hạn chứng chỉ tự động (để đảm bảo cron/timer hoạt động tốt).",
          "en": "Test the automatic SSL certificate renewal process without modifying real certs.",
          "ja": "実際の証明書を変更せずに、SSL 証明書の自動更新プロセスをテストします。"
        }
      }
    ]
  }
];

// Insert Linux commands right after 'linux-df'
const dfIndex = commands.findIndex(cmd => cmd.id === 'linux-df');
if (dfIndex === -1) {
  console.error("Could not find linux-df command");
  process.exit(1);
}
commands.splice(dfIndex + 1, 0, ...newLinuxCommands);
console.log(`Successfully added ${newLinuxCommands.length} Linux commands.`);

// Insert Nginx Certbot command right after 'nginx-cors' (or at the end of Nginx block)
const corsIndex = commands.findIndex(cmd => cmd.id === 'nginx-cors');
if (corsIndex === -1) {
  console.error("Could not find nginx-cors command");
  process.exit(1);
}
commands.splice(corsIndex + 1 + newLinuxCommands.length, 0, ...newNginxCommands);
console.log(`Successfully added ${newNginxCommands.length} Nginx commands.`);

// Save back to file
fs.writeFileSync(commandsPath, JSON.stringify(commands, null, 2), 'utf8');
console.log("commands.json saved successfully.");
