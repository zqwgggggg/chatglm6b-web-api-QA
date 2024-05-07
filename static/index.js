document.addEventListener("DOMContentLoaded", function() {
    // 获取元素
    var sendButton = document.getElementById("send-button");
    var questionInput = document.getElementById("question-input");
    var messageList = document.getElementById("message-list");
    var promptSelect = document.getElementById("prompt-select");
    var promptContainer = document.querySelector(".prompt-container");

    // 初始化时触发选择框的 change 事件，显示第一个提示内容
    var initialPrompt = promptSelect.options[0].value;
    var parameterSlider1 = document.getElementById("param1");
    var parameterSlider2 = document.getElementById("param2");
    var parameterValue1 = document.getElementById("param1-value");
    var parameterValue2 = document.getElementById("param2-value");
    triggerChange(initialPrompt);

    // 监听提示选择框的 change 事件
    promptSelect.addEventListener("change", function() {
        var selectedPrompt = promptSelect.value;
        triggerChange(selectedPrompt);
        });
// 发送所选提示到后端
   // 监听参数滑动条的 input 事件
    parameterSlider1.addEventListener("input", function() {
        var value = parameterSlider1.value;
        parameterValue1.textContent = value; // 更新相关数字大小
    });

    parameterSlider2.addEventListener("input", function() {
        var value = parameterSlider2.value;
        parameterValue2.textContent = value; // 更新相关数字大小
    });
    // 定义一个函数用于根据选择的提示显示相应的内容
    function triggerChange(selectedPrompt) {
        // 根据所选提示的值，设置相应的文本内容
        var promptText;
        switch (selectedPrompt) {
            case "prompt1":
                promptText = "**目标：**你是一个能够从给定文本中提取尽可能多的问题和答案对的模型，并按照指定格式生成答案。\n" +
                    "指令：\n" +
                    "**文本理解：**仔细阅读并理解所提供的文本材料，确保全面把握文本内容。\n" +
                    "**问题生成：**基于文本内容，生成多个相关的问题。问题应涵盖文本的不同方面，如主要概念、细节信息、事件描述、原因解释等。\n" +
                    "**答案提取：**从文本中直接提取答案。答案应简洁、准确，并尽可能直接引用文本中的原词或原句。\n" +
                    "**格式要求：**每个问题和答案应按照指定的格式排列，确保清晰可读。\n" +
                    "**语言适应：**根据文本的语言（英文或中文）决定输出语言。英文文本对应英文输出，中文文本对应中文输出。\n" +
                    "示例输入(输入是英文)：\n" +
                    "英文文本： “The Great Wall of China is one of the most impressive architectural feats in history. It stretches over 13,000 miles and was built over several centuries to protect China from invasions by nomadic tribes.”\n" +
                    "示例输出：\n" +
                    "\n" +
                    "Question 1: What is the Great Wall of China known for?\n" +
                    "Answer 1: The Great Wall of China is known for being one of the most impressive architectural feats in history.\n" +
                    "\n" +
                    "Question 2: How long is the Great Wall of China?\n" +
                    "Answer 2: The Great Wall of China stretches over 13,000 miles.\n" +
                    "\n" +
                    "Question 3: Why was the Great Wall of China built?\n" +
                    "Answer 3: The Great Wall of China was built to protect China from invasions by nomadic tribes.\n" +
                    "\n" +
                    "示例输入(输入是中文）：\n" +
                    "中文文本： “《红楼梦》是中国古典小说的经典之作，被誉为中国古代长篇小说的巅峰之作。它的作者是曹雪芹。”\n" +
                    "示例输出：\n" +
                    "\n" +
                    "问题一：《红楼梦》被誉为什么？\n" +
                    "答案一：《红楼梦》被誉为中国古代长篇小说的巅峰之作。\n" +
                    "\n" +
                    "问题二：《红楼梦》的作者是谁？\n" +
                    "答案二：《红楼梦》的作者是曹雪芹。";
                break;
            case "prompt2":
                promptText = "Task Description:\n" +
                    "            I will provide a piece of text material, which can be in English or Chinese. If the provided material is in English, the model will extract as many question-answer pairs as possible and generate answers in the specified format; if the provided material is in Chinese, the model will also extract as many question-answer pairs as possible and generate answers in the same format.\n" +
                    "            \n" +
                    "            Format Requirements:\n" +
                    "            \n" +
                    "            Extraction of Question-Answer Pairs: The model should be able to extract as many questions and their corresponding answers from the text as possible. Questions can cover various aspects of the text, such as details, themes, viewpoints, etc. Answers should be directly extracted from the text and can be single words, phrases, or complete sentences.\n" +
                    "            Answer Generation Format: Each generated answer should be presented in a standard format, including the question and the answer. Each question-answer pair should be on a separate line.\n" +
                    "            Language Adaptation: The model should determine the output language based on the language of the provided text material. If the provided text is in English, the output should be in English; if the provided text is in Chinese, the output should be in Chinese.\n" +
                    "            Example Input:\n" +
                    "            \n" +
                    "            If the provided material is in English: \n" +
                    "            Text: The Great Wall of China is one of the most impressive architectural feats in history. It stretches over 13,000 miles and was built over several centuries to protect China from invasions by nomadic tribes.\n" +
                    "            \n" +
                    "            If the provided material is in Chinese:\n" +
                    "            Text: \"《红楼梦》是中国古典小说的经典之作，被誉为中国古代长篇小说的巅峰之作。\n" +
                    "            \n" +
                    "            Example Output:\n" +
                    "                        \n" +
                    "            If the provided material is in English: \n" +
                    "            Question 1: What is the Great Wall of China known for?\n" +
                    "            Answer 1: The Great Wall of China is known for being one of the most impressive architectural feats in history.\n"+
                                            "\n"+
                    "            Question 2: How long is the Great Wall of China?\n" +
                    "            Answer 2: The Great Wall of China stretches over 13,000 miles.\n"
                                                +"\n"+
                    "            Question 3: Why was the Great Wall of China built?\n" +
                    "            Answer 3: The Great Wall of China was built to protect China from invasions by nomadic tribes.\n" +
                    "                                \n" +
                    " If the provided material is in Chinese:\n" +
                    " 问题一：《红楼梦》被誉为什么？\n" +
                    " 答案一：《红楼梦》被誉为中国古代长篇小说的巅峰之作.\n"
                                            +"\n"+
                    "问题二：《红楼梦》的作者是谁？\n" +
                    "答案二：《红楼梦》的作者是曹雪芹。";
                break;

            case "prompt3":
                promptText = "you are a versatile text processing assistant. Please complete the task according to the following steps:\n" +
                    "Step One: Language Determination\n" +
                    "The text provided by the user will undergo analysis to determine its language type, which could be either English or Chinese.\n" +
                    "\n" +
                    "Step Two: Language-Specific Answers\n" +
                    "Once the language type is identified in Step One, the answers to the questions will be provided in the corresponding language. For instance, if the text material is in English, the answers will be given in English. If the text material is in Chinese, the answers will be given in Chinese.\n" +
                    "\n" +
                    "Step Three: Text Understanding\n" +
                    "Thoroughly read and comprehend the provided text to identify all relevant questions contained within it. This step ensures that the generated questions are accurate and pertinent to the content.\n" +
                    "\n" +
                    "Step Four: Question Generation and Answer Extraction\n" +
                    "Based on the understanding gained from Step Three, generate multiple accurate and clear questions. Then, directly extract answers from the text material. Answers should be concise, accurate, and preferably quoted directly from the original text.\n" +
                    "\n" +
                    "Step Five: Output Format\n" +
                    "Output only the question-answer pairs, excluding any other content. List each question and its corresponding answer in a question-answer pair format. Ensure there is a clear separator between each question and answer pair to maintain readability and organization.\n" +
                    "\n" +
                    "By strictly adhering to these steps, the task will be completed effectively, ensuring the accurate extraction of questions and answers from the provided text material." ;
                break;
            // 添加更多提示的处理
                  case "prompt4":
                promptText = "您是一位多才多艺的文本处理助手。请按照以下步骤完成任务\n"+
                    "步骤一：语言判断\n" +
                    "对用户提供的文本材料进行分析，确定其语言类型，可以是英文或中文。\n" +
                    "\n" +
                    "步骤二：语言特定的答案\n" +
                    "一旦在步骤一中确定了语言类型，就会以相应的语言提供问题的答案。例如，如果文本材料是英文，则答案将以英文给出。如果文本材料是中文，则答案将以中文给出。\n" +
                    "\n" +
                    "步骤三：文本理解\n" +
                    "仔细阅读并理解文本材料，以确定其中包含的所有相关问题。这一步确保生成的问题与内容相关且准确。\n" +
                    "\n" +
                    "步骤四：问题生成与答案提取\n" +
                    "基于步骤三的理解，生成多个准确清晰的问题。然后，直接从文本材料中提取答案。答案应简洁、准确，并最好是直接引用原文的文字。\n" +
                    "\n" +
                    "步骤五：输出格式\n" +
                    "只输出问题及其对应的答案，以问题-答案对的形式呈现。确保每个问题和答案对之间有清晰的分隔符，以保持可读性和组织性。" ;
                break;
            default:
                promptText = "未知提示";
                break;
        }



        // 创建一个段落元素并设置内容
        var paragraph = document.createElement("p");
        paragraph.textContent = promptText;


        // 添加新的内容到提示容器的末尾
        promptContainer.appendChild(paragraph);
        promptContainer.scrollTop = promptContainer.scrollHeight;
        return promptText;

    }
    // 发送按钮点击事件处理程序
// 发送按钮点击事件处理程序
sendButton.addEventListener("click", function() {
    var question = questionInput.value;  // 获取输入框中的问题
    var model = document.getElementById("model-select").value;  // 获取选择的模型
    var selectedPrompt = promptSelect.value;  // 获取选择的提示词
    var selectedPromptText = triggerChange(selectedPrompt);  //
    var param1Value = parameterSlider1.value;  // 获取第一个参数的值
    var param2Value = parameterSlider2.value;  // 获取第二个参数的值


    // 创建用户消息项并添加到消息列表
    var userMessage = document.createElement("li");
    userMessage.className = "user-message"; // 添加用户消息类
    userMessage.innerHTML = "<strong>用户：</strong>" + question;
    messageList.appendChild(userMessage);

    // 清空输入框的值
    questionInput.value = "";  // 这一行清空输入框的值

    // 发送POST请求给后端
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/ask", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);

            // 创建机器人消息项并添加到消息列表
            var botMessage = document.createElement("li");
            botMessage.className = "bot-message"; // 添加机器人消息类
           var answerWithBreaks = response.answer.replace(/\n/g, '<br>');

        botMessage.innerHTML = "<strong>聊天机器人：</strong>" + answerWithBreaks;
        messageList.appendChild(botMessage);

        messageList.scrollTop = messageList.scrollHeight;
        }
        else {
                    // 如果发生错误，则显示错误消息
                    errorMessage.textContent = "错误：" + xhr.responseText;
                }
    };
    // 发送JSON格式的数据，包括问题和模型值
    var data = JSON.stringify({
        question: question,
        model: model,
        prompt: selectedPromptText,
        param1: param1Value,
        param2: param2Value
    });
    xhr.send(data);


});
});