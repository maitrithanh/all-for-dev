export type MasterStep = {
  title: { vi: string; en: string; ja: string };
  content: { vi: string; en: string; ja: string };
  folderPath?: string;
  commands?: string[];
  code?: string;
  language?: "bash" | "json" | "typescript" | "sql" | "php";
  notes?: { vi: string; en: string; ja: string }[];
};

export type MasterGuide = {
  slug: string;
  categorySlug: string;
  title: { vi: string; en: string; ja: string };
  description: { vi: string; en: string; ja: string };
  productName: { vi: string; en: string; ja: string };
  steps: MasterStep[];
};

export const masterGuides: MasterGuide[] = [
  {
    slug: "react",
    categorySlug: "react",
    title: {
      vi: "Làm chủ React",
      en: "Master React",
      ja: "React をマスターする"
    },
    description: {
      vi: "Học React từ cơ bản đến nâng cao qua việc xây dựng ứng dụng Task Manager hoàn chỉnh.",
      en: "Learn React from basics to advanced by building a complete Task Manager application.",
      ja: "完全な Task Manager アプリケーションを構築しながら、React を基礎から応用まで学びます。"
    },
    productName: {
      vi: "Task Manager",
      en: "Task Manager",
      ja: "Task Manager"
    },
    steps: [
      {
        title: {
          vi: "Khởi tạo dự án với Vite",
          en: "Initialize project with Vite",
          ja: "Vite でプロジェクトを初期化"
        },
        content: {
          vi: "Tạo dự án React + TypeScript mới bằng Vite. Vite là công cụ build nhanh nhất cho React hiện nay.",
          en: "Create a new React + TypeScript project using Vite. Vite is the fastest build tool for React today.",
          ja: "Vite を使用して新しい React + TypeScript プロジェクトを作成します。Vite は現在最速の React ビルドツールです。"
        },
        commands: ["npm create vite@latest task-manager -- --template react-ts", "cd task-manager", "npm install"],
        notes: [
          {
            vi: "--template react-ts sẽ tạo sẵn cấu hình TypeScript cho React.",
            en: "--template react-ts scaffolds TypeScript configuration for React.",
            ja: "--template react-ts は React 用の TypeScript 設定を自動生成します。"
          },
          {
            vi: "Sau khi chạy npm install, bạn có thể mở dự án bằng VS Code.",
            en: "After npm install, open the project in VS Code.",
            ja: "npm install の後、VS Code でプロジェクトを開きます。"
          }
        ]
      },
      {
        title: {
          vi: "Tìm hiểu cấu trúc dự án",
          en: "Understand project structure",
          ja: "プロジェクト構造を理解する"
        },
        content: {
          vi: "Vite tạo cấu trúc thư mục rõ ràng: src/ chứa mã nguồn, public/ chứa tài nguyên tĩnh. App.tsx là component gốc.",
          en: "Vite creates a clean structure: src/ for source code, public/ for static assets. App.tsx is the root component.",
          ja: "Vite はクリーンな構造を作成します：src/ はソースコード、public/ は静的アセット用です。App.tsx がルートコンポーネントです。"
        },
        code: `task-manager/
├── index.html
├── src/
│   ├── main.tsx        # Entry point, render App
│   ├── App.tsx          # Root component
│   ├── App.css
│   └── ...
├── package.json
├── tsconfig.json
└── vite.config.ts`,
        notes: [
          {
            vi: "main.tsx là nơi React rendering bắt đầu, gọi ReactDOM.createRoot.",
            en: "main.tsx is where React rendering begins, calling ReactDOM.createRoot.",
            ja: "main.tsx は React のレンダリングが開始される場所で、ReactDOM.createRoot を呼び出します。"
          }
        ]
      },
      {
        title: {
          vi: "JSX & Component cơ bản",
          en: "JSX & Basic Components",
          ja: "JSX と基本コンポーネント"
        },
        content: {
          vi: "JSX là cú pháp mở rộng của JavaScript, cho phép viết HTML trong JS. Component là hàm trả về JSX. Tạo component TaskInput để thêm task mới.",
          en: "JSX is a JavaScript extension that lets you write HTML in JS. Components are functions returning JSX. Create a TaskInput component for adding new tasks.",
          ja: "JSX は JavaScript の拡張構文で、JS 内に HTML を記述できます。コンポーネントは JSX を返す関数です。新しいタスクを追加する TaskInput コンポーネントを作成します。"
        },
        folderPath: "src/components/TaskInput.tsx",
        code: `// 📄 src/components/TaskInput.tsx: Task input form component
// Define props type
interface TaskInputProps {
  onAdd: (title: string) => void;
}

const TaskInput = ({ onAdd }: TaskInputProps) => {
  // useState manages input value
  // Why: React needs state to track changes across re-renders; plain variables reset on every render
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim());
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task..."
      />
      <button type="submit">Add</button>
    </form>
  );
};`,
        notes: [
          {
            vi: "useState là React Hook cơ bản nhất, dùng để quản lý state trong function component.",
            en: "useState is the most basic React Hook, used to manage state in function components.",
            ja: "useState は最も基本的な React Hook で、関数コンポーネントの状態管理に使用します。"
          },
          {
            vi: "Props được định nghĩa bằng interface để TypeScript kiểm tra kiểu.",
            en: "Props are defined with an interface for TypeScript type checking.",
            ja: "Props はインターフェースで定義し、TypeScript が型チェックを行います。"
          }
        ]
      },
      {
        title: {
          vi: "Props & State nâng cao",
          en: "Advanced Props & State",
          ja: "高度な Props と State"
        },
        content: {
          vi: "Tạo type Task và quản lý danh sách task bằng useState. Mỗi task có id, title, và completed. Truyền dữ liệu qua props giữa các component.",
          en: "Create a Task type and manage the task list with useState. Each task has id, title, and completed. Pass data between components via props.",
          ja: "Task 型を作成し、useState でタスクリストを管理します。各タスクは id、title、completed を持ちます。Props を介してコンポーネント間でデータを渡します。"
        },
        folderPath: "src/App.tsx",
        code: `// 📄 src/App.tsx: Root component managing tasks state
// Define Task type
type Task = {
  id: number;
  title: string;
  completed: boolean;
};

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (title: string) => {
    // Why: Never mutate state directly — React needs a new array reference to detect changes
    setTasks([...tasks, { id: Date.now(), title, completed: false }]);
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div>
      <TaskInput onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
};`,
        notes: [
          {
            vi: "Không bao giờ mutate state trực tiếp, luôn tạo mảng/object mới.",
            en: "Never mutate state directly, always create new arrays/objects.",
            ja: "状態を直接変更せず、常に新しい配列/オブジェクトを作成します。"
          },
          {
            vi: "Dùng spread operator (...) để copy mảng hoặc object cũ.",
            en: "Use the spread operator (...) to copy arrays or objects.",
            ja: "スプレッド演算子（...）を使用して配列やオブジェクトをコピーします。"
          }
        ]
      },
      {
        title: {
          vi: "Render danh sách & Conditional",
          en: "List Rendering & Conditionals",
          ja: "リストレンダリングと条件分岐"
        },
        content: {
          vi: "Dùng map() để render danh sách task, filter() để lọc theo trạng thái. Thêm nút lọc All / Active / Completed.",
          en: "Use map() to render task list, filter() to filter by status. Add All / Active / Completed filter buttons.",
          ja: "map() でタスクリストをレンダリングし、filter() でステータスでフィルタリングします。All / Active / Completed フィルターボタンを追加します。"
        },
        folderPath: "src/components/TaskList.tsx",
        code: `// 📄 src/components/TaskList.tsx: Render task list with filter
type Filter = "all" | "active" | "completed";
 
const TaskList = ({ tasks, onToggle, onDelete, filter }: {
  tasks: Task[]; onToggle: (id: number) => void;
  onDelete: (id: number) => void; filter: Filter;
}) => {
  // Why: Derived state (filtering) is cheaper than storing multiple filtered lists in state
  const filtered = tasks.filter(t => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  return (
    <ul>
      {filtered.map(task => (
        // Why: Keys help React identify which items changed, moved, or were removed (reconciliation)
        <li key={task.id}>
          <input type="checkbox" checked={task.completed}
            onChange={() => onToggle(task.id)} />
          <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
            {task.title}
          </span>
          <button onClick={() => onDelete(task.id)}>✕</button>
        </li>
      ))}
    </ul>
  );
};`,
        notes: [
          {
            vi: "Luôn dùng key duy nhất khi map() để React tối ưu re-render.",
            en: "Always use a unique key when mapping to help React optimize re-renders.",
            ja: "React が再レンダリングを最適化できるよう、map() では常に一意の key を使用します。"
          }
        ]
      },
      {
        title: {
          vi: "useEffect & Gọi API",
          en: "useEffect & API Calls",
          ja: "useEffect と API 呼び出し"
        },
        content: {
          vi: "useEffect cho phép chạy side effects trong component. Dùng để fetch dữ liệu từ API, setup subscription, hoặc thao tác với DOM.",
          en: "useEffect lets you run side effects in components. Use it to fetch data from APIs, set up subscriptions, or manipulate the DOM.",
          ja: "useEffect を使用すると、コンポーネント内で副作用を実行できます。API からのデータ取得、サブスクリプションの設定、DOM 操作などに使用します。"
        },
        folderPath: "src/App.tsx",
        code: `// 📄 src/App.tsx: Fetch data with useEffect
// State: data, loading, error
// Why: Always handle loading, success, and error states for robust UX
const [data, setData] = useState<Task[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://api.example.com/tasks");
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };
  fetchTasks();
// Why: Empty deps means effect runs once on mount — prevents infinite re-fetch loops
}, []);

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
return <TaskList tasks={data} />;`,
        notes: [
          {
            vi: "Dependency array [] nghĩa là effect chạy 1 lần khi component mount.",
            en: "Empty dependency array [] means the effect runs once on mount.",
            ja: "空の依存配列 [] は、マウント時に effect が 1 回実行されることを意味します。"
          },
          {
            vi: "Luôn xử lý loading và error state để UX tốt hơn.",
            en: "Always handle loading and error states for better UX.",
            ja: "より良い UX のために、常にローディング状態とエラー状態を処理します。"
          }
        ]
      },
      {
        title: {
          vi: "React Router - Điều hướng",
          en: "React Router - Navigation",
          ja: "React Router - ナビゲーション"
        },
        content: {
          vi: "Cài đặt react-router-dom để thêm điều hướng. Tạo trang Home, About, và TaskDetail. Dùng Link thay vì a để không reload trang.",
          en: "Install react-router-dom for navigation. Create Home, About, and TaskDetail pages. Use Link instead of a to avoid page reloads.",
          ja: "react-router-dom をインストールしてナビゲーションを追加します。Home、About、TaskDetail ページを作成し、a タグの代わりに Link を使用してページリロードを回避します。"
        },
        folderPath: "src/App.tsx",
        commands: ["npm install react-router-dom"],
        code: `// 🖥️ Terminal: Install react-router-dom library
// npm install react-router-dom

// 📄 src/App.tsx: Add Router to the app
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Home = () => <div>Home page</div>;
const About = () => <div>About this app</div>;

const App = () => (
  <BrowserRouter>
    <nav>
      // Why: Link prevents full page reload, keeping SPA state intact — unlike <a> tags
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/task/:id" element={<TaskDetail />} />
    </Routes>
  </BrowserRouter>
);`,
        notes: [
          {
            vi: "BrowserRouter nên bao quanh toàn bộ app. Routes thay thế Switch cũ.",
            en: "BrowserRouter should wrap the entire app. Routes replaces the old Switch.",
            ja: "BrowserRouter はアプリ全体をラップします。Routes は古い Switch を置き換えます。"
          },
          {
            vi: "useParams() hook để lấy tham số URL như :id.",
            en: "Use the useParams() hook to get URL parameters like :id.",
            ja: "useParams() フックを使用して :id などの URL パラメータを取得します。"
          }
        ]
      },
      {
        title: {
          vi: "Context API - State toàn cục",
          en: "Context API - Global State",
          ja: "Context API - グローバルステート"
        },
        content: {
          vi: "Khi nhiều component cần chia sẻ state (như danh sách task), dùng Context API để tránh prop drilling. Tạo TaskContext provider.",
          en: "When many components need shared state (like the task list), use Context API to avoid prop drilling. Create a TaskContext provider.",
          ja: "多くのコンポーネントが状態（タスクリストなど）を共有する必要がある場合、Context API を使用して prop drilling を回避します。TaskContext プロバイダーを作成します。"
        },
        folderPath: "src/context/TaskContext.tsx",
        code: `// 📄 src/context/TaskContext.tsx: Global state with Context API
// Define context type
import { createContext, useContext, useState, ReactNode } from "react";

type TaskContextType = {
  tasks: Task[];
  addTask: (title: string) => void;
  toggleTask: (id: number) => void;
  deleteTask: (id: number) => void;
};

// Why: null default + null check catches usage outside Provider with a clear error
const TaskContext = createContext<TaskContextType | null>(null);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const addTask = (title: string) =>
    setTasks(t => [...t, { id: Date.now(), title, completed: false }]);
  const toggleTask = (id: number) =>
    setTasks(t => t.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  const deleteTask = (id: number) =>
    setTasks(t => t.filter(task => task.id !== id));

  return (
    <TaskContext.Provider value={{ tasks, addTask, toggleTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

// Why: Custom hook encapsulates context logic, better DX than raw useContext + null check everywhere
export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used within TaskProvider");
  return ctx;
};`,
        notes: [
          {
            vi: "Context giúp tránh truyền props qua nhiều cấp component.",
            en: "Context helps avoid passing props through many component levels.",
            ja: "Context を使用すると、多数のコンポーネントレベルを経由した props の受け渡しを回避できます。"
          },
          {
            vi: "Tạo custom hook (useTasks) để dễ dùng hơn.",
            en: "Create a custom hook (useTasks) for easier consumption.",
            ja: "カスタムフック（useTasks）を作成すると、より簡単に利用できます。"
          }
        ]
      },
      {
        title: {
          vi: "Custom Hooks",
          en: "Custom Hooks",
          ja: "カスタムフック"
        },
        content: {
          vi: "Custom hooks cho phép tái sử dụng logic có state giữa các component. Tạo hook useLocalStorage để lưu task vào localStorage.",
          en: "Custom hooks let you reuse stateful logic across components. Create a useLocalStorage hook to persist tasks to localStorage.",
          ja: "カスタムフックを使用すると、状態付きロジックをコンポーネント間で再利用できます。useLocalStorage フックを作成してタスクを localStorage に保存します。"
        },
        folderPath: "src/hooks/useLocalStorage.ts",
        code: `// 📄 src/hooks/useLocalStorage.ts: Persist state to localStorage
const useLocalStorage = <T,>(key: string, initial: T) => {
  const [value, setValue] = useState<T>(() => {
    // Why: localStorage throws on private browsing or quota exceeded — always wrap in try/catch
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Failed to save to localStorage", err);
    }
  }, [key, value]);

  return [value, setValue] as const;
};

// Usage trong App:
const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);`,
        notes: [
          {
            vi: "Custom hook bắt đầu bằng 'use' để React nhận diện.",
            en: "Custom hooks start with 'use' so React can recognize them.",
            ja: "カスタムフックは 'use' で始めると React が認識します。"
          },
          {
            vi: "useLocalStorage nhận 2 generic parameter: kiểu dữ liệu và giá trị mặc định.",
            en: "useLocalStorage takes 2 generic parameters: data type and default value.",
            ja: "useLocalStorage は 2 つのジェネリックパラメータ（データ型とデフォルト値）を受け取ります。"
          }
        ]
      },
      {
        title: {
          vi: "Xử lý Form nâng cao",
          en: "Advanced Form Handling",
          ja: "高度なフォーム処理"
        },
        content: {
          vi: "Thêm tính năng edit task và validation. Dùng useReducer cho form state phức tạp thay vì nhiều useState.",
          en: "Add task editing and validation. Use useReducer for complex form state instead of multiple useState calls.",
          ja: "タスク編集機能とバリデーションを追加します。複数の useState の代わりに useReducer を複雑なフォーム状態に使用します。"
        },
        folderPath: "src/components/TaskForm.tsx",
        code: `// 📄 src/components/TaskForm.tsx: Advanced form with useReducer
// Define form state and action types
type FormState = { title: string; description: string; dueDate: string };
// Why: Discriminated unions let TypeScript narrow action types and catch unhandled cases
type FormAction =
  | { type: "SET_FIELD"; field: keyof FormState; value: string }
  | { type: "RESET" };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return { title: "", description: "", dueDate: "" };
  }
};

const TaskForm = ({ task }: { task?: Task }) => {
  // Why: useReducer is cleaner than multiple useState when form fields are interdependent
  const [form, dispatch] = useReducer(formReducer, {
    title: task?.title ?? "",
    description: "",
    dueDate: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    // Save logic...
    dispatch({ type: "RESET" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={form.title}
        onChange={e => dispatch({ type: "SET_FIELD", field: "title", value: e.target.value })}
        placeholder="Task title" required />
      <textarea value={form.description}
        onChange={e => dispatch({ type: "SET_FIELD", field: "description", value: e.target.value })}
        placeholder="Description" />
      <input type="date" value={form.dueDate}
        onChange={e => dispatch({ type: "SET_FIELD", field: "dueDate", value: e.target.value })} />
      <button type="submit">{task ? "Update" : "Create"} Task</button>
    </form>
  );
};`,
        notes: [
          {
            vi: "useReducer phù hợp khi state có nhiều field hoặc logic phức tạp.",
            en: "useReducer is suitable when state has many fields or complex logic.",
            ja: "useReducer は状態に多くのフィールドがある場合や複雑なロジックがある場合に適しています。"
          },
          {
            vi: "Dùng discriminated union cho action type để TypeScript kiểm tra exhaustiveness.",
            en: "Use discriminated unions for action types so TypeScript checks exhaustiveness.",
            ja: "アクションタイプに判別共用体を使用すると、TypeScript が網羅性をチェックします。"
          }
        ]
      },
      {
        title: {
          vi: "Styling với CSS Modules",
          en: "Styling with CSS Modules",
          ja: "CSS Modules によるスタイリング"
        },
        content: {
          vi: "Vite hỗ trợ CSS Modules mặc định. File .module.css tự động scope class names, tránh xung đột.",
          en: "Vite supports CSS Modules out of the box. .module.css files automatically scope class names, avoiding conflicts.",
          ja: "Vite は CSS Modules を標準でサポートしています。.module.css ファイルはクラス名を自動的にスコープ化し、競合を防ぎます。"
        },
        folderPath: "src/components/TaskItem.tsx, src/components/TaskItem.module.css",
        code: `// 📄 src/components/TaskItem.module.css: Style cho component TaskItem
/* Card chứa thông tin task */
// Why: .module.css scopes class names automatically — no global CSS conflicts
.card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: box-shadow 0.2s;
}
.card:hover { box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
.completed { opacity: 0.6; text-decoration: line-through; }
.deleteBtn {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  color: #ef4444;
}

// TaskItem.tsx
import styles from "./TaskItem.module.css";

const TaskItem = ({ task, onToggle, onDelete }: Props) => (
  <div className={styles.card}>
    <input type="checkbox" checked={task.completed}
      onChange={() => onToggle(task.id)} />
    <span className={task.completed ? styles.completed : ""}>
      {task.title}
    </span>
    <button className={styles.deleteBtn} onClick={() => onDelete(task.id)}>
      ✕
    </button>
  </div>
);`,
        notes: [
          {
            vi: "CSS Modules tạo class name duy nhất như TaskItem_card_x7y8z, không lo xung đột.",
            en: "CSS Modules generate unique class names like TaskItem_card_x7y8z, no conflicts.",
            ja: "CSS Modules は TaskItem_card_x7y8z のような一意のクラス名を生成し、競合を防ぎます。"
          }
        ]
      },
      {
        title: {
          vi: "Testing với Vitest",
          en: "Testing with Vitest",
          ja: "Vitest によるテスト"
        },
        content: {
          vi: "Vitest là testing framework tương thích với Vite. Cài đặt và viết test cho component TaskInput.",
          en: "Vitest is a testing framework compatible with Vite. Install it and write tests for the TaskInput component.",
          ja: "Vitest は Vite 互換のテストフレームワークです。インストールして TaskInput コンポーネントのテストを記述します。"
        },
        commands: ["npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom"],
        folderPath: "src/components/TaskInput.test.tsx",
        code: `// 🖥️ Terminal: Install Vitest and testing libraries
// npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom

// 📄 src/components/TaskInput.test.tsx: Write tests for TaskInput
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TaskInput from "./TaskInput";

describe("TaskInput", () => {
  it("renders input and button", () => {
    render(<TaskInput onAdd={() => {}} />);
    expect(screen.getByPlaceholderText("Add a new task...")).toBeDefined();
    expect(screen.getByText("Add")).toBeDefined();
  });

  it("calls onAdd when form submitted", () => {
    // Why: Mock functions verify callbacks are called with correct arguments
    const onAdd = vi.fn();
    render(<TaskInput onAdd={onAdd} />);
    const input = screen.getByPlaceholderText("Add a new task...");
    fireEvent.change(input, { target: { value: "Learn React" } });
    fireEvent.click(screen.getByText("Add"));
    expect(onAdd).toHaveBeenCalledWith("Learn React");
  });

  it("clears input after submit", () => {
    const onAdd = vi.fn();
    render(<TaskInput onAdd={onAdd} />);
    const input = screen.getByPlaceholderText("Add a new task...") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Test" } });
    fireEvent.click(screen.getByText("Add"));
    expect(input.value).toBe("");
  });
});`,
        notes: [
          {
            vi: "vi.fn() tạo mock function để kiểm tra component gọi callback đúng.",
            en: "vi.fn() creates a mock function to verify the component calls callbacks correctly.",
            ja: "vi.fn() はモック関数を作成し、コンポーネントがコールバックを正しく呼び出すことを確認します。"
          }
        ]
      },
      {
        title: {
          vi: "Performance Optimization",
          en: "Performance Optimization",
          ja: "パフォーマンス最適化"
        },
        content: {
          vi: "Dùng React.memo để tránh re-render không cần thiết. useCallback và useMemo giúp ổn định reference của hàm và giá trị.",
          en: "Use React.memo to avoid unnecessary re-renders. useCallback and useMemo stabilize function references and values.",
          ja: "React.memo を使用して不要な再レンダリングを防ぎます。useCallback と useMemo は関数の参照と値を安定化します。"
        },
        folderPath: "src/App.tsx, src/components/TaskItem.tsx",
        code: `// 📄 src/components/TaskItem.tsx + src/App.tsx: Optimize performance
import { memo, useCallback, useMemo } from "react";

// Only re-render when props change
// Why: memo prevents re-render when props haven't changed (shallow comparison)
const TaskItem = memo(({ task, onToggle, onDelete }: Props) => {
  console.log("Rendering:", task.id);
  return (
    <div>
      <input type="checkbox" checked={task.completed}
        onChange={() => onToggle(task.id)} />
      <span>{task.title}</span>
      <button onClick={() => onDelete(task.id)}>✕</button>
    </div>
  );
});

const App = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);

  // useCallback keeps reference stable unless dependencies change
  // Why: Stable function reference prevents child re-renders when child is wrapped in memo
  const toggleTask = useCallback((id: number) => {
    setTasks(t => t.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }, []);

  // Why: Avoids re-computing expensive values on every render
  const completedCount = useMemo(
    () => tasks.filter(t => t.completed).length,
    [tasks]
  );

  return (
    <div>
      <p>{completedCount} / {tasks.length} completed</p>
      {tasks.map(task => (
        <TaskItem key={task.id} task={task}
          onToggle={toggleTask} onDelete={deleteTask} />
      ))}
    </div>
  );
};`,
        notes: [
          {
            vi: "React.memo chỉ kiểm tra shallow comparison. Dùng useCallback cho function props.",
            en: "React.memo only does shallow comparison. Use useCallback for function props.",
            ja: "React.memo は浅い比較のみを行います。関数 props には useCallback を使用します。"
          }
        ]
      },
      {
        title: {
          vi: "Build & Deploy lên Vercel",
          en: "Build & Deploy to Vercel",
          ja: "ビルドして Vercel にデプロイ"
        },
        content: {
          vi: "Build ứng dụng thành static files và deploy lên Vercel. Vercel tự động nhận diện Vite project.",
          en: "Build the app into static files and deploy to Vercel. Vercel automatically detects Vite projects.",
          ja: "アプリケーションを静的ファイルにビルドし、Vercel にデプロイします。Vercel は自動的に Vite プロジェクトを認識します。"
        },
        commands: ["npm run build", "npx vercel --prod"],
        code: `// 🖥️ Terminal 1: Build app into static files
// npm run build

// 🖥️ Terminal 2: Deploy to Vercel
// npx vercel --prod

// 📄 vercel.json: SPA deploy config (optional)
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}`,
        notes: [
          {
            vi: "npm run build tạo thư mục dist/ chứa toàn bộ file tĩnh.",
            en: "npm run build creates a dist/ folder with all static files.",
            ja: "npm run build はすべての静的ファイルを含む dist/ フォルダを作成します。"
          },
          {
            vi: "Cấu hình rewrites trong vercel.json để SPA routing hoạt động đúng.",
            en: "Configure rewrites in vercel.json for correct SPA routing.",
            ja: "SPA ルーティングを正しく機能させるために、vercel.json で rewrites を設定します。"
          }
        ]
      },
      {
        title: {
          vi: "Tổng kết & Ứng dụng thực tế",
          en: "Summary & Real-world Applications",
          ja: "まとめと実践的な応用"
        },
        content: {
          vi: "Bạn đã xây dựng Task Manager hoàn chỉnh với React + TypeScript. Kiến thức này có thể áp dụng để làm mọi ứng dụng web: dashboard, e-commerce, social network.",
          en: "You've built a complete Task Manager with React + TypeScript. This knowledge applies to any web app: dashboards, e-commerce, social networks.",
          ja: "React + TypeScript で完全な Task Manager を構築しました。この知識は、ダッシュボード、ECサイト、SNSなど、あらゆる Web アプリに応用できます。"
        },
        notes: [
          {
            vi: "Tiếp theo: học thêm Zustand để state management đơn giản hơn, React Query cho API caching, và Next.js cho SSR/SSG.",
            en: "Next steps: learn Zustand for simpler state management, React Query for API caching, and Next.js for SSR/SSG.",
            ja: "次のステップ：より簡単な状態管理には Zustand、API キャッシングには React Query、SSR/SSG には Next.js を学びましょう。"
          }
        ]
      }
    ]
  },
  {
    slug: "node",
    categorySlug: "node",
    title: {
      vi: "Làm chủ TypeScript & Node.js",
      en: "Master TypeScript & Node.js",
      ja: "TypeScript と Node.js をマスターする"
    },
    description: {
      vi: "Học TypeScript từ cơ bản đến nâng cao qua việc xây dựng CLI tool và REST API hoàn chỉnh.",
      en: "Learn TypeScript from basics to advanced by building a complete CLI tool and REST API.",
      ja: "CLI ツールと REST API を構築しながら、TypeScript を基礎から応用まで学びます。"
    },
    productName: {
      vi: "CLI Todo + REST API",
      en: "CLI Todo + REST API",
      ja: "CLI Todo + REST API"
    },
    steps: [
      {
        title: {
          vi: "Cài đặt Node.js và TypeScript",
          en: "Install Node.js and TypeScript",
          ja: "Node.js と TypeScript をインストール"
        },
        content: {
          vi: "Cài đặt Node.js (LTS) và khởi tạo dự án TypeScript.",
          en: "Install Node.js (LTS) and initialize a TypeScript project.",
          ja: "Node.js（LTS）をインストールし、TypeScript プロジェクトを初期化します。"
        },
        commands: ["node -v", "npm init -y", "npm install -D typescript @types/node", "npx tsc --init"],
        code: `// 🖥️ Terminal: Check Node.js is installed
// node -v

// 🖥️ Terminal: Initialize new project
// npm init -y

// 🖥️ Terminal: Install TypeScript and type definitions
// npm install -D typescript @types/node

// 🖥️ Terminal: Generate tsconfig.json
// npx tsc --init`,
        notes: [
          {
            vi: "Dùng Node.js LTS 18+ hoặc 20+.",
            en: "Use Node.js LTS 18+ or 20+.",
            ja: "Node.js LTS 18+ または 20+ を使用します。"
          }
        ]
      },
      {
        title: {
          vi: "Cấu hình TypeScript",
          en: "TypeScript Config",
          ja: "TypeScript の設定"
        },
        content: {
          vi: "Cấu hình tsconfig.json cho Node.js project. target: ES2022, module: NodeNext, outDir: dist.",
          en: "Configure tsconfig.json for a Node.js project. target: ES2022, module: NodeNext, outDir: dist.",
          ja: "Node.js プロジェクト用に tsconfig.json を設定します。target: ES2022、module: NodeNext、outDir: dist。"
        },
        folderPath: "tsconfig.json",
        code: `// 📄 tsconfig.json: TypeScript config for Node.js
// Why: strict: true catches null/undefined errors at compile time instead of runtime
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "declaration": true,
    "sourceMap": true
  },
  "include": ["src"]
}`
      },
      {
        title: {
          vi: "Types & Interfaces cơ bản",
          en: "Basic Types & Interfaces",
          ja: "基本型とインターフェース"
        },
        content: {
          vi: "Interface định nghĩa shape object. Union, intersection, enum, optional properties.",
          en: "Interfaces define object shapes. Unions, intersections, enums, optional properties.",
          ja: "インターフェースはオブジェクトの形状を定義します。ユニオン、インターセクション、列挙型、オプショナルプロパティ。"
        },
        folderPath: "src/types.ts",
        code: `// 📄 src/types.ts: Define data types for the app
// Why: Interfaces support declaration merging (extendable); types are better for unions/primitives
interface Task {
  id: string;
  title: string;
  completed: boolean;
  tags?: string[];
}

type ID = string | number;
type Status = "pending" | "done";`
      },
      {
        title: {
          vi: "Generics",
          en: "Generics",
          ja: "ジェネリクス"
        },
        content: {
          vi: "Generics tạo reusable components. Utility types: Partial, Pick, Omit, Record.",
          en: "Generics create reusable components. Utility types: Partial, Pick, Omit, Record.",
          ja: "ジェネリクスは再利用可能なコンポーネントを作成します。ユーティリティ型：Partial、Pick、Omit、Record。"
        },
        folderPath: "src/utils.ts",
        code: `// 📄 src/utils.ts: Generics and Utility Types
// Why: Generics preserve type info when reusing logic across different types — safer than any
const first = <T>(arr: T[]): T | undefined => arr[0];

interface ApiResponse<T> {
  data: T;
  status: number;
}

type TaskPreview = Pick<Task, "id" | "title">;
type TaskMap = Record<string, Task>;`
      },
      {
        title: {
          vi: "Xây dựng CLI Todo App",
          en: "Build a CLI Todo App",
          ja: "CLI Todo アプリを構築する"
        },
        content: {
          vi: "CLI tool đọc command từ process.argv, lưu JSON file, CRUD todo.",
          en: "CLI tool reads commands from process.argv, saves to JSON file, todo CRUD.",
          ja: "CLI ツールは process.argv からコマンドを読み取り、JSON ファイルに保存し、todo の CRUD を行います。"
        },
        folderPath: "src/cli.ts",
        code: `// 📄 src/cli.ts: CLI Todo App with CRUD operations
import * as fs from "node:fs";

interface Task { id: string; title: string; completed: boolean; }

const readTasks = (): Task[] => {
  // Why: File might not exist on first run — handle gracefully instead of crashing
  try {
    return JSON.parse(fs.readFileSync("todos.json", "utf-8"));
  } catch { return []; }
};

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "add": {
    const tasks = readTasks();
    tasks.push({
      // Why: randomUUID creates unique IDs without external dependencies
      id: crypto.randomUUID(),
      title: args.slice(1).join(" "),
      completed: false,
    });
    fs.writeFileSync("todos.json", JSON.stringify(tasks, null, 2));
    break;
  }
  case "list": {
    const tasks = readTasks();
    tasks.forEach((t, i) => {
      console.log(\`\${i + 1}. [\${t.completed ? "x" : " "}] \${t.title}\`);
    });
    break;
  }
}`
      },
      {
        title: {
          vi: "ES Modules (ESM)",
          en: "ES Modules (ESM)",
          ja: "ES Modules（ESM）"
        },
        content: {
          vi: "ESM là chuẩn hiện đại. Dùng \"type\": \"module\" trong package.json, import có file extension.",
          en: "ESM is the modern standard. Use \"type\": \"module\" in package.json, imports need file extension.",
          ja: "ESM は最新の標準です。package.json で \"type\": \"module\" を使用し、インポートにはファイル拡張子が必要です。"
        },
        folderPath: "package.json, src/greet.ts",
        code: `// 📄 package.json: Enable ES Modules
// Add "type": "module" to use import/export
// Why: "type": "module" enables modern import/export syntax and better tree-shaking
{ "type": "module" }

// 📄 src/greet.ts: Use ESM imports
import fs from "node:fs";
export const greet = (name: string) => \`Hello \${name}\`;`
      },
      {
        title: {
          vi: "Result Pattern",
          en: "Result Pattern",
          ja: "Result パターン"
        },
        content: {
          vi: "Discriminated union cho success/failure, TypeScript kiểm tra exhaustiveness.",
          en: "Discriminated union for success/failure, TypeScript checks exhaustiveness.",
          ja: "成功/失敗の判別共用体、TypeScript が網羅性をチェック。"
        },
        folderPath: "src/result.ts",
        code: `// 📄 src/result.ts: Result Pattern with Discriminated Union
// Why: Discriminated union forces callers to handle both success and failure — no forgotten error checks
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };

const find = (id: string): Result<Task> => {
  const task = tasks.find(t => t.id === id);
  if (!task) return { success: false, error: "Not found" };
  return { success: true, data: task };
};`
      },
      {
        title: {
          vi: "REST API với Express + Zod",
          en: "REST API with Express + Zod",
          ja: "Express + Zod で REST API"
        },
        content: {
          vi: "REST API CRUD với Express, TypeScript, Zod validation.",
          en: "CRUD REST API with Express, TypeScript, Zod validation.",
          ja: "Express、TypeScript、Zod 検証を使用した CRUD REST API。"
        },
        commands: ["npm install express", "npm install -D @types/express @types/node tsx", "npm install zod"],
        folderPath: "src/server.ts",
        code: `// 🖥️ Terminal: Install Express, Zod and dev deps
// npm install express
// npm install -D @types/express @types/node tsx
// npm install zod

// 📄 src/server.ts: Create REST API CRUD
import express from "express";
import { z } from "zod";

const app = express();
app.use(express.json());

const todoSchema = z.object({
  title: z.string().min(1).max(200),
});

app.get("/api/todos", (_req, res) => {
  res.json({ data: todos });
});

app.post("/api/todos", (req, res) => {
  // Why: safeParse returns a result object instead of throwing — cleaner error handling
  const parsed = todoSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const todo = {
    id: crypto.randomUUID(),
    title: parsed.data.title,
    completed: false,
  };
  todos.push(todo);
  res.status(201).json({ data: todo });
});

app.listen(3000, () => console.log("OK"));`
      },
      {
        title: {
          vi: "Testing với Vitest",
          en: "Testing with Vitest",
          ja: "Vitest によるテスト"
        },
        content: {
          vi: "Vitest cho TypeScript, unit test pure function, integration test API.",
          en: "Vitest for TypeScript, unit test pure functions, integration test APIs.",
          ja: "TypeScript 用の Vitest、純粋関数の単体テスト、API の統合テスト。"
        },
        commands: ["npm install -D vitest"],
        folderPath: "src/cli.test.ts",
        code: `// 🖥️ Terminal: Install Vitest
// npm install -D vitest

// 📄 src/cli.test.ts: Unit test for addTodo
import { describe, it, expect } from "vitest";

// Why: Pure functions (no I/O) are easier to test than functions that read files or call APIs
const addTodo = (title: string, todos: Task[]): Task[] => [
  ...todos,
  { id: crypto.randomUUID(), title, completed: false },
];

describe("addTodo", () => {
  it("adds a new todo", () => {
    const result = addTodo("Test", []);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Test");
  });
});`
      },
      {
        title: {
          vi: "Publish npm Package",
          en: "Publish npm Package",
          ja: "npm パッケージの公開"
        },
        content: {
          vi: "Cấu hình package.json, build, publish lên npm registry.",
          en: "Configure package.json, build, publish to npm registry.",
          ja: "package.json を設定し、ビルドして npm レジストリに公開。"
        },
        folderPath: "package.json",
        commands: ["npm version patch", "npm publish --access public"],
        code: `// 📄 package.json: Configure before publishing
{
  "name": "@scope/utils",
  "version": "1.0.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "files": ["dist"]
}

// 🖥️ Terminal: Build and publish to npm registry
// npm version patch
// npm publish --access public`
      },
      {
        title: {
          vi: "Monorepo với npm workspaces",
          en: "Monorepo with npm workspaces",
          ja: "npm workspaces によるモノレポ"
        },
        content: {
          vi: "Quản lý nhiều package trong một repo, chia sẻ code giữa API và CLI.",
          en: "Manage multiple packages in one repo, share code between API and CLI.",
          ja: "複数のパッケージを 1 つのリポジトリで管理し、API と CLI 間でコードを共有。"
        },
        folderPath: "package.json (root), packages/shared/src/index.ts, packages/api/package.json",
        code: `// 📄 package.json (root): Configure npm workspaces
{
  "private": true,
  // Why: Workspaces let API and CLI share types without publishing to npm registry
  "workspaces": ["packages/*"]
}

// 📄 packages/shared/src/index.ts: Shared code
export type { Task };

// 📄 packages/api/package.json: API depends on shared
{ "dependencies": { "@myapp/shared": "*" } }`
      },
      {
        title: {
          vi: "Tổng kết",
          en: "Summary",
          ja: "まとめ"
        },
        content: {
          vi: "Bạn đã xây dựng CLI tool + REST API với TypeScript và Node.js. Kiến thức nền tảng cho backend/fullstack.",
          en: "You've built a CLI tool + REST API with TypeScript and Node.js. Foundational knowledge for backend/fullstack.",
          ja: "TypeScript と Node.js で CLI ツール + REST API を構築しました。バックエンド/フルスタックの基礎知識です。"
        },
        notes: [
          {
            vi: "Tiếp theo: NestJS (framework), Prisma (ORM), Next.js (fullstack).",
            en: "Next: NestJS (framework), Prisma (ORM), Next.js (fullstack).",
            ja: "次に：NestJS（フレームワーク）、Prisma（ORM）、Next.js（フルスタック）。"
          }
        ]
      }
    ]
  },
  {
    slug: "laravel",
    categorySlug: "laravel",
    title: {
      vi: "Làm chủ Laravel",
      en: "Master Laravel",
      ja: "Laravel をマスターする"
    },
    description: {
      vi: "Học Laravel từ cơ bản đến nâng cao qua việc xây dựng Blog platform hoàn chỉnh.",
      en: "Learn Laravel from basics to advanced by building a complete Blog platform.",
      ja: "完全なブログプラットフォームを構築しながら、Laravel を基礎から応用まで学びます。"
    },
    productName: {
      vi: "Blog Platform",
      en: "Blog Platform",
      ja: "ブログプラットフォーム"
    },
    steps: [
      {
        title: {
          vi: "Cài đặt Laravel",
          en: "Install Laravel",
          ja: "Laravel をインストール"
        },
        content: {
          vi: "Cài đặt Laravel bằng Composer và khởi động môi trường phát triển.",
          en: "Install Laravel via Composer and start the development environment.",
          ja: "Composer 経由で Laravel をインストールし、開発環境を起動します。"
        },
        commands: ["composer create-project laravel/laravel blog", "cd blog", "php artisan serve"],
        language: "bash",
        code: `// 🖥️ Terminal: Create Laravel project
// composer create-project laravel/laravel blog
// cd blog
// php artisan serve

// 📄 .env: Configure database connection
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=blog
DB_USERNAME=root
DB_PASSWORD=`,
        folderPath: ".env",
        notes: [
          {
            vi: "Cần cài Composer trước: https://getcomposer.org",
            en: "Install Composer first: https://getcomposer.org",
            ja: "先に Composer をインストール: https://getcomposer.org"
          }
        ]
      },
      {
        title: {
          vi: "Tạo Database & Migration",
          en: "Database & Migrations",
          ja: "データベースとマイグレーション"
        },
        content: {
          vi: "Tạo database, viết migration cho bảng posts, categories, tags.",
          en: "Create database, write migrations for posts, categories, tags tables.",
          ja: "データベースを作成し、posts、categories、tags テーブルのマイグレーションを記述します。"
        },
        commands: ["php artisan make:migration create_posts_table", "php artisan make:migration create_categories_table", "php artisan make:migration create_tags_table", "php artisan migrate"],
        code: `// 🖥️ Terminal: Generate migrations
// php artisan make:migration create_posts_table
// php artisan make:migration create_categories_table
// php artisan make:migration create_tags_table

// 📄 database/migrations/xxxx_create_posts_table.php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->string('title');
    $table->string('slug')->unique();
    $table->text('content');
    // Why: Foreign key constraints prevent orphaned records at the database level
    $table->foreignId('category_id')->constrained();
    $table->timestamp('published_at')->nullable();
    $table->timestamps();
});

// 🖥️ Terminal: Run all migrations
// php artisan migrate`,
        language: "php",
        folderPath: "database/migrations/xxxx_create_posts_table.php",
        notes: [
          {
            vi: "Luôn kiểm tra file migration trước khi chạy migrate.",
            en: "Always review migration files before running migrate.",
            ja: "マイグレーション実行前に必ずファイルを確認してください。"
          }
        ]
      },
      {
        title: {
          vi: "Eloquent Models & Relationships",
          en: "Eloquent Models & Relationships",
          ja: "Eloquent モデルとリレーションシップ"
        },
        content: {
          vi: "Tạo Model với relationships: Post belongsTo Category, belongsToMany Tag.",
          en: "Create Models with relationships: Post belongsTo Category, belongsToMany Tag.",
          ja: "リレーションシップを持つモデルを作成: Post belongsTo Category、belongsToMany Tag。"
        },
        commands: ["php artisan make:model Post -m", "php artisan make:model Category -m", "php artisan make:model Tag -m", "php artisan make:model Comment -m"],
        code: `// 🖥️ Terminal: Create models with migrations
// php artisan make:model Post -m
// php artisan make:model Category -m
// php artisan make:model Tag -m

// 📄 app/Models/Post.php
class Post extends Model
{
    use HasFactory;

    // Why: $fillable protects against mass assignment vulnerabilities — only these fields can be批量 assigned
    protected $fillable = ['title', 'slug', 'content', 'category_id', 'published_at'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    // Why: Query scopes encapsulate common filters on the model, making them reusable across controllers
    public function scopePublished(Builder $query): void
    {
        $query->whereNotNull('published_at')->where('published_at', '<=', now());
    }
}`,
        language: "php",
        folderPath: "app/Models/Post.php",
        notes: [
          {
            vi: "$fillable bảo vệ Mass Assignment. Dùng scopePublished để lọc bài đã xuất bản.",
            en: "$fillable protects against Mass Assignment. Use scopePublished to filter published posts.",
            ja: "$fillable は Mass Assignment を防ぎます。scopePublished で公開済みの投稿をフィルタリングします。"
          }
        ]
      },
      {
        title: {
          vi: "Controllers & Routing",
          en: "Controllers & Routing",
          ja: "コントローラーとルーティング"
        },
        content: {
          vi: "Tạo PostController với CRUD, định nghĩa routes web và api.",
          en: "Create PostController with CRUD, define web and api routes.",
          ja: "CRUD を持つ PostController を作成し、web と api ルートを定義します。"
        },
        commands: ["php artisan make:controller PostController --resource", "php artisan make:controller Api\\PostController --resource"],
        code: `// 🖥️ Terminal: Create resource controllers
// php artisan make:controller PostController --resource
// php artisan make:controller Api\\PostController --resource

// 📄 app/Http/Controllers/PostController.php
class PostController extends Controller
{
    public function index(): View
    {
        $posts = Post::published()->with('category')->latest()->paginate(10);
        return view('posts.index', compact('posts'));
    }

    // Why: Route Model Binding auto-resolves the Post model by ID — eliminates manual findOrFail boilerplate
    public function show(Post $post): View
    {
        abort_if(is_null($post->published_at), 404);
        return view('posts.show', compact('post'));
    }
}

// 📄 routes/web.php
// Why: Explicitly limiting routes prevents unintended controller method exposure
Route::resource('posts', PostController::class)->only(['index', 'show']);

// 📄 routes/api.php
Route::apiResource('posts', Api\\PostController::class)->only(['index', 'show']);`,
        language: "php",
        folderPath: "app/Http/Controllers/PostController.php",
        notes: [
          {
            vi: "Route Model Binding tự động tìm Post theo ID. Dùng ->only() để giới hạn route.",
            en: "Route Model Binding auto-resolves Post by ID. Use ->only() to limit routes.",
            ja: "Route Model Binding は ID で Post を自動解決します。->only() でルートを制限します。"
          }
        ]
      },
      {
        title: {
          vi: "Blade Templates & Layouts",
          en: "Blade Templates & Layouts",
          ja: "Blade テンプレートとレイアウト"
        },
        content: {
          vi: "Tạo layout chính, component Blade, hiển thị danh sách posts.",
          en: "Create main layout, Blade components, render post listing.",
          ja: "メインレイアウト、Blade コンポーネントを作成し、投稿一覧を表示します。"
        },
        code: `// 📄 resources/views/layouts/app.blade.php
<!DOCTYPE html>
<html>
<head><title>@yield('title') - Blog</title></head>
<body>
    <nav>@include('partials.nav')</nav>
    <main>@yield('content')</main>
</body>
</html>

// 📄 resources/views/posts/index.blade.php
// Why: @extends keeps a single source of truth for HTML structure — avoids duplicating nav/footer on every page
@extends('layouts.app')

@section('title', 'Posts')

@section('content')
    <div class="grid gap-6">
        @forelse($posts as $post)
            <article>
                <h2>{{ $post->title }}</h2>
                <p>{{ Str::limit($post->content, 200) }}</p>
                <a href="{{ route('posts.show', $post) }}">Read more</a>
            </article>
        @empty
            <p>No posts yet.</p>
        @endforelse
    </div>
    {{ $posts->links() }}
@endsection`,
        language: "php",
        folderPath: "resources/views/posts/index.blade.php",
        notes: [
          {
            vi: "@extends kế thừa layout. @section/@yield định nghĩa vùng nội dung.",
            en: "@extends inherits a layout. @section/@yield define content areas.",
            ja: "@extends はレイアウトを継承します。@section/@yield はコンテンツ領域を定義します。"
          }
        ]
      },
      {
        title: {
          vi: "Form Validation & Requests",
          en: "Form Validation & Requests",
          ja: "フォームバリデーションとリクエスト"
        },
        content: {
          vi: "Tạo Form Request để validation, xử lý CRUD từ admin.",
          en: "Create Form Request for validation, handle admin CRUD.",
          ja: "バリデーション用の Form Request を作成し、管理画面の CRUD を処理します。"
        },
        commands: ["php artisan make:request StorePostRequest"],
        code: `// 🖥️ Terminal: Create form request
// php artisan make:request StorePostRequest

// 📄 app/Http/Requests/StorePostRequest.php
class StorePostRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'unique:posts,slug'],
            'content' => ['required', 'string', 'min:10'],
            'category_id' => ['required', 'exists:categories,id'],
            'tags' => ['array', 'exists:tags,id'],
        ];
    }
}

// 📄 app/Http/Controllers/Admin/PostController.php (store)
public function store(StorePostRequest $request)
{
    // Why: validated() returns only data that passed validation — safer than using raw $request->all()
    $post = Post::create($request->validated());
    $post->tags()->sync($request->tags);
    return redirect()->route('admin.posts.index')->with('success', 'Post created!');
}`,
        language: "php",
        folderPath: "app/Http/Requests/StorePostRequest.php",
        notes: [
          {
            vi: "Form Request tự động validate trước khi vào controller. validated() trả về dữ liệu đã validate.",
            en: "Form Request auto-validates before reaching the controller. validated() returns safe data.",
            ja: "Form Request はコントローラーに到達する前に自動検証します。validated() は安全なデータを返します。"
          }
        ]
      },
      {
        title: {
          vi: "Authentication với Laravel Breeze",
          en: "Authentication with Laravel Breeze",
          ja: "Laravel Breeze による認証"
        },
        content: {
          vi: "Cài đặt Breeze để có login/register nhanh. Tách admin và user routes.",
          en: "Install Breeze for quick login/register. Separate admin and user routes.",
          ja: "Breeze をインストールしてログイン/登録を素早く実装します。管理者とユーザールートを分離します。"
        },
        commands: ["composer require laravel/breeze --dev", "php artisan breeze:install blade", "npm install && npm run build", "php artisan migrate"],
        code: `// 🖥️ Terminal: Install Breeze with Blade stack
// composer require laravel/breeze --dev
// php artisan breeze:install blade
// npm install && npm run build
// php artisan migrate

// 📄 routes/web.php: Protect admin routes with middleware
// Why: Middleware groups centralize access control — adding a new admin route is one line
Route::middleware(['auth', 'can:admin'])->prefix('admin')->group(function () {
    Route::resource('posts', Admin\\PostController::class);
});

// 📄 app/Http/Middleware/AdminMiddleware.php (optional)
// php artisan make:middleware AdminMiddleware
class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->user() || !$request->user()->isAdmin()) {
            abort(403);
        }
        return $next($request);
    }
}`,
        language: "php",
        folderPath: "routes/web.php",
        notes: [
          {
            vi: "Breeze cung cấp sẵn login, register, password reset. Blade stack dùng TailwindCSS.",
            en: "Breeze provides login, register, password reset out-of-the-box. Blade stack uses TailwindCSS.",
            ja: "Breeze はログイン、登録、パスワードリセットを標準提供します。Blade スタックは TailwindCSS を使用します。"
          }
        ]
      },
      {
        title: {
          vi: "File Upload & Storage",
          en: "File Upload & Storage",
          ja: "ファイルアップロードとストレージ"
        },
        content: {
          vi: "Xử lý upload ảnh đại diện cho post, dùng Storage facade và liên kết public.",
          en: "Handle post thumbnail uploads using the Storage facade and public symlink.",
          ja: "Storage ファサードと公開シンボリックリンクを使用して、投稿のサムネイルアップロードを処理します。"
        },
        commands: ["php artisan storage:link"],
        code: `// 🖥️ Terminal: Create public storage symlink
// php artisan storage:link

// 📄 app/Http/Requests/StorePostRequest.php: Add thumbnail rule
'thumbnail' => ['nullable', 'image', 'mimes:jpg,png,webp', 'max:2048'],

// 📄 app/Models/Post.php: Accessor for thumbnail URL
// Why: Accessor centralizes URL generation — change storage path once, updates everywhere
public function getThumbnailUrlAttribute(): ?string
{
    return $this->thumbnail ? Storage::url($this->thumbnail) : null;
}

// 📄 In controller store method
if ($request->hasFile('thumbnail')) {
    // Why: Storing files on the 'public' disk makes them web-accessible via the storage symlink
    $post->thumbnail = $request->file('thumbnail')->store('thumbnails', 'public');
}

// Blade: <img src="{{ $post->thumbnail_url }}" alt="{{ $post->title }}">`,
        language: "php",
        folderPath: "app/Models/Post.php",
        notes: [
          {
            vi: "Chạy php artisan storage:link để tạo symlink public/storage → storage/app/public.",
            en: "Run php artisan storage:link to create public/storage → storage/app/public symlink.",
            ja: "php artisan storage:link を実行して public/storage → storage/app/public のシンボリックリンクを作成します。"
          }
        ]
      },
      {
        title: {
          vi: "API Resources & JSON",
          en: "API Resources & JSON",
          ja: "API リソースと JSON"
        },
        content: {
          vi: "Tạo API Resource để format JSON response cho Post, Category.",
          en: "Create API Resources to format JSON responses for Post, Category.",
          ja: "API リソースを作成して Post、Category の JSON レスポンスを整形します。"
        },
        commands: ["php artisan make:resource PostResource", "php artisan make:resource PostCollection"],
        code: `// 🖥️ Terminal: Create API resources
// php artisan make:resource PostResource

// 📄 app/Http/Resources/PostResource.php
class PostResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => Str::limit($this->content, 150),
            // Why: whenLoaded prevents N+1 queries — only includes relationships that were eager loaded
            'category' => new CategoryResource($this->whenLoaded('category')),
            'tags' => TagResource::collection($this->whenLoaded('tags')),
            'published_at' => $this->published_at?->diffForHumans(),
        ];
    }
}

// 📄 app/Http/Controllers/Api/PostController.php
public function index(): PostResource
{
    return PostResource::collection(Post::published()->paginate());
}`,
        language: "php",
        folderPath: "app/Http/Resources/PostResource.php",
        notes: [
          {
            vi: "whenLoaded() chỉ include relationship khi đã được eager load. Dùng diffForHumans() cho ngày thân thiện.",
            en: "whenLoaded() only includes relationship when eager loaded. Use diffForHumans() for friendly dates.",
            ja: "whenLoaded() は eager load された場合のみリレーションシップを含めます。diffForHumans() でわかりやすい日付表示にします。"
          }
        ]
      },
      {
        title: {
          vi: "Testing với PHPUnit",
          en: "Testing with PHPUnit",
          ja: "PHPUnit によるテスト"
        },
        content: {
          vi: "Viết unit test cho Model, Feature test cho API endpoints.",
          en: "Write unit tests for Models, feature tests for API endpoints.",
          ja: "モデルの単体テスト、API エンドポイントの機能テストを記述します。"
        },
        commands: ["php artisan make:test PostApiTest", "php artisan test"],
        code: `// 🖥️ Terminal: Create test and run
// php artisan make:test PostApiTest
// php artisan test

// 📄 tests/Feature/PostApiTest.php
class PostApiTest extends TestCase
{
    // Why: RefreshDatabase ensures clean state between tests — prevents test pollution from previous runs
    use RefreshDatabase;

    public function test_can_list_published_posts(): void
    {
        $published = Post::factory()->published()->create();
        Post::factory()->unpublished()->create();

        $response = $this->getJson('/api/posts');

        $response->assertOk()
            ->assertJsonCount(1, 'data');
    }

    public function test_can_show_single_post(): void
    {
        $post = Post::factory()->published()->create();

        $response = $this->getJson("/api/posts/{$post->id}");

        $response->assertOk()
            ->assertJsonPath('data.title', $post->title);
    }
}`,
        language: "php",
        folderPath: "tests/Feature/PostApiTest.php",
        notes: [
          {
            vi: "Dùng RefreshDatabase để reset DB sau mỗi test. Post::factory() tạo dữ liệu mẫu.",
            en: "Use RefreshDatabase to reset DB after each test. Post::factory() creates sample data.",
            ja: "RefreshDatabase でテストごとに DB をリセットします。Post::factory() でサンプルデータを作成します。"
          }
        ]
      },
      {
        title: {
          vi: "Artisan Commands & Queues",
          en: "Artisan Commands & Queues",
          ja: "Artisan コマンドとキュー"
        },
        content: {
          vi: "Tạo custom Artisan command để dọn dẹp bài viết cũ, dùng queue để xử lý không đồng bộ.",
          en: "Create a custom Artisan command to clean old posts, use queues for async processing.",
          ja: "カスタム Artisan コマンドを作成して古い投稿を整理し、キューで非同期処理を行います。"
        },
        commands: ["php artisan make:command CleanOldPosts", "php artisan queue:table", "php artisan migrate"],
        code: `// 🖥️ Terminal: Create command and queue table
// php artisan make:command CleanOldPosts
// php artisan queue:table
// php artisan migrate

// 📄 app/Console/Commands/CleanOldPosts.php
class CleanOldPosts extends Command
{
    // Why: Command signature with default values is self-documenting and provides CLI help automatically
    protected $signature = 'blog:clean {days=30}';
    protected $description = 'Delete old unpublished drafts';

    public function handle(): void
    {
        $count = Post::whereNull('published_at')
            ->where('created_at', '<', now()->subDays((int)$this->argument('days')))
            ->delete();

        $this->info("Deleted {$count} old drafts.");
    }
}

// 📄 app/Jobs/SendNewPostNotification.php
// Why: Queueing notifications prevents the HTTP response from waiting on email delivery
class SendNewPostNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable;

    public function __construct(public Post $post) {}

    public function handle(): void
    {
        foreach (User::all() as $user) {
            $user->notify(new NewPostNotification($this->post));
        }
    }
}`,
        language: "php",
        folderPath: "app/Console/Commands/CleanOldPosts.php",
        notes: [
          {
            vi: "Schedule command trong app/Console/Kernel.php với ->daily(). Queue cần worker: php artisan queue:work.",
            en: "Schedule the command in app/Console/Kernel.php with ->daily(). Queue needs worker: php artisan queue:work.",
            ja: "app/Console/Kernel.php で ->daily() を使用してコマンドをスケジュールします。キューにはワーカーが必要: php artisan queue:work。"
          }
        ]
      },
      {
        title: {
          vi: "Deploy lên Production",
          en: "Deploy to Production",
          ja: "プロダクションへのデプロイ"
        },
        content: {
          vi: "Build, optimize, và deploy Laravel app lên shared hosting hoặc VPS.",
          en: "Build, optimize, and deploy the Laravel app to shared hosting or VPS.",
          ja: "Laravel アプリケーションをビルド、最適化し、共有ホスティングまたは VPS にデプロイします。"
        },
        commands: ["php artisan config:cache", "php artisan route:cache", "php artisan view:cache", "php artisan optimize"],
        code: `// 🖥️ Terminal: Optimize for production
// Why: Config caching merges all config files into one — dramatically reduces framework bootstrap time
// php artisan config:cache
// php artisan route:cache
// php artisan view:cache
// php artisan optimize

// 📄 .env (production): Set app env and debug
APP_ENV=production
APP_DEBUG=false

// 📄 Deployment checklist:
// 1. Set APP_ENV=production in .env
// 2. Generate APP_KEY: php artisan key:generate
// 3. Run migrations: php artisan migrate --force
// 4. Create storage link: php artisan storage:link
// 5. Set correct file permissions: storage/, bootstrap/cache/
// 6. Use supervisor for queue worker: php artisan queue:work`,
        language: "bash",
        folderPath: ".env",
        notes: [
          {
            vi: "Trước deploy: tắt APP_DEBUG, cache config/route/view, set permission cho storage.",
            en: "Before deploy: disable APP_DEBUG, cache config/route/view, set storage permissions.",
            ja: "デプロイ前: APP_DEBUG を無効化、config/route/view をキャッシュ、ストレージのパーミッションを設定。"
          }
        ]
      },
      {
        title: {
          vi: "Tổng kết",
          en: "Summary",
          ja: "まとめ"
        },
        content: {
          vi: "Bạn đã xây dựng Blog Platform hoàn chỉnh với Laravel. Kiến thức nền cho mọi ứng dụng web PHP.",
          en: "You've built a complete Blog Platform with Laravel. Foundational knowledge for any PHP web app.",
          ja: "Laravel で完全なブログプラットフォームを構築しました。あらゆる PHP Web アプリケーションの基礎知識です。"
        },
        notes: [
          {
            vi: "Tiếp theo: Livewire (reactive UI), Filament (admin panel), Spatie packages (media, permissions).",
            en: "Next steps: Livewire (reactive UI), Filament (admin panel), Spatie packages (media, permissions).",
            ja: "次のステップ：Livewire（リアクティブUI）、Filament（管理パネル）、Spatie パッケージ（メディア、権限）。"
          }
        ]
      }
    ]
  }
];

export const findMasterGuide = (slug: string) =>
  masterGuides.find((g) => g.slug === slug);
