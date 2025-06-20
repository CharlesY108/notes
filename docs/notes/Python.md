# Python

[TOC]

```python
variableString = "Hello Python"
print(variableString)
# Hello Python
```

## 基础语法

### 定义变量

```python
变量名 = 值
```

```python
# 变量名 = 值
name = "James"
name = "Alice" # 同名变量，后面的会覆盖前面的
print(name) # Alice
```

### 标识符规则

- 由数字、字母、下划线组成
- 不能数字开头
- 不能使用内置关键字
- 严格区分大小写

### 关键字

```html
False     None    True   and      as       assert   break     class  
continue  def     del    elif     else     except   finally   for
from      global  if     import   in       is       lambda    nonlocal
not       or      pass   raise    return   try      while     with  
yield
```

### 格式化符号

格式化输出：即按照一定的格式输出内容。

| 格式符号 |          转换          |
| :------: | :--------------------: |
|    %s    |         字符串         |
|    %d    |   有符号的十进制整数   |
|    %f    |         浮点数         |
|    %c    |          字符          |
|    %u    |    无符号十进制整数    |
|    %o    |       八进制整数       |
|    %x    | 十六进制整数（小写 ox） |
|    %X    | 十六进制整数（大写 OX） |
|    %e    | 科学计数法（小写'e'）  |
|    %E    | 科学计数法（大写'E'）  |
|    %g    |      %f 和%e 的简写      |
|    %G    |      %f 和%E 的简写      |

- `%06d` 表示输出的整数显示位数，不足以 0 补全，超出当前位数则原样输出
- `%.2f` 表示小数点后显示的小数位数。
- 格式化字符串除了%s，还可以写为 `f'{表达式}'` 
- {} 占位符，表示待填充的位置

```python
age = 18 
name = 'TOM'
weight = 75.5
student_id = 1

# 我的名字是TOM
print('我的名字是%s' % name)

# 我的学号是0001
print('我的学号是%4d' % student_id)

# 我的体重是75.50公斤
print('我的体重是%.2f公斤' % weight)

# 我的名字是TOM，今年18岁了
print('我的名字是%s，今年%d岁了' % (name, age))

# 我的名字是TOM，明年19岁了
print('我的名字是%s，明年%d岁了' % (name, age + 1))

# 我的名字是TOM，明年19岁了
print(f'我的名字是{name}, 明年{age + 1}岁了')

# Hellom, world!
"Hello, {}!".format("world") 
```



### 转义字符

- `\n`：换行。
- `\t`：制表符，一个 tab 键（4 个空格）的距离。

### print 输出

```python
# 输出语法
print(values, sep, end, file, flush)
```

```python
# 两个 print 会换行输出：
# 在Python中，print()， 默认自带`end="\n"`这个换行结束符
# 所以导致每两个 print 直接会换行展示
print('输出的内容', end="\n")
```

### input 输入

```python
# 输入语法
input(__prompt)
```

```python
input("提示信息")
```

input 输入的特点：

- 执行到 `input` 时，程序会等待用户输入，输入完成之后才继续向下执行
- 在 Python 中，`input` 会把接收到的任意用户输入的数据都当做字符串处理，返回值都为 str

```python
password = input('请输入您的密码：')

print(f'您输入的密码是{password}')
# <class 'str'>
print(type(password))
```

## 数据类型

### 检测方式

- 整型：int
- 浮点型：float
- 字符串：str
- 布尔型：bool
- 元组：tuple
- 集合：set
- 字典：dict

> 检测数据类型的方法：`type()`

```python
a = 1
print(type(a))  # <class 'int'> -- 整型

b = 1.1
print(type(b))  # <class 'float'> -- 浮点型

c = True
print(type(c))  # <class 'bool'> -- 布尔型

d = '12345'
print(type(d))  # <class 'str'> -- 字符串

e = [10, 20, 30]
print(type(e))  # <class 'list'> -- 列表

f = (10, 20, 30)
print(type(f))  # <class 'tuple'> -- 元组

h = {10, 20, 30}
print(type(h))  # <class 'set'> -- 集合

g = {'name': 'TOM', 'age': 20}
print(type(g))  # <class 'dict'> -- 字典
```

### 数据类型转换

input() 接收用户输入的数据都是字符串类型，如果用户输入 1，想得到整型，就需要即将字符串类型转换成整型

|   转换数据类型的函数   |                        说明                         |
| :--------------------: | :-------------------------------------------------: |
|  ==int(x [, base ])==   |                  将 x 转换为一个整数                  |
|     ==float(x )==      |                 将 x 转换为一个浮点数                 |
| complex(real [, imag ]) |        创建一个复数，real 为实部，imag 为虚部         |
|      ==str(x )==       |                将对象 x 转换为字符串                |
|        repr(x )        |             将对象 x 转换为表达式字符串             |
|     ==eval(str )==     | 用来计算在字符串中的有效 Python 表达式, 并返回一个对象 |
|     ==tuple(s )==      |               将序列 s 转换为一个元组               |
|      ==list(s )==      |               将序列 s 转换为一个列表               |
|        chr(x )         |           将一个整数转换为一个 Unicode 字符           |
|        ord(x )         |           将一个字符转换为它的 ASCII 整数值           |
|        hex(x )         |         将一个整数转换为一个十六进制字符串          |
|        oct(x )         |          将一个整数转换为一个八进制字符串           |
|        bin(x )         |          将一个整数转换为一个二进制字符串           |

``` python
# 例如，input 输入1，然后转换成整型

# 1. 接收用户输入
num = input('请输入您的幸运数字：')

# 2. 打印结果
print(f"您的幸运数字是{num}")


# 3. 检测接收到的用户输入的数据类型 -- str类型
print(type(num))

# 4. 转换数据类型为整型 -- int类型
print(type(int(num)))
```

``` python
# 1. float() -- 转换成浮点型
num1 = 1
print(float(num1))
print(type(float(num1)))

# 2. str() -- 转换成字符串类型
num2 = 10
print(type(str(num2)))

# 3. tuple() -- 将一个序列转换成元组
list1 = [10, 20, 30]
print(tuple(list1))
print(type(tuple(list1)))


# 4. list() -- 将一个序列转换成列表
t1 = (100, 200, 300)
print(list(t1))
print(type(list(t1)))

# 5. eval() -- 将字符串中的数据转换成Python表达式原本类型
str1 = '10'
str2 = '[1, 2, 3]'
str3 = '(1000, 2000, 3000)'
print(type(eval(str1)))
print(type(eval(str2)))
print(type(eval(str3)))

# 6.set() -- 将某个序列转换成集合
# 集合可以快速完成列表去重
# 不支持下标
list1 = [10, 20, 30, 40, 50, 20]
t1 = ('a', 'b', 'c', 'd', 'e')
print(set(list1))
print(set(t1))
```

### 容器类型

| 容器类型      | 可变性 | 有序性 | 允许重复元素 | 特点                   |
| :------------ | :----- | :----- | :----------- | :--------------------- |
| 列表（List）  | 可变   | 有序   | 是           | 灵活，支持增删改查     |
| 元组（Tuple） | 不可变 | 有序   | 是           | 不可修改，适合存储常量 |
| 集合（Set）   | 可变   | 无序   | 否           | 去重，支持集合运算     |
| 字典（Dict）  | 可变   | 无序   | 键唯一       | 键值对存储，快速查找   |
| 字符串（Str） | 不可变 | 有序   | 是           | 字符序列，支持文本操作 |
| 范围（Range） | 不可变 | 有序   | 是           | 表示数字序列，节省内存 |

## 运算符

算数运算符、赋值运算符、比较运算符、逻辑运算符

### 算数运算符

| 运算符 |  描述  | 实例                                                  |
| :----: | :----: | ----------------------------------------------------- |
|   +    |   加   | 1 + 1 输出结果为 2                                    |
|   -    |   减   | 1-1 输出结果为 0                                      |
|   *    |   乘   | 2 * 2 输出结果为 4                                    |
|   /    |   除   | 10 / 2 输出结果为 5                                   |
|   //   |  整除  | 9 // 4 输出结果为 2                                    |
|   %    |  取余  | 9 % 4 输出结果为 1                                    |
|   **   |  指数  | 2 ** 4 输出结果为 16，即 2 * 2 * 2 * 2                |
|   ()   | 小括号 | 小括号用来提高运算优先级，即 (1 + 2) * 3 输出结果为 9 |

优先级顺序：`()` 高于 `**` 高于 `*` `/` `//` `%` 高于 `+` `-`

### 赋值运算符

| 运算符 | 描述 | 实例                                |
| :----: | ---- | ----------------------------------- |
|   =    | 赋值 | 将 `=` 右侧的结果赋值给等号左侧的变量 |

- 单个变量赋值

```python
num = 1
print(num)
```

- 多个变量赋值

```python
num1, float1, str1 = 10, 0.5, 'hello world'
print(num1, float1, str1)
# 10 0.5 hello world
```

- 多变量赋相同值

```python
a = b = 10
print(a, b)
# 10 10
```

| 运算符 | 描述           | 实例                       |
| :----: | -------------- | -------------------------- |
|   +=   | 加法赋值运算符 | c += a 等价于 c = c + a    |
|   -=   | 减法赋值运算符 | c -= a 等价于 c = c- a     |
|   *=   | 乘法赋值运算符 | c * = a 等价于 c = c * a    |
|   /=   | 除法赋值运算符 | c /= a 等价于 c = c / a    |
|  //=   | 整除赋值运算符 | c //= a 等价于 c = c // a  |
|   %=   | 取余赋值运算符 | c %= a 等价于 c = c % a    |
|  **=   | 幂赋值运算符   | c ** = a 等价于 c = c ** a |

```python
a = 100
a += 1
# 输出101  a = a + 1,最终a = 100 + 1
print(a)

b = 2
b *= 3
# 输出6  b = b * 3,最终b = 2 * 3
print(b)

c = 10
c += 1 + 2
# 输出13, 先算运算符右侧1 + 2 = 3， c += 3 , 推导出c = 10 + 3
print(c)
```

### 比较运算符

比较运算符也叫关系运算符， 通常用来判断。

| 运算符 | 描述                                                         | 实例                                                        |
| :----: | ------------------------------------------------------------ | ----------------------------------------------------------- |
|   ==   | 判断相等。如果两个操作数的结果相等，则条件结果为真(True)，否则条件结果为假(False) | 如 a = 3, b = 3，则（a == b) 为 True                              |
|   !=   | 不等于 。如果两个操作数的结果不相等，则条件为真(True)，否则条件结果为假(False) | 如 a = 3, b = 3，则（a == b) 为 True 如 a = 1, b = 3，则(a != b) 为 True |
|   >    | 运算符左侧操作数结果是否大于右侧操作数结果，如果大于，则条件为真，否则为假 | 如 a = 7, b = 3，则(a > b) 为 True                                |
|   <    | 运算符左侧操作数结果是否小于右侧操作数结果，如果小于，则条件为真，否则为假 | 如 a = 7, b = 3，则(a < b) 为 False                               |
|   >=   | 运算符左侧操作数结果是否大于等于右侧操作数结果，如果大于，则条件为真，否则为假 | 如 a = 7, b = 3，则(a < b) 为 False如a=3,b=3，则(a > = b) 为 True  |
|   <=   | 运算符左侧操作数结果是否小于等于右侧操作数结果，如果小于，则条件为真，否则为假 | 如 a = 3, b = 3，则(a <= b) 为 True                               |

```python
a = 7
b = 5
print(a == b)  # False
print(a != b)  # True
print(a < b)   # False
print(a > b)   # True
print(a <= b)  # False
print(a >= b)  # True
```

### 逻辑运算符

| 运算符 | 逻辑表达式 | 描述                                                         |
| ------ | ---------- | ------------------------------------------------------------ |
| and    | x and y    | 布尔 "与"：如果 x 为 False，x and y 返回 False，否则它返回 y 的值。 |
| or     | x or y     | 布尔 "或"：如果 x 是 True，它返回 True，否则它返回 y 的值。   |
| not    | not x      | 布尔 "非"：如果 x 为 True，返回 False 。如果 x 为 False，它返回 True。 |

```python
a = 1
b = 2
c = 3
print((a < b) and (b < c))  # True
print((a > b) and (b < c))  # False
print((a > b) or (b < c))   # True
print(not (a > b))          # True
```

```python
a,b,c = 0,1,2

# 布尔"与"：如果 x 为 False，x and y 返回 False，否则它返回 y 的值
print(a and b) # 0
print(b and c) # 2
print(b and c) # 2

# 布尔"或"：如果 x 是 True，它返回 True，否则它返回 y 的值
print(a or b)  # 1

# 布尔"非"：如果 x 为 True，返回 False 。如果 x 为 False，它返回 True
print(not a) # True
print(not b) # False
```

数字之间的逻辑运算

``` python
a = 0
b = 1
c = 2

# and运算符，只要有一个值为0，则结果为0，否则结果为最后一个非0数字
print(a and b)  # 0
print(b and a)  # 0
print(a and c)  # 0
print(c and a)  # 0
print(b and c)  # 2
print(c and b)  # 1

# or运算符，只有所有值为0结果才为0，否则结果为第一个非0数字
print(a or b)  # 1
print(a or c)  # 2
print(b or c)  # 1
```

### 特殊应用

| 运算符 | 描述 |   支持的容器类型   |
| :----: | :--: | :----------------: |
|   +    | 合并 | 字符串、列表、元组 |
|   *    | 复制 | 字符串、列表、元组 |

#### 合并 +

```python
# 1. 字符串 
str1 = 'aa'
str2 = 'bb'
str3 = str1 + str2
print(str3)  # aabb


# 2. 列表 
list1 = [1, 2]
list2 = [10, 20]
list3 = list1 + list2
print(list3)  # [1, 2, 10, 20]

# 3. 元组 
t1 = (1, 2)
t2 = (10, 20)
t3 = t1 + t2
print(t3)  # (10, 20, 100, 200)
```

#### 复制 *

```python
# 1. 字符串
print('-' * 10)  # ----------

# 2. 列表
list1 = ['hello']
print(list1 * 4)  # ['hello', 'hello', 'hello', 'hello']

# 3. 元组
t1 = ('world',)
print(t1 * 4)  # ('world', 'world', 'world', 'world')
```

## 占位符

