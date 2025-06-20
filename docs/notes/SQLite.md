# SQLite



## OEM - Python

在Python中使用SQLite时，ORM（对象关系映射）可以通过面向对象的方式操作数据库，而不必编写原生SQL语句，同时能避免SQL注入风险。

- **SQLAlchemy**：功能全面，适合复杂项目和需要跨数据库的场景，支持多种数据库，包括SQLite。
- **Peewee**：轻量灵活，适合小型项目和快速原型。
- **Django ORM**：Django框架内置。
- **Tortoise ORM**：适合异步应用（如FastAPI、Sanic）的ORM。

### SQLAlchemy

```python
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 创建SQLite数据库连接
engine = create_engine('sqlite:///example.db')  # 内存数据库使用 'sqlite:///:memory:'

# 基类
Base = declarative_base()

# 定义模型
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    age = Column(Integer)

# 创建表
Base.metadata.create_all(engine)

# 创建会话
Session = sessionmaker(bind=engine)
session = Session()

# 添加数据
new_user = User(name='Alice', age=30)
session.add(new_user)
session.commit()

# 查询数据
users = session.query(User).filter(User.age > 25).all()
for user in users:
    print(f"ID: {user.id}, Name: {user.name}, Age: {user.age}")

# 关闭会话
session.close()
```

### Peewee

```python
from peewee import *

# 连接SQLite数据库
db = SqliteDatabase('example.db')

# 定义基模型
class BaseModel(Model):
    class Meta:
        database = db

# 定义数据模型
class User(BaseModel):
    name = CharField()
    age = IntegerField()

# 创建表
db.create_tables([User])

# 添加数据
User.create(name='Bob', age=25)

# 查询数据
for user in User.select().where(User.age < 30):
    print(f"{user.name} is {user.age} years old.")
```

### Django ORM

```python
# settings.py 配置
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# models.py 定义模型
from django.db import models

class User(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()

# 迁移数据库
# python manage.py makemigrations
# python manage.py migrate

# 使用ORM
from myapp.models import User

# 创建对象
User.objects.create(name='Charlie', age=35)

# 查询
users = User.objects.filter(age__gte=30)
for user in users:
    print(user.name)
```

### Tortoise

```python
from tortoise import fields
from tortoise.models import Model
from tortoise import Tortoise, run_async

# 定义模型
class User(Model):
    id = fields.IntField(pk=True)
    name = fields.CharField(max_length=100)
    age = fields.IntField()

# 初始化数据库
async def init():
    await Tortoise.init(
        db_url='sqlite://db.sqlite3',
        modules={'models': ['__main__']}
    )
    await Tortoise.generate_schemas()

# 异步操作示例
async def run():
    await init()
    
    # 创建对象
    await User.create(name='David', age=28)
    
    # 查询
    users = await User.filter(age__lt=30)
    for user in users:
        print(f"User: {user.name}, Age: {user.age}")

# 运行异步函数
run_async(run())
```



