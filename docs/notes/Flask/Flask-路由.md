# Flask 路由

## 基本内容

- 在 Flask 中，路由（Routing）是将 URL 映射到处理函数的机制
- 一个完整的 Flask 路由包括：
  - 路由装饰器与视图函数，视图函数的名称就是路由端点名称
  - URL 路径
  - HTTP 方法
  - url_for 函数
  - redirect 函数
  - 蓝图（Blueprints），相当于路由的分组管理
  - 错误处理

- 匹配顺序：由定义的顺序匹配 URL，一旦匹配成功就停止搜索

| 组成部分   | 作用                    | 示例                                    |
| ---------- | ----------------------- | --------------------------------------- |
| 装饰器     | 绑定 URL 路径到视图函数 | `@app.route('/')`                       |
| 视图函数   | 处理请求并返回响应      | `def index(): return 'Hello'`           |
| 动态变量   | 捕获 URL 中的参数       | `@app.route('/user/<username>')`        |
| 类型转换器 | 限制变量类型            | `@app.route('/post/<int:id>')`          |
| HTTP 方法  | 指定支持的请求方法      | `methods=['GET', 'POST']`               |
| 端点名称   | 用于 URL 生成的标识符   | `url_for('index')`                      |
| 蓝图       | 模块化组织路由          | `auth_bp = Blueprint('auth', __name__)` |
| 错误处理   | 自定义错误页面          | `@app.errorhandler(404)`                |

## @app.route 装饰器

通过 `@app.route()` 装饰器定义URL路径

| 参数名           | 类型          | 作用                                                         | 默认值                     |
| ---------------- | ------------- | ------------------------------------------------------------ | -------------------------- |
| `rule`           | str           | URL 路径规则，可以包含变量（如 `/user/<username>`）          | 必需参数                   |
| `methods`        | list          | 指定支持的 HTTP 方法（如 `['GET', 'POST']`）                 | `['GET']`                  |
| `endpoint`       | str           | 自定义端点名称，用于 `url_for()` 生成 URL                    | 视图函数名                 |
| `defaults`       | dict          | 为 URL 变量设置默认值                                        | `None`                     |
| `subdomain`      | str           | 指定子域名（需配置 `SERVER_NAME`）                           | `None`                     |
| `strict_slashes` | bool          | 是否严格匹配 URL 末尾的斜杠（如 `/path` 和 `/path/` 是否视为不同） | 由 `APPEND_SLASH` 配置决定 |
| `redirect_to`    | str或function | 重定向到指定 URL 或动态生成的 URL                            | `None`                     |
| `alias`          | bool          | 是否为同一视图创建多个端点（不常用）                         | `False`                    |
| `host`           | str           | 指定主机名（需配置 `SERVER_NAME`）                           | `None`                     |
| `websocket`      | bool          | 是否启用 WebSocket 支持（Flask 2.0+）                        | `False`                    |

### D-基本使用

- 默认路由
- 默认请求方式，为 get

```python
@app.route('/')  # 定义路由（URL路径）
def index(): # 视图函数，函数名就是端点名称
  res = '<h1>Hello World!</h1>'
  return res  # 返回响应内容
```

### D-规定请求方式

- 默认路由
- 请求方式通过 methods 规定为 post

```python
@app.route('/', methods=['POST'])
def index():
  return '<h1>Hello World!</h1>'
```

### D-动态路径路由

- 路由路径使用 `<变量名>`，`变量名` 需要传入视图函数的参数，在视图函数中可以使用这个 `变量名` 来获取路径
- `<类型:变量名>` 可以指定 `变量名` 的具体类型，特别是对 id 的限制
- 对于指定的类型，在 flask 的 converters.py 文件的源码中有指定

```python
#: the default converter mapping for the map.
DEFAULT_CONVERTERS: t.Mapping[str, type[BaseConverter]] = {
    "default": UnicodeConverter,
    "string": UnicodeConverter,
    "any": AnyConverter,
    "path": PathConverter,
    "int": IntegerConverter,
    "float": FloatConverter,
    "uuid": UUIDConverter,
}
```

