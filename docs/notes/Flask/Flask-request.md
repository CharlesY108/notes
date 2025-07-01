# Flask 请求变量 request 

在 Flask 中，`request` 是一个**特殊的全局变量**，代表当前处理的 HTTP 请求，可以获取客户端提交的数据、请求头信息等。

## request 属性


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

## 获取查询参数（GET 请求）

```python
from flask import Flask, request

app = Flask(__name__)

@app.route('/search')
def search():
    keyword = request.args.get('keyword', '')  # 获取 ?keyword=xxx 参数，默认值为空字符串
    page = request.args.get('page', 1, type=int)  # 获取 ?page=1 参数，转换为整数类型
    return f"搜索关键词：{keyword}，第 {page} 页"
```

## 获取表单提交（POST 请求）

```python
@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']  # 获取表单中的 username 字段
    password = request.form.get('password')  # 安全获取方式（不存在时返回 None）
    return f"登录用户：{username}"
```

## 获取 JSON 请求

```python
@app.route('/api/data', methods=['POST'])
def handle_json():
    data = request.json  # 获取 JSON 数据
    if data:
        return {'status': 'success', 'data': data}
    return {'error': 'No JSON data provided'}, 400
```

## 模板中获取当前 URL

```html
<!-- 当前页面的 URL（不含查询参数） -->
<a href="{{ request.path }}">刷新当前页面</a>

<!-- 当前完整 URL（含查询参数） -->
<p>当前访问的 URL：{{ request.url }}</p>
```

## 根据请求方法让模板渲染不同内容

```html
{% if request.method == 'POST' %}
    <p>表单提交成功！</p>
{% elif request.method == 'GET' %}
		<p>提交方式为 GET</p>
{% else %}
    <form method="POST">
        <!-- 表单内容 -->
    </form>
{% endif %}
```

## 在模板中获取请求头信息

```html
<p>您的浏览器：{{ request.user_agent }}</p>
<p>您的 IP：{{ request.remote_addr }}</p>
```

## 文件上传保存

```python
@app.route('/file', methods=['GET', 'POST'])
def file():
    # 获取上传文件
    file = request.files['file']  # 获取上传的文件
    print(file)  # FileStorage 对象

    # 保存文件
    file_path_save = os.path.join(os.getcwd(), file.filename)
    with open(file_path_save, 'wb') as f:
        f.write(file.read())
    
    return file.filename + '文件上传成功'
```

```html
<body>
  <form action="/file" method="post" enctype="multipart/form-data">
    <input type="file" name="file" id="file">
    <button type="submit">submit</button>
  </form>
</body>
```

