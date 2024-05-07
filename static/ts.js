document.addEventListener("DOMContentLoaded", function() {
    // 获取元素
    var sendButton = document.getElementById("send-button");
    var questionInput = document.getElementById("question-input");
    var messageList = document.getElementById("message-list");
    var promptSelect = document.getElementById("prompt-select");
    var promptContainer = document.querySelector(".prompt-container");

    // 初始化时触发选择框的 change 事件，显示第一个提示内容
    var initialPrompt = promptSelect.options[0].value;
    triggerChange(initialPrompt);

    // 监听提示选择框的 change 事件
    promptSelect.addEventListener("change", function() {
        var selectedPrompt = promptSelect.value;
        triggerChange(selectedPrompt);
        });
// 发送所选提示到后端

    // 定义一个函数用于根据选择的提示显示相应的内容
    function triggerChange(selectedPrompt) {
        // 根据所选提示的值，设置相应的文本内容
        var promptText;
        switch (selectedPrompt) {
            case "prompt1":
                promptText = "";
                break;
            case "prompt2":
                promptText = "";
                break;

            case "prompt3":
                promptText = "" ;
                break;
            // 添加更多提示的处理
                  case "prompt4":
                promptText = "" ;
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
        prompt: selectedPromptText
    });
    xhr.send(data);


});
});