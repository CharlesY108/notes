# Flask 全局处理器

- 在 Flask 中，`@app.context_processor` 是一个装饰器，用于注册**全局上下文处理器** 
- 上下文处理器的作用是将一些变量、函数或对象注入到所有模板的上下文中，使得这些资源在任何模板中都可以直接使用，无需在每个路由中显式传递

## 基本变量

示例：注入当前年份到所有模板

```python
from flask import Flask
from datetime import datetime

app = Flask(__name__)

@app.context_processor
def inject_year():
    # 返回一个字典，键为变量名，值为变量值
    return {'current_year': datetime.now().year}

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

## 注入函数

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

## 注入配置

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

## 执行逻辑

- 每次渲染模板前都会先执行上下文处理器

- 上下文处理器的执行顺序是**不确定**的，所以不能依赖特定的执行顺序

- 要是不同的处理器注入了相同名称的变量，后面注入的会覆盖前面的

- 如果视图函数传递的变量名与上下文处理器注入的变量名相同，视图函数的变量会覆盖上下文处理器的变量