```python
# 动态路径参数
@app.route('/<url_name>', methods=['POST'])
def index(url_name):
  if url_name == 'page':
    res = 'page content'
    return res
  else:
    res = 'other content'
    return res
```

```python
# 指定参数类型
@app.route('/post/<int:post_id>')  
def show_post(post_id):
  return f'Post ID: {post_id}'
```

## url_for 反向路由

反向路由：Flask 通过使用 `url_for()` 函数生成新路径的过程。

- 必须参数：`endpoint` 指定视图函数的名称或蓝图的端点名称，就是路由装饰器下面的函数名
- 可选参数：`_external` `**value` `_method` `_scheme` `anchor` 

| 参数名      | 类型 | 作用                                                         | 示例代码                                                     | 生成结果                       |
| ----------- | ---- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------ |
| `endpoint`  | str  | 指定视图函数的端点名称（普通视图为函数名，蓝图视图为`蓝图名.函数名`） | `url_for('index')` `url_for('user_profile', username='john')` | `/` `/user/john`               |
| `_external` | bool | 生成绝对 URL（包含协议和域名），常用于邮件、API 响应等场景   | `url_for('index', _external=True)`                           | `http://example.com/`          |
| `**values`  | 变量 | 填充 URL 中的变量部分（如 `<int:id>`）或添加查询参数         | `url_for('user', username='john')` `url_for('search', q='flask')` | `/user/john` `/search?q=flask` |
| `_method`   | str  | 指定 HTTP 方法，用于同名但不同方法的路由                     | `url_for('login', _method='POST')`                           | `/login`                       |
| `_scheme`   | str  | 与 `_external=True` 配合使用，强制指定 URL 的协议（如 `'https'`） | `url_for('index', _external=True, _scheme='https')`          | `https://example.com/`         |
| `_anchor`   | str  | 在 URL 末尾添加锚点（即哈希值 `#` 部分）                     | `url_for('page', _anchor='section2') url_for（'page'， _anchor='section2'）` | `/page#section2`               |

### D-生成 a 标签

```python
from flask import Flask, url_for

app = Flask(__name__)

@app.route('/')
def index():
    # 使用 url_for 函数生成 '/about' 路径
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

# 在模板中使用 url_for 函数生成新的路由
# <a href="{{ url_for('about') }}">About</a>
```

```python
@app.route('/<string:url_name>', methods=['POST'])
def index(url_name):
  res = url_name + 'page content'
  return res


@app.route('/value/<int:value>', methods=['GET'])
def value(value):
  url_new = url_for('index', url_name=value, _external=True, )
  return f"<a href='{url_new}'>{value}</a>"
```

## redirect 路由重定向

- 必要参数：location 重定向的目标 URL，可以是绝对路径、相对路径或外部 URL
- 可选参数：
  - code：HTTP 状态码，默认 302（临时重定向）
  - Response：自定义响应类，用于创建特殊类型的响应对象

| 参数名     | 示例代码                                                     | 生成结果                                                     |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| `location` | `redirect('/login')` `redirect(url_for('index'))` `redirect('https://example.com')` | 浏览器跳转至 `/login` 跳转至首页 `/` 跳转至外部网站 `https://example.com` |
| `code`     | `redirect('/new-page', code=301)`                            | 返回状态码 301 永久重定向，浏览器永久记住重定向规则          |
| `Response` | 通常无需使用                                                 | -                                                            |

### D-重定向到相对路径

```python
@app.route('/old')
def old_page():
  # 示例1：重定向到固定路径
  return redirect('/new')
```

### D-重定向到绝对路径

```python
# 重定向到绝对路径地址
# 在浏览器地址栏输入对应地址，会自动跳转到 google
@app.route('/google')
def to_google():
  return redirect('https://www.google.com')
```

### D-永久重定向

```python
# 默认重定向使用 302 Found 状态码，可通过第二个参数修改：
# 使用 301 Moved Permanently（永久重定向）
# 即使更改了路径，浏览器也会读取缓存中的重定向地址
# 如果要解除，需要清除浏览器缓存，并更改代码
return redirect(url_for('index'), code=301)
```

### D-带参数的重定向

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



