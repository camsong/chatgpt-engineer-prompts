import chalk from 'chalk';
import * as https from 'https';
import { HttpsProxyAgent } from 'https-proxy-agent';

interface Message {
  role: 'system' | 'assistant' | 'user' | 'function',
  content: string;
}

export type { Message }

const proxy = process.env.http_proxy || 'http://127.0.0.1:10080';
const agent = process.env.USE_PROXY === 'true' ? new HttpsProxyAgent(proxy) : null;

function logger(message?: unknown, ...optionalParams: unknown[]) {
  const timestamp = new Date().toLocaleString();
  console.log(chalk.cyan('[' + timestamp + ']'), chalk.cyan('GPT'), chalk.cyan(message), ...optionalParams);
}

const openAIOptions: https.RequestOptions = {
  hostname: 'api.openai.com',
  port: 443,
  path: '/v1/chat/completions',
  method: 'POST',

  headers: {
    'Content-Type': 'application/json',
    Accept: 'text/event-stream',
    Connection: 'keep-alive',
    Authorization: 'Bearer ' + process.env.OPENAI_API_KEY,
    'Cache-Control': 'no-cache',
  },
  agent,
};

const parseLineByLine = (str: string, callback: (line: string) => void) => {
  const lines = str.split('\n');
  lines.forEach((line) => {
    if (line.length > 0) {
      callback(line);
    }
  });
};

export async function chatStreaming(
  messages: { role: string; content: string }[],
  temperature: number,
  callbacks: {
    onMessage?: (message: string) => void;
    onComplete?: (result: string) => void;
    onFailure?: (error: Error) => void;
  } = {},
): Promise<string> {
  return new Promise((resolve, reject) => {
    const payloadString = JSON.stringify({
      model: 'gpt-3.5-turbo-0613',
      messages,
      temperature: temperature,
      stream: true,
      max_tokens: 1500,
    });
    logger('chatStreaming start, messages =', messages)
    const req = https.request(openAIOptions, (res) => {
      let result = '';
      res.on('data', (chunk) => {
        callbacks.onMessage && callbacks.onMessage(chunk)
        // chunk 是二进制文件，需要转化为字符串
        parseLineByLine(chunk.toString(), (line) => {
          const content = line.replace('data: ', '');
          if (content === '[DONE]') {
            console.log(''); // start a new line
            logger('处理完成')
            callbacks.onComplete && callbacks.onComplete(result);
            resolve(result);
          } else {
            const gptData = JSON.parse(content);
            if (gptData.choices[0].finish_reason === 'stop') {
              // logger('返回结束')
            } else if (gptData.choices[0].delta.content) {
              const delta = gptData.choices[0].delta.content;
              // logger('delta content:', delta)
              process.stdout.write(chalk.cyan(delta));
              result = result + delta;
            } else if (gptData.choices[0].delta.role) {
              logger('[GPT]', 'role =', gptData.choices[0].delta.role, '的返回开始:');
            } else {
              logger('出错了:', chalk.red(content));
              callbacks.onFailure && callbacks.onFailure(new Error(content));
              reject(new Error(content));
            }
          }
        });
      });
    });

    req.on('error', (error) => {
      console.error('请求出错：', error);
      callbacks.onFailure && callbacks.onFailure(error);
      reject(error)
    });

    req.write(payloadString);
    req.end();
  });
}