- `pass`：是一个空操作（null operation）语句，它不执行任何操作，仅作为语法上的占位符使用，如 `if`、`for`、`def`、`class` 等至少包含一条语句，`pass` 可充当临时填充
- `...`：多用于科学计算（如 NumPy 切片），也可作为占位符（但不如 `pass` 常见）

```python
# pass
# 1. 空函数
def todo_function():
    pass  # 待实现

# 2. 空类
class TodoClass:
    pass  # 待实现


import random
# 3. 条件占位
if random.random() < 0.5:
    pass  # 后续补充逻辑
else:
    print("Do something")

# 4. 循环占位
for item in range(10):
    pass  # 待处理每个 item


#...
print(f'...占位符：{...}') # ...占位符：Ellipsis
def incomplete_function():
    ...  # 可用但不推荐（优先用 pass）
```

## 流程控制 if

### if 语法

``` python
if 条件1:
    条件1成立执行的代码1
    条件1成立执行的代码2
    ......
elif 条件2：
	条件2成立执行的代码1
    条件2成立执行的代码2
    ......
......
else:
    以上条件都不成立执行执行的代码
```

``` python
if True:
    print('条件成立执行的代码1')
    print('条件成立执行的代码2')

# 下方的代码没有缩进到if语句块，所以和if条件无关
print('我是无论条件是否成立都要执行的代码')
```

```python
age = int(input('请输入您的年龄：'))

if age >= 18:
    print(f'您的年龄是{age},已经成年，可以上网')
else:
    print(f'您的年龄是{age},未成年，请自行回家写作业')

print('系统关闭')
```

```python
age = int(input('请输入您的年龄：'))
if age < 18:
    print(f'您的年龄是{age},童工一枚')
elif (age >= 18) and (age <= 60):
    print(f'您的年龄是{age},合法工龄')
elif age > 60:
    print(f'您的年龄是{age},可以退休')
```

> `age >= 18 and age <= 60` 可以化简为 `18 <= age <= 60`

### if 嵌套

``` python
if 条件1：
	条件1成立执行的代码
    条件1成立执行的代码
    
    if 条件2：
    	条件2成立执行的代码
        条件2成立执行的代码
    
```

> 注意：条件 2 的 if 也是处于条件 1 成立执行的代码的缩进关系内部

```python
"""
提示：0-石头，1-剪刀，2-布
1. 出拳
玩家输入出拳
电脑随机出拳

2. 判断输赢
玩家获胜
平局
电脑获胜
"""

# 导入random模块
import random

# 计算电脑出拳的随机数字
computer = random.randint(0, 2)
print(computer)

player = int(input('请出拳：0-石头，1-剪刀，2-布：'))

# 玩家胜利 p0:c1 或 p1:c2 或 p2:c0
if (player == 0 and computer == 1) or (player == 1 and computer == 2) or (player == 2 and computer == 0):
    print('玩家获胜')

# 平局：玩家 == 电脑
elif player == computer:
    print('平局')
else:
    print('电脑获胜')
```

### 三目运算符

``` python
# 语法
值1 if 条件 else 值2
```

``` python
a, b = 1,2
print("if 条件成立时候的返回值" if a > b else "else 条件成立时候的返回值")
# else 条件成立时候的返回值

c, d = 30,40
print(c if c > d else d)
# 40
```

## 流程控制 while

### while 语法

``` python
while 条件:
    条件成立重复执行的代码1
    条件成立重复执行的代码2
    ......
```

``` python
i = 1
result = 0
while i <= 100:
    result += i
    i += 1

# 输出5050
print(result)
```

### break 和 continue

- break 终止此循环
- continue 退出当前一次循环继而执行下一次循环代码

``` python
i = 1
while i <= 5:
    if i == 4:
        print(f'吃饱了不吃了')
        break
    print(f'吃了第{i}个苹果')
    i += 1
```

``` python
i = 1
while i <= 5:
    if i == 3:
        print(f'大虫子，第{i}个不吃了')
        # 在continue之前一定要修改计数器，否则会陷入死循环
        i += 1
        continue
    print(f'吃了第{i}个苹果')
    i += 1
```

### 打印星号

正方形

``` python
# 重复打印5行星星
j = 0
while j <= 5:
    # 一行星星的打印
    i = 0
    while i <= 5:
        # 一行内的星星不能换行，取消print默认结束符\n
        print('*', end='')
        i += 1
    # 每行结束要换行，这里借助一个空的print，利用print默认结束符换行 等同于  print(end="\n")
    print()
    j += 1

"""
* * * * * 
* * * * * 
* * * * * 
* * * * * 
* * * * * 
"""
```

打印星号(三角形)

``` python
# 重复打印5行星星
# j表示行号
j = 0
while j <= 4:
    # 一行星星的打印
    i = 0
    # i表示每行里面星星的个数，这个数字要和行号相等所以i要和j联动
    while i <= j:
        print('*', end='')
        i += 1
    print()
    j += 1
    
"""
*
**
***
****
*****
"""
```

九九乘法表

``` python
# 重复打印9行表达式
j = 1
while j <= 9:
    # 打印一行里面的表达式 a * b = a*b
    i = 1
    while i <= j:
        print(f'{i}*{j}={j*i}', end='\t')
        i += 1
    print()
    j += 1

"""
1*1=1 
2*1=2 2*2=4 
3*1=3 3*2=6 3*3=9 
4*1=4 4*2=8 4*3=12 4*4=16 
5*1=5 5*2=10 5*3=15 5*4=20 5*5=25 
6*1=6 6*2=12 6*3=18 6*4=24 6*5=30 6*6=36 
7*1=7 7*2=14 7*3=21 7*4=28 7*5=35 7*6=42 7*7=49 
8*1=8 8*2=16 8*3=24 8*4=32 8*5=40 8*6=48 8*7=56 8*8=64 
9*1=9 9*2=18 9*3=27 9*4=36 9*5=45 9*6=54 9*7=63 9*8=72 9*9=81 
"""
```

## 流程控制 for

### for 语法

``` python
for 临时变量 in 序列:
    重复执行的代码1
    重复执行的代码2
    ......
```

#### 循环整数

```python
print("===for 循环整数===")
number = 10
for i in range(number):
    print(i, end=" ")
else:
    print()
```

```
0 1 2 3 4 5 6 7 8 9 
```

#### 遍历字符串

```python
print("===for 循环字符串===")
strName = "James Shock"
for s in strName:
    if (s == " "):
        print("-", end="")
    else:
        print(s, end="")
else:
    print()
```

```
James-Shock
```

#### 遍历 list 列表

```python
print("===for 循环 list 列表===")
listFruits = ["apple", "banana", "cherry"]
for fruit in listFruits:
    print(fruit, end=" ")
else:
    print()
```

```
apple banana cherry 
```

#### 遍历 set 集合

```python
print("===for 循环 set 集合===")
setCars = {"Volvo", "Maserati", "bmw"}
for car in setCars:
    print(car, end=" ")
else:
    print()
```

```
Maserati Volvo bmw
```

#### 遍历 tuple 元组

```python
print("===for 循环 tuple 元组===")
tuplePlace = ("home", "school", "hotel")
for place in tuplePlace:
    print(place, end=" ")
else:
    print()
```

```
home school hotel
```

#### 遍历 dict 字典

```python
print("===for 循环 dict 字典===")
dictJobs = {
    "ce0": 0,
    "personnel": 1,
    "engineer": 2,
    "salor": 3
}
for job in dictJobs:
    print(job, end="：")
    print(dictJobs[job], end=" ")
else:
    print()
```

```
ce0：0 personnel：1 engineer：2 salor：3 
```

```python
building_dict = dict({
    'height': 200,
    'weight': 70,
    'area': 200
})

print(person_dict.get('home'))
print(person_dict.get('home', 'Heaven'))

print(building_dict.keys())
print(building_dict.values())
print(building_dict.items())

for key in building_dict.keys():
    print(key, ' from building_dict')

for value in building_dict.values():
    print(value , ' from building_dict')

for item in building_dict.items():
    print(item)

for key, value in building_dict.items():
    print(key, ":", value)
```

```
None
Heaven

dict_keys(['height', 'weight', 'area'])
dict_values([200, 70, 200])
dict_items([('height', 200), ('weight', 70), ('area', 200)])

height  from building_dict
weight  from building_dict
area  from building_dict

200  from building_dict
70  from building_dict
200  from building_dict

('height', 200)
('weight', 70)
('area', 200)

height : 200
weight : 70
area : 200
```

#### 遍历 enumerate() 

- `enumerate()` 是一个内置函数，用于在遍历可迭代对象（如列表、元组、字符串等）时，同时获取元素的索引和值
- 返回一个枚举对象，生成由索引和值组成的元组

```python
enumerate(iterable, start=0)
```
- **`iterable`**: 需要遍历的可迭代对象（如列表、元组、字符串等）。
- **`start`**: 索引的起始值，默认为 0。

##### 遍历 list 列表

```python
my_list = ['apple', 'banana', 'cherry']

for index, value in enumerate(my_list):
    print(f"Index: {index}, Value: {value}")
```

```
Index: 0, Value: apple
Index: 1, Value: banana
Index: 2, Value: cherry
```

##### 指定起始索引

```python
my_list = ['apple', 'banana', 'cherry']

for index, value in enumerate(my_list, start=1):
    print(f"Index: {index}, Value: {value}")
```

```
Index: 1, Value: apple
Index: 2, Value: banana
Index: 3, Value: cherry
```

##### 遍历 dict 字典的键

```python
my_dict = {'a': 1, 'b': 2, 'c': 3}

for index, key in enumerate(my_dict):
    print(f"Index: {index}, Key: {key}, Value: {my_dict[key]}")
```

```
Index: 0, Key: a, Value: 1
Index: 1, Key: b, Value: 2
Index: 2, Key: c, Value: 3
```

##### 遍历 dict 字典的键值对

```python
my_dict = {'a': 1, 'b': 2, 'c': 3}

for index, (key, value) in enumerate(my_dict.items()):
    print(f"Index: {index}, Key: {key}, Value: {value}")
```

```
Index: 0, Key: a, Value: 1
Index: 1, Key: b, Value: 2
Index: 2, Key: c, Value: 3
```

##### 遍历字符串

```python
my_string = "hello"

for index, char in enumerate(my_string):
    print(f"Index: {index}, Character: {char}")
```

```
Index: 0, Character: h
Index: 1, Character: e
Index: 2, Character: l
Index: 3, Character: l
Index: 4, Character: o
```

###  循环的 else

- 循环可以和 else 配合使用，else 下方缩进的代码指的是 **当循环正常结束之后要执行的代码** 
- 所谓 else 指的是循环正常结束之后要执行的代码，即如果是 break 终止循环的情况，else 下方缩进的代码将不执行
- 因为 continue 是退出当前一次循环，继续下一次循环，所以该循环在 continue 控制下是可以正常结束的，当循环结束后，则执行了 else 缩进的代码

Pythonwhile...else 语法

``` python
while 条件:
    条件成立重复执行的代码
else:
    循环正常结束之后要执行的代码
```

for...else 语法

``` python
for 临时变量 in 序列:
    重复执行的代码
    ...
else:
    循环正常结束之后要执行的代码
```

## 字符串 str

``` python
# 引号创建
a = 'hello world'
b = "abcdefg"
print(type(a)) # <class 'str'>
print(type(b)) # <class 'str'>
```

- 一对字符串

- 三引号字符串
- `\'` 用在单引号之内
- `f"模板字符串{变量}"` 
- `stringName[idx]` 下标索引方式

```python
# 一对字符串
name = "James"
home = "New York"
print(name, home)
```

```python
# 三引号字符串：支持换行
address = """
    This is my home.
    That is our palce.
"""
print(address)
```

```python
sentence = "I'm James"
print(sentence)

# `\'`用在单引号之内
title = 'Here\'s my title'
print(title)
```

```python
# 模板字符串
name = "Joker"
formatStr = f"Hi {name}, I'm {name}"
print(formatStr)
```

```python
# `stringName[idx]` 下标索引方式，下标从 0 开始
stringName = "abcdef"
print(stringName[0], stringName[1], stringName[2])
```

``` python
"""
James New York

    This is my home.
    That is our palce.

I'm James
Here's my title
Hi Joker, I'm Joker
a b c
"""
```

### 切片

- 切片是指对操作的对象截取其中一部分的操作。
- **字符串、列表、元组** 都支持切片操作。

`序列[前位置下标:后位置下标:步长]` 

- 不包含结束位置下标对应的数据， 前闭后开
- 步长是选取间隔，正负整数均可，默认步长为 1

```python
stringnumber = "0123456789"
print(stringnumber[0:2:1])  
print(stringnumber[::1])    # 相当于复制
print(stringnumber[::])     # 相当于复制
print(stringnumber[:])     # 相当于复制
print(stringnumber[0:20:1]) # 结束位置超出了长度，则截取到末尾
print(stringnumber[2:8:2])  # 246
print(stringnumber[-10:-1]) # 012345678
print(stringnumber[-10:-1:2]) # 02468 相当于取出来偶数
print(stringnumber[::-1])   # 9876543210 反转字符串

"""
01
0123456789
0123456789
0123456789
0123456789
246
012345678
02468
9876543210
"""
```

### 查找

#### find() rfind()

- 检测某个子串是否包含在这个字符串中，如果在返回这个子串开始的位置下标，否则则返回 -1
- 开始和结束位置下标省略，则表示在整个字符串序列中查找
- rfind() 和 find() 功能相同，但查找方向为 ==右侧== 开始。

```python
字符串序列.find(子串, 开始位置下标, 结束位置下标)
```

```python
#查找
stringnumber2 = "0123456789"

# find()
print(stringnumber2.find("23", 5,6))
print(stringnumber2.find("456", 0,8))
print(stringnumber2.find("8"))
print(stringnumber2.find("10"))
```

```
-1
4
8
-1
```

#### index() rindex()

- 检测某个子串是否包含在这个字符串中，如果在返回这个子串开始的位置下标，否则则报异常
- 开始和结束位置下标省略，则表示在整个字符串序列中查找
- rindex() 和 index() 功能相同，但查找方向为 ==右侧== 开始。

```python
字符串序列.index(子串, 开始位置下标, 结束位置下标)
```

```python
#查找
stringnumber2 = "0123456789"

# index()
print(stringnumber2.index("456", 0,8))
print(stringnumber2.index("10"))
```

```
4
Traceback (most recent call last):
  File "C:\Users\char1\Projects\Python-Examples\13.str 字符串操作.py", line 22, in <module>
    print(stringnumber2.index("10"))
          ^^^^^^^^^^^^^^^^^^^^^^^^^
