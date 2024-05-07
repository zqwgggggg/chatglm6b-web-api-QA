import json

class RemoteLLMs:

    def init_local_client(self):
        """
        初始化用户的客户端
        :param args:
        :return:
        """
        raise NotImplementedError()

    def __load_args(self, config_path):
        # 首先读取Config
        self.args = json.load(open(config_path))

    def __init__(self, config_path):
        # 首先读取Config
        self.__load_args(config_path)
        self.max_retries = self.args.get("max_retries", 5)
        self.client = None
        for idx in range(self.max_retries):
            model = self.init_local_client()
            if model is not None:
                self.client = model
                break
        if self.client is None:
            raise ModuleNotFoundError()

    def create_prompt(self, history, current_query,prompt):
        pass

    def request_llm(self, context, current_query,max_tokens,temperature,seed=1234, sleep_time=1, repeat_times=0,):
        pass

    def fit_case(self, pattern: str, data: dict, meta_dict: dict = None):

        if meta_dict is not None:
            for k,v in meta_dict.items():
                pattern = pattern.replace(k, str(v))

        for k, v in data.items():
            pattern = pattern.replace(k, str(v))

        assert '{{' not in pattern, pattern
        assert '}}' not in pattern, pattern
        return pattern


    def interactive_dialogue(self,query,prompt,max_tokens,temperature):
        """
        进行交互式的对话，进行模型检查
        :return:
        """
        contexts = []

        current_query = query
        if current_query == "CLEAN":
            contexts = []
            print("已经清除上下文")

        elif current_query == "END":
            return
        contexts = self.create_prompt(current_query,prompt, contexts)
        results = self.request_llm(contexts,current_query,max_tokens,temperature)

        return results


            # print("%s\t%s" % (results[-1]['role'], results[-1]['content']), flush=True)
            # contexts = []
