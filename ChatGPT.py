
import logging
import argparse
import openai
from openai import OpenAI
import time
import socket
import httpx
from __init__ import RemoteLLMs


def read_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--config_path", type=str, default="configs/wsx_gpt35.json")
    args = parser.parse_args()
    return args


class ChatGPTLLM(RemoteLLMs):
    def init_local_client(self):
        try:
            self.model = 'gpt-3.5-turbo'
            client = OpenAI(
                base_url="https://hk.xty.app/v1",
                api_key="sk-jgzszvjMlD4Z0vaR4aFb220e96Bf441eBc43084fA1739e2f",
                http_client=httpx.Client(
                    base_url="https://hk.xty.app/v1",
                    follow_redirects=True,
                ),
            )
            return client
        except:
            return None

    def create_prompt(self, current_query,prompt, context=None):
        if context is None:
            context = []
        # context.append(
        #     {
        #         "role": "system",
        #         "content": f"{prompt}你现在是一位精通阅读的文本处理大师，我将给定一段背景材料，要求你完成以下任务"
        #                    "任务描述："
        #                    "1、你首先必须要自己判断材料的语言类型但不用告知我，如果材料是英文就用英文完成任务，如果材料是是中文就用中文完成任务"
        #                    "2、请你从给定的文本材料中发现问题，并为每个问题生成一个答案。"
        #                    "3、要求：确保您的答案准确、清晰，并且与文本材料中的问题相关"
        #                    "4、输出指示：请根据给定的文本材料生成答案对。",
        #     }
        # )
        context.append(
            {
                "role": "system","content": prompt
            }
        )

        # context.append(
        #     {
        #         "role": "system",
        #         "content": "You are now an expert text processor skilled in reading. I will provide you with a background material, and your tasks are as follows:"
        #                    "Task Description: 1. Determine the language type of the material on your own, but do not inform me. If the material is in English, complete the task in English; if it is in Chinese, use Chinese."
        #                    "                 2. Identify problems within the given text material and generate an answer for each problem."
        #                    "                 3. Requirements: Ensure your answers are accurate, clear, and relevant to the problems within the text material."
        #                    "                 4. Output Instructions: Only generate answer pairs based on the given text material. Separate each answer pair with a clear delimiter and include no other content.",
        #     }
        # )

        context.append({"role": "user", "content": current_query})
        return context

    def request_llm(self, context, current_query, max_tokens,temperature,seed=1234, sleep_time=1, repeat_times=0, ):
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=context,
                stream=False,
                seed=seed + repeat_times,
                max_tokens=max_tokens,
                temperature=temperature

            )
            context.append(
                {
                    'role': response.choices[0].message.role,
                    'content': response.choices[0].message.content
                }
            )
            return context  # 返回模型的响应
        except openai.RateLimitError as e:
            logging.error(str(e))
            raise e
        except (openai.APIError, openai.InternalServerError, socket.timeout) as e:
            logging.error(str(e))
            raise e
        except Exception as e:
            # 捕捉未预料的异常，考虑是否终止循环或做其他处理
            logging.error(f"An unexpected error occurred: {str(e)}")
            raise e
        time.sleep(sleep_time)

if __name__ == '__main__':
    args = read_args()
    chat_gpt = ChatGPTLLM(args.config_path)
    chat_gpt.interactive_dialogue()