ValueError: substring not found
```

#### count()

- 返回某个子串在字符串中出现的次数

```python
字符串序列.count(子串, 开始位置下标, 结束位置下标)
```

```python
#查找
stringnumber2 = "0123456789"
# count()
print(stringnumber2.count("0"))
print(stringnumber2.count("0", 4, 5))
```

```
2
0
```

#### max()

```python
# 1. 字符串
str1 = 'abcdefg'
print(max(str1))  # g
```

#### min()

```python
# 1. 字符串
str1 = 'abcdefg'
print(min(str1))  # a
```

### 修改

> - 数据按照是否能直接修改分为 **可变类型** 和 **不可变类型** 两种
> - 字符串属于不可变类型，因此修改的时候不能改变原有字符串，而是通过返回值获取最新的字符串

#### replace() 替换

``` python
字符串序列.replace(旧子串, 新子串, 替换次数)
```

``` python
stringnumber3 = "012345678901234567890123456789"
print(stringnumber3.replace("123", "new")) # 默认全部替换
print(stringnumber3.replace("123", "new",1)) # 只替换查到的第一个
print(stringnumber3.replace("123", "new",2)) # 只替换查到的前面两个
```

```
0new45678901234567890123456789
0new4567890new4567890123456789
0new4567890new4567890new456789
```

#### split() 分割

```python
字符串序列.split(分割字符, 分割次数)
```

```python
stringnumber3 = "012345678901234567890123456789"
print(stringnumber3.split("234")) # 默认把匹配到的全部的 234 都进行分割
print(stringnumber3.split("234",1)) # 例如，这里有三处 234，这里的 1 是把匹配到的第一个 234 拿来进行分割，因此只分割了一次
print(stringnumber3.split("234",2)) # 例如，这里有三处 234，这里的 2 是把匹配到的第一个和第二个 234 拿来进行分割，因此只分割了两次
```

```
['01', '5678901', '5678901', '56789']
['01', '5678901234567890123456789']
['01', '5678901', '567890123456789']
```

#### join() 合并

```python
字符或子串.join(多字符串组成的序列)
```

```python
list1 = ["a","b","c","d","e","f"]
tuple1 = ("0","1","2","3","4","5")
print("".join(list1))
print("".join(tuple1))
```

```
abcdef
012345
```

#### capitalize() 转大写

capitalize()函数转换后，只字符串第一个字符大写，其他的字符全都小写

``` python
mystr = "hello world and itcast and itheima and Python"
print(mystr.capitalize())
```

```
Hello world and itcast and itheima and python
```

#### title() 转大写

每个单词首字母转换成大写

``` python
mystr = "hello world and itcast and itheima and Python"

print(mystr.title())
```

```
Hello World And Itcast And Itheima And Python
```

#### upper() 转大写

将字符串中小写转大写。

```python
mystr = "hello world and itcast and itheima and Python"

print(mystr.upper())
```

```
HELLO WORLD AND ITCAST AND ITHEIMA AND PYTHON
```

#### lower() 转小写

将字符串中大写转小写

``` python
mystr = "hello world and AND ITCAST AND ITHEIMA AND PYTHON"

print(mystr.lower())
```

```
hello world and itcast and itheima and python
```

#### lstrip() rstrip() strip()

- lstrip() 删除字符串 左侧 空白字符
- rstrip() 删除字符串 右侧 空白字符
- strip() 删除字符串两侧空白字符

```python
stringSpace = "   trim stripe   "
print(stringSpace.lstrip())
print(stringSpace.rstrip())
print(stringSpace.strip())
```

```
trim stripe   
   trim stripe
trim stripe
```

#### ljust() rjust() center()

- ljust()：返回一个原字符串左对齐, 并使用指定字符(默认空格)填充至对应长度 的新字符串
- rjust()：返回一个原字符串右对齐, 并使用指定字符(默认空格)填充至对应长度 的新字符串，语法和 ljust()相同
- center()：返回一个原字符串居中对齐, 并使用指定字符(默认空格)填充至对应长度 的新字符串，语法和 ljust()相同
- 注意，填充字符不能是字符串

``` python
字符串序列.ljust(长度, 填充字符)
```

```python
stringOrg = "original string"
print(stringOrg.ljust(30, "."))
print(stringOrg.rjust(30, "="))
print(stringOrg.center(30, "*"))
```

```
original string...............
===============original string
*******original string********
```

### 判断

所谓判断即是判断真假，返回的结果是布尔型数据类型：True 或 False。

#### startswith()

- 检查字符串是否是以指定子串开头，是则返回 True，否则返回 False
- 如果设置开始和结束位置下标，则在指定范围内检查
- 前闭后开

``` python
字符串序列.startswith(子串, 开始位置下标, 结束位置下标)
```

``` python
stringCheck = "123456789"
print(stringCheck.startswith("123"))
print(stringCheck.startswith("123", 0,5))
print(stringCheck.startswith("234", 1,5))
print(stringCheck.startswith("567", 4,6)) # 指定范围小于查找字符串 567 的长度，则直接返回 False
print(stringCheck.startswith("567", 4,7)) # 从下标 4 开始查找到下标 7，这里是前闭后闭区
print(stringCheck.startswith("8", -2,-1)) # -2 从末尾开始，倒数第二个数，-1 最后一个元素
```

```
True
True
True
False
True
True
```

#### endswith()

- 检查字符串是否是以指定子串结尾，是则返回 True，否则返回 False
- 如果设置开始和结束位置下标，则在指定范围内检查

``` python
字符串序列.endswith(子串, 开始位置下标, 结束位置下标)
```

``` python
mystr = "hello world and itcast and itheima and Python"

print(mystr.endswith('Python'))
print(mystr.endswith('python'))
print(mystr.endswith('Python', 2, 20))
```

```
True
False
False
```

#### isalpha()

如果字符串至少有一个字符并且所有字符都是字母则返回 True, 否则返回 False。

``` python
mystr1 = 'hello'
mystr2 = 'hello12345'

# 结果：True
print(mystr1.isalpha())

# 结果：False
print(mystr2.isalpha())
```

#### isdigit()

如果字符串只包含数字则返回 True 否则返回 False。

``` python
mystr1 = 'aaa12345'
mystr2 = '12345'

# 结果： False
print(mystr1.isdigit())

# 结果：False
print(mystr2.isdigit())
```

#### isalnum()

如果字符串至少有一个字符并且所有字符都是字母或数字则返 回 True, 否则返回 False。

``` python
mystr1 = 'aaa12345'
mystr2 = '12345-'

# 结果：True
print(mystr1.isalnum())

# 结果：False
print(mystr2.isalnum())
```

#### isspace()

如果字符串中只包含空白，则返回 True，否则返回 False。

``` python
mystr1 = '1 2 3 4 5'
mystr2 = '     '

# 结果：False
print(mystr1.isspace())

# 结果：True
print(mystr2.isspace())
```

## 列表 list

### 定义 list

列表可以一次性存储多个数据，且可以为不同数据类型

``` python
myList = [数据1, 数据2, 数据3, 数据4......]
```

```python
name_list = ['Tom', 'Lily', 'Rose']
print(name_list)

# ['Tom', 'Lily', 'Rose']
```

### 查找

#### 下标

- 如果查找的数据不存在则报错

``` python
name_list = ['Tom', 'Lily', 'Rose']

print(name_list[0])  # Tom
print(name_list[1])  # Lily
print(name_list[2])  # Rose
```

#### index()

- 返回指定数据所在位置的下标
- 如果查找的数据不存在则报错

``` python
列表序列.index(数据, 开始位置下标, 结束位置下标)
```

``` python
name_list = ['Tom', 'Lily', 'Rose']

print(name_list.index('Lily', 0, 2))  # 1
```

#### count()

统计指定数据在当前列表中出现的次数

``` python
name_list = ['Tom', 'Lily', 'Rose']

print(name_list.count('Lily'))  # 1
```

#### len()

访问列表长度，即列表中数据的个数

``` python
name_list = ['Tom', 'Lily', 'Rose']

print(len(name_list))  # 3
```

#### max()

```python
list1 = [10, 20, 30, 40]
print(max(list1))  # 40
```

#### min()

```python
# 2. 列表
list1 = [10, 20, 30, 40]
print(min(list1))  # 10
```

### 判断

#### in

判断指定数据在某个列表序列，如果在返回 True，否则返回 False

``` python
name_list = ['Tom', 'Lily', 'Rose']

# 结果：True
print('Lily' in name_list)

# 结果：False
print('Lilys' in name_list)
```

#### not in

判断指定数据不在某个列表序列，如果不在返回 True，否则返回 False

``` python
name_list = ['Tom', 'Lily', 'Rose']

# 结果：False
print('Lily' not in name_list)

# 结果：True
print('Lilys' not in name_list)
```

``` python
name_list = ['Tom', 'Lily', 'Rose']

name = input('请输入您要搜索的名字：')

if name in name_list:
    print(f'您输入的名字是{name}, 名字已经存在')
else:
    print(f'您输入的名字是{name}, 名字不存在')
```

### 添加

#### append()

- 列表结尾追加数据
- 列表追加数据的时候，直接在原列表里面追加了指定数据，即修改了原列表，故列表为可变类型数据

``` python
列表序列.append(数据)
```

``` python
name_list = ['Tom', 'Lily', 'Rose']

name_list.append('xiaoming')

# 结果：['Tom', 'Lily', 'Rose', 'xiaoming']
print(name_list)
```

#### extend()

- 列表结尾追加数据，如果数据是一个序列，则将这个序列的数据逐一添加到列表。

```python
列表序列.extend(数据)
```

```python
name_list = ['Tom', 'Lily', 'Rose']

name_list.extend('xiaoming')

# 结果：['Tom', 'Lily', 'Rose', 'x', 'i', 'a', 'o', 'm', 'i', 'n', 'g']
print(name_list)
```

```python
name_list = ['Tom', 'Lily', 'Rose']

name_list.extend(['xiaoming', 'xiaohong'])

# 结果：['Tom', 'Lily', 'Rose', 'xiaoming', 'xiaohong']
print(name_list)
```

#### insert()

- 指定位置新增数据

``` python
列表序列.insert(位置下标, 数据)
```

``` python
name_list = ['Tom', 'Lily', 'Rose']

name_list.insert(1, 'xiaoming')

# 结果：['Tom', 'xiaoming', 'Lily', 'Rose']
print(name_list)
```

### 修改

#### 下标

``` python
name_list = ['Tom', 'Lily', 'Rose']

name_list[0] = 'aaa'

# 结果：['aaa', 'Lily', 'Rose']
print(name_list)
```

#### reverse() 逆置

``` python
num_list = [1, 5, 2, 3, 6, 8]

num_list.reverse()

# 结果：[8, 6, 3, 2, 5, 1]
print(num_list)
```

#### sort() 排序

- **`key`**: 指定一个函数，用于从列表中的每个元素中提取比较键
- **`reverse`**: 一个布尔值，**reverse = True** 降序， **reverse = False** 升序（默认）

``` python
列表序列.sort( key=None, reverse=False)
```

``` python
num_list = [1, 5, 2, 3, 6, 8]

num_list.sort()

# 结果：[1, 2, 3, 5, 6, 8]
print(num_list)
```

```python
name_list = ['James', 'Rose', 'Tat', 'Lily', 'Joker', 'Jerry', 'Alice']
name_list.sort(key=len) 
# 按照字符串长度进行排队
# ['Tat', 'Rose', 'Lily', 'James', 'Joker', 'Jerry', 'Alice']
```

```python
dict_list = [
    {
        "name": "Tom",
        "age": 110
    },
    {
        "name": "Jerry",
        "age": 20
    },
    {
        "name": "James",
        "age": 30
    }
]
# 按照 age 大小排序
def sortFn(dictListItem):
    return dictListItem['age']
dict_list.sort(key=sortFn, reverse=True)
```

### 复制

#### copy()

``` python
name_list = ['Tom', 'Lily', 'Rose']

name_li2 = name_list.copy()

# 结果：['Tom', 'Lily', 'Rose']
print(name_li2)
```

### 删除

#### del

``` python
del 目标
```

``` python
name_list = ['Tom', 'Lily', 'Rose']

# 删除整个列表
# 结果：报错提示：name 'name_list' is not defined
del name_list
print(name_list)
```

``` python
name_list = ['Tom', 'Lily', 'Rose']

# 删除指定元素
del name_list[0]

# 结果：['Lily', 'Rose']
print(name_list)
```

#### pop() 指定/末尾

删除指定下标的数据(默认为最后一个)，并返回该数据

``` python
列表序列.pop(下标)
```

``` python
name_list = ['Tom', 'Lily', 'Rose']

del_name = name_list.pop(1)

# 结果：Lily
print(del_name)

# 结果：['Tom', 'Rose']
print(name_list)
```

#### remove()

移除列表中某个数据的第一个匹配项，不返回数据

``` python
列表序列.remove(数据)
```

``` python
name_list = ['Tom', 'Lily', 'Rose']

name_list.remove('Rose')

# 结果：['Tom', 'Lily']
print(name_list)
```

#### clear() 清空

``` python
name_list = ['Tom', 'Lily', 'Rose']

name_list.clear()
print(name_list) # 结果： []
```

## 元组 tuple

如果想要存储多个数据，但是这些数据是不能修改的数据，怎么做？列表可以一次性存储多个数据，但是列表中的数据允许更改，而一个元组可以存储多个数据，且元组内的数据是不能修改的。

### 定义 tuple 

- 定义元组使用 **小括号**，用逗号隔开各个数据，数据可以是不同的数据类型
- 元组数据不支持修改，只支持查找
- 如果定义的元组只有一个数据，那么这个数据后面也好添加逗号，否则数据类型为唯一的这个数据的数据类型
- 元组内的直接数据如果修改则立即报错
- 如果元组里面有列表，修改列表里面的数据则是支持的

``` python
# 多个数据元组
t1 = (10, 20, 30)

# 单个数据元组
t2 = (10,)

# 可以是不同的数据类型
any_tuple = (1, 2, 3, "a", "b", "c")
```

``` python
t2 = (10,)
print(type(t2))  # tuple

t3 = (20)
print(type(t3))  # int

t4 = ('hello')
print(type(t4))  # str
```

```python
tuple2 = (10, 20, ['aa', 'bb', 'cc'], 50, 30)
print(tuple2[2])  # 访问到列表

