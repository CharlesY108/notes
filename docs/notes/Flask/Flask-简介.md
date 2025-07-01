# Flask 简介

- Flask是一个轻量级的 Python Web 框架，被称为"微框架"，因为它不依赖特定的工具或库，具有很强的扩展性，适合快速开发小型 Web 应用或 API
- [Welcome to Flask — Flask Documentation (3.1.x)](https://flask.palletsprojects.com/en/stable/)

## 虚拟环境安装

Python 自带的 [`venv`](https://docs.python.org/3/library/venv.html#module-venv) 模块可以用来创建虚拟环境，通过虚拟环境可以在开发和生产环境下管理项目依赖，从而达到一个项目对应一个虚拟环境的目的。

[Installation — Flask Documentation (3.1.x)](https://flask.palletsprojects.com/en/stable/installation/) 

### 创建

windows 系统

```powershell
> mkdir myproject
> cd myproject
> py -3 -m venv .venv
```

linux 系统

```bash
$ mkdir myproject
$ cd myproject
$ python3 -m venv .venv
```

> **-3**：启动 Python 3 版本，也可以通过 `-3.9` 或者 `-3.10` 这样的形式来指定具体版本

> **-m**：将指定的模块当作脚本运行，`-m venv` 就是把标准库中的 `venv` 模块作为脚本来执行

### 激活

确保 `.venv` 文件夹在当前目录中

windows 系统

```powershell
> .\.venv\Scripts\activate
```

linux 系统

```bash
$ . .venv/bin/activate
```

### 安装

- Flask supports Python 3.9 and newer
- 在激活的虚拟环境内，使用下面的命令安装 Flask

```bash
pip install Flask
```

## 创建项目

### 初始化

最基本结构的 API 服务

```
myflaskapp/
└── app.py          # 主应用文件
```

```python
from flask import Flask

app = Flask(__name__)  # 创建Flask应用实例

@app.route('/')  # 定义路由（URL路径）
def hello_world():
    return 'Hello, World!'  # 返回响应内容

if __name__ == '__main__':
    app.run(debug=True)  # 启动开发服务器（开启调试模式）
```

```
$ python ./myflaskapp/app.py
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

