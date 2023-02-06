# chatgpt-engineer-prompts
Awesome ChatGPT prompts for engineers😇
PR is welcome.
为工程师总结的实用 Prompt，欢迎分享对你有用的 prompts。

### 使用 Tips：
1. 能够记录上下文，当一次提问没有得到理想答案，可以继续追问
2. 支持中英文混搭，在一个问题中可以灵活切换中英文表达

### 生成代码
```
使用 React 生成一个 登录的 form，包含用户名，密码和确认密码。
```

<img width="724" alt="image" src="https://user-images.githubusercontent.com/948896/216982323-b3793dd9-91ba-47f0-a45c-cba8d54dc09b.png">

### 代码讲解
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


### 优化代码

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
<img width="728" alt="image" src="https://user-images.githubusercontent.com/948896/216982014-bfd012a1-9dfe-49cb-ad3c-2d7a3cb367df.png">


支持追问：
```
为什么这么优化？
```
<img width="743" alt="image" src="https://user-images.githubusercontent.com/948896/216982055-a1ced7b5-7613-49ab-80e5-672fb76e0529.png">

### 控制返回的格式

返回 JSON
```
生成3个测试用户的信息，以json对象数组格式，包含 name, phone, email
```
<img width="727" alt="image" src="https://user-images.githubusercontent.com/948896/216981922-9344734d-4f96-4624-8a3e-e44ad4185d52.png">

返回 XML

### JS 转 TypeScript

### 模拟面试
我想你担任前端面试官。我将成为候选人，你向我提出一个个面试问题，不要说答案。等我回答，并对我的答案做评价，通过后开始下一个面试。我的第一句话是“你好”我想你担任前端面试官。我将成为候选人，你向我提出一个个面试问题，不要说答案。等我回答，并对我的答案做评价，通过后开始下一个面试。我的第一句话是“你好”

### 出选择题

