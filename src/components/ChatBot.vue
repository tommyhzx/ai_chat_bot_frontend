<template>
  <div class="chatbot-container" v-if="isVisible">
    <!-- 对话框标题栏 -->
    <div class="chatbot-header">
      <span>AI 机器人</span>
      <button @click="toggleVisibility">关闭</button>
    </div>

    <!-- 对话框界面 -->
    <div class="messages">
      <div v-for="(message, index) in messages" :key="index" :class="message.type">
        <div class="message" :class="message.type">
          <div class="message-content">
            {{ message.text }}
          </div>
        </div>
      </div>
    </div>

    <!-- 输入框 -->
    <div class="input-container">
      <el-input v-model="userInput" placeholder="输入消息..." @keyup.enter="sendMessage" clearable class="input-field">
        <template #append>
          <el-button @click="sendMessage" type="primary">发送</el-button>
        </template>
      </el-input>
    </div>
  </div>
  <!-- 打开 AI 机器人按钮 -->
  <el-button class="chatbot-toggle" @click="toggleVisibility" v-if="!isVisible">
    打开 AI 机器人
  </el-button>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { ElDialog, ElButton, ElInput } from 'element-plus'
import 'element-plus/dist/index.css'

const isVisible = ref(false)
const userInput = ref('')
const messages = ref([
  { text: '你好！我是AI机器人，有什么可以帮你的吗？', type: 'bot' }
])

function toggleVisibility() {
  isVisible.value = !isVisible.value
}

function sendMessage() {
  if (userInput.value.trim() !== '') {
    messages.value.push({ text: userInput.value, type: 'user' })
    userInput.value = ''
    // 模拟AI机器人回复
    setTimeout(() => {
      messages.value.push({ text: '这是AI机器人的回复。', type: 'bot' })
      scrollToBottom()
    }, 1000)
    // 滚动到底部
    scrollToBottom()
  }
}
// 每次对话框内容更新后，滚动到底部
function scrollToBottom() {
  nextTick(() => {
    const messagesContainer = document.querySelector('.messages')
    messagesContainer.scrollTop = messagesContainer.scrollHeight
  })
}
</script>

<style scoped lang="scss">
// 聊天对话框
.chatbot-container {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  max-height: 600px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;

  // 对话框标题栏样式
  .chatbot-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // padding-left: 2px;
    background-color: #409EFF;
    color: white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    font-size: 14px; // 调整字体大小

    button {
      background: none;
      border: none;
      color: white;
      font-size: 14px;
      cursor: pointer;
    }
  }

  .messages {
    flex: 1;
    padding: 10px;
    overflow-y: auto;

    .message {
      display: flex;
      margin-bottom: 10px;

    }

    .message.user {
      justify-content: flex-end;
    }

    .message.bot {
      justify-content: flex-start;
    }

    .message-content {
      max-width: 70%;
      padding: 10px;
      border-radius: 10px;
      background-color: #e0e0e0;
      font-size: 14px; // 调整字体大小
    }

    .message.user .message-content {
      background-color: #d3f261;
    }

    .message.bot .message-content {
      background-color: #f5f7fa;
    }
  }

  .input-container {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
}

.chatbot-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #409EFF;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>