# Flask

- Flask是一个轻量级的Python Web框架，被称为"微框架"，因为它不依赖特定的工具或库，具有很强的扩展性。
- [Welcome to Flask — Flask Documentation (3.1.x)](https://flask.palletsprojects.com/en/stable/)

## 安装Flask

```bash
pip install flask
```

```python
from flask import Flask

app = Flask(__name__)  # 创建Flask应用实例

@app.route('/')  # 定义路由（URL路径）
def hello_world():
    return 'Hello, World!'  # 返回响应内容

if __name__ == '__main__':
    app.run(debug=True)  # 启动开发服务器（开启调试模式）
  
# 运行后，访问 `http://localhost:5000` 即可看到"Hello, World!"
```

## 对比 Django

Flask和Django是Python中最流行的两个Web框架，但它们的设计理念和适用场景有很大差异。

- **Flask**

  - **微框架**：仅提供核心功能（路由、请求处理、模板引擎），依赖扩展实现其他功能（数据库、认证等）。
  - **灵活性高**：开发者可自由选择组件，适合快速原型开发或小型项目。
- **Django**

  - **全栈框架**：内置ORM、表单、认证、管理界面、缓存等"开箱即用"的功能。
  - **约定大于配置**：遵循Django的设计模式，减少开发者决策成本，适合大型项目。


| 功能           | Flask                        | Django                         |
| -------------- | ---------------------------- | ------------------------------ |
| **路由系统**   | 基于装饰器（`@app.route()`） | 集中式URL配置（`urls.py`）     |
| **数据库**     | 需扩展（如Flask-SQLAlchemy） | 内置ORM（支持多种数据库）      |
| **管理界面**   | 需手动实现                   | 自动生成Admin后台              |
| **表单处理**   | 依赖Flask-WTF等扩展          | 内置表单验证和渲染             |
| **认证与权限** | 需扩展（如Flask-Login）      | 内置用户系统和权限管理         |
| **模板引擎**   | Jinja2（灵活）               | Django模板（功能丰富但较封闭） |
| **缓存**       | 需扩展（如Flask-Caching）    | 内置多级缓存系                 |

## 路由配置

### 装饰器

```python
# 通过 `@app.route()` 装饰器定义URL路径
@app.route('/')  # 定义路由（URL路径）
def hello_world():
    return 'Hello, World!'  # 返回响应内容
```

### 动态路由

```python
# 动态路由
@app.route('/user/<username>')  # 动态路径参数
def show_user_profile(username):
    return f'User: {username}'

@app.route('/post/<int:post_id>')  # 指定参数类型
def show_post(post_id):
    return f'Post ID: {post_id}'
```

### 反向路由

Flask 使用 `url_for()` 函数实现反向路由

```python
@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f'Post {post_id}'

# 生成URL: /post/123
url_for('show_post', post_id=123)
```

```python
from flask import Flask, url_for

app = Flask(__name__)

@app.route('/')
def index():
    # 生成 '/about' 路径
    about_url = url_for('about')
    # 生成带参数的路径：/user/johndoe
    user_url = url_for('show_user', username='johndoe')
    return f'Index Page. <a href="{about_url}">About</a>'

@app.route('/about')
def about():
    return 'About Page'

@app.route('/user/<username>')
def show_user(username):
    return f'User: {username}'

# 在模板中使用
# <a href="{{ url_for('about') }}">About</a>
```

### 路由重定向

```python
# 重定向到绝对路径地址

@app.route('/google')
def to_google():
    return redirect('https://www.google.com')
```

```python
# 默认重定向使用 302 Found 状态码，可通过第二个参数修改：
# 使用 301 Moved Permanently（永久重定向）

return redirect(url_for('index'), code=301)
```

```python
@app.route('/search')
def search():
    keyword = request.args.get('keyword')
    # 处理搜索逻辑...
    return f"搜索结果：{keyword}"

@app.route('/do_search')
def do_search():
    # 重定向到 search 路由，并传递 keyword 参数
    return redirect(url_for('search', keyword='flask'))

# 重定向后的地址：http://localhost:5000/search?keyword=flask
```

## 模板语法

- Flask默认使用 **Jinja2** 作为模板引擎，可以将Python逻辑与HTML分离，支持模板继承、变量渲染、控制结构等特性，非常适合Web开发。

### 双括号语法

```html
<!-- 模板 -->
<h1>Hello, {{ name }}!</h1>

<!-- Python代码 -->
return render_template('index.html', name='Alice')
```

```html
<!-- 表达式求值 -->
{{ 1 + 2 }}  <!-- 输出: 3 -->
{{ 'hello'.upper() }}  <!-- 输出: HELLO -->
{{ user.name if user else 'Guest' }}  <!-- 条件表达式 -->
```

### 条件语句

```html
{% if user.is_admin %}
    <p>Welcome, Admin!</p>
{% elif user.is_logged_in %}
    <p>Welcome, {{ user.name }}</p>
{% else %}
    <p>Please log in.</p>
{% endif %}
```

### 循环语句

```html
<ul>
{% for item in items %}
    <li>{{ item.name }}</li>
{% endfor %}
</ul>
```

### 模板继承

通过 `extends` 和 `block` 实现模板复用。

- 基模板 `base.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>{% block title %}Title{% endblock %}</title>
</head>
<body>
    <div>{% block content %}{% endblock %}</div>
</body>
</html>
```

- 子模板 `index.html`

```html
{% extends "base.html" %}

{% block title %}
	{{ pagename }}
{% endblock %}

{% block content %}
	{{content}}
{% endblock %}
```

- main.py

```python
from flask import Flask, request, jsonify, url_for, render_template

app = Flask(__name__)

@app.route('/getpage')
def getpage():
  content = 'ssr content'
  return render_template('index.html' ,content='ssr content', pagename='getpage')

if __name__ == '__main__':
  app.run(port=5173, debug=True)
```

### 过滤器（Filters）

#### 内置过滤器

Jinja2提供内置过滤器处理变量

```html
{{ text|safe }}  <!-- 不转义HTML -->
{{ number|round(2) }}  <!-- 四舍五入保留2位小数 -->
{{ list|length }}  <!-- 获取列表长度 -->
{{ date|datetimeformat('%Y-%m-%d') }}  <!-- 自定义日期格式 -->
```

#### 自定义过滤器

```python
# 自定义过滤器
@app.template_filter('capitalize')
def capitalize_filter(s):
    return s[0].upper() + s[1:].lower()
```

```html
<!-- 模板中使用 -->
{{ "hello"|capitalize }}  <!-- 输出: Hello -->
```

### 宏（Macros）

类似函数，可复用代码片段

```html
<!-- 定义宏 -->
{% macro render_field(field) %}
    <div class="form-group">
        {{ field.label }}
        {{ field() }}
    </div>
{% endmacro %}

<!-- 使用宏 -->
{{ render_field(form.username) }}
{{ render_field(form.password) }}
```

## 内置特殊变量

Flask自动注入的特殊变量：

- `request`：当前请求对象
- `session`：会话数据
- `g`：应用全局变量
- `url_for()`：生成URL
- `get_flashed_messages()`：获取闪现消息

```html
<a href="{{ url_for('logout') }}">Logout</a>

{% with messages = get_flashed_messages() %}
    {% if messages %}
        <ul>
        {% for message in messages %}
            <li>{{ message }}</li>
        {% endfor %}
        </ul>
    {% endif %}
{% endwith %}
```

## 请求变量

在 Flask 中，`request` 是一个**特殊的全局变量**，代表当前处理的 HTTP 请求，可以获取客户端提交的数据、请求头信息等。

### request 属性


| 属性/方法             | 描述                                                                                         |
| --------------------- | -------------------------------------------------------------------------------------------- |
| **基本信息**          |                                                                                              |
| `request.method`      | HTTP 请求方法（如`GET`、`POST`、`PUT`）。                                                    |
| `request.path`        | 请求的路径（如`/user/profile`），不包含域名和查询参数。                                      |
| `request.url`         | 完整请求 URL（如`http://example.com/user?page=1`）。                                         |
| **请求数据**          |                                                                                              |
| `request.args`        | 解析 URL 中的查询参数（如`?name=john&age=25`），类型为 `MultiDict`。                         |
| `request.form`        | 解析 POST/PUT 请求中的表单数据（需表单的`enctype` 为 `application/x-www-form-urlencoded`）。 |
| `request.json`        | 解析 JSON 格式的请求体（需请求头`Content-Type: application/json`）。                         |
| `request.files`       | 解析上传的文件（表单的`enctype` 为 `multipart/form-data`）。                                 |
| **请求头**            |                                                                                              |
| `request.headers`     | 请求头信息（如`User-Agent`、`Content-Type`）。                                               |
| `request.cookies`     | 客户端发送的 Cookie 信息。                                                                   |
| **其他信息**          |                                                                                              |
| `request.remote_addr` | 客户端 IP 地址。                                                                             |
| `request.user_agent`  | 客户端浏览器信息（如`Mozilla/5.0`）。                                                        |

### 函数使用 request

#### 示例 1：获取查询参数（GET 请求）

```python
from flask import Flask, request

app = Flask(__name__)

@app.route('/search')
def search():
    keyword = request.args.get('keyword', '')  # 获取 ?keyword=xxx 参数，默认值为空字符串
    page = request.args.get('page', 1, type=int)  # 获取 ?page=1 参数，转换为整数类型
    return f"搜索关键词：{keyword}，第 {page} 页"
```

#### 示例 2：处理表单提交（POST 请求）

```python
@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']  # 获取表单中的 username 字段
    password = request.form.get('password')  # 安全获取方式（不存在时返回 None）
    return f"登录用户：{username}"
```

#### 示例 3：处理 JSON 请求

```python
@app.route('/api/data', methods=['POST'])
def handle_json():
    data = request.json  # 获取 JSON 数据
    if data:
        return {'status': 'success', 'data': data}
    return {'error': 'No JSON data provided'}, 400
```

### 在模板中使用 request

#### 示例 1：获取当前 URL

```html
<!-- 当前页面的 URL（不含查询参数） -->
<a href="{{ request.path }}">刷新当前页面</a>

<!-- 当前完整 URL（含查询参数） -->
<p>当前访问的 URL：{{ request.url }}</p>
```

#### 示例 2：根据请求方法渲染不同内容

```html
{% if request.method == 'POST' %}
    <p>表单提交成功！</p>
{% else %}
    <form method="POST">
        <!-- 表单内容 -->
    </form>
{% endif %}
```

#### 示例 3：获取请求头信息

```html
<p>您的浏览器：{{ request.user_agent }}</p>
<p>您的 IP：{{ request.remote_addr }}</p>
```

### **4. 文件上传处理**

```python
@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']  # 获取上传的文件
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return '文件上传成功'
    return '无效的文件'
```

```html
<form method="POST" enctype="multipart/form-data">
    <input type="file" name="file">
    <button type="submit">上传</button>
</form>
```

## 路径生成

在 Flask 中，`url_for()` 是一个用于生成 URL 的函数，它通过路由函数名或端点名称（endpoint）动态构建 URL 路径。

### 生成静态路由

```python
from flask import Flask, url_for

app = Flask(__name__)

@app.route('/')
def index():
    # 生成 '/about'
    about_url = url_for('about')
    return f'Go to <a href="{about_url}">About</a>'

@app.route('/about')
def about():
    return 'About Page'
```

### 生成动态路由

```python
@app.route('/user/<username>')
def profile(username):
    return f'User: {username}'

# 生成 '/user/johndoe'
url_for('profile', username='johndoe')
```

```python
@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f'Post {post_id}'

# 生成 '/post/123'
url_for('show_post', post_id=123)
```

### 在模板中使用

```html
<!-- 基础 URL -->
<a href="{{ url_for('index') }}">Home</a>

<!-- 带参数的 URL -->
<a href="{{ url_for('profile', username=user.name) }}">
    {{ user.name }}'s Profile
</a>

<!-- 生成静态文件 URL -->
<link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
<script src="{{ url_for('static', filename='script.js') }}"></script>
```

### **3. 查询参数（Query String）**

任何未被路由定义捕获的参数都会被自动转为查询字符串：

```python
# 生成 '/search?keyword=flask&page=2'
url_for('search', keyword='flask', page=2)

@app.route('/search')
def search():
    keyword = request.args.get('keyword')
    page = request.args.get('page')
    return f'Searching for {keyword} on page {page}'
```

### 转义特殊字符

`url_for()` 会自动对参数进行 URL 编码：

```python
# 生成 '/user/john%20doe'
url_for('profile', username='john doe')

# 生成 '/post/hello%21'
url_for('post', title='hello!')
```

### **5. 蓝图（Blueprints）中的 URL 生成**

如果使用蓝图组织应用，生成 URL 时需要包含蓝图名称作为前缀：

```python
# 在 admin 蓝图中定义的路由
from flask import Blueprint

admin = Blueprint('admin', __name__)

@admin.route('/dashboard')
def dashboard():
    return 'Admin Dashboard'

# 生成 '/admin/dashboard'
url_for('admin.dashboard')
```

### **6. 绝对 URL 和外部 URL**

通过 `_external=True` 参数生成包含域名的绝对 URL：

```python
# 生成 'http://example.com/about'
url_for('about', _external=True)

# 生成带协议和端口的绝对 URL
url_for('index', _external=True, _scheme='https', _port=443)
```

### 图片路径问题

在 Flask 中，`url_for()` 函数可以有效解决模板中图片路径的问题，确保图片资源能够被正确引用，无论项目结构如何变化或部署环境如何调整。

- Flask 默认将 `static` 目录作为静态资源根目录，图片通常存放在 `static/images` 子目录中：

```
your_project/
├── app.py
├── templates/
│   └── index.html
└── static/
    └── images/
        ├── logo.png
        └── profile.jpg
```

- 如果要修改静态文件目录，需要借助 Flask 初始化函数：

```python
# app.py
from flask import Flask

app = Flask(__name__,
            static_folder='assets',  # 指定静态文件目录为 'assets'
            static_url_path='/assets'  # URL 路径仍为 '/assets'（可选）
           )

@app.route('/')
def index():
    return 'Hello, Flask!'
```

- 在模板中，通过 `url_for('static', filename=...)` 动态生成图片路径：

```html
<!-- index.html -->
<!-- 基础用法 -->
<img src="{{ url_for('static', filename='images/logo.png') }}" alt="Logo">

<!-- 动态图片 -->
<img src="{{ url_for('static', filename='images/' + user.avatar) }}" alt="User Avatar">

<!-- 带查询参数的图片（用于缓存控制） -->
<img src="{{ url_for('static', filename='images/banner.jpg', v=123) }}" alt="Banner">
```

## 闪现消息

`get_flashed_messages(message, category)` 是 Flask 中用于获取**闪现消息（Flash Messages）**的函数。闪现消息用于在用户完成某个操作后（如登录、提交表单）显示一次性通知，这些消息仅在下一次请求时可见，之后会被清除。

常见应用场景：

- 用户登录/登出状态提示
- 表单提交成功/失败反馈
- 权限不足提示
- 操作结果通知（如删除、更新）

### 设置步骤

- 步骤 1：设置闪现消息
- 步骤 2：在模板中获取并显示消息

```python
from flask import Flask, flash, redirect, url_for

app = Flask(__name__)
app.secret_key = 'your-secret-key'  # 必须设置密钥，用于会话加密

@app.route('/login')
def login():
    # 验证用户登录...
    if valid_credentials:
        flash('登录成功！', 'success')  # 设置成功消息
        return redirect(url_for('dashboard'))
    else:
        flash('用户名或密码错误', 'error')  # 设置错误消息
        return redirect(url_for('login_page'))
```

```html
<!-- base.html -->
{% with messages = get_flashed_messages(with_categories=True) %}
  {% if messages %}
    <div class="flashes">
      {% for category, message in messages %}
        <div class="{{ category }}">{{ message }}</div>
      {% endfor %}
    </div>
  {% endif %}
{% endwith %}
```

### 消息分类

通过 `category` 参数为消息指定类别（如 `success`、`error`、`info`），便于样式区分：

```python
# 设置不同类别的消息
flash('操作成功', 'success')
flash('发生错误', 'error')
flash('提示信息', 'info')
```

```html
<!-- 使用 Tailwind CSS 样式化不同类别的消息 -->
{% for category, message in messages %}
  <div class="alert {{ 'bg-green-100 text-green-700' if category == 'success' else 
                     'bg-red-100 text-red-700' if category == 'error' else 
                     'bg-blue-100 text-blue-700' }}">
    {{ message }}
  </div>
{% endfor %}
```

### 获取特定消息

```html
<!-- 只显示错误消息 -->
{% with errors = get_flashed_messages(category_filter=['error']) %}
  {% if errors %}
    <div class="errors">
      {% for error in errors %}
        <p>{{ error }}</p>
      {% endfor %}
    </div>
  {% endif %}
{% endwith %}
```

### 消息生命周期

- **设置消息**：调用 `flash()` 后，消息被存储在会话中。
- **获取消息**：第一次调用 `get_flashed_messages()` 时，消息被从会话中移除。
- **消息过期**：下一次请求后，未被获取的消息会自动清除。

### 完整示例

```python
# app.py
from flask import Flask, render_template, flash, redirect, url_for, request

app = Flask(__name__)
app.secret_key = 'your-secret-key'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        if not name:
            flash('请输入姓名', 'error')
            return redirect(url_for('contact'))
    
        # 处理表单...
        flash('表单提交成功！', 'success')
        return redirect(url_for('index'))
  
    return render_template('contact.html')
```

```html
<!-- templates/index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Home</title>
</head>
<body>
    {% with messages = get_flashed_messages(with_categories=True) %}
      {% if messages %}
        <div class="messages">
          {% for category, msg in messages %}
            <div class="{{ category }}">{{ msg }}</div>
          {% endfor %}
        </div>
      {% endif %}
    {% endwith %}

    <h1>Welcome</h1>
    <a href="{{ url_for('contact') }}">联系我们</a>
</body>
</html>
```

## 全局处理器

在 Flask 中，`@app.context_processor` 是一个装饰器，用于注册**全局上下文处理器**。

上下文处理器的作用是将一些变量、函数或对象注入到所有模板的上下文中，使得这些资源在任何模板中都可以直接使用，无需在每个路由中显式传递。

### 基本用法

示例：注入当前年份到所有模板

```python
from flask import Flask

app = Flask(__name__)

@app.context_processor
def inject_year():
    # 返回一个字典，键为变量名，值为变量值
    return {'current_year': 2023}

@app.route('/')
def index():
    return render_template('index.html')  # 无需传递 current_year
```

```html
<!-- 任何模板都可以直接使用 current_year -->
<footer>
    © {{ current_year }} All rights reserved.
</footer>
```

### 注入函数

```python
@app.context_processor
def context_processor():
  
  # 需要在模板调用的函数
  def make_content(content):
    return f'<p>{content} is handled</p>'

  return {
    'make_content': make_content
  }
```

```html
<!-- 模板中直接调用函数 -->
<p>创建时间：{{ make_content(content) }}</p>
```

### 注入配置变量

将应用配置注入模板

```python
@app.context_processor
def inject_config():
    return {'config': app.config}
```

```html
<!-- 使用配置变量 -->
<title>{{ config['APP_NAME'] }}</title>
```

### 注意事项

- **执行时机**：每次渲染模板前都会执行上下文处理器。
- **性能考虑**：避免在上下文处理器中执行耗时操作（如数据库查询），可结合缓存使用。
- **命名冲突**：避免与模板中已有变量或过滤器重名。
