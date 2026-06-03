export type ComboStep = {
  command?: string;
  desc: {
    vi: string;
    en: string;
    ja: string;
  };
};

export type ComboWorkflow = {
  title: {
    vi: string;
    en: string;
    ja: string;
  };
  steps: ComboStep[];
};

export const commandCombos: Record<string, ComboWorkflow[]> = {
  "git-push": [
    {
      title: {
        vi: "Quy trình đẩy code an toàn tránh conflict (Safe Push Workflow)",
        en: "Safe Code Push Workflow (Avoid conflicts)",
        ja: "競合を避ける安全なコード送信フロー"
      },
      steps: [
        {
          command: "git stash",
          desc: {
            vi: "Lưu tạm thời các thay đổi chưa hoàn thành vào bộ nhớ đệm",
            en: "Temporarily stash your uncommitted changes",
            ja: "コミットしていない変更を一時的にスタッシュに保存する"
          }
        },
        {
          command: "git pull origin main",
          desc: {
            vi: "Kéo các thay đổi mới nhất từ nhánh chính về máy",
            en: "Pull the latest changes from the main branch to local",
            ja: "メインブランチから最新の変更をローカルにプルする"
          }
        },
        {
          command: "git stash pop",
          desc: {
            vi: "Lấy lại các thay đổi đã lưu trong stash để tiếp tục làm việc và merge",
            en: "Restore your stashed changes back and auto-merge",
            ja: "一時保存した変更をスタッシュから戻してマージする"
          }
        },
        {
          command: "git add .",
          desc: {
            vi: "Đưa toàn bộ thay đổi sau khi kiểm tra/sửa conflict vào staging",
            en: "Stage all files after resolving conflicts",
            ja: "競合を解決した後、すべてのファイルをステージングする"
          }
        },
        {
          command: "git commit -m \"feat: complete layout update\"",
          desc: {
            vi: "Tạo commit đánh dấu thay đổi",
            en: "Create a commit with a descriptive message",
            ja: "説明メッセージ付きのコミットを作成する"
          }
        },
        {
          command: "git push origin feature/ui",
          desc: {
            vi: "Đẩy an toàn code lên nhánh tương ứng của remote repository",
            en: "Safe push your commits to the remote branch",
            ja: "コミットをリモートブランチに安全にプッシュする"
          }
        }
      ]
    }
  ],
  "git-checkout-b": [
    {
      title: {
        vi: "Quy trình tạo nhánh tính năng mới và đồng bộ lên remote",
        en: "New Feature Branch Lifecycle Workflow",
        ja: "新しいフィーチャーブランチの作成とリモート同期フロー"
      },
      steps: [
        {
          command: "git checkout main",
          desc: {
            vi: "Chuyển về nhánh chính để lấy code gốc mới nhất",
            en: "Switch back to the main branch",
            ja: "メインブランチに切り替える"
          }
        },
        {
          command: "git pull origin main",
          desc: {
            vi: "Cập nhật code mới nhất trên remote về máy",
            en: "Pull the latest commits to ensure local is up-to-date",
            ja: "最新のコミットをプルしてローカルを最新にする"
          }
        },
        {
          command: "git checkout -b feature/login-page",
          desc: {
            vi: "Tạo và chuyển sang nhánh mới cho tính năng trang đăng nhập",
            en: "Scaffold and switch to the new feature branch",
            ja: "新しいフィーチャーブランチを作成して切り替える"
          }
        },
        {
          command: "git push -u origin feature/login-page",
          desc: {
            vi: "Đồng bộ và thiết lập nhánh theo dõi (tracking) trên remote ngay lúc tạo",
            en: "Set tracking branch on remote repository",
            ja: "リモートリポジトリに追跡ブランチを設定する"
          }
        }
      ]
    }
  ],
  "git-init": [
    {
      title: {
        vi: "Quy trình đưa thư mục code hiện tại lên GitHub mới",
        en: "Upload Existing Directory to a New GitHub Repository",
        ja: "既存のディレクトリを新しい GitHub リポジトリにアップロードする"
      },
      steps: [
        {
          command: "git init",
          desc: {
            vi: "Khởi tạo Git trong thư mục dự án hiện tại",
            en: "Initialize Git repository in your directory",
            ja: "現在のディレクトリに Git リポジトリを初期化する"
          }
        },
        {
          command: "git add .",
          desc: {
            vi: "Đưa tất cả file dự án vào danh sách theo dõi",
            en: "Stage all files in the directory",
            ja: "すべてのファイルをステージングする"
          }
        },
        {
          command: "git commit -m \"initial commit\"",
          desc: {
            vi: "Tạo commit đầu tiên của dự án",
            en: "Make your first initial commit",
            ja: "最初のイニシャルコミットを行う"
          }
        },
        {
          command: "git remote add origin https://github.com/user/repo.git",
          desc: {
            vi: "Liên kết thư mục máy tính với remote repository trên GitHub",
            en: "Link local directory to your remote GitHub repository",
            ja: "ローカルディレクトリをリモートの GitHub リポジトリにリンクする"
          }
        },
        {
          command: "git branch -M main",
          desc: {
            vi: "Đổi tên nhanh chính thành 'main' (tiêu chuẩn mới)",
            en: "Rename the default branch to 'main'",
            ja: "デフォルトブランチの名前を「main」に変更する"
          }
        },
        {
          command: "git push -u origin main",
          desc: {
            vi: "Đẩy toàn bộ mã nguồn lên nhánh main của GitHub",
            en: "Push local commits to GitHub and set tracking branch",
            ja: "ローカルのコミットを GitHub にプッシュし、追跡ブランチを設定する"
          }
        }
      ]
    }
  ],
  "react-create-vite": [
    {
      title: {
        vi: "Khởi chạy dự án React + TypeScript mới tạo bằng Vite",
        en: "Run Newly Created React + TS Vite Project",
        ja: "新しく作成した React + TS Vite プロジェクトを起動する"
      },
      steps: [
        {
          command: "npm create vite@latest my-app -- --template react-ts",
          desc: {
            vi: "Khởi tạo thư mục dự án với template Vite React TS",
            en: "Scaffold the project using Vite boilerplate",
            ja: "Vite テンプレートを使用してプロジェクトを作成する"
          }
        },
        {
          command: "cd my-app",
          desc: {
            vi: "Di chuyển terminal vào thư mục dự án vừa tạo",
            en: "Change directory to the created app folder",
            ja: "作成されたアプリフォルダーにディレクトリを変更する"
          }
        },
        {
          command: "npm install",
          desc: {
            vi: "Cài đặt toàn bộ dependencies trong package.json",
            en: "Install packages listed in package.json",
            ja: "package.json に記載されているパッケージをインストールする"
          }
        },
        {
          command: "npm run dev",
          desc: {
            vi: "Khởi chạy local dev server với tính năng hot-reload",
            en: "Start local Vite dev server",
            ja: "ローカルの Vite 開発サーバーを起動する"
          }
        }
      ]
    }
  ],
  "laravel-create-project": [
    {
      title: {
        vi: "Quy trình thiết lập dự án Laravel khi clone từ GitHub về",
        en: "Setup Laravel Project Cloned from GitHub",
        ja: "GitHub からクローンした Laravel プロジェクトの設定フロー"
      },
      steps: [
        {
          command: "composer install",
          desc: {
            vi: "Cài đặt các thư viện PHP cần thiết dựa trên composer.json",
            en: "Install all PHP package dependencies via Composer",
            ja: "Composer 経由ですべての PHP パッケージの依存関係をインストールする"
          }
        },
        {
          command: "cp .env.example .env",
          desc: {
            vi: "Sao chép file cấu hình môi trường để nhập cấu hình DB",
            en: "Scaffold local environmental configuration file",
            ja: "ローカル環境の設定ファイルをコピーして作成する"
          }
        },
        {
          command: "php artisan key:generate",
          desc: {
            vi: "Tạo mã khóa bảo mật APP_KEY ghi vào file .env",
            en: "Generate application encryption key",
            ja: "アプリケーション暗号化キーを生成する"
          }
        },
        {
          command: "php artisan migrate",
          desc: {
            vi: "Tạo cấu trúc bảng dữ liệu trong CSDL",
            en: "Run database table migrations",
            ja: "データベースのテーブル移行（マイグレーション）を実行する"
          }
        },
        {
          command: "php artisan db:seed",
          desc: {
            vi: "Đổ dữ liệu mẫu (mock data) vào CSDL nếu cần",
            en: "Seed database table with mock data if exists",
            ja: "モックデータ（ダミーデータ）をデータベースに投入する"
          }
        },
        {
          command: "php artisan serve",
          desc: {
            vi: "Khởi động local server chạy thử Laravel app",
            en: "Start Laravel local serve command",
            ja: "Laravel ローカルサーバーを起動する"
          }
        }
      ]
    }
  ],
  "mysql-create-db": [
    {
      title: {
        vi: "Khởi tạo database mới và viết câu lệnh tạo bảng",
        en: "Database Scaffolding and Table Setup",
        ja: "新規データベース作成とテーブル構築フロー"
      },
      steps: [
        {
          command: "CREATE DATABASE app_store_db IF NOT EXISTS;",
          desc: {
            vi: "Tạo database mới nếu tên đó chưa được đăng ký",
            en: "Create a database schema safely",
            ja: "データベーススキーマを安全に作成する"
          }
        },
        {
          command: "USE app_store_db;",
          desc: {
            vi: "Chuyển ngữ cảnh SQL làm việc vào CSDL mới tạo",
            en: "Select the database as the active context",
            ja: "作成したデータベースを作業対象として選択する"
          }
        },
        {
          command: "CREATE TABLE products (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), price INT);",
          desc: {
            vi: "Viết câu lệnh tạo bảng dữ liệu mẫu sản phẩm",
            en: "Write table schema query to create fields",
            ja: "製品フィールドを作成するためのテーブルスキーマクエリを実行する"
          }
        }
      ]
    }
  ],
  "vue-create": [
    {
      title: {
        vi: "Quy trình khởi tạo và chạy dự án Vue 3 + TypeScript mới",
        en: "Create and run a new Vue 3 + TypeScript project",
        ja: "新しい Vue 3 + TypeScript プロジェクトを作成して実行する"
      },
      steps: [
        {
          command: "npm create vue@latest my-vue-app",
          desc: {
            vi: "Khởi tạo dự án Vue 3 với tương tác chọn tính năng (TypeScript, Router, Pinia...)",
            en: "Scaffold a Vue 3 project with interactive feature selection (TypeScript, Router, Pinia...)",
            ja: "対話形式で機能を選択して Vue 3 プロジェクトを作成する（TypeScript、Router、Pinia...）"
          }
        },
        {
          command: "cd my-vue-app",
          desc: {
            vi: "Di chuyển vào thư mục dự án vừa tạo",
            en: "Navigate into the newly created project directory",
            ja: "作成したばかりのプロジェクトディレクトリに移動する"
          }
        },
        {
          command: "npm install",
          desc: {
            vi: "Cài đặt tất cả dependencies của dự án",
            en: "Install all project dependencies",
            ja: "すべてのプロジェクト依存関係をインストールする"
          }
        },
        {
          command: "npm run dev",
          desc: {
            vi: "Khởi chạy dev server với HMR để bắt đầu phát triển",
            en: "Start the dev server with HMR to begin development",
            ja: "HMR 対応の開発サーバーを起動して開発を始める"
          }
        }
      ]
    }
  ],
  "vue-component": [
    {
      title: {
        vi: "Quy trình tạo component Vue 3 với Composition API",
        en: "Create a Vue 3 component with Composition API",
        ja: "Composition API を使用して Vue 3 コンポーネントを作成する"
      },
      steps: [
        {
          command: "const props = defineProps<{ title: string }>()",
          desc: {
            vi: "Khai báo props với TypeScript để nhận dữ liệu từ component cha",
            en: "Declare props with TypeScript to receive data from parent component",
            ja: "TypeScript で props を宣言し、親コンポーネントからデータを受け取る"
          }
        },
        {
          command: "const emit = defineEmits<{ (e: 'close'): void }>()",
          desc: {
            vi: "Khai báo events để gửi dữ liệu lên component cha",
            en: "Declare events to send data back to parent component",
            ja: "親コンポーネントにデータを送信するイベントを宣言する"
          }
        },
        {
          command: "const count = ref(0)",
          desc: {
            vi: "Tạo state phản ứng với ref",
            en: "Create reactive state with ref",
            ja: "ref でリアクティブな状態を作成する"
          }
        },
        {
          command: "const doubled = computed(() => count.value * 2)",
          desc: {
            vi: "Tạo computed value phụ thuộc vào state",
            en: "Create a computed value derived from state",
            ja: "状態から派生する算出プロパティを作成する"
          }
        },
        {
          command: "onMounted(() => { fetchData() })",
          desc: {
            vi: "Gọi side effect khi component được mount (fetch API, init)",
            en: "Run side effects when component mounts (fetch API, init)",
            ja: "コンポーネントマウント時に副作用を実行する（API 取得、初期化）"
          }
        }
      ]
    }
  ],
  "docker-run": [
    {
      title: {
        vi: "Quy trình xây dựng và chạy ứng dụng trong Container",
        en: "Build and Run Docker Container Lifecycle",
        ja: "Docker コンテナのビルドと実行フロー"
      },
      steps: [
        {
          command: "docker build -t my-app:latest .",
          desc: {
            vi: "Biên dịch mã nguồn và tạo Docker Image từ file Dockerfile",
            en: "Compile and build Docker Image using Dockerfile",
            ja: "Dockerfile を使用して Docker イメージをビルドする"
          }
        },
        {
          command: "docker run -d -p 8080:80 --name my-running-app my-app:latest",
          desc: {
            vi: "Khởi chạy container chạy ngầm (-d) ánh xạ cổng 8080 sang cổng 80",
            en: "Start container in background mapping ports",
            ja: "ポートマッピングを行い、バックグラウンドでコンテナを起動する"
          }
        }
      ]
    }
  ],
  "dotnet-new": [
    {
      title: {
        vi: "Quy trình tạo Web API mới với Entity Framework Core",
        en: "Create a new Web API with Entity Framework Core",
        ja: "Entity Framework Core を使用して新しい Web API を作成する"
      },
      steps: [
        {
          command: "dotnet new webapi -n MyApi --use-controllers",
          desc: {
            vi: "Tạo dự án Web API mới sử dụng controllers",
            en: "Create a new Web API project using controllers",
            ja: "コントローラーを使用して新しい Web API プロジェクトを作成する"
          }
        },
        {
          command: "cd MyApi",
          desc: {
            vi: "Di chuyển vào thư mục dự án",
            en: "Navigate into the project directory",
            ja: "プロジェクトディレクトリに移動する"
          }
        },
        {
          command: "dotnet add package Microsoft.EntityFrameworkCore.SqlServer",
          desc: {
            vi: "Thêm gói EF Core SQL Server để kết nối CSDL",
            en: "Add EF Core SQL Server package for database connectivity",
            ja: "データベース接続用の EF Core SQL Server パッケージを追加する"
          }
        },
        {
          command: "dotnet tool install --global dotnet-ef",
          desc: {
            vi: "Cài đặt EF Core CLI tool để chạy migration",
            en: "Install EF Core CLI tool for running migrations",
            ja: "マイグレーション実行用の EF Core CLI ツールをインストールする"
          }
        },
        {
          command: "dotnet ef migrations add InitialCreate",
          desc: {
            vi: "Tạo migration đầu tiên từ DbContext",
            en: "Generate initial migration from DbContext",
            ja: "DbContext から初期マイグレーションを生成する"
          }
        },
        {
          command: "dotnet ef database update",
          desc: {
            vi: "Áp dụng migration để tạo database schema",
            en: "Apply migration to create the database schema",
            ja: "マイグレーションを適用してデータベーススキーマを作成する"
          }
        },
        {
          command: "dotnet run",
          desc: {
            vi: "Chạy ứng dụng Web API",
            en: "Run the Web API application",
            ja: "Web API アプリケーションを実行する"
          }
        }
      ]
    }
  ],
  "redux-store": [
    {
      title: {
        vi: "Quy trình thiết lập Redux từ đầu cho dự án React",
        en: "Setup Redux from scratch for a React project",
        ja: "React プロジェクトに Redux をゼロから設定する"
      },
      steps: [
        {
          command: "npm install @reduxjs/toolkit react-redux",
          desc: {
            vi: "Cài đặt Redux Toolkit và React-Redux",
            en: "Install Redux Toolkit and React-Redux",
            ja: "Redux Toolkit と React-Redux をインストールする"
          }
        },
        {
          command: "mkdir -p src/app src/features",
          desc: {
            vi: "Tạo cấu trúc thư mục: app/ chứa store, features/ chứa slice",
            en: "Create folder structure: app/ for store, features/ for slices",
            ja: "フォルダ構造を作成：app/ はストア、features/ はスライス用"
          }
        },
        {
          desc: {
            vi: "Tạo store.ts với configureStore, export RootState và AppDispatch",
            en: "Create store.ts with configureStore, export RootState and AppDispatch",
            ja: "configureStore で store.ts を作成し、RootState と AppDispatch をエクスポート"
          }
        },
        {
          desc: {
            vi: "Tạo hooks.ts với useAppDispatch và useAppSelector typed",
            en: "Create hooks.ts with typed useAppDispatch and useAppSelector",
            ja: "型付けされた useAppDispatch と useAppSelector で hooks.ts を作成"
          }
        },
        {
          desc: {
            vi: "Tạo slice cho từng feature bằng createSlice (state, reducers, actions)",
            en: "Create a slice per feature with createSlice (state, reducers, actions)",
            ja: "createSlice で機能ごとにスライスを作成（state、reducers、actions）"
          }
        },
        {
          desc: {
            vi: "Bọc <Provider store={store}> trong main.tsx",
            en: "Wrap <Provider store={store}> in main.tsx",
            ja: "main.tsx で <Provider store={store}> でラップ"
          }
        },
        {
          desc: {
            vi: "Sử dụng useAppSelector và useAppDispatch trong component",
            en: "Use useAppSelector and useAppDispatch in components",
            ja: "コンポーネントで useAppSelector と useAppDispatch を使用"
          }
        }
      ]
    }
  ]
};