# 结果：(10, 20, ['aaaaa', 'bb', 'cc'], 50, 30)
tuple2[2][0] = 'aaaaa'
print(tuple2)
```

```python
tuple1 = ('aa', 'bb', 'cc', 'bb')
tuple1[0] = 'aaa'
```

### 查找

#### 下标

``` python
tuple1 = ('aa', 'bb', 'cc', 'bb')
print(tuple1[0])  # aa
```

#### index()

查找某个数据，如果数据存在返回对应的下标，否则报错，语法和列表、字符串的 index 方法相同

``` python
tuple1 = ('aa', 'bb', 'cc', 'bb')
print(tuple1.index('aa'))  # 0
```

#### count()

统计某个数据在当前元组出现的次数

``` python
tuple1 = ('aa', 'bb', 'cc', 'bb')
print(tuple1.count('bb'))  # 2
```

#### len()

统计元组中数据的个数

``` python
tuple1 = ('aa', 'bb', 'cc', 'bb')
print(len(tuple1))  # 4
```

## 字典 dict

- 字典里面的数据是以 **键值对** 形式出现，字典数据和数据顺序没有关系，即字典不支持下标，后期无论数据如何变化，只需要按照对应的键的名字查找数据即可

### 定义 dict

- 符号为 **大括号**
- 数据为 **键值对** 形式出现
- 各个键值对之间用 **逗号** 隔开

``` python
# 有数据字典
dict1 = {
    'name': 'Tom', 
    'age': 20, 
    'gender': '男'
}

# 空字典
dict2 = {}
dict3 = dict()
```

### 添加/修改

- 字典为可变类型

- 如果 key 存在则修改这个 key 对应的值 ；如果 key 不存在则新增此键值对

```python
字典序列[key] = value
```

``` python
dict1 = {
    'name': 'Tom',
    'age': 20,
    'gender': '男'
}

dict1['name'] = 'Rose'
print(dict1) # 结果：{'name': 'Rose', 'age': 20, 'gender': '男'}

dict1['id'] = 110
print(dict1) # {'name': 'Rose', 'age': 20, 'gender': '男', 'id': 110}
```

### 查找

#### key 值查找

- 如果当前查找的 key 存在，则返回对应的值；否则则报错

``` python
dict1 = {'name': 'Tom', 'age': 20, 'gender': '男'}
print(dict1['name'])  # Tom
print(dict1['id'])  # 报错
```

#### get()

- 如果当前查找的 key 不存在则返回第二个参数(默认值)，如果省略第二个参数，则返回 None

``` python
字典序列.get(key, 默认值)
```

``` python 
dict1 = {'name': 'Tom', 'age': 20, 'gender': '男'}
print(dict1.get('name'))  # Tom
print(dict1.get('id', 110))  # 110
print(dict1.get('id'))  # None
```

#### keys()

``` python
dict1 = {'name': 'Tom', 'age': 20, 'gender': '男'}
print(dict1.keys())  # dict_keys(['name', 'age', 'gender'])
```

#### values()

``` python
dict1 = {'name': 'Tom', 'age': 20, 'gender': '男'}
print(dict1.values())  # dict_values(['Tom', 20, '男'])
```

#### items()

``` python
dict1 = {'name': 'Tom', 'age': 20, 'gender': '男'}
print(dict1.items())  # dict_items([('name', 'Tom'), ('age', 20), ('gender', '男')])
```

### 删除

#### del() del

删除字典或删除字典中指定键值对

``` python
dict1 = {'name': 'Tom', 'age': 20, 'gender': '男'}

del dict1['gender']
print(dict1)

del(dict1['name'])
print(dict1)
```

```
{'name': 'Tom', 'age': 20}
{'age': 20}
```

#### clear() 清空

``` python
dict1 = {'name': 'Tom', 'age': 20, 'gender': '男'}

dict1.clear()
print(dict1)  # {}
```

## 集合 set

### 定义 set

- 创建集合使用 `{}` 或 `set()` 
- 但是如果要创建空集合只能使用 `set()`，因为 `{}` 用来创建空字典
- 集合可以去掉重复数据
- 集合数据是无序的，故不支持下标

``` python
s1 = {10, 20, 30, 40, 50}
print(s1)

s2 = {10, 30, 20, 10, 30, 40, 30, 50}
print(s2)

s3 = set('abcdefg')
print(s3)

s4 = set()
print(type(s4))  # set

