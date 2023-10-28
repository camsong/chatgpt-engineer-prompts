# chatgpt-engineer-prompts 👩‍💻🧑‍💻

<img width="613" alt="image" src="https://user-images.githubusercontent.com/948896/217122899-5f6fb369-ef97-4753-9bd3-909c66ee4744.png">

[English Version](README-en.md)

为工程师总结的实用 Prompts，助力成为下一代 Prompt 工程师，使用工具不限于 ChatGPT，还有 Midjourney、Stable Diffusion 等。

终极目标：**实现 99% 的工作 AI 化，剩下 1% 由你来掌控**

覆盖范围：代码开发的各个环节、UI/UX 视觉交互设计、产品设计。

不断丰富中，欢迎关注，欢迎贡献 Idea。

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
1. [生成 SQL](#生成-sql)
1. [生成萌图 DALL·E](#生成萌图-dalle)
1. [生成页面 UI-Midjourney](#生成页面-ui)
1. [生成插图-Midjourney](#生成插图)
1. [生成Icon-Midjourney](#生成-icon)
1. [生成吉祥物](#生成吉祥物)
1. [生成配色](#生成配色)
1. [沟通](#沟通)
1. [其他技巧](#其他技巧)

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

<img width="700" alt="image" src="https://user-images.githubusercontent.com/948896/216982215-ef9008c1-9102-47c8-94d8-6e39b90786f4.png">

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

<img width="700" alt="image" src="https://user-images.githubusercontent.com/948896/217125899-73540629-db08-48cb-87f8-cb478e829ce2.png">

支持追问：

```
为什么这么优化？
```

<img width="700" alt="image" src="https://user-images.githubusercontent.com/948896/216982055-a1ced7b5-7613-49ab-80e5-672fb76e0529.png">

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

<img width="700" alt="image" src="https://user-images.githubusercontent.com/948896/217125605-358e57ec-ebfb-4a46-94ea-0a71202c2d43.png">

## 指定返回格式

返回 JSON

```
生成3个测试用户的信息，以json对象数组格式，包含 name, phone, email
```

<img width="700" alt="image" src="https://user-images.githubusercontent.com/948896/216981922-9344734d-4f96-4624-8a3e-e44ad4185d52.png">

返回 XML

```
生成2个测试用户的信息，以xml格式返回，包含 name, phone, email
```

<img width="700" alt="image" src="https://user-images.githubusercontent.com/948896/217123706-149b5a13-b79e-4c88-96e9-d3f4d0e13820.png">

## 正则表达式

```
写一个 JS 的正则表达式，检查密码的强度必须是包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间。
```

<img width="700" alt="image" src="https://user-images.githubusercontent.com/948896/220364751-862b502c-744b-46fb-84cd-07ead6f656ce.png">

也可以解释正则表达式
```
这个正则表达式是什么含义？
^[A-Z]:\\{1,2}[^/:\*\?<>\|]+\.(jpg|gif|png|bmp)$
```

<img width="700" alt="image" src="https://user-images.githubusercontent.com/948896/220365104-a1f9f5fd-e5e7-4b32-a90d-812c13395079.png">


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

<img width="700" alt="image" src="https://user-images.githubusercontent.com/948896/223762204-ef3296bf-bb72-4b5c-a908-fd7d5be2e0b4.png">

还可以追问，生成测试数据及查看示例运行结果：

<img width="700" alt="image" src="https://user-images.githubusercontent.com/948896/223762643-fb17106b-6c54-4f36-9a66-6ca1ecf11ca6.png">

## 生成萌图 DALL·E

```
Cute, fluffy [ANIMAL], on a parachute, smiling, adorable, pixar animation style
```

```
Cute, fluffy mickey mouse, on a parachute, smiling, adorable, pixar animation style
```
<img width="656" alt="image" src="https://github.com/camsong/chatgpt-engineer-prompts/assets/948896/92822cd6-76bd-4b56-9430-c0ccd4b004e8">
```
Cute, fluffy panda, on a parachute, smiling, adorable, pixar animation style
```
<img width="672" alt="image" src="https://github.com/camsong/chatgpt-engineer-prompts/assets/948896/d3f54111-369e-4c07-a1eb-734c0c71de3d">


## 生成页面 UI

Prompt 中使用 `website` 来生成 PC 页面。示例：
```
/imagine porsche car sales website, ui, ux, high-resolutionn website, website UI design, beautiful website, Figma awards, awards, Dribble, CSS design, usability, flat colors, Helvetica
```
<img width="700" alt="image" src="https://user-images.githubusercontent.com/948896/230776767-920edf53-ce3c-4af3-abf5-a6941974e164.png">

使用 `app` 关键字，可以生成手机应用：如，一个订餐应用
```
/imagine food delivery app, user interface, Figma, Behance, HQ, 4k, clean UI
```


### 基于已有图生成新的效果图
首先去 dribble 搜索一张喜欢的图片，然后把图片地址粘贴到 prompt 中，再加上一些关键字即可。示例：
```
https://cdn.dribbble.com/userupload/3694651/file/original-894026fb660d8973c8324be7334e87e2.png?compress=1&resize=2048x1536 porsche car sales website, ui, ux, high-resolutionn website, website UI design, beautiful website, Figma awards, awwwards, Dribble,  Css design, usability, flat colors, Helvetica
```

<img width="500" alt="image" src="https://user-images.githubusercontent.com/948896/230777079-03533535-5910-4d1b-b604-159b1453e0f5.png">


### 基于已经生成的图做调整
`/settings` 后开启 remix，这样生成图片后，会有 `Make Variations` 按钮，点击可调整图片的 prompt 并重新生成图片。
<img width="260" alt="image" src="https://user-images.githubusercontent.com/948896/230777697-27c39197-f31b-4d0e-bacf-15c31db459ac.png">

## 生成插图

使用 `google flat art style` 来生成插画风格的图片，加上 `transparent background` 可以让背景变白，避免一些噪点。

```
/imagine a woman using a computer, google flat art style, transparent background 
```

<img width="463" alt="image" src="https://user-images.githubusercontent.com/948896/230797237-a7145ba2-a8fa-4ddc-af87-c843036169a9.png">

上面第二个风格看起来还不错。

去除白背景的方法：有很多免费在线工具，试了一下，还是感觉 [Adobe Express](https://www.adobe.com/express/feature/image/remove-background) 对渐变色擦除做的最好 

<img width="463" alt="image" src="https://user-images.githubusercontent.com/948896/230797490-85bfff48-d3d5-4c6b-a5fb-6e8e5e0bbedd.png">


## 生成 Icon
使用 `icon for iOS app' 来移动端应用的图标
```
/imagine icon for ios App, burger, high quality, high resolution
```

这种情况下生成的图像过于逼真、拟物。

<img width="400" alt="image" src="https://user-images.githubusercontent.com/948896/230797956-ac3ac821-b464-4f96-ba49-896d6ba16c48.png">

如果你想用流行的极简模式，加上 `minimalism, flat design`：

```
/imagine icon for ios App, burger, high quality, high resolution, minimalism, flat design
```
<img width="400" alt="image" src="https://user-images.githubusercontent.com/948896/230797831-321720e0-7a78-444b-a880-9895d31f0a33.png">

## 生成吉祥物
使用 `mascot` 来生成一个企业的吉祥物，让别人更好的记住品牌。可以设置可爱的日系风格 `Japanese style`

```
simple mascot for a food delivery company, Japanese style
```
<img width="400" alt="image" src="https://user-images.githubusercontent.com/948896/230798184-d7ae8f9e-a891-4ead-893e-59e3847a36e7.png">

## 生成配色
一种较好的的配色方案应遵循「60-30-10」比例，60％ Main 主色，30％ Secondary 辅色，最后 10％ Accent 使用与两种主要颜色形成强烈对比的强调色。以现实中的西服做类比：60 的外套和裤子颜色，30 是衬衣，10 是领带。
但还需要一些辅助色，整个设计起来并不容易。推荐几个工具：

https://aicolors.co/ 使用 GPT 来生成配色
<img width="800" alt="image" src="https://user-images.githubusercontent.com/948896/230794748-ceaf0f6f-a3f1-4656-b2a0-8c4190e594e8.png">

https://palettemaker.com/app 手动调色的神器，覆盖 Web、App、Brand，还有一些色彩理论教学。
<img width="800" alt="image" src="https://user-images.githubusercontent.com/948896/230794899-9ea00297-cf1e-4bed-ae34-5d3dce8612a0.png">

https://www.magicpattern.design/dashboard 快速生产渐变色，背景图素材，比如最近很流行的 Blurry Gradients
<img width="800" alt="image" src="https://user-images.githubusercontent.com/948896/230795174-eac97571-1e4d-4ca2-bc25-1bbeb3c90f89.png">


https://colorffy.com/gradients 生成多焦点渐变色，功能比较单一。
<img width="800" alt="image" src="https://user-images.githubusercontent.com/948896/230794684-6186fc82-56ca-4f7f-9533-678c3ba99c9a.png">

## 沟通

```
给6岁的孩子解释，为什么要关注代码的质量
```
<img width="800" alt="image" src="https://user-images.githubusercontent.com/948896/217501212-6733fc28-96dc-435b-ba90-c4b799134f01.png">

```
给不了解技术的老板解释，为什么要经常做代码的重构
```
<img width="800" alt="image" src="https://user-images.githubusercontent.com/948896/217502042-e5adf975-cf9f-43d9-8093-b68215294674.png">


## 其他技巧

### 看到一个喜欢的图片，如何找到 prompt，image-to-text

* 方法1：粘贴到 https://unprompt.ai/ 找到类似图片，查看 prompt
* 方法2：Midjourney 的 `/describe` 指令，并上传图片即可。
* 方法3：使用 CLIP Interrogator https://huggingface.co/spaces/pharma/CLIP-Interrogator
