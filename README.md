# chatgpt-engineer-prompts 👩‍💻🧑‍💻

<img width="613" alt="image" src="https://user-images.githubusercontent.com/948896/217122899-5f6fb369-ef97-4753-9bd3-909c66ee4744.png">

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
