# chatgpt-engineer-prompts 👩‍💻🧑‍💻

<img width="613" alt="image" src="https://user-images.githubusercontent.com/948896/217122899-5f6fb369-ef97-4753-9bd3-909c66ee4744.png">

[ENGLISH README](README-en.md)

为工程师总结的实用 Prompts

## ChatGPT 使用 Tips：

1. 能够记录上下文，当一次提问没有得到理想答案，你可以继续追问
2. 支持中英文混搭，在一个问题中可以灵活切换中英文表达

## Table of Contents

1. [代码生成](#代码生成)
1. [代码讲解](#代码讲解)
1. [代码优化](#代码优化)
1. [代码转换](#代码转换js-转-typescript)
1. [指定返回格式](#指定返回格式)
1. [正则表达式](#正则表达式)
1. [生成SQL](#生成-sql)
1. [生成页面UI图-Midjourney](#生成网页UI图)
1. [沟通](#沟通)

## 代码生成

```
使用 HTML 和 CSS 实现左中右三栏布局，左右定宽100px，中间撑满剩余空间
```

<img width="709" alt="image" src="https://user-images.githubusercontent.com/948896/217124783-6ccdf75b-3fd6-443b-9316-27ca68f0e581.png">
<img width="601" alt="image" src="https://user-images.githubusercontent.com/948896/217124795-8a7308de-2288-43bf-9340-7bcc710a78a5.png">

```
使用 React 生成一个 登录的 form，包含用户名，密码和确认密码。
```

<img width="724" alt="image" src="https://user-images.githubusercontent.com/948896/216982323-b3793dd9-91ba-47f0-a45c-cba8d54dc09b.png">

## 代码讲解

```
解释一下这段代码：
export const useDeepMemo = <K, V>(memoFn: () => V, key: K): V => {
  const ref = useRef<{ key: K; value: V }>();

  if (!ref.current || !isEqual(key, ref.current.key)) {
    ref.current = { key, value: memoFn() };
  }

  return ref.current.value;
};
```

<img width="722" alt="image" src="https://user-images.githubusercontent.com/948896/216982215-ef9008c1-9102-47c8-94d8-6e39b90786f4.png">

## 代码优化

```
优化以下代码：
function bottom(layout: Layout): number {
  let max = 0;
  let bottomY;
  for (let i = 0, len = layout.length; i < len; i += 1) {
    bottomY = layout[i].y + layout[i].h;
    if (bottomY > max) {
      max = bottomY;
    }
  }
  return max;
}
```

<img width="715" alt="image" src="https://user-images.githubusercontent.com/948896/217125899-73540629-db08-48cb-87f8-cb478e829ce2.png">

支持追问：

```
为什么这么优化？
```

<img width="743" alt="image" src="https://user-images.githubusercontent.com/948896/216982055-a1ced7b5-7613-49ab-80e5-672fb76e0529.png">

## 代码转换：JS 转 TypeScript

```
把这段代码转成 TypeScript：
const useWrapperCallback = (callback, wrapperFunction) => {
  const wrapperRef = useRef({
    currentCall: callback,
    returnCall: wrapperFunction(function (...args) {
      return wrapperRef.current?.currentCall(...args);
    }),
  });

  wrapperRef.current.currentCall = useMemo(() => callback, [callback]);
  return wrapperRef;
}
```

<img width="717" alt="image" src="https://user-images.githubusercontent.com/948896/217125605-358e57ec-ebfb-4a46-94ea-0a71202c2d43.png">

## 指定返回格式

返回 JSON

```
生成3个测试用户的信息，以json对象数组格式，包含 name, phone, email
```

<img width="727" alt="image" src="https://user-images.githubusercontent.com/948896/216981922-9344734d-4f96-4624-8a3e-e44ad4185d52.png">

返回 XML

```
生成2个测试用户的信息，以xml格式返回，包含 name, phone, email
```

<img width="711" alt="image" src="https://user-images.githubusercontent.com/948896/217123706-149b5a13-b79e-4c88-96e9-d3f4d0e13820.png">

## 正则表达式

```
写一个 JS 的正则表达式，检查密码的强度必须是包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间。
```

<img width="667" alt="image" src="https://user-images.githubusercontent.com/948896/220364751-862b502c-744b-46fb-84cd-07ead6f656ce.png">

也可以解释正则表达式
```
这个正则表达式是什么含义？
^[A-Z]:\\{1,2}[^/:\*\?<>\|]+\.(jpg|gif|png|bmp)$
```

<img width="661" alt="image" src="https://user-images.githubusercontent.com/948896/220365104-a1f9f5fd-e5e7-4b32-a90d-812c13395079.png">


## 生成 SQL
```
有一个工资表 emp_salary，包含员工号 emp_id, 部门名 dep_name，工资 salary，查询每个员工的工资和他部门的平均工资
```
生成结果如下，窗户函数也能熟练使用：
```
SELECT 
    emp_id, 
    dep_name, 
    salary, 
    AVG(salary) OVER (PARTITION BY dep_name) AS avg_salary
FROM 
    emp_salary;
```

![image](https://user-images.githubusercontent.com/948896/223762204-ef3296bf-bb72-4b5c-a908-fd7d5be2e0b4.png)

还可以追问，生成测试数据及查看示例运行结果：

![image](https://user-images.githubusercontent.com/948896/223762643-fb17106b-6c54-4f36-9a66-6ca1ecf11ca6.png)


## 生成网页UI图

Prompt 中包含 `website, ui, ux` 即可。示例：
```
/imagine porsche car sales website, ui, ux, high-resolutionn website, website UI design, beautiful website, Figma awards, awwwards, Dribble,  Css design, usability, flat colors, Helvetica
```
<img width="689" alt="image" src="https://user-images.githubusercontent.com/948896/230776767-920edf53-ce3c-4af3-abf5-a6941974e164.png">


## 基于已有图生成新的效果图
首先去 dribble 搜索一张喜欢的图片，然后把图片地址粘贴到 prompt 中，再加上一些关键字即可。示例：
```
https://cdn.dribbble.com/userupload/3694651/file/original-894026fb660d8973c8324be7334e87e2.png?compress=1&resize=2048x1536 porsche car sales website, ui, ux, high-resolutionn website, website UI design, beautiful website, Figma awards, awwwards, Dribble,  Css design, usability, flat colors, Helvetica
```

<img width="580" alt="image" src="https://user-images.githubusercontent.com/948896/230777079-03533535-5910-4d1b-b604-159b1453e0f5.png">


## 基于已经生成的图做调整
`/settings` 后开启 remix，这样生成图片后，会有 `Make Variations` 按钮，点击可调整图片的 prompt 并重新生成图片。
<img width="267" alt="image" src="https://user-images.githubusercontent.com/948896/230777697-27c39197-f31b-4d0e-bacf-15c31db459ac.png">

## 沟通

```
给6岁的孩子解释，为什么要关注代码的质量
```
<img width="727" alt="image" src="https://user-images.githubusercontent.com/948896/217501212-6733fc28-96dc-435b-ba90-c4b799134f01.png">

```
给不了解技术的老板解释，为什么要经常做代码的重构
```
<img width="738" alt="image" src="https://user-images.githubusercontent.com/948896/217502042-e5adf975-cf9f-43d9-8093-b68215294674.png">


## WIP

New prompts is coming, stay tuned.
