const fs = require('fs');
const path = require('path');

const commandsPath = path.join(__dirname, '../src/data/commands.json');
const commands = JSON.parse(fs.readFileSync(commandsPath, 'utf8'));

const newVueCommands = [
  {
    "id": "vue-dynamic-component",
    "name": "<component :is=\"...\">",
    "group": "Vue.js",
    "categorySlug": "vuejs",
    "description": {
      "vi": "Render linh hoạt các component khác nhau tại cùng một vị trí dựa trên điều kiện thực tế.",
      "en": "Dynamically render different components at a single anchor point based on runtime conditions.",
      "ja": "実行時の条件に基づいて、単一のアンカーポイントで異なるコンポーネントを動的にレンダリングします。"
    },
    "detail": {
      "vi": "Dùng cho các giao diện như hệ thống Tab, Dashboard động hoặc xây dựng trình kéo thả component. Khi chuyển đổi, trạng thái component mặc định sẽ bị hủy. Kết hợp với <KeepAlive> để giữ lại trạng thái cũ.",
      "en": "Ideal for Tab switchers, dynamic dashboards, or drag-and-drop builders. By default, component state is destroyed on toggle. Combine with <KeepAlive> to cache states.",
      "ja": "タブの切り替え、動的なダッシュボード、ドラッグ＆ドロップビルダーに最適です。デフォルトでは、切り替え時にコンポーネントの状態が破棄されます。<KeepAlive> と組み合わせて状態をキャッシュします。"
    },
    "syntax": "<component :is=\"currentComponent\" />",
    "example": "<KeepAlive>\n  <component :is=\"activeTab === 'profile' ? ProfileComponent : SettingsComponent\" />\n</KeepAlive>",
    "breakdown": [
      {
        "vi": "component: thẻ đặc biệt của Vue dùng để chèn component động.",
        "en": "component: Vue's built-in element used to resolve dynamic components.",
        "ja": "component: 動的コンポーネントを解決するために使用されるVueの組み込み要素。"
      },
      {
        "vi": ":is: bind tên component hoặc định nghĩa component cần render.",
        "en": ":is: bind the component name or definition that should be rendered.",
        "ja": ":is: レンダリングするコンポーネント名または定義をバインドします。"
      },
      {
        "vi": "KeepAlive: thẻ bao bọc giúp cache lại instance của component để không bị hủy.",
        "en": "KeepAlive: wrapper element to cache component instances and prevent destruction.",
        "ja": "KeepAlive: コンポーネントインスタンスをキャッシュし、破棄を防ぐラッパー要素。"
      }
    ],
    "commonErrors": [
      {
        "vi": "Component con bị reset trạng thái (ví dụ mất dữ liệu trong form) khi người dùng chuyển qua lại giữa các tab.",
        "en": "Child component state is reset (e.g., losing form input) when users switch back and forth between tabs.",
        "ja": "ユーザーがタブを切り替えたときに、子コンポーネントの状態がリセット（フォーム入力の紛失など）される。"
      }
    ],
    "fixes": [
      {
        "vi": "Bao bọc thẻ <component> bằng thẻ <KeepAlive> để giữ lại state.",
        "en": "Wrap the <component> tag inside a <KeepAlive> tag to preserve state.",
        "ja": "状態を保持するために、<component> タグを <KeepAlive> タグで囲みます。"
      }
    ],
    "tags": [
      "vue",
      "component",
      "dynamic",
      "keep-alive"
    ],
    "variations": [
      {
        "syntax": "<KeepAlive include=\"Profile,Settings\">\n  <component :is=\"activeTab\" />\n</KeepAlive>",
        "description": {
          "vi": "Chỉ cache các component cụ thể dựa trên tên component (include/exclude).",
          "en": "Only cache specific components matching designated names (include/exclude).",
          "ja": "指定された名前に一致する特定のコンポーネントのみをキャッシュします（include/exclude）。"
        }
      }
    ]
  },
  {
    "id": "vue-teleport",
    "name": "<Teleport>",
    "group": "Vue.js",
    "categorySlug": "vuejs",
    "description": {
      "vi": "Di chuyển một phần template của component ra ngoài cây DOM hiện tại của Vue sang một nút DOM đích khác.",
      "en": "Teleport a segment of a component's template into a target DOM node outside the current Vue app hierarchy.",
      "ja": "コンポーネントのテンプレートの一部を、現在のVueアプリ階層の外にあるターゲットDOMノードにテレポート（移動）します。"
    },
    "detail": {
      "vi": "Hữu ích nhất khi dựng các thành phần UI nổi như Modals, Dialogs, Tooltips, Toast Notifications để chúng không bị ảnh hưởng bởi các thuộc tính CSS như overflow: hidden hoặc z-index của cha.",
      "en": "Most useful when building floating UI components like Modals, Dialogs, Tooltips, or Toast Notifications, ensuring they aren't clipped by parent CSS overflow: hidden or z-index constraints.",
      "ja": "モーダル、ダイアログ、ツールチップ、トースト通知などのフローティングUIコンポーネントを構築する場合に最も役立ち、親のCSS `overflow: hidden` や `z-index` の制限によってクリップされるのを防ぎます。"
    },
    "syntax": "<Teleport to=\"body\"> ... </Teleport>",
    "example": "<Teleport to=\"#modal-root\">\n  <div v-if=\"isOpen\" class=\"modal\">\n    <p>Nội dung Modal</p>\n  </div>\n</Teleport>",
    "breakdown": [
      {
        "vi": "Teleport: thẻ định nghĩa việc dịch chuyển DOM.",
        "en": "Teleport: built-in element defining the DOM relocation.",
        "ja": "Teleport: DOMの再配置を定義する組み込み要素。"
      },
      {
        "vi": "to=\"#modal-root\": thuộc tính chỉ định CSS selector của phần tử đích nhận DOM.",
        "en": "to=\"#modal-root\": attribute specifying the target container's CSS selector.",
        "ja": "to=\"#modal-root\": DOMを受け取るターゲットコンテナのCSSセレクターを指定する属性。"
      }
    ],
    "commonErrors": [
      {
        "vi": "Lỗi 'Failed to locate target element' khi ứng dụng render nhưng thẻ DOM đích chưa tồn tại.",
        "en": "Error 'Failed to locate target element' when rendering before the target DOM element is mounted.",
        "ja": "ターゲットのDOM要素がマウントされる前にレンダリングしようとして、'Failed to locate target element' エラーが発生する。"
      }
    ],
    "fixes": [
      {
        "vi": "Đảm bảo thẻ HTML đích có ID tương ứng nằm sẵn trong index.html hoặc chỉ mount Teleport sau khi component cha đã mounted bằng cách kiểm tra điều kiện state.",
        "en": "Ensure the target HTML element is defined in index.html, or defer rendering the Teleport component until the parent component is mounted.",
        "ja": "ターゲットHTML要素が `index.html` に定義されていることを確認するか、親コンポーネントがマウントされるまで Teleport のレンダリングを遅延させます。"
      }
    ],
    "tags": [
      "vue",
      "teleport",
      "modal",
      "portal"
    ],
    "variations": [
      {
        "syntax": "<Teleport to=\"body\" :disabled=\"isMobile\"> ... </Teleport>",
        "description": {
          "vi": "Vô hiệu hóa việc teleport dựa trên điều kiện (ví dụ: giữ nguyên vị trí DOM cũ trên thiết bị di động).",
          "en": "Disable teleportation dynamically based on conditions (e.g., keep in place for mobile layouts).",
          "ja": "条件に基づいて動的にテレポートを無効化します（例：モバイルレイアウトでは元のDOM位置を維持する）。"
        }
      }
    ]
  },
  {
    "id": "vue-composables",
    "name": "Custom Composable",
    "group": "Vue.js",
    "categorySlug": "vuejs",
    "description": {
      "vi": "Viết các hàm helper có trạng thái (stateful functions) để chia sẻ logic nghiệp vụ dùng chung giữa các component.",
      "en": "Create custom helper functions with reactive state to share reusable business logic across components.",
      "ja": "コンポーネント間で再利用可能なビジネスロジックを共有するために、リアクティブな状態を持つカスタムヘルパー関数を作成します。"
    },
    "detail": {
      "vi": "Là phương pháp tối ưu thay thế Mixins của Vue 2. Một Composable trả về các ref và hàm, giúp dễ dàng theo dõi nguồn gốc dữ liệu, không lo xung đột tên và hỗ trợ TypeScript hoàn hảo.",
      "en": "The modern replacement for Vue 2 Mixins. A Composable returns refs and methods, clarifying source variables, preventing namespace conflicts, and offering excellent TypeScript support.",
      "ja": "Vue 2 の Mixins に代わる現代的な手法です。コンポーザブルは ref とメソッドを返し、変数の出所を明確にし、名前空間の衝突を防ぎ、優れた TypeScript サポートを提供します。"
    },
    "syntax": "export function useMyFeature() { ... return { state, action } }",
    "example": "import { ref, onMounted, onUnmounted } from 'vue'\n\nexport function useMousePosition() {\n  const x = ref(0)\n  const y = ref(0)\n  const update = (e) => { x.value = e.pageX; y.value = e.pageY }\n  onMounted(() => window.addEventListener('mousemove', update))\n  onUnmounted(() => window.removeEventListener('mousemove', update))\n  return { x, y }\n}",
    "breakdown": [
      {
        "vi": "useMousePosition: quy chuẩn đặt tên composable bắt đầu bằng từ 'use'.",
        "en": "useMousePosition: naming convention for composables starting with 'use'.",
        "ja": "useMousePosition: 'use' で始まるコンポーザブルの命名規則。"
      },
      {
        "vi": "return { x, y }: trả về các refs để component sử dụng trực tiếp.",
        "en": "return { x, y }: return refs so components can destructure and bind them.",
        "ja": "return { x, y }: コンポーネントが分割代入してバインドできるように ref を返します。"
      }
    ],
    "commonErrors": [
      {
        "vi": "Giá trị trả về từ Composable bị mất tính phản ứng (reactivity) khi destructure bằng cú pháp ES6 thông thường nếu bên trong Composable dùng reactive thay vị ref.",
        "en": "Values returned from a composable losing reactivity when destructured using ES6 syntax if using reactive objects instead of individual refs inside.",
        "ja": "内部で個別の ref の代わりに reactive オブジェクトを使用している場合、ES6の分割代入を使用するとリアクティビティが失われる。"
      }
    ],
    "fixes": [
      {
        "vi": "Sử dụng toRefs để chuyển đổi đối tượng reactive trước khi return, hoặc chỉ return các refs riêng lẻ.",
        "en": "Use toRefs to convert the reactive object before returning it, or return individual refs.",
        "ja": "返す前に reactive オブジェクトを `toRefs` で変換するか、個々の ref を返します。"
      }
    ],
    "tags": [
      "vue",
      "composable",
      "composition-api",
      "hooks"
    ],
    "variations": [
      {
        "syntax": "const { data, error } = useFetch('/api/users')",
        "description": {
          "vi": "Composable nhận tham số đầu vào động để xử lý logic tương thích (như API URL).",
          "en": "Pass dynamic arguments to a composable to handle variable parameters (like API URL).",
          "ja": "変数パラメータ（API URLなど）を処理するために、動的引数をコンポーザブルに渡します。"
        }
      }
    ]
  },
  {
    "id": "vue-next-tick",
    "name": "nextTick()",
    "group": "Vue.js",
    "categorySlug": "vuejs",
    "description": {
      "vi": "Trì hoãn việc thực thi callback cho đến chu kỳ cập nhật DOM kế tiếp của Vue hoàn thành.",
      "en": "Defer the execution of a callback until Vue's next DOM update cycle has completed.",
      "ja": "Vue の次の DOM 更新サイクルが完了するまで、コールバックの実行を遅延させます。"
    },
    "detail": {
      "vi": "Khi bạn cập nhật biến ref, Vue sẽ gom các thay đổi DOM lại để cập nhật bất đồng bộ theo lô nhằm tối ưu hiệu năng. Sử dụng nextTick nếu bạn cần lấy kích thước DOM mới, focus vào thẻ input mới vẽ, hoặc điều khiển vị trí scroll ngay sau khi cập nhật dữ liệu.",
      "en": "When modifying a ref, Vue batches DOM updates asynchronously for performance. Use nextTick if you need to calculate new DOM sizes, focus a newly rendered input, or scroll containers immediately after updating state.",
      "ja": "ref を変更すると、Vue はパフォーマンスのために DOM 更新を非同期でバッチ処理します。状態更新の直後に新しい DOM サイズを計算したり、新しく描画された入力欄にフォーカスしたり、コンテナをスクロールしたりする必要がある場合は、nextTick を使用します。"
    },
    "syntax": "await nextTick()",
    "example": "const showInput = ref(false)\nconst inputRef = ref(null)\n\nconst editTodo = async () => {\n  showInput.value = true\n  await nextTick()\n  inputRef.value.focus() // Đã có trong DOM nên focus được\n}",
    "breakdown": [
      {
        "vi": "showInput.value = true: Thay đổi biến điều khiển hiển thị v-if.",
        "en": "showInput.value = true: Toggle state controlling v-if input visibility.",
        "ja": "showInput.value = true: v-if の表示を制御する状態を切り替えます。"
      },
      {
        "vi": "await nextTick(): Chờ Vue vẽ xong phần tử input vào DOM.",
        "en": "await nextTick(): Wait until Vue flushes DOM changes and renders the input.",
        "ja": "await nextTick(): Vue が DOM 変更をフラッシュし、入力欄を描画するまで待機します。"
      }
    ],
    "commonErrors": [
      {
        "vi": "Truy cập vào template ref ngay lập tức sau khi đổi biến v-if sang true trả về undefined hoặc null.",
        "en": "Accessing a template ref immediately after changing a v-if state to true returns undefined or null.",
        "ja": "v-if の状態を true に変更した直後にテンプレート参照（ref）にアクセスすると、undefined または null が返される。"
      }
    ],
    "fixes": [
      {
        "vi": "Thêm async/await và gọi nextTick() trước khi gọi các hàm DOM của ref.",
        "en": "Add async/await and call nextTick() before performing DOM operations on the ref.",
        "ja": "async/await を追加し、ref に対して DOM 操作を行う前に nextTick() を呼び出します。"
      }
    ],
    "tags": [
      "vue",
      "next-tick",
      "dom",
      "lifecycle",
      "async"
    ],
    "variations": [
      {
        "syntax": "nextTick(() => { console.log('DOM updated callback') })",
        "description": {
          "vi": "Sử dụng cú pháp callback truyền thống thay vì async/await.",
          "en": "Use the traditional callback syntax instead of the async/await promise wrapper.",
          "ja": "async/await プロミスラッパーの代わりに、従来のコールバック構文を使用します。"
        }
      }
    ]
  },
  {
    "id": "vue-expose",
    "name": "defineExpose()",
    "group": "Vue.js",
    "categorySlug": "vuejs",
    "description": {
      "vi": "Khai báo rõ ràng những biến và hàm của component con mà component cha có quyền truy cập qua template ref.",
      "en": "Explicitly specify which properties and methods of a child component are exposed to its parent via template refs.",
      "ja": "テンプレート参照（ref）を介して親コンポーネントに公開する、子コンポーネントのプロパティやメソッドを明示的に指定します。"
    },
    "detail": {
      "vi": "Khi sử dụng <script setup>, mặc định component sẽ đóng kín (private). Cả biến và hàm bên trong không thể bị đọc/gọi từ ngoài. Dùng defineExpose ở component con để mở các tính năng như: .open() của Modal, .reset() của Form.",
      "en": "By default, components using <script setup> are closed. Their internal states and methods cannot be accessed from outside. Use defineExpose in child components to open APIs like Modal's .open() or Form's .reset().",
      "ja": "デフォルトでは、<script setup> を使用するコンポーネントは非公開です。内部の状態やメソッドには外部からアクセスできません。子コンポーネントで defineExpose を使用して、モーダルの .open() やフォームの .reset() などの API を公開します。"
    },
    "syntax": "defineExpose({ exposeVar, exposeMethod })",
    "example": "<!-- ChildComponent.vue -->\n<script setup>\nimport { ref } from 'vue'\nconst message = ref('Hello')\nconst resetForm = () => { /* logic */ }\n\ndefineExpose({ message, resetForm })\n</script>",
    "breakdown": [
      {
        "vi": "defineExpose: macro của trình biên dịch Vue, không cần import thủ công.",
        "en": "defineExpose: compiler macro in Vue, no need to import manually.",
        "ja": "defineExpose: Vue のコンパイラマクロ。手動インポートは不要です。"
      },
      {
        "vi": "{ message, resetForm }: các biến/hàm được chọn lọc để phơi bày ra ngoài.",
        "en": "{ message, resetForm }: key-value pairs of state/methods exposed to parent context.",
        "ja": "{ message, resetForm }: 親コンテキストに公開される状態/メソッドのキーと値のペア。"
      }
    ],
    "commonErrors": [
      {
        "vi": "Lỗi 'childRef.value.someMethod is not a function' khi gọi hàm của component con từ component cha.",
        "en": "Error 'childRef.value.someMethod is not a function' when invoking a child method from a parent component ref.",
        "ja": "親コンポーネントの参照から子のメソッドを呼び出す際に、'childRef.value.someMethod is not a function' エラーが発生する。"
      }
    ],
    "fixes": [
      {
        "vi": "Kiểm tra lại xem component con đã khai báo hàm đó trong defineExpose chưa.",
        "en": "Ensure the target method is listed inside the child's defineExpose({...}) block.",
        "ja": "対象のメソッドが子コンポーネントの `defineExpose({...})` ブロック内にリストされていることを確認します。"
      }
    ],
    "tags": [
      "vue",
      "define-expose",
      "refs",
      "parent-child",
      "setup"
    ],
    "variations": [
      {
        "syntax": "// Trong cha\nconst child = ref(null)\nchild.value.resetForm()",
        "description": {
          "vi": "Cú pháp component cha gọi hàm đã được expose của component con.",
          "en": "Syntax for the parent component to call the exposed method on the child instance ref.",
          "ja": "公開されたメソッドを子インスタンスの参照から親コンポーネントが呼び出すための構文。"
        }
      }
    ]
  },
  {
    "id": "vue-define-async-component",
    "name": "defineAsyncComponent()",
    "group": "Vue.js",
    "categorySlug": "vuejs",
    "description": {
      "vi": "Định nghĩa một component tải bất đồng bộ (lazy load), giúp chia nhỏ bundle ứng dụng.",
      "en": "Define a component to be loaded asynchronously (lazy load) when it is rendered on screen.",
      "ja": "画面にレンダリングされるときに非同期に読み込まれるコンポーネント（遅延読み込み）を定義します。"
    },
    "detail": {
      "vi": "Giải pháp vàng để tăng tốc độ tải trang ban đầu (Performance). Thay vì import trực tiếp làm phình file JS chính, defineAsyncComponent cho phép chỉ tải file JS của component khi nó thực sự cần hiển thị (ví dụ: Modal lớn chỉ tải khi bấm nút mở).",
      "en": "A vital performance solution. Instead of standard imports which bloat the main JS bundle, defineAsyncComponent allows components (like large dialogs) to load dynamically only when needed.",
      "ja": "重要なパフォーマンス向上策です。メインの JS バンドルを肥大化させる標準のインポートの代わりに、`defineAsyncComponent` を使用すると、コンポーネント（大きなダイアログなど）が必要なときにのみ動的に読み込まれます。"
    },
    "syntax": "const AsyncComp = defineAsyncComponent(() => import('./Comp.vue'))",
    "example": "import { defineAsyncComponent } from 'vue'\n\nconst AdminDashboard = defineAsyncComponent({\n  loader: () => import('./components/AdminDashboard.vue'),\n  loadingComponent: LoadingSpinner,\n  errorComponent: ErrorFallback,\n  delay: 200,\n  timeout: 3000\n})",
    "breakdown": [
      {
        "vi": "loader: () => import(...): hàm trả về dynamic import chỉ định đường dẫn file component.",
        "en": "loader: () => import(...): function returning a dynamic import path for code splitting.",
        "ja": "loader: () => import(...): コード分割用の動的インポートパスを返す関数。"
      },
      {
        "vi": "loadingComponent: Component hiển thị tạm thời trong lúc tải mạng.",
        "en": "loadingComponent: temporary spinner/skeleton component shown while downloading.",
        "ja": "loadingComponent: ダウンロード中に一時的に表示されるスピナー/スケルトンコンポーネント。"
      }
    ],
    "commonErrors": [
      {
        "vi": "Lỗi trắng trang hoặc giật lag cục bộ khi người dùng kích hoạt mở một component bất đồng bộ do kết nối mạng yếu.",
        "en": "Blank screen or UI lag when user triggers an async component on a slow internet connection.",
        "ja": "低速インターネット接続でユーザーが非同期コンポーネントをトリガーしたときに、画面が一時的に空白になる、またはUIがラグる。"
      }
    ],
    "fixes": [
      {
        "vi": "Luôn cấu hình loadingComponent để có giao diện skeleton/spinner thân thiện, hoặc dùng kết hợp thẻ <Suspense>.",
        "en": "Provide a loadingComponent placeholder or wrap the layout with a <Suspense> component.",
        "ja": "ローディング用のコンポーネントを指定するか、レイアウトを `<Suspense>` コンポーネントで囲みます。"
      }
    ],
    "tags": [
      "vue",
      "async-component",
      "lazy-load",
      "performance",
      "bundler"
    ],
    "variations": [
      {
        "syntax": "const SimpleAsync = defineAsyncComponent(() => import('./Simple.vue'))",
        "description": {
          "vi": "Cú pháp rút gọn dạng shorthand phổ biến khi không cần cấu hình nâng cao.",
          "en": "Shorthand syntax commonly used when advanced loading parameters are unnecessary.",
          "ja": "高度な読み込みパラメータが必要ない場合に一般的に使用される省略構文。"
        }
      }
    ]
  },
  {
    "id": "vue-router-guards",
    "name": "Navigation Guards",
    "group": "Vue.js",
    "categorySlug": "vuejs",
    "description": {
      "vi": "Các bộ lọc điều hướng giúp chặn, chuyển hướng hoặc kiểm tra quyền truy cập route của người dùng trước khi trang được tải.",
      "en": "Navigation interceptors to authorize, redirect, or cancel route transitions before they resolve.",
      "ja": "ルート遷移が解決される前に、ユーザーのアクセスを認可、リダイレクト、またはキャンセルするためのナビゲーションインターセプター。"
    },
    "detail": {
      "vi": "Trọng tâm của phân quyền ứng dụng Vue. beforeEach chạy trước mỗi lần chuyển trang. Bằng cách kết hợp với trường meta của route, ta có thể dễ dàng kiểm tra trạng thái login của người dùng và chuyển hướng về trang đăng nhập nếu chưa hợp lệ.",
      "en": "The core of routing authorization in Vue apps. beforeEach executes before any transition. By checking route meta fields, it redirects unauthenticated users to a login route.",
      "ja": "Vue アプリにおけるルーティング認可の核心です。`beforeEach` は遷移前に実行されます。ルートのメタフィールドを確認することで、未認証のユーザーをログインルートにリダイレクトします。"
    },
    "syntax": "router.beforeEach((to, from) => { ... })",
    "example": "router.beforeEach((to, from) => {\n  const token = localStorage.getItem('user-token')\n  if (to.meta.requiresAuth && !token) {\n    return { name: 'Login', query: { redirect: to.fullPath } }\n  }\n})",
    "breakdown": [
      {
        "vi": "to: tuyến đường đích người dùng đang muốn đến.",
        "en": "to: the target Route Location being navigated to.",
        "ja": "to: ナビゲート先であるターゲットのルートロケーション。"
      },
      {
        "vi": "to.meta.requiresAuth: truy cập thuộc tính tùy chỉnh được cấu hình ở danh sách routes.",
        "en": "to.meta.requiresAuth: access meta custom fields defined on the target route config.",
        "ja": "to.meta.requiresAuth: ターゲットルート設定で定義されたメタカスタムフィールドにアクセスします。"
      }
    ],
    "commonErrors": [
      {
        "vi": "Lỗi lặp chuyển hướng vô tận (Infinite loop redirect) làm treo trình duyệt khi gọi điều hướng đến trang Login nhưng trang Login cũng kích hoạt guard bắt chuyển đến chính nó.",
        "en": "Infinite redirect loops causing browser freezes when redirecting to Login because the Login route triggers the same guard logic.",
        "ja": "ログインへのリダイレクトが同じガードロジックをトリガーするため、ログインにリダイレクトする際に無限ループが発生し、ブラウザがフリーズする。"
      }
    ],
    "fixes": [
      {
        "vi": "Luôn kiểm tra điều kiện to.name !== 'Login' trước khi chuyển hướng người dùng đến route Login.",
        "en": "Always ensure to.name !== 'Login' is true before triggering a login redirect inside the guard.",
        "ja": "ガード内でログインリダイレクトをトリガーする前に、常に `to.name !== 'Login'` であることを確認します。"
      }
    ],
    "tags": [
      "vue",
      "router",
      "guard",
      "auth",
      "redirect"
    ],
    "variations": [
      {
        "syntax": "router.afterEach((to, from) => { /* analytics */ })",
        "description": {
          "vi": "Hành động sau khi chuyển trang hoàn tất (ví dụ: thay đổi title trang, gửi dữ liệu analytics).",
          "en": "Hook triggered after navigation resolves (e.g. updating document title, page views tracking).",
          "ja": "ナビゲーションが解決された後にトリガーされるフック（例：ドキュメントタイトルの更新、ページビューの追跡）。"
        }
      }
    ]
  },
  {
    "id": "vue-custom-directive",
    "name": "Custom Directives",
    "group": "Vue.js",
    "categorySlug": "vuejs",
    "description": {
      "vi": "Tự định nghĩa các chỉ thị v- mới để tái sử dụng logic tương tác trực tiếp với DOM.",
      "en": "Register custom v- directives to reuse low-level DOM access and manipulation logic.",
      "ja": "低レベルの DOM アクセスと操作ロジックを再利用するために、カスタムの v- ディレクティブを登録します。"
    },
    "detail": {
      "vi": "Dùng khi bạn cần can thiệp sâu vào DOM của một thẻ HTML bất kỳ mà không muốn lặp lại code ở nhiều component. Ví dụ: tự động focus ô nhập liệu (v-focus), phát hiện click bên ngoài phần tử để đóng menu (v-click-outside).",
      "en": "Used when you need direct DOM manipulation on a raw element without repeating logic in multiple components (e.g., auto-focusing inputs, click-outside detection for dropdowns).",
      "ja": "複数のコンポーネントでロジックを繰り返すことなく、生のエレメントに対して直接DOM操作を行いたい場合に使用します（例：入力の自動フォーカス、ドロップダウンの要素外クリック検出など）。"
    },
    "syntax": "app.directive('dir-name', { mounted(el, binding) { ... } })",
    "example": "// Đăng ký toàn cục trong main.js\napp.directive('click-outside', {\n  mounted(el, binding) {\n    el.clickOutsideEvent = (event) => {\n      if (!(el === event.target || el.contains(event.target))) {\n        binding.value(event)\n      }\n    }\n    document.body.addEventListener('click', el.clickOutsideEvent)\n  },\n  unmounted(el) {\n    document.body.removeEventListener('click', el.clickOutsideEvent)\n  }\n})",
    "breakdown": [
      {
        "vi": "mounted(el, binding): hook kích hoạt khi thẻ gắn vào DOM. el là DOM thô, binding chứa giá trị truyền vào.",
        "en": "mounted(el, binding): hook fired when element is attached to DOM. el is raw DOM node, binding holds arguments.",
        "ja": "mounted(el, binding): 要素がDOMにアタッチされたときに発生するフック。el は生のDOMノード、binding は渡された引数を保持します。"
      },
      {
        "vi": "unmounted(el): hook kích hoạt khi thẻ bị xóa khỏi DOM. Dùng để dọn dẹp bộ nhớ.",
        "en": "unmounted(el): lifecycle hook triggered when element is removed. Used to clean memory.",
        "ja": "unmounted(el): 要素が削除されたときに発生するライフサイクルフック。メモリのクリーンアップに使用されます。"
      }
    ],
    "commonErrors": [
      {
        "vi": "Rò rỉ bộ nhớ (Memory leaks) do đăng ký addEventListener lên thẻ document/window ở mounted nhưng không gỡ ra ở unmounted.",
        "en": "Memory leaks caused by binding global event listeners to window/document without removing them on component unmount.",
        "ja": "コンポーネントのアンマウント時にイベントリスナーを削除せずに、グローバルイベントリスナーを window/document にバインドすることによるメモリリーク。"
      }
    ],
    "fixes": [
      {
        "vi": "Luôn luôn tháo các event listeners tương ứng trong hook unmounted(el) để giải phóng bộ nhớ.",
        "en": "Always call removeEventListener in the unmounted hook to free up browser memory.",
        "ja": "ブラウザのメモリを解放するために、必ず `unmounted` フック内で `removeEventListener` を呼び出します。"
      }
    ],
    "tags": [
      "vue",
      "directive",
      "dom",
      "event",
      "plugin"
    ],
    "variations": [
      {
        "syntax": "<input v-focus />",
        "description": {
          "vi": "Cách áp dụng directive tùy chỉnh đơn giản (v-focus) vào các thẻ HTML trong template.",
          "en": "How to bind a simple custom directive (v-focus) to a HTML template element.",
          "ja": "HTMLテンプレート要素にシンプルなカスタムディレクティブ（v-focus）をバインドする方法。"
        }
      }
    ]
  },
  {
    "id": "vue-style-v-bind",
    "name": "CSS v-bind()",
    "group": "Vue.js",
    "categorySlug": "vuejs",
    "description": {
      "vi": "Liên kết trực tiếp các thuộc tính trong CSS của component với các biến phản ứng của Javascript.",
      "en": "Bind CSS property values inside SFC <style> tags directly to reactive JavaScript variables.",
      "ja": "SFC の `<style>` タグ内の CSS プロパティ値を、リアクティブな JavaScript 変数に直接バインドします。"
    },
    "detail": {
      "vi": "Giải pháp tuyệt vời để đổi giao diện động (dynamic theme). Vue tự biên dịch v-bind() thành các CSS Custom Properties (biến CSS) và áp dụng inline động, giúp code CSS sạch, dễ đọc hơn so với viết style inline trong template.",
      "en": "A perfect solution for dynamic theme switching. Vue compiles v-bind() into inline CSS custom properties, keeping CSS clean and separation of concerns high compared to template inline styles.",
      "ja": "動的なテーマ切り替えに最適なソリューション。Vue は `v-bind()` をインラインの CSS カスタムプロパティにコンパイルし、CSS をクリーンに保ちます。"
    },
    "syntax": ".element { color: v-bind(colorVar); }",
    "example": "<script setup>\nimport { ref } from 'vue'\nconst theme = ref({\n  primary: '#42b883',\n  fontSize: '18px'\n})\n</script>\n\n<template>\n  <h1 class=\"title\">Vue 3 Guide</h1>\n</template>\n\n<style scoped>\n.title {\n  color: v-bind('theme.primary');\n  font-size: v-bind('theme.fontSize');\n}\n</style>",
    "breakdown": [
      {
        "vi": "v-bind('theme.primary'): tham chiếu đến đường dẫn thuộc tính của ref chứa thông tin màu sắc.",
        "en": "v-bind('theme.primary'): bind the CSS property directly to nested object properties inside quotes.",
        "ja": "v-bind('theme.primary'): クォート内のネストされたオブジェクトプロパティに CSS プロパティを直接バインドします。"
      }
    ],
    "commonErrors": [
      {
        "vi": "Giá trị CSS không được cập nhật hoặc không hoạt động khi gán trực tiếp một đối tượng mà không phải là một chuỗi thuộc tính hợp lệ.",
        "en": "CSS updates fail to apply when linking raw objects instead of valid CSS primitive strings (like colors, sizes).",
        "ja": "有効な CSS プリミティブ文字列（色やサイズなど）ではなく、生のオブジェクトをリンクした場合に CSS の更新が適用されない。"
      }
    ],
    "fixes": [
      {
        "vi": "Đảm bảo giá trị của biến Javascript trả về là các giá trị hợp lệ của CSS (ví dụ: 'red', '12px', 'block').",
        "en": "Ensure the evaluated JavaScript variable results in a valid CSS property string.",
        "ja": "評価された JavaScript 変数が、有効な CSS プロパティ文字列になるように確認します。"
      }
    ],
    "tags": [
      "vue",
      "css",
      "style",
      "v-bind",
      "theme"
    ],
    "variations": [
      {
        "syntax": ".text { color: v-bind(isError ? 'red' : 'black'); }",
        "description": {
          "vi": "Sử dụng biểu thức điều kiện trực tiếp bên trong cú pháp CSS v-bind.",
          "en": "Leverage conditional expressions directly inside the CSS v-bind evaluator.",
          "ja": "CSS の `v-bind` 評価器の中で条件式を直接利用します。"
        }
      }
    ]
  },
  {
    "id": "vue-reactivity-utility",
    "name": "shallowRef() & markRaw()",
    "group": "Vue.js",
    "categorySlug": "vuejs",
    "description": {
      "vi": "Giảm bớt gánh nặng reactivity đệ quy sâu đối với các object lớn để tối ưu hiệu năng.",
      "en": "Skip deep recursive reactivity tracking on large object trees to optimize performance.",
      "ja": "パフォーマンスを最適化するために、大きなオブジェクトツリーでの深い再帰的なリアクティビティ追跡をスキップします。"
    },
    "detail": {
      "vi": "Mặc định, ref() và reactive() quét sâu qua mọi cấp con của đối tượng để cài đặt Proxy. Đối với các dữ liệu lớn, hàng nghìn hàng (ví dụ: log API, bản đồ địa lý hoặc thư viện Three.js), việc này gây treo server/trình duyệt. shallowRef chỉ theo dõi thay đổi ở tầng ngoài cùng, trong khi markRaw ngăn hoàn toàn đối tượng bị biến đổi thành reactive.",
      "en": "By default, ref() and reactive() traverse objects deeply to install proxy wrappers. For huge datasets (e.g. millions of rows, charts, map instances, or complex SDK states), this wastes CPU/RAM. shallowRef only watches root-level mutations, while markRaw prevents proxies entirely.",
      "ja": "デフォルトでは、`ref()` と `reactive()` はオブジェクトを深くトラバースしてプロキシを適用します。巨大なデータセット（何百万行もの行、チャート、マップインスタンス、または複雑なSDK状態など）の場合、CPUやRAMを浪費します。`shallowRef` はルートレベルの変更のみを監視し、`markRaw` はプロキシの適用を完全に防ぎます。"
    },
    "syntax": "const data = shallowRef(largeObject)",
    "example": "import { shallowRef, markRaw } from 'vue'\n\nconst mapInstance = shallowRef(null)\n\nconst initMap = () => {\n  const rawMap = new ThirdPartyMapLibrary() // Thư viện nặng\n  mapInstance.value = markRaw(rawMap) // Không cho proxy hóa thư viện này\n}",
    "breakdown": [
      {
        "vi": "shallowRef: Tạo ref chỉ phản ứng khi gán đè thuộc tính .value (không theo dõi thuộc tính con).",
        "en": "shallowRef: creates a ref that only tracks value changes at the root level, ignoring nested props.",
        "ja": "shallowRef: ルートレベルでの値の変更のみを追跡し、ネストされたプロパティを無視する ref を作成します。"
      },
      {
        "vi": "markRaw: Hàm đánh dấu đối tượng không bao giờ được chuyển đổi thành proxy.",
        "en": "markRaw: utility to mark an object so it is never converted to a reactive proxy.",
        "ja": "markRaw: オブジェクトがリアクティブプロキシに変換されないようにマークするユーティリティ。"
      }
    ],
    "commonErrors": [
      {
        "vi": "Sử dụng shallowRef nhưng thay đổi thuộc tính con (ví dụ: data.value.items.push(x)) không thấy giao diện cập nhật.",
        "en": "Mutating nested fields inside a shallowRef value (e.g., data.value.items.push(x)) and wondering why the template does not update.",
        "ja": "`shallowRef` 値のネストされたフィールドを変更（例: `data.value.items.push(x)`）した際、テンプレートが更新されない。"
      }
    ],
    "fixes": [
      {
        "vi": "Thay thế bằng một object mới: data.value = { ...data.value, items: [...] } hoặc gọi hàm thủ công triggerRef(data).",
        "en": "Assign a new object: data.value = { ...data.value, items: [...] } or run triggerRef(data) manually.",
        "ja": "新しいオブジェクトを代入するか（`data.value = { ... }`）、手動で `triggerRef(data)` を実行します。"
      }
    ],
    "tags": [
      "vue",
      "reactivity",
      "optimization",
      "performance",
      "shallow-ref"
    ],
    "variations": [
      {
        "syntax": "const state = shallowReactive({ count: 1, nested: { value: 2 } })",
        "description": {
          "vi": "Phiên bản nông (shallow) tương ứng của reactive().",
          "en": "The shallow equivalent of the reactive() wrapper helper.",
          "ja": "reactive() ラッパー of 浅いリアクティブ版。"
        }
      }
    ]
  }
];

const provideInjectIndex = commands.findIndex(cmd => cmd.id === 'vue-provide-inject');
if (provideInjectIndex === -1) {
  console.error("Could not find vue-provide-inject command");
  process.exit(1);
}

// Perform splice
commands.splice(provideInjectIndex + 1, 0, ...newVueCommands);
console.log(`Successfully added ${newVueCommands.length} Vue.js commands.`);

// Save back to file
fs.writeFileSync(commandsPath, JSON.stringify(commands, null, 2), 'utf8');
console.log("commands.json saved successfully.");
