from flask import Flask, render_template, request, jsonify
from ChatGPT import ChatGPTLLM
from ChatGLM import ChatGLMLLM

import argparse

# 创建Flask实例
app = Flask(__name__)

def read_args():
    # 直接返回默认配置路径，不解析命令行参数
    args = argparse.Namespace(config_path="configs/wsx_gpt35.json")
    return args

# 初始化 ChatGPTLLM 和 ChatGLMLLM
args = read_args()
chat_gpt = ChatGPTLLM(args.config_path)
chat_glm = ChatGLMLLM(args.config_path)


# 定义路由，处理GET请求
@app.route('/')
def home():
    return render_template('index.html')

# 定义路由，处理POST请求
@app.route('/ask', methods=['POST'])
def ask():
    try:
        question = request.json['question']  # 获取POST请求中的question字段
        model_num = request.json['model']  # 获取POST请求中的model字段
        prompt = request.json['prompt']  # 获取POST请求中的prompt字段
        max_tokens = int(request.json['param1'])
        temperature = float(request.json['param2'])

        print(max_tokens)
        print(temperature)
        print(prompt)
        print(model_num)
    except KeyError as e:
        return jsonify({'error': 'Missing key in request: {}'.format(str(e))}), 400

    # 根据传入的 model_num 选择要使用的模型进行问答
    try:
        if model_num == '1':
            answer = chat_gpt.interactive_dialogue(question, prompt,max_tokens,temperature)
        elif model_num == '2':
            answer = chat_glm.interactive_dialogue(question, prompt,max_tokens,temperature)
        else:
            return jsonify({'error': 'Invalid model number'}), 400
    except Exception as e:
        return jsonify({'error': 'Error processing request: {}'.format(str(e))}), 500

    # 预处理回答
    try:
        processed_answer = answer[-1]['content']
    except ValueError as e:
        return jsonify({'error': str(e)}), 500

    # 将处理后的回答以JSON格式返回
    response = {
        'answer': "\n" + processed_answer
    }
    print(response)
    return jsonify(response)  # 返回JSON格式的响应

if __name__ == '__main__':
    print('启动Flask服务...')
    app.run()  # 启动Flask服务