s5 = {}
print(type(s5))  # dict
```

```python
print(number_set)
tag_set = {'good','good', 'well', 'bad', 'worst'}
print(tag_set)
none_set = set()
print(none_set)
any_set = set({1,2,3,4,5,"a","b","c"})
print(any_set)
```

```
{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
{'worst', 'bad', 'well', 'good'}
set()
{1, 2, 3, 4, 5, 'c', 'b', 'a'}
```

### 添加/修改

#### add()

因为集合有去重功能，所以，当向集合内追加的数据是当前集合已有数据的话，则不进行任何操作

``` python
s1 = {10, 20}
s1.add(100)
s1.add(10)
print(s1)  # {100, 10, 20}
```

#### update()

追加的数据需要是序列（带有 iterable 接口）

``` python
num_set = {1,2}
print(num_set)

num_set.update('abcd')
print(num_set)

num_set.update([2,4])
print(num_set)

num_set.update({3,5})
print(num_set)
# s1.update(100)  # 报错 'int' object is not iterable
```

```
{1, 2}
{1, 2, 'c', 'd', 'a', 'b'}
{1, 2, 'c', 4, 'd', 'a', 'b'}
{1, 2, 3, 'c', 4, 5, 'd', 'a', 'b'}
```

### 查找

#### in

判断数据在集合序列

#### not in

判断数据不在集合序列

``` python
s1 = {10, 20, 30, 40, 50}

print(10 in s1)
print(10 not in s1)
```

```
True
False
```

### 删除

#### remove() 指定删除

删除集合中的指定数据，如果数据不存在则报错

``` python
s1 = {10, 20}

s1.remove(10)
print(s1)

s1.remove(10)  # 报错
print(s1)
```

#### discard() 指定删除

删除集合中的指定数据，如果数据不存在也不会报错

``` python
s1 = {10, 20}

s1.discard(10)
print(s1)

s1.discard(10)
print(s1)
```

#### pop() 随机删除

随机删除集合中的某个数据，并返回这个数据

``` python
s1 = {10, 20, 30, 40, 50}

del_num = s1.pop()
print(del_num)
print(s1)
```

```python
num_set = {'c', 1, 2, 3, 4, 5, 'a', 'b', 'd'}
print(num_set.remove(1)) # None
# print(num_set.remove(1)) # 会报错
print(num_set)
print(num_set.discard('a')) #None
print(num_set.discard('a')) #None
print(num_set)
print(num_set.pop())
print(num_set)
```

```
None
{'c', 2, 3, 4, 5, 'a', 'b', 'd'}
None
None
{'c', 2, 3, 4, 5, 'b', 'd'}
c
{2, 3, 4, 5, 'b', 'd'}
```

## 范围 Range

### 定义 Range

- 有序、不可变、表示一个数字序列
- range()生成的序列不包含 end 数字

```python
my_range = range(1, 10, 2)  # 1 到 10，步长为 2
print(list(my_range))       # 输出: [1, 3, 5, 7, 9]
```

```python
# 0 - 10，不包括10， 步长默认为 1
rangeNumber = range(10)
print(rangeNumber) # range(0, 10)
for number in rangeNumber:
    print(number, end=' ')

# 10 -20，不包括20，步长为 2
rangeNumber2 = range(10,20,2)
print(rangeNumber2) # range(10, 20, 2)
for number in rangeNumber2:
    print(number, end=' ')
```

```
0 1 2 3 4 5 6 7 8 9
10 12 14 16 18 
```

## 推导式

在 Python 中，**推导式（Comprehension）** 是一种简洁的语法，用于快速创建列表、字典、集合等数据结构。推导式可以使代码更加简洁、易读，同时提高开发效率。

Python 支持以下几种推导式：
1. **列表推导式（List Comprehension）**：快速生成列表 
2. **字典推导式（Dictionary Comprehension）**：快速生成字典
3. **集合推导式（Set Comprehension）**：快速生成集合
4. **生成器推导式（Generator Comprehension）**：快速生成生成器对象。生成器是一种惰性求值的可迭代对象，适合处理大量数据

| 推导式类型   | 语法格式                                         | 输出结果     |
| ------------ | ------------------------------------------------ | ------------ |
| 列表推导式   | `[expression for item in iterable if condition]` | 列表         |
| 字典推导式   | `{key: value for item in iterable if condition}` | 字典         |
| 集合推导式   | `{expression for item in iterable if condition}` | 集合         |
| 生成器推导式 | `(expression for item in iterable if condition)` | 生成器对象   |
| 嵌套推导式   | 推导式嵌套使用                                   | 多维数据结构 |

### 列表推导式

```python
[expression for item in iterable if condition]
```
- **`expression`**: 对 `item` 的操作或计算。
- **`item`**: 可迭代对象中的每个元素。
- **`iterable`**: 可迭代对象（如列表、元组、字符串等）。
- **`condition`**: 可选，过滤条件。

```python
# 生成 1 到 10 的平方列表
squares = [x**2 for x in range(1, 11)]
print(squares)
# 输出: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

# 过滤偶数
even_squares = [x**2 for x in range(1, 11) if x % 2 == 0]
print(even_squares)
# 输出: [4, 16, 36, 64, 100]
```

### 字典推导式 

```python
{key_expression: value_expression for item in iterable if condition}
```
- **`key_expression`**: 生成字典键的表达式。
- **`value_expression`**: 生成字典值的表达式。
- **`item`**: 可迭代对象中的每个元素。
- **`iterable`**: 可迭代对象。
- **`condition`**: 可选，过滤条件。

```python
# 生成数字与其平方的字典
squares_dict = {x: x**2 for x in range(1, 6)}
print(squares_dict)
# 输出: {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# 过滤偶数键
even_squares_dict = {x: x**2 for x in range(1, 6) if x % 2 == 0}
print(even_squares_dict)
# 输出: {2: 4, 4: 16}
```

```python
dict_num_comprehension = {i:"val"+str(i) for i in range(1,11)}
print(dict_num_comprehension)

keys = ["name","age","gender"]
values = ["James", 30, "male"]
dict_comprehension = {keys[i]:values[i] for i in range(len(keys))}
print(dict_comprehension)
```

```
{1: 'val1', 2: 'val2', 3: 'val3', 4: 'val4', 5: 'val5', 6: 'val6', 7: 'val7', 8: 'val8', 9: 'val9', 10: 'val10'}
{'name': 'James', 'age': 30, 'gender': 'male'}
```

### 集合推导式

```python
{expression for item in iterable if condition}
```
- **`expression`**: 对 `item` 的操作或计算。
- **`item`**: 可迭代对象中的每个元素。
- **`iterable`**: 可迭代对象。
- **`condition`**: 可选，过滤条件。

```python
# 生成 1 到 10 的平方集合
squares_set = {x**2 for x in range(1, 11)}
print(squares_set)
# 输出: {64, 1, 4, 36, 100, 9, 16, 49, 81, 25}

# 过滤偶数
even_squares_set = {x**2 for x in range(1, 11) if x % 2 == 0}
print(even_squares_set)
# 输出: {16, 4, 100, 64, 36}
```

### 生成器推导式

```python
(expression for item in iterable if condition)
```
- **`expression`**: 对 `item` 的操作或计算。
- **`item`**: 可迭代对象中的每个元素。
- **`iterable`**: 可迭代对象。
- **`condition`**: 可选，过滤条件。

```python
# 生成 1 到 10 的平方生成器
squares_gen = (x**2 for x in range(1, 11))

# 遍历生成器
for value in squares_gen:
    print(value, end=" ")
# 输出: 1 4 9 16 25 36 49 64 81 100
```

### 嵌套推导式

推导式嵌套使用，可以用于处理多维数据结构。

- 嵌套列表推导式

```python
# 生成 3x3 的矩阵
matrix = [[i + j for j in range(3)] for i in range(3)]
print(matrix)
# 输出: [[0, 1, 2], [1, 2, 3], [2, 3, 4]]
```

- 嵌套字典推导式

```python
# 生成嵌套字典
nested_dict = {i: {j: i * j for j in range(1, 4)} for i in range(1, 4)}
print(nested_dict)
# 输出: {1: {1: 1, 2: 2, 3: 3}, 2: {1: 2, 2: 4, 3: 6}, 3: {1: 3, 2: 6, 3: 9}}
```

## 函数

### 定义函数

``` python
def 函数名(参数):
    代码1
    代码2
    ......
```

### 调用函数

``` python
函数名(参数)
```

### 变量作用域

变量作用域指的是变量生效的范围，主要分为两类：**局部变量** 和 **全局变量**

- 局部变量：定义在函数体内部的变量，即只在函数体内部生效，当函数调用完成后，就销毁局部变量

``` python
def testA():
    a = 100
    print(a)

testA()  # 100
print(a)  
# 报错：name 'a' is not defined
# 变量 a 是定义在`testA`函数内部的变量，在函数外部访问则立即报错
```

- 全局变量：在函数体内、外都能生效的变量，在最外层声明，或者使用 `global` 关键字

``` python
# 定义全局变量a
a = 100

def testA():
    print(a)  # 访问全局变量a，并打印变量a存储的数据

def testB():
    # global 关键字声明a是全局变量
    global a
    a = 200
    print(a) 

testA()  # 100
testB()  # 100
```

### 函数返回值

- 多个返回值，例如，`return a, b` 写法，则默认返回元组类型
- return 后面可以连接列表、元组或字典，以返回多个值

``` python
def return_num():
    return 1, 2

result = return_num()
print(result)  # (1, 2)
```

### 函数的参数

- 根据函数定义的参数位置来传递参数，因此传递和定义参数的顺序及个数必须一致
- 函数调用，通过“键 = 值”形式加以指定。可以让函数更加清晰、容易使用，同时也清除了参数的顺序需求
- 函数调用时，如果有位置参数时，位置参数必须在关键字参数的前面，但关键字参数之间不存在先后顺序

``` python
def user_info(name, age, gender):
    print(f'您的名字是{name}, 年龄是{age}, 性别是{gender}')

user_info('TOM', 20, '男')
```

``` python
def user_info(name, age, gender):
    print(f'您的名字是{name}, 年龄是{age}, 性别是{gender}')

user_info('Rose', age=20, gender='女')
user_info('小明', gender='男', age=16)
```

``` python
# 默认参数 gender 男
def user_info(name, age, gender='男'):
    print(f'您的名字是{name}, 年龄是{age}, 性别是{gender}')

user_info('TOM', 20)
user_info('Rose', 18, '女')
```

### 不定长/可变参数

**不定长参数**（也称为可变参数）允许函数接受任意数量的参数。Python 提供了两种方式来处理不定长参数：

1. **`*args`**：用于接收任意数量的 **位置参数**，存储为一个元组。
2. **`**kwargs`**：用于接收任意数量的 **关键字参数**，存储为一个字典。

| 参数类型   | 语法       | 捕获方式             | 存储结构 |
| ---------- | ---------- | -------------------- | -------- |
| 位置参数   | `*args`    | 任意数量的位置参数   | 元组     |
| 关键字参数 | `**kwargs` | 任意数量的关键字参数 | 字典     |

#### 位置参数 `*args`

- `*args` 将所有传入的位置参数打包成一个元组
- 可以在函数中通过索引访问这些参数

```python
def function_name(*args):
    # 函数体
```

```python
def print_args(*args):
    print("Positional arguments:", args)

print_args(1, 2, 3, 4)
```

```
Positional arguments: (1, 2, 3, 4)
```

#### 关键字参数 `**kwargs` 

接收任意数量的关键字参数

- `**kwargs` 将所有传入的关键字参数打包成一个字典
- 可以在函数中通过键访问这些参数

```python
def function_name(**kwargs):
    # 函数体
```

```python
def print_kwargs(**kwargs):
    print("Keyword arguments:", kwargs)

print_kwargs(a=1, b=2, c=3)
```

```
Keyword arguments: {'a': 1, 'b': 2, 'c': 3}
```

#### 同时使用

- 可以在同一个函数中同时使用 `*args` 和 `**kwargs`，以接收任意数量的位置参数和关键字参数
- `*args` 必须在 `**kwargs` 之前
- 位置参数会被 `*args` 捕获，关键字参数会被 `**kwargs` 捕获

```python
def function_name(*args, **kwargs):
    # 函数体
```

```python
def print_all(*args, **kwargs):
    print("Positional arguments:", args)
    print("Keyword arguments:", kwargs)

print_all(1, 2, 3, a=4, b=5)
```

```
Positional arguments: (1, 2, 3)
Keyword arguments: {'a': 4, 'b': 5}
```

#### 解包参数

- 除了在函数定义中使用 `*args` 和 `**kwargs`，还可以在函数调用时使用 `*` 和 `**` 来解包参数

```python
def print_values(a, b, c):
    print(f"a: {a}, b: {b}, c: {c}")

# 解包列表
args_list = [1, 2, 3]
print_values(*args_list)  # 相当于 print_values(1, 2, 3)

# 解包字典
kwargs_dict = {'a': 1, 'b': 2, 'c': 3}
print_values(**kwargs_dict)  # 相当于 print_values(a=1, b=2, c=3)
```

```
a: 1, b: 2, c: 3
a: 1, b: 2, c: 3
```

## lambda 表达式

### 语法

- 函数只有一个返回值，并且只有一句代码，可以使用 lambda 简化
- lambda 表达式的参数可有可无，函数的参数在 lambda 表达式中完全适用
- lambda 表达式能接收任何数量的参数但只能返回一个表达式的值

```python
lambda 参数列表 ： 表达式
```

```python
# 原函数
def get_name(name):
    return name

# lambda
get_name_lambda = lambda name: name
get_name_lambda2 = lambda : 'fix name'
get_sum = lambda x, y: x + y

print(get_name('James'))
print(get_name_lambda('Alice'))
print(get_name_lambda2())
print(get_sum(1, 2))
```

```
James
Alice
fix name
3
```

```python
# 带判断的lambda
fn1 = lambda a, b: a if a > b else b
print(fn1(1000, 500)) # 1000
```

```python
students = [
    {'name': 'TOM', 'age': 20},
    {'name': 'ROSE', 'age': 19},
    {'name': 'Jack', 'age': 22}
]

#列表数据按字典key的值排序

# 按name值升序排列
students.sort(key=lambda x: x['name'])
print(students)

# 按name值降序排列
students.sort(key=lambda x: x['name'], reverse=True)
print(students)

# 按age值升序排列
students.sort(key=lambda x: x['age'])
print(students)
```

```
[{'name': 'Jack', 'age': 22}, {'name': 'ROSE', 'age': 19}, {'name': 'TOM', 'age': 20}]
[{'name': 'TOM', 'age': 20}, {'name': 'ROSE', 'age': 19}, {'name': 'Jack', 'age': 22}]
[{'name': 'ROSE', 'age': 19}, {'name': 'TOM', 'age': 20}, {'name': 'Jack', 'age': 22}]
```

### 序列拆包

- 用于将列表、元组等可迭代对象的元素解包并分配给多个变量

```python
# 列表拆包
a, b, c = [1, 2, 3]
print(a, b, c)  # 输出: 1 2 3

# 元组拆包
x, y, z = (4, 5, 6)
print(x, y, z)  # 输出: 4 5 6
```

```python
# 使用 * 捕获剩余元素
first, *middle, last = [1, 2, 3, 4, 5]
print(first)   # 输出: 1
print(middle)  # 输出: [2, 3, 4]
print(last)    # 输出: 5
```

```python
# 交换变量值
a, b = 10, 20
a, b = b, a
print(a, b)  # 输出: 20 10
```

### 字典拆包

字典拆包用于将字典的键或键值对解包并分配给变量

```python
dict_num = {"a": 1, "b": 2, "c": 3}
# 拆 key
key1, key2, key3 = dict_num
print(key1, key2, key3) # a b c
```

```python
dict_num = {"a": 1, "b": 2, "c": 3}
# 拆 value
value1, value2, value3 = dict_num.values()
print(value1, value2, value3) # 1 2 3
```

```python
dict_num = {"a": 1, "b": 2, "c": 3}

# 拆 key-value
item1, item2, item3 = dict_num.items()
print(item1, item2, item3)
# ('a', 1) ('b', 2) ('c', 3)
```

```python
# 借助 * 捕获剩余
value1, *val = dict_num.values()
print(value1, val) # 1 [2, 3]
```

### 形参拆包

在函数调用时，可以使用 `*` 和 `**` 对参数进行拆包。

- 拆包位置参数

```python
def print_values(a, b, c):
    print(f"a: {a}, b: {b}, c: {c}")

# 拆包列表
args_list = [1, 2, 3]
print_values(*args_list)  # 相当于 print_values(1, 2, 3)
```

```
a: 1, b: 2, c: 3
```

- 拆包关键字参数

```python
personInfo = {
    "name":"Joker",
    "age":28,
    "gender":"female"
}

def getPersonInfo(name, age, gender):
    print(name, age, gender)

# 关键字拆包
getPersonInfo(**personInfo)
```

```
Joker 28 female
```

## 高阶函数

**高阶函数（Higher-Order Function）** ：能够接受函数作为参数或返回函数作为结果的函数

- **接受函数作为参数**：高阶函数可以将其他函数作为参数传入
- **返回函数作为结果**：高阶函数可以返回一个新的函数
- **操作函数**：高阶函数可以对函数进行组合、封装或扩展

### 内置高阶函数

#### `map()`

```python
map(function, iterable)

"""
# 将传入的函数变量 function 作用到 iterable 变量的每个元素中
# 并将结果组成新的列表(Python2)/迭代器(Python3)返回
"""
```

```python
# 将列表中的每个元素平方
numbers = [1, 2, 3, 4]
squared = map(lambda x: x**2, numbers)
print(list(squared))  # 输出: [1, 4, 9, 16]
```

#### `filter()`

```python
filter(function, iterable)

"""
# filter 过滤掉不符合条件的元素, 返回一个 filter 对象
# 如果要转换为列表, 可以使用  list() 来转换
"""
```

```python
# 过滤出列表中的偶数
numbers = [1, 2, 3, 4, 5, 6]
evens = filter(lambda x: x % 2 == 0, numbers)
print(list(evens))  # 输出: [2, 4, 6]
```

#### `reduce()`

```python
from functools import reduce
reduce(function, iterable[, initializer])
"""
# reduce(func，iterable) 累积操作，返回一个最终结果
# reduce() 需要从 functools 模块导入
# 其中 func 必须有两个参数
# 每次 func 计算的结果继续和序列的下一个元素做累积计算
"""
```

```python
from functools import reduce

# 计算列表中所有元素的乘积
numbers = [1, 2, 3, 4]
product = reduce(lambda x, y: x * y, numbers)
print(product)  # 输出: 24
```

### 自定义高阶函数

#### 函数作为参数

```python
def apply_function(func, value):
    return func(value)

# 使用自定义高阶函数
result = apply_function(lambda x: x * 2, 5)
print(result)  # 输出: 10
```

#### 函数作为结果

```python
def create_multiplier(factor):
    def multiplier(x):
        return x * factor
    return multiplier

# 使用自定义高阶函数
double = create_multiplier(2)
print(double(5))  # 输出: 10
```

### 高阶函数应用

#### 函数组合

将多个函数组合成一个新的函数

```python
def compose(f, g):
    return lambda x: f(g(x))

# 组合函数
add_one = lambda x: x + 1
square = lambda x: x**2
composed_function = compose(add_one, square)

print(composed_function(3))  # 输出: 10 (先平方，再加 1)
```

#### 装饰器

装饰器是一种高阶函数，用于扩展或修改其他函数的行为。

```python
def logger(func):
    def wrapper(*args, **kwargs):
        print(f"Calling function: {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@logger
def add(a, b):
    return a + b

print(add(2, 3))  # 输出: Calling function: add \n 5
```

#### 回调函数

将函数作为参数传递给其他函数，用于异步操作或事件处理。

```python
def process_data(data, callback):
    result = data * 2
    callback(result)

def print_result(result):
    print(f"Result: {result}")

process_data(10, print_result)  # 输出: Result: 20
```

## 装饰器

- 装饰器是一个 **接受函数作为参数** 并 **返回一个新函数** 的高阶函数，通常使用 `@` 符号来应用到目标函数上，其核心思想是 **在不修改原函数代码的情况下，为其添加额外的功能** 
- 装饰器广泛应用于日志记录、权限验证、性能测试等场景

### 基本装饰器

```python
def deco(func):
    def wrapper():
        print("函数开始执行".center(20, "-"))
        print(func())
        print("函数开始执行".center(20, "-"))

    return wrapper

@deco
def func():
    return "执行函数 func"

func()
```

```
-------函数开始执行-------
执行函数 func
-------函数开始执行-------
```

### 装饰器-日志记录

```python
import time
from datetime import datetime

def deco(func):
    def wrapper():
        print("调用时间：" + datetime.now().strftime("%Y-%m-%d %H:%M:%S").center(30,"-"))
        print(func())
        print("".center(40,"-"))
    return wrapper

@deco
def func():
    return "调用函数 func"

func()
time.sleep(2)
func()
```

```
调用时间：-----2025-03-24 11:43:34------
调用函数 func
----------------------------------------
调用时间：-----2025-03-24 11:43:36------
调用函数 func
----------------------------------------
```

### 装饰器-权限验证

检查用户是否有权限调用函数

```python
import time

def permission_user(func):
    def wrapper(*args, **kwargs):
        if kwargs.get('user') == 'Admin':
            print(func())
        else:
            print(kwargs.get('user') + ": Need admin permission!")
    return wrapper

@permission_user
def delete_func():
    return "Delete Success!"

delete_func(user='Admin')
time.sleep(0.5)
delete_func(user='Guest')
```

```
Delete Success!
Guest: Need admin permission!
```

### 装饰器-性能测试

测量函数的执行时间

```python
import time, random

def check_Time(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        func()
        end_time = time.time()
        print(f"Function {func.__name__} took {end_time - start_time:.4f} seconds")
    return wrapper

@check_Time
def get_random():
    time.sleep(random.random() )
    return random.random()

get_random()
```

```
Function get_random took 0.6436 seconds
```

### 装饰器-带参拓展

装饰器本身也可以接受参数，这时需要再嵌套一层函数

```python
def repeat(n):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for i in range(n):
                print(func(*args, **kwargs))
        return wrapper
    return decorator

@repeat(3)
def func(*args, **kwargs):
    return args[0], kwargs.get("name")

func(1, name='Alice')
func(2, name='James')

```

```
(1, 'Alice')
(1, 'Alice')
(1, 'Alice')
(2, 'James')
(2, 'James')
(2, 'James')
```

### 多个装饰器的使用

一个函数可以同时应用多个装饰器，装饰器的执行顺序是：

- 目标装饰函数之前-从上往下

- 目标装饰函数之后-从下往上

```python
def deco1(func):
    def wrapper(*args, **kwargs):
        print("111")
        func(*args, **kwargs)
        print("222")

    return wrapper


def deco2(func):
    def wrapper(*args, **kwargs):
        print("333")
        func(*args, **kwargs)
        print("444")

    return wrapper


@deco1
@deco2
def custom_fn(*args, **kwargs):
    print("555")
    return f"{args[0]}, {kwargs.get('name')}"


custom_fn(1, name="John")
```

```
111
333
555
444
222
```

## 拆包

在 Python 中，**拆包（Unpacking）** 是一种将可迭代对象（如列表、元组、字典等）中的元素解包并分配给多个变量的操作。

Python 提供了以下几种拆包方式：

1. **序列拆包**
2. **字典拆包**
3. **函数调用时的拆包**

| 拆包类型     | 语法                        | 适用场景                     |
| ------------ | --------------------------- | ---------------------------- |
| 序列拆包     | `a, b, c = iterable`        | 列表、元组等可迭代对象       |
| 字典拆包     | `key, value = dict.items()` | 字典的键值对                 |
| 函数调用拆包 | `*args`, `**kwargs`         | 函数调用时的位置和关键字参数 |

## 交换变量值

需求：有变量 `a = 10` 和 `b = 20`，交换两个变量的值。

- 方法一

借助第三变量存储数据。

``` python
# 1. 定义中间变量
c = 0

# 2. 将a的数据存储到c
c = a

# 3. 将b的数据20赋值到a，此时a = 20
a = b

# 4. 将之前c的数据10赋值到b，此时b = 10
b = c

print(a)  # 20
print(b)  # 10
```

- 方法二

``` python
a, b = 1, 2
a, b = b, a
print(a)  # 2
print(b)  # 1
```

## 引用

- 在 Python 中，变量实际上是对对象的引用，而不是直接存储对象的值
- 当把一个变量赋值给另一个变量时，实际上是将引用复制给了新的变量，而不是创建新的对象
- python 的数据传递都是引用，只不过分成了可变和不可变两种对象

```python
a = [1, 2, 3]  # a 是对列表 [1, 2, 3] 的引用
b = a          # b 也引用了同一个列表
b.append(4)    # 修改 b 也会影响 a
print(a)       # 输出: [1, 2, 3, 4]
```

### id()

- `id()` 函数用于获取对象的内存地址（唯一标识符）
- 每个对象在内存中都有一个唯一的地址，`id()` 返回的是一个整数，表示该地址

```python
a = [1, 2, 3]
b = a
b.extend([4, 5, 6])
print(a)
print(b)

# 说明内存地址相同，是引用的同一个对象
print(id(a)) # 2188068131200
print(id(b)) # 2188068131200
```

#### 不可变对象

- 不可变对象（Immutable Objects）的值不能被修改
- 常见的不可变对象：整数、浮点数、字符串、元组等
- 对不可变对象的修改会创建一个新对象

``` python
a = 10
b = a
print(id(a))  # 输出: 140123456789 (示例地址)
print(id(b))  # 输出: 140123456789 (与 a 相同)

b = b + 1     # 修改 b 会创建一个新对象
print(id(b))  # 输出: 140123456790 (新地址)
print(a)      # 输出: 10 (a 不变)
```

#### 可变对象

- 可变对象（Mutable Objects）的值可以被修改
- 常见的可变对象：列表、字典、集合等
- 对可变对象的修改不会创建新对象

```python
a = [1, 2, 3]
b = a
print(id(a))  # 输出: 140123456789 (示例地址)
print(id(b))  # 输出: 140123456789 (与 a 相同)

b.append(4)   # 修改 b 会影响 a
print(id(b))  # 输出: 140123456789 (地址不变)
print(a)      # 输出: [1, 2, 3, 4] (a 也被修改)
```

### 引用与函数参数

在 Python 中，函数参数是通过 **传递引用** 的方式传递的。这意味着：

- 如果传递的是不可变对象，函数内的修改不会影响原始对象
- 如果传递的是可变对象，函数内的修改会影响原始对象

``` python
def modify_value(x):
    x = x + 1
    print("Inside function:", x)

a = 10
modify_value(a)
print("Outside function:", a)
```

```
Inside function: 11
Outside function: 10
```

```python
def modify_list(lst):
    lst.append(4)
    print("Inside function:", lst)

my_list = [1, 2, 3]
modify_list(my_list)
print("Outside function:", my_list)
```

```
Inside function: [1, 2, 3, 4]
Outside function: [1, 2, 3, 4]
```

### is 和 ==

- **`is`**：比较两个对象的 **内存地址**（即 `id()` 的值），判断它们是否是同一个对象
- **`==`**：比较两个对象的 **值** 是否相等

```python
a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)  # 输出: True (值相等)
print(a is b)  # 输出: False (不是同一个对象)
print(a is c)  # 输出: True (是同一个对象)
```

## 文件操作

### 打开/创建 open

``` python
# 语法
"""
name：是要打开的目标文件名的字符串(可以包含文件所在的具体路径)
mode：设置打开文件的模式(访问模式)：只读、写入、追加等
"""
open(name, mode)
```

```python
f = open('test.txt', 'w')
# 注意：此时的`f`是`open`函数的文件对象
```

| 文件打开模式 | 描述                                                         |
| :----------: | ------------------------------------------------------------ |
|      r       | 以只读方式打开文件。文件的指针将会放在文件的开头。这是默认模式。 |
|      rb      | 以二进制格式打开一个文件用于只读。文件指针将会放在文件的开头。这是默认模式。 |
|      r+      | 打开一个文件用于读写。文件指针将会放在文件的开头。           |
|     rb+      | 以二进制格式打开一个文件用于读写。文件指针将会放在文件的开头。 |
|      w       | 打开一个文件只用于写入。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。 |
|      wb      | 以二进制格式打开一个文件只用于写入。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。 |
|      w+      | 打开一个文件用于读写。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。 |
|     wb+      | 以二进制格式打开一个文件用于读写。如果该文件已存在则打开文件，并从开头开始编辑，即原有内容会被删除。如果该文件不存在，创建新文件。 |
|      a       | 打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入。 |
|      ab      | 以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。也就是说，新的内容将会被写入到已有内容之后。如果该文件不存在，创建新文件进行写入。 |
|      a+      | 打开一个文件用于读写。如果该文件已存在，文件指针将会放在文件的结尾。文件打开时会是追加模式。如果该文件不存在，创建新文件用于读写。 |
|     ab+      | 以二进制格式打开一个文件用于追加。如果该文件已存在，文件指针将会放在文件的结尾。如果该文件不存在，创建新文件用于读写。 |

### 关闭 close

- 文件对象的 **`close()` 方法** 用于关闭已打开的文件，释放系统资源

- **释放资源**：关闭文件后，操作系统会释放该文件的句柄
- **确保数据写入**：在写入模式下，`close()` 会强制将缓冲区数据写入磁盘，否则数据可能停留在内存缓冲区，未写入磁盘，导致文件内容不全
- **解除文件锁定**：某些系统（如 Windows）会锁定打开的文件，关闭后其他程序才能访问

```python
# 手动关闭
文件对象.close()

# 多次调用不会报错
f = open("example.txt", "r")
f.close()
f.close()  # 不会报错，但无意义

# 打开文件
f = open("example.txt", "r")  
# 读取内容
content = f.read()           
# 关闭文件，如果 `f.read()` 抛出异常，`close()` 可能不会执行，导致资源泄漏
f.close()                    
print(content)
```

#### 使用 `try-finally` 确保关闭

```python
f = None
try:
    f = open("example.txt", "r")
    content = f.read()
finally:
    if f:  # 检查文件对象是否存在
        f.close()  # 确保无论如何都会执行关闭
```
#### 使用 `with` 语句自动关闭

- Python 的 `with` 语句会在代码块结束后自动调用 `close()`，无需手动处理
- `with` 语句通过上下文管理器协议（`__enter__` 和 `__exit__`）确保文件一定会关闭，即使发生异常或中途 `return`，因此 `with` 语句比手动 `close()` 更安全

```python
with open("example.txt", "r") as f:  # 自动管理文件
    content = f.read()
# 此处文件已自动关闭
print(content)
```
#### 检查文件是否已关闭

文件对象提供 `closed` 属性用于检查状态：
```python
f = open("example.txt", "r")
print(f.closed)  # 输出: False
f.close()
print(f.closed)  # 输出: True
```

### 写文件

####  `write()` 方法

- **功能**：将单个字符串写入文件。
- **参数**：接受一个字符串作为参数。
- **返回值**：返回写入的字符数（可选，通常可以忽略）。
- **特点**：不会自动添加换行符，如果需要换行，必须在字符串中显式添加 `\n`。

```python
with open("example.txt", "w") as f:
    f.write("Hello, World!\n")  # 写入一行，并手动换行
    f.write("This is a second line.")  # 继续写入
```
```python
# 文件内容
Hello, World!
This is a second line.
```

#### `writelines()` 方法

- **功能**：将一个字符串列表（或任何可迭代的字符串序列）写入文件。
- **参数**：接受一个可迭代对象（如 `list`、`tuple`），其中每个元素都是字符串。
- **返回值**：无（`None`）。
- **特点**：
  - 不会自动在元素之间添加换行符或其他分隔符，如果需要换行，必须在每个字符串中包含 `\n`。
  - 比循环调用 `write()` 更高效，因为它是一次性写入。

```python
lines = ["First line\n", "Second line\n", "Third line"]
with open("example.txt", "w") as f:
    f.writelines(lines)  # 写入多行（每个元素需自带换行符）
```
```python
# 文件内容
First line
Second line
Third line
```

#### 写入模式

- `w` 和 `a` 模式：如果文件不存在则创建该文件；如果文件存在，`w` 模式先清空再写入，`a` 模式直接末尾追加
- `r` 模式：如果文件不存在则报错

``` python
文件对象.write('内容')
```

``` python
# 1. 打开文件
f = open('test.txt', 'w')

# 2.文件写入
f.write('hello world')

# 3. 关闭文件
f.close()
```

### 读文件

#### `read()` 方法

- read(num)：num 表示要从文件中读取的数据的长度（单位是字节）
- 如果没有传入 num，那么就表示读取文件中所有的数据

``` python
文件对象.read(num)
```

#### `readlines()` 方法

- readlines()：按照行的方式把整个文件中的内容进行一次性读取
- 返回的是一个列表，其中每一行的数据为一个元素

``` python
f = open('test.txt')
content = f.readlines()

# ['hello world\n', 'abcdefg\n', 'aaa\n', 'bbb\n', 'ccc']
print(content)

# 关闭文件
f.close()
```

#### `readline()` 方法

- readline()：一次读取一行内容

``` python
f = open('test.txt')

content = f.readline()
print(f'第一行：{content}')

content = f.readline()
print(f'第二行：{content}')

# 关闭文件
f.close()
```

### 文件对象 seek()

- 移动文件的读取/写入指针到指定位置
- 文件指针表示当前文件操作的位置，`seek()` 可以灵活地控制指针的位置，从而实现随机访问文件内容

``` python
"""
# offset 偏移量，即移动的字节数（可正可负）
# whence 起始位置（可选，默认为 0）
	取值范围：0（文件头）、1（当前位置）、2（文件末尾）
"""
文件对象.seek(offset, whence)

# 返回值：新的指针位置（从文件头开始的字节数）
```

| `whence` | 基准位置         | 说明                                      |
| -------- | ---------------- | ----------------------------------------- |
| `0`      | 文件开头（默认） | `offset` 必须 ≥ 0，指针从文件头开始移动。 |
| `1`      | 当前位置         | `offset` 可正可负，指针从当前位置移动。   |
| `2`      | 文件末尾         | `offset` 通常 ≤ 0，指针从文件末尾移动。   |

#### 从文件头开始移动（`whence=0`）

- **适用场景**：跳转到文件的某个固定位置读取数据

```python
with open("example.txt", "r") as f:
    f.seek(5)  # 移动指针到第 5 个字节（从文件头开始）
    print(f.read())  # 从第 5 字节开始读取
```
#### 从当前位置移动指针（`whence=1`）

- **适用场景**：读取文件时跳过部分数据

```python
with open("example.txt", "rb") as f:
    f.read(3)  # 先读取 3 个字节
    f.seek(2, 1)  # 从当前位置再移动 2 个字节
    print(f.read())  # 读取剩余内容
```
#### 从文件末尾移动指针（`whence=2`）

**适用场景**：读取文件的最后几行（如日志文件的尾部）

```python
with open("example.txt", "rb") as f:
    f.seek(-5, 2)  # 移动指针到倒数第 5 个字节
    print(f.read())  # 读取最后 5 个字节
```
```python
with open("file.txt", "w") as f:
    f.write("1234567890")

# 不使用 seek 指针，从文件头开始
with open("file.txt", "r") as file:
    print(file.readline())

# 使用 seek，往后移动 3 个字节，再开始读取
with open("file.txt", "r") as file:
    file.seek(3)
    print(file.readline())

# 先读取 3 个字节，然后从当前位置往后再移动 2 个字节
with open("file.txt", "rb") as file:
    file.read(3)
    file.seek(2, 1)
    print(file.readline())

# 使用 seek，从末尾开始往前偏移 2 个字节，然后读取该指针指向位置及后面的字节
with open("file.txt", "rb") as file:
    file.seek(-2, 2)
    print(file.readline())
```

```
1234567890
4567890
b'67890'
b'90'
```

#### 注意事项

- **文本模式（`"r"`/`"w"`）**：`seek()` 可能受编码影响（如 UTF-8 变长字符）

- **二进制模式（`"rb"`/`"wb"`）**：`seek()` 精准按字节移动（推荐）。

- **`seek()` 不会改变文件内容**，仅移动指针位置。

- **边界检查**：

  - 如果 `offset` 超出文件范围，`seek()` 可能抛出 `OSError`

  - 使用 `f.tell()` 可以获取当前指针位置

### OS 模块

在 Python 中，文件和文件夹的操作要借助 os 模块里面的相关功能

``` python
# 导入os模块
import os

# 使用`os`模块相关功能
os.函数功能()
```

``` python
import os

# 重命名文件
os.rename(目标文件名, 新文件名)

# 删除文件
os.remove(目标文件名)

# 创建目录
os.mkdir(文件夹名称)

# 删除目录
os.rmdir(文件夹名称)

# 修改默认目录
os.chdir(目录)

# 获取当前目录
os.getcwd()

# 获取当前目录列表
os.listdir(".")
#获取上级目录列表
os.listdir("..")
```

## 类

**类** 是对一系列具有相同特征和行为的事物的统称，是一个抽象的概念，不是真实存在的事物

- 特征即是属性
- 行为即是方法

在 Python 中，包含 **经典类（Classic Class）** 和 **新式类（New-Style Class）** 两种面向对象编程，Python 2.x 同时支持这两种类，而 Python 3.x 只支持新式类

### 经典类 vs 新式类

#### 定义方式

| 类型       | Python 2.x 定义方式      | Python 3.x 定义方式                         |
| ---------- | ------------------------ | ------------------------------------------- |
| **经典类** | `class MyClass:`         | **不存在**（Python 3 只有新式类）           |
| **新式类** | `class MyClass(object):` | `class MyClass:` 或 `class MyClass(object)` |

- **Python 2.x**：
  - 经典类：直接 `class MyClass:`
  - 新式类：显式继承 `object`（`class MyClass(object):`）
- **Python 3.x**：
  - 所有类都是新式类，即使不写 `(object)` 

#### 核心区别

|          特性           | 经典类                     | 新式类                  |
| :---------------------: | -------------------------- | ----------------------- |
|    **继承 `object`**    | ❌ 不继承                   | ✅ 默认继承 `object`     |
| **方法解析顺序（MRO）** | 深度优先（DFS）            | C3 线性化算法（更合理） |
|   **`super()` 支持**    | ❌ 不支持                   | ✅ 支持                  |
|     **描述符协议**      | ❌ 不支持（如 `@property`） | ✅ 支持                  |
|     **`__slots__`**     | ❌ 不支持                   | ✅ 支持                  |

#### 方法解析顺序（MRO）的区别

- 经典类：深度优先（DFS）

```python
# Python 2.x 经典类（DFS）
class A:
    def show(self):
        print("A")

class B(A):
    pass

class C(A):
    def show(self):
        print("C")

class D(B, C):
    pass

d = D()
d.show()  # 输出: "A"（经典类 DFS 顺序：D -> B -> A，忽略 C）
```
- 新式类：C3 线性化算法

```python
# Python 2.x/3.x 新式类（C3 算法）
class A(object):
    def show(self):
        print("A")

class B(A):
    pass

class C(A):
    def show(self):
        print("C")

class D(B, C):
    pass

d = D()
d.show()  # 输出: "C"（新式类 MRO: D -> B -> C -> A）
```
- **MRO 顺序**：`D.__mro__` 会显示 `(<class '__main__.D'>, <class '__main__.B'>, <class '__main__.C'>, <class '__main__.A'>, <class 'object'>)`。
- **更合理**：优先查找 `B` 和 `C`，而不是直接跳到 `A`。

#### `super()` 的区别

- 经典类：不支持 `super()` 
- 必须硬编码父类名（如 `A.__init__`），如果继承关系变化，代码会出错

```python
# Python 2.x 经典类（错误示例）
class A:
    def __init__(self):
        print("A")

class B(A):
    def __init__(self):
        A.__init__(self)  # 必须显式调用父类
        print("B")

b = B()  # 输出: "A" -> "B"
```
- 新式类：支持 `super()` 
- `super()` 自动处理 MRO，避免硬编码父类名

```python
# Python 2.x/3.x 新式类
class A(object):
    def __init__(self):
        print("A")

class B(A):
    def __init__(self):
        super(B, self).__init__()  # Python 2.x 写法
        # super().__init__()       # Python 3.x 简化写法
        print("B")

b = B()  # 输出: "A" -> "B"
```
### 类属性和实例属性

#### 类属性

- 类属性就是 **类** 所拥有的属性，它被 **该类的所有实例对象 所共有** 
- 类属性可以使用 **类** 或 **实例对象** 访问
- **实例属性** 要求 **每个对象** 为其 **单独开辟一份内存空间** 来记录数据，而 **类属性** 为全类所共有 ，**仅占用一份内存**，**更加节省内存空间** 
- 类属性只能通过类对象修改，不能通过实例对象修改，如果这样操作，实则是创建了一个实例属性

``` python
class Dog(object):
    tooth = 10


wangcai = Dog()
xiaohei = Dog()

print(Dog.tooth)  # 10
print(wangcai.tooth)  # 10
print(xiaohei.tooth)  # 10
```

``` python
class Dog(object):
    tooth = 10


wangcai = Dog()
xiaohei = Dog()

# 修改类属性
Dog.tooth = 12
print(Dog.tooth)  # 12
print(wangcai.tooth)  # 12
print(xiaohei.tooth)  # 12

# 不能通过对象修改属性，如果这样操作，实则是创建了一个实例属性
wangcai.tooth = 20
print(Dog.tooth)  # 12
print(wangcai.tooth)  # 20
print(xiaohei.tooth)  # 12
```

#### 实例属性

``` python
class Dog(object):
    def __init__(self):
        self.age = 5

    def info_print(self):
        print(self.age)


wangcai = Dog()
print(wangcai.age)  # 5
# print(Dog.age)  # 报错：实例属性不能通过类访问
wangcai.info_print()  # 5
```

### 类方法和静态方法

#### 类方法

- 需要用装饰器 `@classmethod` 来标识其为类方法，对于类方法，**第一个参数必须是类对象**，一般以 `cls` 作为第一个参数。
- 当方法中 **需要使用类对象** (如访问私有类属性等)时，定义类方法，一般和类属性配合使用

``` python
class Customer():
    param = 'param 1'

    @classmethod
    def info_print(cls,*args):
        print('static:',args[0], cls.param)


customer = Customer()
customer.info_print(100)
```

```
static: 100 param 1
```

#### 静态方法

- 需要通过装饰器 `@staticmethod` 来进行修饰，**静态方法既不需要传递类对象也不需要传递实例对象（形参没有 self/cls）** 
- **实例对象** 和 **类** 都能访问
- 当方法中 **既不需要使用实例对象**(如实例对象，实例属性)，**也不需要使用类对象** (如类属性、类方法、创建实例等)时，定义静态方法

``` python
class Customer():
    @staticmethod
    def version_class():
        print("class version is 1.0.0")

Customer.version_class() # 使用类访问
cust = Customer()
cust.version_class() # 使用实例对象访问
```

## 对象

- 对象是类创建出来的真实存在的实体，例如：洗衣机

- 开发中，先有类，再有对象，是类的实例化结果，包含数据（属性）和行为（方法）
- Python 中一切皆对象（包括数字、字符串、函数等）

### 对象的基本特性

- Id：每个对象在内存中有唯一标识（可通过 `id(obj)` 获取）
- Type：对象的类型决定了它的操作（可通过 `type(obj)` 获取）
- Value 值：对象存储的具体数据

```python
a = [1, 2, 3]
print(id(a))  # 输出: 内存地址（如 140123456789）
```

```python
print(type(5))      # 输出: <class 'int'>
print(type("abc"))  # 输出: <class 'str'>
```

```python
s = "Hello"
print(s)  # 输出: "Hello"（对象的值）
```

#### 对象的创建

```python
# 字面量创建，常见于内置类型（如整数、列表、字典等）
num = 42               # int 对象
lst = [1, 2, 3]        # list 对象
dct = {"key": "value"} # dict 对象
```

```python
# 自定义类通过 __init__ 方法初始化对象
class Person:
    def __init__(self, name):
        self.name = name  # 实例属性

p = Person("Alice")      # 创建 Person 对象
print(p.name)            # 输出: "Alice"
```

#### 对象的操作

- 访问属性：使用点号 `.` 访问对象的属性和方法

```python
class Dog:
    def __init__(self, name):
        self.name = name
    def bark(self):
        print("Woof!")

dog = Dog("Buddy")
print(dog.name)  # 输出: "Buddy"
dog.bark()       # 输出: "Woof!"
```

- 修改属性：直接赋值修改属性

```python
dog.name = "Max"
print(dog.name)  # 输出: "Max"
```

- 动态添加/删除属性：Python 允许运行时动态修改对象

```python
dog.age = 3      # 动态添加属性
del dog.age      # 动态删除属性
```

### 可变对象 vs 不可变对象

| 类型           | 示例                             | 是否可变 | 说明                         |
| -------------- | -------------------------------- | :------: | ---------------------------- |
| **不可变对象** | `int`, `float`,  `str`,  `tuple` |    ❌     | 创建后不能修改（新对象替代） |
| **可变对象**   | `list`,  `dict`,  `set`          |    ✅     | 可直接修改内部数据。         |

```python
# 不可变对象（修改会创建新对象）
a = "Hello"
print(id(a))  # 输出: 140123456789
a += " World"
print(id(a))  # 输出: 新的内存地址（原对象未变）

# 可变对象（直接修改）
b = [1, 2, 3]
print(id(b))  # 输出: 140123456790
b.append(4)
print(id(b))  # 输出: 内存地址不变
```

### 对象的生命周期

- 创建：通过类实例化或直接赋值创建
- 引用计数：Python 通过引用计数管理对象内存
- 当引用计数归零时，对象被自动回收，循环引用由垃圾回收器（GC）处理

```python
import sys

class Person:
    def __init__(self, name):
        self.name = name

# 1 创建
person = Person("Alice")
# 2 引用计数
print(sys.getrefcount(person)) # 通常比实际的多1
print(person.name)
# 3 垃圾回收...
```

## 双下方法

在 Python 中，**魔术方法（Magic Methods）**（也称为 **特殊方法** 或 **双下方法**，即 `__xxx__` 形式的方法）是用于定义**类**行为的特殊方法

### `__dict__` 
#### 实例

包含动态添加到实例的属性或通过 `__init__` 初始化的变量

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

p = Person("张三", 25)
print(p.__dict__)  # 输出: {'name': '张三', 'age': 25}
# 例如：这里 `p.__dict__` 存储了实例 `p` 的所有属性（`name` 和 `age`）
```
#### 类

包括类变量、方法、`__doc__` 等

```python
class Person:
    species = "人类"  # 类属性
    
    def __init__(self, name):
        self.name = name

print(Person.__dict__)
```
```python
# 可以看到，`Person.__dict__` 包含了类变量 `species`、方法 `__init__` 等元数据
{
    '__module__': '__main__',
    'species': '人类',
    '__init__': <function Person.__init__ at 0x7f8b1c2b5d30>,
    '__dict__': <attribute '__dict__' of 'Person' objects>,
    '__weakref__': <attribute '__weakref__' of 'Person' objects>,
    '__doc__': None
}
```
#### 应用一：动态修改属性

由于 `__dict__` 是一个字典，我们可以直接修改它来 **动态添加/删除属性**。 

```python
p = Person("李四", 30)
p.__dict__["gender"] = "男"  # 等同于 p.gender = "男"
print(p.gender)  # 输出: 男

del p.__dict__["age"]  # 删除属性 age
print(p.__dict__)  # 输出: {'name': '李四', 'gender': '男'}
```

#### 应用二：序列化为 json

```python
import json

def to_dict(obj):
    return obj.__dict__

data = json.dumps(to_dict(p), ensure_ascii=False)
print(data)  # 输出: {"name": "李四", "gender": "男"}
```

#### 实现：初始化与构造

| 方法                  | 作用                                       | 触发场景               |
| --------------------- | ------------------------------------------ | ---------------------- |
| `__new__(cls, ...)`   | **创建对象实例**（通常用于不可变类或单例） | `obj = MyClass()`      |
| `__init__(self, ...)` | **初始化对象属性**                         | `obj = MyClass(args)`  |
| `__del__(self)`       | **对象销毁时调用**（不推荐依赖）           | `del obj` 或垃圾回收时 |

```python
class Person:
    def __init__(self, name):
        self.name = name
        print(self.name, "is created")
    def __del__(self):
        print(self.name, "is deleted")

person = Person("Alice")
print(person.name)

del person
```

```
Alice is created
Alice
Alice is deleted
```

#### 实现：字符串表示

| 方法             | 作用                                   | 触发场景                                                     |
| ---------------- | -------------------------------------- | ------------------------------------------------------------ |
| `__str__(self)`  | 定义 `print(obj)` 或 `str(obj)` 的输出 | `print(obj)`                                                 |
| `__repr__(self)` | 定义 `repr(obj)` 或交互式环境的输出    | 返回一个 **明确且无歧义** 的字符串，表示对象的状态，`repr(obj)` 或直接输入 `obj` |

```python
class Person:
    def __init__(self, name):
        self.name = name
    def __str__(self):
        return f"This is a person name {self.name}"
    def __repr__(self):
        return f"This is a real person name {self.name}"

person = Person("Alice")
print(person)
print(repr(person))
```

```
This is a person name Alice
This is a real person name Alice
```

#### 实现：算术运算

| 方法                       | 对应操作符 | 说明   |
| -------------------------- | ---------- | ------ |
| `__add__(self, other)`     | `+`        | 加法   |
| `__sub__(self, other)`     | `-`        | 减法   |
| `__mul__(self, other)`     | `*`        | 乘法   |
| `__truediv__(self, other)` | `/`        | 真除法 |

```python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

v1 = Vector(1, 2)
v2 = Vector(3, 4)
v3 = v1 + v2  # 调用 v1.__add__(v2)
print(v3.x, v3.y)  # 输出: 4, 6
```

#### 实现：比较操作

| 方法                  | 对应操作符 | 说明 |
| --------------------- | ---------- | ---- |
| `__eq__(self, other)` | `==`       | 等于 |
| `__lt__(self, other)` | `<`        | 小于 |
| `__gt__(self, other)` | `>`        | 大于 |

```python
class Book:
    def __init__(self, title, pages):
        self.title = title
        self.pages = pages
    def __eq__(self, other):
        return self.title == other.title and self.pages == other.pages

b1 = Book("Python", 300)
b2 = Book("Python", 300)
print(b1 == b2)  # 输出: True （调用 __eq__）
```

#### 实现：容器类操作

| 方法                            | 对应操作           | 说明         |
| ------------------------------- | ------------------ | ------------ |
| `__len__(self)`                 | `len(obj)`         | 返回容器长度 |
| `__getitem__(self, key)`        | `obj[key]`         | 获取元素     |
| `__setitem__(self, key, value)` | `obj[key] = value` | 设置元素     |

```python
class MyList:
    def __init__(self, items):
        self.items = items
    def __len__(self):
        return len(self.items)
    def __getitem__(self, index):
        return self.items[index]

lst = MyList([1, 2, 3])
print(len(lst))    # 输出: 3 （调用 __len__）
print(lst[1])     # 输出: 2 （调用 __getitem__）
```

#### 实现：上下文管理（`with` 语句）

| 方法                                        | 作用                                 |
| ------------------------------------------- | ------------------------------------ |
| `__enter__(self)`                           | 进入 `with` 块时调用，返回资源对象   |
| `__exit__(self, exc_type, exc_val, exc_tb)` | 退出 `with` 块时调用，处理异常和清理 |

```python
class FileManager:
    def __init__(self, file_path):
        print(1)
        self.path = file_path

    def __enter__(self):
        print(2)
        self.file = open(self.path, 'w+')
        return  self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        print(3)
        self.file.close()


with FileManager('file.txt') as file:
    file.write("hello")

# 文件已自动关闭
```

```
1
2
3
```

#### 实现：可调用对象（`__call__`）

| 方法                  | 作用                     |
| --------------------- | ------------------------ |
| `__call__(self, ...)` | 使对象可以像函数一样调用 |

```python
class Adder:
    def __init__(self, n):
        self.n = n
    def __call__(self, x):
        return self.n + x

add5 = Adder(5)
print(add5(3))  # 输出: 8 （调用 __call__）
```

### self

- 在 Python 中，**`self`** 是一个约定俗成的参数名，用于表示 **类的实例对象本身**
- 通常是面向对象编程（OOP）中访问实例属性和方法的关键机制

#### `self` 的核心作用

- **指向当前实例**：在类的方法中，`self` 代表调用该方法的对象实例。
- **访问实例属性和方法**：通过 `self.attribute` 或 `self.method()` 访问实例的数据和行为。
- **区分局部变量和实例变量**：明确标识属于对象的成员。

#### `self` 的基本用法

- 定义类方法时必须显式声明，Python 强制要求实例方法的第一个参数是 `self`（名称可改但不推荐）
- **`__init__` 中的 `self`**：初始化实例属性
- **普通方法中的 `self`**：访问实例属性或调用其他方法

```python
class Dog:
    def __init__(self, name):
        self.name = name  # 实例属性
    
    def bark(self):      # 方法必须包含 self
        print(f"{self.name} says Woof!")

my_dog = Dog("Buddy")
my_dog.bark()  # 输出: Buddy says Woof!
```
- 调用方法时自动传递 `self` 
- Python 自动将实例作为第一个参数（`self`）传递给方法，无需手动传入

```python
my_dog.bark()  
# 等价于 Dog.bark(my_dog)
```

## 对象继承

### 继承语法

```python
class ParentClass:
    # 父类定义
    pass

class ChildClass(ParentClass):
    # 子类定义
    pass
```

### 继承的类型

- 单继承：子类只继承一个父类

```python
class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        print(f"{self.name} makes a sound")

class Dog(Animal):
    def speak(self):
        print(f"{self.name} barks")

dog = Dog("Buddy")
dog.speak()  # 输出: Buddy barks
```

- 多继承：继承多个父类

```python
class Father:
    def father_method(self):
        print("Father's method")

class Mother:
    def mother_method(self):
        print("Mother's method")

class Child(Father, Mother):
    pass

child = Child()
child.father_method()  # 输出: Father's method
child.mother_method()  # 输出: Mother's method
```

### 重写（Override）

子类重写父类的方法

```python
class Animal:
    def speak(self):
        print("Animal speaks")

class Cat(Animal):
    def speak(self):
        print("Meow")

cat = Cat()
cat.speak()  # 输出: Meow
```

### super() 函数

`super()` 用于调用父类的方法

```python
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)  # 调用父类的__init__
        self.breed = breed

dog = Dog("Buddy", "Golden Retriever")
print(dog.name)   # 输出: Buddy
print(dog.breed)  # 输出: Golden Retriever
```

### 方法解析顺序（MRO）

Python 使用 C3 线性化算法确定方法调用顺序

```python
class A:
    def method(self):
        print("A method")

class B(A):
    def method(self):
        print("B method")

class C(A):
    def method(self):
        print("C method")

class D(B, C):
    pass

d = D()
d.method()  # 输出: B method
print(D.__mro__)  # 查看方法解析顺序
```

### 抽象基类（ABC）

使用 `abc` 模块定义抽象基类

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height

rect = Rectangle(5, 3)
print(rect.area())  # 输出: 15
```

## 对象多态 Polymorphism

多态：同一操作，不同对象，不同结果

实现：鸭子类型、方法重写、运算符重载

### 鸭子类型（Duck Typing）

"如果它走起来像鸭子，叫起来像鸭子，那么它就是鸭子" - Python 不关心对象的具体类型，只关心对象是否具有所需的方法或属性

```python
class Dog:
    def speak(self):
        return "Woof!"

class Cat:
    def speak(self):
        return "Meow"

def animal_sound(animal):
    print(animal.speak())

dog = Dog()
cat = Cat()

animal_sound(dog)  # 输出: Woof!
animal_sound(cat)  # 输出: Meow
```

### 方法重写（继承多态）

子类可以重写父类的方法，实现不同的行为

```python
class Animal:
    def speak(self):
        raise NotImplementedError("子类必须实现此方法")

class Dog(Animal):
    def speak(self):
        return "Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow"

animals = [Dog(), Cat()]

for animal in animals:
    print(animal.speak())
# 输出:
# Woof!
# Meow
```

## 异常

### 捕获语法

``` python
try:
    可能发生错误的代码
except:
    如果出现异常执行的代码
```

``` python
try:
    f = open('test.txt', 'r')
except:
    f = open('test.txt', 'w')
```

- 捕获单个指定异常：如果尝试执行的代码的异常类型和要捕获的异常类型不一致，则无法捕获异常

``` python
try:
    print(num)
except NameError:
    print('有错误')
```

- 捕获多个指定异常：当捕获多个异常时，可以把要捕获的异常类型的名字，放到 except 后，并使用元组的方式进行书写。

``` python
try:
    print(1/0)

except (NameError, ZeroDivisionError):
    print('有错误')
```

- 捕获异常描述信息

``` python
try:
    print(1/0)
except (NameError, ZeroDivisionError) as e:
    print(e) # division by zero
```

- 捕获所有异常：Exception 是所有程序异常类的父类

``` python
try:
    print(num)
except Exception as result:
    print(result) # name 'num' is not defined
```

### 异常的 else

else 表示的是如果没有异常要执行的代码

``` python
try:
    print(1)
except Exception as result:
    print(result)
else:
    print('我是else，是没有异常的时候执行的代码')
```

### 异常的 finally

finally 表示的是无论是否异常都要执行的代码，例如关闭文件

``` python
try:
    f = open('test.txt', 'r')
except Exception as result:
    f = open('test.txt', 'w')
else:
    print('没有异常，真开心')
finally:
    f.close()
```

### 异常的传递

- 尝试只读方式打开 test.txt 文件，如果文件存在则读取文件内容，文件不存在则提示用户即可
- 读取内容要求：尝试循环读取内容，读取过程中如果检测到用户意外终止程序，则 `except` 捕获异常并提示用户。

``` python
import time

try:
    file = open('text.txt', 'r')
    try:
        while True:
            file_content = file.readline()
            if len(file_content) == 0:
                break
            print(file_content)
            time.sleep(1)
    # except Exception: 这里使用这个不能捕获到，解释在代码后面
    except:
        print('读取中断')
    finally:
        file and file.close()
except (FileNotFoundError, FileExistsError) as e:
    print('文件未找到', e)
```

`except:` 和 `except Exception:` 

| 语法                | 能捕获的异常                         | 不能捕获的异常                                     |
| ------------------- | ------------------------------------ | -------------------------------------------------- |
| `except:`           | **所有异常**（包括系统退出相关异常） | 无                                                 |
| `except Exception:` | 所有继承自 `Exception` 的异常        | `SystemExit`, `KeyboardInterrupt`, `GeneratorExit` |

- `except:` 是一个 **裸 except**，会捕获包括 `SystemExit`、`KeyboardInterrupt` 在内的所有异常。
- `except Exception:` 只能捕获 `Exception` 的子类，而 `SystemExit` 和 `KeyboardInterrupt` 直接继承自 `BaseException`，不是 `Exception` 的子类。

当强制退出控制台时：
- **Ctrl+C** 会触发 `KeyboardInterrupt`（继承自 `BaseException`）。
- **直接关闭终端** 会触发 `SystemExit`（继承自 `BaseException`）。

由于 `except:` 能捕获 `BaseException` 及其所有子类，因此可以捕获这些退出信号：
```python
try:
    while True:
        time.sleep(1)
except:  # 能捕获 KeyboardInterrupt 和 SystemExit
    print("捕获到退出信号")
```

而 `except Exception:` 会 **忽略** 这些退出信号：
```python
try:
    while True:
        time.sleep(1)
except Exception:  # 不会捕获 KeyboardInterrupt/SystemExit
    print("这里不会执行")
```

为什么这样设计：Python 将 `SystemExit` 和 `KeyboardInterrupt` 设计为 `BaseException` 的子类（而非 `Exception`），是为了：

1. **允许正常退出**：`sys.exit()` 触发 `SystemExit`，通常不应被常规异常处理拦截。
2. **区分用户中断**：`KeyboardInterrupt`（Ctrl+C）是用户主动中断，不应与程序逻辑异常混为一谈。

如果 `except Exception:` 能捕获这些信号，可能导致：
- 后台服务无法正常退出。
- 用户按 Ctrl+C 时无法立即终止程序。

最佳实践

| 场景             | 推荐写法                                               | 说明                       |
| ---------------- | ------------------------------------------------------ | -------------------------- |
| 需要捕获所有异常 | `except:`                                              | 谨慎使用，可能掩盖退出信号 |
| 捕获常规逻辑异常 | `except Exception:`                                    | 安全，避免拦截系统退出     |
| 显式处理 Ctrl+C  | 用 `signal.signal()` 或 `try-except KeyboardInterrupt` | 更优雅地处理用户中断       |

推荐方案：显式捕获 `KeyboardInterrupt` 

```python
try:
    while True:
        print("运行中...")
        time.sleep(1)
except KeyboardInterrupt:  # 专门捕获 Ctrl+C
    print("用户主动中断")
except Exception as e:     # 捕获其他异常
    print(f"其他错误: {e}")
```

### 自定义异常

语法：` raise 异常类对象` 

``` python
"""
需求：密码长度不足，则报异常（用户输入密码，如果输入的长度不足3位，则报错，即抛出自定义异常，并捕获该异常）
"""
# 自定义异常类
class ErrorPwd(Exception):
    def __init__(self, msg):
        self.msg = msg

    def __str__(self):
        return f'{self.msg} 不足3位'

pwd = input('请输入密码：')
# 检测
try:
    if len(pwd) < 3:
        raise ErrorPwd(pwd)
except ErrorPwd as e:
    print(e)
else:
    print(f"{pwd} 满足要求")

```

## 模块化

Python 模块(Module)，是一个 Python 文件，以 .py 结尾，包含了 Python 对象定义和 Python 语句

### import 语法

``` python
"""
# 1. 导入模块
- import 模块名1, 模块名2...
- import 模块名 as 别名
- from 模块名 import *
- from 模块名 import 功能名
- from 模块名 import 功能名 as 别名

# 2. 调用功能
模块名.功能名()
功能名() 
"""
import math
print(math.sqrt(9))  # 3.0

from math import sqrt
print(sqrt(9))

from math import *
print(sqrt(9))

# 模块别名
import time as tt
tt.sleep(2)

# 功能别名
from time import sleep as sl
sl(2)
```

### 自定义模块

``` python
# 该 python 文件命名为 module_pt.py 那么该文件就是 module_pt 的 python 模块

# 模块的方法
def caculate_num(a, b):
    print(a + b)

# 模块在本文件中调用，可以当作是一个测试文件
caculate_num(1, 1)
```

```python
# 在其它 python 文件中导入上述自定义的模块
import module_pt

module_pt.caculate_num(3, 3)
```

此时，无论是当前文件，还是其他已经导入了该模块的文件，在运行的时候都会自动执行 `caculate_num` 函数的调用，解决办法如下：

``` python
def caculate_num(a, b):
    print(a + b)

# 在当前文件中调用，__name__ 为 __main__
# 在其它文件调用时候，__name__ 为 模块文件的文件名
# 因此，可以使得在导入模块的文件中，执行模块方法时候，不让模块文件的本地测试文件也一起执行
if __name__ == '__main__':
    caculate_num(1, 1)
```

### `__name__` 属性

在 Python 中，`__name__` 是一个特殊的内置属性，主要作用是：

- 标识当前模块的名称
- 判断模块是被导入还是直接运行
  - 模块被直接运行：`__name__ == '__main__'` 
  - 模块被导入：`__name__ ` 为模块的实际名称，即文件名（不含 `.py` 扩展名），如 `"my_module"` 


```python
# 典型用法
# math_utils.py
def add(a, b):
    return a + b

def test():
    assert add(1, 2) == 3
    print("所有测试通过！")

if __name__ == "__main__":
    test()  # 直接运行时执行测试
"""
- 直接运行：
	python my_module.py → 输出 "所有测试通过！"
- 被导入时：
	import my_module → 不执行 test() 函数
"""
```

#### 动态获取模块名

```python
import sys

current_module = sys.modules[__name__]
print(f"当前模块对象: {current_module}")
```

#### 类中的 `__name__`

```python
class MyClass:
    pass

print(MyClass.__name__)  # 输出: "MyClass"
```

#### 区分 `__name__` 和 `__file__`

```python
# 错误理解
print(__name__)  # 输出模块名或 "__main__"，不是文件路径
print(__file__)  # 这才是文件路径
```

### 模块方法重名

如果使用 `from .. import ..` 或 `from .. import *` 导入多个模块的时候，且模块内有同名功能时，调用到的是后面导入的模块的功能

``` python
# 模块1代码
def my_test(a, b):
    print(a + b)

# 模块2代码
def my_test(a, b):
    print(a - b)
   
# 导入模块和调用功能代码
from my_module1 import my_test
from my_module2 import my_test

# my_test函数是模块2中的函数
my_test(1, 1)
```

### 模块搜索顺序

当导入一个模块，Python 解析器对模块位置的搜索顺序是：

1. 当前目录
2. 如果不在当前目录，Python 则搜索在 shell 变量 PYTHONPATH 下的每个目录
3. 如果都找不到，Python 会察看默认路径。UNIX 下，默认路径一般为 `/usr/local/lib/python/`

模块搜索路径存储在 system 模块的 `sys.path` 变量中，包含了当前目录，PYTHONPATH 和由安装过程决定的默认目录

### `__all__` 变量

如果一个模块文件中有 `__all__` 变量，当使用 `from xxx import *` 导入时，只能导入这个列表中的元素

- my_module1 模块代码

``` python
__all__ = ['testA']

def testA():
    print('testA')

def testB():
    print('testB')
```

- 导入模块的文件代码

``` python
from my_module1 import *
testA()
testB()

# NameError: name 'testB' is not defined
```

包将有联系的模块组织在一起，即放到同一个文件夹下，并且在这个文件夹创建一个名字为 `__init__.py` 文件，那么这个文件夹就称之为包。

### 新建包

pycharm 创建：

- `[New] — [Python Package] — 输入包名 — [OK] — 新建功能模块(有联系的模块)` 
- 新建包后，包内部会自动创建 `__init__.py` 文件，这个文件控制着包的导入行为

![新建 Python 包](./Python.assets/新建 Python 包.png)

### 导入包

``` python
import 包名.模块名
包名.模块名.目标

# demo
import my_package.my_module1
my_package.my_module1.info_print1()
```

``` python
# __init__.py 中添加 __all__ = [] 控制允许导入的模块列表
from 包名 import *
模块名.目标

#demo
from my_package import *
my_module1.info_print1()
```















---









