# chatgpt-engineer-prompts 👩‍💻🧑‍💻

<img width="613" alt="image" src="https://user-images.githubusercontent.com/948896/217122899-5f6fb369-ef97-4753-9bd3-909c66ee4744. png">

Practical Prompts for Engineers

## ChatGPT Usage Tips:

1. The ability to record the context, when a question does not get the desired answer, you can continue to pursue the question
2. Support mixed Chinese and English, you can flexibly switch between Chinese and English expressions in a question

## Table of Contents

1. [Code Generation](#code-generation)
1. [Code Explanation](#code-explanation)
1. [Code Optimization](#code-optimization)
1. [Code Conversion](#code-conversion-js-to-typescript)
1. [Specify the return format](#specify-the-return-format)
1. [Regular Expression](#regular-expressions)
1. [Generate SQL](#generate-sql)
1. [Communication](#communication)


## Code Generation

```
Use HTML and CSS to achieve a left-center-right three-column layout, with a fixed width of 100px on the left and right, and the middle to fill the remaining space
```

<img width="709" alt="image" src="https://user-images.githubusercontent.com/948896/217124783-6ccdf75b-3fd6-443b-9316-27ca68f0e581. png">
<img width="601" alt="image" src="https://user-images.githubusercontent.com/948896/217124795-8a7308de-2288-43bf-9340-7bcc710a78a5. png">

```
Use React to generate a login form with a username, password, and confirmation password.
```

<img width="724" alt="image" src="https://user-images.githubusercontent.com/948896/216982323-b3793dd9-91ba-47f0-a45c-cba8d54dc09b. png">

## Code Explanation

```
Explain this code:
export const useDeepMemo = <K, V>(memoFn: () => V, key: K): V => {
  const ref = useRef<{ key: K; value: V }>().

  if (!ref.current || !isEqual(key, ref.current.key)) {
    ref.current = { key, value: memoFn() }.
  }

  return ref.current.value.
}.
```

<img width="722" alt="image" src="https://user-images.githubusercontent.com/948896/216982215-ef9008c1-9102-47c8-94d8-6e39b90786f4. png">

## Code Optimization

```
Optimize the following code:
function bottom(layout: Layout): number {
  let max = 0.
  let bottomY.
  for (let i = 0, len = layout.length; i < len; i += 1) {
    bottomY = layout[i].y + layout[i].h.
    if (bottomY > max) {
      max = bottomY.
    }
  }
  return max.
}
```

<img width="715" alt="image" src="https://user-images.githubusercontent.com/948896/217125899-73540629-db08-48cb-87f8-cb478e829ce2. png">

Support for follow-up questions:

```
Why is it so optimized?
```

<img width="743" alt="image" src="https://user-images.githubusercontent.com/948896/216982055-a1ced7b5-7613-49ab-80e5-672fb76e0529. png">

## Code conversion: JS to TypeScript

```
Converting this code to TypeScript:
const useWrapperCallback = (callback, wrapperFunction) => {
  const wrapperRef = useRef({
    currentCall: callback.
    returnCall: wrapperFunction(function (.. .args) {
      return wrapperRef.current?.currentCall(. .args).
    }).
  }).

  wrapperRef.current.currentCall = useMemo(() => callback, [callback]).
  return wrapperRef.
}
```

<img width="717" alt="image" src="https://user-images.githubusercontent.com/948896/217125605-358e57ec-ebfb-4a46-94ea-0a71202c2d43. png">

## Specify the return format

Return JSON

```
Generate 3 test users' information in json object array format, including name, phone, email
```

<img width="727" alt="image" src="https://user-images.githubusercontent.com/948896/216981922-9344734d-4f96-4624-8a3e-e44ad4185d52. png">

Return XML

```
Generate 2 test users' information and return it in xml format, including name, phone, email
```

<img width="711" alt="image" src="https://user-images.githubusercontent.com/948896/217123706-149b5a13-b79e-4c88-96e9-d3f4d0e13820. png">

## Regular expressions

```
Write a JS regular expression that checks the strength of the password must contain a combination of upper and lower case letters and numbers, no special characters, and be between 8 and 10 in length.
```

<img width="667" alt="image" src="https://user-images.githubusercontent.com/948896/220364751-862b502c-744b-46fb-84cd-07ead6f656ce. png">

Can also interpret regular expressions
```
What is the meaning of this regular expression?
^[A-Z]:\\{1,2}[^/:\*\? <>\|]+\. (jpg|gif|png|bmp)$
```

<img width="661" alt="image" src="https://user-images.githubusercontent.com/948896/220365104-a1f9f5fd-e5e7-4b32-a90d-812c13395079. png">


## Generate SQL
```
There is a salary table emp_salary, containing employee number emp_id, department name dep_name, salary salary, query each employee's salary and the average salary of his department
```
The following results are generated and the window function is also proficient in use:
```
SELECT 
    emp_id. 
    dep_name. 
    salary. 
    AVG(salary) OVER (PARTITION BY dep_name) AS avg_salary
FROM 
    emp_salary.
```

! [image](https://user-images.githubusercontent.com/948896/223762204-ef3296bf-bb72-4b5c-a908-fd7d5be2e0b4.png)

You can also follow up to generate test data and view the results of sample runs at

! [image](https://user-images.githubusercontent.com/948896/223762643-fb17106b-6c54-4f36-9a66-6ca1ecf11ca6.png)

## Communication

```
Explain to a 6 year old why it is important to focus on the quality of the code
```
<img width="727" alt="image" src="https://user-images.githubusercontent.com/948896/217501212-6733fc28-96dc-435b-ba90-c4b799134f01. png">

```
Explain to bosses who don't understand technology why they need to do code refactoring frequently
```
<img width="738" alt="image" src="https://user-images.githubusercontent.com/948896/217502042-e5adf975-cf9f-43d9-8093-b68215294674. png">


## WIP

New prompts is coming, stay tuned.
