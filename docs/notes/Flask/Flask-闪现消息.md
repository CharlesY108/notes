# Flask 闪现消息

- 一般在用户完成某个操作后（如登录、提交表单）显示**单次通知**，这些消息仅在下一次请求时可见，之后会被清除
- 包括两个关键函数：`get_flashed_messages` `flash` 
- `get_flashed_messages` 用于获取闪现消息
- `flash` 用于设置闪现信息

## 基本配置

```python
from flask import Flask, render_template, flash

app = Flask(__name__)
app.secret_key = 'super_secret_key'


@app.route('/<name>')
def index(name):
  # 设置闪现消息
  flash('start')
  flash(name)
  flash('end')
  return render_template('index.html')


if __name__ == '__main__':
  app.run(debug=True)

```

```html
<body>
  <!-- 获取闪现信息 -->
  {% for msg in get_flashed_messages() %}
  	<div>提示消息：{{ msg }}</div>
  {% endfor %}
</body>
</html>
```

## flash 参数

`flash()` 函数有 2 个参数：

- `message`（字符串）：必需，用于设置要闪现的消息内容
- `category`（字符串）：可选，默认值为 `'message'`，可用来对消息进行分类，例如 `success`、`'error'`、`'info'` 等

```python
# 设置不同类别的消息
flash('操作成功', 'success')
flash('发生错误', 'error')
flash('提示信息', 'info')
```

## get_flashed_messages 参数

`get_flashed_messages()` 函数有 2 个可选参数：

- `with_categories`（布尔值）：默认是 `False`。若设为 `True`，获取的消息会以 `(category, message)` 元组的形式呈现。
- `category_filter`（列表）：默认是 `[]`。借助这个参数，能够筛选出特定类别的消息。

```python
from flask import Flask, flash, get_flashed_messages, render_template_string

app = Flask(__name__)
app.secret_key = 'your_secret_key'

@app.route('/')
def index():
    flash('第一条消息', 'info')
    flash('第二条消息', 'warning')
    flash('第三条消息', 'error')
    
    # 获取所有消息（按定义顺序）
    messages = get_flashed_messages()
    
    # 获取带类别的消息
    messages_with_categories = get_flashed_messages(with_categories=True)
    
    # 筛选特定类别的消息
    error_messages = get_flashed_messages(category_filter=['error'])
    
    return render_template_string(
      '''
        <h1>消息展示</h1>
        <p>所有消息: {{ messages }}</p>
        <p>带类别的消息: {{ messages_with_categories }}</p>
        <p>错误消息: {{ error_messages }}</p>
      ''', 
      messages=messages, 
      messages_with_categories=messages_with_categories, 
      error_messages=error_messages
    )

if __name__ == '__main__':
    app.run(debug=True)
```

## 在模板中获取特定消息

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

## 消息生命周期

- **设置消息**：调用 `flash()` 后，消息被存储在会话中
- **获取消息**：第一次调用 `get_flashed_messages()` 时，消息被从会话中移除
- **消息过期**：下一次请求后，未被获取的消息会自动清除







