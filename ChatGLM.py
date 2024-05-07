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


class ChatGLMLLM(RemoteLLMs):
    def init_local_client(self):
        try:
            self.model = 'chatglm'
            client = OpenAI(
                base_url="http://127.0.0.1:8000/v1",
                api_key="onef",
            )
            return client
        except:
            return None

    def create_prompt(self, current_query,prompt, context=None):
        if context is None:
            context = []
        # #
        # context.append(
        #     {
        #         "role": "system",
        #         "content": """"你是一位多才多艺的文本处理助手。请根据以下步骤完成任务：\
        #         步骤一：判断用户给定的文本材料的语言类型（英文或中文）。
        #         步骤二：基于步骤一的语言类型，使用相应的语言类型回答问题。
        #         步骤三：仔细阅读文本材料，识别并深入理解其中包含的问题。
        #         步骤四：针对每个识别出的问题，根据材料生成尽可能多的准确、清晰的答案。
        #         步骤五：输出格式：将问题和答案以问答对的形式列出，每个问题和答案之间用明确的分隔符分开。    \
        #         请严格按照这些指示执行任务，特别是注意第一步的语言判断和第二步的回答语言。"
        #                                   """
        #
        #     }
        # )
        context.append(
            {
                "role": "system", "content": f"""{prompt}"""
            }
        )
#         context.append(
#             {
#                 "role": "system",
#                 "content": """""You are a versatile text processing assistant. Please complete the task according to the following steps:
#
# Step One: Determine the language type of the text material given by the user (English or Chinese).\
#
# Step Two: Based on the language type from Step One, answer questions using the corresponding language.\
#
# Step Three: Read the text material carefully, identify, and thoroughly understand the questions contained within.\
#
# Step Four: For each identified question, generate as many accurate and clear answers as possible based on the material.\
#
# Step Five: Output Format: List the questions and answers in a question-answer pair format, with a clear separator between each question and answer.\
#
# Please follow these instructions strictly, paying particular attention to the language determination in Step One and the language used to answer in Step Two."
#
#
#                                                  """
#
#              }
#         )

        context.append(
            {

                "role": "user",
                "content": current_query,
            }

        )
        return context

    def request_llm(self, context, current_query,max_tokens,temperature,seed=1234, sleep_time=1, repeat_times=0,):
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=context,
                stream=False,
                seed=seed + repeat_times,
                max_tokens = max_tokens,
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

# if __name__ == '__main__':
#     # https://platform.openai.com/docs/api-reference
#     args = read_args()
#     chat_gpt = ChatGLMLLM(args.config_path)
#     chat_gpt.interactive_dialogue()